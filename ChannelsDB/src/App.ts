﻿/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
namespace LiteMol.Example.Channels {
    // all commands and events can be found in Bootstrap/Event folder.
    // easy to follow the types and parameters in VSCode.
    
    // you can subsribe to any command or event using <Event/Command>.getStream(plugin.context).subscribe(e => ....)
    import Command = Bootstrap.Command;
    import Event = Bootstrap.Event;
    import Vizualizer = LayersVizualizer;

    (function() {
        const ROUTING_OPTIONS:any = {
            "local":{defaultContextPath: "/detail", defaultPid:"5an8", defaultDB: "pdb", useParameterAsPid:true},
            "chdb-test":{defaultContextPath: "/detail", defaultPid:"5an8", defaultDB: "pdb", useLastPathPartAsPid:true},
            "test":{defaultContextPath: "/test/detail", defaultPid:"5an8", defaultDB: "pdb", useLastPathPartAsPid:true},
            "chdb-prod":{defaultContextPath: "/detail", defaultPid:"5an8", defaultDB: "pdb", useParameterAsPid: true},
        };
        const ROUTING_MODE = "chdb-prod";

        const lvSettings: LayersVizualizer.LayersVizualizerSettings = {
            coloringProperty: "Hydropathy",
            useColorMinMax: true,
            skipMiddleColor: false,
            topMargin: 0, //15,
            customRadiusProperty: "MinRadius"
        }

        SimpleRouter.GlobalRouter.init(ROUTING_OPTIONS[ROUTING_MODE]);

        //Create instance of layer vizualizer
        const layerVizualizer = new LayersVizualizer.Vizualizer('layer-vizualizer-ui', lvSettings);    

        const plugin = Plugin.create({
            target: '#plugin',
            viewportBackground: '#000',
            layoutState: {
                hideControls: true,
                isExpanded: false,
                collapsedControlsLayout: Bootstrap.Components.CollapsedControlsLayout.Landscape
            },
            customSpecification: PluginSpec
        });

        CommonUtils.Selection.SelectionHelper.attachClearSelectionToEventHandler(plugin);

        UI.render(plugin, document.getElementById('ui') !);
        
        Vizualizer.UI.render(layerVizualizer, document.getElementById('layer-vizualizer-ui') !, plugin);

        AglomeredParameters.UI.render(document.getElementById('left-tabs-2') !, plugin);

        ChannelsDescriptions.UI.render(document.getElementById('left-tabs-3') !, plugin);
        
        //LayerProperties.UI.render(document.getElementById("right-tabs-1") !, plugin);
        LayerProperties.UI.render(document.getElementById("layer-properties") !, plugin);

        //LayerResidues.UI.render(document.getElementById("right-tabs-2") !, plugin);
        LayerResidues.UI.render(document.getElementById("layer-residues") !, plugin);

        LiningResidues.UI.render(document.getElementById("right-tabs-2") !, plugin);

        ResidueAnnotations.UI.render(document.getElementById("right-tabs-3") !, plugin);

        ProteinAnnotations.UI.render(document.getElementById("right-panel-tabs-1") !, plugin);

        DownloadReport.UI.render(document.getElementById("download-report") !);        

        PdbIdSign.UI.render(document.getElementById("pdbid-sign") !);        
    })();
}
