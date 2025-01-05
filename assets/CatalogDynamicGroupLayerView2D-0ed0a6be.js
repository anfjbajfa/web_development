import{i as n,y as l,j as $,V as S,eE as U,eF as _,e as x,eG as H,n as I,c4 as g}from"./index-c6cfe049.js";import{f as O,y as E}from"./LayerView-e36663b3.js";import"./Container-5acd0ce7.js";import"./parser-7740a44f.js";import"./highlightReasons-54b6b965.js";import"./definitions-f33e80b3.js";import"./enums-2e633670.js";import"./Texture-6d5abce7.js";const u=Symbol(),T=p=>{let r=class extends p{constructor(){super(...arguments),this.layerViews=new S,this._debouncedUpdate=U(async()=>{const{layer:e,parent:t}=this,a=t==null?void 0:t.footprintLayerView;let s=[];const d=this._createQuery();if(d&&a){const{features:h}=await a.queryFeatures(d);this.suspended||(s=h.map(c=>e.acquireLayer(c)))}this.removeHandles(u),this.addHandles(s,u)})}get creatingLayerViews(){var e;return((e=this.view)==null?void 0:e.layerViewManager.isCreatingLayerViewsForLayer(this.layer))??!1}isUpdating(){return this.creatingLayerViews||this.layer.updating||this.layerViews.some(e=>e.updating)}enableLayerUpdates(){return _([this._updatingHandles.addWhen(()=>{var e,t;return((t=(e=this.parent)==null?void 0:e.footprintLayerView)==null?void 0:t.dataUpdating)===!1},()=>this.updateLayers()),this._updatingHandles.add(()=>{var e,t,a,s,d;return[this.layer.maximumVisibleSublayers,(e=this.layer.parent)==null?void 0:e.orderBy,(a=(t=this.parent)==null?void 0:t.footprintLayerView)==null?void 0:a.filter,(d=(s=this.parent)==null?void 0:s.footprintLayerView)==null?void 0:d.timeExtent,this.suspended]},()=>this.updateLayers()),x(()=>this.removeHandles(u))])}updateLayers(){this.suspended?this.removeHandles(u):this._updatingHandles.addPromise(H(this._debouncedUpdate()).catch(e=>{I.getLogger(this).error(e)}))}_createQuery(){var V,v;const e=(V=this.parent)==null?void 0:V.footprintLayerView,t=(v=this.layer)==null?void 0:v.parent;if(!e||!t||t.destroyed)return null;const{layer:{maximumVisibleSublayers:a},view:{scale:s}}=this;if(!a)return null;const{itemTypeField:d,itemSourceField:h,itemNameField:c,minScaleField:m,maxScaleField:f,objectIdField:F,orderBy:w}=t,C=g(`${m} IS NULL OR ${s} <= ${m} OR ${m} = 0`,`${f} IS NULL OR ${s} >= ${f}`),o=w==null?void 0:w.find(y=>y.field&&!y.valueExpression),i=e.createQuery();if(i.returnGeometry=!1,i.num=a,i.outFields=[F,h,c],i.where=g(i.where,C),this.unsupportedItemTypes!=null){const y=`${d} NOT IN (${this.unsupportedItemTypes.map(b=>`'${b}'`)})`;i.where=g(i.where,y)}return o!=null&&o.field&&(i.orderByFields=[`${o.field} ${o.order==="descending"?"DESC":"ASC"}`],i.outFields.push(o.field)),i}};return n([l({readOnly:!0})],r.prototype,"creatingLayerViews",null),n([l()],r.prototype,"layer",void 0),n([l()],r.prototype,"layerViews",void 0),n([l({readOnly:!0})],r.prototype,"unsupportedItemTypes",void 0),n([l()],r.prototype,"parent",void 0),n([l({readOnly:!0})],r.prototype,"isUpdating",null),r=n([$("esri.views.layers.CatalogDynamicGroupLayerView")],r),r};let L=class extends T(O(E)){constructor(){super(...arguments),this.unsupportedItemTypes=["Scene Service"],this.layerViews=new S}attach(){this.addAttachHandles([this.layerViews.on("after-changes",()=>this._updateStageChildren()),this.enableLayerUpdates()])}detach(){this.container.removeAllChildren()}update(p){this.updateLayers()}viewChange(){}moveEnd(){this.requestUpdate()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((p,r)=>this.container.addChildAt(p.container,r))}};L=n([$("esri.views.2d.layers.CatalogDynamicGroupLayerView2D")],L);const M=L;export{M as default};
