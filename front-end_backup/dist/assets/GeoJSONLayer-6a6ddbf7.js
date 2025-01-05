import{i as r,y as i,j as F,fE as $,eE as j,b3 as O,A as m,b0 as w,eo as J,aF as N,dB as E,n as f,aY as I,aV as R,fL as g,bv as P,cs as v,_ as q,bd as h,ed as T,bg as k,l as D,cl as G}from"./index-c6cfe049.js";import"./UniqueValueRenderer-2d905f9d.js";import{m as Z,u as C}from"./jsonUtils-0cfa0239.js";import{S as L}from"./MultiOriginJSONSupport-7cf2254f.js";import{l as Q}from"./clientSideDefaults-bc8f2b5a.js";import{d as z}from"./FeatureSet-402c1fc5.js";import{l as V}from"./BlendLayer-3864a0e6.js";import{e as A}from"./CustomParametersMixin-d7ae0b0b.js";import{c as B}from"./FeatureEffectLayer-ad153b3a.js";import{c as U}from"./FeatureReductionLayer-d2b80ebd.js";import{b as W}from"./OperationalLayer-d666f103.js";import{p as M}from"./OrderedLayer-4b37be9f.js";import{j as Y}from"./PortalLayer-089ac58c.js";import{f as H}from"./RefreshableLayer-768cbb26.js";import{t as K}from"./ScaleRangeLayer-2709e17c.js";import{l as X}from"./TemporalLayer-58903be1.js";import{d as ee,g as te,l as re,y as ie,w as oe,s as se,t as ne,p as ae}from"./commonProperties-b537568a.js";import{p as le}from"./FeatureTemplate-1f82a77c.js";import{s as pe}from"./fieldProperties-abc74b98.js";import{C as ue,l as de}from"./labelingInfo-754601fb.js";import{p as he}from"./popupUtils-c2bd8f97.js";import"./ColorStop-3bd1e817.js";import"./diffUtils-a81eba90.js";import"./colorRamps-2725f079.js";import"./sizeVariableUtils-d4870b0d.js";import"./visualVariableUtils-57487c58.js";import"./lengthUtils-806c8c03.js";import"./jsonUtils-17af088a.js";import"./defaults-458d9190.js";import"./defaultsJSON-59981e75.js";import"./styleUtils-12717ade.js";import"./LRUCache-be26918b.js";import"./Version-d58b3305.js";import"./FieldsIndex-815a254a.js";import"./UnknownTimeZone-b1c85c08.js";import"./OverrideHelper-78bed9ed.js";import"./colorUtils-60e0b64a.js";import"./vec42-614f5847.js";import"./vec4f64-430e4feb.js";import"./utils-2af5df8d.js";import"./quantizationUtils-07a0781e.js";import"./heatmapUtils-dc73c34c.js";import"./QueryEngineCapabilities-85c4f1d0.js";import"./jsonUtils-a377b268.js";import"./parser-7740a44f.js";import"./FeatureEffect-0fa11288.js";import"./FeatureReductionSelection-4696fdf2.js";import"./featureLayerUtils-6e37b4eb.js";import"./RelationshipQuery-21a3a6e4.js";import"./MD5-715f37cd.js";import"./OrderByInfo-3aa9a06f.js";import"./portalItemUtils-bca17985.js";import"./TimeInfo-3ab6fbf6.js";import"./ElevationInfo-58ee6e4f.js";import"./labelUtils-e96173b2.js";let p=class extends ${constructor(){super(...arguments),this.type="geojson",this.refresh=j(async e=>{await this.load();const{extent:t,timeExtent:s}=await this._connection.invoke("refresh",e);return this.sourceJSON.extent=t,s&&(this.sourceJSON.timeInfo.timeExtent=[s.start,s.end]),{dataChanged:!0,updates:{extent:this.sourceJSON.extent,timeInfo:this.sourceJSON.timeInfo}}})}load(e){const t=e!=null?e.signal:null;return this.addResolvingPromise(this._startWorker(t)),Promise.resolve(this)}destroy(){var e;(e=this._connection)==null||e.close(),this._connection=null}applyEdits(e){return this.load().then(()=>this._applyEdits(e))}openPorts(){return this.load().then(()=>this._connection.openPorts())}queryFeatures(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryFeatures",e?e.toJSON():null,t)).then(s=>z.fromJSON(s))}queryFeaturesJSON(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryFeatures",e?e.toJSON():null,t))}queryFeatureCount(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryFeatureCount",e?e.toJSON():null,t))}queryObjectIds(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryObjectIds",e?e.toJSON():null,t))}queryExtent(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryExtent",e?e.toJSON():null,t)).then(s=>({count:s.count,extent:O.fromJSON(s.extent)}))}querySnapping(e,t={}){return this.load(t).then(()=>this._connection.invoke("querySnapping",e,t))}_applyEdits(e){if(!this._connection)throw new m("geojson-layer-source:edit-failure","Memory source not loaded");const t=this.layer.objectIdField,s=[],n=[],l=[];if(e.addFeatures)for(const a of e.addFeatures)s.push(this._serializeFeature(a));if(e.deleteFeatures)for(const a of e.deleteFeatures)"objectId"in a&&a.objectId!=null?n.push(a.objectId):"attributes"in a&&a.attributes[t]!=null&&n.push(a.attributes[t]);if(e.updateFeatures)for(const a of e.updateFeatures)l.push(this._serializeFeature(a));return this._connection.invoke("applyEdits",{adds:s,updates:l,deletes:n}).then(({extent:a,timeExtent:u,featureEditResults:c})=>(this.sourceJSON.extent=a,u&&(this.sourceJSON.timeInfo.timeExtent=[u.start,u.end]),this._createEditsResult(c)))}_createEditsResult(e){return{addFeatureResults:e.addResults?e.addResults.map(this._createFeatureEditResult,this):[],updateFeatureResults:e.updateResults?e.updateResults.map(this._createFeatureEditResult,this):[],deleteFeatureResults:e.deleteResults?e.deleteResults.map(this._createFeatureEditResult,this):[],addAttachmentResults:[],updateAttachmentResults:[],deleteAttachmentResults:[]}}_createFeatureEditResult(e){const t=e.success===!0?null:e.error||{code:void 0,description:void 0};return{objectId:e.objectId,globalId:e.globalId,error:t?new m("geojson-layer-source:edit-failure",t.description,{code:t.code}):null}}_serializeFeature(e){const{attributes:t}=e,s=this._geometryForSerialization(e);return s?{geometry:s.toJSON(),attributes:t}:{attributes:t}}_geometryForSerialization(e){const{geometry:t}=e;return t==null?null:t.type==="mesh"||t.type==="extent"?w.fromExtent(t.extent):t}async _startWorker(e){this._connection=await J("GeoJSONSourceWorker",{strategy:N("feature-layers-workers")?"dedicated":"local",signal:e,registryTarget:this});const{fields:t,spatialReference:s,hasZ:n,geometryType:l,objectIdField:a,url:u,timeInfo:c,customParameters:S}=this.layer,x=this.layer.originOf("spatialReference")==="defaults",_={url:u,customParameters:S,fields:t&&t.map(y=>y.toJSON()),geometryType:E.toJSON(l),hasZ:n,objectIdField:a,timeInfo:c?c.toJSON():null,spatialReference:x?null:s&&s.toJSON()},d=await this._connection.invoke("load",_,{signal:e});for(const y of d.warnings)f.getLogger(this.layer).warn("#load()",`$${y.message} (title: '${this.layer.title||"no title"}', id: '${this.layer.id??"no id"}')`,{warning:y});d.featureErrors.length&&f.getLogger(this.layer).warn("#load()",`Encountered ${d.featureErrors.length} validation errors while loading features. (title: '${this.layer.title||"no title"}', id: '${this.layer.id??"no id"}')`,{errors:d.featureErrors}),this.sourceJSON=d.layerDefinition,this.capabilities=Q(this.sourceJSON.hasZ,!0)}};r([i()],p.prototype,"capabilities",void 0),r([i()],p.prototype,"type",void 0),r([i({constructOnly:!0})],p.prototype,"layer",void 0),r([i()],p.prototype,"sourceJSON",void 0),p=r([F("esri.layers.graphics.sources.GeoJSONSource")],p);const b=pe();let o=class extends M(A(U(B(V(X(K(H(W(Y(L(G))))))))))){constructor(e){super(e),this.copyright=null,this.dateFieldsTimeZone=null,this.definitionExpression=null,this.displayField=null,this.editingEnabled=!1,this.elevationInfo=null,this.fields=null,this.fieldsIndex=null,this.fullExtent=null,this.geometryType=null,this.hasZ=void 0,this.labelsVisible=!0,this.labelingInfo=null,this.legendEnabled=!0,this.objectIdField=null,this.operationalLayerType="GeoJSON",this.outFields=null,this.popupEnabled=!0,this.popupTemplate=null,this.screenSizePerspectiveEnabled=!0,this.source=new p({layer:this}),this.spatialReference=I.WGS84,this.templates=null,this.title="GeoJSON",this.type="geojson"}destroy(){var e;(e=this.source)==null||e.destroy()}load(e){const t=this.loadFromPortal({supportedTypes:["GeoJson"],supportsData:!1},e).catch(R).then(()=>this.source.load(e)).then(()=>{this.read(this.source.sourceJSON,{origin:"service",url:this.parsedUrl}),this.revert(["objectIdField","fields","timeInfo"],"service"),g(this.renderer,this.fieldsIndex),P(this.timeInfo,this.fieldsIndex)});return this.addResolvingPromise(t),Promise.resolve(this)}get capabilities(){return this.source?this.source.capabilities:null}get createQueryVersion(){return this.commitProperty("definitionExpression"),this.commitProperty("timeExtent"),this.commitProperty("timeOffset"),this.commitProperty("geometryType"),this.commitProperty("capabilities"),(this._get("createQueryVersion")||0)+1}get defaultPopupTemplate(){return this.createPopupTemplate()}get isTable(){return this.loaded&&this.geometryType==null}get parsedUrl(){return this.url?v(this.url):null}set renderer(e){g(e,this.fieldsIndex),this._set("renderer",e)}set url(e){if(!e)return void this._set("url",e);const t=v(e);this._set("url",t.path),t.query&&(this.customParameters={...this.customParameters,...t.query})}async applyEdits(e,t){const{applyEdits:s}=await q(()=>import("./editingSupport-208b51d8.js"),["assets/editingSupport-208b51d8.js","assets/index-c6cfe049.js","assets/index-16a932bd.css","assets/EditBusLayer-1e67be81.js","assets/infoFor3D-24efd44a.js"]);await this.load();const n=await s(this,this.source,e,t);return this.read({extent:this.source.sourceJSON.extent,timeInfo:this.source.sourceJSON.timeInfo},{origin:"service",ignoreDefaults:!0}),n}on(e,t){return super.on(e,t)}createPopupTemplate(e){return he(this,e)}createQuery(){var l;const e=new h,t=(l=this.capabilities)==null?void 0:l.data;e.returnGeometry=!0,t&&t.supportsZ&&(e.returnZ=!0),e.outFields=["*"],e.where=this.definitionExpression||"1=1";const{timeOffset:s,timeExtent:n}=this;return e.timeExtent=s!=null&&n!=null?n.offset(-s.value,s.unit):n||null,e}getFieldDomain(e,t){var s;return(s=this.getField(e))==null?void 0:s.domain}getField(e){return this.fieldsIndex.get(e)}queryFeatures(e,t){return this.load().then(()=>this.source.queryFeatures(h.from(e)||this.createQuery(),t)).then(s=>{if(s!=null&&s.features)for(const n of s.features)n.layer=n.sourceLayer=this;return s})}queryObjectIds(e,t){return this.load().then(()=>this.source.queryObjectIds(h.from(e)||this.createQuery(),t))}queryFeatureCount(e,t){return this.load().then(()=>this.source.queryFeatureCount(h.from(e)||this.createQuery(),t))}queryExtent(e,t){return this.load().then(()=>this.source.queryExtent(h.from(e)||this.createQuery(),t))}async hasDataChanged(){try{const{dataChanged:e,updates:t}=await this.source.refresh(this.customParameters);return t!=null&&this.read(t,{origin:"service",url:this.parsedUrl,ignoreDefaults:!0}),e}catch{}return!1}};r([i({readOnly:!0,json:{read:!1,write:!1}})],o.prototype,"capabilities",null),r([i({type:String})],o.prototype,"copyright",void 0),r([i({readOnly:!0})],o.prototype,"createQueryVersion",null),r([i(T("dateFieldsTimeReference"))],o.prototype,"dateFieldsTimeZone",void 0),r([i({readOnly:!0})],o.prototype,"defaultPopupTemplate",null),r([i({type:String,json:{name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],o.prototype,"definitionExpression",void 0),r([i({type:String})],o.prototype,"displayField",void 0),r([i({type:Boolean})],o.prototype,"editingEnabled",void 0),r([i(ee)],o.prototype,"elevationInfo",void 0),r([i({type:[k],json:{name:"layerDefinition.fields",write:{ignoreOrigin:!0,isRequired:!0},origins:{service:{name:"fields"}}}})],o.prototype,"fields",void 0),r([i(b.fieldsIndex)],o.prototype,"fieldsIndex",void 0),r([i({type:O,json:{name:"extent"}})],o.prototype,"fullExtent",void 0),r([i({type:["point","polygon","polyline","multipoint"],json:{read:{reader:E.read}}})],o.prototype,"geometryType",void 0),r([i({type:Boolean})],o.prototype,"hasZ",void 0),r([i(te)],o.prototype,"id",void 0),r([i({type:Boolean,readOnly:!0})],o.prototype,"isTable",null),r([i(re)],o.prototype,"labelsVisible",void 0),r([i({type:[ue],json:{name:"layerDefinition.drawingInfo.labelingInfo",read:{reader:de},write:!0}})],o.prototype,"labelingInfo",void 0),r([i(ie)],o.prototype,"legendEnabled",void 0),r([i({type:["show","hide"]})],o.prototype,"listMode",void 0),r([i({type:String,json:{name:"layerDefinition.objectIdField",write:{ignoreOrigin:!0,isRequired:!0},origins:{service:{name:"objectIdField"}}}})],o.prototype,"objectIdField",void 0),r([i(oe)],o.prototype,"opacity",void 0),r([i({type:["GeoJSON"]})],o.prototype,"operationalLayerType",void 0),r([i(b.outFields)],o.prototype,"outFields",void 0),r([i({readOnly:!0})],o.prototype,"parsedUrl",null),r([i(se)],o.prototype,"popupEnabled",void 0),r([i({type:D,json:{name:"popupInfo",write:!0}})],o.prototype,"popupTemplate",void 0),r([i({types:Z,json:{name:"layerDefinition.drawingInfo.renderer",write:!0,origins:{service:{name:"drawingInfo.renderer"},"web-scene":{types:C}}}})],o.prototype,"renderer",null),r([i(ne)],o.prototype,"screenSizePerspectiveEnabled",void 0),r([i({readOnly:!0})],o.prototype,"source",void 0),r([i({type:I})],o.prototype,"spatialReference",void 0),r([i({type:[le]})],o.prototype,"templates",void 0),r([i()],o.prototype,"title",void 0),r([i({json:{read:!1},readOnly:!0})],o.prototype,"type",void 0),r([i(ae)],o.prototype,"url",null),o=r([F("esri.layers.GeoJSONLayer")],o);const yt=o;export{yt as default};
