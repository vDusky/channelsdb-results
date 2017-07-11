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
            return <div>
                PDB id: <b>{SimpleRouter.GlobalRouter.getCurrentPid()}</b>
            </div>
        }
    }  
}