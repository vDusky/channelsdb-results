/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */

namespace LiteMol.Example.Channels.State {

    import Transformer = Bootstrap.Entity.Transformer;

    export interface SurfaceTag { type: string, element?: any }

    function showDefaultVisuals(plugin: Plugin.Controller, data: any, channelCount: number) {
        return new Promise(res => //Channels.Tunnels.
            showChannelVisuals(plugin, data.slice(0, channelCount), true)/*.then(() => { 
                let cavity = data.Cavities.Cavities[0];
                if (cavity) {
                    showCavityVisuals(plugin, [/* cavity *//*], true).then(() => res());
                }
        })*/);
    }

    export function loadData(plugin: Plugin.Controller, pdbId: string, url: string) {
        return new Promise<any>((res, rej) => {
            plugin.clear();

            let model = plugin.createTransform()
                .add(plugin.root, Transformer.Data.Download, { url: `https://www.ebi.ac.uk/pdbe/static/entry/${pdbId}_updated.cif`, type: 'String', id: pdbId })
                .then(Transformer.Molecule.CreateFromData, { format: Core.Formats.Molecule.SupportedFormats.mmCIF }, { isBinding: true })
                .then(Transformer.Molecule.CreateModel, { modelIndex: 0 })
                .then(Transformer.Molecule.CreateMacromoleculeVisual, { polymer: true, polymerRef: 'polymer-visual', het: true })

            let data = plugin.createTransform().add(plugin.root, Transformer.Data.Download, { url, type: 'String', id: 'MOLE Data' }, { isHidden: true })
                .then(Transformer.Data.ParseJson, { id: 'MOLE Data' }, { ref: 'mole-data' });

            plugin.applyTransform(model)
                .then(() => {
                    plugin.command(Bootstrap.Command.Entity.Focus, plugin.context.select('polymer-visual'));
                });

            plugin.applyTransform(data)
                .then(() => {
                    let data = plugin.context.select('mole-data')[0] as Bootstrap.Entity.Data.Json;
                    if (!data) rej('Data not available.');
                    else {
                        showDefaultVisuals(plugin, data.props.data, data.props.data.length).then(() => res(data.props.data));
                    }
                })
                .catch(e => rej(e));
        });
    }

    function createSurface(mesh: any) {
        // wrap the vertices in typed arrays
        if (!(mesh.Vertices instanceof Float32Array)) {
            mesh.Vertices = new Float32Array(mesh.Vertices);
        }
        if (!(mesh.Vertices instanceof Uint32Array)) {
            mesh.Triangles = new Uint32Array(mesh.Triangles);
        }
        
        let surface = <Core.Geometry.Surface>{
            vertices: mesh.Vertices,
            vertexCount: (mesh.Vertices.length / 3) | 0,
            triangleIndices: new Uint32Array(mesh.Triangles),
            triangleCount: (mesh.Triangles.length / 3) | 0,
        };

        return surface;
    }

    let colorIndex = Visualization.Molecule.Colors.DefaultPallete.length - 1;
    function nextColor() {
        return Visualization.Color.random();

        // can use the build in palette for example like this:
        // let color = Visualization.Molecule.Colors.DefaultPallete[colorIndex];
        // colorIndex--;
        // if (colorIndex < 0) colorIndex = Visualization.Molecule.Colors.DefaultPallete.length - 1;
        // return color;
    }

    export interface XYZCoords { X: Number, Y: Number, Z: Number }
    export interface TunnelSphereData { ID: Number, Center: XYZCoords, Radius: Number, Distance: Number }
    export interface TunnelSpheres { Centerline: TunnelSphereData[] }
    export type PositionTable = Core.Utils.DataTable<Position>

    function createTunnelSurface(tunnelData: TunnelSpheres){
        let posTableBuilder = Core.Utils.DataTable.builder<Core.Structure.Position>(tunnelData.Centerline.length);
        
        posTableBuilder.addColumn("x", Core.Utils.DataTable.customColumn<Core.Structure.Position>());
        posTableBuilder.addColumn("y", Core.Utils.DataTable.customColumn<Core.Structure.Position>());
        posTableBuilder.addColumn("z", Core.Utils.DataTable.customColumn<Core.Structure.Position>());

        let rowIdx = 0;
        let positions = posTableBuilder.seal(); 
        for(let sphere of tunnelData.Centerline){
            
            positions.x[rowIdx] = sphere.Center.X.valueOf();
            positions.y[rowIdx] = sphere.Center.Y.valueOf();
            positions.z[rowIdx] = sphere.Center.Z.valueOf();

            rowIdx++;
        }
        
        return LiteMol.Core.Geometry.MolecularSurface.computeMolecularSurfaceAsync({
            positions,
            atomIndices: positions.indices,
            parameters:  {
                atomRadius: ((i: number) => {
                    return tunnelData.Centerline[i].Radius.valueOf();
                }),
                //density: 1,
                probeRadius: 0,
                smoothingIterations: 2,
                interactive: false
            }                
        }).run();
    }
    
    function createTunnelSurface_ugly(tunnelData: TunnelSpheres){
        let b = Visualization.Primitive.Builder.create();
                
        for(let sphere of tunnelData.Centerline){
            let s = { 
                type: "Sphere", 
                center: {
                    x:sphere.Center.X,
                    y:sphere.Center.Y,
                    z:sphere.Center.Z
                }, 
                radius: sphere.Radius, 
                id: sphere.ID
            } as Visualization.Primitive.Shape;
            b.add(s);
        }
        
        return b.buildSurface().run();

    }

