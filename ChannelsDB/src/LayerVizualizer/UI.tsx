
namespace LayersVizualizer.UI{

    import React = LiteMol.Plugin.React
    import Event = LiteMol.Bootstrap.Event;
    
    import Q = LiteMol.Core.Structure.Query;
    import AQ = Q.Algebraic;
    import Transformer = LiteMol.Bootstrap.Entity.Transformer;
    import Tree = LiteMol.Bootstrap.Tree;
    import Transform = Tree.Transform;   
    import Visualization = LiteMol.Bootstrap.Visualization;   

    declare function $(p:any): any;

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

    export function render(vizualizer: Vizualizer, target: Element, plugin: LiteMol.Plugin.Controller) {
        LiteMol.Plugin.ReactDOM.render(<App vizualizer={vizualizer} controller={plugin} />, target);
    }

    export class App extends React.Component<{ vizualizer: Vizualizer, controller: LiteMol.Plugin.Controller }, State> {

        private interactionEventStream: LiteMol.Bootstrap.Rx.IDisposable | undefined = void 0;

        state = {
            instanceId: -1,
            hasData: false,
            data: [] as DataInterface.LayerData[],
            layerId: 0,
            coloringPropertyKey: "",
            customColoringPropertyKey: "",
            radiusPropertyKey: "MinRadius" as RadiusProperty,
            customRadiusPropertyKey: "MinRadius" as RadiusProperty,
            colorBoundsMode: "Absolute" as ColorBoundsMode,
            isDOMReady: false,
            app: this,
            currentTunnelRef: "",
            isLayerSelected: false
        };

        vizualizer: Vizualizer

        componentDidMount() {
            var vizualizer = this.props.vizualizer;

            vizualizer.setColorBoundsMode(this.state.colorBoundsMode);

            this.setState({
                instanceId: vizualizer.getPublicInstanceIdx(),
                customColoringPropertyKey:vizualizer.getCustomColoringPropertyKey(),
                coloringPropertyKey:vizualizer.getColoringPropertyKey(),
                customRadiusPropertyKey:vizualizer.getCustomRadiusPropertyKey(),
                radiusPropertyKey:vizualizer.getRadiusPropertyKey(),
                colorBoundsMode:this.state.colorBoundsMode
            });
            this.vizualizer = vizualizer;
            
            var interactionHandler = function showInteraction(type: string, i: ChannelEventInfo | undefined, app: App) {
                if (!i || i.source == null || i.source.props.tag === void 0 || i.source.props.tag.type === void 0) {
                    return;    
                }

                if(i.source.props.tag.type == "Tunnel" 
                    || i.source.props.tag.type == "Path"
                    || i.source.props.tag.type == "Pore"
                    || i.source.props.tag.type == "MergedPore"){
                    window.setTimeout(()=>{
                        app.setState({currentTunnelRef: i.source.ref, isLayerSelected: false});
                        $('#left-tabs').tabs("option", "active", 0);
                        let layers = DataInterface.convertLayersToLayerData(i.source.props.tag.element.Layers);
                        vizualizer.setData(layers);
                        app.setState({data: layers, hasData: true, isDOMReady:false, instanceId: vizualizer.getPublicInstanceIdx()});
                        vizualizer.vizualize();  
                        app.setState({data: layers, hasData: true, isDOMReady:true, instanceId: vizualizer.getPublicInstanceIdx()});
                    },50);
                    //Testing themes... TODO: remove/move to another location...
                    //app.applyTheme(app.generateColorTheme(),app.props.controller,app.state.currentTunnelRef);                    
                }
                
            }

            this.interactionEventStream = Event.Visual.VisualSelectElement.getStream(this.props.controller.context)
                .subscribe(e => interactionHandler('select', e.data as ChannelEventInfo, this));

            $( window ).on("lvCcontentResize",(()=>{
                this.forceUpdate();
            }).bind(this));
            $( window ).on("resize",(()=>{
                this.forceUpdate();
            }).bind(this));
        }
        
        componentWillUnmount(){
            if(this.interactionEventStream !== void 0){
                this.interactionEventStream.dispose();
            }
        }

        render() {
            if (this.state.hasData) {
                return <PaintingArea {...this.state} />
            } 
            
            return <Hint {...this.state} />
        }
    }  

    interface State{
        instanceId: number,
        hasData: boolean,
        data: DataInterface.LayerData[],
        layerId: number,
        coloringPropertyKey: string,
        customColoringPropertyKey: string,
        radiusPropertyKey: RadiusProperty,
        customRadiusPropertyKey: RadiusProperty,
        colorBoundsMode: ColorBoundsMode
        isDOMReady: boolean,
        app: App,
        currentTunnelRef: string,
        isLayerSelected: boolean
    };

