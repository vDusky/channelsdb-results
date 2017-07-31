namespace ResidueAnnotations.UI{

    import React = LiteMol.Plugin.React
    import LiteMoleEvent = LiteMol.Bootstrap.Event;
    import TunnelUtils = CommonUtils.Tunnels;
    import Transformer = LiteMol.Bootstrap.Entity.Transformer;
    import Visualization = LiteMol.Bootstrap.Visualization;   

    import DGComponents = Datagrid.Components;

    let DGTABLE_COLS_COUNT = 2;

    declare function $(p:any): any;
    declare function datagridOnResize(str:string,str1:string,str2:string):any;

    interface State{
        data: string[] | null,
        app: App,
        isWaitingForData: boolean
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

        state = {
            data: null,
            app: this,
            isWaitingForData: false
        };

        layerIdx = -1;

        sortResidues(residues:string[], useAnnotations?:boolean){
            if(useAnnotations===void 0){
                useAnnotations = false;
            }
            if(useAnnotations && (this.state.isWaitingForData || Annotation.AnnotationDataProvider.getResidueAnnotations(residues[0])===void 0)){
                useAnnotations = false;
            }

            if(residues.length===0){
                return residues;
            }

            interface RType{chain: {authAsymId: string}, authSeqNumber:number};

            let groupFn = (resParsed:RType[])=>{
                let lining:RType[] = [];
                let other:RType[] = [];

                if(useAnnotations){
                    for(let r of resParsed){
                        let annotation = Annotation.AnnotationDataProvider.getResidueAnnotations(`${r.authSeqNumber} ${r.chain.authAsymId}`);
                        
                        //annotation data not ready
                        if(annotation===void 0){
                            other = resParsed;
                            lining = [];
                            break;
                        }
                        
                        //annotation data available
                        if(annotation.length!==0){
                            let isLining = false;
                            for(let a of annotation){
                                if(a.isLining===true){
                                    lining.push(r);
                                    isLining = true;
                                    break;
                                }
                            }

                            if(!isLining){
                                other.push(r);   
                            }
                        }     
                        else{  //no annotation data available
                            other.push(r);
                        }
                    }
                }
                else{
                    other = resParsed;
                }

                return [lining, other];
            }

            return CommonUtils.Residues.sort(residues, groupFn);
        }

        componentDidMount() {
            let list = Annotation.AnnotationDataProvider.getResidueList();
            if(list !== void 0){
                this.setState({data:this.sortResidues(list)});
            }else{
                Annotation.AnnotationDataProvider.subscribeForData((()=>{
                    let list = Annotation.AnnotationDataProvider.getResidueList();
                    if(list === void 0){
                        return;
                    }
                    this.setState({data:this.sortResidues(list, true)});
                    setTimeout(function(){
                        $( window ).trigger('contentResize');
                    },1);
                }).bind(this))
            }
        }

        private dataWaitHandler(){
            this.setState({isWaitingForData:false});
        }

        public invokeDataWait(){
            if(this.state.isWaitingForData){
                return;
            }

            this.setState({isWaitingForData: true});
            Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
        }

        public selectResiude(residueId:string){
            let residueParts = residueId.split(" ").slice(0,2);
            let residue = {chain: {authAsymId: residueParts[1]}, authSeqNumber: Number(residueParts[0])};
            if(!CommonUtils.Selection.SelectionHelper.isSelectedLight(residue)){
                CommonUtils.Selection.SelectionHelper.selectResidueByAuthAsymIdAndAuthSeqNumberWithBallsAndSticks(this.props.controller, residue);
            }
        }

        componentWillUnmount(){
        }

        render() {
            if (this.state.data !== null) {
                return(
                    <div>
                        <DGTable {...this.state} />
                    </div>
                    );
            } 
            
            return <div>
                        <DGNoData {...this.state} />
                    </div>
        }
    }  

    class DGNoData extends React.Component<State,{}>{
        render(){
            return (<div className="datagrid" id="dg-residue-annotations">
						<div className="header">
							<DGHead {...this.props}/>			
						</div>
						<div className="body">
                            <table>
                                <DGComponents.DGNoDataInfoRow columnsCount={DGTABLE_COLS_COUNT} />
                                <DGComponents.DGRowEmpty columnsCount={DGTABLE_COLS_COUNT}/>
                            </table>
						</div>
					</div>);
        }
    }

    class DGTable extends React.Component<State,{}>{
        render(){
            return (<div className="datagrid" id="dg-residue-annotations">
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
                        <th title="Annotation" className="col col-2">
                            Annotation
                        </th>                          
                    </tr>
                </table>
            );
        };
    }

    class DGBody extends React.Component<State,{}>{ 
        private generateLink(annotation:Annotation.ResidueAnnotation){
            if(annotation.reference===""){
                return (annotation.text!== void 0 && annotation.text !== null)?<span>{annotation.text}</span>:<span className="no-annotation"/>;
            }
            return <a target="_blank" href={annotation.link} dangerouslySetInnerHTML={{__html:annotation.text}}></a>
        }   

        private generateSpannedRows(residue:string, annotations: Annotation.ResidueAnnotation[]){
            let trs:JSX.Element[] = [];

            let first = true;
            for(let annotation of annotations){ 
                if(first === true){
                    first = false;
                    trs.push(
                        <tr className={(annotation.isLining)?"highlight":""}>
                            <td rowSpan={(annotations.length>1)?annotations.length:void 0} className={`col col-1`}>
                                <a className="hand" onClick={()=>{this.props.app.selectResiude(residue)}}>{residue}</a>
                            </td>  
                            <td className={`col col-2`} >
                                {this.generateLink(annotation)}
                            </td>
                        </tr>
                    );
                }
                else{
                   trs.push(
                        <tr className={(annotation.isLining)?"highlight":""}>       
                            <td className={`col col-2`} >
                                {this.generateLink(annotation)}
                            </td>
                        </tr>
                    ); 
                }
            }
            return trs;
        }

        private generateRows(){
            if(this.props.data === null){
                return <DGComponents.DGNoDataInfoRow  columnsCount={DGTABLE_COLS_COUNT}/>;
            }

            let residues = this.props.data;
            let rows:JSX.Element[] = [];
            
            for(let residueId of residues){
                let annotation;
                let annotationText = "";
                let annotationSource = "";

                annotation = Annotation.AnnotationDataProvider.getResidueAnnotations(residueId);
                if(annotation === void 0){
                    this.props.app.invokeDataWait();
                    rows.push(
                        <DGComponents.DGElementRow columns={[<a className="hand" onClick={()=>{this.props.app.selectResiude(residueId)}}>{residueId}</a>,<span>Annotation data still loading...</span>]} />
                    );
                }
                else if(annotation !== null && annotation.length>0){
                    rows = rows.concat(
                        this.generateSpannedRows(residueId,annotation)
                    );
                }
                else{
                    rows.push(
                        <DGComponents.DGElementRow columns={[<a className="hand" onClick={()=>{this.props.app.selectResiude(residueId)}}>{residueId}</a>,<span/>,<span/>]} />
                    );
                }
            }            
            rows.push(<DGComponents.DGRowEmpty columnsCount={DGTABLE_COLS_COUNT}/>);

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
	
    class DGRow extends React.Component<{columns: string[]},{}>{
        
        private generateRow(columns: string[]){
            let tds = [];
            for(let i=0;i<columns.length;i++){
                tds.push(
                    <td className={`col col-${i+1}`}>
                        {columns[i]}
                    </td>    
                );
            }

            return tds;
        }

        render(){
            return (
                    <tr>
                        {this.generateRow(this.props.columns)}                     
                    </tr>);
        }
    }

}