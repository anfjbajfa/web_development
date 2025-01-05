import{i as o,y as n,j as v,a2 as R,f as b,n as _,o as P,eE as F,b3 as D,k as f,fQ as I,U as T,eb as z,A as U,aQ as C,bd as L,a$ as V,b as M,eH as E,V as $,e as S,aF as O}from"./index-c6cfe049.js";import{d as H,f as j,a as N}from"./RasterVFDisplayObject-aafd2f38.js";import{f as G,y as J}from"./LayerView-e36663b3.js";import{V as W}from"./GraphicsView2D-b64a791b.js";import{h as Q}from"./HighlightGraphicContainer-721c2552.js";import{M as K,m as X,f as Y}from"./dataUtils-3fb67c50.js";import{a as Z}from"./BitmapContainer-e5943729.js";import{h as tt,E as q}from"./Container-5acd0ce7.js";import{l as et}from"./Bitmap-d271523f.js";import{_ as it}from"./ExportStrategy-599a0b82.js";import{J as rt}from"./rasterProjectionHelper-a2562acb.js";import{n as st}from"./WGLContainer-437ea4a6.js";import{i as at}from"./timeSupport-219067f1.js";import{p as ot}from"./popupUtils-70bac4b7.js";import{i as nt}from"./RefreshableLayerView-90cb0307.js";import"./Program-ceb7c31f.js";import"./Texture-6d5abce7.js";import"./enums-2e633670.js";import"./ProgramTemplate-fe288a36.js";import"./VertexElementDescriptor-2925c6af.js";import"./LabelMetric-18a06377.js";import"./enums-fb32c1bb.js";import"./FieldsIndex-815a254a.js";import"./UnknownTimeZone-b1c85c08.js";import"./UpdateTracking2D-ebe3e38b.js";import"./BidiEngine-26aff129.js";import"./OptimizedFeature-059c854c.js";import"./GeometryUtils-a7dec725.js";import"./utils-2af5df8d.js";import"./definitions-f33e80b3.js";import"./Rect-ea14f53a.js";import"./defaults-458d9190.js";import"./defaultsJSON-59981e75.js";import"./BindType-d21d71dd.js";import"./Util-bd8e9eff.js";import"./vec42-614f5847.js";import"./vec4f64-430e4feb.js";import"./highlightReasons-54b6b965.js";import"./OverrideHelper-78bed9ed.js";import"./colorUtils-60e0b64a.js";import"./quantizationUtils-07a0781e.js";import"./AttributeStore-035e9a1b.js";import"./labelUtils-e96173b2.js";import"./TimeOnly-430d9cda.js";import"./timeSupport-b14221ad.js";import"./featureConversionUtils-830d3ed6.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./json-48e3ea08.js";import"./diffUtils-a81eba90.js";import"./FeatureCommandQueue-117fe953.js";import"./constants-991354c8.js";import"./lengthUtils-806c8c03.js";import"./normalizeUtilsSync-3234a768.js";import"./AGraphicContainer-76a125c3.js";import"./TechniqueInstance-c60140cc.js";import"./TileContainer-47aa2b34.js";import"./vec3f32-ad1dc57f.js";import"./parser-7740a44f.js";import"./StyleDefinition-df636448.js";import"./config-1337d16e.js";import"./earcut-354b01bb.js";let p=class extends R{constructor(){super(...arguments),this.attached=!1,this.container=new tt,this.updateRequested=!1,this.type="imagery",this._bitmapView=new Z}destroy(){this.attached&&(this.detach(),this.attached=!1),this.updateRequested=!1}get updating(){return!this.attached||this.isUpdating()}update(e){this.strategy.update(e).catch(i=>{b(i)||_.getLogger(this).error(i)})}hitTest(e){return new P({attributes:{},geometry:e.clone(),layer:this.layer})}attach(){this.container.addChild(this._bitmapView);const e=this.layer.version>=10,i=this.layer.version>=10.1?this.layer.imageMaxHeight:2048,r=this.layer.version>=10.1?this.layer.imageMaxWidth:2048;this.strategy=new it({container:this._bitmapView,imageNormalizationSupported:e,imageMaxHeight:i,imageMaxWidth:r,fetchSource:this._fetchImage.bind(this),requestUpdate:()=>this.requestUpdate()})}detach(){this.strategy.destroy(),this._bitmapView.removeAllChildren(),this.container.removeAllChildren(),this.updateRequested=!1}redraw(){this.strategy.updateExports(async e=>{const{source:i}=e;if(!i||i instanceof ImageBitmap)return;const r=await this.layer.applyRenderer({extent:i.extent,pixelBlock:i.originalPixelBlock??i.pixelBlock});i.filter=s=>this.layer.pixelFilter?this.layer.applyFilter(s):{...r,extent:i.extent}}).catch(e=>{b(e)||_.getLogger(this).error(e)})}requestUpdate(){this.updateRequested||(this.updateRequested=!0,this.view.requestUpdate())}isUpdating(){return this.strategy.updating||this.updateRequested}getPixelData(){if(this.updating)return null;const e=this.strategy.bitmaps;if(e.length===1&&e[0].source)return{extent:e[0].source.extent,pixelBlock:e[0].source.originalPixelBlock};if(e.length>1){const i=this.view.extent,r=e.map(a=>a.source).filter(a=>a.extent&&a.extent.intersects(i)).map(a=>({extent:a.extent,pixelBlock:a.originalPixelBlock})),s=K(r,i);return s!=null?{extent:s.extent,pixelBlock:s.pixelBlock}:null}return null}async _fetchImage(e,i,r,s){var h;(s=s||{}).timeExtent=this.timeExtent,s.requestAsImageElement=!0,s.returnImageBitmap=!0;const a=await this.layer.fetchImage(e,i,r,s);if(a.imageBitmap)return a.imageBitmap;const l=await this.layer.applyRenderer(a.pixelData,{signal:s.signal}),c=new et(l.pixelBlock,(h=l.extent)==null?void 0:h.clone(),a.pixelData.pixelBlock);return c.filter=d=>this.layer.applyFilter(d),c}};o([n()],p.prototype,"attached",void 0),o([n()],p.prototype,"container",void 0),o([n()],p.prototype,"layer",void 0),o([n()],p.prototype,"strategy",void 0),o([n()],p.prototype,"timeExtent",void 0),o([n()],p.prototype,"view",void 0),o([n()],p.prototype,"updateRequested",void 0),o([n()],p.prototype,"updating",null),o([n()],p.prototype,"type",void 0),p=o([v("esri.views.2d.layers.imagery.ImageryView2D")],p);const lt=p;class ht extends st{constructor(){super(...arguments),this.symbolTypes=["triangle"]}prepareRenderPasses(e){const i=e.registerRenderPass({name:"imagery (vf)",brushes:[H],target:()=>this.children,drawPhase:q.MAP});return[...super.prepareRenderPasses(e),i]}doRender(e){this.visible&&e.drawPhase===q.MAP&&this.symbolTypes.forEach(i=>{e.renderPass=i,super.doRender(e)})}}let y=class extends R{constructor(t){super(t),this._loading=null,this.update=F((e,i)=>this._update(e,i).catch(r=>{b(r)||_.getLogger(this).error(r)}))}get updating(){return!!this._loading}redraw(t){if(!this.container.children.length)return;const e=this.container.children[0];e.symbolizerParameters=t,e.invalidateVAO(),this.container.symbolTypes=t.style==="wind_speed"?["scalar","triangle"]:t.style==="simple_scalar"?["scalar"]:["triangle"],this.container.requestRender()}async _update(t,e,i){if(!t.stationary)return;const{extent:r,spatialReference:s}=t.state,a=new D({xmin:r.xmin,ymin:r.ymin,xmax:r.xmax,ymax:r.ymax,spatialReference:s}),[l,c]=t.state.size;this._loading=this.fetchPixels(a,l,c,i);const h=await this._loading;this._addToDisplay(h,e,t.state),this._loading=null}_addToDisplay(t,e,i){if(t.pixelBlock==null)return this.container.children.forEach(l=>l.destroy()),void this.container.removeAllChildren();const{extent:r,pixelBlock:s}=t,a=new j(s);a.offset=[0,0],a.symbolizerParameters=e,a.rawPixelData=t,a.invalidateVAO(),a.x=r.xmin,a.y=r.ymax,a.pixelRatio=i.pixelRatio,a.rotation=i.rotation,a.resolution=i.resolution,a.width=s.width*e.symbolTileSize,a.height=s.height*e.symbolTileSize,this.container.children.forEach(l=>l.destroy()),this.container.removeAllChildren(),this.container.symbolTypes=e.style==="wind_speed"?["scalar","triangle"]:e.style==="simple_scalar"?["scalar"]:["triangle"],this.container.addChild(a)}};o([n()],y.prototype,"fetchPixels",void 0),o([n()],y.prototype,"container",void 0),o([n()],y.prototype,"_loading",void 0),o([n()],y.prototype,"updating",null),y=o([v("esri.views.2d.layers.imagery.ImageryVFStrategy")],y);const pt=y;let m=class extends R{constructor(){super(...arguments),this.attached=!1,this.container=new ht,this.type="imageryVF",this._dataParameters={exportParametersVersion:0,bbox:"",symbolTileSize:0,time:""},this._fetchpixels=async(t,e,i,r)=>{const s=await this._projectFullExtentPromise,{symbolTileSize:a}=this.layer.renderer,{extent:l,width:c,height:h}=X(t,e,i,a,s);if(s!=null&&!s.intersects(t))return{extent:l,pixelBlock:null};const d={bbox:`${l.xmin}, ${l.ymin}, ${l.xmax}, ${l.ymax}`,exportParametersVersion:this.layer.exportImageServiceParameters.version,symbolTileSize:a,time:JSON.stringify(this.timeExtent||"")};if(this._canReuseVectorFieldData(d)){const u=this.getPixelData();if(u!=null&&`${u.extent.xmin}, ${u.extent.ymin}, ${u.extent.xmax}, ${u.extent.ymax}`===d.bbox)return u}const{pixelData:g}=await this.layer.fetchImage(l,c,h,{timeExtent:this.timeExtent,requestAsImageElement:!1,signal:r});this._dataParameters=d;const x=g==null?void 0:g.pixelBlock;return x==null?{extent:l,pixelBlock:null}:{extent:l,pixelBlock:this.layer.rasterInfo.dataType==="vector-uv"?Y(x,"vector-uv"):x}}}get updating(){return!this.attached||this._strategy.updating}attach(){this._projectFullExtentPromise=this._getProjectedFullExtent(this.view.spatialReference),this._strategy=new pt({container:this.container,fetchPixels:this._fetchpixels}),this.addHandles(f(()=>this.layer.renderer,t=>this._updateSymbolizerParams(t),I),"attach")}detach(){this._strategy.destroy(),this.container.children.forEach(t=>t.destroy()),this.container.removeAllChildren(),this.removeHandles("attach"),this._strategy=this.container=this._projectFullExtentPromise=null}getPixelData(){var r;const t=(r=this.container.children[0])==null?void 0:r.rawPixelData;if(this.updating||!t)return null;const{extent:e,pixelBlock:i}=t;return{extent:e,pixelBlock:i}}hitTest(t){return new P({attributes:{},geometry:t.clone(),layer:this.layer})}update(t){this._strategy.update(t,this._symbolizerParams).catch(e=>{b(e)||_.getLogger(this).error(e)})}redraw(){const{renderer:t}=this.layer;t&&(this._updateSymbolizerParams(t),this._strategy.redraw(this._symbolizerParams))}_canReuseVectorFieldData(t){const e=this._dataParameters.exportParametersVersion===t.exportParametersVersion,i=this._dataParameters.time===t.time,r=this._dataParameters.symbolTileSize===t.symbolTileSize,s=this._dataParameters.bbox===t.bbox;return e&&i&&r&&s}async _getProjectedFullExtent(t){try{return rt(this.layer.fullExtent,t)}catch{try{const i=(await T(this.layer.url,{query:{option:"footprints",outSR:z(t),f:"json"}})).data.featureCollection.layers[0].layerDefinition.extent;return i?D.fromJSON(i):null}catch{return null}}}_updateSymbolizerParams(t){t.type==="vector-field"&&(this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null}))}};o([n()],m.prototype,"attached",void 0),o([n()],m.prototype,"container",void 0),o([n()],m.prototype,"layer",void 0),o([n()],m.prototype,"timeExtent",void 0),o([n()],m.prototype,"type",void 0),o([n()],m.prototype,"view",void 0),o([n()],m.prototype,"updating",null),m=o([v("esri.views.2d.layers.imagery.VectorFieldView2D")],m);const dt=m,mt=t=>{let e=class extends t{constructor(){super(...arguments),this.view=null}get timeExtent(){var i;return at(this.layer,(i=this.view)==null?void 0:i.timeExtent,this._get("timeExtent"))}async fetchPopupFeaturesAtLocation(i,r){const{layer:s}=this;if(!i)throw new U("imagerylayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:s});const{popupEnabled:a}=s,l=ot(s,r);if(!a||l==null)return[];const c=await l.getRequiredFields();C(r);const h=new L;h.timeExtent=this.timeExtent,h.geometry=i,h.outFields=c,h.outSpatialReference=i.spatialReference;const{resolution:d,spatialReference:g}=this.view,x=this.view.type==="2d"?new V(d,d,g):new V(.5*d,.5*d,g),{returnTopmostRaster:u,showNoDataRecords:B}=l.layerOptions||{returnTopmostRaster:!0,showNoDataRecords:!1},k={returnDomainValues:!0,returnTopmostRaster:u,pixelSize:x,showNoDataRecords:B,signal:r==null?void 0:r.signal};return s.queryVisibleRasters(h,k).then(A=>A)}canResume(){var i;return!!super.canResume()&&!((i=this.timeExtent)!=null&&i.isEmpty)}};return o([n()],e.prototype,"layer",void 0),o([n()],e.prototype,"suspended",void 0),o([n({readOnly:!0})],e.prototype,"timeExtent",null),o([n()],e.prototype,"view",void 0),e=o([v("esri.views.layers.ImageryLayerView")],e),e};let w=class extends mt(nt(G(J))){constructor(){super(...arguments),this._exportImageVersion=-1,this._highlightGraphics=new M,this._highlightView=void 0,this.layer=null,this.subview=null}get pixelData(){const{subview:t}=this;return this.updating||!t?null:"getPixelData"in t?t.getPixelData():null}update(t){var e;(e=this.subview)==null||e.update(t)}attach(){this.layer.increaseRasterJobHandlerUsage(),this._setSubView(),this.view&&(this._highlightView=new W({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new Q(this.view.featuresTilingScheme)}),this.container.addChild(this._highlightView.container)),this.addAttachHandles([f(()=>this.layer.exportImageServiceParameters.version,t=>{t&&this._exportImageVersion!==t&&(this._exportImageVersion=t,this.requestUpdate())},E),f(()=>this.timeExtent,t=>{const{subview:e}=this;e&&(e.timeExtent=t,"redraw"in e?this.requestUpdate():e.redrawOrRefetch())},E),this.layer.on("redraw",()=>{const{subview:t}=this;t&&("redraw"in t?t.redraw():t.redrawOrRefetch())}),f(()=>this.layer.renderer,()=>this._setSubView())])}detach(){var t,e;this.layer.decreaseRasterJobHandlerUsage(),this.container.removeAllChildren(),this._detachSubview(this.subview),(t=this.subview)==null||t.destroy(),this.subview=null,(e=this._highlightView)==null||e.destroy(),this._exportImageVersion=-1}viewChange(){}moveEnd(){this.requestUpdate()}highlight(t,e){if(!((Array.isArray(t)?t[0]:$.isCollection(t)?t.at(0):t)instanceof P))return S();let i=[];return Array.isArray(t)||$.isCollection(t)?i=t.map(r=>r.clone()):t instanceof P&&(i=[t.clone()]),this._highlightGraphics.addMany(i),S(()=>this._highlightGraphics.removeMany(i))}async doRefresh(){this.requestUpdate()}isUpdating(){var e,i;const t=!this.subview||this.subview.updating||!!((e=this._highlightView)!=null&&e.updating);return O("esri-2d-log-updating")&&console.log(`Updating ImageryLayerView2D (${this.layer.id}): ${t}
-> subview ${!this.subview||this.subview.updating}
-> higlightView ${(i=this._highlightView)==null?void 0:i.updating}
`),t}_setSubView(){var i,r;if(!this.view)return;const t=(i=this.layer.renderer)==null?void 0:i.type;let e="imagery";if(t==="vector-field"?e="imageryVF":t==="flow"&&(e="flow"),this.subview){const{type:s}=this.subview;if(s===e)return this._attachSubview(this.subview),void(s==="flow"?this.subview.redrawOrRefetch():s==="imagery"&&this.layer.format==="lerc"?this.subview.redraw():this.requestUpdate());this._detachSubview(this.subview),(r=this.subview)==null||r.destroy()}this.subview=e==="imagery"?new lt({layer:this.layer,view:this.view,timeExtent:this.timeExtent}):e==="imageryVF"?new dt({layer:this.layer,view:this.view,timeExtent:this.timeExtent}):new N({layer:this.layer,layerView:this}),this._attachSubview(this.subview),this.requestUpdate()}_attachSubview(t){t&&!t.attached&&(t.attach(),t.attached=!0,this.container.addChildAt(t.container,0))}_detachSubview(t){t!=null&&t.attached&&(this.container.removeChild(t.container),t.detach(),t.attached=!1)}};o([n()],w.prototype,"pixelData",null),o([n()],w.prototype,"subview",void 0),w=o([v("esri.views.2d.layers.ImageryLayerView2D")],w);const be=w;export{be as default};