    class PaintingArea extends React.Component<State,{}>{
        render(){
            return(
                <div className="layerVizualizer"
                    id={`layer-vizualizer-ui${this.props.instanceId}`}
                    >
                    <div className="wrapper-container">
                        <Controls {...this.props} isCustom={false} />
                        <CanvasWrapper {...this.props} />
                        <Controls {...this.props} isCustom={true} />
                    </div>
                    <CommonControls {...this.props} />
                </div>
            );
        };
    }

    class Hint extends React.Component<State,{}>{
        render(){
            return(
                <div id={`layer-vizualizer-hint-div${this.props.instanceId}`}
                    className="layer-vizualizer-hint-div"
                    >
                        Click on one of available channels to see more information...
                    </div>
            );
        }
    }

    class ColorMenuItem extends React.Component<State & {propertyName:string, isCustom:boolean},{}>{
        private changeColoringProperty(e: React.MouseEvent<HTMLAreaElement>){
            let targetElement = (e.target as HTMLElement);
            let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
            let instance = Vizualizer.ACTIVE_INSTANCES[instanceIdx];

            let propertyName = targetElement.getAttribute("data-propertyname");
            if(propertyName === null){
                console.log("No property name found!");
                return;
            }

            if(this.props.isCustom){
                console.log(`setting custom property key: ${propertyName}`);
                instance.setCustomColoringPropertyKey(propertyName);
            }
            else{
                console.log(`setting regular property key: ${propertyName}`);
                instance.setColoringPropertyKey(propertyName);                   
            }

            instance.vizualize();
            
            if(this.props.isCustom){
                this.props.app.setState({customColoringPropertyKey:propertyName});
            }
            else{
                this.props.app.setState({coloringPropertyKey:propertyName});
            }
        }

        render(){
            return(
                <li><a data-instanceidx={this.props.instanceId} data-propertyname={this.props.propertyName} onClick={this.changeColoringProperty.bind(this)}>{this.props.propertyName}</a></li>
            );
        }
    }

    class RadiusMenuItem extends React.Component<State & {propertyName:string, isCustom:boolean},{}>{
        private changeRadiusProperty(e: React.MouseEvent<HTMLAreaElement>){
            let targetElement = (e.target as HTMLElement);
            let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
            let instance = Vizualizer.ACTIVE_INSTANCES[instanceIdx];

            let propertyName = targetElement.getAttribute("data-propertyname") as RadiusProperty;
            if(propertyName === null || propertyName === void 0){
                return;
            }

            if(this.props.isCustom){
                instance.setCustomRadiusPropertyKey(propertyName);
            }
            else{
                instance.setRadiusPropertyKey(propertyName);
            }

            instance.vizualize();
            
            if(this.props.isCustom){
                this.props.app.setState({customRadiusPropertyKey:propertyName});
            }
            else{
                this.props.app.setState({radiusPropertyKey:propertyName});
            }
        }

        render(){
            return(
                <li><a data-instanceidx={this.props.instanceId} data-propertyname={this.props.propertyName} onClick={this.changeRadiusProperty.bind(this)}>{this.props.propertyName}</a></li>
            );
        }
    }

    class ColorBoundsMenuItem extends React.Component<State & {mode:string},{}>{
        private changeColorBoundsMode(e: React.MouseEvent<HTMLAreaElement>){
            let targetElement = (e.target as HTMLElement);
            let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
            let instance = Vizualizer.ACTIVE_INSTANCES[instanceIdx];

            let mode = targetElement.getAttribute("data-mode") as ColorBoundsMode;
            if(mode === null || mode === void 0){
                return;
            }

            instance.setColorBoundsMode(mode);
            instance.vizualize();
            
            this.props.app.setState({colorBoundsMode:mode});
        }

        render(){
            return(
                <li><a data-instanceidx={this.props.instanceId} data-mode={this.props.mode} onClick={this.changeColorBoundsMode.bind(this)}>{this.props.mode}</a></li>
            );
        }
    }

    class BootstrapDropUpMenuButton extends React.Component<{label: string, items: JSX.Element[]},{}>{
        render(){
            return <div className="btn-group dropup">
                    <button type="button" className="btn btn-xs btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.label} <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        {this.props.items}
                    </ul>
                </div>
        }
    }

