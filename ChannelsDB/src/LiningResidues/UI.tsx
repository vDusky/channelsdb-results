namespace LiningResidues.UI{

    import DGComponents = Datagrid.Components;
    import React = LiteMol.Plugin.React
    import LiteMoleEvent = LiteMol.Bootstrap.Event;
    import TunnelUtils = CommonUtils.Tunnels;
    
    let DGTABLE_COLS_COUNT = 1;
    let NO_DATA_MESSAGE = "Select channel in 3D view for details...";

    declare function $(p:any): any;
    declare function datagridOnResize(str:string,str1:string,str2:string):any;

    interface State{
        data: string[] | null,
        app: App,
    };

    interface ChannelEventInfo { 
        kind: LiteMol.Bootstrap.Interactivity.Info.__Kind.Selection | LiteMol.Bootstrap.Interactivity.Info.__Kind.Empty,
        source : {
            props: {
                tag: {
                    element: DataInterface.Tunnel,
                    type: String
                }
            },
            ref: string
        }
        
    };

    export function render(target: Element, plugin: LiteMol.Plugin.Controller) {
        LiteMol.Plugin.ReactDOM.render(<App controller={plugin} />, target);
    }

    export class App extends React.Component<{controller: LiteMol.Plugin.Controller }, State> {

        private interactionEventStream: LiteMol.Bootstrap.Rx.IDisposable | undefined = void 0;

        state:State = {
            data: null,
            app: this,
        };

        layerIdx = -1;

        componentDidMount() {
            var interactionHandler = function showInteraction(type: string, i: ChannelEventInfo | undefined, app: App) {
                if (!i || i.source == null || i.source.props.tag === void 0 || i.source.props.tag.type === void 0) {
                    return;    
                }

                if(i.source.props.tag.type == "Tunnel" 
                    || i.source.props.tag.type == "Path"
                    || i.source.props.tag.type == "Pore"
                    || i.source.props.tag.type == "MergedPore"){
                    
                    let layers = i.source.props.tag.element.Layers;
                    app.setState({data:layers.ResidueFlow});
                    setTimeout(function(){
                        $( window ).trigger('contentResize');
                    },1);
                }
                
            }

            this.interactionEventStream = LiteMoleEvent.Visual.VisualSelectElement.getStream(this.props.controller.context)
                .subscribe(e => interactionHandler('select', e.data as ChannelEventInfo, this));
        }

        componentWillUnmount(){
        }

        render() {
            if (this.state.data !== null) {
                return(
                    <div>
                        <DGTable {...this.state} />
                        <Controls {...this.state} />
                    </div>
                    );
            } 
            
            return <div>
                        <DGNoData {...this.state} />
                    </div>
        }
    }  
    function residueStringToResidueLight(residue:string):CommonUtils.Selection.LightResidueInfo{
        /*
        [0 , 1 ,2 ,  3   ]
        VAL 647 A Backbone
        */
        let residueParts = residue.split(" ");
        let rv = {
            authSeqNumber:Number(residueParts[1]),
            chain:{
                authAsymId:residueParts[2]
            }
        };

        return rv;
    }

    class Controls extends React.Component<State,{}>{

        clearSelection(){
            CommonUtils.Selection.SelectionHelper.clearSelection(this.props.app.props.controller);
        }

        selectAll(){
            let residues = [];
            if(this.props.app.state.data === null){
                return;
            }

            for(let residue of this.props.app.state.data){
                residues.push(residueStringToResidueLight(residue));
            }

            if(!CommonUtils.Selection.SelectionHelper.isBulkResiduesSelected(residues)){
                CommonUtils.Selection.SelectionHelper.selectResiduesBulkWithBallsAndSticks(this.props.app.props.controller, residues);
            }
        }

        render(){
            return <div className="lining-residues select-controls">
                <span className="btn-xs btn-default bt-all hand" onClick={this.selectAll.bind(this)}>Select all</span>
                <span className="btn-xs btn-default bt-none hand" onClick={this.clearSelection.bind(this)}>Clear selection</span>
            </div>
        }
    }

    class DGNoData extends React.Component<State,{}>{
        render(){
            return (<div className="datagrid" id="dg-lining-residues">
						<div className="header">
							<DGHead {...this.props}/>			
						</div>
						<div className="body">
                            <table>
                                <DGComponents.DGNoDataInfoRow columnsCount={DGTABLE_COLS_COUNT} infoText={NO_DATA_MESSAGE}/>
                                <DGComponents.DGRowEmpty columnsCount={DGTABLE_COLS_COUNT}/>
                            </table>
						</div>
					</div>);
        }
    }

    class DGTable extends React.Component<State,{}>{
        render(){
            return (<div className="datagrid" id="dg-lining-residues">
						<div className="header">
							<DGHead {...this.props}/>			
						</div>
						<div className="body">
                            <DGBody {...this.props} />
						</div>
					</div>);
        }
    }

    class DGHead extends React.Component<State,{}>{
        render(){
            return(
                <table>
                    <tr>
                        <th title="Residue" className="col col-1">
                            Residue
                        </th>                         
                    </tr>
                </table>
            );
        };
    }

    class DGBody extends React.Component<State,{}>{ 

        private shortenBackbone(residue:string){
            return residue.replace(/Backbone/g,'');
        }

        private isBackbone(residue:string){
            return residue.indexOf("Backbone") >= 0;
        }

        private selectResidue(residue:string){
            let residueLightEntity = residueStringToResidueLight(residue);
            if(!CommonUtils.Selection.SelectionHelper.isSelectedLight(residueLightEntity)){
                CommonUtils.Selection.SelectionHelper.selectResidueByAuthAsymIdAndAuthSeqNumberWithBallsAndSticks(this.props.app.props.controller,residueLightEntity)
            }
        }

        private getSelect3DLink(residue:string){           
            let residueEl = (this.isBackbone(residue))?<i><strong>{this.shortenBackbone(residue)}</strong></i>:<span>{residue}</span>;
            return <a className="hand" onClick={(e)=>{this.selectResidue(residue)}}>{residueEl}</a>
        }

        private generateRows(){
            if(this.props.data === null){
                return <DGComponents.DGNoDataInfoRow columnsCount={DGTABLE_COLS_COUNT} infoText={NO_DATA_MESSAGE}/>;
            }

            let rows:JSX.Element[] = [];
            
            for(let residue of this.props.data){
                let residueId = residue.split(" ").slice(1,3).join(" ");

                
                rows.push(
                    <DGComponents.DGElementRow columns={[this.getSelect3DLink(residue)]} title={[(this.isBackbone(residue)?residue:"")]} trClass={(this.isBackbone(residue)?"help":"")} />
                );
            }            
            rows.push(<DGComponents.DGRowEmpty columnsCount={DGTABLE_COLS_COUNT} />);

            return rows;
        }

        render(){
            let rows = this.generateRows();
            
            return(
                <table>
                    {rows}
                </table>
            );
        };
    }    

}