    function showSurfaceVisuals(plugin: Plugin.Controller, elements: any[], visible: boolean, type: string, label: (e: any) => string, alpha: number): Promise<any> {

        for (let element of elements) {

            let t = plugin.createTransform();

            if (!element.__id) element.__id = Bootstrap.Utils.generateUUID();
            if (!!element.__isVisible === visible) continue;

            element.__isVisible = visible;
            if (!element.__color) {
                // the colors should probably be initialized when the data is loaded
                // so that they are deterministic...
                element.__color = nextColor();
            }

            if (!visible) {
                plugin.command(Bootstrap.Command.Tree.RemoveNode, element.__id);
            } else {
                let sphereSurface = createTunnelSurface(element);
                
                sphereSurface.then((res) => {
                    let surface = res;
                    t.add('mole-data', CreateSurface, {
                        label: label(element),
                        tag: { type, element },
                        surface: surface.surface,
                        color: element.__color as Visualization.Color,
                        isInteractive: true,
                        transparency: { alpha }
                    }, { ref: element.__id, isHidden: true });

                    plugin.applyTransform(t).then(() => {
                        element.__isBusy = false;
                    }).catch(e => {
                        return new Promise<any>((rej) => {
                            rej(e);
                        });
                    });
                }).catch(e => {
                    return new Promise<any>((rej) => {
                            rej(e);
                        });
                });
                    
            }
        }

        return new Promise<any>((res, rej) => {
            for (let element of elements) {
                element.__isBusy = false;
            }
            res();
        }); 
    }

    export function showCavityVisuals(plugin: Plugin.Controller, cavities: any[], visible: boolean): Promise<any> {
        return showSurfaceVisuals(plugin, cavities, visible, 'Cavity', (cavity: any) => `${cavity.Type} ${cavity.Id}`, 0.33);
    }

    export function showChannelVisuals(plugin: Plugin.Controller, channels: any[], visible: boolean): Promise<any> {
        return showSurfaceVisuals(plugin, channels, visible, 'Channel', (channel: any) => `${channel.Type} ${channel.Id + 1}`, 1.0);
    }

    function createOriginsSurface(origins: any): Promise<Core.Geometry.Surface> {
        if (origins.__surface) return Promise.resolve(origins.__surface);

        let s = Visualization.Primitive.Builder.create();
        let id = 0;
        for (let p of origins.Points) {
            s.add({ type: 'Sphere', id: id++, radius: 1.69, center: { x: p.X, y: p.Y, z: p.Z } });
        }
        return s.buildSurface().run();        
    }

    export function showOriginsSurface(plugin: Plugin.Controller, origins: any, visible: boolean): Promise<any> {
        if (!origins.__id) origins.__id = Bootstrap.Utils.generateUUID();
        if (!origins.Points.length || !!origins.__isVisible === visible) return Promise.resolve();

        origins.__isVisible = visible;
        if (!visible) {
            plugin.command(Bootstrap.Command.Tree.RemoveNode, origins.__id);
            origins.__isBusy = false;
            return Promise.resolve();
        }

        if (!origins.__color) {
            // the colors should probably be initialized when the data is loaded
            // so that they are deterministic...
            origins.__color = nextColor();
        }

        return new Promise((res, rej) => {
            createOriginsSurface(origins).then(surface => {
                let t = plugin.createTransform()
                    .add('mole-data', CreateSurface, {
                        label: 'Origins ' + origins.Type,
                        tag: { type: 'Origins', element: origins },
                        surface,
                        isInteractive: true,
                        color: origins.__color as Visualization.Color
                    }, { ref: origins.__id, isHidden: true });
                
                plugin.applyTransform(t).then(() => {
                    origins.__isBusy = false;
                    res();
                }).catch(rej);
            }).catch(rej);
        });
    }

    export interface CreateSurfaceProps { label?: string, tag?: SurfaceTag, surface?: Core.Geometry.Surface, color?: Visualization.Color, transparency?: Visualization.Theme.Transparency, isWireframe?: boolean, isInteractive?: boolean }
    export const CreateSurface = Bootstrap.Tree.Transformer.create<Bootstrap.Entity.Data.Json, Bootstrap.Entity.Visual.Surface, CreateSurfaceProps>({
        id: 'mole-example-create-surface',
        name: 'Create Surface',
        description: 'Create a surface entity.',
        from: [Bootstrap.Entity.Data.Json],
        to: [Bootstrap.Entity.Visual.Surface],
        defaultParams: () => ({}),
        isUpdatable: false
    }, (context, a, t) => {
        let theme = Visualization.Theme.createUniform({ colors: LiteMol.Core.Utils.FastMap.ofArray<string, LiteMol.Visualization.Color>([['Uniform', t.params.color!]]), interactive: t.params.isInteractive, transparency: t.params.transparency });
        let style: Bootstrap.Visualization.Style<'Surface', {}> = {
            type: 'Surface',
            taskType: 'Silent',
            //isNotSelectable: false,
            params: {},
            theme: <any>void 0
        };

        return Bootstrap.Task.create<Bootstrap.Entity.Visual.Surface>(`Create Surface`, 'Silent', async ctx => {
            let model = await LiteMol.Visualization.Surface.Model.create(t.params.tag, { surface: t.params.surface!, theme, parameters: { isWireframe: t.params.isWireframe! } }).run(ctx);
            return Bootstrap.Entity.Visual.Surface.create(t, { label: t.params.label!, model, style, isSelectable: true, tag: t.params.tag });
        });
    }
    );
}