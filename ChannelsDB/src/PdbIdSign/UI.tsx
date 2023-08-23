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
            let pid = SimpleRouter.GlobalRouter.getCurrentPid();
            let subDB = SimpleRouter.GlobalRouter.getCurrentDB();
            return <div>
                <a href={subDB === "pdb" ? `https://pdbe.org/${pid}` : `https://alphafill.eu/model?id=${pid}`} style={subDB === "pdb" ? {} : {fontSize: "14"}} target="_blank">{pid} <span className="glyphicon glyphicon-new-window href-ico"></span></a>
            </div>
        }
    }  
}