namespace PdbIdSign.UI{

    import React = LiteMol.Plugin.React
    import LiteMoleEvent = LiteMol.Bootstrap.Event;

    export function render(target: Element) {
        LiteMol.Plugin.ReactDOM.render(<App />, target);
    }

    export class App extends React.Component<{}, {}> {

        componentDidMount() {
        }

        componentWillUnmount(){
        }

        render() {
            let pdbid = SimpleRouter.GlobalRouter.getCurrentPid();
            return <div>
                <a href={`https://pdbe.org/${pdbid}`} target="_blank">{pdbid} <span className="glyphicon glyphicon-new-window href-ico"></span></a>
            </div>
        }
    }  
}