    class Controls extends React.Component<State & {isCustom:boolean},{}>{
        render(){
            return(
                <div className="controls">
                    <RadiusSwitch state={this.props} isCustom={this.props.isCustom} radiusProperty={(this.props.isCustom)?this.props.customRadiusPropertyKey:this.props.radiusPropertyKey} />
                    <ColorBySwitch state={this.props} isCustom={this.props.isCustom} coloringProperty={(this.props.isCustom)?this.props.customColoringPropertyKey:this.props.coloringPropertyKey} />
                </div>
            );
        }
    }
    
    class CommonControls extends React.Component<State,{}>{

        render(){
            return(
                <div className="controls">
                    <CommonButtonArea {...this.props} />
                </div>
            );
        }
    }

    class ColorBySwitch extends React.Component<{state: State, coloringProperty:string, isCustom:boolean},{}>{
        private generateColorMenu(){

            let rv = [];
            for(let prop in this.props.state.data[0].Properties){
                rv.push(
                    <ColorMenuItem propertyName={prop} isCustom={this.props.isCustom} {...this.props.state} />
                );
            }

            return <BootstrapDropUpMenuButton items={rv} label={this.props.coloringProperty} />
        }

        render(){
            let items = this.generateColorMenu();
            return (
                <span className="block-like">
                    <span className="control-label">Color by:</span> {items}
                </span>
                );
        }
    }

    class RadiusSwitch extends React.Component<{state: State, radiusProperty:RadiusProperty,isCustom:boolean},{}>{
        private generateRadiusSwitch(){
            let properties = ["MinRadius","MinFreeRadius"];
            let rv = [];
            for(let prop of properties){
                rv.push(
                    <RadiusMenuItem propertyName={prop} isCustom={this.props.isCustom} {...this.props.state} />
                );
            }

            return <BootstrapDropUpMenuButton items={rv} label={this.props.radiusProperty} />
        }

        render(){
            let items = this.generateRadiusSwitch();
            return (
                <span className="block-like">
                    <span className="control-label">Tunnel radius:</span> {items}
                </span>
                );
        }
    }

    class CommonButtonArea extends React.Component<State,{}>{
        private generateColorBoundsSwitch(){
            let properties = ["Min/max","Absolute"];
            let rv = [];
            for(let prop of properties){
                rv.push(
                    <ColorBoundsMenuItem mode={prop} {...this.props} />
                );
            }
            
            let label = properties[(this.props.colorBoundsMode=="Min/max")?0:1];

            return <BootstrapDropUpMenuButton items={rv} label={label} />
        }

        render(){
            let items = this.generateColorBoundsSwitch();
            return (
                <div className="common-area">
                    <ColorBoundsSwitchButton items={items} />
                    <ExportButton instanceId={this.props.instanceId} />
                </div>
                );
        }
    }

    class ExportTypeButton extends React.Component<{instanceId:number,exportType:string},{}>{
        
        private export(e: React.MouseEvent<HTMLAreaElement>){
            let targetElement = (e.target as HTMLElement);
            let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
            let instance = Vizualizer.ACTIVE_INSTANCES[instanceIdx];

            let exportType = targetElement.getAttribute("data-exporttype");
            if(exportType === null){
                return;
            }

            let imgDataUrl = null;

            switch(exportType){
                case "PNG":
                    imgDataUrl = instance.exportImage();
                    break;
                case "SVG":
                    imgDataUrl = instance.exportSVGImage();
                    break;
                /*case "PDF":
                    imgDataUrl = instance.exportPDF();
                    break;*/
                default:
                    throw new Error(`Unsupported export type '${exportType}'`);
            }

            var win = window.open(imgDataUrl, '_blank');
            win.focus();
        }

        render(){
            return <li><a data-instanceidx={this.props.instanceId} data-exporttype={this.props.exportType} onClick={this.export.bind(this)}>{this.props.exportType}</a></li>
        }
    }

    class ExportButton extends React.Component<{instanceId:number},{}>{
        private generateItems(){
            let rv = [] as JSX.Element[];
            let supportedExportTypes = ["PNG","SVG"/*,"PDF"*/];
            for(let type of supportedExportTypes){
                rv.push(
                    <ExportTypeButton instanceId={this.props.instanceId} exportType={type} />
                );
            }
            
            return rv;
        }

        render(){
            let label = "Export";
            let rv = this.generateItems();
            return (<BootstrapDropUpMenuButton items={rv} label={label} />);
        }
    }

    class ColorBoundsSwitchButton extends React.Component<{items:JSX.Element},{}>{
        render(){
            return (
                <span className="color-bounds-button-container">
                    <span className="control-label" title="Color bounds for both halfs of vizualized tunnel.">
                        Color bounds:
                    </span> {this.props.items}
                </span>
                );
        }
    }

