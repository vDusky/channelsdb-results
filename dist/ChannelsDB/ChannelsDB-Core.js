var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var StaticData;
(function (StaticData) {
    let Messages;
    (function (Messages) {
        let MESSAGES = {
            "NumPositives": "Charge(+)",
            "NumNegatives": "Charge(-)",
            "MinRadius": "Radius",
            "MinFreeRadius": "Free Radius",
            /* Tooltips data */
            "tooltip-MinRadius": "Radius of sphere within channel limited by three closest atoms",
            "tooltip-MinFreeRadius": "Radius of sphere within channel limited by three closest main chain atoms in order to allow sidechain flexibility",
            "tooltip-Bottleneck": "Radius of channel bottleneck",
            "tooltip-Length": "Length of the channel",
            "tooltip-Hydropathy": "Hydropathy index of amino acid according to Kyte and Doolittle J.Mol.Biol.(1982) 157, 105-132. Range from the most hydrophilic (Arg = -4.5) to the most hydrophobic (Ile = 4.5)",
            "tooltip-Hydrophobicity": "Normalized hydrophobicity scale by Cid et al. J. Protein Engineering (1992) 5, 373-375. Range from the most hydrophilic (Glu = -1.140) to the most hydrophobic (Ile = 1.810)",
            "tooltip-Polarity": "Lining amino acid polarity by Zimmermann et al. J. Theor. Biol. (1968) 21, 170-201. Polarity ranges from nonpolar (Ala, Gly = 0) tthrough polar (e.g. Ser = 1.67) to charged (Glu = 49.90, Arg = 52.00)",
            "tooltip-Mutability": "Relative mutability index by Jones, D.T. et al. Compur. Appl. Biosci. (1992) 8(3): 275-282. Realtive mutability based on empirical substitution matrices between similar protein sequences. High for easily substitutable amino acids, e.g. polars (Ser = 117, Thr = 107, Asn = 104) or aliphatics (Ala = 100, Val = 98, Ile = 103). Low for important structural amino acids, e.g. aromatics (Trp = 25, Phe = 51, Tyr = 50) or specials (Cys = 44, Pro = 58, Gly = 50).",
            "tooltip-agl-Hydropathy": "Average of hydropathy index per each amino acid according to Kyte and Doolittle J.Mol.Biol.(1982) 157, 105-132. Range from the most hydrophilic (Arg = -4.5) to the most hydrophobic (Ile = 4.5)",
            "tooltip-agl-Hydrophobicity": "Average of normalized hydrophobicity scales by Cid et al. J. Protein Engineering (1992) 5, 373-375. Range from the most hydrophilic (Glu = -1.140) to the most hydrophobic (Ile = 1.810)",
            "tooltip-agl-Polarity": "Average of lining amino acid polarities by Zimmermann et al. J. Theor. Biol. (1968) 21, 170-201. Polarity ranges from nonpolar (Ala, Gly = 0) tthrough polar (e.g. Ser = 1.67) to charged (Glu = 49.90, Arg = 52.00)",
            "tooltip-agl-Mutability": "Average of relative mutability index by Jones, D.T. et al. Compur. Appl. Biosci. (1992) 8(3): 275-282. Realtive mutability based on empirical substitution matrices between similar protein sequences. High for easily substitutable amino acids, e.g. polars (Ser = 117, Thr = 107, Asn = 104) or aliphatics (Ala = 100, Val = 98, Ile = 103). Low for important structural amino acids, e.g. aromatics (Trp = 25, Phe = 51, Tyr = 50) or specials (Cys = 44, Pro = 58, Gly = 50)."
        };
        function get(messageKey) {
            return MESSAGES[messageKey];
        }
        Messages.get = get;
    })(Messages = StaticData.Messages || (StaticData.Messages = {}));
})(StaticData || (StaticData = {}));
var DataInterface;
(function (DataInterface) {
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    function convertLayersToLayerData(layersObject) {
        let layersData = [];
        let layerCount = layersObject.LayersInfo.length;
        /*
        export interface LayerData{
        StartDistance: number,
        EndDistance: number,
        MinRadius: number,
        MinFreeRadius: number,
        Properties: any,
        Residues: any
        */
        for (let i = 0; i < layerCount; i++) {
            /*
            Hydrophobicity: number,
            Hydropathy: number,
            Polarity: number,
            Mutability: number
            */
            let properties = {
                Charge: layersObject.LayersInfo[i].Properties.Charge,
                NumPositives: layersObject.LayersInfo[i].Properties.NumPositives,
                NumNegatives: layersObject.LayersInfo[i].Properties.NumNegatives,
                Hydrophobicity: layersObject.LayerWeightedProperties.Hydrophobicity,
                Hydropathy: layersObject.LayerWeightedProperties.Hydropathy,
                Polarity: layersObject.LayerWeightedProperties.Polarity,
                Mutability: layersObject.LayerWeightedProperties.Mutability
            };
            layersData.push({
                StartDistance: layersObject.LayersInfo[i].LayerGeometry.StartDistance,
                EndDistance: layersObject.LayersInfo[i].LayerGeometry.EndDistance,
                MinRadius: layersObject.LayersInfo[i].LayerGeometry.MinRadius,
                MinFreeRadius: layersObject.LayersInfo[i].LayerGeometry.MinFreeRadius,
                Properties: layersObject.LayersInfo[i].Properties,
                Residues: layersObject.LayersInfo[i].Residues
            });
        }
        return layersData;
    }
    DataInterface.convertLayersToLayerData = convertLayersToLayerData;
    let Annotations;
    (function (Annotations) {
        ;
        ;
        ;
    })(Annotations = DataInterface.Annotations || (DataInterface.Annotations = {}));
})(DataInterface || (DataInterface = {}));
;
var Bridge;
(function (Bridge) {
    class Events {
        static subscribeChannelSelect(handler) {
            let hndlrs = this.handlers.get("ChannelSelect");
            if (hndlrs === void 0) {
                hndlrs = [];
            }
            hndlrs.push(handler);
            this.handlers.set("ChannelSelect", hndlrs);
        }
        static invokeChannelSelect(channelId) {
            let hndlrs = this.handlers.get("ChannelSelect");
            if (hndlrs === void 0) {
                return;
            }
            for (let h of hndlrs) {
                h(channelId);
            }
        }
    }
    Events.handlers = new Map();
    Bridge.Events = Events;
})(Bridge || (Bridge = {}));
var CommonUtils;
(function (CommonUtils) {
    class Tunnels {
        static getLength(tunnel) {
            let len = tunnel.Layers.LayersInfo[tunnel.Layers.LayersInfo.length - 1].LayerGeometry.EndDistance;
            len = CommonUtils.Numbers.roundToDecimal(len, 1); //Math.round(len*10)/10;
            return len;
        }
        static getBottleneck(tunnel) {
            let bneck = "<Unknown>";
            for (let element of tunnel.Layers.LayersInfo) {
                if (element.LayerGeometry.Bottleneck || element.LayerGeometry.bottleneck) {
                    let val = element.LayerGeometry.MinRadius;
                    bneck = (Math.round(val * 10) / 10).toString();
                    break;
                }
            }
            return bneck;
        }
    }
    CommonUtils.Tunnels = Tunnels;
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    ;
    class Residues {
        static initCache() {
            if (this.cache !== void 0) {
                return;
            }
            this.cache = new Map();
        }
        static getDirect(residueSeqNumber, plugin) {
            if (plugin.context.select('polymer-visual')[0].props !== void 0) {
                let props = plugin.context.select('polymer-visual')[0].props;
                if (props.model === void 0 || props.model.model === void 0) {
                    return "";
                }
                let model = props.model.model;
                let params = LiteMol.Core.Structure.Query.residuesById(residueSeqNumber).compile()(LiteMol.Core.Structure.Query.Context.ofStructure(model));
                let fragment = params.fragments[0];
                let residueInd = fragment.residueIndices[0];
                let residueData = params.context.structure.data.residues;
                let resIdx = residueData.indices[residueInd];
                let name = residueData.name[resIdx];
                return name;
            }
            return "";
        }
        static getName(residueSeqNumber, plugin) {
            this.initCache();
            if (this.cache.has(residueSeqNumber)) {
                let name = this.cache.get(residueSeqNumber);
                if (name === void 0) {
                    return "";
                }
                return name;
            }
            let name = this.getDirect(residueSeqNumber, plugin);
            this.cache.set(residueSeqNumber, name);
            return name;
        }
        static sort(residues, groupFunction, hasName, includeBackbone) {
            if (includeBackbone === void 0) {
                includeBackbone = false;
            }
            if (hasName === void 0) {
                hasName = false;
            }
            if (residues.length === 0) {
                return residues;
            }
            let resParsed = this.parseResidues(residues, hasName);
            let groups = [];
            if (groupFunction !== void 0) {
                groups = groupFunction(resParsed);
            }
            else {
                groups.push(resParsed);
            }
            let sortFn = this.getSortFunction();
            let all = [];
            for (let group of groups) {
                all = all.concat(group.sort(sortFn));
            }
            return all.map((val, idx, array) => {
                if (hasName) {
                    return `${val.name} ${val.authSeqNumber} ${val.chain.authAsymId}${(includeBackbone && val.backbone) ? ' Backbone' : ''}`;
                }
                else {
                    return `${val.authSeqNumber} ${val.chain.authAsymId}${(includeBackbone && val.backbone) ? ' Backbone' : ''}`;
                }
            });
        }
        static parseResidue(residue) {
            return residue.split(" ");
        }
        static parseResidues(residues, hasName) {
            if (hasName === void 0) {
                hasName = false;
            }
            let resParsed = [];
            for (let residue of residues) {
                let residueParts = this.parseResidue(residue);
                if (hasName) {
                    resParsed.push({
                        chain: { authAsymId: residueParts[2] },
                        authSeqNumber: Number(residueParts[1]),
                        name: residueParts[0],
                        backbone: (residueParts.length === 4)
                    });
                }
                else {
                    resParsed.push({
                        chain: { authAsymId: residueParts[1] },
                        authSeqNumber: Number(residueParts[0]),
                        backbone: (residueParts.length === 3)
                    });
                }
            }
            return resParsed;
        }
        static getSortFunction() {
            return (a, b) => {
                if (a.chain.authAsymId < b.chain.authAsymId) {
                    return -1;
                }
                else if (a.chain.authAsymId > b.chain.authAsymId) {
                    return 1;
                }
                else {
                    if (a.authSeqNumber === b.authSeqNumber) {
                        if (a.backbone && b.backbone) {
                            return 0;
                        }
                        else if (a.backbone && !b.backbone) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                    return a.authSeqNumber - b.authSeqNumber;
                }
            };
        }
    }
    CommonUtils.Residues = Residues;
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    class Numbers {
        static roundToDecimal(number, numOfDecimals) {
            if (number.toString().indexOf(".") <= 0 && number.toString().indexOf(",") <= 0) {
                return number;
            }
            let dec = Math.pow(10, numOfDecimals);
            return Math.round(number * dec) / dec;
        }
    }
    CommonUtils.Numbers = Numbers;
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var Selection;
    (function (Selection) {
        var Transformer = LiteMol.Bootstrap.Entity.Transformer;
        ;
        ;
        ;
        ;
        ;
        class SelectionHelper {
            static attachOnResidueSelectHandler(handler) {
                if (this.onResidueSelectHandlers === void 0) {
                    this.onResidueSelectHandlers = [];
                }
                this.onResidueSelectHandlers.push({ handler });
            }
            static invokeOnResidueSelectHandlers(residue) {
                if (this.onResidueSelectHandlers === void 0) {
                    return;
                }
                for (let h of this.onResidueSelectHandlers) {
                    h.handler(residue);
                }
            }
            static attachOnResidueLightSelectHandler(handler) {
                if (this.onResidueLightSelectHandlers === void 0) {
                    this.onResidueLightSelectHandlers = [];
                }
                this.onResidueLightSelectHandlers.push({ handler });
            }
            static invokeOnResidueLightSelectHandlers(residue) {
                if (this.onResidueLightSelectHandlers === void 0) {
                    return;
                }
                for (let h of this.onResidueLightSelectHandlers) {
                    h.handler(residue);
                }
            }
            static attachOnResidueBulkSelectHandler(handler) {
                if (this.onResidueBulkSelectHandlers === void 0) {
                    this.onResidueBulkSelectHandlers = [];
                }
                this.onResidueBulkSelectHandlers.push({ handler });
            }
            static invokeOnResidueBulkSelectHandlers(residues) {
                if (this.onResidueBulkSelectHandlers === void 0) {
                    return;
                }
                for (let h of this.onResidueBulkSelectHandlers) {
                    h.handler(residues);
                }
            }
            static attachOnClearSelectionHandler(handler) {
                if (this.onClearSelectionHandlers === void 0) {
                    this.onClearSelectionHandlers = [];
                }
                this.onClearSelectionHandlers.push({ handler });
            }
            static invokeOnClearSelectionHandlers() {
                if (this.onClearSelectionHandlers === void 0) {
                    return;
                }
                for (let h of this.onClearSelectionHandlers) {
                    h.handler();
                }
            }
            static attachOnChannelSelectHandler(handler) {
                if (this.onChannelSelectHandlers === void 0) {
                    this.onChannelSelectHandlers = [];
                }
                this.onChannelSelectHandlers.push({ handler });
            }
            static invokeOnChannelSelectHandlers(data) {
                if (this.onChannelSelectHandlers === void 0) {
                    return;
                }
                for (let h of this.onChannelSelectHandlers) {
                    h.handler(data);
                }
            }
            static attachOnChannelDeselectHandler(handler) {
                if (this.onChannelDeselectHandlers === void 0) {
                    this.onChannelDeselectHandlers = [];
                }
                this.onChannelDeselectHandlers.push({ handler });
            }
            static invokeOnChannelDeselectHandlers() {
                if (this.onChannelDeselectHandlers === void 0) {
                    return;
                }
                for (let h of this.onChannelDeselectHandlers) {
                    h.handler();
                }
            }
            static getSelectionVisualRef() {
                return this.SELECTION_VISUAL_REF;
            }
            static getAltSelectionVisualRef() {
                return this.SELECTION_ALT_VISUAL_REF;
            }
            static clearSelection(plugin) {
                this.clearSelectionPrivate(plugin);
                this.selectedBulkResidues = void 0;
                this.selectedResidue = void 0;
                this.selectedChannelRef = void 0;
                this.selectedChannelData = void 0;
                this.resetScene(plugin);
            }
            static clearSelectionPrivate(plugin) {
                LiteMol.Bootstrap.Command.Tree.RemoveNode.dispatch(plugin.context, this.SELECTION_VISUAL_REF);
                if (this.selectedChannelRef !== void 0) {
                    deselectTunnelByRef(plugin, this.selectedChannelRef);
                }
                setTimeout(() => LiteMol.Bootstrap.Event.Visual.VisualSelectElement.dispatch(plugin.context, LiteMol.Bootstrap.Interactivity.Info.empty), 0);
                this.clearAltSelection(plugin);
                this.invokeOnClearSelectionHandlers();
            }
            static clearAltSelection(plugin) {
                LiteMol.Bootstrap.Command.Tree.RemoveNode.dispatch(plugin.context, this.SELECTION_ALT_VISUAL_REF);
            }
            static resetScene(plugin) {
                LiteMol.Bootstrap.Command.Visual.ResetScene.dispatch(plugin.context, void 0);
            }
            static chainEquals(c1, c2) {
                if ((c1.asymId !== c2.asymId)
                    || (c1.authAsymId !== c2.authAsymId)
                    || (c1.index !== c2.index)) {
                    return false;
                }
                return true;
            }
            static residueEquals(r1, r2) {
                if (r1 === void 0 && r2 === void 0) {
                    return true;
                }
                if (r1 === void 0 || r2 === void 0) {
                    return false;
                }
                if ((r1.authName !== r2.authName)
                    || (r1.authSeqNumber !== r2.authSeqNumber)
                    || (!this.chainEquals(r1.chain, r2.chain))
                    || (r1.index !== r2.index)
                    || (r1.insCode !== r2.insCode)
                    || (r1.isHet !== r2.isHet)
                    || (r1.name !== r2.name)
                    || (r1.seqNumber !== r2.seqNumber)) {
                    return false;
                }
                return true;
            }
            static residueBulkSort(bulk) {
                bulk.sort((a, b) => {
                    if (a.chain.authAsymId < b.chain.authAsymId) {
                        return -1;
                    }
                    else if (a.chain.authAsymId == b.chain.authAsymId) {
                        return a.authSeqNumber - b.authSeqNumber;
                    }
                    else {
                        return 1;
                    }
                });
            }
            static residueBulkEquals(r1, r2) {
                if (r1.length !== r2.length) {
                    return false;
                }
                this.residueBulkSort(r1);
                this.residueBulkSort(r2);
                for (let idx = 0; idx < r1.length; idx++) {
                    if (this.residueLightEquals({ type: "light", info: r1[idx] }, { type: "light", info: r2[idx] })) {
                        return false;
                    }
                }
                return true;
            }
            static selectResiduesBulkWithBallsAndSticks(plugin, residues) {
                CommonUtils.Selection.SelectionHelper.clearSelectionPrivate(plugin);
                this.selectedChannelRef = void 0;
                this.selectedChannelData = void 0;
                this.selectedBulkResidues = void 0;
                this.resetScene(plugin);
                if (this.selectedBulkResidues !== void 0) {
                    if (this.residueBulkEquals(residues, this.selectedBulkResidues)) {
                        this.selectedResidue = undefined;
                        return;
                    }
                }
                let queries = [];
                for (let residue of residues) {
                    queries.push(LiteMol.Core.Structure.Query.chainsById(...[residue.chain.authAsymId]).intersectWith(LiteMol.Core.Structure.Query.residues(...[{ authSeqNumber: residue.authSeqNumber }])).compile());
                }
                let query = LiteMol.Core.Structure.Query.or(...queries);
                let t = plugin.createTransform();
                t.add('polymer-visual', Transformer.Molecule.CreateSelectionFromQuery, { query, name: 'Residues' }, { ref: CommonUtils.Selection.SelectionHelper.getSelectionVisualRef(), isHidden: true })
                    .then(Transformer.Molecule.CreateVisual, { style: LiteMol.Bootstrap.Visualization.Molecule.Default.ForType.get('BallsAndSticks') }, { isHidden: true });
                plugin.applyTransform(t)
                    .then(() => {
                    LiteMol.Bootstrap.Command.Entity.Focus.dispatch(plugin.context, plugin.context.select(CommonUtils.Selection.SelectionHelper.getSelectionVisualRef()));
                });
                this.selectedBulkResidues = residues;
                this.invokeOnResidueBulkSelectHandlers(residues);
            }
            static isBulkResiduesSelected(residues) {
                return this.selectedBulkResidues !== void 0;
            }
            static selectResidueByAuthAsymIdAndAuthSeqNumberWithBallsAndSticks(plugin, residue) {
                let query = LiteMol.Core.Structure.Query.chainsById(residue.chain.authAsymId).intersectWith(LiteMol.Core.Structure.Query.residues(...[{ authSeqNumber: residue.authSeqNumber }]));
                CommonUtils.Selection.SelectionHelper.clearSelectionPrivate(plugin);
                this.selectedChannelRef = void 0;
                this.selectedChannelData = void 0;
                this.selectedBulkResidues = void 0;
                this.resetScene(plugin);
                if (this.selectedResidue !== void 0) {
                    if ((this.selectedResidue.type === "full" && this.residueLightEquals({ type: "light", info: residue }, this.residueToLight(this.selectedResidue)))
                        || (this.selectedResidue.type === "light" && this.residueLightEquals({ type: "light", info: residue }, this.selectedResidue))) {
                        this.selectedResidue = undefined;
                        return;
                    }
                }
                let t = plugin.createTransform();
                t.add('polymer-visual', Transformer.Molecule.CreateSelectionFromQuery, { query, name: 'Residues' }, { ref: CommonUtils.Selection.SelectionHelper.getSelectionVisualRef(), isHidden: true })
                    .then(Transformer.Molecule.CreateVisual, { style: LiteMol.Bootstrap.Visualization.Molecule.Default.ForType.get('BallsAndSticks') }, { isHidden: true });
                plugin.applyTransform(t)
                    .then(() => {
                    LiteMol.Bootstrap.Command.Entity.Focus.dispatch(plugin.context, plugin.context.select(CommonUtils.Selection.SelectionHelper.getSelectionVisualRef()));
                });
                this.selectedResidue = { type: "light", info: residue };
                this.invokeOnResidueLightSelectHandlers(residue);
            }
            static residueToLight(residue) {
                return {
                    type: "light",
                    info: {
                        chain: residue.info.chain,
                        authSeqNumber: residue.info.authSeqNumber
                    }
                };
            }
            static residueLightEquals(r1, r2) {
                if ((!this.chainLightEquals(r1.info.chain, r2.info.chain))
                    || r1.info.authSeqNumber !== r2.info.authSeqNumber) {
                    return false;
                }
                return true;
            }
            static chainLightEquals(c1, c2) {
                return (c1.authAsymId === c2.authAsymId);
            }
            static isSelectedAnyChannel() {
                return this.selectedChannelRef !== void 0;
            }
            static isSelectedAny() {
                return this.isSelectedAnyChannel() || this.selectedResidue !== void 0 || this.selectedBulkResidues !== void 0;
            }
            static selectResidueWithBallsAndSticks(plugin, residue) {
                let query = LiteMol.Core.Structure.Query.chainsById(residue.chain.asymId)
                    .intersectWith(LiteMol.Core.Structure.Query.residues(residue));
                CommonUtils.Selection.SelectionHelper.clearSelectionPrivate(plugin);
                this.selectedChannelRef = void 0;
                this.selectedChannelData = void 0;
                this.selectedBulkResidues = void 0;
                this.resetScene(plugin);
                if (this.selectedResidue !== void 0) {
                    if (this.isSelected(residue)) {
                        this.selectedResidue = undefined;
                        return;
                    }
                }
                let t = plugin.createTransform();
                t.add('polymer-visual', Transformer.Molecule.CreateSelectionFromQuery, { query, name: 'Residues' }, { ref: CommonUtils.Selection.SelectionHelper.getSelectionVisualRef(), isHidden: true })
                    .then(Transformer.Molecule.CreateVisual, { style: LiteMol.Bootstrap.Visualization.Molecule.Default.ForType.get('BallsAndSticks') }, { isHidden: true });
                plugin.applyTransform(t)
                    .then(() => {
                    LiteMol.Bootstrap.Command.Entity.Focus.dispatch(plugin.context, plugin.context.select(CommonUtils.Selection.SelectionHelper.getSelectionVisualRef()));
                });
                this.selectedResidue = { type: "full", info: residue };
                this.invokeOnResidueSelectHandlers(residue);
            }
            static isSelected(residue) {
                return (this.selectedResidue !== void 0)
                    && ((this.selectedResidue.type === "full" && this.residueEquals(residue, this.selectedResidue.info))
                        || (this.selectedResidue.type === "light" && this.residueLightEquals(this.residueToLight({ type: "full", info: residue }), this.selectedResidue)));
            }
            static isSelectedLight(residue) {
                return (this.selectedResidue !== void 0)
                    && ((this.selectedResidue.type === "full" && this.residueLightEquals({ type: "light", info: residue }, this.residueToLight(this.selectedResidue)))
                        || (this.selectedResidue.type === "light" && this.residueLightEquals({ type: "light", info: residue }, this.selectedResidue)));
            }
            static getSelectedChannelData() {
                return (this.selectedChannelData === void 0) ? null : this.selectedChannelData;
            }
            static getSelectedChannelRef() {
                return (this.selectedChannelRef === void 0) ? "" : this.selectedChannelRef;
            }
            static attachClearSelectionToEventHandler(plugin) {
                this.interactionEventStream = LiteMol.Bootstrap.Event.Visual.VisualSelectElement.getStream(plugin.context)
                    .subscribe(e => this.interactionHandler('select', e.data, plugin));
            }
            static interactionHandler(type, i, plugin) {
                //console.log("SelectionHelper: Caught-SelectEvent");
                if (!i || i.source == null || i.source.ref === void 0 || i.source.props === void 0 || i.source.props.tag === void 0) {
                    //console.log("SelectionHelper: Event incomplete - ignoring");
                    return;
                }
                if (this.selectedResidue !== void 0) {
                    //console.log("selected channel - clearing residues");
                    LiteMol.Bootstrap.Command.Tree.RemoveNode.dispatch(plugin.context, this.SELECTION_VISUAL_REF);
                    this.selectedResidue = void 0;
                    return;
                }
                if (this.selectedBulkResidues !== void 0) {
                    //console.log("selected channel - clearing residues");
                    LiteMol.Bootstrap.Command.Tree.RemoveNode.dispatch(plugin.context, this.SELECTION_VISUAL_REF);
                    this.selectedBulkResidues = void 0;
                    return;
                }
                if ((this.selectedChannelRef !== void 0) && (this.selectedChannelRef === i.source.ref)) {
                    //console.log("double clicked on tunel - deselecting");
                    this.clearSelectionPrivate(plugin);
                    this.selectedChannelRef = void 0;
                    this.selectedChannelData = void 0;
                    this.invokeOnChannelDeselectHandlers();
                    return;
                }
                else {
                    //console.log("Channel selected");
                    if (this.selectedChannelRef !== void 0 && this.selectedChannelRef !== i.source.ref) {
                        deselectTunnelByRef(plugin, this.selectedChannelRef);
                    }
                    this.selectedChannelRef = i.source.ref;
                    this.selectedChannelData = i.source.props.tag.element.Layers;
                    selectTunnelByRef(plugin, this.selectedChannelRef);
                    this.clearAltSelection(plugin);
                    this.invokeOnChannelSelectHandlers(this.selectedChannelData);
                    return;
                }
                //console.log("SelectionHelper: SelectEvent from code - ignoring ");
            }
        }
        SelectionHelper.SELECTION_VISUAL_REF = "res_visual";
        SelectionHelper.SELECTION_ALT_VISUAL_REF = "alt_res_visual";
        SelectionHelper.interactionEventStream = void 0;
        Selection.SelectionHelper = SelectionHelper;
        function getIndices(v) {
            if (v.props.model.surface === void 0) {
                return [];
            }
            return v.props.model.surface.triangleIndices;
        }
        function selectTunnelByRef(plugin, ref) {
            let entities = plugin.selectEntities(ref);
            let v = entities[0];
            if (LiteMol.Bootstrap.Entity.isVisual(entities[0]) && v.props.isSelectable) {
                v.props.model.applySelection(getIndices(v), 1 /* LiteMol.Visualization.Selection.Action.Select */);
            }
        }
        function deselectTunnelByRef(plugin, ref) {
            let entities = plugin.selectEntities(ref);
            let v = entities[0];
            if (LiteMol.Bootstrap.Entity.isVisual(entities[0]) && v.props.isSelectable) {
                v.props.model.applySelection(getIndices(v), 2 /* LiteMol.Visualization.Selection.Action.RemoveSelect */);
            }
        }
    })(Selection = CommonUtils.Selection || (CommonUtils.Selection = {}));
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var Tooltips;
    (function (Tooltips) {
        function getMessageOrLeaveText(text) {
            let message = StaticData.Messages.get(text);
            if (message === void 0) {
                return text;
            }
            return message;
        }
        Tooltips.getMessageOrLeaveText = getMessageOrLeaveText;
        function hasTooltipText(messageKey) {
            let message = StaticData.Messages.get(`tooltip-${messageKey}`);
            return (message !== void 0);
        }
        Tooltips.hasTooltipText = hasTooltipText;
    })(Tooltips = CommonUtils.Tooltips || (CommonUtils.Tooltips = {}));
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var Tabs;
    (function (Tabs) {
        function getTabLinkById(tabbedElementId, tabId) {
            let tabs = $(`#${tabbedElementId} li a`);
            for (let t of tabs) {
                if ($(t).attr('href') === `#${tabbedElementId}-${tabId}`) {
                    return $(t);
                }
            }
        }
        Tabs.getTabLinkById = getTabLinkById;
        function isActive(tabbedElementId, tabId) {
            return getTabLinkById(tabbedElementId, tabId).parent().attr("class").indexOf("active") >= 0;
        }
        Tabs.isActive = isActive;
        function activateTab(tabbedElementId, tabId) {
            getTabLinkById(tabbedElementId, tabId).click();
        }
        Tabs.activateTab = activateTab;
        function doAfterTabActivated(tabbedElementId, tabId, callback) {
            var checker = function () {
                let link = getTabLinkById(tabbedElementId, tabId);
                let href = link.attr("href");
                if (link.parent().attr("class").indexOf("active") >= 0 && $(href).css("display") !== "none") {
                    callback();
                }
                else {
                    window.setTimeout(checker, 10);
                }
            };
            window.setTimeout(checker, 10);
        }
        Tabs.doAfterTabActivated = doAfterTabActivated;
    })(Tabs = CommonUtils.Tabs || (CommonUtils.Tabs = {}));
})(CommonUtils || (CommonUtils = {}));
var Annotation;
(function (Annotation) {
    var LiteMoleEvent = LiteMol.Bootstrap.Event;
    ;
    ;
    ;
    class AnnotationDataProvider {
        static isLining(residue) {
            return this.liningResidues.indexOf(residue) >= 0;
        }
        static parseChannelsData(data) {
            let map = LiteMol.Core.Utils.FastMap.create();
            for (let annotation of data) {
                let channelId = annotation.Id;
                if (channelId === null) {
                    console.log("Found channel annotation wihtout id. Skipping...");
                    continue;
                }
                let list = [];
                if (map.has(channelId)) {
                    let l = map.get(channelId);
                    if (l !== void 0) {
                        list = l;
                    }
                }
                list.push({
                    text: annotation.Name,
                    reference: annotation.Reference,
                    description: annotation.Description,
                    link: this.createLink(annotation.ReferenceType, annotation.Reference)
                });
                map.set(channelId, list);
            }
            return map;
        }
        static stripChars(str, chars) {
            for (let char of chars) {
                str = str.replace(char, "");
            }
            return str;
        }
        static parseCatalytics(items) {
            let rv = [];
            for (let item of items) {
                let line = item.replace(/\(\d*\)/g, (x) => `<sub>${this.stripChars(x, ['(', ')'])}</sub>`);
                line = line.replace(/\(\+\)|\(\-\)/g, (x) => `<sup>${this.stripChars(x, ['(', ')'])}</sup>`);
                rv.push(line);
            }
            return rv;
        }
        static parseProteinData(data) {
            let list = [];
            for (let item of data) {
                list.push({
                    name: item.Name,
                    function: item.Function,
                    link: this.createLink("UniProt", item.UniProtId),
                    uniProtId: item.UniProtId,
                    catalytics: this.parseCatalytics(item.Catalytics)
                });
            }
            return list;
        }
        //PUBMEDID vs UniProtId ??? PUBMED není v JSONU vůbec přítomné
        //link pro uniprot používá adresu http://www.uniprot.org/uniprot/
        static createLink(type, reference) {
            if (type === "DOI") {
                return `http://dx.doi.org/${reference}`;
            }
            else if (type === "UniProt") {
                return `http://www.uniprot.org/uniprot/${reference}`;
            }
            else if (type === "PubMed") {
                return `http://europepmc.org/abstract/MED/${reference}`;
            }
            else {
                console.log(`Unknown reference type ${type} for reference ${reference}`);
                return `#unknown-reference-type`;
            }
        }
        static parseResidueItem(item, map) {
            let residueId = `${item.Id} ${item.Chain}`;
            let annotations = map.get(residueId);
            if (annotations === void 0) {
                annotations = [];
            }
            annotations.push({
                text: item.Text,
                reference: item.Reference,
                link: this.createLink(item.ReferenceType, item.Reference),
                isLining: this.isLining(residueId)
            });
            map.set(`${item.Id} ${item.Chain}`, annotations);
        }
        static parseResidueData(data) {
            let map = LiteMol.Core.Utils.FastMap.create();
            for (let item of data.ChannelsDB) {
                this.parseResidueItem(item, map);
            }
            for (let item of data.UniProt) {
                this.parseResidueItem(item, map);
            }
            return map;
        }
        static parseLiningResidues(data) {
            let channels = [];
            // if (data.Channels) {
            //     Object.keys(data.Channels).forEach(function(key) {
            //         console.log(key);
            //         console.log(data.Channels[key]);
            //         if (data.Channels[key] !== void 0) {
            //             channels = channels.concat(data.Channels[key]);
            //         }
            //     });
            // }
            if (data.Channels.CSATunnels_MOLE !== void 0)
                channels = channels.concat(data.Channels.CSATunnels_MOLE);
            if (data.Channels.CSATunnels_Caver !== void 0)
                channels = channels.concat(data.Channels.CSATunnels_Caver);
            if (data.Channels.ReviewedChannels_MOLE !== void 0)
                channels = channels.concat(data.Channels.ReviewedChannels_MOLE);
            if (data.Channels.ReviewedChannels_Caver !== void 0)
                channels = channels.concat(data.Channels.ReviewedChannels_Caver);
            if (data.Channels.CofactorTunnels_MOLE !== void 0)
                channels = channels.concat(data.Channels.CofactorTunnels_MOLE);
            if (data.Channels.CofactorTunnels_Caver !== void 0)
                channels = channels.concat(data.Channels.CofactorTunnels_Caver);
            if (data.Channels.TransmembranePores_MOLE !== void 0)
                channels = channels.concat(data.Channels.TransmembranePores_MOLE);
            if (data.Channels.TransmembranePores_Caver !== void 0)
                channels = channels.concat(data.Channels.TransmembranePores_Caver);
            if (data.Channels.ProcognateTunnels_MOLE !== void 0)
                channels = channels.concat(data.Channels.ProcognateTunnels_MOLE);
            if (data.Channels.ProcagnateTunnels_Caver !== void 0)
                channels = channels.concat(data.Channels.ProcagnateTunnels_Caver);
            if (data.Channels.AlphaFillTunnels_MOLE !== void 0)
                channels = channels.concat(data.Channels.AlphaFillTunnels_MOLE);
            if (data.Channels.AlphaFillTunnels_Caver !== void 0)
                channels = channels.concat(data.Channels.AlphaFillTunnels_Caver);
            let liningResidues = [];
            for (let channel of channels) {
                for (let layerInfo of channel.Layers.LayersInfo) {
                    for (let residue of layerInfo.Residues) {
                        let residueId = residue.split(" ").slice(1, 3).join(" ");
                        if (liningResidues.indexOf(residueId) < 0) {
                            liningResidues.push(residueId);
                        }
                    }
                }
            }
            return liningResidues;
        }
        static isDataReady() {
            return this.dataReady;
        }
        static handleChannelsAPIData(data) {
            let liningResidues = this.parseLiningResidues(data);
            let channelsData = this.parseChannelsData(data.Annotations);
            return { liningResidues, channelsData };
        }
        static handleAnnotationsAPIData(data) {
            let proteinData = this.parseProteinData(data.EntryAnnotations);
            let residueData = this.parseResidueData(data.ResidueAnnotations);
            return { proteinData, residueData };
        }
        static subscribeToPluginContext(context) {
            let channelsAPIobserver;
            let annotationsAPIobserver;
            new Promise((res, rej) => {
                let moleData = context.select("channelsDB-data")[0];
                if (moleData !== void 0) {
                    res(this.handleChannelsAPIData(moleData.props.data));
                }
                else {
                    channelsAPIobserver = LiteMoleEvent.Tree.NodeAdded.getStream(context).subscribe(e => {
                        if (e.data.tree !== void 0 && e.data.ref === "channelsDB-data") {
                            res(this.handleChannelsAPIData(e.data.props.data));
                        }
                    });
                }
            }).then((val) => {
                if (channelsAPIobserver !== void 0) {
                    channelsAPIobserver.dispose();
                }
                let item = val;
                this.liningResidues = item.liningResidues;
                this.channelAnnotations = item.channelsData;
                new Promise((res, rej) => {
                    let annotationData = context.select("channelsDB-annotation-data")[0];
                    if (annotationData !== void 0) {
                        res(this.handleAnnotationsAPIData(annotationData.props.data));
                    }
                    else {
                        annotationsAPIobserver = LiteMoleEvent.Tree.NodeAdded.getStream(context).subscribe(e => {
                            if (e.data.tree !== void 0 && e.data.ref === "channelsDB-annotation-data") {
                                res(this.handleAnnotationsAPIData(e.data.props.data));
                            }
                        });
                    }
                }).then((val) => {
                    if (annotationsAPIobserver !== void 0) {
                        annotationsAPIobserver.dispose();
                    }
                    let item = val;
                    this.proteinAnnotations = item.proteinData;
                    this.residueAnnotations = item.residueData;
                    this.dataReady = true;
                    this.invokeHandlers();
                })
                    .catch((err) => {
                    console.log("annotationsAPIParseError:");
                    console.log(err);
                    if (annotationsAPIobserver !== void 0) {
                        annotationsAPIobserver.dispose();
                    }
                    if (channelsAPIobserver !== void 0) {
                        channelsAPIobserver.dispose();
                    }
                    if (this.retries > 5) {
                        return;
                    }
                    this.retries++;
                    setTimeout((() => { this.subscribeToPluginContext(context); }).bind(this), 100);
                });
            })
                .catch((err) => {
                console.log("channelsAPIParseError:");
                console.log(err);
                if (annotationsAPIobserver !== void 0) {
                    annotationsAPIobserver.dispose();
                }
                if (channelsAPIobserver !== void 0) {
                    channelsAPIobserver.dispose();
                }
                if (this.retries > 5) {
                    return;
                }
                this.retries++;
                setTimeout((() => { this.subscribeToPluginContext(context); }).bind(this), 100);
            });
            this.subscribed = true;
        }
        static subscribeForData(handler) {
            if (this.handlers === void 0) {
                this.handlers = [];
            }
            this.handlers.push({ handler });
        }
        static invokeHandlers() {
            if (this.handlers === void 0) {
                console.log("no handlers attached... Skiping...");
                return;
            }
            for (let h of this.handlers) {
                h.handler();
            }
        }
        static getResidueAnnotations(residueId) {
            if (!this.subscribed) {
                return void 0;
            }
            if (this.residueAnnotations !== void 0) {
                let value = this.residueAnnotations.get(residueId);
                if (value === void 0) {
                    return [];
                }
                return value;
            }
            return void 0;
        }
        static getResidueList() {
            if (!this.subscribed || this.residueAnnotations === void 0) {
                return void 0;
            }
            let rv = [];
            this.residueAnnotations.forEach((_, key, map) => {
                if (rv.indexOf(key) < 0) {
                    rv.push(key);
                }
            });
            return rv;
        }
        static getChannelAnnotations(channelId) {
            if (!this.subscribed) {
                return void 0;
            }
            if (this.channelAnnotations !== void 0) {
                let value = this.channelAnnotations.get(channelId);
                if (value === void 0) {
                    return null;
                }
                return value;
            }
            return void 0;
        }
        static getChannelAnnotation(channelId) {
            if (!this.subscribed) {
                return void 0;
            }
            if (this.channelAnnotations !== void 0) {
                let value = this.channelAnnotations.get(channelId);
                if (value === void 0) {
                    return null;
                }
                return value[0];
            }
            return void 0;
        }
        static getProteinAnnotations() {
            if (!this.subscribed) {
                return void 0;
            }
            if (this.proteinAnnotations !== void 0) {
                return this.proteinAnnotations;
            }
            return void 0;
        }
    }
    AnnotationDataProvider.subscribed = false;
    AnnotationDataProvider.dataReady = false;
    AnnotationDataProvider.retries = 0;
    Annotation.AnnotationDataProvider = AnnotationDataProvider;
})(Annotation || (Annotation = {}));
var LayersVizualizer;
(function (LayersVizualizer) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        var Transformer = LiteMol.Bootstrap.Entity.Transformer;
        var Visualization = LiteMol.Bootstrap.Visualization;
        var Tooltips = CommonUtils.Tooltips;
        var Tabs = CommonUtils.Tabs;
        ;
        function render(vizualizer, target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { vizualizer: vizualizer, controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                super(...arguments);
                this.interactionEventStream = void 0;
                this.tooltipsInitialized = false;
                this.state = {
                    instanceId: -1,
                    hasData: false,
                    data: [],
                    layerId: 0,
                    coloringPropertyKey: "",
                    customColoringPropertyKey: "",
                    radiusPropertyKey: "MinRadius",
                    customRadiusPropertyKey: "MinRadius",
                    colorBoundsMode: "Absolute",
                    isDOMReady: false,
                    app: this,
                    currentTunnelRef: "",
                    isLayerSelected: false
                };
            }
            componentDidMount() {
                var vizualizer = this.props.vizualizer;
                vizualizer.setColorBoundsMode(this.state.colorBoundsMode);
                let state = this.state;
                state.instanceId = vizualizer.getPublicInstanceIdx();
                state.customColoringPropertyKey = vizualizer.getCustomColoringPropertyKey();
                state.coloringPropertyKey = vizualizer.getColoringPropertyKey();
                state.customRadiusPropertyKey = vizualizer.getCustomRadiusPropertyKey();
                state.radiusPropertyKey = vizualizer.getRadiusPropertyKey();
                state.colorBoundsMode = this.state.colorBoundsMode;
                this.setState(state);
                this.vizualizer = vizualizer;
                CommonUtils.Selection.SelectionHelper.attachOnChannelSelectHandler((data) => {
                    window.setTimeout(() => {
                        let s1 = this.state;
                        s1.currentTunnelRef = CommonUtils.Selection.SelectionHelper.getSelectedChannelRef();
                        s1.isLayerSelected = false;
                        this.setState(s1);
                        Tabs.activateTab("left-tabs", "1");
                        let layers = DataInterface.convertLayersToLayerData(data);
                        Tabs.doAfterTabActivated("left-tabs", "1", () => {
                            vizualizer.setData(layers);
                            let s2 = this.state;
                            s2.data = layers;
                            s2.hasData = true;
                            s2.isDOMReady = false;
                            s2.instanceId = vizualizer.getPublicInstanceIdx();
                            this.setState(s2);
                            vizualizer.rebindDOMRefs();
                            vizualizer.vizualize();
                            let s3 = this.state;
                            s3.data = layers;
                            s3.hasData = true;
                            s3.isDOMReady = true;
                            s3.instanceId = vizualizer.getPublicInstanceIdx();
                            this.setState(s3);
                        });
                    }, 50);
                });
                /*
                CommonUtils.Selection.SelectionHelper.attachOnChannelDeselectHandler(()=>{
                    this.setState({data: [], hasData:false, isDOMReady:false, currentTunnelRef: "", isLayerSelected: false});
                });*/
                $(window).on("lvContentResize", (() => {
                    this.forceUpdate();
                }).bind(this));
                $(window).on("resize", (() => {
                    this.forceUpdate();
                }).bind(this));
            }
            componentWillUnmount() {
                if (this.interactionEventStream !== void 0) {
                    this.interactionEventStream.dispose();
                }
            }
            render() {
                if (this.state.hasData) {
                    $('.init-lvz-tooltip').tooltip();
                    return React.createElement(PaintingArea, Object.assign({}, this.state));
                }
                return React.createElement(Hint, Object.assign({}, this.state));
            }
        }
        UI.App = App;
        ;
        class PaintingArea extends React.Component {
            render() {
                return (React.createElement("div", { className: "layerVizualizer", id: `layer-vizualizer-ui${this.props.instanceId}` },
                    React.createElement("div", { className: "wrapper-container" },
                        React.createElement(Controls, Object.assign({}, this.props, { isCustom: false })),
                        React.createElement(CanvasWrapper, Object.assign({}, this.props)),
                        React.createElement(Controls, Object.assign({}, this.props, { isCustom: true }))),
                    React.createElement(CommonControls, Object.assign({}, this.props))));
            }
            ;
        }
        class Hint extends React.Component {
            render() {
                return (React.createElement("div", { id: `layer-vizualizer-hint-div${this.props.instanceId}`, className: "layer-vizualizer-hint-div" }, "Click on one of available channels to see more information..."));
            }
        }
        class ColorMenuItem extends React.Component {
            changeColoringProperty(e) {
                let targetElement = e.target;
                let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
                let instance = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[instanceIdx];
                let propertyName = targetElement.getAttribute("data-propertyname");
                if (propertyName === null) {
                    console.log("No property name found!");
                    return;
                }
                if (this.props.isCustom) {
                    instance.setCustomColoringPropertyKey(propertyName);
                }
                else {
                    instance.setColoringPropertyKey(propertyName);
                }
                instance.vizualize();
                let state = this.props.app.state;
                if (this.props.isCustom) {
                    state.customColoringPropertyKey = propertyName;
                    this.props.app.setState(state);
                }
                else {
                    state.coloringPropertyKey = propertyName;
                    this.props.app.setState(state);
                }
            }
            render() {
                if (Tooltips.hasTooltipText(this.props.propertyName)) {
                    return (React.createElement("li", null,
                        React.createElement("a", { "data-instanceidx": this.props.instanceId, "data-propertyname": this.props.propertyName, "data-toggle": "tooltip", "data-placement": "right", title: Tooltips.getMessageOrLeaveText(`tooltip-${this.props.propertyName}`), className: "init-lvz-tooltip lvz-properties", onClick: this.changeColoringProperty.bind(this) }, Tooltips.getMessageOrLeaveText(this.props.propertyName))));
                }
                else {
                    return (React.createElement("li", null,
                        React.createElement("a", { "data-instanceidx": this.props.instanceId, "data-propertyname": this.props.propertyName, onClick: this.changeColoringProperty.bind(this) }, Tooltips.getMessageOrLeaveText(this.props.propertyName))));
                }
            }
        }
        class RadiusMenuItem extends React.Component {
            changeRadiusProperty(e) {
                let targetElement = e.target;
                let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
                let instance = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[instanceIdx];
                let propertyName = targetElement.getAttribute("data-propertyname");
                if (propertyName === null || propertyName === void 0) {
                    return;
                }
                if (this.props.isCustom) {
                    instance.setCustomRadiusPropertyKey(propertyName);
                }
                else {
                    instance.setRadiusPropertyKey(propertyName);
                }
                instance.vizualize();
                let state = this.props.app.state;
                if (this.props.isCustom) {
                    state.customRadiusPropertyKey = propertyName;
                    this.props.app.setState(state);
                }
                else {
                    state.radiusPropertyKey = propertyName;
                    this.props.app.setState(state);
                }
            }
            render() {
                if (Tooltips.hasTooltipText(this.props.propertyName)) {
                    return (React.createElement("li", null,
                        React.createElement("a", { "data-instanceidx": this.props.instanceId, "data-propertyname": this.props.propertyName, "data-toggle": "tooltip", "data-placement": "right", title: Tooltips.getMessageOrLeaveText(`tooltip-${this.props.propertyName}`), className: "init-lvz-tooltip lvz-radius", onClick: this.changeRadiusProperty.bind(this) }, Tooltips.getMessageOrLeaveText(this.props.propertyName))));
                }
                else {
                    return (React.createElement("li", null,
                        React.createElement("a", { "data-instanceidx": this.props.instanceId, "data-propertyname": this.props.propertyName, onClick: this.changeRadiusProperty.bind(this) }, Tooltips.getMessageOrLeaveText(this.props.propertyName))));
                }
            }
        }
        class ColorBoundsMenuItem extends React.Component {
            changeColorBoundsMode(e) {
                let targetElement = e.target;
                let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
                let instance = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[instanceIdx];
                let mode = targetElement.getAttribute("data-mode");
                if (mode === null || mode === void 0) {
                    return;
                }
                instance.setColorBoundsMode(mode);
                instance.vizualize();
                let state = this.props.app.state;
                state.colorBoundsMode = mode;
                this.props.app.setState(state);
            }
            render() {
                return (React.createElement("li", null,
                    React.createElement("a", { "data-instanceidx": this.props.instanceId, "data-mode": this.props.mode, onClick: this.changeColorBoundsMode.bind(this) }, this.props.mode)));
            }
        }
        class BootstrapDropUpMenuButton extends React.Component {
            render() {
                return React.createElement("div", { className: "btn-group dropup" },
                    React.createElement("button", { type: "button", className: "btn btn-xs btn-primary dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                        this.props.label,
                        " ",
                        React.createElement("span", { className: "caret" })),
                    React.createElement("ul", { className: "dropdown-menu" }, this.props.items));
            }
        }
        class Controls extends React.Component {
            render() {
                return (React.createElement("div", { className: "controls" },
                    React.createElement(RadiusSwitch, { state: this.props, isCustom: this.props.isCustom, radiusProperty: (this.props.isCustom) ? this.props.customRadiusPropertyKey : this.props.radiusPropertyKey }),
                    React.createElement(ColorBySwitch, { state: this.props, isCustom: this.props.isCustom, coloringProperty: (this.props.isCustom) ? this.props.customColoringPropertyKey : this.props.coloringPropertyKey })));
            }
        }
        class CommonControls extends React.Component {
            render() {
                return (React.createElement("div", { className: "controls" },
                    React.createElement(CommonButtonArea, Object.assign({}, this.props))));
            }
        }
        class ColorBySwitch extends React.Component {
            generateColorMenu() {
                let rv = [];
                for (let prop in this.props.state.data[0].Properties) {
                    rv.push(React.createElement(ColorMenuItem, Object.assign({ propertyName: prop, isCustom: this.props.isCustom }, this.props.state)));
                }
                return React.createElement(BootstrapDropUpMenuButton, { items: rv, label: Tooltips.getMessageOrLeaveText(this.props.coloringProperty) });
            }
            render() {
                let items = this.generateColorMenu();
                return (React.createElement("span", { className: "block-like" },
                    React.createElement("span", { className: "control-label" }, "Color by:"),
                    " ",
                    items));
            }
        }
        class RadiusSwitch extends React.Component {
            generateRadiusSwitch() {
                let properties = ["MinRadius", "MinFreeRadius"];
                let rv = [];
                for (let prop of properties) {
                    rv.push(React.createElement(RadiusMenuItem, Object.assign({ propertyName: prop, isCustom: this.props.isCustom }, this.props.state)));
                }
                return React.createElement(BootstrapDropUpMenuButton, { items: rv, label: Tooltips.getMessageOrLeaveText(this.props.radiusProperty) });
            }
            render() {
                let items = this.generateRadiusSwitch();
                return (React.createElement("span", { className: "block-like" },
                    React.createElement("span", { className: "control-label" }, "Tunnel radius:"),
                    " ",
                    items));
            }
        }
        class CommonButtonArea extends React.Component {
            generateColorBoundsSwitch() {
                let properties = ["Min/max", "Absolute"];
                let rv = [];
                for (let prop of properties) {
                    rv.push(React.createElement(ColorBoundsMenuItem, Object.assign({ mode: prop }, this.props)));
                }
                let label = properties[(this.props.colorBoundsMode == "Min/max") ? 0 : 1];
                return React.createElement(BootstrapDropUpMenuButton, { items: rv, label: label });
            }
            render() {
                let items = this.generateColorBoundsSwitch();
                return (React.createElement("div", { className: "common-area" },
                    React.createElement(ColorBoundsSwitchButton, { items: items }),
                    React.createElement(ExportButton, { instanceId: this.props.instanceId })));
            }
        }
        class ExportTypeButton extends React.Component {
            dataURItoBlob(dataURI) {
                // convert base64 to raw binary data held in a string
                // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
                var byteString = atob(dataURI.split(',')[1]);
                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                // write the bytes of the string to an ArrayBuffer
                var ab = new ArrayBuffer(byteString.length);
                var dw = new DataView(ab);
                for (var i = 0; i < byteString.length; i++) {
                    dw.setUint8(i, byteString.charCodeAt(i));
                }
                // write the ArrayBuffer to a blob, and you're done
                return new Blob([ab], { type: mimeString });
            }
            triggerDownload(dataUrl, fileName) {
                let a = document.createElement("a");
                document.body.appendChild(a);
                $(a).css("display", "none");
                let blob = this.dataURItoBlob(dataUrl);
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            }
            export(e) {
                let targetElement = e.target;
                let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
                let instance = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[instanceIdx];
                let exportType = targetElement.getAttribute("data-exporttype");
                if (exportType === null) {
                    return;
                }
                let imgDataUrl = null;
                switch (exportType) {
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
                this.triggerDownload(imgDataUrl, `export-2D.${exportType.toLowerCase()}`);
            }
            render() {
                return React.createElement("li", null,
                    React.createElement("a", { "data-instanceidx": this.props.instanceId, "data-exporttype": this.props.exportType, onClick: this.export.bind(this) }, this.props.exportType));
            }
        }
        class ExportButton extends React.Component {
            generateItems() {
                let rv = [];
                let supportedExportTypes = ["PNG", "SVG" /*,"PDF"*/];
                for (let type of supportedExportTypes) {
                    rv.push(React.createElement(ExportTypeButton, { instanceId: this.props.instanceId, exportType: type }));
                }
                return rv;
            }
            render() {
                let label = "Export";
                let rv = this.generateItems();
                return (React.createElement(BootstrapDropUpMenuButton, { items: rv, label: label }));
            }
        }
        class ColorBoundsSwitchButton extends React.Component {
            render() {
                return (React.createElement("span", { className: "color-bounds-button-container" },
                    React.createElement("span", { className: "control-label", title: "Color bounds for both halfs of vizualized tunnel." }, "Color bounds:"),
                    " ",
                    this.props.items));
            }
        }
        class CanvasWrapper extends React.Component {
            render() {
                return (React.createElement("div", { className: "canvas-wrapper" },
                    React.createElement(RealCanvas, Object.assign({}, this.props)),
                    React.createElement(ImgOverlay, Object.assign({}, this.props)),
                    React.createElement(InteractionMap, Object.assign({}, this.props))));
            }
        }
        class ImgOverlay extends React.Component {
            render() {
                return (React.createElement("img", { className: "fake-canvas", id: `layer-vizualizer-fake-canvas${this.props.instanceId}`, useMap: `#layersInteractiveMap${this.props.instanceId}`, src: "images/no_img.png" }));
            }
        }
        class RealCanvas extends React.Component {
            render() {
                return (React.createElement("canvas", { id: `layer-vizualizer-canvas${this.props.instanceId}`, className: "layer-vizualizer-canvas", width: "700", height: "150" }));
            }
        }
        ;
        ;
        class InteractionMap extends React.Component {
            getLayerResidues(layerIdx) {
                let res = [];
                for (let residue of this.props.data[layerIdx].Residues) {
                    let parts = residue.split(" ");
                    res.push({
                        authAsymId: parts[2],
                        authSeqNumber: Number(parts[1]).valueOf()
                    });
                }
                return res;
            }
            resetFocusToTunnel() {
                LiteMol.Bootstrap.Command.Entity.Focus.dispatch(this.props.app.props.controller.context, this.props.app.props.controller.context.select(this.props.app.state.currentTunnelRef));
            }
            showLayerResidues3DAndFocus(layerIdx) {
                /*
                let theme = generateLayerSelectColorTheme(layerIdx,this.props.app);
                applyTheme(theme,this.props.app.props.controller,this.props.app.state.currentTunnelRef);
                */
                let residues = this.getLayerResidues(layerIdx);
                let query = LiteMol.Core.Structure.Query.residues(...residues);
                CommonUtils.Selection.SelectionHelper.clearAltSelection(this.props.app.props.controller);
                let t = this.props.app.props.controller.createTransform();
                t.add('polymer-visual', Transformer.Molecule.CreateSelectionFromQuery, { query, name: 'Residues' }, { ref: CommonUtils.Selection.SelectionHelper.getAltSelectionVisualRef() })
                    .then(Transformer.Molecule.CreateVisual, { style: Visualization.Molecule.Default.ForType.get('BallsAndSticks') });
                this.props.app.props.controller.applyTransform(t)
                    .then(res => {
                    //Focus
                    LiteMol.Bootstrap.Command.Entity.Focus.dispatch(this.props.app.props.controller.context, this.props.app.props.controller.context.select(CommonUtils.Selection.SelectionHelper.getAltSelectionVisualRef()));
                });
            }
            displayDetailsEventHandler(e) {
                let targetElement = e.target;
                let layerIdx = Number(targetElement.getAttribute("data-layeridx")).valueOf();
                let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
                let instance = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[instanceIdx];
                instance.highlightHitbox(layerIdx);
                if (!this.props.app.state.isLayerSelected) {
                    let state = this.props.app.state;
                    state.layerId = layerIdx;
                    this.props.app.setState(state);
                    $(window).trigger('layerTriggered', layerIdx);
                }
            }
            displayLayerResidues3DEventHandler(e) {
                let targetElement = e.target;
                let layerIdx = Number(targetElement.getAttribute("data-layeridx")).valueOf();
                let instanceIdx = Number(targetElement.getAttribute("data-instanceidx")).valueOf();
                let instance = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[instanceIdx];
                if (instance.getSelectedLayer() === layerIdx) {
                    this.props.app.state.isLayerSelected = false;
                    CommonUtils.Selection.SelectionHelper.clearAltSelection(this.props.app.props.controller);
                    this.resetFocusToTunnel();
                    instance.deselectLayer();
                    instance.highlightHitbox(layerIdx);
                }
                else {
                    let state = this.props.app.state;
                    state.layerId = layerIdx;
                    state.isLayerSelected = true;
                    this.props.app.setState(state);
                    this.showLayerResidues3DAndFocus(layerIdx);
                    instance.deselectLayer();
                    instance.selectLayer(layerIdx);
                    $(window).trigger('layerTriggered', layerIdx);
                    $(window).trigger('resize');
                }
            }
            getTunnelScale(tunnel) {
                let xScale = 0;
                let yScale = 0;
                if (tunnel !== null) {
                    let scale = tunnel.getScale();
                    if (scale !== null) {
                        xScale = scale.x;
                        yScale = scale.y;
                    }
                }
                return {
                    xScale,
                    yScale
                };
            }
            transformCoordinates(x, y, width, height, scale, bounds) {
                let vizualizer = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[this.props.instanceId];
                //Real width can be different to canvas width - hitboxes could run out of space
                let realXScale = 1;
                let realWidth = vizualizer.getCanvas().offsetWidth.valueOf();
                if (realWidth != 0) {
                    realXScale = 1 / (vizualizer.getCanvas().width / realWidth);
                }
                let realYScale = 1;
                let realHeight = vizualizer.getCanvas().offsetHeight.valueOf();
                if (realHeight != 0) {
                    realYScale = 1 / (vizualizer.getCanvas().height / realHeight);
                }
                return {
                    sx: (bounds.x + x * scale.xScale) * realXScale,
                    sy: (bounds.y + y * scale.yScale) * realYScale,
                    dx: (bounds.x + (x + width) * scale.xScale) * realXScale,
                    dy: (bounds.y + (y + height) * scale.yScale) * realYScale
                };
            }
            makeCoordinateString(x, y, width, height, scale, bounds) {
                let coordinates = this.transformCoordinates(x, y, width, height, scale, bounds);
                return String(coordinates.sx) + ','
                    + String(coordinates.sy) + ','
                    + String(coordinates.dx) + ','
                    + String(coordinates.dy);
            }
            generatePhysicalHitboxesCoords() {
                let vizualizer = LayersVizualizer.Vizualizer.ACTIVE_INSTANCES[this.props.instanceId];
                let data = this.props.data;
                //Data was not prepared yet
                if (vizualizer.isDataDirty()) {
                    vizualizer.prepareData();
                }
                let hitboxes = vizualizer.getHitboxes();
                let tunnels = vizualizer.getTunnels();
                if (tunnels === null
                    || hitboxes === null
                    || (hitboxes.defaultTunnel === null && hitboxes.customizable === null)) {
                    return [];
                }
                let defaultTunnel = tunnels.default;
                let customizableTunnel = tunnels.customizable;
                let dTproperties = null;
                let dTbounds = null;
                if (defaultTunnel !== null) {
                    dTproperties = this.getTunnelScale(defaultTunnel.tunnel);
                    dTbounds = defaultTunnel.bounds;
                }
                let cTproperties = null;
                let cTbounds = null;
                if (customizableTunnel !== null) {
                    cTproperties = this.getTunnelScale(customizableTunnel.tunnel);
                    cTbounds = customizableTunnel.bounds;
                }
                let rv = [];
                for (let i = 0; i < data.length; i++) {
                    if (hitboxes.defaultTunnel !== null && dTproperties !== null && dTbounds !== null) {
                        let hitbox = hitboxes.defaultTunnel[i];
                        rv.push({
                            layerIdx: i,
                            coords: this.makeCoordinateString(hitbox.x, hitbox.y, hitbox.width, hitbox.height, dTproperties, dTbounds)
                        });
                    }
                    if (hitboxes.customizable !== null && cTproperties !== null && cTbounds !== null) {
                        let hitbox = hitboxes.customizable[i];
                        rv.push({
                            layerIdx: i,
                            coords: this.makeCoordinateString(hitbox.x, hitbox.y, hitbox.width, hitbox.height, cTproperties, cTbounds)
                        });
                    }
                }
                return rv;
            }
            render() {
                let areas = [];
                if (this.props.isDOMReady) {
                    let hitboxesCoords = this.generatePhysicalHitboxesCoords();
                    for (let i = 0; i < hitboxesCoords.length; i++) {
                        areas.push(React.createElement("area", { shape: "rect", coords: hitboxesCoords[i].coords.valueOf(), "data-layeridx": String(hitboxesCoords[i].layerIdx.valueOf()), "data-instanceidx": String(this.props.instanceId), onMouseOver: this.displayDetailsEventHandler.bind(this), onMouseDown: this.displayLayerResidues3DEventHandler.bind(this) }));
                    }
                }
                return (React.createElement("map", { name: `layersInteractiveMap${this.props.instanceId}`, id: `layer-vizualizer-hitbox-map${this.props.instanceId}` }, areas));
            }
        }
    })(UI = LayersVizualizer.UI || (LayersVizualizer.UI = {}));
})(LayersVizualizer || (LayersVizualizer = {}));
var LayersVizualizer;
(function (LayersVizualizer) {
    ;
    ;
    ;
    ;
    class DrawableObject {
    }
    LayersVizualizer.DrawableObject = DrawableObject;
    class ContextAwareObject extends DrawableObject {
        constructor(context) {
            super();
            this.context = context;
            this.lineWidth = 1;
        }
        clipToBounds(bounds) {
            this.context.rect(bounds.x, bounds.y, bounds.width, bounds.height);
            this.context.clip();
        }
        /*
                public setContext(context:CanvasRenderingContext2D){
                    this.context = context;
                }
        */
        /* Context must be known before hitbox generation
                public draw(x: number, y:number, width:number, height:number, context?:CanvasRenderingContext2D):void{
                    this.setContext(context);
                    this.draw(x,y,width,height);
                }
        */
        drawFromBounds(bounds) {
            this.draw(bounds.x, bounds.y, bounds.width, bounds.height);
        }
        clear(bounds) {
            this.context.clearRect(bounds.x - this.lineWidth, bounds.y - this.lineWidth, bounds.width + this.lineWidth * 2, bounds.height + this.lineWidth * 2);
        }
    }
    LayersVizualizer.ContextAwareObject = ContextAwareObject;
    //--
    class Axis extends ContextAwareObject {
        constructor(minVal, maxVal, context, countOfParts, isHorizontal = true, marginPercent = 5, lineWidth = 2) {
            super(context);
            this.doHighlight = false; //Žluté podbarvení obdélníku
            this.lineColor = "#8c8c8c";
            this.isHorizontal = isHorizontal;
            this.minVal = minVal;
            this.maxVal = maxVal;
            this.countOfParts = countOfParts;
            this.margin = marginPercent;
            this.lineWidth = lineWidth;
        }
        drawMainLine(bounds) {
            if (this.isHorizontal) {
                this.context.moveTo(bounds.x, bounds.y + bounds.height / 2);
                this.context.lineTo(bounds.x + bounds.width, bounds.y + bounds.height / 2);
            }
            else {
                this.context.moveTo(bounds.x + bounds.width / 2, bounds.y);
                this.context.lineTo(bounds.x + bounds.width / 2, bounds.y + bounds.height);
            }
        }
        drawPartLine(bounds, partIdx) {
            if (this.isHorizontal) {
                let partSize = bounds.width / this.countOfParts;
                let margin = (bounds.height / 100) * this.margin;
                this.context.moveTo(bounds.x + partIdx * partSize, bounds.y + margin);
                this.context.lineTo(bounds.x + partIdx * partSize, bounds.y + (bounds.height - margin));
            }
            else {
                let partSize = bounds.height / this.countOfParts;
                let margin = (bounds.width / 100) * this.margin;
                this.context.moveTo(bounds.x + margin, bounds.y + partIdx * partSize);
                this.context.lineTo(bounds.x + (bounds.width - margin), bounds.y + partIdx * partSize);
            }
        }
        draw(x, y, width, height) {
            let bounds = { x, y, width, height };
            this.clear(bounds);
            this.context.save();
            this.clipToBounds(bounds);
            this.context.strokeStyle = this.lineColor;
            this.context.beginPath();
            this.context.lineWidth = this.lineWidth;
            this.drawMainLine(bounds);
            for (let i = 0; i <= this.countOfParts; i++) {
                this.drawPartLine(bounds, i);
            }
            this.context.closePath();
            this.context.stroke();
            if (this.doHighlight) {
                this.context.fillStyle = "yellow";
                this.context.fillRect(x, y, width, height);
            }
            this.context.restore();
        }
    }
    LayersVizualizer.Axis = Axis;
    class CurlyBrackets extends ContextAwareObject {
        constructor(context /*, isLeftToRight:boolean=true*/) {
            super(context);
            this.lineColor = "#8c8c8c";
            this.isLeftToRight = true; /*isLeftToRight;*/
        }
        draw(x, y, width, height) {
            //!!!
            this.isLeftToRight = true;
            //!!!
            let bounds = { x, y, width, height };
            this.clear(bounds);
            /*
            let radius = bounds.width/2;
            let linelength = bounds.height / 2;

            let lx = bounds.x + radius;
            let r = (this.isLeftToRight?(-1)*radius:radius);
            */
            let border = (bounds.width / 100) * 10;
            let borderVertical = (bounds.height / 100) * 2;
            let radius = (bounds.width - (2 * border)) / 2;
            let lineLength = (bounds.height - (borderVertical * 2)) / 2;
            let p0 = {
                x: bounds.x + border,
                y: bounds.y + borderVertical
            };
            let p1 = {
                x: bounds.x + border + radius,
                y: bounds.y + borderVertical
            };
            let p2 = {
                x: bounds.x + border + radius,
                y: bounds.y + borderVertical + radius
            };
            let p3 = {
                x: bounds.x + border + radius,
                y: bounds.y + borderVertical + lineLength - radius
            };
            let p4 = {
                x: bounds.x + border + radius,
                y: bounds.y + borderVertical + lineLength
            };
            let p5 = {
                x: bounds.x + border + radius * 2,
                y: bounds.y + borderVertical + lineLength
            };
            let p6 = {
                x: bounds.x + border + radius,
                y: bounds.y + borderVertical + lineLength + radius
            };
            let p7 = {
                x: bounds.x + border + radius,
                y: bounds.y + borderVertical + lineLength * 2 - radius
            };
            let p8 = {
                x: bounds.x + border + radius,
                y: bounds.y + borderVertical + lineLength * 2
            };
            let p9 = {
                x: bounds.x + border,
                y: bounds.y + borderVertical + lineLength * 2
            };
            this.context.save();
            this.clipToBounds(bounds);
            this.context.strokeStyle = this.lineColor;
            this.context.lineWidth = 1;
            this.context.beginPath();
            this.context.moveTo(p0.x, p0.y);
            this.context.arc(p0.x, p2.y, radius, 1.5 * Math.PI, 0 * Math.PI);
            this.context.moveTo(p2.x, p2.y);
            this.context.lineTo(p3.x, p3.y);
            this.context.moveTo(p5.x, p5.y);
            this.context.arc(p5.x, p3.y, radius, 0.5 * Math.PI, 1 * Math.PI);
            this.context.moveTo(p5.x, p5.y);
            this.context.lineTo(p5.x, p5.y);
            this.context.moveTo(p6.x, p6.y);
            this.context.arc(p5.x, p6.y, radius, 1 * Math.PI, 1.5 * Math.PI);
            this.context.moveTo(p6.x, p6.y);
            this.context.lineTo(p7.x, p7.y);
            this.context.arc(p9.x, p7.y, radius, 0 * Math.PI, 0.5 * Math.PI);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
    }
    LayersVizualizer.CurlyBrackets = CurlyBrackets;
    class ArrowHeadLine extends ContextAwareObject {
        constructor(context, isHorizontal = true) {
            super(context);
            this.lineColor = "#8c8c8c";
            this.doHighlight = false; //Žluté podbarvení obdélníku
            this.isHorizontal = isHorizontal;
            this.lineWidth = 0.5;
        }
        draw(x, y, width, height) {
            this.bounds = { x, y, width, height };
            let xMargin = ((width / 100) * 2);
            let yMargin = ((height / 100) * 15);
            let x1 = (this.isHorizontal ? x + xMargin : x + width / 2 - this.lineWidth / 2);
            let x2 = (this.isHorizontal ? x + width - xMargin : x + width / 2 - this.lineWidth / 2);
            let y1 = (this.isHorizontal ? y + height / 2 - this.lineWidth / 2 : y + yMargin);
            let y2 = (this.isHorizontal ? y + height / 2 - this.lineWidth / 2 : y + height - yMargin);
            this.clear(this.bounds);
            if (this.doHighlight) {
                this.context.save();
                this.context.fillStyle = "yellow";
                this.context.fillRect(x, y, width, height);
                this.context.restore();
            }
            this.context.save();
            this.clipToBounds(this.bounds);
            this.context.strokeStyle = this.lineColor;
            this.context.setLineDash([1, 2]);
            this.context.lineWidth = this.lineWidth;
            //Base line
            this.context.beginPath();
            this.context.moveTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
            // draw the starting arrowhead
            var startRadians = Math.atan((y2 - y1) / (x2 - x1));
            startRadians += ((x2 > x1) ? -90 : 90) * Math.PI / 180;
            this.drawArrowhead(x1, y1, startRadians);
            // draw the ending arrowhead
            var endRadians = Math.atan((y2 - y1) / (x2 - x1));
            endRadians += ((x2 > x1) ? 90 : -90) * Math.PI / 180;
            this.drawArrowhead(x2, y2, endRadians);
        }
        drawArrowhead(x, y, radians) {
            if (this.bounds === void 0) {
                throw new Error("Unsupported state! Bounds not initialized before function call.");
            }
            this.context.save();
            this.clipToBounds(this.bounds);
            this.context.strokeStyle = this.lineColor;
            this.context.fillStyle = this.lineColor;
            this.context.lineWidth = this.lineWidth;
            this.clipToBounds(this.bounds);
            this.context.beginPath();
            this.context.translate(x, y);
            this.context.rotate(radians);
            this.context.moveTo(0, 0);
            this.context.lineTo(2.5, 6);
            this.context.lineTo(0, 0);
            this.context.lineTo(-2.5, 6);
            this.context.lineTo(0, 0);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        }
    }
    LayersVizualizer.ArrowHeadLine = ArrowHeadLine;
    class TextBox extends ContextAwareObject {
        constructor(value, context, fontSize = "medium", textAlign = "center") {
            super(context);
            this.doHighlight = false; //Žluté podbarvení obdélníků s textem
            this.value = value;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
            this.lineWidth = 2;
        }
        fontSizeToPercent(fontSize) {
            if (typeof (fontSize) === "number") {
                return fontSize;
            }
            switch (fontSize) {
                case "small":
                    return 5;
                case "medium":
                    return 6;
                case "big":
                    return 7;
                default:
                    return this.fontSizeToPercent("medium");
            }
        }
        getRealFontSize(fontSize) {
            let hUnit = this.context.canvas.height / 100;
            return this.fontSizeToPercent(fontSize) * hUnit;
        }
        draw(x, y, width, height) {
            let realTextSize = this.getRealFontSize(this.fontSize);
            this.context.save();
            this.clear({ x, y, width, height });
            if (this.doHighlight) {
                this.context.fillStyle = "yellow";
                this.context.fillRect(x, y, width, height);
            }
            this.context.font = `normal normal normal ${realTextSize}px sans-serif`;
            this.context.fillStyle = "#8c8c8c";
            this.context.textAlign = this.textAlign;
            this.context.textBaseline = "middle";
            switch (this.textAlign) {
                case "left":
                    this.context.fillText(this.value, x, y + height / 2, width);
                    break;
                case "center":
                    this.context.fillText(this.value, x + width / 2, y + height / 2, width);
                    break;
                case "right":
                    this.context.fillText(this.value, x + width, y + height / 2, width);
                    break;
            }
            this.context.restore();
        }
    }
    LayersVizualizer.TextBox = TextBox;
    class ColorMixer extends ContextAwareObject {
        constructor(minVal, maxVal, context, paletteFunction, paletteFunctionSettings, isHorizontal = false) {
            super(context);
            this.lineColor = "#8c8c8c";
            this.minVal = minVal;
            this.maxVal = maxVal;
            this.paletteFunction = paletteFunction;
            this.paletteFunctionSettings = paletteFunctionSettings;
            this.isHorizontal = isHorizontal;
        }
        draw(x, y, width, height) {
            let bounds = { x, y, width, height };
            this.clear(bounds);
            this.context.save();
            this.clipToBounds(bounds);
            this.context.strokeStyle = this.lineColor;
            let my_gradient = this.context.createLinearGradient(bounds.x + (this.isHorizontal ? bounds.width : 0), bounds.y, bounds.x, bounds.y + (this.isHorizontal ? 0 : bounds.height));
            my_gradient.addColorStop(0, this.paletteFunction(Number(this.maxVal), this.paletteFunctionSettings));
            my_gradient.addColorStop(0.5, this.paletteFunction(Number((this.minVal + this.maxVal) / 2), this.paletteFunctionSettings));
            my_gradient.addColorStop(1, this.paletteFunction(Number(this.minVal), this.paletteFunctionSettings));
            this.context.beginPath();
            this.context.moveTo(bounds.x, bounds.y);
            this.context.fillStyle = my_gradient;
            this.context.lineWidth = this.lineWidth;
            this.context.rect(bounds.x, bounds.y, bounds.width, bounds.height);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            this.context.restore();
        }
    }
    LayersVizualizer.ColorMixer = ColorMixer;
    class Tunnel extends ContextAwareObject {
        constructor(minVal, maxVal, layers, context, paletteFunction, paletteFunctionSettings, isInverted = false) {
            super(context);
            this.highlightLineWidth = 1;
            this.lineWidth = 1;
            this.hitboxLineWidth = 1;
            this.lineColor = "#8c8c8c";
            this.hitboxLineColor = "#173133";
            this.highlightLineColor = '#000';
            this.minVal = minVal;
            this.maxVal = maxVal;
            this.layers = layers;
            this.paletteFunction = paletteFunction;
            this.isInverted_ = isInverted;
            this.paletteFunctionSettings = paletteFunctionSettings;
            this.hasBounds = false;
        }
        setBounds(x, y, width, height) {
            this.bounds = { x, y, width, height };
            this.scale = {
                x: this.bounds.width / this.maxVal.x,
                y: this.bounds.height / this.maxVal.y
            };
            this.hasBounds = true;
        }
        clear(bounds) {
            let lineCorrection = this.getCorrectionWidth();
            this.context.clearRect(bounds.x - lineCorrection, bounds.y - lineCorrection, bounds.width + lineCorrection * 2, bounds.height + lineCorrection * 2);
        }
        getCorrectionWidth() {
            var width = Math.max(this.lineWidth, this.hitboxLineWidth);
            return Math.max(width, this.highlightLineWidth);
        }
        draw(x, y, width, height) {
            this.setBounds(x, y, width, height);
            this.clear(this.bounds);
            this.renderAllLayers();
            //Render hitboxes to canvas - dotted lines between layers
            this.renderHitboxes();
            this.paintBox();
            this.currentVisualPlain = this.context.getImageData(this.bounds.x, this.bounds.y, this.bounds.width + 1, this.bounds.height + 1);
            this.currentVisual = this.currentVisualPlain;
            //this.highlightHitbox(0);
        }
        renderHitboxes() {
            for (let i = 1; i < this.layers.length; i++) {
                this.renderHitbox(i);
            }
        }
        getHitboxes() {
            let rv = [];
            for (let i = 0; i < this.layers.length; i++) {
                rv.push(this.getHitbox(i));
            }
            return rv;
        }
        highlightHitbox(layerIdx) {
            this.clear(this.bounds);
            this.context.putImageData(this.currentVisual, this.bounds.x, this.bounds.y);
            let hitbox = this.getHitbox(layerIdx);
            let bottom = this.getBottom();
            this.drawSolidLine(hitbox.x, hitbox.y, hitbox.x + hitbox.width, hitbox.y, this.highlightLineWidth, this.highlightLineColor);
            this.drawSolidLine(hitbox.x + hitbox.width, hitbox.y, hitbox.x + hitbox.width, hitbox.y + hitbox.height, this.highlightLineWidth, this.highlightLineColor);
            this.drawSolidLine(hitbox.x + hitbox.width, hitbox.y + hitbox.height, hitbox.x, hitbox.y + hitbox.height, this.highlightLineWidth, this.highlightLineColor);
            this.drawSolidLine(hitbox.x, hitbox.y + hitbox.height, hitbox.x, hitbox.y, this.highlightLineWidth, this.highlightLineColor);
            //this.paintBox();
        }
        deselectLayer() {
            this.clear(this.bounds);
            this.currentVisual = this.currentVisualPlain;
            this.context.putImageData(this.currentVisual, this.bounds.x, this.bounds.y);
        }
        selectLayer(layerIdx) {
            this.clear(this.bounds);
            this.context.putImageData(this.currentVisual, this.bounds.x, this.bounds.y);
            let hitbox = this.getHitbox(layerIdx);
            let bottom = this.getBottom();
            this.drawSolidLine(hitbox.x, hitbox.y, hitbox.x + hitbox.width, hitbox.y, this.highlightLineWidth, "#ff0000");
            this.drawSolidLine(hitbox.x + hitbox.width, hitbox.y, hitbox.x + hitbox.width, hitbox.y + hitbox.height, this.highlightLineWidth, "#ff0000");
            this.drawSolidLine(hitbox.x + hitbox.width, hitbox.y + hitbox.height, hitbox.x, hitbox.y + hitbox.height, this.highlightLineWidth, "#ff0000");
            this.drawSolidLine(hitbox.x, hitbox.y + hitbox.height, hitbox.x, hitbox.y, this.highlightLineWidth, "#ff0000");
            this.currentVisual = this.context.getImageData(this.bounds.x, this.bounds.y, this.bounds.width + 1, this.bounds.height + 1);
        }
        paintBox() {
            let firstHitbox = this.getHitbox(0);
            let lastHitbox = this.getHitbox(this.layers.length - 1);
            let r = {
                sx: firstHitbox.x,
                sy: firstHitbox.y,
                ex: lastHitbox.x + lastHitbox.width,
                ey: lastHitbox.y + lastHitbox.height
            };
            this.drawSolidLine(r.sx, r.sy, r.ex, r.sy, this.lineWidth, this.lineColor);
            this.drawSolidLine(r.ex, r.sy, r.ex, r.ey, this.lineWidth, this.lineColor);
            this.drawSolidLine(r.ex, r.ey, r.sx, r.ey, this.lineWidth, this.lineColor);
            this.drawSolidLine(r.sx, r.ey, r.sx, r.sy, this.lineWidth, this.lineColor);
        }
        getScale() {
            if (!this.hasBounds) {
                return null;
            }
            return this.scale;
        }
        renderAllLayers() {
            this.context.save();
            //Mozilla odmita v urcitych pripadech v 1. polovine tunelu zobrazit barevny prechod kdyz je zapnuty clip()
            //this.clipToBounds(this.bounds);
            let gLine = {
                x0: this.bounds.x,
                y0: 0,
                x1: this.bounds.x + this.bounds.width,
                y1: 0
            };
            let gradient = this.context.createLinearGradient(gLine.x0, gLine.y0, gLine.x1, gLine.y1);
            let path = [];
            let lastColorStop = 0;
            for (let i = 0; i < this.layers.length; i++) {
                lastColorStop = this.prepareLayer(i, gradient, path, lastColorStop);
            }
            this.context.fillStyle = gradient;
            this.context.beginPath();
            this.drawPath(path);
            let scale = this.getScale();
            if (scale === null) {
                throw new Error("Value of scale not computed");
            }
            let restOfBody = [
                {
                    x: this.bounds.x + this.layers[this.layers.length - 1].end * scale.x,
                    y: this.getBottom()
                },
                {
                    x: this.bounds.x + this.layers[0].start * scale.x,
                    y: this.getBottom()
                },
                path[0]
            ];
            this.drawPath(restOfBody);
            this.context.closePath();
            this.context.fill();
            this.context.restore();
            this.context.save();
            this.clipToBounds(this.bounds);
            this.context.strokeStyle = this.lineColor;
            this.context.lineWidth = this.lineWidth;
            this.context.beginPath();
            this.context.moveTo(path[0].x, path[0].y);
            this.drawPath(path);
            this.drawPath(path.reverse());
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        }
        drawPath(path) {
            for (let i = 0; i < path.length; i++) {
                this.context.lineTo(path[i].x, path[i].y);
            }
        }
        prepareLayer(layerIdx, gradient, path, lastColorStop) {
            if (layerIdx < 0) {
                throw new Error("layerIdx must be greater or equal to 0");
            }
            let totalLenght = this.layers[this.layers.length - 1].end - this.layers[0].start;
            let currLength = this.layers[layerIdx].end - this.layers[0].start;
            let scale = this.getScale();
            if (scale === null) {
                throw new Error("Value of scale not computed in time!");
            }
            // Barvy gradientu
            let prevColorValue = ((layerIdx - 1) in this.layers)
                ? this.layers[layerIdx - 1].value
                : this.layers[layerIdx].value;
            let curColorValue = this.layers[layerIdx].value;
            let prevRadius = ((layerIdx - 1) in this.layers)
                ? this.layers[layerIdx - 1].radius
                : this.layers[layerIdx].radius;
            let bottom = this.getBottom();
            let end = this.layers[layerIdx].end;
            let start = this.layers[layerIdx].start;
            if (layerIdx > 0) {
                start = this.bounds.x + this.layers[layerIdx - 1].end * scale.x;
            }
            let inversionConstant = (this.isInverted()) ? (-1) : 1;
            if (layerIdx == 0) {
                path.push({
                    x: this.bounds.x + start * scale.x,
                    y: bottom - prevRadius * scale.y * inversionConstant
                });
            }
            path.push({
                x: this.bounds.x + end * scale.x,
                y: bottom - this.layers[layerIdx].radius * scale.y * inversionConstant
            });
            let color = this.paletteFunction(Number(prevColorValue), this.paletteFunctionSettings);
            let currentColorStop = 0;
            if (layerIdx != 0) {
                color = this.paletteFunction(Number(curColorValue), this.paletteFunctionSettings);
                currentColorStop = (currLength / totalLenght);
            }
            gradient.addColorStop(currentColorStop, color);
            return currentColorStop;
        }
        getHitbox(layerIdx) {
            return {
                x: this.layers[layerIdx].start,
                y: 0,
                width: this.layers[layerIdx].end - this.layers[layerIdx].start,
                height: this.maxVal.y,
                layerID: layerIdx
            };
        }
        moveTo(x, y) {
            let bottom = this.getBottom();
            let inversionKoeficient = 1;
            if (this.isInverted_) {
                inversionKoeficient = -1;
            }
            this.context.moveTo(this.bounds.x + x * this.scale.x, bottom - y * this.scale.y * inversionKoeficient);
        }
        lineTo(x, y) {
            let bottom = this.getBottom();
            let inversionKoeficient = 1;
            if (this.isInverted_) {
                inversionKoeficient = -1;
            }
            this.context.lineTo(this.bounds.x + x * this.scale.x, bottom - y * this.scale.y * inversionKoeficient);
        }
        drawSolidLine(sx, sy, ex, ey, lineWidth = 1, strokeStyle = "#000") {
            this.context.save();
            this.clipToBounds(this.bounds);
            this.context.strokeStyle = strokeStyle;
            this.context.lineWidth = lineWidth;
            this.context.beginPath();
            this.moveTo(sx, sy);
            this.lineTo(ex, ey);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        }
        renderHitbox(layerIdx) {
            if (layerIdx == 0) {
                return;
            }
            let scale = this.getScale();
            if (scale === null) {
                throw new Error("Value of scale has not been computed!");
            }
            let inversionConstant = (this.isInverted()) ? -1 : 1;
            let hitbox = this.getHitbox(layerIdx);
            let maxY = this.layers[layerIdx - 1].radius;
            let yStart = this.bounds.y
                + hitbox.y * scale.y
                + (this.isInverted() ? 0 : hitbox.height * scale.y - (maxY * scale.y))
                + this.lineWidth;
            let height = maxY * scale.y;
            let bgColor = "#ffffff";
            //Check if using HTML Canvas or SVG wraper, if so - get real bg color
            if (this.context.getImageData(0, 0, 1, 1) !== null
                && this.context.getImageData(0, 0, 1, 1) !== void 0) {
                bgColor = LayersVizualizer.Colors.rgbToHex(LayersVizualizer.Colors.Uint8ClampedArrayToRGB(this.context.getImageData(this.bounds.x + hitbox.x * scale.x, yStart + height / 2, 1, 1).data));
            }
            this.context.save();
            this.clipToBounds({
                x: this.bounds.x + hitbox.x * scale.x,
                y: yStart,
                width: hitbox.width * scale.x,
                height: height - this.lineWidth * 2
            });
            this.context.strokeStyle = LayersVizualizer.Colors.invertHexContrastGrayscale(bgColor); //this.lineColor;
            this.context.lineWidth = this.hitboxLineWidth;
            this.context.setLineDash([1, 3]);
            this.context.beginPath();
            this.moveTo(hitbox.x, hitbox.y);
            this.lineTo(hitbox.x, hitbox.y + hitbox.height);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        }
        getBottom() {
            return (this.isInverted_)
                ? this.bounds.y
                : this.bounds.y + this.bounds.height;
        }
        getTop() {
            return (this.isInverted_)
                ? this.bounds.y + this.bounds.height
                : this.bounds.y;
        }
        isInverted() {
            return this.isInverted_;
        }
    }
    LayersVizualizer.Tunnel = Tunnel;
})(LayersVizualizer || (LayersVizualizer = {}));
var LayersVizualizer;
(function (LayersVizualizer) {
    ;
    ;
    ;
    class Vizualizer {
        getPublicInstanceIdx() {
            return this.publicInstanceIdx;
        }
        getCurrentColoringSettings(tunnelType) {
            return this.__colorFunctionSetings.get(tunnelType);
        }
        setCurrentColorFunctionSettings(tunnelType, colorFunctionSetings) {
            this.__colorFunctionSetings.set(tunnelType, colorFunctionSetings);
        }
        isDataDirty() {
            return this.dataDirty;
        }
        getCanvas() {
            //DOM binding check
            if (!this.isDOMBound) {
                this.rebindDOMRefs();
            }
            return this.__canvas;
        }
        getContext() {
            //DOM binding check
            if (!this.isDOMBound) {
                this.rebindDOMRefs();
            }
            return this.__context;
        }
        getTunnels() {
            if (this.dataDirty) {
                return null;
            }
            return this.__tunnels;
        }
        onWindowResize(e) {
            if (document.getElementById(this.canvasId) === null) {
                return;
            }
            let canvas = this.getCanvas();
            let context = this.getContext();
            if (canvas === void 0 || context === void 0 || !this.isElementVisible(canvas) || !CommonUtils.Tabs.isActive("left-tabs", "1")) {
                return;
            }
            let xUnit = canvas.width / 100;
            let yUnit = canvas.height / 100;
            let x_diff = Math.abs(canvas.width - canvas.offsetWidth) / xUnit;
            let y_diff = Math.abs(canvas.height - canvas.offsetHeight) / yUnit;
            if (x_diff < this.resizePercentPrecision
                && y_diff < this.resizePercentPrecision) {
                return;
            }
            this.resizeCanvas();
            this.vizualize();
            this.highlightHitbox(this.currentLayerIdx);
        }
        isElementVisible(element) {
            if (element.style.display === "none" || element.style.visibility === "hidden") {
                return false;
            }
            if (element.parentElement === null || element.parentElement === void 0) {
                return true;
            }
            return this.isElementVisible(element.parentElement);
        }
        onContentResize(e) {
            if (document.getElementById(this.canvasId) === null) {
                return;
            }
            let canvas = this.getCanvas();
            let context = this.getContext();
            if (canvas === void 0 || context === void 0 || !this.isElementVisible(canvas) || !CommonUtils.Tabs.isActive("left-tabs", "1")) {
                return;
            }
            this.resizeCanvas();
            this.vizualize();
            this.highlightHitbox(this.currentLayerIdx);
        }
        resizeCanvas() {
            let canvas = this.getCanvas();
            let context = this.getContext();
            if (canvas === void 0 || context === void 0) {
                return;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.setAttribute("width", String(canvas.offsetWidth));
            canvas.setAttribute("height", String(canvas.offsetHeight));
        }
        configBySettings(settings) {
            this.coloringPropertyKey = "Hydropathy";
            if (settings.coloringProperty != null) {
                this.coloringPropertyKey = settings.coloringProperty.valueOf();
            }
            this.customColoringPropertyKey = this.coloringPropertyKey;
            this.useColorMinMax = true;
            if (settings.useColorMinMax != null) {
                this.useColorMinMax = settings.useColorMinMax.valueOf();
            }
            this.absCenterPositions = new Map();
            this.absCenterPositions.set("Polarity", 5);
            this.absCenterPositions.set("Hydropathy", 0);
            this.absCenterPositions.set("Hydrophobicity", 0);
            this.absCenterPositions.set("Mutability", 75);
            this.absCenterPositions.set("Charge", 0);
            this.absCenterPositions.set("NumPositives", 0);
            this.absCenterPositions.set("NumNegatives", 0);
            this.absColorValueMax = new Map();
            this.absColorValueMax.set("Polarity", 52);
            if (settings.colorMaxValue !== void 0 && settings.colorMaxValue.Polarity !== void 0) {
                this.absColorValueMax.set("Polarity", settings.colorMaxValue.Polarity.valueOf());
            }
            this.absColorValueMax.set("Mutability", 117);
            if (settings.colorMaxValue !== void 0 && settings.colorMaxValue.Mutability !== void 0) {
                this.absColorValueMax.set("Mutability", settings.colorMaxValue.Mutability.valueOf());
            }
            this.absColorValueMax.set("Hydropathy", 4.5);
            if (settings.colorMaxValue !== void 0 && settings.colorMaxValue.Hydropathy !== void 0) {
                this.absColorValueMax.set("Hydropathy", settings.colorMaxValue.Hydropathy.valueOf());
            }
            this.absColorValueMax.set("Hydrophobicity", 1.81);
            if (settings.colorMaxValue !== void 0 && settings.colorMaxValue.Hydrophobicity !== void 0) {
                this.absColorValueMax.set("Hydrophobicity", settings.colorMaxValue.Hydrophobicity.valueOf());
            }
            this.absColorValueMax.set("Charge", 5);
            if (settings.colorMaxValue !== void 0 && settings.colorMaxValue.Charge !== void 0) {
                this.absColorValueMax.set("Charge", settings.colorMaxValue.Charge.valueOf());
            }
            this.absColorValueMax.set("NumPositives", 5);
            if (settings.colorMaxValue !== void 0 && settings.colorMaxValue.NumPositives !== void 0) {
                this.absColorValueMax.set("NumPositives", settings.colorMaxValue.NumPositives.valueOf());
            }
            this.absColorValueMax.set("NumNegatives", 5);
            if (settings.colorMaxValue !== void 0 && settings.colorMaxValue.NumNegatives !== void 0) {
                this.absColorValueMax.set("NumNegatives", settings.colorMaxValue.NumNegatives.valueOf());
            }
            this.absColorValueMin = new Map();
            this.absColorValueMin.set("Polarity", 0);
            if (settings.colorMinValue !== void 0 && settings.colorMinValue.Polarity !== void 0) {
                this.absColorValueMin.set("Polarity", settings.colorMinValue.Polarity.valueOf());
            }
            this.absColorValueMin.set("Mutability", 25);
            if (settings.colorMinValue !== void 0 && settings.colorMinValue.Mutability !== void 0) {
                this.absColorValueMin.set("Mutability", settings.colorMinValue.Mutability.valueOf());
            }
            this.absColorValueMin.set("Hydropathy", -4.5);
            if (settings.colorMinValue !== void 0 && settings.colorMinValue.Hydropathy !== void 0) {
                this.absColorValueMin.set("Hydropathy", settings.colorMinValue.Hydropathy.valueOf());
            }
            this.absColorValueMin.set("Hydrophobicity", -1.14);
            if (settings.colorMinValue !== void 0 && settings.colorMinValue.Hydrophobicity !== void 0) {
                this.absColorValueMin.set("Hydrophobicity", settings.colorMinValue.Hydrophobicity.valueOf());
            }
            this.absColorValueMin.set("Charge", -5);
            if (settings.colorMinValue !== void 0 && settings.colorMinValue.Charge !== void 0) {
                this.absColorValueMin.set("Charge", settings.colorMinValue.Charge.valueOf());
            }
            this.absColorValueMin.set("NumPositives", 0);
            if (settings.colorMinValue !== void 0 && settings.colorMinValue.NumPositives !== void 0) {
                this.absColorValueMin.set("NumPositives", settings.colorMinValue.NumPositives.valueOf());
            }
            this.absColorValueMin.set("NumNegatives", 0);
            if (settings.colorMinValue !== void 0 && settings.colorMinValue.NumNegatives !== void 0) {
                this.absColorValueMin.set("NumNegatives", settings.colorMinValue.NumNegatives.valueOf());
            }
            this.radiusPropertyKey = "MinRadius";
            if (settings.radiusProperty != null) {
                this.radiusPropertyKey = settings.radiusProperty;
            }
            this.customRadiusPropertyKey = this.radiusPropertyKey;
            if (settings.customRadiusProperty != null) {
                this.customRadiusPropertyKey = settings.customRadiusProperty;
            }
            this.skipMiddle = false;
            if (settings.skipMiddleColor != null) {
                this.skipMiddle = settings.skipMiddleColor.valueOf();
            }
            this.topMarginPercent = 10;
            if (settings.topMargin != null) {
                this.topMarginPercent = settings.topMargin.valueOf();
            }
        }
        configureColors() {
            let maxYellow = { r: 251, g: 255, b: 7 };
            let middleYellow = { r: 240, g: 248, b: 190 };
            let maxBlue = { r: 0, g: 0, b: 255 };
            let middleBlue = { r: 253, g: 253, b: 255 };
            let maxRed = { r: 255, g: 0, b: 0 };
            let middleRed = { r: 253, g: 253, b: 225 };
            let maxWhite = { r: 255, g: 255, b: 255 };
            let middleWhite = { r: 240, g: 240, b: 240 };
            this.minColor = {
                Hydropathy: maxBlue,
                Hydrophobicity: maxBlue,
                Mutability: maxBlue,
                Polarity: maxYellow,
                Charge: maxRed,
                NumPositives: maxWhite,
                NumNegatives: maxWhite
            };
            this.minColorMiddle = {
                Hydropathy: middleBlue,
                Hydrophobicity: middleBlue,
                Mutability: middleBlue,
                Polarity: middleYellow,
                Charge: middleRed,
                NumPositives: middleWhite,
                NumNegatives: middleWhite
            };
            this.maxColorMiddle = {
                Hydropathy: middleYellow,
                Hydrophobicity: middleYellow,
                Mutability: middleRed,
                Polarity: middleBlue,
                Charge: middleBlue,
                NumPositives: middleBlue,
                NumNegatives: middleRed
            };
            this.maxColor = {
                Hydropathy: maxYellow,
                Hydrophobicity: maxYellow,
                Mutability: maxRed,
                Polarity: maxBlue,
                Charge: maxBlue,
                NumPositives: maxBlue,
                NumNegatives: maxRed
            };
        }
        constructor(uiContainerId, settings) {
            this.verticalAxisChunkCount = 4;
            //Register instance
            if (Vizualizer.ACTIVE_INSTANCES == null) {
                Vizualizer.ACTIVE_INSTANCES = [];
            }
            this.publicInstanceIdx = Vizualizer.ACTIVE_INSTANCES.length;
            Vizualizer.ACTIVE_INSTANCES.push(this);
            this.uiContainerId = uiContainerId;
            this.configBySettings(settings);
            this.canvasId = "layer-vizualizer-canvas" + String(this.publicInstanceIdx);
            this.configureColors();
            this.__tunnels = {
                default: null,
                customizable: null
            };
            this.dataDirty = true;
            this.isDOMBound = false;
            this.currentLayerIdx = 0;
            this.tmpCanvasId = `tmpCanvas_${this.publicInstanceIdx}`;
            this.selectedLayerIdx = -1;
            this.__colorFunctionSetings = new Map();
            //Dynamic canvas resizing
            this.resizePercentPrecision = 1; //5% difference between real and given => cause resizing of canvas
            window.addEventListener("resize", this.onWindowResize.bind(this));
            $(window).on("lvContentResize", this.onContentResize.bind(this));
        }
        deselectLayer() {
            this.selectedLayerIdx = -1;
            let tunnels = this.getTunnels();
            if (tunnels === null) {
                return;
            }
            if (tunnels.default !== null) {
                tunnels.default.tunnel.deselectLayer();
            }
            if (tunnels.customizable !== null) {
                tunnels.customizable.tunnel.deselectLayer();
            }
        }
        selectLayer(layerIdx) {
            if (layerIdx < 0) {
                return;
            }
            this.selectedLayerIdx = layerIdx;
            let tunnels = this.getTunnels();
            if (tunnels === null) {
                return;
            }
            if (tunnels.default !== null) {
                tunnels.default.tunnel.selectLayer(layerIdx);
            }
            if (tunnels.customizable !== null) {
                tunnels.customizable.tunnel.selectLayer(layerIdx);
            }
        }
        getSelectedLayer() {
            return this.selectedLayerIdx;
        }
        setResizePercentPrecision(percentPrecision) {
            this.resizePercentPrecision = percentPrecision;
        }
        getResizePercentPrecision() {
            return this.resizePercentPrecision;
        }
        setColorBoundsMode(mode) {
            this.useColorMinMax = (mode == "Min/max");
        }
        rebindDOMRefs() {
            var cnvs = document.getElementById(this.canvasId);
            if (cnvs == null) {
                throw new Error("Canvas element with id " + String(this.canvasId) + " not found");
            }
            this.__canvas = cnvs;
            var cntx = this.__canvas.getContext("2d");
            if (cntx == null) {
                throw new Error("Cannot obtain 2D canvas context");
            }
            this.__context = cntx;
            this.topAirBorderHeight = ((this.__canvas.height / 100) * this.topMarginPercent);
            this.isDOMBound = true;
            this.resizeCanvas();
        }
        /** Datasource change **/
        setData(layersData) {
            this.currentLayerIdx = -1;
            this.selectedLayerIdx = -1;
            this.data = layersData;
            this.dataDirty = true;
        }
        prepareData() {
            if (this.data.length == 0) {
                console.log("ERR: no data supplied!");
                return;
            }
            this.maxX = this.data[this.data.length - 1].EndDistance;
            this.maxY = this.data[0][this.radiusPropertyKey];
            this.customMaxY = this.data[0][this.customRadiusPropertyKey];
            let val = this.data[0].Properties[this.coloringPropertyKey];
            if (val == null) {
                throw new Error("Cannot init LayerVizualizer due to invalid settings - coloringProperty: "
                    + String(this.coloringPropertyKey));
            }
            this.minColoringValue = new Map();
            this.maxColoringValue = new Map();
            for (let key in this.data[0].Properties) {
                this.minColoringValue.set(key, this.data[0].Properties[key]);
                this.maxColoringValue.set(key, this.data[0].Properties[key]);
            }
            for (let i = 0; i < this.data.length; i++) {
                this.maxY = Math.max(this.maxY, this.data[i][this.radiusPropertyKey]);
                this.customMaxY = Math.max(this.customMaxY, this.data[i][this.customRadiusPropertyKey]);
                for (let key in this.data[i].Properties) {
                    let curVal = Number(this.data[i].Properties[key]);
                    if (curVal === void 0) {
                        throw new Error("Corrupted data!");
                    }
                    let oldMinVal = this.minColoringValue.get(key);
                    if (oldMinVal === void 0 || curVal.valueOf() < oldMinVal.valueOf()) {
                        this.minColoringValue.set(key, curVal.valueOf());
                    }
                    let oldMaxVal = this.maxColoringValue.get(key);
                    if (oldMaxVal === void 0 || curVal.valueOf() > oldMaxVal.valueOf()) {
                        this.maxColoringValue.set(key, curVal.valueOf());
                    }
                }
            }
            this.dataDirty = false;
            this.currentLayerIdx = 0;
        }
        /** Layer vizualization **/
        getComponentsPositioning() {
            let canvas = this.getCanvas();
            if (canvas === null || canvas === void 0) {
                throw new Error("Canvas element is not bound!");
            }
            let currentWidth = canvas.width;
            let currentHeight = canvas.height;
            let colorMixerMinPxWidth = 150;
            let distanceLabelMinPxWidth = 80;
            var toRealPx = function (width, height, component) {
                return component.toBounds(width, height);
            };
            var toPercent = function (width, height, realX, realY) {
                return {
                    x: (realX / width) * 100,
                    y: (realY / height) * 100
                };
            };
            let positioning = {
                defaultTunnel: new LayersVizualizer.Component.Paintable(),
                customizableTunnel: new LayersVizualizer.Component.Paintable(),
                horizontalAxis: new LayersVizualizer.Component.Axis(),
                verticalAxis_1: new LayersVizualizer.Component.Axis(),
                verticalAxis_2: new LayersVizualizer.Component.Axis(),
                defaultColorMixer: new LayersVizualizer.Component.Paintable(),
                defaultColorMixerHorizontal: new LayersVizualizer.Component.Paintable(),
                customizableColorMixer: new LayersVizualizer.Component.Paintable(),
                customizableColorMixerHorizontal: new LayersVizualizer.Component.Paintable(),
                vAxis1TopLabel: new LayersVizualizer.Component.Positionable(),
                vAxis2BottomLabel: new LayersVizualizer.Component.Positionable(),
                axisLeftZeroLabel: new LayersVizualizer.Component.Positionable(),
                horizontalAxisRightLabel: new LayersVizualizer.Component.Positionable(),
                dColorMixerTopLabel: new LayersVizualizer.Component.Positionable(),
                dColorMixerBottomLabel: new LayersVizualizer.Component.Positionable(),
                dColorMixerLeftLabel: new LayersVizualizer.Component.Positionable(),
                dColorMixerRightLabel: new LayersVizualizer.Component.Positionable(),
                cColorMixerTopLabel: new LayersVizualizer.Component.Positionable(),
                cColorMixerBottomLabel: new LayersVizualizer.Component.Positionable(),
                cColorMixerLeftLabel: new LayersVizualizer.Component.Positionable(),
                cColorMixerRightLabel: new LayersVizualizer.Component.Positionable(),
                defaultCurlyBrackets: new LayersVizualizer.Component.Positionable(),
                customizableCurlyBrackets: new LayersVizualizer.Component.Positionable(),
                customizableCurlyBracketsLabel: new LayersVizualizer.Component.Positionable(),
                defaultCurlyBracketsLabel: new LayersVizualizer.Component.Positionable(),
                defaultArrowheadLine: new LayersVizualizer.Component.Positionable(),
                customizableArrowheadLine: new LayersVizualizer.Component.Positionable(),
                defaultArrowheadLineLabel: new LayersVizualizer.Component.Positionable(),
                customizableArrowheadLineLabel: new LayersVizualizer.Component.Positionable(),
                defaultColorMixerLabel: new LayersVizualizer.Component.Positionable(),
                customizableColorMixerLabel: new LayersVizualizer.Component.Positionable()
            };
            let dtHeight = 30; //35
            let dtTop = 13;
            let dtmTop = 0;
            let haTop = dtTop + dtmTop + dtHeight;
            let haHeight = 10;
            let smallLabelHeight = haHeight / 2;
            let dtWidth = 80;
            //Default tunnel
            {
                positioning.defaultTunnel.left = 8; //14
                positioning.defaultTunnel.top = dtTop;
                positioning.defaultTunnel.marginTop = dtmTop;
                positioning.defaultTunnel.marginLeft = 0;
                positioning.defaultTunnel.marginRight = 0;
                positioning.defaultTunnel.width = dtWidth;
                positioning.defaultTunnel.height = dtHeight; //38
            }
            //Customizable tunnel
            {
                positioning.customizableTunnel.left = positioning.defaultTunnel.left;
                positioning.customizableTunnel.marginTop = 2;
                positioning.customizableTunnel.marginLeft = 0;
                positioning.customizableTunnel.marginRight = 0;
                positioning.customizableTunnel.width = dtWidth;
                positioning.customizableTunnel.height = dtHeight;
                positioning.customizableTunnel.top = haTop + haHeight;
            }
            //Default Color Mixer
            {
                positioning.defaultColorMixer.left = positioning.defaultTunnel.left
                    + positioning.defaultTunnel.marginLeft
                    + positioning.defaultTunnel.width;
                positioning.defaultColorMixer.marginTop = 5;
                positioning.defaultColorMixer.marginLeft = 1;
                positioning.defaultColorMixer.width = 4;
                positioning.defaultColorMixer.height = positioning.defaultTunnel.height;
                positioning.defaultColorMixer.top = 0;
            }
            let cmhWidth = 100 - (positioning.defaultColorMixer.left);
            let cmhHeight = 4;
            //Default Color Mixer -- Horizontal
            {
                positioning.defaultColorMixerHorizontal.left = positioning.defaultTunnel.left
                    + positioning.customizableTunnel.width
                    - (cmhWidth);
                positioning.defaultColorMixerHorizontal.marginBottom = 1;
                positioning.defaultColorMixerHorizontal.width =
                    cmhWidth;
                positioning.defaultColorMixerHorizontal.top =
                    positioning.defaultTunnel.top
                        + positioning.defaultTunnel.marginTop
                        - (cmhHeight + 1 /*1=margin-bottom*/);
                positioning.defaultColorMixerHorizontal.height = cmhHeight;
            }
            //Customizable Color Mixer
            {
                positioning.customizableColorMixer.left = positioning.defaultColorMixer.left;
                positioning.customizableColorMixer.marginBottom = 5;
                positioning.customizableColorMixer.marginLeft = 1;
                positioning.customizableColorMixer.width = positioning.defaultColorMixer.width;
                positioning.customizableColorMixer.height = positioning.defaultColorMixer.height;
                positioning.customizableColorMixer.bottom = 0;
            }
            //Customizable Color Mixer -- Horizontal
            {
                positioning.customizableColorMixerHorizontal.left = positioning.customizableTunnel.left
                    + positioning.customizableTunnel.width
                    - (cmhWidth);
                positioning.customizableColorMixerHorizontal.marginTop = 1;
                positioning.customizableColorMixerHorizontal.marginBottom = 5;
                positioning.customizableColorMixerHorizontal.width =
                    cmhWidth;
                positioning.customizableColorMixerHorizontal.top =
                    positioning.customizableTunnel.top
                        + positioning.customizableTunnel.marginTop
                        + positioning.customizableTunnel.height;
                positioning.customizableColorMixerHorizontal.height = cmhHeight;
            }
            let colorMixerTooThin = (toRealPx(currentWidth, currentHeight, positioning.defaultColorMixerHorizontal).width < colorMixerMinPxWidth);
            if (colorMixerTooThin) {
                let width = toPercent(currentWidth, currentHeight, colorMixerMinPxWidth, 0).x;
                let x = positioning.defaultColorMixerHorizontal.left + (positioning.defaultColorMixerHorizontal.width - width);
                let colorMixerComponents = [
                    positioning.defaultColorMixerHorizontal,
                    positioning.customizableColorMixerHorizontal
                ];
                for (let component of colorMixerComponents) {
                    component.left = x;
                    component.width = width;
                }
            }
            //Horizontal Axis
            {
                positioning.horizontalAxis.left = positioning.defaultTunnel.left + positioning.defaultTunnel.marginLeft;
                positioning.horizontalAxis.top = haTop;
                positioning.horizontalAxis.marginLeft = 0;
                positioning.horizontalAxis.marginTop = 1;
                positioning.horizontalAxis.width = positioning.defaultTunnel.width;
                positioning.horizontalAxis.height = haHeight;
            }
            //Vertical Axis 1
            {
                positioning.verticalAxis_1.left = 0;
                positioning.verticalAxis_1.top = dtTop + dtmTop;
                positioning.verticalAxis_1.marginLeft = 4; //10
                positioning.verticalAxis_1.marginRight = 0;
                positioning.verticalAxis_1.width = 3;
                positioning.verticalAxis_1.height = positioning.defaultTunnel.height;
            }
            //Vertical Axis 2
            {
                positioning.verticalAxis_2.left = 0;
                positioning.verticalAxis_2.top = positioning.customizableTunnel.top + positioning.customizableTunnel.marginTop;
                positioning.verticalAxis_2.marginLeft = positioning.verticalAxis_1.marginLeft;
                positioning.verticalAxis_2.marginRight = 0;
                positioning.verticalAxis_2.width = 3;
                positioning.verticalAxis_2.height = positioning.verticalAxis_1.height;
            }
            let bigLabelHeight = positioning.horizontalAxis.height - (positioning.horizontalAxis.height / 8) * 2;
            //Left Common Axis Label
            {
                positioning.axisLeftZeroLabel.left = 0;
                positioning.axisLeftZeroLabel.marginLeft = 0;
                positioning.axisLeftZeroLabel.top = positioning.horizontalAxis.top
                    + ((positioning.horizontalAxis.marginTop === void 0) ? 0 : positioning.horizontalAxis.marginTop);
                positioning.axisLeftZeroLabel.marginTop =
                    Math.abs(bigLabelHeight - positioning.horizontalAxis.height) / 2;
                positioning.axisLeftZeroLabel.width = positioning.horizontalAxis.left - 1;
                positioning.axisLeftZeroLabel.height = bigLabelHeight;
            }
            //Right Horizontal Axis Label
            {
                positioning.horizontalAxisRightLabel.left = positioning.horizontalAxis.left + positioning.horizontalAxis.width + positioning.horizontalAxis.marginLeft;
                positioning.horizontalAxisRightLabel.marginLeft = positioning.defaultColorMixer.marginLeft;
                positioning.horizontalAxisRightLabel.top = positioning.axisLeftZeroLabel.top;
                positioning.horizontalAxisRightLabel.marginTop = positioning.axisLeftZeroLabel.marginTop;
                positioning.horizontalAxisRightLabel.width = 100 - (positioning.horizontalAxisRightLabel.left + positioning.horizontalAxisRightLabel.marginLeft);
                positioning.horizontalAxisRightLabel.height = positioning.axisLeftZeroLabel.height;
            }
            //Top Default Tunnel Vertical Axis Label
            {
                positioning.vAxis1TopLabel.left = 0;
                positioning.vAxis1TopLabel.marginLeft = 0;
                positioning.vAxis1TopLabel.top = positioning.defaultTunnel.top
                    - positioning.axisLeftZeroLabel.height / 2;
                positioning.vAxis1TopLabel.marginTop = 0;
                positioning.vAxis1TopLabel.width = positioning.verticalAxis_1.marginLeft
                    + ((positioning.verticalAxis_1.left === void 0) ? 0 : positioning.verticalAxis_1.left);
                positioning.vAxis1TopLabel.height = positioning.axisLeftZeroLabel.height;
            }
            //Bottom Customizable Tunnel Vertical Axis Label
            {
                positioning.vAxis2BottomLabel.left = 0;
                positioning.vAxis2BottomLabel.marginLeft = 0;
                positioning.vAxis2BottomLabel.bottom = 100
                    - (positioning.customizableTunnel.top + positioning.customizableTunnel.marginTop
                        + positioning.customizableTunnel.height + positioning.axisLeftZeroLabel.height / 2);
                positioning.vAxis2BottomLabel.marginBottom = 0;
                positioning.vAxis2BottomLabel.width = positioning.verticalAxis_2.marginLeft
                    + ((positioning.verticalAxis_2.left === void 0) ? 0 : positioning.verticalAxis_2.left);
                ;
                positioning.vAxis2BottomLabel.height = positioning.axisLeftZeroLabel.height;
            }
            //Top Default Color Mixer Label
            {
                positioning.dColorMixerTopLabel.left = positioning.defaultColorMixer.left
                    + positioning.defaultColorMixer.marginLeft
                    + positioning.defaultColorMixer.width;
                positioning.dColorMixerTopLabel.marginLeft = 1;
                positioning.dColorMixerTopLabel.top = positioning.defaultTunnel.top
                    + positioning.defaultTunnel.marginTop;
                positioning.dColorMixerTopLabel.marginTop = 0;
                positioning.dColorMixerTopLabel.width = 100
                    - (positioning.defaultColorMixer.left
                        + positioning.defaultColorMixer.marginLeft
                        + positioning.defaultColorMixer.width
                        + positioning.dColorMixerTopLabel.marginLeft);
                positioning.dColorMixerTopLabel.height = positioning.axisLeftZeroLabel.height;
            }
            //Bottom Default Color Mixer Label
            {
                positioning.dColorMixerBottomLabel.left = positioning.dColorMixerTopLabel.left;
                positioning.dColorMixerBottomLabel.marginLeft = positioning.dColorMixerTopLabel.marginLeft;
                positioning.dColorMixerBottomLabel.top =
                    ((positioning.defaultTunnel.top === void 0) ? 0 : positioning.defaultTunnel.top)
                        + positioning.defaultTunnel.marginTop
                        + positioning.defaultTunnel.height
                        - (positioning.axisLeftZeroLabel.height);
                positioning.dColorMixerBottomLabel.width = positioning.dColorMixerTopLabel.width;
                positioning.dColorMixerBottomLabel.height = positioning.axisLeftZeroLabel.height;
            }
            //Left Default Color Mixer Label
            {
                positioning.dColorMixerLeftLabel.left = positioning.defaultColorMixerHorizontal.left;
                positioning.dColorMixerLeftLabel.marginLeft = positioning.defaultColorMixerHorizontal.marginLeft;
                positioning.dColorMixerLeftLabel.top = positioning.defaultColorMixerHorizontal.top
                    - (smallLabelHeight + 1.5);
                positioning.dColorMixerLeftLabel.marginTop = 0;
                positioning.dColorMixerLeftLabel.width = positioning.defaultColorMixerHorizontal.width / 2;
                positioning.dColorMixerLeftLabel.height = smallLabelHeight;
            }
            //Right Default Color Mixer Label
            {
                positioning.dColorMixerRightLabel.left = positioning.defaultColorMixerHorizontal.left
                    + positioning.defaultColorMixerHorizontal.width - positioning.dColorMixerLeftLabel.width;
                positioning.dColorMixerRightLabel.marginRight = positioning.dColorMixerLeftLabel.marginLeft;
                positioning.dColorMixerRightLabel.top = positioning.dColorMixerLeftLabel.top;
                positioning.dColorMixerRightLabel.marginTop = positioning.dColorMixerLeftLabel.marginTop;
                positioning.dColorMixerRightLabel.width = positioning.dColorMixerLeftLabel.width;
                positioning.dColorMixerRightLabel.height = positioning.dColorMixerLeftLabel.height;
            }
            //Top Customizable Color Mixer Label
            {
                positioning.cColorMixerTopLabel.left = positioning.dColorMixerTopLabel.left;
                positioning.cColorMixerTopLabel.marginLeft = positioning.dColorMixerTopLabel.marginLeft;
                positioning.cColorMixerTopLabel.bottom =
                    ((positioning.customizableTunnel.bottom === void 0) ? 0 : positioning.customizableTunnel.bottom)
                        + positioning.customizableTunnel.height
                        - (positioning.axisLeftZeroLabel.height);
                positioning.cColorMixerTopLabel.marginBottom = 0;
                positioning.cColorMixerTopLabel.width = positioning.dColorMixerTopLabel.width;
                positioning.cColorMixerTopLabel.height = positioning.axisLeftZeroLabel.height;
            }
            //Bottom Customizable Color Mixer Label
            {
                positioning.cColorMixerBottomLabel.left = positioning.dColorMixerTopLabel.left;
                positioning.cColorMixerBottomLabel.marginLeft = positioning.dColorMixerTopLabel.marginLeft;
                positioning.cColorMixerBottomLabel.bottom = positioning.customizableTunnel.bottom;
                positioning.cColorMixerBottomLabel.marginBottom = positioning.customizableTunnel.marginBottom;
                positioning.cColorMixerBottomLabel.width = positioning.dColorMixerTopLabel.width;
                positioning.cColorMixerBottomLabel.height = positioning.axisLeftZeroLabel.height;
            }
            //Left Customizable Color Mixer Label
            {
                positioning.cColorMixerLeftLabel.left = positioning.customizableColorMixerHorizontal.left;
                positioning.cColorMixerLeftLabel.marginLeft = positioning.customizableColorMixerHorizontal.marginLeft;
                positioning.cColorMixerLeftLabel.top = positioning.customizableColorMixerHorizontal.top
                    + positioning.customizableColorMixerHorizontal.height
                    + positioning.customizableColorMixerHorizontal.marginTop;
                positioning.cColorMixerLeftLabel.marginTop = 2;
                positioning.cColorMixerLeftLabel.width = positioning.customizableColorMixerHorizontal.width / 2;
                positioning.cColorMixerLeftLabel.height = smallLabelHeight;
            }
            //Right Customizable Color Mixer Label
            {
                positioning.cColorMixerRightLabel.left = positioning.customizableColorMixerHorizontal.left
                    + positioning.customizableColorMixerHorizontal.width - positioning.cColorMixerLeftLabel.width;
                positioning.cColorMixerRightLabel.marginRight = positioning.cColorMixerLeftLabel.marginLeft;
                positioning.cColorMixerRightLabel.top = positioning.cColorMixerLeftLabel.top;
                positioning.cColorMixerRightLabel.marginTop = positioning.cColorMixerLeftLabel.marginTop;
                positioning.cColorMixerRightLabel.width = positioning.cColorMixerLeftLabel.width;
                positioning.cColorMixerRightLabel.height = positioning.cColorMixerLeftLabel.height;
            }
            //Curly brackets for default tunnel
            {
                positioning.defaultCurlyBrackets.left = positioning.defaultTunnel.left
                    + positioning.defaultTunnel.marginLeft + positioning.defaultTunnel.width;
                positioning.defaultCurlyBrackets.marginLeft = 0.3;
                positioning.defaultCurlyBrackets.top = dtTop;
                positioning.defaultCurlyBrackets.width = 1;
                positioning.defaultCurlyBrackets.height = dtHeight;
            }
            //Curly brackets for customizable tunnel
            {
                positioning.customizableCurlyBrackets.left = positioning.defaultTunnel.left
                    + positioning.defaultTunnel.marginLeft + positioning.defaultTunnel.width;
                positioning.customizableCurlyBrackets.marginLeft = 0.3;
                positioning.customizableCurlyBrackets.top = haTop + haHeight
                    + positioning.customizableTunnel.marginTop;
                positioning.customizableCurlyBrackets.width = 1;
                positioning.customizableCurlyBrackets.height = dtHeight;
            }
            //Curly brackets Label for default tunnel
            {
                positioning.defaultCurlyBracketsLabel.left = positioning.defaultCurlyBrackets.left
                    + positioning.defaultCurlyBrackets.width
                    + positioning.defaultCurlyBrackets.marginLeft;
                positioning.defaultCurlyBracketsLabel.marginLeft = 0.3;
                positioning.defaultCurlyBracketsLabel.top = positioning.defaultCurlyBrackets.top
                    + positioning.defaultCurlyBrackets.height / 2 - smallLabelHeight / 2;
                positioning.defaultCurlyBracketsLabel.width = 100 - positioning.defaultCurlyBracketsLabel.left;
                positioning.defaultCurlyBracketsLabel.height = smallLabelHeight;
            }
            //Curly brackets Label for customizable tunnel
            {
                positioning.customizableCurlyBracketsLabel.left = positioning.customizableCurlyBrackets.left
                    + positioning.customizableCurlyBrackets.width
                    + positioning.customizableCurlyBrackets.marginLeft;
                positioning.customizableCurlyBracketsLabel.marginLeft = 0.3;
                positioning.customizableCurlyBracketsLabel.top = positioning.customizableCurlyBrackets.top
                    + positioning.customizableCurlyBrackets.height / 2 - smallLabelHeight / 2;
                positioning.customizableCurlyBracketsLabel.width = 100 - positioning.customizableCurlyBracketsLabel.left;
                positioning.customizableCurlyBracketsLabel.height = smallLabelHeight;
            }
            let ahLineHeight = 4;
            let ahLineVerticalMargin = 1.5;
            let ahLineWidth = dtWidth / 2;
            //Arrowhead line for default tunnel
            {
                positioning.defaultArrowheadLine.left = positioning.defaultTunnel.left
                    + positioning.defaultTunnel.marginLeft + dtWidth / 4 //2
                    - (ahLineWidth) / 2;
                positioning.defaultArrowheadLine.top = dtTop - ahLineHeight - ahLineVerticalMargin;
                positioning.defaultArrowheadLine.width = ahLineWidth;
                positioning.defaultArrowheadLine.height = ahLineHeight;
            }
            //Arrowhead line for customizable tunnel
            {
                positioning.customizableArrowheadLine.left = positioning.defaultArrowheadLine.left;
                positioning.customizableArrowheadLine.marginTop = ahLineVerticalMargin;
                positioning.customizableArrowheadLine.top = positioning.customizableTunnel.top
                    + positioning.customizableTunnel.marginTop
                    + positioning.customizableTunnel.height;
                positioning.customizableArrowheadLine.width = ahLineWidth;
                positioning.customizableArrowheadLine.height = ahLineHeight;
            }
            let ahLineLabelWidth = ahLineWidth / 4;
            //Arrowhead line Label for default tunnel
            {
                positioning.defaultArrowheadLineLabel.left = positioning.customizableArrowheadLine.left
                    + ahLineWidth / 2 - ahLineLabelWidth / 2;
                positioning.defaultArrowheadLineLabel.top = positioning.defaultArrowheadLine.top;
                positioning.defaultArrowheadLineLabel.width = ahLineLabelWidth;
                positioning.defaultArrowheadLineLabel.height = ahLineHeight;
            }
            //Arrowhead line Label for customizable tunnel
            {
                positioning.customizableArrowheadLineLabel.left = positioning.customizableArrowheadLine.left
                    + ahLineWidth / 2 - ahLineLabelWidth / 2;
                positioning.customizableArrowheadLineLabel.top = positioning.customizableArrowheadLine.top
                    + positioning.customizableArrowheadLine.marginTop;
                positioning.customizableArrowheadLineLabel.width = ahLineLabelWidth;
                positioning.customizableArrowheadLineLabel.height = ahLineHeight;
            }
            let cmLabelWidth = positioning.defaultColorMixerHorizontal.width / 2.5;
            let cmLabelHeight = positioning.defaultColorMixerHorizontal.height;
            //Color mixer Label for default tunnel
            {
                positioning.defaultColorMixerLabel.left = positioning.defaultColorMixerHorizontal.left
                    + positioning.defaultColorMixerHorizontal.width / 2 - cmLabelWidth / 2;
                positioning.defaultColorMixerLabel.top = positioning.dColorMixerLeftLabel.top;
                positioning.defaultColorMixerLabel.width = cmLabelWidth;
                positioning.defaultColorMixerLabel.height = cmLabelHeight;
            }
            //Color mixer Label for customizable tunnel
            {
                positioning.customizableColorMixerLabel.left = positioning.defaultColorMixerHorizontal.left
                    + positioning.defaultColorMixerHorizontal.width / 2 - cmLabelWidth / 2;
                positioning.customizableColorMixerLabel.marginTop = 0.5;
                positioning.customizableColorMixerLabel.top = positioning.cColorMixerLeftLabel.top
                    + positioning.cColorMixerLeftLabel.marginTop;
                positioning.customizableColorMixerLabel.width = cmLabelWidth;
                positioning.customizableColorMixerLabel.height = cmLabelHeight;
            }
            if (colorMixerTooThin) {
                let emptySpaceX = positioning.defaultColorMixerHorizontal.left - positioning.defaultTunnel.left - 2;
                let fallDownLeft = positioning.defaultTunnel.left;
                let distanceLabelComponents = [
                    positioning.defaultArrowheadLine,
                    positioning.customizableArrowheadLine
                ];
                for (let component of distanceLabelComponents) {
                    component.width = emptySpaceX;
                    component.left = positioning.defaultTunnel.left + emptySpaceX / 2 - component.width / 2;
                    if (component.left < fallDownLeft) {
                        component.left = fallDownLeft;
                    }
                }
                let labelX = (positioning.defaultArrowheadLine.left === void 0) ? 0 : positioning.defaultArrowheadLine.left;
                let labelWidth = (positioning.defaultArrowheadLine.width === void 0) ? 0 : positioning.defaultArrowheadLine.width;
                let distanceLabelTextComponents = [
                    positioning.defaultArrowheadLineLabel,
                    positioning.customizableArrowheadLineLabel
                ];
                for (let component of distanceLabelTextComponents) {
                    let cWidth = (component.width === void 0) ? 0 : component.width;
                    component.left = labelX + labelWidth / 2 - cWidth / 2;
                }
            }
            return positioning;
        }
        prepareLayersForVizualization() {
            let defaultTunnelLayers = [];
            let customizableTunnelLayers = [];
            for (var i = 0; i < this.data.length; i++) {
                let defaultTunnelLayer = {
                    id: i,
                    start: this.data[i].StartDistance,
                    end: this.data[i].EndDistance,
                    value: Number(this.data[i].Properties[this.coloringPropertyKey]).valueOf(),
                    radius: this.data[i][this.radiusPropertyKey]
                };
                let customizableTunnelLayer = {
                    id: i,
                    start: this.data[i].StartDistance,
                    end: this.data[i].EndDistance,
                    value: Number(this.data[i].Properties[this.customColoringPropertyKey]).valueOf(),
                    radius: this.data[i][this.customRadiusPropertyKey]
                };
                defaultTunnelLayers.push(defaultTunnelLayer);
                customizableTunnelLayers.push(customizableTunnelLayer);
            }
            return {
                defaultTunnelLayers,
                customizableTunnelLayers
            };
        }
        getMaxY(realMaxYValue) {
            let maxY = Math.ceil(realMaxYValue);
            let chunkSize = maxY / this.verticalAxisChunkCount;
            if (maxY - realMaxYValue < chunkSize / 2) {
                maxY += Math.ceil(chunkSize / 2);
            }
            return maxY;
        }
        prepareTunnelObject(minVal, maxVal, center, context, tunnelLayers, isDefaultTunnel) {
            let coloringProperty = ((isDefaultTunnel) ? this.coloringPropertyKey : this.customColoringPropertyKey);
            let colorFunctionSettings = {
                minVal: minVal,
                maxVal: maxVal,
                minColor: this.minColor[coloringProperty],
                maxColor: this.maxColor[coloringProperty],
                minColorMiddle: this.minColorMiddle[coloringProperty],
                maxColorMiddle: this.maxColorMiddle[coloringProperty],
                skipMiddle: (coloringProperty == "NumPositives" || coloringProperty == "NumNegatives")
                    ? true
                    : this.skipMiddle,
                centerPosition: center,
                centerAbsolute: (coloringProperty == "NumPositives" || coloringProperty == "NumNegatives")
                    ? false
                    : !this.useColorMinMax
            };
            let maxY = this.getMaxY((isDefaultTunnel) ? this.maxY : this.customMaxY);
            return {
                tunnel: new LayersVizualizer.Tunnel({
                    x: 0,
                    y: 0
                }, {
                    x: this.maxX,
                    y: maxY
                }, tunnelLayers, context, this.getColor, colorFunctionSettings, !isDefaultTunnel),
                colorFunctionSettings
            };
        }
        renderObjects(renderable) {
            for (let obj of renderable) {
                obj.drawable.drawFromBounds(obj.bounds);
            }
        }
        vizualize(renderHitboxes = true) {
            this.resizeCanvas();
            let canvasWidth = this.getCanvas().width;
            let canvasHeight = this.getCanvas().height;
            let context = this.getContext();
            //console.log(canvasWidth);
            //console.log(canvasHeight);
            let toRender = [];
            //Data was not prepared yet
            if (this.dataDirty) {
                this.prepareData();
            }
            //Prepare layers data
            let layers = this.prepareLayersForVizualization();
            let maxDistance = layers.defaultTunnelLayers[layers.defaultTunnelLayers.length - 1].end;
            maxDistance = CommonUtils.Numbers.roundToDecimal(maxDistance, 1); // round to 1 decimal
            let positioning = this.getComponentsPositioning();
            //Prepare default tunnel object
            let dTminVal = (this.useColorMinMax) ? this.minColoringValue.get(this.coloringPropertyKey) : this.absColorValueMin.get(this.coloringPropertyKey);
            if (dTminVal == void 0) {
                throw Error("Minimal value for property '" + this.coloringPropertyKey + "' was not found!");
            }
            let dTmaxVal = (this.useColorMinMax) ? this.maxColoringValue.get(this.coloringPropertyKey) : this.absColorValueMax.get(this.coloringPropertyKey);
            if (dTmaxVal == void 0) {
                throw Error("Maximal value for property '" + this.coloringPropertyKey + "' was not found!");
            }
            let dTcenter = this.absCenterPositions.get(this.coloringPropertyKey);
            if (dTcenter === void 0) {
                dTcenter = 0;
            }
            let defaultTunnelData = this.prepareTunnelObject(dTminVal, dTmaxVal, dTcenter, context, layers.defaultTunnelLayers, true);
            let defaultTunnelBounds = positioning.defaultTunnel.toBounds(canvasWidth, canvasHeight);
            toRender.push({
                drawable: defaultTunnelData.tunnel,
                bounds: defaultTunnelBounds
            });
            //Prepare customizable tunnel object
            let cTminVal = (this.useColorMinMax) ? this.minColoringValue.get(this.customColoringPropertyKey) : this.absColorValueMin.get(this.customColoringPropertyKey);
            if (cTminVal == void 0) {
                throw Error("Minimal value for property '" + this.customColoringPropertyKey + "' was not found!");
            }
            let cTmaxVal = (this.useColorMinMax) ? this.maxColoringValue.get(this.customColoringPropertyKey) : this.absColorValueMax.get(this.customColoringPropertyKey);
            if (cTmaxVal == void 0) {
                throw Error("Maximal value for property '" + this.customColoringPropertyKey + "' was not found!");
            }
            let cTcenter = this.absCenterPositions.get(this.customColoringPropertyKey);
            if (cTcenter === void 0) {
                cTcenter = 0;
            }
            let customizableTunnelData = this.prepareTunnelObject(cTminVal, cTmaxVal, cTcenter, context, layers.customizableTunnelLayers, false);
            let customizableTunnelBounds = positioning.customizableTunnel.toBounds(canvasWidth, canvasHeight);
            toRender.push({
                drawable: customizableTunnelData.tunnel,
                bounds: customizableTunnelBounds
            });
            this.__tunnels.default = {
                tunnel: defaultTunnelData.tunnel,
                bounds: defaultTunnelBounds
            };
            this.__tunnels.customizable = {
                tunnel: customizableTunnelData.tunnel,
                bounds: customizableTunnelBounds
            };
            //console.log(this.__tunnels);
            //Prepare color mixer objects
            //Color mixer for default tunnel
            /* //Vertical
            toRender.push({
                drawable: new ColorMixer(dTminVal,dTmaxVal,context,this.getColor,defaultTunnelData.colorFunctionSettings),
                bounds: positioning.defaultColorMixer.toBounds(canvasWidth,canvasHeight)
            });
            */
            //Horizontal
            toRender.push({
                drawable: new LayersVizualizer.ColorMixer(dTminVal, dTmaxVal, context, this.getColor, defaultTunnelData.colorFunctionSettings, true),
                bounds: positioning.defaultColorMixerHorizontal.toBounds(canvasWidth, canvasHeight)
            });
            //Color mixer for customizable tunnel
            /* //Vertical
            toRender.push({
                drawable: new ColorMixer(cTminVal,cTmaxVal,context,this.getColor,customizableTunnelData.colorFunctionSettings),
                bounds: positioning.customizableColorMixer.toBounds(canvasWidth,canvasHeight)
            });
            */
            //Horizontal
            toRender.push({
                drawable: new LayersVizualizer.ColorMixer(cTminVal, cTmaxVal, context, this.getColor, customizableTunnelData.colorFunctionSettings, true),
                bounds: positioning.customizableColorMixerHorizontal.toBounds(canvasWidth, canvasHeight)
            });
            //Prepare horizontal axis
            toRender.push({
                drawable: new LayersVizualizer.Axis(0, this.maxX, context, 10, true, 20, 1.6),
                bounds: positioning.horizontalAxis.toBounds(canvasWidth, canvasHeight)
            });
            //Prepare vertical axis
            toRender.push({
                drawable: new LayersVizualizer.Axis(0, this.getMaxY(this.maxY), context, this.verticalAxisChunkCount, false, 30, 1.6),
                bounds: positioning.verticalAxis_1.toBounds(canvasWidth, canvasHeight)
            });
            toRender.push({
                drawable: new LayersVizualizer.Axis(0, this.getMaxY(this.customMaxY), context, this.verticalAxisChunkCount, false, 30, 1.6),
                bounds: positioning.verticalAxis_2.toBounds(canvasWidth, canvasHeight)
            });
            //Prepare labels
            // Label on left side of horizontal axis
            toRender.push({
                drawable: new LayersVizualizer.TextBox("0 Å", context, "big", "right"),
                bounds: positioning.axisLeftZeroLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Label on right side of horizontal axis
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${maxDistance} Å`, context, "big", "left"),
                bounds: positioning.horizontalAxisRightLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Label on top left side of vertical axis for default tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${this.getMaxY(this.maxY)} Å`, context, "medium", "right"),
                bounds: positioning.vAxis1TopLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Label on bottom left side of vertical axis for customizable tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${this.getMaxY(this.customMaxY)} Å`, context, "medium", "right"),
                bounds: positioning.vAxis2BottomLabel.toBounds(canvasWidth, canvasHeight)
            });
            /*
            // Label on top right side of color mixer for default tunnel
            toRender.push({
                drawable: new TextBox(`${dTmaxVal}`,context,"medium","left"),
                bounds: positioning.dColorMixerTopLabel.toBounds(canvasWidth,canvasHeight)
            });
            // Label on bottom right side of color mixer for default tunnel
            toRender.push({
                drawable: new TextBox(`${dTminVal}`,context,"medium","left"),
                bounds: positioning.dColorMixerBottomLabel.toBounds(canvasWidth,canvasHeight)
            });
            */
            // Label on top left side of color mixer for default tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${CommonUtils.Numbers.roundToDecimal(dTminVal, 2)}`, context, "small", "left"),
                bounds: positioning.dColorMixerLeftLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Label on top right side of color mixer for default tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${CommonUtils.Numbers.roundToDecimal(dTmaxVal, 2)}`, context, "small", "right"),
                bounds: positioning.dColorMixerRightLabel.toBounds(canvasWidth, canvasHeight)
            });
            /*
            // Label on top right side of color mixer for customizable tunnel
            toRender.push({
                drawable: new TextBox(`${cTmaxVal}`,context,"medium","left"),
                bounds: positioning.cColorMixerTopLabel.toBounds(canvasWidth,canvasHeight)
            });
            // Label on bottom right side of color mixer for customizable tunnel
            toRender.push({
                drawable: new TextBox(`${cTminVal}`,context,"medium","left"),
                bounds: positioning.cColorMixerBottomLabel.toBounds(canvasWidth,canvasHeight)
            });
            */
            // Label on bottom left side of color mixer for customizable tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${CommonUtils.Numbers.roundToDecimal(cTminVal, 2)}`, context, "small", "left"),
                bounds: positioning.cColorMixerLeftLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Label on bottom right side of color mixer for customizable tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${CommonUtils.Numbers.roundToDecimal(cTmaxVal, 2)}`, context, "small", "right"),
                bounds: positioning.cColorMixerRightLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Curly brackets for default tunnel
            toRender.push({
                drawable: new LayersVizualizer.CurlyBrackets(context /*,true*/),
                bounds: positioning.defaultCurlyBrackets.toBounds(canvasWidth, canvasHeight)
            });
            // Curly brackets Label for default tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${this.radiusPropertyKey}`, context, "small", "left"),
                bounds: positioning.defaultCurlyBracketsLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Curly brackets for customizable tunnel
            toRender.push({
                drawable: new LayersVizualizer.CurlyBrackets(context /*,true*/),
                bounds: positioning.customizableCurlyBrackets.toBounds(canvasWidth, canvasHeight)
            });
            // Curly brackets Label for customizable tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${this.customRadiusPropertyKey}`, context, "small", "left"),
                bounds: positioning.customizableCurlyBracketsLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Arrowhead line for default tunnel
            toRender.push({
                drawable: new LayersVizualizer.ArrowHeadLine(context, true),
                bounds: positioning.defaultArrowheadLine.toBounds(canvasWidth, canvasHeight)
            });
            // Arrowhead line Label for default tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`Distance`, context, "small", "center"),
                bounds: positioning.defaultArrowheadLineLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Arrowhead line for customizable tunnel
            toRender.push({
                drawable: new LayersVizualizer.ArrowHeadLine(context, true),
                bounds: positioning.customizableArrowheadLine.toBounds(canvasWidth, canvasHeight)
            });
            // Arrowhead line Label for customizable tunnel
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`Distance`, context, "small", "center"),
                bounds: positioning.customizableArrowheadLineLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Default color mixer Label
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${this.coloringPropertyKey}`, context, "small", "center"),
                bounds: positioning.defaultColorMixerLabel.toBounds(canvasWidth, canvasHeight)
            });
            // Customizable color mixer Label
            toRender.push({
                drawable: new LayersVizualizer.TextBox(`${this.customColoringPropertyKey}`, context, "small", "center"),
                bounds: positioning.customizableColorMixerLabel.toBounds(canvasWidth, canvasHeight)
            });
            this.renderObjects(toRender);
            if (this.selectedLayerIdx !== -1) {
                this.selectLayer(this.selectedLayerIdx);
            }
            this.setCurrentColorFunctionSettings("default", defaultTunnelData.colorFunctionSettings);
            this.setCurrentColorFunctionSettings("customizable", customizableTunnelData.colorFunctionSettings);
        }
        switchToMainCanvas() {
            let tmpCanvas = document.getElementById(this.tmpCanvasId);
            if (tmpCanvas !== null) {
                tmpCanvas.remove();
            }
            this.rebindDOMRefs();
            this.vizualize();
            this.highlightHitbox(this.currentLayerIdx);
        }
        switchToTmpCanvas() {
            let canvas = this.getCanvas();
            if (canvas.id === this.tmpCanvasId) {
                throw new Error("Trying to switch to tmp canvas from tmp canvas! Maybe forgotten SwitchToMain(..)?");
            }
            let tmpCanvas = document.createElement("canvas");
            tmpCanvas.style.position = "absolute";
            tmpCanvas.style.top = "-1000px";
            tmpCanvas.id = this.tmpCanvasId;
            let targetWidth = 1920;
            tmpCanvas.width = targetWidth;
            tmpCanvas.height = (targetWidth / canvas.width) * canvas.height;
            document.body.appendChild(tmpCanvas);
            let oldCtx = this.getContext();
            let tmpCtx = tmpCanvas.getContext("2d");
            if (tmpCtx === null) {
                throw new Error("Unable initiate new 2D canvas context");
            }
            this.__context = tmpCtx;
            this.__canvas = tmpCanvas;
        }
        wrapSVG() {
            var canvas = this.getCanvas();
            var ctx = new C2S(canvas.width, canvas.height);
            if (ctx === null) {
                throw new Error("Unable to initialize new drawing context!");
            }
            this.__context = ctx;
        }
        unwrapSVG() {
            let ctx = this.getCanvas().getContext("2d");
            if (ctx === null) {
                throw new Error("Unable to initialize new drawing context!");
            }
            this.__context = ctx;
        }
        exportImage() {
            if (!this.isDOMBound || this.isDataDirty()) {
                throw new Error("Data not prepared!");
            }
            //Deselekce vrstvy
            let selectedLayer = -1;
            if (this.selectedLayerIdx !== -1) {
                selectedLayer = this.selectedLayerIdx;
                this.deselectLayer();
            }
            this.switchToTmpCanvas();
            this.vizualize();
            let dataURL = this.getCanvas().toDataURL("image/png");
            this.switchToMainCanvas();
            //Opetovne oznaceni vrstvy(stav pred exportem)
            this.selectLayer(selectedLayer);
            return dataURL;
        }
        getSVGDataURL() {
            let svg = this.getSVGData();
            let xmlSerializer = new XMLSerializer();
            let serializedSVG = `<?xml version="1.0" encoding="utf-8"?>${xmlSerializer.serializeToString(svg)}`;
            serializedSVG = utf8.encode(serializedSVG);
            return `data:image/svg+xml;charset=utf-8;base64,${btoa(serializedSVG)}`;
        }
        getSVGData() {
            const ctx = this.getContext();
            ctx.getSerializedSvg();
            let svg = ctx.getSvg();
            //svg.characterSet="UTF-8";
            return svg;
        }
        exportSVGImage() {
            if (!this.isDOMBound || this.isDataDirty()) {
                throw new Error("Data not prepared!");
            }
            //Deselekce vrstvy
            let selectedLayer = -1;
            if (this.selectedLayerIdx !== -1) {
                selectedLayer = this.selectedLayerIdx;
                this.deselectLayer();
            }
            this.switchToTmpCanvas();
            this.wrapSVG();
            this.vizualize();
            let svg = this.getSVGDataURL();
            this.unwrapSVG();
            this.switchToMainCanvas();
            //Opetovne oznaceni vrstvy(stav pred exportem)
            this.selectLayer(selectedLayer);
            return svg;
        }
        exportPDF() {
            if (!this.isDOMBound || this.isDataDirty()) {
                throw new Error("Data not prepared!");
            }
            //Deselekce vrstvy
            let selectedLayer = -1;
            if (this.selectedLayerIdx !== -1) {
                selectedLayer = this.selectedLayerIdx;
                this.deselectLayer();
            }
            this.switchToTmpCanvas();
            this.wrapSVG();
            let canvas = this.getCanvas();
            if (canvas === void 0 || canvas === null) {
                throw new Error("Canvas element not initiated");
            }
            let width = canvas.width;
            let height = canvas.height;
            this.vizualize();
            let svg = this.getSVGData();
            this.unwrapSVG();
            this.switchToMainCanvas();
            // create a new jsPDF instance
            var pdf = new jsPDF('p', 'pt', [width, height]);
            pdf.setProperties({
                title: "Report"
            });
            //console.log(svg);
            //pdf.addImage(this.exportSVGImage(),0,0,200,500);
            //pdf.addSVG(svg,0,0,width,height);
            // render the svg element
            svg2pdf(svg, pdf, {
                xOffset: 0,
                yOffset: 0,
                scale: 1
            });
            //pdf.addSVG(svg, 0, 0, width, height);
            //Opetovne oznaceni vrstvy(stav pred exportem)
            this.selectLayer(selectedLayer);
            return pdf.output('datauristring');
        }
        setCustomColoringPropertyKey(coloringPropertyKey) {
            this.customColoringPropertyKey = coloringPropertyKey;
        }
        getCustomColoringPropertyKey() {
            return this.customColoringPropertyKey;
        }
        setColoringPropertyKey(coloringPropertyKey) {
            this.coloringPropertyKey = coloringPropertyKey;
        }
        getColoringPropertyKey() {
            return this.coloringPropertyKey;
        }
        setCustomRadiusPropertyKey(radiusPropertyKey) {
            if (this.customRadiusPropertyKey !== radiusPropertyKey) {
                this.customRadiusPropertyKey = radiusPropertyKey;
                this.dataDirty = true;
            }
        }
        getCustomRadiusPropertyKey() {
            return this.customRadiusPropertyKey;
        }
        setRadiusPropertyKey(radiusPropertyKey) {
            if (this.radiusPropertyKey !== radiusPropertyKey) {
                this.radiusPropertyKey = radiusPropertyKey;
                this.dataDirty = true;
            }
        }
        getRadiusPropertyKey() {
            return this.radiusPropertyKey;
        }
        getHitboxes() {
            let tunnels = this.getTunnels();
            if (tunnels === null) {
                return null;
            }
            return {
                defaultTunnel: (tunnels.default !== null)
                    ? tunnels.default.tunnel.getHitboxes()
                    : null,
                customizable: (tunnels.customizable !== null)
                    ? tunnels.customizable.tunnel.getHitboxes()
                    : null,
            };
        }
        renderHitboxes() {
            //Data was not prepared yet
            if (this.dataDirty) {
                this.prepareData();
            }
            let tunnels = this.getTunnels();
            if (tunnels === null) {
                return [];
            }
            if (tunnels.default !== null) {
                tunnels.default.tunnel.renderHitboxes();
            }
            if (tunnels.customizable !== null) {
                tunnels.customizable.tunnel.renderHitboxes();
            }
        }
        highlightHitbox(layerIdx) {
            if (layerIdx < 0) {
                return;
            }
            this.currentLayerIdx = layerIdx;
            let tunnels = this.getTunnels();
            if (tunnels === null) {
                return;
            }
            if (tunnels.default !== null) {
                tunnels.default.tunnel.highlightHitbox(layerIdx);
            }
            if (tunnels.customizable !== null) {
                tunnels.customizable.tunnel.highlightHitbox(layerIdx);
            }
        }
        /** Helpers **/
        getColor(value, settings) {
            let minVal = settings.minVal;
            let maxVal = settings.maxVal;
            let minColor = settings.minColor;
            let maxColor = settings.maxColor;
            let minColorMiddle = settings.minColorMiddle;
            let maxColorMiddle = settings.maxColorMiddle;
            let skipMiddle = settings.skipMiddle;
            let middle = (settings.centerAbsolute) ? settings.centerPosition : (minVal + maxVal) / 2;
            var rgb;
            if (value < (minVal + maxVal) / 2) {
                rgb = ChannelDbPlugin.Palette.interpolate(minVal, minColor, middle, maxColorMiddle, value);
            }
            else {
                rgb = ChannelDbPlugin.Palette.interpolate(middle, minColorMiddle, maxVal, maxColor, value);
            }
            if (skipMiddle && settings.centerAbsolute) {
                throw new Error("Cannot config absolute center and skip center at once! Forbidden configuration -> skipMiddle=true && centerAbsolute=true");
            }
            if (skipMiddle && !settings.centerAbsolute) {
                rgb = ChannelDbPlugin.Palette.interpolate(minVal, minColor, maxVal, maxColor, value);
            }
            if (minVal === maxVal) {
                rgb = ChannelDbPlugin.Palette.interpolate(0, minColor, 1, maxColorMiddle, 0.5);
            }
            return "rgb(" + String(Math.floor(rgb.r)) + "," + String(Math.floor(rgb.g)) + "," + String(Math.floor(rgb.b)) + ")";
        }
    }
    LayersVizualizer.Vizualizer = Vizualizer;
    ;
})(LayersVizualizer || (LayersVizualizer = {}));
var LayersVizualizer;
(function (LayersVizualizer) {
    var Component;
    (function (Component) {
        class Positionable {
            toBounds(width, height) {
                let xUnit = width / 100;
                let yUnit = height / 100;
                let x = 0;
                let y = 0;
                let w = 100;
                let h = 100;
                let ml = 0;
                let mr = 0;
                let mt = 0;
                let mb = 0;
                if (this.right === void 0 && this.left === void 0) {
                    this.left = 0;
                }
                if (this.bottom === void 0 && this.top === void 0) {
                    this.top = 0;
                }
                if (this.marginLeft !== void 0) {
                    ml = this.marginLeft;
                }
                if (this.marginRight !== void 0) {
                    mr = this.marginRight;
                }
                if (this.marginTop !== void 0) {
                    mt = this.marginTop;
                }
                if (this.marginBottom !== void 0) {
                    mb = this.marginBottom;
                }
                if (this.width !== void 0) {
                    w = this.width;
                    if (this.left !== void 0) {
                        x = this.left + ml;
                    }
                    else if (this.right !== void 0) {
                        x = 100 - (this.right + mr + w);
                    }
                }
                else {
                    if (this.left !== void 0) {
                        x = this.left + ml;
                        w -= x;
                    }
                    else if (this.right !== void 0) {
                        x = 0;
                        w -= this.right + mr;
                    }
                }
                if (this.height !== void 0) {
                    h = this.height;
                    if (this.top !== void 0) {
                        y = this.top + mt;
                    }
                    else if (this.bottom !== void 0) {
                        y = 100 - (this.bottom + mb + h);
                    }
                }
                else {
                    if (this.top !== void 0) {
                        y = this.top + mt;
                        h -= y;
                    }
                    else if (this.bottom !== void 0) {
                        y = 0;
                        h -= this.bottom + mb;
                    }
                }
                return {
                    x: x * xUnit,
                    y: y * yUnit,
                    width: w * xUnit,
                    height: h * yUnit
                };
            }
        }
        Component.Positionable = Positionable;
        ;
        class Paintable extends Positionable {
        }
        Component.Paintable = Paintable;
        ;
        class Axis extends Positionable {
        }
        Component.Axis = Axis;
        ;
    })(Component = LayersVizualizer.Component || (LayersVizualizer.Component = {}));
})(LayersVizualizer || (LayersVizualizer = {}));
var LayersVizualizer;
(function (LayersVizualizer) {
    var Colors;
    (function (Colors) {
        function invertHexContrastGrayscale(hex) {
            return rgbToHex(invertRGBContrastGrayscale(hexToRGB(hex)));
        }
        Colors.invertHexContrastGrayscale = invertHexContrastGrayscale;
        function invertRGBContrastGrayscale(rgb) {
            let c = (rgb.r + rgb.g + rgb.b) / 3;
            let v = c > 0.5 * 255 ? c - 255 / 2 : c + 255 / 2;
            return { r: v, g: v, b: v };
        }
        Colors.invertRGBContrastGrayscale = invertRGBContrastGrayscale;
        function invertRGBColor(rgb) {
            return hexToRGB(invertHexColor(rgbToHex(rgb)));
        }
        Colors.invertRGBColor = invertRGBColor;
        function invertHexColor(hexTripletColor) {
            hexTripletColor = hexTripletColor.substring(1); // remove #
            let color = parseInt(hexTripletColor, 16); // convert to integer
            color = 0xFFFFFF ^ color; // invert three bytes
            let strColor = color.toString(16); // convert to hex
            strColor = ("000000" + strColor).slice(-6); // pad with leading zeros
            strColor = "#" + strColor; // prepend #
            return strColor;
        }
        Colors.invertHexColor = invertHexColor;
        function rgbComplement(rgb) {
            let temprgb = rgb;
            let temphsv = RGB2HSV(temprgb);
            temphsv.hue = HueShift(temphsv.hue, 180.0);
            temprgb = HSV2RGB(temphsv);
            return temprgb;
        }
        Colors.rgbComplement = rgbComplement;
        function hexToRGB(hex) {
            if (hex[0] !== "#") {
                throw new Error("Hex color has bad format!");
            }
            let rgbPart = hex.split("#")[1];
            if (rgbPart.length !== 6) {
                throw new Error("Hex color has bad format!");
            }
            let rHex = rgbPart.slice(0, 2);
            let gHex = rgbPart.slice(2, 4);
            let bHex = rgbPart.slice(4, 6);
            return {
                r: parseInt(rHex, 16),
                g: parseInt(gHex, 16),
                b: parseInt(bHex, 16)
            };
        }
        Colors.hexToRGB = hexToRGB;
        function Uint8ClampedArrayToRGB(rgbArr) {
            return {
                r: rgbArr[0],
                g: rgbArr[1],
                b: rgbArr[2]
            };
        }
        Colors.Uint8ClampedArrayToRGB = Uint8ClampedArrayToRGB;
        function parseRGBString(rgbString) {
            let rgbParts = [];
            for (let part of ((rgbString.split('(')[1]).split(")")[0]).split(",")) {
                rgbParts.push(parseInt(part.replace(" ", "")));
            }
            return {
                r: rgbParts[0],
                g: rgbParts[1],
                b: rgbParts[2]
            };
        }
        Colors.parseRGBString = parseRGBString;
        function rgbToHex(rgb) {
            let rHex = Math.ceil(rgb.r).toString(16);
            let gHex = Math.ceil(rgb.g).toString(16);
            let bHex = Math.ceil(rgb.b).toString(16);
            return `#${((rHex.length == 1) ? "0" : "") + rHex}${((gHex.length == 1) ? "0" : "") + gHex}${((bHex.length == 1) ? "0" : "") + bHex}`;
        }
        Colors.rgbToHex = rgbToHex;
        function hexComplement(hex) {
            return rgbToHex(rgbComplement(hexToRGB(hex)));
        }
        Colors.hexComplement = hexComplement;
        ;
        function RGB2HSV(rgb) {
            let hsv = new Object();
            let max = max3(rgb.r, rgb.g, rgb.b);
            let dif = max - min3(rgb.r, rgb.g, rgb.b);
            hsv.saturation = (max == 0.0) ? 0 : (100 * dif / max);
            if (hsv.saturation == 0)
                hsv.hue = 0;
            else if (rgb.r == max)
                hsv.hue = 60.0 * (rgb.g - rgb.b) / dif;
            else if (rgb.g == max)
                hsv.hue = 120.0 + 60.0 * (rgb.b - rgb.r) / dif;
            else if (rgb.b == max)
                hsv.hue = 240.0 + 60.0 * (rgb.r - rgb.g) / dif;
            if (hsv.hue < 0.0)
                hsv.hue += 360.0;
            hsv.value = Math.round(max * 100 / 255);
            hsv.hue = Math.round(hsv.hue);
            hsv.saturation = Math.round(hsv.saturation);
            return hsv;
        }
        // RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
        // which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
        function HSV2RGB(hsv) {
            var rgb = new Object();
            if (hsv.saturation == 0) {
                rgb.r = rgb.g = rgb.b = Math.round(hsv.value * 2.55);
            }
            else {
                hsv.hue /= 60;
                hsv.saturation /= 100;
                hsv.value /= 100;
                let i = Math.floor(hsv.hue);
                let f = hsv.hue - i;
                let p = hsv.value * (1 - hsv.saturation);
                let q = hsv.value * (1 - hsv.saturation * f);
                let t = hsv.value * (1 - hsv.saturation * (1 - f));
                switch (i) {
                    case 0:
                        rgb.r = hsv.value;
                        rgb.g = t;
                        rgb.b = p;
                        break;
                    case 1:
                        rgb.r = q;
                        rgb.g = hsv.value;
                        rgb.b = p;
                        break;
                    case 2:
                        rgb.r = p;
                        rgb.g = hsv.value;
                        rgb.b = t;
                        break;
                    case 3:
                        rgb.r = p;
                        rgb.g = q;
                        rgb.b = hsv.value;
                        break;
                    case 4:
                        rgb.r = t;
                        rgb.g = p;
                        rgb.b = hsv.value;
                        break;
                    default:
                        rgb.r = hsv.value;
                        rgb.g = p;
                        rgb.b = q;
                }
                rgb.r = Math.round(rgb.r * 255);
                rgb.g = Math.round(rgb.g * 255);
                rgb.b = Math.round(rgb.b * 255);
            }
            return rgb;
        }
        //Adding HueShift via Jacob (see comments)
        function HueShift(h, s) {
            h += s;
            while (h >= 360.0)
                h -= 360.0;
            while (h < 0.0)
                h += 360.0;
            return h;
        }
        //min max via Hairgami_Master (see comments)
        function min3(a, b, c) {
            return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
        }
        function max3(a, b, c) {
            return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
        }
    })(Colors = LayersVizualizer.Colors || (LayersVizualizer.Colors = {}));
})(LayersVizualizer || (LayersVizualizer = {}));
var Datagrid;
(function (Datagrid) {
    var Components;
    (function (Components) {
        var React = LiteMol.Plugin.React;
        class DGRowEmpty extends React.Component {
            render() {
                return (React.createElement("tr", null,
                    React.createElement("td", { colSpan: this.props.columnsCount })));
            }
        }
        Components.DGRowEmpty = DGRowEmpty;
        function getTitle(title, columnCount) {
            let tit = [];
            let sIdx = 0;
            if (title !== void 0) {
                tit = title;
                sIdx = title.length - 1;
            }
            for (; sIdx < columnCount; sIdx++) {
                tit.push("");
            }
            return tit;
        }
        class DGRow extends React.Component {
            addTd(tds, i, columns, columnsCount, forceHtml) {
                let html = { __html: columns[i] };
                let tdClass = "";
                if (this.props.tdClass !== void 0) {
                    tdClass = this.props.tdClass;
                }
                let title = getTitle(this.props.title, columnsCount);
                if (forceHtml) {
                    tds.push(React.createElement("td", { title: title[i], className: `col col-${i + 1} ${tdClass}`, dangerouslySetInnerHTML: html }));
                }
                else {
                    tds.push(React.createElement("td", { title: title[i], className: `col col-${i + 1}` }, columns[i]));
                }
            }
            addTdWithColspan(tds, i, columns, columnsCount, forceHtml) {
                let html = { __html: columns[i] };
                let tdClass = "";
                if (this.props.tdClass !== void 0) {
                    tdClass = this.props.tdClass;
                }
                let title = getTitle(this.props.title, columnsCount);
                if (forceHtml) {
                    tds.push(React.createElement("td", { title: title[i], className: `col col-${i + 1} ${tdClass}`, colSpan: columnsCount - columns.length, dangerouslySetInnerHTML: html }));
                }
                else {
                    tds.push(React.createElement("td", { title: title[i], className: `col col-${i + 1} ${tdClass}`, colSpan: columnsCount - columns.length }, columns[i]));
                }
            }
            generateRow(columns) {
                let columnsCount = columns.length;
                if (this.props.columnsCount !== void 0) {
                    columnsCount = this.props.columnsCount;
                }
                let forceHTML = false;
                if (this.props.forceHtml !== void 0) {
                    forceHTML = this.props.forceHtml;
                }
                let tds = [];
                for (let i = 0; i < columns.length; i++) {
                    if (i === columns.length - 1 && columns.length !== columnsCount) {
                        this.addTdWithColspan(tds, i, columns, columnsCount, forceHTML);
                        break;
                    }
                    this.addTd(tds, i, columns, columnsCount, forceHTML);
                }
                return tds;
            }
            render() {
                let trClass = "";
                if (this.props.trClass !== void 0) {
                    trClass = this.props.trClass;
                }
                return (React.createElement("tr", { className: trClass }, this.generateRow(this.props.columns)));
            }
        }
        Components.DGRow = DGRow;
        class DGElementRow extends React.Component {
            generateRow(columns) {
                let tdClass = "";
                if (this.props.tdClass !== void 0) {
                    tdClass = this.props.tdClass;
                }
                let columnsCount = columns.length;
                if (this.props.columnsCount !== void 0) {
                    columnsCount = this.props.columnsCount;
                }
                let title = getTitle(this.props.title, columnsCount);
                let tds = [];
                for (let i = 0; i < columns.length; i++) {
                    if (i === columns.length - 1 && columns.length !== columnsCount) {
                        tds.push(React.createElement("td", { title: title[i], className: `col col-${i + 1} ${tdClass}`, colSpan: columnsCount - columns.length }, columns[i]));
                        break;
                    }
                    tds.push(React.createElement("td", { title: title[i], className: `col col-${i + 1} ${tdClass}` }, columns[i]));
                }
                return tds;
            }
            render() {
                let trClass = "";
                if (this.props.trClass !== void 0) {
                    trClass = this.props.trClass;
                }
                return (React.createElement("tr", { className: trClass }, this.generateRow(this.props.columns)));
            }
        }
        Components.DGElementRow = DGElementRow;
        class DGTdWithHtml extends React.Component {
            render() {
                return (React.createElement("td", { className: `col col-${this.props.colIdx}`, dangerouslySetInnerHTML: { __html: this.props.contents } }));
            }
        }
        Components.DGTdWithHtml = DGTdWithHtml;
        class DGNoDataInfoRow extends React.Component {
            render() {
                let infoText = "There are no data to be displayed...";
                if (this.props.infoText !== void 0) {
                    infoText = this.props.infoText;
                }
                return (React.createElement("tr", null,
                    React.createElement("td", { colSpan: this.props.columnsCount }, infoText)));
            }
        }
        Components.DGNoDataInfoRow = DGNoDataInfoRow;
    })(Components = Datagrid.Components || (Datagrid.Components = {}));
})(Datagrid || (Datagrid = {}));
var AglomeredParameters;
(function (AglomeredParameters) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        var LiteMoleEvent = LiteMol.Bootstrap.Event;
        var DGComponents = Datagrid.Components;
        var Tooltips = CommonUtils.Tooltips;
        let DGTABLE_COLS_COUNT = 7;
        ;
        function render(target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                super(...arguments);
                this.interactionEventStream = void 0;
                this.state = {
                    data: null,
                    app: this,
                    isWaitingForData: false
                };
            }
            componentDidMount() {
                LiteMoleEvent.Tree.NodeAdded.getStream(this.props.controller.context).subscribe(e => {
                    if (e.data.tree !== void 0 && e.data.ref === "channelsDB-data") {
                        let toShow = [];
                        let data = e.data.props.data;
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
            dataWaitHandler() {
                let state = this.state;
                state.isWaitingForData = false;
                this.setState(state);
            }
            invokeDataWait() {
                if (this.state.isWaitingForData) {
                    return;
                }
                let state = this.state;
                state.isWaitingForData = true;
                this.setState(state);
                Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
            }
            componentWillUnmount() {
            }
            render() {
                if (this.state.data !== null) {
                    $('.init-agp-tooltip').tooltip({ container: 'body' });
                    return (React.createElement("div", null,
                        React.createElement(DGTable, Object.assign({}, this.state))));
                }
                return React.createElement("div", null);
            }
        }
        UI.App = App;
        class DGTable extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-aglomered-parameters" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement(DGBody, Object.assign({}, this.props)))));
            }
        }
        class DGHead extends React.Component {
            render() {
                return (React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", { title: "Name", className: "col col-1 ATable-header-identifier init-agp-tooltip", "data-toggle": "tooltip", "data-placement": "bottom" }, "Name"),
                        React.createElement("th", { title: Tooltips.getMessageOrLeaveText("tooltip-Length"), className: "col col-2 ATable-header-length init-agp-tooltip", "data-toggle": "tooltip", "data-placement": "bottom" },
                            React.createElement("span", { className: "glyphicon glyphicon-resize-horizontal" }),
                            " ",
                            React.createElement("span", { className: "ATable-label" }, "Length")),
                        React.createElement("th", { title: Tooltips.getMessageOrLeaveText("tooltip-Bottleneck"), className: "col col-3 ATable-header-bottleneck init-agp-tooltip", "data-toggle": "tooltip", "data-placement": "bottom" },
                            React.createElement("span", { className: "icon bottleneck" }),
                            " ",
                            React.createElement("span", { className: "ATable-label" }, "Bottleneck")),
                        React.createElement("th", { title: Tooltips.getMessageOrLeaveText("tooltip-agl-Hydropathy"), className: "col col-4 ATable-header-hydropathy init-agp-tooltip", "data-toggle": "tooltip", "data-placement": "bottom" },
                            React.createElement("span", { className: "glyphicon glyphicon-tint" }),
                            " ",
                            React.createElement("span", { className: "ATable-label" }, "Hydropathy")),
                        React.createElement("th", { title: "Charge", className: "col col-5 ATable-header-charge init-agp-tooltip", "data-toggle": "tooltip", "data-placement": "bottom" },
                            React.createElement("span", { className: "glyphicon glyphicon-flash" }),
                            " ",
                            React.createElement("span", { className: "ATable-label" }, "Charge")),
                        React.createElement("th", { title: Tooltips.getMessageOrLeaveText("tooltip-agl-Polarity"), className: "col col-6 ATable-header-polarity init-agp-tooltip", "data-toggle": "tooltip", "data-placement": "bottom" },
                            React.createElement("span", { className: "glyphicon glyphicon-plus" }),
                            " ",
                            React.createElement("span", { className: "ATable-label" }, "Polarity")),
                        React.createElement("th", { title: Tooltips.getMessageOrLeaveText("tooltip-agl-Mutability"), className: "col col-7 ATable-header-mutability init-agp-tooltip", "data-toggle": "tooltip", "data-placement": "bottom" },
                            React.createElement("span", { className: "glyphicon glyphicon-scissors" }),
                            " ",
                            React.createElement("span", { className: "ATable-label" }, "Mutability")))));
            }
            ;
        }
        class DGBody extends React.Component {
            generateMockData() {
                if (this.props.data === null) {
                    return React.createElement("tr", null,
                        React.createElement("td", { colSpan: DGTABLE_COLS_COUNT }, "There are no data to be displayed..."));
                }
                let rows = [];
                for (let tunnel of this.props.data) {
                    rows.push(React.createElement(DGRow, { tunnel: tunnel, app: this.props.app }));
                }
                if (rows.length === 0) {
                    return rows;
                }
                for (let i = rows.length; i < 100; i++) {
                    rows.push(rows[0]);
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            generateRows() {
                if (this.props.data === null) {
                    return React.createElement("tr", null,
                        React.createElement("td", { colSpan: DGTABLE_COLS_COUNT }, "There are no data to be displayed..."));
                }
                let rows = [];
                for (let tunnel of this.props.data) {
                    rows.push(React.createElement(DGRow, { tunnel: tunnel, app: this.props.app }));
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            render() {
                let rows = this.generateRows();
                return (React.createElement("table", null, rows));
            }
            ;
        }
        class DGRow extends React.Component {
            render() {
                let tunnelID = this.props.tunnel.Type;
                let annotation = Annotation.AnnotationDataProvider.getChannelAnnotation(this.props.tunnel.Id);
                if (annotation !== void 0 && annotation !== null) {
                    tunnelID = annotation.text;
                }
                if (annotation === void 0) {
                    this.props.app.invokeDataWait();
                }
                return (React.createElement("tr", null,
                    React.createElement("td", { className: "col col-1" }, tunnelID),
                    React.createElement("td", { className: "col col-2" },
                        CommonUtils.Tunnels.getLength(this.props.tunnel),
                        " \u00C5"),
                    React.createElement("td", { className: "col col-3" },
                        CommonUtils.Tunnels.getBottleneck(this.props.tunnel),
                        " \u00C5"),
                    React.createElement("td", { className: "col col-4" }, CommonUtils.Numbers.roundToDecimal(this.props.tunnel.Properties.Hydropathy, 2)),
                    React.createElement("td", { className: "col col-5" }, CommonUtils.Numbers.roundToDecimal(this.props.tunnel.Properties.Charge, 2)),
                    React.createElement("td", { className: "col col-6" }, CommonUtils.Numbers.roundToDecimal(this.props.tunnel.Properties.Polarity, 2)),
                    React.createElement("td", { className: "col col-7" }, CommonUtils.Numbers.roundToDecimal(this.props.tunnel.Properties.Mutability, 2))));
            }
        }
    })(UI = AglomeredParameters.UI || (AglomeredParameters.UI = {}));
})(AglomeredParameters || (AglomeredParameters = {}));
var ChannelsDescriptions;
(function (ChannelsDescriptions) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        var LiteMoleEvent = LiteMol.Bootstrap.Event;
        var DGComponents = Datagrid.Components;
        let DGTABLE_COLS_COUNT = 2;
        ;
        function render(target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                super(...arguments);
                this.interactionEventStream = void 0;
                this.state = {
                    data: null,
                    app: this,
                    isWaitingForData: false
                };
            }
            componentDidMount() {
                LiteMoleEvent.Tree.NodeAdded.getStream(this.props.controller.context).subscribe(e => {
                    if (e.data.tree !== void 0 && e.data.ref === "channelsDB-data") {
                        let toShow = [];
                        let data = e.data.props.data;
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
            dataWaitHandler() {
                let state = this.state;
                state.isWaitingForData = false;
                this.setState(state);
            }
            invokeDataWait() {
                if (this.state.isWaitingForData) {
                    return;
                }
                let state = this.state;
                state.isWaitingForData = true;
                this.setState(state);
                Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
            }
            componentWillUnmount() {
            }
            render() {
                if (this.state.data !== null) {
                    return (React.createElement("div", null,
                        React.createElement(DGTable, Object.assign({}, this.state))));
                }
                return React.createElement("div", null);
            }
        }
        UI.App = App;
        class DGTable extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-channels-descriptions" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement(DGBody, Object.assign({}, this.props)))));
            }
        }
        class DGHead extends React.Component {
            render() {
                return (React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", { title: "Name", className: "col col-1" }, "Name"),
                        React.createElement("th", { title: "Description", className: "col col-2" }, "Description"))));
            }
            ;
        }
        class DGBody extends React.Component {
            generateRows() {
                if (this.props.data === null) {
                    return [
                        React.createElement("tr", null,
                            React.createElement("td", { colSpan: DGTABLE_COLS_COUNT }, "There are no data to be displayed...")),
                        React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT })
                    ];
                }
                let rows = [];
                for (let tunnel of this.props.data) {
                    let mainAnnotation = Annotation.AnnotationDataProvider.getChannelAnnotation(tunnel.Id);
                    let annotations = Annotation.AnnotationDataProvider.getChannelAnnotations(tunnel.Id);
                    if (annotations === void 0 || mainAnnotation === void 0) {
                        this.props.app.invokeDataWait();
                    }
                    if (annotations !== void 0 && annotations !== null && mainAnnotation !== void 0 && mainAnnotation !== null) {
                        for (let annotation of annotations) {
                            let name = `${mainAnnotation.text} / ${annotation.text}`;
                            if (mainAnnotation.text === annotation.text) {
                                name = mainAnnotation.text;
                            }
                            let description = annotation.description;
                            if (description === "") {
                                continue;
                            }
                            rows.push(React.createElement(DGRow, { tunnelName: name, description: description, channelId: tunnel.Id, app: this.props.app }));
                        }
                    }
                }
                if (rows.length === 0) {
                    return [
                        React.createElement("tr", null,
                            React.createElement("td", { colSpan: DGTABLE_COLS_COUNT }, "There are no data to be displayed...")),
                        React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT })
                    ];
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            render() {
                let rows = this.generateRows();
                return (React.createElement("table", null, rows));
            }
            ;
        }
        class DGRow extends React.Component {
            selectChannel(channelId) {
                Bridge.Events.invokeChannelSelect(channelId);
            }
            render() {
                let name = this.props.tunnelName;
                let description = this.props.description;
                return (React.createElement("tr", null,
                    React.createElement("td", { className: "col col-1" },
                        React.createElement("a", { className: "hand", onClick: () => this.selectChannel(this.props.channelId) }, name)),
                    React.createElement("td", { className: "col col-2" }, description)));
            }
        }
    })(UI = ChannelsDescriptions.UI || (ChannelsDescriptions.UI = {}));
})(ChannelsDescriptions || (ChannelsDescriptions = {}));
var LayerProperties;
(function (LayerProperties) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        var DGComponents = Datagrid.Components;
        let DGTABLE_COLS_COUNT = 2;
        let NO_DATA_MESSAGE = "Hover over channel(2D) for details...";
        ;
        ;
        function render(target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                super(...arguments);
                this.interactionEventStream = void 0;
                this.state = {
                    data: null,
                    app: this,
                    layerIdx: -1
                };
                this.layerIdx = -1;
            }
            componentDidMount() {
                $(window).on('layerTriggered', this.layerTriggerHandler.bind(this));
            }
            layerTriggerHandler(event, layerIdx) {
                this.layerIdx = layerIdx;
                let data = CommonUtils.Selection.SelectionHelper.getSelectedChannelData();
                let state = this.state;
                if (data !== null) {
                    state.layerIdx = layerIdx;
                    state.data = data.LayersInfo;
                    this.setState(state);
                }
                else {
                    state.layerIdx = layerIdx;
                    this.setState(state);
                }
                setTimeout(function () {
                    $(window).trigger('contentResize');
                }, 1);
            }
            componentWillUnmount() {
            }
            render() {
                if (this.state.data !== null && this.state.layerIdx >= 0) {
                    return (React.createElement("div", null,
                        React.createElement(DGTable, Object.assign({}, this.state))));
                }
                return React.createElement("div", null,
                    React.createElement(DGNoData, Object.assign({}, this.state)));
            }
        }
        UI.App = App;
        class DGNoData extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-layer-properties" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement("table", null,
                            React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT, infoText: NO_DATA_MESSAGE }),
                            React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT })))));
            }
        }
        class DGTable extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-layer-properties" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement(DGBody, Object.assign({}, this.props)))));
            }
        }
        class DGHead extends React.Component {
            render() {
                return (React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", { title: "Property", className: "col col-1" }, "Property"),
                        React.createElement("th", { title: "Value", className: "col col-2" }, "Value"))));
            }
            ;
        }
        class DGBody extends React.Component {
            generateRows() {
                if (this.props.data === null) {
                    return React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT, infoText: NO_DATA_MESSAGE });
                }
                let layerData = this.props.data[this.props.layerIdx].Properties;
                let rows = [];
                let charge = `${CommonUtils.Numbers.roundToDecimal(layerData.Charge, 2).toString()} (+${CommonUtils.Numbers.roundToDecimal(layerData.NumPositives, 2).toString()}/-${CommonUtils.Numbers.roundToDecimal(layerData.NumNegatives, 2).toString()})`;
                let minRadius = this.props.data[this.props.layerIdx].LayerGeometry.MinRadius;
                rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("span", null,
                            React.createElement("span", { className: "glyphicon glyphicon-tint properties-icon" }),
                            "Hydropathy"), React.createElement("span", null, CommonUtils.Numbers.roundToDecimal(layerData.Hydropathy, 2).toString())] }));
                rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("span", null,
                            React.createElement("span", { className: "glyphicon glyphicon-plus properties-icon" }),
                            "Polarity"), React.createElement("span", null, CommonUtils.Numbers.roundToDecimal(layerData.Polarity, 2).toString())] }));
                rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("span", null,
                            React.createElement("span", { className: "glyphicon glyphicon-tint properties-icon upside-down" }),
                            "Hydrophobicity"), React.createElement("span", null, CommonUtils.Numbers.roundToDecimal(layerData.Hydrophobicity, 2).toString())] }));
                rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("span", null,
                            React.createElement("span", { className: "glyphicon glyphicon-scissors properties-icon" }),
                            "Mutability"), React.createElement("span", null, CommonUtils.Numbers.roundToDecimal(layerData.Mutability, 2).toString())] }));
                rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("span", null,
                            React.createElement("span", { className: "glyphicon glyphicon-flash properties-icon" }),
                            "Charge"), React.createElement("span", null, charge)] }));
                rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("span", null,
                            React.createElement("span", { className: "icon bottleneck black properties-icon" }),
                            "Radius"), React.createElement("span", null, CommonUtils.Numbers.roundToDecimal(minRadius, 1))] }));
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            render() {
                let rows = this.generateRows();
                return (React.createElement("table", null, rows));
            }
            ;
        }
        class DGRow extends React.Component {
            generateRow(columns) {
                let tds = [];
                for (let i = 0; i < columns.length; i++) {
                    tds.push(React.createElement("td", { className: `col col-${i + 1}` }, columns[i]));
                }
                return tds;
            }
            render() {
                return (React.createElement("tr", null, this.generateRow(this.props.columns)));
            }
        }
    })(UI = LayerProperties.UI || (LayerProperties.UI = {}));
})(LayerProperties || (LayerProperties = {}));
var LayerResidues;
(function (LayerResidues) {
    var UI;
    (function (UI) {
        var DGComponents = Datagrid.Components;
        var React = LiteMol.Plugin.React;
        let DGTABLE_COLS_COUNT = 2;
        let NO_DATA_MESSAGE = "Hover over channel(2D) for details...";
        ;
        ;
        function render(target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                super(...arguments);
                this.interactionEventStream = void 0;
                this.state = {
                    data: null,
                    app: this,
                    layerIdx: -1,
                    isWaitingForData: false
                };
                this.layerIdx = -1;
            }
            componentDidMount() {
                $(window).on('layerTriggered', this.layerTriggerHandler.bind(this));
            }
            dataWaitHandler() {
                let state = this.state;
                state.isWaitingForData = false;
                this.setState(state);
            }
            invokeDataWait() {
                if (this.state.isWaitingForData) {
                    return;
                }
                let state = this.state;
                state.isWaitingForData = true;
                this.setState(state);
                Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
            }
            layerTriggerHandler(event, layerIdx) {
                this.layerIdx = layerIdx;
                let data = CommonUtils.Selection.SelectionHelper.getSelectedChannelData();
                let state = this.state;
                if (data !== null) {
                    state.layerIdx = layerIdx;
                    state.data = data.LayersInfo;
                    this.setState(state);
                }
                else {
                    state.layerIdx = layerIdx;
                    this.setState(state);
                }
                setTimeout(function () {
                    $(window).trigger('contentResize');
                }, 1);
            }
            componentWillUnmount() {
            }
            render() {
                if (this.state.data !== null && this.state.layerIdx >= 0) {
                    return (React.createElement("div", null,
                        React.createElement(DGTable, Object.assign({}, this.state))));
                }
                return React.createElement("div", null,
                    React.createElement(DGNoData, Object.assign({}, this.state)));
            }
        }
        UI.App = App;
        class DGNoData extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-layer-residues" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement("table", null,
                            React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT, infoText: NO_DATA_MESSAGE }),
                            React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT })))));
            }
        }
        class DGTable extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-layer-residues" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement(DGBody, Object.assign({}, this.props)))));
            }
        }
        class DGHead extends React.Component {
            render() {
                return (React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", { title: "Residue", className: "col col-1" }, "Residue"),
                        React.createElement("th", { title: "Annotation", className: "col col-2" }, "Annotation"))));
            }
            ;
        }
        class DGBody extends React.Component {
            generateLink(annotation) {
                if (annotation.reference === "") {
                    return (annotation.text !== void 0 && annotation.text !== null) ? React.createElement("span", null, annotation.text) : React.createElement("span", { className: "no-annotation" });
                }
                return React.createElement("a", { target: "_blank", href: annotation.link, dangerouslySetInnerHTML: { __html: annotation.text } });
            }
            shortenBackbone(residue) {
                return residue.replace(/Backbone/g, '');
            }
            isBackbone(residue) {
                return residue.indexOf("Backbone") >= 0;
            }
            generateSpannedRows(residue, annotations) {
                let trs = [];
                let residueNameEl = (this.isBackbone(residue)) ? React.createElement("i", null,
                    React.createElement("strong", null, this.shortenBackbone(residue))) : React.createElement("span", null, residue);
                let first = true;
                for (let annotation of annotations) {
                    if (first === true) {
                        first = false;
                        trs.push(React.createElement("tr", null,
                            React.createElement("td", { title: (this.isBackbone(residue) ? residue : ""), className: `col col-1 ${(this.isBackbone(residue) ? "help" : "")}`, rowSpan: (annotations.length > 1) ? annotations.length : void 0 }, residueNameEl),
                            React.createElement("td", { className: `col col-2` }, this.generateLink(annotation))));
                    }
                    else {
                        trs.push(React.createElement("tr", null,
                            React.createElement("td", { className: `col col-2` }, this.generateLink(annotation))));
                    }
                }
                return trs;
            }
            generateRows() {
                if (this.props.data === null) {
                    return React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT, infoText: NO_DATA_MESSAGE });
                }
                let layerData = this.props.data[this.props.layerIdx].Residues;
                let rows = [];
                for (let residue of layerData) {
                    let residueId = residue.split(" ").slice(1, 3).join(" ");
                    let annotation;
                    let annotationText = "";
                    let annotationSource = "";
                    annotation = Annotation.AnnotationDataProvider.getResidueAnnotations(residueId);
                    let residueNameEl = (this.isBackbone(residue)) ? React.createElement("i", null,
                        React.createElement("strong", null, this.shortenBackbone(residue))) : React.createElement("span", null, residue);
                    if (annotation === void 0) {
                        this.props.app.invokeDataWait();
                        rows.push(React.createElement(DGComponents.DGElementRow, { columns: [residueNameEl, React.createElement("span", null, "Annotation data still loading...")], title: [(this.isBackbone(residue) ? residue : ""), (this.isBackbone(residue) ? residue : "")], trClass: (this.isBackbone(residue) ? "help" : "") }));
                    }
                    else if (annotation !== null && annotation.length > 0) {
                        rows = rows.concat(this.generateSpannedRows(residue, annotation));
                    }
                    else {
                        rows.push(React.createElement(DGComponents.DGElementRow, { columns: [residueNameEl, React.createElement("span", null)], title: [(this.isBackbone(residue) ? residue : ""), (this.isBackbone(residue) ? residue : "")], trClass: (this.isBackbone(residue) ? "help" : "") }));
                    }
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            render() {
                let rows = this.generateRows();
                return (React.createElement("table", null, rows));
            }
            ;
        }
    })(UI = LayerResidues.UI || (LayerResidues.UI = {}));
})(LayerResidues || (LayerResidues = {}));
var ResidueAnnotations;
(function (ResidueAnnotations) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        var DGComponents = Datagrid.Components;
        let DGTABLE_COLS_COUNT = 2;
        ;
        ;
        function render(target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                super(...arguments);
                this.state = {
                    data: null,
                    app: this,
                    isWaitingForData: false
                };
                this.layerIdx = -1;
            }
            sortResidues(residues, useAnnotations) {
                if (useAnnotations === void 0) {
                    useAnnotations = false;
                }
                if (useAnnotations && (this.state.isWaitingForData || Annotation.AnnotationDataProvider.getResidueAnnotations(residues[0]) === void 0)) {
                    useAnnotations = false;
                }
                if (residues.length === 0) {
                    return residues;
                }
                ;
                let groupFn = (resParsed) => {
                    let lining = [];
                    let other = [];
                    if (useAnnotations) {
                        for (let r of resParsed) {
                            let annotation = Annotation.AnnotationDataProvider.getResidueAnnotations(`${r.authSeqNumber} ${r.chain.authAsymId}`);
                            //annotation data not ready
                            if (annotation === void 0) {
                                other = resParsed;
                                lining = [];
                                break;
                            }
                            //annotation data available
                            if (annotation.length !== 0) {
                                let isLining = false;
                                for (let a of annotation) {
                                    if (a.isLining === true) {
                                        lining.push(r);
                                        isLining = true;
                                        break;
                                    }
                                }
                                if (!isLining) {
                                    other.push(r);
                                }
                            }
                            else { //no annotation data available
                                other.push(r);
                            }
                        }
                    }
                    else {
                        other = resParsed;
                    }
                    return [lining, other];
                };
                return CommonUtils.Residues.sort(residues, groupFn);
            }
            componentDidMount() {
                let list = Annotation.AnnotationDataProvider.getResidueList();
                if (list !== void 0) {
                    let state = this.state;
                    state.data = this.sortResidues(list);
                    this.setState(state);
                }
                else {
                    Annotation.AnnotationDataProvider.subscribeForData((() => {
                        let list = Annotation.AnnotationDataProvider.getResidueList();
                        if (list === void 0) {
                            return;
                        }
                        let s = this.state;
                        s.data = this.sortResidues(list, true);
                        this.setState(s);
                        setTimeout(function () {
                            $(window).trigger('contentResize');
                        }, 1);
                    }).bind(this));
                }
            }
            dataWaitHandler() {
                let state = this.state;
                state.isWaitingForData = false;
                this.setState(state);
            }
            invokeDataWait() {
                if (this.state.isWaitingForData) {
                    return;
                }
                let state = this.state;
                state.isWaitingForData = true;
                this.setState(state);
                Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
            }
            selectResiude(residueId) {
                let residueParts = residueId.split(" ").slice(0, 2);
                let residue = { chain: { authAsymId: residueParts[1] }, authSeqNumber: Number(residueParts[0]) };
                if (!CommonUtils.Selection.SelectionHelper.isSelectedLight(residue)) {
                    CommonUtils.Selection.SelectionHelper.selectResidueByAuthAsymIdAndAuthSeqNumberWithBallsAndSticks(this.props.controller, residue);
                }
            }
            componentWillUnmount() {
            }
            render() {
                if (this.state.data !== null) {
                    return (React.createElement("div", null,
                        React.createElement(DGTable, Object.assign({}, this.state))));
                }
                return React.createElement("div", null,
                    React.createElement(DGNoData, Object.assign({}, this.state)));
            }
        }
        UI.App = App;
        class DGNoData extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-residue-annotations" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement("table", null,
                            React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT }),
                            React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT })))));
            }
        }
        class DGTable extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-residue-annotations" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement(DGBody, Object.assign({}, this.props)))));
            }
        }
        class DGHead extends React.Component {
            render() {
                return (React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", { title: "Residue", className: "col col-1" }, "Residue"),
                        React.createElement("th", { title: "Annotation", className: "col col-2" }, "Annotation"))));
            }
            ;
        }
        class DGBody extends React.Component {
            generateLink(annotation) {
                if (annotation.reference === "") {
                    return (annotation.text !== void 0 && annotation.text !== null) ? React.createElement("span", null, annotation.text) : React.createElement("span", { className: "no-annotation" });
                }
                return React.createElement("a", { target: "_blank", href: annotation.link, dangerouslySetInnerHTML: { __html: annotation.text } });
            }
            generateSpannedRows(residue, annotations) {
                let trs = [];
                let first = true;
                for (let annotation of annotations) {
                    if (first === true) {
                        first = false;
                        trs.push(React.createElement("tr", { className: (annotation.isLining) ? "highlight" : "" },
                            React.createElement("td", { rowSpan: (annotations.length > 1) ? annotations.length : void 0, className: `col col-1` },
                                React.createElement("a", { className: "hand", onClick: () => { this.props.app.selectResiude(residue); } }, residue)),
                            React.createElement("td", { className: `col col-2` }, this.generateLink(annotation))));
                    }
                    else {
                        trs.push(React.createElement("tr", { className: (annotation.isLining) ? "highlight" : "" },
                            React.createElement("td", { className: `col col-2` }, this.generateLink(annotation))));
                    }
                }
                return trs;
            }
            generateRows() {
                if (this.props.data === null) {
                    return React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT });
                }
                let residues = this.props.data;
                let rows = [];
                for (let residueId of residues) {
                    let annotation;
                    let annotationText = "";
                    let annotationSource = "";
                    annotation = Annotation.AnnotationDataProvider.getResidueAnnotations(residueId);
                    if (annotation === void 0) {
                        this.props.app.invokeDataWait();
                        rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("a", { className: "hand", onClick: () => { this.props.app.selectResiude(residueId); } }, residueId), React.createElement("span", null, "Annotation data still loading...")] }));
                    }
                    else if (annotation !== null && annotation.length > 0) {
                        rows = rows.concat(this.generateSpannedRows(residueId, annotation));
                    }
                    else {
                        rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("a", { className: "hand", onClick: () => { this.props.app.selectResiude(residueId); } }, residueId), React.createElement("span", null), React.createElement("span", null)] }));
                    }
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            render() {
                let rows = this.generateRows();
                return (React.createElement("table", null, rows));
            }
            ;
        }
        class DGRow extends React.Component {
            generateRow(columns) {
                let tds = [];
                for (let i = 0; i < columns.length; i++) {
                    tds.push(React.createElement("td", { className: `col col-${i + 1}` }, columns[i]));
                }
                return tds;
            }
            render() {
                return (React.createElement("tr", null, this.generateRow(this.props.columns)));
            }
        }
    })(UI = ResidueAnnotations.UI || (ResidueAnnotations.UI = {}));
})(ResidueAnnotations || (ResidueAnnotations = {}));
var ProteinAnnotations;
(function (ProteinAnnotations) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        var DGComponents = Datagrid.Components;
        let DGTABLE_COLS_COUNT = 3;
        ;
        ;
        function render(target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                //private interactionEventStream: LiteMol.Bootstrap.Rx.IDisposable | undefined = void 0;
                super(...arguments);
                this.state = {
                    data: null,
                    app: this
                };
                this.layerIdx = -1;
            }
            handleData() {
                let annotations = Annotation.AnnotationDataProvider.getProteinAnnotations();
                if (annotations !== void 0) {
                    let state = this.state;
                    state.data = annotations;
                    this.setState(state);
                    setTimeout(function () {
                        $(window).trigger('contentResize');
                    }, 1);
                }
            }
            componentDidMount() {
                if (!Annotation.AnnotationDataProvider.isDataReady()) {
                    Annotation.AnnotationDataProvider.subscribeForData(this.handleData.bind(this));
                }
                else {
                    this.handleData();
                }
            }
            componentWillUnmount() {
            }
            render() {
                if (this.state.data !== null) {
                    return (React.createElement("div", null,
                        React.createElement(DGTable, Object.assign({}, this.state))));
                }
                return React.createElement("div", null,
                    React.createElement(DGNoData, Object.assign({}, this.state)));
            }
        }
        UI.App = App;
        class DGNoData extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-protein-annotations" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement("table", null,
                            React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT }),
                            React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT })))));
            }
        }
        class DGTable extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-protein-annotations" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement(DGBody, Object.assign({}, this.props)))));
            }
        }
        class DGHead extends React.Component {
            render() {
                return (React.createElement("table", null));
            }
            ;
        }
        class DGBody extends React.Component {
            generateLink(annotation) {
                if (annotation.reference === "") {
                    return "";
                }
                return React.createElement("a", { target: "_blank", href: annotation.link }, annotation.reference);
            }
            generateSpannedRows(residue, annotations) {
                let trs = [];
                let first = true;
                for (let annotation of annotations) {
                    if (first === true) {
                        first = false;
                        trs.push(React.createElement("tr", { className: (annotation.isLining) ? "highlight" : "" },
                            React.createElement("td", { className: `col col-1` }, residue),
                            React.createElement("td", { className: `col col-2` }, annotation.text),
                            React.createElement("td", { className: `col col-3` }, this.generateLink(annotation))));
                    }
                    else {
                        trs.push(React.createElement("tr", { className: (annotation.isLining) ? "highlight" : "" },
                            React.createElement("td", { className: `col col-2` }, annotation.text),
                            React.createElement("td", { className: `col col-3` }, this.generateLink(annotation))));
                    }
                }
                return trs;
            }
            generateRows() {
                if (this.props.data === null) {
                    return React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT });
                }
                let annotations = this.props.data;
                let rows = [];
                for (let annotation of annotations) {
                    let noDataText = "No data provided";
                    rows.push(React.createElement(DGComponents.DGRow, { columns: ["Name:", annotation.name], trClass: "highlight hl-main" }));
                    rows.push(React.createElement(DGComponents.DGElementRow, { columns: [React.createElement("span", null, "UniProt Id:"), React.createElement("a", { href: annotation.link, target: "_blank" }, annotation.uniProtId)] }));
                    rows.push(React.createElement(DGComponents.DGRow, { columns: ["Function:"], columnsCount: DGTABLE_COLS_COUNT, trClass: "highlight" }));
                    rows.push(React.createElement(DGComponents.DGRow, { columns: [(annotation.function !== null && annotation.function !== "") ? annotation.function : noDataText], columnsCount: DGTABLE_COLS_COUNT, trClass: "justify" }));
                    rows.push(React.createElement(DGComponents.DGRow, { columns: ["Catalytic activity:"], columnsCount: DGTABLE_COLS_COUNT, trClass: "highlight" }));
                    if (annotation.catalytics.length == 0) {
                        rows.push(React.createElement(DGComponents.DGRow, { columns: ["No data provided"], columnsCount: DGTABLE_COLS_COUNT }));
                    }
                    /*
                    let catalytics:JSX.Element[] = [];
                    for(let entry of annotation.catalytics){
                        catalytics.push(<li><span dangerouslySetInnerHTML={{__html:entry}}></span></li>);
                    }
                    rows.push(
                        <DGComponents.DGElementRow columns={[<ul>{catalytics}</ul>]} columnsCount={DGTABLE_COLS_COUNT} trClass="catalytics" />
                    );
                    */
                    for (let entry of annotation.catalytics) {
                        rows.push(React.createElement(DGComponents.DGRow, { columns: [entry], columnsCount: DGTABLE_COLS_COUNT, forceHtml: true, trClass: "catalytics" }));
                    }
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            render() {
                let rows = this.generateRows();
                return (React.createElement("table", null, rows));
            }
            ;
        }
    })(UI = ProteinAnnotations.UI || (ProteinAnnotations.UI = {}));
})(ProteinAnnotations || (ProteinAnnotations = {}));
var LiningResidues;
(function (LiningResidues) {
    var UI;
    (function (UI) {
        var DGComponents = Datagrid.Components;
        var React = LiteMol.Plugin.React;
        let DGTABLE_COLS_COUNT = 2;
        let NO_DATA_MESSAGE = "Select channel in 3D view for details...";
        ;
        ;
        function render(target, plugin) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, { controller: plugin }), target);
        }
        UI.render = render;
        class App extends React.Component {
            constructor() {
                super(...arguments);
                this.interactionEventStream = void 0;
                this.state = {
                    data: null,
                    app: this,
                    isWaitingForData: false
                };
                this.layerIdx = -1;
            }
            componentDidMount() {
                CommonUtils.Selection.SelectionHelper.attachOnChannelSelectHandler((data) => {
                    if (data === null) {
                        return;
                    }
                    let state = this.state;
                    state.data = CommonUtils.Residues.sort(data.ResidueFlow, void 0, true, true);
                    this.setState(state);
                    setTimeout(function () {
                        $(window).trigger('contentResize');
                    }, 1);
                });
            }
            dataWaitHandler() {
                let state = this.state;
                state.isWaitingForData = false;
                this.setState(state);
            }
            invokeDataWait() {
                if (this.state.isWaitingForData) {
                    return;
                }
                let state = this.state;
                state.isWaitingForData = true;
                this.setState(state);
                Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
            }
            componentWillUnmount() {
            }
            render() {
                if (this.state.data !== null) {
                    return (React.createElement("div", null,
                        React.createElement(DGTable, Object.assign({}, this.state)),
                        React.createElement(Controls, Object.assign({}, this.state))));
                }
                return React.createElement("div", null,
                    React.createElement(DGNoData, Object.assign({}, this.state)));
            }
        }
        UI.App = App;
        function residueStringToResidueLight(residue) {
            /*
            [0 , 1 ,2 ,  3   ]
            VAL 647 A Backbone
            */
            let residueParts = residue.split(" ");
            let rv = {
                authSeqNumber: Number(residueParts[1]),
                chain: {
                    authAsymId: residueParts[2]
                }
            };
            return rv;
        }
        class Controls extends React.Component {
            clearSelection() {
                CommonUtils.Selection.SelectionHelper.clearSelection(this.props.app.props.controller);
            }
            selectAll() {
                let residues = [];
                if (this.props.app.state.data === null) {
                    return;
                }
                for (let residue of this.props.app.state.data) {
                    residues.push(residueStringToResidueLight(residue));
                }
                if (!CommonUtils.Selection.SelectionHelper.isBulkResiduesSelected(residues)) {
                    CommonUtils.Selection.SelectionHelper.selectResiduesBulkWithBallsAndSticks(this.props.app.props.controller, residues);
                }
            }
            render() {
                return React.createElement("div", { className: "lining-residues select-controls" },
                    React.createElement("span", { className: "btn-xs btn-default bt-all hand", onClick: this.selectAll.bind(this) }, "Select all"),
                    React.createElement("span", { className: "btn-xs btn-default bt-none hand", onClick: this.clearSelection.bind(this) }, "Clear selection"));
            }
        }
        class DGNoData extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-lining-residues" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement("table", null,
                            React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT, infoText: NO_DATA_MESSAGE }),
                            React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT })))));
            }
        }
        class DGTable extends React.Component {
            render() {
                return (React.createElement("div", { className: "datagrid", id: "dg-lining-residues" },
                    React.createElement("div", { className: "header" },
                        React.createElement(DGHead, Object.assign({}, this.props))),
                    React.createElement("div", { className: "body" },
                        React.createElement(DGBody, Object.assign({}, this.props)))));
            }
        }
        class DGHead extends React.Component {
            render() {
                return (React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", { title: "Residue", className: "col col-1" }, "Residue"),
                        React.createElement("th", { title: "Annotation", className: "col col-2" }, "Annotation"))));
            }
            ;
        }
        class DGBody extends React.Component {
            generateLink(annotation) {
                if (annotation.reference === "") {
                    return (annotation.text !== void 0 && annotation.text !== null) ? React.createElement("span", null, annotation.text) : React.createElement("span", { className: "no-annotation" });
                }
                return React.createElement("a", { target: "_blank", href: annotation.link, dangerouslySetInnerHTML: { __html: annotation.text } });
            }
            shortenBackbone(residue) {
                return residue.replace(/Backbone/g, '');
            }
            isBackbone(residue) {
                return residue.indexOf("Backbone") >= 0;
            }
            selectResidue(residue) {
                let residueLightEntity = residueStringToResidueLight(residue);
                if (!CommonUtils.Selection.SelectionHelper.isSelectedLight(residueLightEntity)) {
                    CommonUtils.Selection.SelectionHelper.selectResidueByAuthAsymIdAndAuthSeqNumberWithBallsAndSticks(this.props.app.props.controller, residueLightEntity);
                }
            }
            getSelect3DLink(residue) {
                let residueEl = (this.isBackbone(residue)) ? React.createElement("i", null,
                    React.createElement("strong", null, this.shortenBackbone(residue))) : React.createElement("span", null, residue);
                return React.createElement("a", { className: "hand", onClick: (e) => { this.selectResidue(residue); } }, residueEl);
            }
            generateSpannedRows(residue, annotations) {
                let trs = [];
                let residueNameEl = this.getSelect3DLink(residue); //(this.isBackbone(residue))?<i><strong>{this.shortenBackbone(residue)}</strong></i>:<span>{residue}</span>;
                let first = true;
                for (let annotation of annotations) {
                    if (first === true) {
                        first = false;
                        trs.push(React.createElement("tr", { title: (this.isBackbone(residue) ? residue : ""), className: (this.isBackbone(residue) ? "help" : "") },
                            React.createElement("td", { className: `col col-1`, rowSpan: (annotations.length > 1) ? annotations.length : void 0 }, residueNameEl),
                            React.createElement("td", { className: `col col-2` }, this.generateLink(annotation))));
                    }
                    else {
                        trs.push(React.createElement("tr", null,
                            React.createElement("td", { className: `col col-2` }, this.generateLink(annotation))));
                    }
                }
                return trs;
            }
            generateRows() {
                if (this.props.data === null) {
                    return React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT, infoText: NO_DATA_MESSAGE });
                }
                let rows = [];
                for (let residue of this.props.data) {
                    let residueId = residue.split(" ").slice(1, 3).join(" ");
                    let annotation;
                    let annotationText = "";
                    let annotationSource = "";
                    annotation = Annotation.AnnotationDataProvider.getResidueAnnotations(residueId);
                    //let residueNameEl = (this.isBackbone(residue))?<i><strong>{this.shortenBackbone(residue)}</strong></i>:<span>{residue}</span>;
                    if (annotation === void 0) {
                        this.props.app.invokeDataWait();
                        rows.push(React.createElement(DGComponents.DGElementRow, { columns: [this.getSelect3DLink(residue), React.createElement("span", null, "Annotation data still loading...")], title: [(this.isBackbone(residue) ? residue : ""), ""], trClass: (this.isBackbone(residue) ? "help" : "") }));
                    }
                    else if (annotation !== null && annotation.length > 0) {
                        rows = rows.concat(this.generateSpannedRows(residue, annotation));
                    }
                    else {
                        rows.push(React.createElement(DGComponents.DGElementRow, { columns: [this.getSelect3DLink(residue), React.createElement("span", null)], title: [(this.isBackbone(residue) ? residue : ""), (this.isBackbone(residue) ? residue : "")], trClass: (this.isBackbone(residue) ? "help" : "") }));
                    }
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            generateRows_old() {
                if (this.props.data === null) {
                    return React.createElement(DGComponents.DGNoDataInfoRow, { columnsCount: DGTABLE_COLS_COUNT, infoText: NO_DATA_MESSAGE });
                }
                let rows = [];
                for (let residue of this.props.data) {
                    let residueId = residue.split(" ").slice(1, 3).join(" ");
                    rows.push(React.createElement(DGComponents.DGElementRow, { columns: [this.getSelect3DLink(residue)], title: [(this.isBackbone(residue) ? residue : "")], trClass: (this.isBackbone(residue) ? "help" : "") }));
                }
                rows.push(React.createElement(DGComponents.DGRowEmpty, { columnsCount: DGTABLE_COLS_COUNT }));
                return rows;
            }
            render() {
                let rows = this.generateRows();
                return (React.createElement("table", null, rows));
            }
            ;
        }
    })(UI = LiningResidues.UI || (LiningResidues.UI = {}));
})(LiningResidues || (LiningResidues = {}));
var DownloadReport;
(function (DownloadReport) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        function render(target) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, null), target);
        }
        UI.render = render;
        class App extends React.Component {
            componentDidMount() {
            }
            componentWillUnmount() {
            }
            render() {
                return React.createElement("div", null,
                    React.createElement(DownloadResultsMenu, null));
            }
        }
        UI.App = App;
        class BootstrapDropDownMenuItem extends React.Component {
            render() {
                return (React.createElement("li", null,
                    React.createElement("a", { target: (this.props.targetBlank) ? "_blank" : "", href: this.props.link }, this.props.linkText)));
            }
        }
        class BootstrapDropDownMenuElementItem extends React.Component {
            render() {
                return (React.createElement("li", null,
                    React.createElement("a", { target: (this.props.targetBlank) ? "_blank" : "", href: this.props.link }, this.props.linkElement)));
            }
        }
        class BootstrapDropDownMenuButton extends React.Component {
            render() {
                return React.createElement("div", { className: "btn-group dropdown" },
                    React.createElement("button", { type: "button", className: "download dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                        this.props.label,
                        " ",
                        React.createElement("span", { className: "glyphicon glyphicon-download" })),
                    React.createElement("ul", { className: "dropdown-menu" }, this.props.items));
            }
        }
        class DownloadResultsMenu extends React.Component {
            render() {
                let pdbid = SimpleRouter.GlobalRouter.getCurrentPid();
                let subDB = SimpleRouter.GlobalRouter.getCurrentDB();
                let url = SimpleRouter.GlobalRouter.getChannelsURL();
                let linkBase = subDB === "pdb" ? `${url}/download/${subDB}/${pdbid}` : `${url}/download/${subDB}/${pdbid.toLowerCase()}`;
                let items = [];
                items.push(React.createElement(BootstrapDropDownMenuItem, { linkText: ".zip", link: `${linkBase}/zip`, targetBlank: true }));
                items.push(React.createElement(BootstrapDropDownMenuItem, { linkText: ".pdb", link: `${linkBase}/pdb`, targetBlank: true }));
                items.push(React.createElement(BootstrapDropDownMenuItem, { linkText: ".json", link: `${linkBase}/json`, targetBlank: true }));
                items.push(React.createElement(BootstrapDropDownMenuItem, { linkText: ".py", link: `${linkBase}/pymol`, targetBlank: true }));
                items.push(React.createElement(BootstrapDropDownMenuItem, { linkText: ".vmd", link: `${linkBase}/vmd`, targetBlank: true }));
                items.push(React.createElement(BootstrapDropDownMenuItem, { linkText: ".png", link: `${linkBase}/png`, targetBlank: true }));
                items.push(React.createElement(BootstrapDropDownMenuItem, { linkText: "chimera", link: `${linkBase}/chimera`, targetBlank: true }));
                return React.createElement(BootstrapDropDownMenuButton, { label: "Download report", items: items });
            }
        }
    })(UI = DownloadReport.UI || (DownloadReport.UI = {}));
})(DownloadReport || (DownloadReport = {}));
var PdbIdSign;
(function (PdbIdSign) {
    var UI;
    (function (UI) {
        var React = LiteMol.Plugin.React;
        function render(target) {
            LiteMol.Plugin.ReactDOM.render(React.createElement(App, null), target);
        }
        UI.render = render;
        class App extends React.Component {
            componentDidMount() {
            }
            componentWillUnmount() {
            }
            render() {
                let pid = SimpleRouter.GlobalRouter.getCurrentPid();
                let subDB = SimpleRouter.GlobalRouter.getCurrentDB();
                return React.createElement("div", null,
                    React.createElement("a", { href: subDB === "pdb" ? `https://pdbe.org/${pid}` : `https://alphafill.eu/model?id=${pid}`, style: subDB === "pdb" ? {} : { fontSize: "14" }, target: "_blank" },
                        pid,
                        " ",
                        React.createElement("span", { className: "glyphicon glyphicon-new-window href-ico" })));
            }
        }
        UI.App = App;
    })(UI = PdbIdSign.UI || (PdbIdSign.UI = {}));
})(PdbIdSign || (PdbIdSign = {}));
var SimpleRouter;
(function (SimpleRouter) {
    class URL {
        constructor(url, hasHost = true) {
            this.url = this.removeLastSlash(url);
            this.parts = this.removeTrailingSlashes(url).split("/");
            this.hasHost = hasHost;
            this.parameters = this.parseURLParameters(url);
            this.protocol = this.parseProtocol(url);
        }
        removeProtocolPart(url) {
            let parts = this.url.split("//");
            return parts[parts.length - 1];
        }
        removeLastSlash(url) {
            if (url[url.length - 1] === "/" || url[url.length - 1] === "\\") {
                return url.slice(0, url.length - 1);
            }
            return url;
        }
        removeBeginingSlash(url) {
            if (url[0] === "/" || url[0] === "\\") {
                return url.slice(1);
            }
            return url;
        }
        removeTrailingSlashes(url) {
            return this.removeLastSlash(this.removeBeginingSlash(this.removeProtocolPart(url)));
        }
        substractPathFromStart(path) {
            let substractPathParts = this.removeBeginingSlash(path).split("/");
            let urlSubstracted = [];
            for (let idx = (this.hasHost ? 1 : 0), i = 0; idx < this.parts.length; idx++, i++) {
                if (i < substractPathParts.length && this.parts[idx] === substractPathParts[i]) {
                    continue;
                }
                urlSubstracted.push(this.parts[idx]);
            }
            return new URL(URL.constructPath(urlSubstracted), false);
        }
        getHostname() {
            if (!this.hasHost) {
                return "";
            }
            return this.parts[0];
        }
        getPart(index) {
            return this.parts[index];
        }
        getLength() {
            return this.parts.length;
        }
        static constructPath(pathParts, useProtocol = false, protocol = "http") {
            let url = "";
            for (let i = 0; i < pathParts.length; i++) {
                if (pathParts[i] === "") {
                    continue;
                }
                url += `/${pathParts[i]}`;
            }
            if (useProtocol) {
                url = `${protocol}:/${url}`;
            }
            return url;
        }
        getLastPart() {
            return this.getPart(this.getLength() - 1);
        }
        getParameterValue(name) {
            if (!this.parameters.has(name)) {
                return null;
            }
            let value = this.parameters.get(name);
            if (value === void 0) {
                return null;
            }
            return value;
        }
        parseURLParameters(url) {
            let parts = url.split("?");
            let parameters = new Map();
            if (parts.length !== 2) {
                return parameters;
            }
            let params = parts[1].split("&");
            for (let i = 0; i < params.length; i++) {
                let tuple = params[i].split("=");
                let key = tuple[0];
                let value = "";
                if (tuple.length === 2) {
                    value = tuple[1];
                }
                parameters.set(key, value);
            }
            return parameters;
        }
        parseProtocol(url) {
            let protocol = url.split(":");
            if (protocol.length > 1) {
                return protocol[0];
            }
            return "";
        }
        getProtocol() {
            if (!this.hasHost) {
                return "";
            }
            return this.protocol;
        }
        toString() {
            return URL.constructPath(this.parts, this.hasHost, this.getProtocol());
        }
    }
    SimpleRouter.URL = URL;
    class Router {
        constructor(contextPath) {
            this.contextPath = contextPath;
        }
        /* Buggy !!
        getRelativePath(){
            return new SrURL(document.URL).substractPathFromStart(this.contextPath);
        }
        */
        getAbsoluePath() {
            return new URL(document.URL);
        }
        changeUrl(name, windowTitle, url) {
            let stateObj = { page: name };
            history.pushState(stateObj, windowTitle, url);
        }
    }
    SimpleRouter.Router = Router;
    ;
    class GlobalRouter {
        static init(routingParameters) {
            this.defaultContextPath = routingParameters.defaultContextPath;
            this.defaultPid = routingParameters.defaultPid;
            this.useParameterAsPid = (routingParameters.useParameterAsPid === void 0) ? false : routingParameters.useParameterAsPid;
            this.useLastPathPartAsPid = (routingParameters.useLastPathPartAsPid === void 0) ? false : routingParameters.useLastPathPartAsPid;
            this.defaultDB = routingParameters.defaultDB;
            this.router = new Router(routingParameters.defaultContextPath);
            let url = this.router.getAbsoluePath();
            let subDB = null;
            let pid = null;
            if (this.useParameterAsPid === true) {
                subDB = url.getParameterValue("subDB");
                pid = url.getParameterValue("pid");
            }
            else if (this.useLastPathPartAsPid === true) {
                let lastPathPartAsParam = url.substractPathFromStart(this.defaultContextPath).getLastPart();
                pid = lastPathPartAsParam === "" ? null : lastPathPartAsParam;
            }
            this.currentPid = (pid !== null) ? pid : this.defaultPid;
            this.subDB = (subDB !== null) ? subDB : this.defaultDB;
            if (pid !== this.currentPid) {
                if (this.useParameterAsPid === true) {
                    this.router.changeUrl("detail", document.title, `${url}/pdb/${this.currentPid}`);
                }
                else if (this.useLastPathPartAsPid === true) {
                    subDB
                        ? this.router.changeUrl("detail", document.title, `${subDB}/${this.currentPid}`)
                        : this.router.changeUrl("detail", document.title, `${url}/${this.currentPid}`);
                }
            }
            else {
                if (subDB) {
                    this.router.changeUrl("detail", document.title, `${subDB}/${this.currentPid}`);
                }
                else if (this.useLastPathPartAsPid === true) {
                    this.router.changeUrl("detail", document.title, `${url}/detail/${this.currentPid}`);
                }
            }
            this.isInitialized = true;
        }
        static getCurrentPid() {
            if (!this.isInitialized) {
                throw new Error("GlobalRouter is not inititalised! Call init(..) function before use!");
            }
            return this.currentPid;
        }
        static getCurrentDB() {
            if (!this.isInitialized) {
                throw new Error("GlobalRouter is not inititalised! Call init(..) function before use!");
            }
            return this.subDB;
        }
        static getChannelsURL() {
            if (!this.isInitialized) {
                throw new Error("GlobalRouter is not inititalised! Call init(..) function before use!");
            }
            return this.defaultChannelsURL;
        }
    }
    GlobalRouter.defaultChannelsURL = "http://channelsdb2.biodata.ceitec.cz";
    GlobalRouter.isInitialized = false;
    SimpleRouter.GlobalRouter = GlobalRouter;
})(SimpleRouter || (SimpleRouter = {}));
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
var LiteMol;
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
(function (LiteMol) {
    var Example;
    (function (Example) {
        var Channels;
        (function (Channels) {
            var State;
            (function (State) {
                var Transformer = LiteMol.Bootstrap.Entity.Transformer;
                let COORDINATE_SERVERS = {
                    "ebi-http": "http://www.ebi.ac.uk/pdbe/coordinates",
                    "ceitec-https": "https://webchem.ncbr.muni.cz/CoordinateServer"
                };
                let COORDINATE_SERVER = "ceitec-https";
                function showDefaultVisuals(plugin, data, channelCount) {
                    return new LiteMol.Promise(res => {
                        let toShow = [];
                        if (data.CSATunnels_MOLE.length > 0) {
                            toShow = data.CSATunnels_MOLE;
                        }
                        else if (data.CSATunnels_Caver.length > 0) {
                            toShow = data.CSATunnels_Caver;
                        }
                        else if (data.ReviewedChannels_MOLE.length > 0) {
                            toShow = data.ReviewedChannels_MOLE;
                        }
                        else if (data.ReviewedChannels_Caver.length > 0) {
                            toShow = data.ReviewedChannels_Caver;
                        }
                        else if (data.CofactorTunnels_MOLE.length > 0) {
                            toShow = data.CofactorTunnels_MOLE;
                        }
                        else if (data.CofactorTunnels_Caver.length > 0) {
                            toShow = data.CofactorTunnels_Caver;
                        }
                        else if (data.TransmembranePores_MOLE.length > 0) {
                            toShow = data.TransmembranePores_MOLE;
                        }
                        else if (data.TransmembranePores_Caver.length > 0) {
                            toShow = data.TransmembranePores_Caver;
                        }
                        else if (data.ProcognateTunnels_MOLE.length > 0) {
                            toShow = data.ProcognateTunnels_MOLE;
                        }
                        else if (data.ProcagnateTunnels_Caver.length > 0) {
                            toShow = data.ProcagnateTunnels_Caver;
                        }
                        else if (data.AlphaFillTunnels_MOLE.length > 0) {
                            toShow = data.AlphaFillTunnels_MOLE;
                        }
                        else if (data.AlphaFillTunnels_Caver.length > 0) {
                            toShow = data.AlphaFillTunnels_Caver;
                        }
                        return showChannelVisuals(plugin, toShow /*.slice(0, channelCount)*/, true).then(() => {
                            if (data.Cavities === void 0) {
                                res(null);
                                return;
                            }
                            let cavity = data.Cavities.Cavities[0];
                            if (!cavity) {
                                res(null);
                                return;
                            }
                            showCavityVisuals(plugin, [cavity], true).then(() => res(null));
                        });
                    });
                }
                function loadData(plugin, pid, url, subDB) {
                    plugin.clear();
                    //Subscribe for data
                    Annotation.AnnotationDataProvider.subscribeToPluginContext(plugin.context);
                    let modelLoadPromise = new LiteMol.Promise((res, rej) => {
                        if (subDB === "pdb") {
                            let assemblyInfo = plugin.createTransform().add(plugin.root, Transformer.Data.Download, {
                                url: `${url}/assembly/${pid}`,
                                type: 'String',
                                id: 'AssemblyInfo'
                            }, { isHidden: false })
                                .then(Transformer.Data.ParseJson, { id: 'AssemblyInfo' }, { ref: 'assembly-id' });
                            plugin.applyTransform(assemblyInfo).then(() => {
                                let parsedData = plugin.context.select('assembly-id')[0];
                                if (!parsedData)
                                    throw new Error('Data not available.');
                                else {
                                    let assemblyId = parsedData.props.data;
                                    let model = plugin.createTransform()
                                        .add(plugin.root, Transformer.Data.Download, { url: `${COORDINATE_SERVERS[COORDINATE_SERVER]}/${pid}/assembly?id=${assemblyId}`, type: 'String', id: pid })
                                        .then(Transformer.Molecule.CreateFromData, { format: LiteMol.Core.Formats.Molecule.SupportedFormats.mmCIF }, { isBinding: true })
                                        .then(Transformer.Molecule.CreateModel, { modelIndex: 0 })
                                        .then(Transformer.Molecule.CreateMacromoleculeVisual, { polymer: true, polymerRef: 'polymer-visual', het: true });
                                    let faj = plugin.applyTransform(model)
                                        .then(() => {
                                        if (plugin.context.select('polymer-visual').length !== 1) {
                                            rej("Application was unable to retrieve protein structure from coordinate server.");
                                        }
                                        plugin.command(LiteMol.Bootstrap.Command.Entity.Focus, plugin.context.select('polymer-visual'));
                                        res(null);
                                    });
                                }
                            });
                        }
                        else {
                            let model = plugin.createTransform()
                                .add(plugin.root, Transformer.Data.Download, { url: `https://alphafill.eu/v1/aff/${pid.toUpperCase()}`, type: 'String', id: pid })
                                .then(Transformer.Molecule.CreateFromData, { format: LiteMol.Core.Formats.Molecule.SupportedFormats.mmCIF }, { isBinding: true })
                                .then(Transformer.Molecule.CreateModel, { modelIndex: 0 })
                                .then(Transformer.Molecule.CreateMacromoleculeVisual, { polymer: true, polymerRef: 'polymer-visual', het: true });
                            let faj = plugin.applyTransform(model)
                                .then(() => {
                                if (plugin.context.select('polymer-visual').length !== 1) {
                                    rej("Application was unable to retrieve protein structure from coordinate server.");
                                }
                                plugin.command(LiteMol.Bootstrap.Command.Entity.Focus, plugin.context.select('polymer-visual'));
                                res(null);
                            });
                        }
                    });
                    /*
                    let model = plugin.createTransform()
                            .add(plugin.root, Transformer.Data.Download, { url: `http://www.ebi.ac.uk/pdbe/coordinates/${pdbId}/assembly?id=1`, type: 'String', id: pdbId })
                            .then(Transformer.Molecule.CreateFromData, { format: Core.Formats.Molecule.SupportedFormats.mmCIF }, { isBinding: true })
                            .then(Transformer.Molecule.CreateModel, { modelIndex: 0 })
                            .then(Transformer.Molecule.CreateMacromoleculeVisual, { polymer: true, polymerRef: 'polymer-visual', het: true })
                    */
                    let data = plugin.createTransform().add(plugin.root, Transformer.Data.Download, { url: subDB === "pdb" ? `${url}/channels/${subDB}/${pid}` : `${url}/channels/${subDB}/${pid.toLowerCase()}`, type: 'String', id: 'MOLE Data' }, { isHidden: false })
                        .then(Transformer.Data.ParseJson, { id: 'MOLE Data' }, { ref: 'channelsDB-data' });
                    let annotationData = plugin.createTransform().add(plugin.root, Transformer.Data.Download, { url: subDB === "pdb" ? `${url}/annotations/${subDB}/${pid}` : `${url}/annotations/${subDB}/${pid.toLowerCase()}`, type: 'String', id: 'ChannelDB annotation Data' }, { isHidden: false })
                        .then(Transformer.Data.ParseJson, { id: 'ChannelDB annotation Data' }, { ref: 'channelsDB-annotation-data' });
                    let promises = [];
                    promises.push(modelLoadPromise);
                    /*
                    promises.push(plugin.applyTransform(model)
                        .then(() => {
                            plugin.command(Bootstrap.Command.Entity.Focus, plugin.context.select('polymer-visual'));
                        }));
                    */
                    promises.push(plugin.applyTransform(data)
                        .then(() => {
                        let parsedData = plugin.context.select('channelsDB-data')[0];
                        if (!parsedData)
                            throw new Error('Data not available.');
                        else {
                            let data_ = parsedData.props.data;
                            showDefaultVisuals(plugin, data_.Channels, /*data_.Channels.length*/ 2); /*.then(() => res(data_.Channels));*/
                        }
                    }));
                    //promises.push(plugin.applyTransform(annotationData));
                    plugin.applyTransform(annotationData); //Annotations se donačtou později -> nebude se na ně čekat s vykreslováním UI
                    return LiteMol.Promise.all(promises);
                }
                State.loadData = loadData;
                function createSurface(mesh) {
                    // wrap the vertices in typed arrays
                    if (!(mesh.Vertices instanceof Float32Array)) {
                        mesh.Vertices = new Float32Array(mesh.Vertices);
                    }
                    if (!(mesh.Vertices instanceof Uint32Array)) {
                        mesh.Triangles = new Uint32Array(mesh.Triangles);
                    }
                    let surface = {
                        vertices: mesh.Vertices,
                        vertexCount: (mesh.Vertices.length / 3) | 0,
                        triangleIndices: new Uint32Array(mesh.Triangles),
                        triangleCount: (mesh.Triangles.length / 3) | 0,
                    };
                    return surface;
                }
                let colorIndex = LiteMol.Visualization.Molecule.Colors.DefaultPallete.length - 1;
                function nextColor() {
                    return LiteMol.Visualization.Color.random();
                    // can use the build in palette for example like this:
                    // let color = Visualization.Molecule.Colors.DefaultPallete[colorIndex];
                    // colorIndex--;
                    // if (colorIndex < 0) colorIndex = Visualization.Molecule.Colors.DefaultPallete.length - 1;
                    // return color;
                }
                function getBoundingBox(centerline) {
                    let first = centerline[0];
                    let minX = first.X - first.Radius, minY = first.Y - first.Radius, minZ = first.Z - first.Radius;
                    let maxX = first.X + first.Radius, maxY = first.Y + first.Radius, maxZ = first.Z + first.Radius;
                    for (let s of centerline) {
                        minX = Math.min(minX, s.X - s.Radius);
                        maxX = Math.max(minX, s.X + s.Radius);
                        minY = Math.min(minY, s.Y - s.Radius);
                        maxY = Math.max(minY, s.Y + s.Radius);
                        minX = Math.min(minZ, s.Z - s.Radius);
                        maxX = Math.max(minZ, s.Z + s.Radius);
                    }
                    let bottomLeft = LiteMol.Core.Geometry.LinearAlgebra.Vector3(minX, minY, minZ);
                    let topRight = LiteMol.Core.Geometry.LinearAlgebra.Vector3(maxX, maxY, maxZ);
                    return { bottomLeft, topRight };
                }
                function getDensity(boundingBox) {
                    const box = LiteMol.Core.Geometry.LinearAlgebra.Vector3.sub(boundingBox.topRight, boundingBox.topRight, boundingBox.bottomLeft);
                    const density = Math.pow(((Math.pow(99, 3)) / (box[0] * box[1] * box[2])), (1 / 3));
                    if (density > 4)
                        return 4;
                    if (density < 0.1)
                        return 0.1;
                    return density;
                }
                //Added
                function createTunnelSurfaceMarchCubes(sphereArray) {
                    let idxFilter = 1;
                    let posTableBuilder = LiteMol.Core.Utils.DataTable.builder(Math.ceil(sphereArray.length / idxFilter));
                    posTableBuilder.addColumn("x", LiteMol.Core.Utils.DataTable.customColumn());
                    posTableBuilder.addColumn("y", LiteMol.Core.Utils.DataTable.customColumn());
                    posTableBuilder.addColumn("z", LiteMol.Core.Utils.DataTable.customColumn());
                    let rowIdx = 0;
                    let positions = posTableBuilder.seal();
                    let sphereCounter = 0;
                    for (let sphere of sphereArray) {
                        sphereCounter++;
                        if ((sphereCounter - 1) % idxFilter !== 0) {
                            continue;
                        }
                        positions.x[rowIdx] = sphere.X.valueOf();
                        positions.y[rowIdx] = sphere.Y.valueOf();
                        positions.z[rowIdx] = sphere.Z.valueOf();
                        rowIdx++;
                    }
                    return LiteMol.Core.Geometry.MolecularSurface.computeMolecularSurfaceAsync({
                        positions,
                        atomIndices: positions.indices,
                        parameters: {
                            atomRadius: ((i) => {
                                return sphereArray[i * idxFilter].Radius.valueOf();
                            }),
                            density: getDensity(getBoundingBox(sphereArray)),
                            probeRadius: 0,
                            smoothingIterations: 4,
                            interactive: false,
                        },
                    }).run();
                }
                function createSphere(radius, center, id, tessalation) {
                    if (id === void 0) {
                        id = 0;
                    }
                    if (tessalation === void 0) {
                        tessalation = 1;
                    }
                    return { type: 'Sphere', id: 0, radius, center: [center.x, center.y, center.z], tessalation };
                }
                //Added
                function createTunnelSurface(sphereArray) {
                    let s = LiteMol.Visualization.Primitive.Builder.create();
                    let id = 0;
                    let idxFilter = 1;
                    let idxCounter = 0;
                    for (let sphere of sphereArray) {
                        idxCounter++;
                        if ((idxCounter - 1) % idxFilter !== 0) {
                            continue;
                        }
                        let center = { x: sphere.X, y: sphere.Y, z: sphere.Z };
                        s.add(createSphere(sphere.Radius, center, 0, 2));
                    }
                    return s.buildSurface().run();
                }
                function adjustRadius(profileRadius, maxProfileRadius, maxLayerRadius) {
                    return (maxLayerRadius / maxProfileRadius) * profileRadius;
                }
                function getLayerRadiusByDistance(distance, layers, lastLayerIdx) {
                    let __start = layers.LayersInfo[lastLayerIdx].LayerGeometry.StartDistance;
                    let __end = layers.LayersInfo[lastLayerIdx].LayerGeometry.EndDistance;
                    let __s = Math.max(__start, distance);
                    let __e = Math.min(__end, distance);
                    //console.log({__start,__end,__s,__e,distance,lastLayerIdx});
                    if (__e - __s === 0) {
                        return layers.LayersInfo[lastLayerIdx].LayerGeometry.MinRadius;
                    }
                    lastLayerIdx++;
                    if (lastLayerIdx === layers.LayersInfo.length) {
                        return 0;
                    }
                    return getLayerRadiusByDistance(distance, layers, lastLayerIdx);
                }
                function buildRingSurface(s, spheres, id, parts = 8) {
                    let sphere = spheres[id];
                    if (id === 0 || id === spheres.length - 1) {
                        //{ type: 'Sphere', id, radius: sphere.Radius, center: [sphere.X, sphere.Y, sphere.Z ], tessalation: 2 }
                        s.add(createSphere(sphere.Radius, { x: sphere.X, y: sphere.Y, z: sphere.Z }, 0, 2));
                        return;
                    }
                    ;
                    let prevSphere = spheres[id - 1];
                    let nextSphere = spheres[id + 1];
                    let normalize = (vec3) => {
                        let __divisor = Math.max(Math.abs(vec3.x), Math.abs(vec3.y), Math.abs(vec3.z));
                        if (__divisor === 0) {
                            return vec3;
                        }
                        return { x: vec3.x / __divisor, y: vec3.y / __divisor, z: vec3.z / __divisor };
                    };
                    let greatest = (vec3) => {
                        let __max = Math.max(Math.abs(vec3.x), Math.abs(vec3.y), Math.abs(vec3.z));
                        return (__max === vec3.x) ? 0 : (__max === vec3.y) ? 1 : 2;
                    };
                    let rotateByMat = (vec3, mat) => {
                        return multiplyMatVec(mat, vec3);
                    };
                    //OK
                    let multiplyMatMat = (m1, m2) => {
                        let mat = [];
                        for (let m1r = 0; m1r < 3; m1r++) {
                            let row = [];
                            for (let m2c = 0; m2c < 3; m2c++) {
                                let a = 0;
                                for (let m2r = 0; m2r < 3; m2r++) {
                                    a += m1[m1r][m2r] * m2[m2r][m2c];
                                }
                                row.push(a);
                            }
                            mat.push(row);
                        }
                        return mat;
                    };
                    let tstMat1 = [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9]
                    ];
                    let tstMat2 = [
                        [9, 8, 7],
                        [6, 5, 4],
                        [3, 2, 1]
                    ];
                    //console.log("TSTMAT:");
                    //console.log(multiplyMatMat(tstMat1,tstMat2));
                    //OK
                    let multiplyMatVec = (m, v) => {
                        let __u = [];
                        for (let row = 0; row < 3; row++) {
                            __u.push(m[row][0] * v.x + m[row][1] * v.y + m[row][2] * v.z);
                        }
                        return {
                            x: __u[0],
                            y: __u[1],
                            z: __u[2]
                        };
                    };
                    //console.log("TSTMATVEC:");
                    //console.log(multiplyMatVec(tstMat1,{x:1,y:2,z:3}));
                    let toRad = (degrees) => {
                        return (degrees * Math.PI) / 180;
                    };
                    let Rx = (radFi) => {
                        return [
                            [1, 0, 0],
                            [0, Math.cos(radFi), -Math.sin(radFi)],
                            [0, Math.sin(radFi), Math.cos(radFi)]
                        ];
                    };
                    let Ry = (radFi) => {
                        return [
                            [Math.cos(radFi), 0, Math.sin(radFi)],
                            [0, 1, 0],
                            [-Math.sin(radFi), 0, Math.cos(radFi)]
                        ];
                    };
                    let Rz = (radFi) => {
                        return [
                            [Math.cos(radFi), -Math.sin(radFi), 0],
                            [Math.sin(radFi), Math.cos(radFi), 0],
                            [0, 0, 1]
                        ];
                    };
                    let Rxy = (radFi) => {
                        return multiplyMatMat(Rx(radFi), Ry(radFi));
                    };
                    let Ryz = (radFi) => {
                        return multiplyMatMat(Ry(radFi), Rz(radFi));
                    };
                    let Rxz = (radFi) => {
                        return multiplyMatMat(Rx(radFi), Rz(radFi));
                    };
                    let n = {
                        x: nextSphere.X - prevSphere.X,
                        y: nextSphere.Y - prevSphere.Y,
                        z: nextSphere.Z - prevSphere.Z
                    };
                    n = normalize(n);
                    let majorAxis = greatest(n);
                    let v;
                    switch (majorAxis) {
                        case 0:
                            v = rotateByMat(n, Rz(toRad(90)));
                            break;
                        case 1:
                            v = rotateByMat(n, Rx(toRad(90)));
                            break;
                        default:
                            v = rotateByMat(n, Ry(toRad(90)));
                            break;
                    }
                    let radius = (2 * Math.PI * sphere.Radius) / parts;
                    for (let i = 0; i < parts; i++) {
                        let u;
                        switch (majorAxis) {
                            case 0:
                                u = rotateByMat(n, Rxy(toRad(i * (360 / parts))));
                                break;
                            case 1:
                                u = rotateByMat(n, Ryz(toRad(i * (360 / parts))));
                                break;
                            default:
                                u = rotateByMat(n, Rxz(toRad(i * (360 / parts))));
                                break;
                        }
                        u = normalize(u);
                        let center = {
                            x: sphere.X + u.x * sphere.Radius,
                            y: sphere.Y + u.y * sphere.Radius,
                            z: sphere.Z + u.z * sphere.Radius
                        };
                        //{ type: 'Sphere', id, radius:1, center, tessalation: 2 }
                        s.add(createSphere(1, center, id, 2));
                    }
                }
                //Added
                function createTunnelSurfaceWithLayers(sphereArray, layers) {
                    //let layerProfileMap = new Map<number,>
                    let id = 0;
                    //let promises = [];
                    let s = LiteMol.Visualization.Primitive.Builder.create();
                    for (let sphere of sphereArray) {
                        buildRingSurface(s, sphereArray, id++);
                    }
                    return s.buildSurface().run();
                    /*
                            return Promise.all(promises).then(res => {
                                let s = Visualization.Primitive.Builder.create();
                                for(let i = 0;i<res.length;i++){
                                    s.add({type:'Surface', surface: res[i], id:i});
                                }
                                return s.buildSurface().run();
                            });
                      */
                }
                function showSurfaceVisuals(plugin, elements, visible, type, label, alpha) {
                    // I am modifying the original JSON response. In general this is not a very good
                    // idea and should be avoided in "real" apps.
                    let t = plugin.createTransform();
                    let needsApply = false;
                    for (let element of elements) {
                        if (!element.__id)
                            element.__id = LiteMol.Bootstrap.Utils.generateUUID();
                        //console.log(!!element.__isVisible);
                        if (!!element.__isVisible === visible)
                            continue;
                        //console.log("for 1");
                        element.__isVisible = visible;
                        if (!element.__color) {
                            // the colors should probably be initialized when the data is loaded
                            // so that they are deterministic...
                            element.__color = nextColor();
                            //console.log("got new color");
                        }
                        if (!visible) {
                            //console.log("node removed");
                            plugin.command(LiteMol.Bootstrap.Command.Tree.RemoveNode, element.__id);
                        }
                        else {
                            //console.log("creating surface from mesh");
                            //console.log(element.Mesh);
                            let surface = createSurface(element.Mesh);
                            t.add('channelsDB-data', State.CreateSurface, {
                                label: label(element),
                                tag: { type, element },
                                surface,
                                color: element.__color,
                                isInteractive: true,
                                transparency: { alpha }
                            }, { ref: element.__id, isHidden: true });
                            needsApply = true;
                        }
                    }
                    if (needsApply) {
                        //console.log("needs apply = true");
                        return new LiteMol.Promise((res, rej) => {
                            plugin.applyTransform(t).then(() => {
                                for (let element of elements) {
                                    element.__isBusy = false;
                                }
                                res(null);
                            }).catch(e => rej(e));
                        });
                    }
                    else {
                        //console.log("needs apply = false");
                        return new LiteMol.Promise((res, rej) => {
                            for (let element of elements) {
                                element.__isBusy = false;
                            }
                            res(null);
                        });
                    }
                }
                function showCavityVisuals(plugin, cavities, visible) {
                    return showSurfaceVisuals(plugin, cavities, visible, 'Cavity', (cavity) => `${cavity.Type} ${cavity.Id}`, 0.33);
                }
                State.showCavityVisuals = showCavityVisuals;
                ;
                //Modified
                function showChannelVisuals(plugin, channels, visible) {
                    let label = (channel) => `${channel.Type} ${channel.Id + 1}`;
                    /*let type = "Channel";*/
                    let alpha = 1.0;
                    let promises = [];
                    for (let channel of channels) {
                        // Stejné jako v Examples/Channels
                        if (!channel.__id)
                            channel.__id = LiteMol.Bootstrap.Utils.generateUUID();
                        if (!!channel.__isVisible === visible)
                            continue;
                        channel.__isVisible = visible;
                        if (!channel.__color) {
                            // the colors should probably be initialized when the data is loaded
                            // so that they are deterministic...
                            channel.__color = nextColor();
                        }
                        if (!visible) {
                            plugin.command(LiteMol.Bootstrap.Command.Tree.RemoveNode, channel.__id);
                        }
                        else {
                            //Zde se volá mnou vytvořená funkce pro generování povrchu podle koulí z JSONu(u nás zatím Centerline, u Vás Profile)
                            let sphereSurfacePromise = /*createTunnelSurface(channel.Profile);*/ createTunnelSurfaceMarchCubes(channel.Profile); //createTunnelSurfaceWithLayers(channel.Profile, channel.Layers);
                            promises.push(new LiteMol.Promise((res, rej) => {
                                //Zpracování úspěšně vygenerovného povrchu tunelu
                                sphereSurfacePromise.then((val) => {
                                    let surface = val;
                                    /*
                                    if(surface.surface.annotation !== void 0){
                                        console.log("---");
                                        console.log(`annotations length: ${surface.surface.annotation.length}`);
                                        console.log(`profile parts count: ${channel.Profile.length}`);
                                        console.log("---");
                                        for(let i=0;i<surface.surface.annotation.length;i++){
                                            surface.surface.annotation[i] = 0;
                                            //console.log(`surface.annotation: ${surface.surface.annotation[i]}`);
                                        }
                                    }
                                    */
                                    let t = plugin.createTransform();
                                    t.add('channelsDB-data', State.CreateSurface, {
                                        label: label(channel),
                                        tag: { type: channel.Type, element: channel },
                                        surface: surface.surface,
                                        color: channel.__color,
                                        isInteractive: true,
                                        transparency: { alpha },
                                    }, { ref: channel.__id, isHidden: true });
                                    plugin.applyTransform(t)
                                        .then(() => {
                                        res(null);
                                    })
                                        .catch((err) => {
                                        rej(err);
                                    });
                                }).catch((err) => {
                                    rej(err);
                                });
                            }));
                        }
                    }
                    return LiteMol.Promise.all(promises).then(() => {
                        for (let channel of channels) {
                            channel.__isBusy = false;
                        }
                    });
                }
                State.showChannelVisuals = showChannelVisuals;
                function createOriginsSurface(origins) {
                    if (origins.__surface)
                        return LiteMol.Promise.resolve(origins.__surface);
                    let s = LiteMol.Visualization.Primitive.Builder.create();
                    let id = 0;
                    for (let p of origins.Points) {
                        //{ type: 'Sphere', id: id++, radius: 1.69, center: [p.X, p.Y, p.Z] }
                        s.add(createSphere(1.69, { x: p.X, y: p.Y, z: p.Z }, id++));
                    }
                    return s.buildSurface().run();
                }
                function showOriginsSurface(plugin, origins, visible) {
                    if (!origins.__id)
                        origins.__id = LiteMol.Bootstrap.Utils.generateUUID();
                    if (!origins.Points.length || !!origins.__isVisible === visible)
                        return LiteMol.Promise.resolve();
                    origins.__isVisible = visible;
                    if (!visible) {
                        plugin.command(LiteMol.Bootstrap.Command.Tree.RemoveNode, origins.__id);
                        origins.__isBusy = false;
                        return LiteMol.Promise.resolve();
                    }
                    if (!origins.__color) {
                        // the colors should probably be initialized when the data is loaded
                        // so that they are deterministic...
                        origins.__color = nextColor();
                    }
                    return new LiteMol.Promise((res, rej) => {
                        createOriginsSurface(origins).then(surface => {
                            let t = plugin.createTransform()
                                .add('channelsDB-data', State.CreateSurface, {
                                label: 'Origins ' + origins.Type,
                                tag: { type: 'Origins', element: origins },
                                surface,
                                isInteractive: true,
                                color: origins.__color
                            }, { ref: origins.__id, isHidden: true });
                            plugin.applyTransform(t).then(() => {
                                origins.__isBusy = false;
                                res(null);
                            }).catch(rej);
                        }).catch(rej);
                    });
                }
                State.showOriginsSurface = showOriginsSurface;
                State.CreateSurface = LiteMol.Bootstrap.Tree.Transformer.create({
                    id: 'mole-example-create-surface',
                    name: 'Create Surface',
                    description: 'Create a surface entity.',
                    from: [LiteMol.Bootstrap.Entity.Data.Json],
                    to: [LiteMol.Bootstrap.Entity.Visual.Surface],
                    defaultParams: () => ({}),
                    isUpdatable: false
                }, (context, a, t) => {
                    let theme = LiteMol.Visualization.Theme.createUniform({ colors: LiteMol.Core.Utils.FastMap.ofArray([['Uniform', t.params.color]]), interactive: t.params.isInteractive, transparency: t.params.transparency });
                    let style = {
                        type: 'Surface',
                        taskType: 'Silent',
                        //isNotSelectable: false,
                        params: {},
                        theme: void 0
                    };
                    return LiteMol.Bootstrap.Task.create(`Create Surface`, 'Silent', (ctx) => __awaiter(this, void 0, void 0, function* () {
                        const model = yield LiteMol.Visualization.Surface.Model.create(t.params.tag, { surface: t.params.surface, theme, parameters: { isWireframe: t.params.isWireframe } }).run(ctx);
                        return LiteMol.Bootstrap.Entity.Visual.Surface.create(t, { label: t.params.label, model, style, isSelectable: true, tag: t.params.tag });
                    }));
                });
            })(State = Channels.State || (Channels.State = {}));
        })(Channels = Example.Channels || (Example.Channels = {}));
    })(Example = LiteMol.Example || (LiteMol.Example = {}));
})(LiteMol || (LiteMol = {}));
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
var LiteMol;
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
(function (LiteMol) {
    var Example;
    (function (Example) {
        var Channels;
        (function (Channels_1) {
            var UI;
            (function (UI) {
                var React = LiteMol.Plugin.React;
                function render(plugin, target) {
                    LiteMol.Plugin.ReactDOM.render(React.createElement(App, { plugin: plugin }), target);
                }
                UI.render = render;
                class App extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { isLoading: false, data: void 0, error: void 0 };
                    }
                    componentDidMount() {
                        this.load();
                        $(window).on("contentResize", this.onContentResize.bind(this));
                    }
                    onContentResize(_) {
                        let prevState = this.props.plugin.context.layout.latestState;
                        this.props.plugin.setLayoutState({ isExpanded: true });
                        this.props.plugin.setLayoutState(prevState);
                    }
                    load() {
                        this.currentProteinId = SimpleRouter.GlobalRouter.getCurrentPid();
                        this.subDB = SimpleRouter.GlobalRouter.getCurrentDB();
                        let channelsURL = SimpleRouter.GlobalRouter.getChannelsURL();
                        this.setState({ isLoading: true, error: void 0 });
                        Channels_1.State.loadData(this.props.plugin, this.currentProteinId, channelsURL, this.subDB) //'channels.json'
                            .then(data => {
                            //console.log("loading done ok");
                            let _data = this.props.plugin.context.select("channelsDB-data")[0].props.data;
                            if (_data.Error !== void 0) {
                                this.setState({ isLoading: false, error: _data.Error });
                            }
                            else {
                                this.setState({
                                    isLoading: false, data: _data
                                });
                            }
                        })
                            .catch(e => {
                            console.log(`ERR on loading: ${e}`);
                            this.setState({ isLoading: false, error: 'Application was unable to load data. Please try again later.' });
                        });
                    }
                    render() {
                        if (this.state.data) {
                            return React.createElement(Data, { data: this.state.data, plugin: this.props.plugin });
                        }
                        else {
                            let controls = [];
                            if (this.state.isLoading) {
                                controls.push(React.createElement("h1", null, "Loading..."));
                            }
                            else {
                                if (this.state.error) {
                                    let error = this.state.error;
                                    let errorMessage = (error === void 0) ? "" : error;
                                    controls.push(React.createElement("div", { className: "error-message" },
                                        React.createElement("div", null,
                                            React.createElement("b", null, "Data for specified protein are not available.")),
                                        React.createElement("div", null,
                                            React.createElement("b", null, "Reason:"),
                                            " ",
                                            React.createElement("i", { dangerouslySetInnerHTML: { __html: errorMessage } }))));
                                }
                                controls.push(React.createElement("button", { className: "reload-data btn btn-primary", onClick: () => this.load() }, "Reload Data"));
                            }
                            return React.createElement("div", null, controls);
                        }
                    }
                }
                UI.App = App;
                class Data extends React.Component {
                    render() {
                        return React.createElement("div", null,
                            React.createElement(Selection, Object.assign({}, this.props)),
                            React.createElement("div", { className: "ui-header" }, "Channels"),
                            React.createElement("div", null,
                                this.props.data.Channels.ReviewedChannels_MOLE.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.ReviewedChannels_MOLE, state: this.props, header: 'Reviewed Channels MOLE' }) : null,
                                this.props.data.Channels.ReviewedChannels_Caver.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.ReviewedChannels_Caver, state: this.props, header: 'Reviewed Channels Caver' }) : null,
                                this.props.data.Channels.CSATunnels_MOLE.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.CSATunnels_MOLE, state: this.props, header: 'CSA Tunnels MOLE' }) : null,
                                this.props.data.Channels.CSATunnels_Caver.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.CSATunnels_Caver, state: this.props, header: 'CSA Tunnels Caver' }) : null,
                                this.props.data.Channels.TransmembranePores_MOLE.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.TransmembranePores_MOLE, state: this.props, header: 'Transmembrane Pores MOLE' }) : null,
                                this.props.data.Channels.TransmembranePores_Caver.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.TransmembranePores_Caver, state: this.props, header: 'Transmembrane Pores Caver' }) : null,
                                this.props.data.Channels.CofactorTunnels_MOLE.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.CofactorTunnels_MOLE, state: this.props, header: 'Cofactor Tunnels MOLE' }) : null,
                                this.props.data.Channels.CofactorTunnels_Caver.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.CofactorTunnels_Caver, state: this.props, header: 'Cofactor Tunnels Caver' }) : null,
                                this.props.data.Channels.ProcognateTunnels_MOLE.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.ProcognateTunnels_MOLE, state: this.props, header: 'COGNATE Tunnels MOLE' }) : null,
                                this.props.data.Channels.ProcagnateTunnels_Caver.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.ProcagnateTunnels_Caver, state: this.props, header: 'COGNATE Tunnels Caver' }) : null,
                                this.props.data.Channels.AlphaFillTunnels_MOLE.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.AlphaFillTunnels_MOLE, state: this.props, header: 'AlphaFill Tunnels MOLE' }) : null,
                                this.props.data.Channels.AlphaFillTunnels_Caver.length > 0 ? React.createElement(Channels, { channels: this.props.data.Channels.AlphaFillTunnels_Caver, state: this.props, header: 'AlphaFill Tunnels Caver' }) : null));
                        /*
                        <h2>Empty Space</h2>
                            <Cavities cavities={[this.props.data.Cavities.Surface]} state={this.props} header='Surface' />
                            <Cavities cavities={this.props.data.Cavities.Cavities} state={this.props} header='Cavities' />
                            <Cavities cavities={this.props.data.Cavities.Voids} state={this.props} header='Voids' />
                            
                            <h2>Origins</h2>
                            <Origins origins={this.props.data.Origins.User} {...this.props} label='User Specifed (optimized)' />
                            <Origins origins={this.props.data.Origins.InputOrigins} {...this.props} label='User Specifed' />
                            <Origins origins={this.props.data.Origins.Computed} {...this.props} label='Computed' />
                            <Origins origins={this.props.data.Origins.Database} {...this.props} label='Database' />
                         */
                    }
                }
                UI.Data = Data;
                ;
                class Selection extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { label: void 0 };
                        this.observer = void 0;
                        this.observerChannels = void 0;
                    }
                    componentWillMount() {
                        CommonUtils.Selection.SelectionHelper.attachOnResidueSelectHandler(((r) => {
                            this.setState({ label: `${r.name} ${r.authSeqNumber} ${r.chain.authAsymId}` });
                        }).bind(this));
                        CommonUtils.Selection.SelectionHelper.attachOnResidueLightSelectHandler(((r) => {
                            let name = CommonUtils.Residues.getName(r.authSeqNumber, this.props.plugin);
                            this.setState({ label: `${name} ${r.authSeqNumber} ${r.chain.authAsymId}` });
                        }).bind(this));
                        CommonUtils.Selection.SelectionHelper.attachOnResidueBulkSelectHandler(((r) => {
                            let label = r.map((val, idx, array) => {
                                let name = CommonUtils.Residues.getName(val.authSeqNumber, this.props.plugin);
                                return `${name}&nbsp;${val.authSeqNumber}&nbsp;${val.chain.authAsymId}`;
                            }).reduce((prev, cur, idx, array) => {
                                return `${prev}${(idx === 0) ? '' : ',\n'}${cur}`;
                            });
                            let items = label.split('\n');
                            let elements = [];
                            for (let e of items) {
                                let lineParts = e.split('&nbsp;');
                                elements.push(React.createElement("div", null,
                                    lineParts[0],
                                    "\u00A0",
                                    lineParts[1],
                                    "\u00A0",
                                    lineParts[2]));
                            }
                            this.setState({
                                label: React.createElement("div", { className: "columns" }, elements)
                            });
                        }).bind(this));
                        CommonUtils.Selection.SelectionHelper.attachOnClearSelectionHandler((() => {
                            this.setState({ label: void 0 });
                        }).bind(this));
                        this.observer = this.props.plugin.subscribe(LiteMol.Bootstrap.Event.Molecule.ModelSelect, e => {
                            if (e.data) {
                                let r = e.data.residues[0];
                                CommonUtils.Selection.SelectionHelper.selectResidueWithBallsAndSticks(this.props.plugin, r);
                                if (!CommonUtils.Selection.SelectionHelper.isSelectedAny()) {
                                    this.setState({ label: void 0 });
                                }
                            }
                        });
                        this.observerChannels = this.props.plugin.subscribe(LiteMol.Bootstrap.Event.Visual.VisualSelectElement, e => {
                            let eventData = e.data;
                            console.log(eventData);
                            if (e.data !== void 0 && eventData.source !== void 0 && eventData.source.props !== void 0 && eventData.source.props.tag === void 0) {
                                return;
                            }
                            if (e.data && (eventData === void 0 || e.data.kind !== 0)) {
                                if (CommonUtils.Selection.SelectionHelper.isSelectedAnyChannel()) {
                                    let data = e.data;
                                    let c = data.source.props.tag.element;
                                    let len = CommonUtils.Tunnels.getLength(c);
                                    //let bneck = CommonUtils.Tunnels.getBottleneck(c);
                                    let annotation = Annotation.AnnotationDataProvider.getChannelAnnotation(c.Id);
                                    if (annotation === void 0 || annotation === null) {
                                        this.setState({ label: React.createElement("span", null,
                                                React.createElement("b", null, c.Type),
                                                ", ",
                                                `Length: ${len} Å`) });
                                    }
                                    else {
                                        this.setState({ label: React.createElement("span", null,
                                                React.createElement("b", null, annotation.text),
                                                ", Length: ",
                                                len,
                                                " \u00C5") });
                                    }
                                }
                                else if (!CommonUtils.Selection.SelectionHelper.isSelectedAny()) {
                                    this.setState({ label: void 0 });
                                }
                            }
                        });
                        console.log(this.observerChannels);
                    }
                    componentWillUnmount() {
                        if (this.observer) {
                            this.observer.dispose();
                            this.observer = void 0;
                        }
                        if (this.observerChannels) {
                            this.observerChannels.dispose();
                            this.observerChannels = void 0;
                        }
                    }
                    render() {
                        return React.createElement("div", null,
                            React.createElement("div", { className: "ui-selection-header" }, "Selection"),
                            React.createElement("div", { className: "ui-selection" }, !this.state.label
                                ? React.createElement("i", null, "Click on residue or channel")
                                : this.state.label));
                    }
                }
                UI.Selection = Selection;
                class Section extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { isExpanded: false };
                    }
                    toggle(e) {
                        e.preventDefault();
                        this.setState({ isExpanded: !this.state.isExpanded });
                    }
                    render() {
                        return React.createElement("div", { className: "ui-item-container", style: { position: 'relative' } },
                            React.createElement("div", { className: "ui-subheader" },
                                React.createElement("a", { href: '#', onClick: e => this.toggle(e), className: 'section-header' },
                                    React.createElement("div", { style: { width: '15px', display: 'inline-block', textAlign: 'center' } }, this.state.isExpanded ? '-' : '+'),
                                    " ",
                                    this.props.header,
                                    " (",
                                    this.props.count,
                                    ")")),
                            React.createElement("div", { style: { display: this.state.isExpanded ? 'block' : 'none' } }, this.props.children));
                    }
                }
                UI.Section = Section;
                class Renderable extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { isAnnotationsVisible: false };
                    }
                    toggle() {
                        this.props.element.__isBusy = true;
                        this.forceUpdate(() => this.props.toggle(this.props.plugin, [this.props.element], !this.props.element.__isVisible)
                            .then(() => this.forceUpdate()).catch(() => this.forceUpdate()));
                    }
                    highlight(isOn) {
                        this.props.plugin.command(LiteMol.Bootstrap.Command.Entity.Highlight, { entities: this.props.plugin.context.select(this.props.element.__id), isOn });
                    }
                    toggleAnnotations(e) {
                        this.setState({ isAnnotationsVisible: !this.state.isAnnotationsVisible });
                    }
                    getAnnotationToggler() {
                        return [(this.state.isAnnotationsVisible)
                                ? React.createElement("span", { className: "hand glyphicon glyphicon-chevron-up", title: "Hide list annotations for this channel", onClick: this.toggleAnnotations.bind(this) })
                                : React.createElement("span", { className: "hand glyphicon glyphicon-chevron-down", title: "Show all annotations available for this channel", onClick: this.toggleAnnotations.bind(this) })];
                    }
                    getAnnotationsElements() {
                        if (this.props.annotations === void 0) {
                            return [];
                        }
                        if (!this.state.isAnnotationsVisible) {
                            return [];
                        }
                        let elements = [];
                        for (let annotation of this.props.annotations) {
                            let reference = React.createElement("i", null, "(No reference provided)");
                            if (annotation.reference !== "") {
                                reference = React.createElement("a", { target: "_blank", href: annotation.link },
                                    annotation.reference,
                                    " ",
                                    React.createElement("span", { className: "glyphicon glyphicon-new-window" }));
                            }
                            elements.push(React.createElement("div", { className: "annotation-line" },
                                React.createElement("span", { className: "bullet" }),
                                " ",
                                React.createElement("b", null, annotation.text),
                                ", ",
                                reference));
                        }
                        return elements;
                    }
                    render() {
                        let emptyToggler = React.createElement("span", { className: "disabled glyphicon glyphicon-chevron-down", title: "No annotations available for this channel", onClick: this.toggleAnnotations.bind(this) });
                        return React.createElement("div", { className: "ui-label" },
                            React.createElement("input", { type: 'checkbox', checked: !!this.props.element.__isVisible, onChange: () => this.toggle(), disabled: !!this.props.element.__isBusy }),
                            React.createElement("label", { className: "ui-label-element", onMouseEnter: () => this.highlight(true), onMouseLeave: () => this.highlight(false) },
                                (this.props.annotations !== void 0 && this.props.annotations.length > 0) ? this.getAnnotationToggler() : emptyToggler,
                                " ",
                                this.props.label),
                            this.getAnnotationsElements());
                    }
                }
                UI.Renderable = Renderable;
                class Channels extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { isBusy: false };
                    }
                    show(visible) {
                        for (let element of this.props.channels) {
                            element.__isBusy = true;
                        }
                        this.setState({ isBusy: true }, () => Channels_1.State.showChannelVisuals(this.props.state.plugin, this.props.channels, visible)
                            .then(() => this.setState({ isBusy: false })).catch(() => this.setState({ isBusy: false })));
                    }
                    isDisabled() {
                        return !this.props.channels || (this.props.channels !== void 0 && this.props.channels.length == 0);
                    }
                    render() {
                        return React.createElement(Section, { header: this.props.header, count: (this.props.channels || '').length },
                            React.createElement("div", { className: 'ui-show-all' },
                                React.createElement("button", { className: "btn btn-primary btn-xs bt-all", onClick: () => this.show(true), disabled: this.state.isBusy || this.isDisabled() }, "All"),
                                React.createElement("button", { className: "btn btn-primary btn-xs bt-none", onClick: () => this.show(false), disabled: this.state.isBusy || this.isDisabled() }, "None")),
                            this.props.channels && this.props.channels.length > 0
                                ? this.props.channels.map((c, i) => React.createElement(Channel, { key: i, channel: c, state: this.props.state }))
                                : React.createElement("div", { className: "ui-label ui-no-data-available" }, "No data available..."));
                    }
                }
                UI.Channels = Channels;
                class Channel extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { isVisible: false, isWaitingForData: false };
                    }
                    componentDidMount() {
                        Bridge.Events.subscribeChannelSelect(((channelId) => {
                            if (this.props.channel.Id === channelId) {
                                this.selectChannel();
                            }
                        }).bind(this));
                    }
                    dataWaitHandler() {
                        let state = this.state;
                        state.isWaitingForData = false;
                        this.setState(state);
                    }
                    invokeDataWait() {
                        if (this.state.isWaitingForData) {
                            return;
                        }
                        let state = this.state;
                        state.isWaitingForData = true;
                        this.setState(state);
                        Annotation.AnnotationDataProvider.subscribeForData(this.dataWaitHandler.bind(this));
                    }
                    render() {
                        let c = this.props.channel;
                        let len = CommonUtils.Tunnels.getLength(c);
                        let annotations = Annotation.AnnotationDataProvider.getChannelAnnotations(c.Id);
                        if (annotations === void 0) {
                            this.invokeDataWait();
                        }
                        if (annotations !== null && annotations !== void 0) {
                            let annotation = annotations[0];
                            return React.createElement(Renderable, Object.assign({ annotations: annotations, label: React.createElement("span", null,
                                    React.createElement("b", null,
                                        React.createElement("a", { onClick: this.selectChannel.bind(this) }, annotation.text)),
                                    ", Length: ",
                                    len,
                                    " \u00C5"), element: c, toggle: Channels_1.State.showChannelVisuals }, this.props.state));
                        }
                        else {
                            return React.createElement(Renderable, Object.assign({ label: React.createElement("span", null,
                                    React.createElement("b", null,
                                        React.createElement("a", { onClick: this.selectChannel.bind(this) }, c.Type)),
                                    ", ",
                                    `Length: ${len} Å`), element: c, toggle: Channels_1.State.showChannelVisuals }, this.props.state));
                        }
                    }
                    selectChannel() {
                        let entity = this.props.state.plugin.context.select(this.props.channel.__id)[0];
                        if (entity === void 0 || entity.ref === "undefined") {
                            Channels_1.State.showChannelVisuals(this.props.state.plugin, [this.props.channel], true);
                            let state = this.state;
                            state.isVisible = true;
                            this.setState(state);
                            window.setTimeout((() => {
                                this.selectChannel();
                            }).bind(this), 50);
                            return;
                        }
                        let channelRef = entity.ref;
                        let plugin = this.props.state.plugin;
                        plugin.command(LiteMol.Bootstrap.Command.Entity.Focus, plugin.context.select(channelRef));
                        plugin.command(LiteMol.Bootstrap.Event.Visual.VisualSelectElement, LiteMol.Bootstrap.Interactivity.Info.selection(entity, [0]));
                    }
                }
                UI.Channel = Channel;
                class Cavities extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { isBusy: false };
                    }
                    show(visible) {
                        for (let element of this.props.cavities) {
                            element.__isBusy = true;
                        }
                        this.setState({ isBusy: true }, () => Channels_1.State.showCavityVisuals(this.props.state.plugin, this.props.cavities, visible)
                            .then(() => this.setState({ isBusy: false })).catch(() => this.setState({ isBusy: false })));
                    }
                    isDisabled() {
                        return !this.props.cavities || (this.props.cavities !== void 0 && this.props.cavities.length == 0);
                    }
                    render() {
                        return React.createElement(Section, { header: this.props.header, count: (this.props.cavities || '').length },
                            React.createElement("div", { className: 'ui-show-all' },
                                React.createElement("button", { className: "btn btn-primary btn-xs", onClick: () => this.show(true), disabled: this.state.isBusy || this.isDisabled() }, "All"),
                                React.createElement("button", { className: "btn btn-primary btn-xs", onClick: () => this.show(false), disabled: this.state.isBusy || this.isDisabled() }, "None")),
                            this.props.cavities && this.props.cavities.length > 0
                                ? this.props.cavities.map((c, i) => React.createElement(Cavity, { key: i, cavity: c, state: this.props.state }))
                                : React.createElement("div", { className: "ui-label ui-no-data-available" }, "No data available..."));
                    }
                }
                UI.Cavities = Cavities;
                class Cavity extends React.Component {
                    constructor() {
                        super(...arguments);
                        this.state = { isVisible: false };
                    }
                    render() {
                        let c = this.props.cavity;
                        return React.createElement("div", null,
                            React.createElement(Renderable, Object.assign({ label: React.createElement("span", null,
                                    React.createElement("b", null, c.Id),
                                    ", ",
                                    `Volume: ${c.Volume | 0} Å`,
                                    React.createElement("sup", null, "3")), element: c, toggle: Channels_1.State.showCavityVisuals }, this.props.state)));
                    }
                }
                UI.Cavity = Cavity;
                class Origins extends React.Component {
                    toggle() {
                        this.props.origins.__isBusy = true;
                        this.forceUpdate(() => Channels_1.State.showOriginsSurface(this.props.plugin, this.props.origins, !this.props.origins.__isVisible)
                            .then(() => this.forceUpdate()).catch(() => this.forceUpdate()));
                    }
                    highlight(isOn) {
                        this.props.plugin.command(LiteMol.Bootstrap.Command.Entity.Highlight, { entities: this.props.plugin.context.select(this.props.origins.__id), isOn });
                    }
                    render() {
                        if (!this.props.origins.Points.length) {
                            return React.createElement("div", { style: { display: 'none' } });
                        }
                        return React.createElement("div", null,
                            React.createElement("label", { onMouseEnter: () => this.highlight(true), onMouseLeave: () => this.highlight(false) },
                                React.createElement("input", { type: 'checkbox', checked: !!this.props.origins.__isVisible, onChange: () => this.toggle(), disabled: !!this.props.origins.__isBusy }),
                                " ",
                                this.props.label));
                    }
                }
                UI.Origins = Origins;
            })(UI = Channels_1.UI || (Channels_1.UI = {}));
        })(Channels = Example.Channels || (Example.Channels = {}));
    })(Example = LiteMol.Example || (LiteMol.Example = {}));
})(LiteMol || (LiteMol = {}));
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
var LiteMol;
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
(function (LiteMol) {
    var Example;
    (function (Example) {
        var Channels;
        (function (Channels) {
            /**
             * We don't want the default behaviour of the plugin for our example.
             */
            var Views = LiteMol.Plugin.Views;
            var Bootstrap = LiteMol.Bootstrap;
            var Interactivity = Bootstrap.Interactivity;
            var Transformer = Bootstrap.Entity.Transformer;
            var LayoutRegion = Bootstrap.Components.LayoutRegion;
            /**
             * Support for custom highlight tooltips.
             */
            function HighlightCustomElements(context) {
                context.highlight.addProvider(info => {
                    if (Interactivity.isEmpty(info) || info.source.type !== Bootstrap.Entity.Visual.Surface)
                        return void 0;
                    let tag = info.source.props.tag;
                    let e = tag.element;
                    switch (tag.type) {
                        case 'Cavity': return `<b>${e.Type} ${e.Id}</b>, Volume: ${e.Volume | 0} Å`;
                        case 'Path':
                        case 'Pore':
                        case 'MergedPore':
                        case 'Tunnel': {
                            let tunnel = e;
                            let len = CommonUtils.Tunnels.getLength(tunnel);
                            let bneck = CommonUtils.Tunnels.getBottleneck(tunnel);
                            let annotation = Annotation.AnnotationDataProvider.getChannelAnnotation(tunnel.Id);
                            if (annotation === null || annotation === void 0) {
                                return `<b>${tunnel.Type}</b>, Length: ${len} Å | Bottleneck: ${bneck} Å`;
                            }
                            else {
                                return `<b>${annotation.text}</b>, Length: ${len} Å | Bottleneck: ${bneck} Å`;
                            }
                        }
                        case 'Origins': {
                            let o = e.Points[info.elements[0]];
                            return `<b>Origin</b> (${e.Type}) at (${o.X}, ${o.Y}, ${o.Z})`;
                        }
                        default: return void 0;
                    }
                });
            }
            Channels.HighlightCustomElements = HighlightCustomElements;
            Channels.PluginSpec = {
                settings: {
                    'molecule.model.defaultQuery': `residuesByName('GLY', 'ALA')`,
                    'molecule.model.defaultAssemblyName': '1'
                },
                transforms: [
                    // Molecule(model) transforms
                    { transformer: Transformer.Molecule.CreateModel, view: Views.Transform.Molecule.CreateModel, initiallyCollapsed: true },
                    { transformer: Transformer.Molecule.CreateSelection, view: Views.Transform.Molecule.CreateSelection, initiallyCollapsed: true },
                    { transformer: Transformer.Molecule.CreateAssembly, view: Views.Transform.Molecule.CreateAssembly, initiallyCollapsed: true },
                    { transformer: Transformer.Molecule.CreateSymmetryMates, view: Views.Transform.Molecule.CreateSymmetryMates, initiallyCollapsed: true },
                    { transformer: Transformer.Molecule.CreateMacromoleculeVisual, view: Views.Transform.Empty },
                    { transformer: Transformer.Molecule.CreateVisual, view: Views.Transform.Molecule.CreateVisual }
                ],
                behaviours: [
                    // you will find the source of all behaviours in the Bootstrap/Behaviour directory
                    Bootstrap.Behaviour.SetEntityToCurrentWhenAdded,
                    Bootstrap.Behaviour.FocusCameraOnSelect,
                    // this colors the visual when a selection is created on it.
                    Bootstrap.Behaviour.ApplySelectionToVisual,
                    // this colors the visual when it's selected by mouse or touch
                    Bootstrap.Behaviour.ApplyInteractivitySelection,
                    // this shows what atom/residue is the pointer currently over
                    Bootstrap.Behaviour.Molecule.HighlightElementInfo,
                    // when the same element is clicked twice in a row, the selection is emptied
                    //Bootstrap.Behaviour.UnselectElementOnRepeatedClick,
                    // distance to the last "clicked" element
                    Bootstrap.Behaviour.Molecule.DistanceToLastClickedElement,
                    // this tracks what is downloaded and some basic actions. Does not send any private data etc. Source in Bootstrap/Behaviour/Analytics 
                    Bootstrap.Behaviour.GoogleAnalytics('UA-77062725-1'),
                    HighlightCustomElements
                ],
                components: [
                    LiteMol.Plugin.Components.Visualization.HighlightInfo(LayoutRegion.Main, true),
                    LiteMol.Plugin.Components.Entity.Current('LiteMol', LiteMol.Plugin.VERSION.number)(LayoutRegion.Right, true),
                    LiteMol.Plugin.Components.Transform.View(LayoutRegion.Right),
                    LiteMol.Plugin.Components.Context.Log(LayoutRegion.Bottom, true),
                    LiteMol.Plugin.Components.Context.Overlay(LayoutRegion.Root),
                    LiteMol.Plugin.Components.Context.Toast(LayoutRegion.Main, true),
                    LiteMol.Plugin.Components.Context.BackgroundTasks(LayoutRegion.Main, true)
                ],
                viewport: {
                    view: Views.Visualization.Viewport,
                    controlsView: Views.Visualization.ViewportControls
                },
                layoutView: Views.Layout,
                tree: {
                    region: LayoutRegion.Left,
                    view: Views.Entity.Tree
                }
            };
        })(Channels = Example.Channels || (Example.Channels = {}));
    })(Example = LiteMol.Example || (LiteMol.Example = {}));
})(LiteMol || (LiteMol = {}));
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
var LiteMol;
/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */
(function (LiteMol) {
    var Example;
    (function (Example) {
        var Channels;
        (function (Channels) {
            // all commands and events can be found in Bootstrap/Event folder.
            // easy to follow the types and parameters in VSCode.
            var Vizualizer = LayersVizualizer;
            (function () {
                const ROUTING_OPTIONS = {
                    "local": { defaultContextPath: "/detail", defaultPid: "5an8", defaultDB: "pdb", useParameterAsPid: true },
                    "chdb-test": { defaultContextPath: "/detail", defaultPid: "5an8", defaultDB: "pdb", useLastPathPartAsPid: true },
                    "test": { defaultContextPath: "/test/detail", defaultPid: "5an8", defaultDB: "pdb", useLastPathPartAsPid: true },
                    "chdb-prod": { defaultContextPath: "/detail", defaultPid: "5an8", defaultDB: "pdb", useParameterAsPid: true },
                };
                const ROUTING_MODE = "chdb-prod";
                const lvSettings = {
                    coloringProperty: "Hydropathy",
                    useColorMinMax: true,
                    skipMiddleColor: false,
                    topMargin: 0,
                    customRadiusProperty: "MinRadius"
                };
                SimpleRouter.GlobalRouter.init(ROUTING_OPTIONS[ROUTING_MODE]);
                //Create instance of layer vizualizer
                const layerVizualizer = new LayersVizualizer.Vizualizer('layer-vizualizer-ui', lvSettings);
                const plugin = LiteMol.Plugin.create({
                    target: '#plugin',
                    viewportBackground: '#000',
                    layoutState: {
                        hideControls: true,
                        isExpanded: false,
                        collapsedControlsLayout: LiteMol.Bootstrap.Components.CollapsedControlsLayout.Landscape
                    },
                    customSpecification: Channels.PluginSpec
                });
                CommonUtils.Selection.SelectionHelper.attachClearSelectionToEventHandler(plugin);
                Channels.UI.render(plugin, document.getElementById('ui'));
                Vizualizer.UI.render(layerVizualizer, document.getElementById('layer-vizualizer-ui'), plugin);
                AglomeredParameters.UI.render(document.getElementById('left-tabs-2'), plugin);
                ChannelsDescriptions.UI.render(document.getElementById('left-tabs-3'), plugin);
                //LayerProperties.UI.render(document.getElementById("right-tabs-1") !, plugin);
                LayerProperties.UI.render(document.getElementById("layer-properties"), plugin);
                //LayerResidues.UI.render(document.getElementById("right-tabs-2") !, plugin);
                LayerResidues.UI.render(document.getElementById("layer-residues"), plugin);
                LiningResidues.UI.render(document.getElementById("right-tabs-2"), plugin);
                ResidueAnnotations.UI.render(document.getElementById("right-tabs-3"), plugin);
                ProteinAnnotations.UI.render(document.getElementById("right-panel-tabs-1"), plugin);
                DownloadReport.UI.render(document.getElementById("download-report"));
                PdbIdSign.UI.render(document.getElementById("pdbid-sign"));
            })();
        })(Channels = Example.Channels || (Example.Channels = {}));
    })(Example = LiteMol.Example || (LiteMol.Example = {}));
})(LiteMol || (LiteMol = {}));
