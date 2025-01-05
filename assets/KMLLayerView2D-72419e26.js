import{t as z,a_ as k,a$ as $,U as B,b as D,V as O,k as F,eI as N,u as C,b3 as T,bR as W,aY as U,eJ as H,eK as A,bc as K,em as J,i as v,y as S,j as Y}from"./index-c6cfe049.js";import{b as P,g as Q,d as X}from"./kmlUtils-66842b00.js";import{g as Z,f as tt,b as et}from"./Bitmap-d271523f.js";import{a as it}from"./BitmapContainer-e5943729.js";import{f as at,y as st}from"./LayerView-e36663b3.js";import{t as M}from"./GraphicContainer-bb28a40a.js";import{V as R}from"./GraphicsView2D-b64a791b.js";import{C as rt,e as ot}from"./rasterProjectionHelper-a2562acb.js";import{a as nt}from"./WGLContainer-437ea4a6.js";import{y as lt,o as pt}from"./RenderingContext-eab90e3c.js";import{D as E,G as ht,U as mt,X as L}from"./enums-2e633670.js";import{E as ct}from"./Program-ceb7c31f.js";import{c as dt}from"./rasterUtils-6026536e.js";import{e as j,c as ut}from"./Texture-6d5abce7.js";import"./jsonUtils-0cfa0239.js";import"./UniqueValueRenderer-2d905f9d.js";import"./ColorStop-3bd1e817.js";import"./diffUtils-a81eba90.js";import"./colorRamps-2725f079.js";import"./sizeVariableUtils-d4870b0d.js";import"./visualVariableUtils-57487c58.js";import"./lengthUtils-806c8c03.js";import"./jsonUtils-17af088a.js";import"./defaults-458d9190.js";import"./defaultsJSON-59981e75.js";import"./styleUtils-12717ade.js";import"./LRUCache-be26918b.js";import"./Version-d58b3305.js";import"./FieldsIndex-815a254a.js";import"./UnknownTimeZone-b1c85c08.js";import"./OverrideHelper-78bed9ed.js";import"./colorUtils-60e0b64a.js";import"./vec42-614f5847.js";import"./vec4f64-430e4feb.js";import"./utils-2af5df8d.js";import"./quantizationUtils-07a0781e.js";import"./heatmapUtils-dc73c34c.js";import"./FeatureSet-402c1fc5.js";import"./Container-5acd0ce7.js";import"./parser-7740a44f.js";import"./highlightReasons-54b6b965.js";import"./definitions-f33e80b3.js";import"./AGraphicContainer-76a125c3.js";import"./TechniqueInstance-c60140cc.js";import"./UpdateTracking2D-ebe3e38b.js";import"./BidiEngine-26aff129.js";import"./OptimizedFeature-059c854c.js";import"./GeometryUtils-a7dec725.js";import"./enums-fb32c1bb.js";import"./Rect-ea14f53a.js";import"./LabelMetric-18a06377.js";import"./VertexElementDescriptor-2925c6af.js";import"./BindType-d21d71dd.js";import"./Util-bd8e9eff.js";import"./TileContainer-47aa2b34.js";import"./FeatureCommandQueue-117fe953.js";import"./ProgramTemplate-fe288a36.js";import"./constants-991354c8.js";import"./vec3f32-ad1dc57f.js";import"./AttributeStore-035e9a1b.js";import"./labelUtils-e96173b2.js";import"./TimeOnly-430d9cda.js";import"./timeSupport-b14221ad.js";import"./featureConversionUtils-830d3ed6.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./json-48e3ea08.js";import"./normalizeUtilsSync-3234a768.js";import"./StyleDefinition-df636448.js";import"./config-1337d16e.js";import"./earcut-354b01bb.js";import"./programUtils-14f48864.js";import"./NestedMap-1b5db22e.js";import"./renderState-303ecedc.js";import"./basicInterfaces-d9412f98.js";import"./interfaces-8918b36f.js";import"./testSVGPremultipliedAlpha-3a41ff11.js";import"./floatRGBA-2ea1fed8.js";import"./doublePrecisionUtils-e3c3d0d8.js";class h{constructor(t){if(this._ownsRctx=!1,t)this._ownsRctx=!1,this._rctx=t;else{if(h._instance)return h._instanceRefCount++,h._instance;h._instanceRefCount=1,h._instance=this,this._ownsRctx=!0;const i=document.createElement("canvas"),a=z(i);a.getExtension("OES_texture_float"),this._rctx=new lt(a,{})}const s={applyProjection:!0,bilinear:!1,bicubic:!1},r=pt("raster/reproject","raster/reproject",new Map([["a_position",0]]),s);this._program=this._rctx.programCache.acquire(r.shaders.vertexShader,r.shaders.fragmentShader,r.attributes),this._rctx.useProgram(this._program),this._program.setUniform1f("u_opacity",1),this._program.setUniform1i("u_image",0),this._program.setUniform1i("u_flipY",0),this._program.setUniform1i("u_transformGrid",1),this._quad=new nt(this._rctx,[0,0,1,0,0,1,1,1])}reprojectTexture(t,s,r=!1){const i=k(t.extent,s),a=new $({x:(t.extent.xmax-t.extent.xmin)/t.texture.descriptor.width,y:(t.extent.ymax-t.extent.ymin)/t.texture.descriptor.height,spatialReference:t.extent.spatialReference}),{x:o,y:p}=rt(a,s,t.extent);let n=(o+p)/2;const l=Math.round((i.xmax-i.xmin)/n),u=Math.round((i.ymax-i.ymin)/n);n=(i.width/l+i.height/u)/2;const I=new $({x:n,y:n,spatialReference:i.spatialReference}),g=ot({projectedExtent:i,srcBufferExtent:t.extent,pixelSize:I,hasWrapAround:!0,spacing:[16,16]}),w=dt(this._rctx,g),y=new j(l,u);y.wrapMode=E.CLAMP_TO_EDGE;const m=new ct(this._rctx,y);this._rctx.bindFramebuffer(m),this._rctx.setViewport(0,0,l,u),this._rctx.useProgram(this._program),this._rctx.bindTexture(t.texture,0),this._rctx.bindTexture(w,1),this._quad.bind();const{width:f=0,height:x=0}=t.texture.descriptor;if(this._program.setUniform2f("u_srcImageSize",f,x),this._program.setUniform2fv("u_transformSpacing",g.spacing),this._program.setUniform2fv("u_transformGridSize",g.size),this._program.setUniform2f("u_targetImageSize",l,u),this._quad.draw(),this._quad.unbind(),this._rctx.useProgram(null),this._rctx.bindFramebuffer(null),w.dispose(),r){const{width:c,height:V}=m,_=new ImageData(c??0,V??0);m.readPixels(0,0,c??0,V??0,ht.RGBA,mt.UNSIGNED_BYTE,_.data);const G=m.detachColorTexture(L.COLOR_ATTACHMENT0);return m.dispose(),{texture:G,extent:i,imageData:_}}const b=m.detachColorTexture(L.COLOR_ATTACHMENT0);return m.dispose(),{texture:b,extent:i}}reprojectBitmapData(t,s){const r=Z(t.bitmapData)?tt(t.bitmapData):t.bitmapData,i=new j;i.wrapMode=E.CLAMP_TO_EDGE,i.width=t.bitmapData.width,i.height=t.bitmapData.height;const a=new ut(this._rctx,i,r),o=this.reprojectTexture({texture:a,extent:t.extent},s,!0);o.texture.dispose();const p=document.createElement("canvas"),n=o.imageData;return p.width=n.width,p.height=n.height,p.getContext("2d").putImageData(n,0,0),{bitmapData:p,extent:o.extent}}async loadAndReprojectBitmapData(t,s,r){const i=(await B(t,{responseType:"image"})).data,a=document.createElement("canvas");a.width=i.width,a.height=i.height;const o=a.getContext("2d");o.drawImage(i,0,0);const p=o.getImageData(0,0,a.width,a.height);if(s.spatialReference.equals(r))return{bitmapData:p,extent:s};const n=this.reprojectBitmapData({bitmapData:p,extent:s},r);return{bitmapData:n.bitmapData,extent:n.extent}}destroy(){this._ownsRctx?(h._instanceRefCount--,h._instanceRefCount===0&&(this._quad.dispose(),this._program.dispose(),this._rctx.dispose(),h._instance=null)):(this._quad.dispose(),this._program.dispose())}}h._instanceRefCount=0;class q{constructor(){this.allSublayers=new Map,this.allPoints=[],this.allPolylines=[],this.allPolygons=[],this.allMapImages=[]}}let d=class extends at(st){constructor(){super(...arguments),this._bitmapIndex=new Map,this._mapImageContainer=new it,this._kmlVisualData=new q,this._fetchController=null,this.allVisiblePoints=new D,this.allVisiblePolylines=new D,this.allVisiblePolygons=new D,this.allVisibleMapImages=new O}async hitTest(e,t){var r,i,a;const s=this.layer;return[(r=this._pointsView)==null?void 0:r.hitTest(e),(i=this._polylinesView)==null?void 0:i.hitTest(e),(a=this._polygonsView)==null?void 0:a.hitTest(e)].flat().filter(Boolean).map(o=>(o.layer=s,o.sourceLayer=s,{type:"graphic",graphic:o,layer:s,mapPoint:e}))}update(e){this._polygonsView&&this._polygonsView.processUpdate(e),this._polylinesView&&this._polylinesView.processUpdate(e),this._pointsView&&this._pointsView.processUpdate(e)}attach(){this._fetchController=new AbortController,this.container.addChild(this._mapImageContainer),this._polygonsView=new R({view:this.view,graphics:this.allVisiblePolygons,requestUpdateCallback:()=>this.requestUpdate(),container:new M(this.view.featuresTilingScheme)}),this.container.addChild(this._polygonsView.container),this._polylinesView=new R({view:this.view,graphics:this.allVisiblePolylines,requestUpdateCallback:()=>this.requestUpdate(),container:new M(this.view.featuresTilingScheme)}),this.container.addChild(this._polylinesView.container),this._pointsView=new R({view:this.view,graphics:this.allVisiblePoints,requestUpdateCallback:()=>this.requestUpdate(),container:new M(this.view.featuresTilingScheme)}),this.container.addChild(this._pointsView.container),this.addAttachHandles([this.allVisibleMapImages.on("change",e=>{e.added.forEach(t=>this._addMapImage(t)),e.removed.forEach(t=>this._removeMapImage(t))}),F(()=>this.layer.visibleSublayers,e=>{for(const[t,s]of this._kmlVisualData.allSublayers)s.visibility=0;for(const t of e){const s=this._kmlVisualData.allSublayers.get(t.id);s&&(s.visibility=1)}this._refreshCollections()})]),this._updatingHandles.addPromise(this._fetchService(this._fetchController.signal)),this._imageReprojector=new h}detach(){this._fetchController=N(this._fetchController),this._mapImageContainer.removeAllChildren(),this.container.removeAllChildren(),this._bitmapIndex.clear(),this._polygonsView=C(this._polygonsView),this._polylinesView=C(this._polylinesView),this._pointsView=C(this._pointsView),this._imageReprojector=C(this._imageReprojector)}viewChange(){this._polygonsView.viewChange(),this._polylinesView.viewChange(),this._pointsView.viewChange()}moveEnd(){}isUpdating(){return this._pointsView.updating||this._polygonsView.updating||this._polylinesView.updating}_addMapImage(e){var t,s;((t=this.view.spatialReference)!=null&&t.isWGS84||(s=this.view.spatialReference)!=null&&s.isWebMercator)&&this._imageReprojector.loadAndReprojectBitmapData(e.href,T.fromJSON(e.extent),this.view.spatialReference).then(r=>{const i=new et(r.bitmapData);i.x=r.extent.xmin,i.y=r.extent.ymax,i.resolution=r.extent.width/r.bitmapData.width,i.rotation=e.rotation,this._mapImageContainer.addChild(i),this._bitmapIndex.set(e,i)})}async _getViewDependentUrl(e,t){const{viewFormat:s,viewBoundScale:r,httpQuery:i}=e;if(s!=null){if(t==null)throw new Error("Loading this network link requires a view state.");let a;if(await W(),r!=null&&r!==1){const c=new T(t.extent);c.expand(r),a=c}else a=t.extent;a=k(a,U.WGS84);const o=k(a,U.WebMercator),p=a.xmin,n=a.xmax,l=a.ymin,u=a.ymax,I=t.size[0]*t.pixelRatio,g=t.size[1]*t.pixelRatio,w=Math.max(o.width,o.height),y={"[bboxWest]":p.toString(),"[bboxEast]":n.toString(),"[bboxSouth]":l.toString(),"[bboxNorth]":u.toString(),"[lookatLon]":a.center.x.toString(),"[lookatLat]":a.center.y.toString(),"[lookatRange]":w.toString(),"[lookatTilt]":"0","[lookatHeading]":t.rotation.toString(),"[lookatTerrainLon]":a.center.x.toString(),"[lookatTerrainLat]":a.center.y.toString(),"[lookatTerrainAlt]":"0","[cameraLon]":a.center.x.toString(),"[cameraLat]":a.center.y.toString(),"[cameraAlt]":w.toString(),"[horizFov]":"60","[vertFov]":"60","[horizPixels]":I.toString(),"[vertPixels]":g.toString(),"[terrainEnabled]":"0","[clientVersion]":H,"[kmlVersion]":"2.2","[clientName]":"ArcGIS API for JavaScript","[language]":"en-US"},m=c=>{for(const V in c){let _;for(_ in y)c[V]=c[V].replace(_,y[_])}},f=A(s);m(f);let x={};i!=null&&(x=A(i),m(x));const b=K(e.href);return b.query={...b.query,...f,...x},`${b.path}?${J(f)}`}return e.href}async _fetchService(e){const t=new q;await this._loadVisualData(this.layer.url,t,e),this._kmlVisualData=t,this._refreshCollections()}_refreshCollections(){this.allVisiblePoints.removeAll(),this.allVisiblePolylines.removeAll(),this.allVisiblePolygons.removeAll(),this.allVisibleMapImages.removeAll(),this.allVisiblePoints.addMany(this._kmlVisualData.allPoints.filter(e=>this._isSublayerVisible(e.sublayerId)).map(({item:e})=>e)),this.allVisiblePolylines.addMany(this._kmlVisualData.allPolylines.filter(e=>this._isSublayerVisible(e.sublayerId)).map(({item:e})=>e)),this.allVisiblePolygons.addMany(this._kmlVisualData.allPolygons.filter(e=>this._isSublayerVisible(e.sublayerId)).map(({item:e})=>e)),this.allVisibleMapImages.addMany(this._kmlVisualData.allMapImages.filter(e=>this._isSublayerVisible(e.sublayerId)).map(({item:e})=>e))}_isSublayerVisible(e){const t=this._kmlVisualData.allSublayers.get(e);return!!(t!=null&&t.visibility)&&(t.parentFolderId===-1||this._isSublayerVisible(t.parentFolderId))}_loadVisualData(e,t,s){return this._fetchParsedKML(e,s).then(async r=>{for(const i of r.sublayers){t.allSublayers.set(i.id,i);const a=i.points?await P(i.points):[],o=i.polylines?await P(i.polylines):[],p=i.polygons?await P(i.polygons):[],n=i.mapImages||[];if(t.allPoints.push(...a.map(l=>({item:l,sublayerId:i.id}))),t.allPolylines.push(...o.map(l=>({item:l,sublayerId:i.id}))),t.allPolygons.push(...p.map(l=>({item:l,sublayerId:i.id}))),t.allMapImages.push(...n.map(l=>({item:l,sublayerId:i.id}))),i.networkLink){const l=await this._getViewDependentUrl(i.networkLink,this.view.state);await this._loadVisualData(l,t,s)}}})}_fetchParsedKML(e,t){return Q(e,this.layer.spatialReference,this.layer.refreshInterval,t).then(s=>X(s.data))}_removeMapImage(e){const t=this._bitmapIndex.get(e);t&&(this._mapImageContainer.removeChild(t),this._bitmapIndex.delete(e))}};v([S()],d.prototype,"_pointsView",void 0),v([S()],d.prototype,"_polylinesView",void 0),v([S()],d.prototype,"_polygonsView",void 0),v([S()],d.prototype,"updating",void 0),d=v([Y("esri.views.2d.layers.KMLLayerView2D")],d);const qe=d;export{qe as default};