    class CanvasWrapper extends React.Component<State,{}>{
        render(){
            return (
            <div className="canvas-wrapper">
               <RealCanvas {...this.props} />
               <ImgOverlay {...this.props} />
               <InteractionMap {...this.props} />
            </div>
            );
        }
    }

    class ImgOverlay extends React.Component<State,{}>{
        render(){
            return (
                <img className="fake-canvas"
                    id={`layer-vizualizer-fake-canvas${this.props.instanceId}`}
                    useMap={`#layersInteractiveMap${this.props.instanceId}`}
                    src="images/no_img.png"
                    ></img>
            );
        }
    }

    class RealCanvas extends React.Component<State,{}>{
        render(){
            return (
                <canvas id={`layer-vizualizer-canvas${this.props.instanceId}`} 
                    className="layer-vizualizer-canvas"
                    width="700"
                    height="150"
                    ></canvas>
            );
        }
    }

    interface TunnelScale{
                xScale:number,
                yScale:number
            };
    interface Bounds{
        x:number,
        y:number,
        width:number,
        height:number
    };

    class InteractionMap extends React.Component<State,{}>{

        private getLayerResidues(layerIdx:number):{authAsymId:string, authSeqNumber:number}[]{
            let res = [];
            for(let residue of this.props.data[layerIdx].Residues){
                let parts = (residue as string).split(" ");
                res.push({
                    authAsymId: parts[2],
                    authSeqNumber: Number(parts[1]).valueOf()
                });
            }

            return res;
        }

        private resetFocusToTunnel(){
            LiteMol.Bootstrap.Command.Entity.Focus.dispatch(
                this.props.app.props.controller.context, this.props.app.props.controller.context.select(
                    this.props.app.state.currentTunnelRef
                )
            );
        }

        private showLayerResidues3DAndFocus(layerIdx:number){
            /*
            let theme = generateLayerSelectColorTheme(layerIdx,this.props.app);
            applyTheme(theme,this.props.app.props.controller,this.props.app.state.currentTunnelRef);
            */
            let residues = this.getLayerResidues(layerIdx);
            let query = LiteMol.Core.Structure.Query.residues(
                ...residues
            );

            CommonUtils.Selection.SelectionHelper.clearSelection(this.props.app.props.controller);
           
            let t = this.props.app.props.controller.createTransform();
            t.add('polymer-visual', Transformer.Molecule.CreateSelectionFromQuery, { query, name: 'Residues' }, { ref: CommonUtils.Selection.SelectionHelper.getSelectionVisualRef()})
                .then(Transformer.Molecule.CreateVisual, { style: Visualization.Molecule.Default.ForType.get('BallsAndSticks') });
            
            this.props.app.props.controller.applyTransform(t)
                .then(res=>{
                    //Focus
                    LiteMol.Bootstrap.Command.Entity.Focus.dispatch(this.props.app.props.controller.context, this.props.app.props.controller.context.select(CommonUtils.Selection.SelectionHelper.getSelectionVisualRef()));
                });            
        }

        private displayDetailsEventHandler(e: React.MouseEvent<HTMLAreaElement>){
            let targetElement = (e.target as HTMLElement);
            let layerIdx = Number(targetElement.getAttribute("data-layeridx")).valueOf();
            let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
            let instance = Vizualizer.ACTIVE_INSTANCES[instanceIdx];
            
            instance.highlightHitbox(layerIdx);
            if(!this.props.app.state.isLayerSelected){
                this.props.app.setState({layerId: layerIdx});    
                $( window ).trigger('layerTriggered',layerIdx);
            }      
        }

        private displayLayerResidues3DEventHandler(e: React.MouseEvent<HTMLAreaElement>){
            let targetElement = (e.target as HTMLElement);
            let layerIdx = Number(targetElement.getAttribute("data-layeridx")).valueOf();
            let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
            let instance = Vizualizer.ACTIVE_INSTANCES[instanceIdx];      
            
            if(instance.getSelectedLayer() === layerIdx){
                this.props.app.state.isLayerSelected = false;
                CommonUtils.Selection.SelectionHelper.clearSelection(this.props.app.props.controller);
                this.resetFocusToTunnel();
                instance.deselectLayer();
                instance.highlightHitbox(layerIdx);
            }
            else{
                this.props.app.setState({layerId: layerIdx,isLayerSelected: true});   
                this.showLayerResidues3DAndFocus(layerIdx);
                instance.deselectLayer();
                instance.selectLayer(layerIdx);
                $( window ).trigger('layerTriggered',layerIdx);
                $( window ).trigger('resize');
            }
        }

