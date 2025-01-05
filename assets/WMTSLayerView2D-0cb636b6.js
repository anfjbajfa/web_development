import{d as _,m as w,r as g,G as u,g as p,f,n as I,i as d,y as S,j as T}from"./index-c6cfe049.js";import{r as V,n as m}from"./imageUtils-f7f39eac.js";import{f as v,y as x}from"./LayerView-e36663b3.js";import{i as M}from"./RefreshableLayerView-90cb0307.js";import"./Bitmap-d271523f.js";import"./Container-5acd0ce7.js";import"./parser-7740a44f.js";import"./highlightReasons-54b6b965.js";import"./definitions-f33e80b3.js";import"./enums-2e633670.js";import"./Texture-6d5abce7.js";import"./WGLContainer-437ea4a6.js";import"./LabelMetric-18a06377.js";import"./enums-fb32c1bb.js";import"./Program-ceb7c31f.js";import"./VertexElementDescriptor-2925c6af.js";import"./ProgramTemplate-fe288a36.js";import"./vec3f32-ad1dc57f.js";import"./StyleDefinition-df636448.js";import"./config-1337d16e.js";import"./earcut-354b01bb.js";import"./featureConversionUtils-830d3ed6.js";import"./OptimizedFeature-059c854c.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./TileContainer-47aa2b34.js";const q=new Set([102113,102100,3857,3785,900913]),R=[0,0];let r=class extends M(V(v(x))){constructor(){super(...arguments),this._tileStrategy=null,this._fetchQueue=null,this.layer=null}get tileMatrixSet(){const e=this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);return e?(e.id!==this.layer.activeLayer.tileMatrixSetId&&(this.layer.activeLayer.tileMatrixSetId=e.id),e):null}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume()}attach(){var t;const e=(t=this.tileMatrixSet)==null?void 0:t.tileInfo;e&&(this._tileInfoView=new _(e),this._fetchQueue=new w({tileInfoView:this._tileInfoView,concurrency:16,process:(i,s)=>this.fetchTile(i,s)}),this._tileStrategy=new g({cachePolicy:"keep",resampling:!0,acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),tileInfoView:this._tileInfoView}),this.addAttachHandles(this._updatingHandles.add(()=>{var i,s;return[(s=(i=this.layer)==null?void 0:i.activeLayer)==null?void 0:s.styleId,this.tileMatrixSet]},()=>this.doRefresh())),super.attach())}detach(){var e,t;super.detach(),(e=this._tileStrategy)==null||e.destroy(),(t=this._fetchQueue)==null||t.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}supportsSpatialReference(e){var t;return((t=this.layer.activeLayer.tileMatrixSets)==null?void 0:t.some(i=>{var s;return u((s=i.tileInfo)==null?void 0:s.spatialReference,e)}))??!1}async doRefresh(){if(this.attached){if(this.suspended)return this._tileStrategy.clear(),void this.requestUpdate();this._fetchQueue.reset(),this._tileStrategy.refresh(e=>this._updatingHandles.addPromise(this._enqueueTileFetch(e)))}}acquireTile(e){const t=this._bitmapView.createTile(e),i=t.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(R,t.key),i.resolution=this._tileInfoView.getTileResolution(t.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._updatingHandles.addPromise(this._enqueueTileFetch(t)),this._bitmapView.addChild(t),this.requestUpdate(),t}releaseTile(e){this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",()=>e.destroy()),this.requestUpdate()}async fetchTile(e,t={}){const i="tilemapCache"in this.layer?this.layer.tilemapCache:null,{signal:s,resamplingLevel:a=0}=t;if(!i)return this._fetchImage(e,s);const l=new p(0,0,0,0);let n;try{await i.fetchAvailabilityUpsample(e.level,e.row,e.col,l,{signal:s}),n=await this._fetchImage(l,s)}catch(h){if(f(h))throw h;if(a<3){const o=this._tileInfoView.getTileParentId(e.id);if(o){const c=new p(o),y=await this.fetchTile(c,{...t,resamplingLevel:a+1});return m(this._tileInfoView,y,c,e)}}throw h}return m(this._tileInfoView,n,l,e)}canResume(){const e=super.canResume();return e&&this.tileMatrixSet!==null}async _enqueueTileFetch(e){if(!this._fetchQueue.has(e.key.id)){try{const t=await this._fetchQueue.push(e.key);e.bitmap.source=t,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.once("attach",()=>this.requestUpdate())}catch(t){f(t)||I.getLogger(this).error(t)}this.requestUpdate()}}async _fetchImage(e,t){return this.layer.fetchImageBitmapTile(e.level,e.row,e.col,{signal:t})}_getTileMatrixSetBySpatialReference(e){const t=this.view.spatialReference;if(!e.tileMatrixSets)return null;let i=e.tileMatrixSets.find(s=>{var a;return u((a=s.tileInfo)==null?void 0:a.spatialReference,t)});return!i&&t.isWebMercator&&(i=e.tileMatrixSets.find(s=>{var a;return q.has(((a=s.tileInfo)==null?void 0:a.spatialReference.wkid)??-1)})),i}};d([S({readOnly:!0})],r.prototype,"tileMatrixSet",null),r=d([T("esri.views.2d.layers.WMTSLayerView2D")],r);const ee=r;export{ee as default};
