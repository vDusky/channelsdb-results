namespace ChannelsDescriptions.UI{

    import React = LiteMol.Plugin.React
    import LiteMoleEvent = LiteMol.Bootstrap.Event;

    import DGComponents = Datagrid.Components;

    import Tooltips = CommonUtils.Tooltips;
    
    let DGTABLE_COLS_COUNT = 2;

    declare function $(p:any): any;
    declare function datagridOnResize(str:string):any;

    interface State{
        data: DataInterface.Tunnel[] | null,
        app: App,
        isWaitingForData: boolean
    };

    export function render(target: Element, plugin: LiteMol.Plugin.Controller) {
        LiteMol.Plugin.ReactDOM.render(<App controller={plugin} />, target);
    }

    export class App extends React.Component<{controller: LiteMol.Plugin.Controller }, State> {

        private interactionEventStream: LiteMol.Bootstrap.Rx.IDisposable | undefined = void 0;

        state:State = {
            data: null,
            app: this,
            isWaitingForData: false
        };

        componentDidMount() {
            LiteMoleEvent.Tree.NodeAdded.getStream(this.props.controller.context).subscribe(e => {
                if(e.data.tree !== void 0 && e.data.ref === "channelsDB-data"){
                    let toShow:DataInterface.Tunnel[] = [];
                    let data = e.data.props.data as DataInterface.ChannelsDBData;
                    toShow = toShow.concat(data.Channels.CSATunnels_MOLE);
                    toShow = toShow.concat(data.Channels.CSATunnels_Caver);
                    toShow = toShow.concat(data.Channels.ReviewedChannels_MOLE);
                    toShow = toShow.concat(data.Channels.ReviewedChannels_Caver);
                    toShow = toShow.concat(data.Channels.CofactorTunnels_MOLE);
                    toShow = toShow.concat(data.Channels.CofactorTunnels_Caver);
                    toShow = toShow.concat(data.Channels.TransmembranePores_MOLE);
                    toShow = toShow.concat(data.Channels.TransmembranePores_Caver);
                    toShow = toShow.concat(data.Channels.ProcognateTunnels_MOLE);
                    toShow = toShow.concat(data.Channels.ProcagnateTunnels_Caver);
                    toShow = toShow.concat(data.Channels.AlphaFillTunnels_MOLE);
                    toShow = toShow.concat(data.Channels.AlphaFillTunnels_Caver);
                    let state = this.state;
                    state.data = toShow;
                    this.setState(state);
                }
            });
        }

        private dataWaitHandler(){
            let state = this.state;
            state.isWaitingForData = false;
            this.setState(state);
        }

        public invokeDataWait(){
            if(this.state.isWaitingForData){
                return;
            }

            let state = this.state;
            state.isWaitingForData = true;
            this.setState(state);
            Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
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
            
            return <div/>
        }
    }  

    class DGTable extends React.Component<State,{}>{
        render(){
            return (<div className="datagrid" id="dg-channels-descriptions">
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
                        <th title="Name" className="col col-1">
                            Name
                        </th>
                        <th title="Description" className="col col-2">
                            Description
                        </th>                 
                    </tr>
                </table>
            );
        };
    }

    class DGBody extends React.Component<State,{}>{

        private generateRows(){
            if(this.props.data === null){
                return [
                    <tr><td colSpan={DGTABLE_COLS_COUNT} >There are no data to be displayed...</td></tr>,
                    <DGComponents.DGRowEmpty columnsCount={DGTABLE_COLS_COUNT}/>
                ]
            }

            let rows = [];

            for(let tunnel of this.props.data){
                let mainAnnotation = Annotation.AnnotationDataProvider.getChannelAnnotation(tunnel.Id);
                let annotations = Annotation.AnnotationDataProvider.getChannelAnnotations(tunnel.Id);

                if(annotations === void 0 || mainAnnotation === void 0){
                    this.props.app.invokeDataWait();
                }

                if(annotations !== void 0 && annotations !== null && mainAnnotation !== void 0 && mainAnnotation !== null){
                    for(let annotation of annotations){
                        let name = `${mainAnnotation.text} / ${annotation.text}`;
                        if(mainAnnotation.text===annotation.text){
                            name = mainAnnotation.text;
                        }
                        let description = annotation.description;
                        if(description===""){
                            continue;
                        }

                        rows.push(
                            <DGRow tunnelName={name} description={description} channelId={tunnel.Id} app={this.props.app}/>
                        );
                    }
                }
            }

            if(rows.length===0){
                return [
                    <tr><td colSpan={DGTABLE_COLS_COUNT} >There are no data to be displayed...</td></tr>,
                    <DGComponents.DGRowEmpty columnsCount={DGTABLE_COLS_COUNT}/>
                ]
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
		
    class DGRow extends React.Component<{tunnelName: string, description:string, channelId:string, app: App},{}>{
        private selectChannel(channelId:string){
            Bridge.Events.invokeChannelSelect(channelId);
        }

        render(){
            let name = this.props.tunnelName;
            let description = this.props.description;

            return (
                    <tr>
                        <td className="col col-1">
                            <a className="hand" onClick={()=>this.selectChannel(this.props.channelId)}>{name}</a>
                        </td>
                        <td className="col col-2">
                            {description}
                        </td>                  
                    </tr>);
        }
    }

}