        private getTunnelScale(tunnel:Tunnel | null):TunnelScale{
            let xScale = 0;
            let yScale = 0;

            if(tunnel !== null){
                let scale = tunnel.getScale();
                if(scale !== null){
                    xScale = scale.x;
                    yScale = scale.y;
                }
            }

            return {
                xScale,
                yScale
            };
        }

        private transformCoordinates(x:number,y:number,width:number,height:number,scale:TunnelScale,bounds:Bounds):{
            sx:number,sy:number,dx:number,dy:number}{
            let vizualizer = Vizualizer.ACTIVE_INSTANCES[this.props.instanceId];
            
            //Real width can be different to canvas width - hitboxes could run out of space
            let realXScale = 1;
            let realWidth = vizualizer.getCanvas().offsetWidth.valueOf();
            if(realWidth != 0){
                realXScale = 1/(vizualizer.getCanvas().width/realWidth);
            }

            let realYScale = 1;
            let realHeight = vizualizer.getCanvas().offsetHeight.valueOf();
            if(realHeight != 0){
                realYScale = 1/(vizualizer.getCanvas().height/realHeight);
            }

            return {
                sx: (bounds.x + x * scale.xScale)* realXScale,
                sy: (bounds.y + y * scale.yScale) * realYScale,
                dx: (bounds.x + (x+width) * scale.xScale) * realXScale,
                dy: (bounds.y + (y+height) * scale.yScale) * realYScale
            };

        }

        private makeCoordinateString(x:number,y:number,width:number,height:number,scale:TunnelScale,bounds:Bounds):string{
            let coordinates = this.transformCoordinates(x,y,width,height,scale,bounds);
            return String(coordinates.sx)+','
                        +String(coordinates.sy)+','
                        +String(coordinates.dx)+','
                        +String(coordinates.dy);
        }

        private generatePhysicalHitboxesCoords(): {layerIdx:number,coords:string}[]{
            let vizualizer = Vizualizer.ACTIVE_INSTANCES[this.props.instanceId];
            let data = this.props.data;

            //Data was not prepared yet
            if(vizualizer.isDataDirty()){
                vizualizer.prepareData();
            }

            let hitboxes = vizualizer.getHitboxes();
            let tunnels = vizualizer.getTunnels();

            if(tunnels === null 
                || hitboxes === null
                || (hitboxes.defaultTunnel === null && hitboxes.customizable === null)){
                    return [];
            }

            let defaultTunnel = tunnels.default;
            let customizableTunnel = tunnels.customizable;

            let dTproperties = null;
            let dTbounds = null;
            if(defaultTunnel !== null){
                dTproperties = this.getTunnelScale(defaultTunnel.tunnel);
                dTbounds = defaultTunnel.bounds;
            }
            let cTproperties = null;
            let cTbounds = null;
            if(customizableTunnel !== null){
                cTproperties = this.getTunnelScale(customizableTunnel.tunnel);
                cTbounds = customizableTunnel.bounds;
            }
            
            let rv = [];
            for(let i=0;i<data.length;i++){
                if(hitboxes.defaultTunnel !== null && dTproperties !== null && dTbounds !== null){
                    let hitbox = hitboxes.defaultTunnel[i];
                    rv.push({
                            layerIdx: i,
                            coords:this.makeCoordinateString(hitbox.x,hitbox.y,hitbox.width,hitbox.height,dTproperties,dTbounds)
                        });
                }
                if(hitboxes.customizable !== null && cTproperties !== null && cTbounds !== null){
                    let hitbox = hitboxes.customizable[i];
                    rv.push({
                            layerIdx:i,
                            coords:this.makeCoordinateString(hitbox.x,hitbox.y,hitbox.width,hitbox.height,cTproperties,cTbounds)
                        });
                }
            }

            return rv;
        }

        render(){
            let areas = [];
            if(this.props.isDOMReady){
                let hitboxesCoords = this.generatePhysicalHitboxesCoords();
                for(let i=0;i<hitboxesCoords.length;i++){
                    areas.push(<area shape="rect" 
                        coords={hitboxesCoords[i].coords.valueOf()} 
                        data-layeridx={String(hitboxesCoords[i].layerIdx.valueOf())}
                        data-instanceidx={String(this.props.instanceId)}
                        onMouseOver={this.displayDetailsEventHandler.bind(this)}
                        onMouseDown={this.displayLayerResidues3DEventHandler.bind(this)} />);
                }
            }

            return (
                <map name={`layersInteractiveMap${this.props.instanceId}`} 
                    id={`layer-vizualizer-hitbox-map${this.props.instanceId}`}
                    >
                    {areas}
                </map>
            );
        }
    }
}