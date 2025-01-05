import{aY as A,b3 as b,dU as _,dp as x,ds as U,dv as p,dV as $,dr as S,cT as E,cO as L,dW as T,dX as R,dY as d,A as j,aV as D,U as z,n as V,i as c,y as u,j as X,d4 as g,cl as W}from"./index-c6cfe049.js";import{S as k}from"./MultiOriginJSONSupport-7cf2254f.js";import{i as F}from"./APIKeyMixin-99f87d3a.js";import{l as G}from"./ArcGISService-866655aa.js";import{e as K}from"./CustomParametersMixin-d7ae0b0b.js";import{b as O}from"./OperationalLayer-d666f103.js";import{j as P}from"./PortalLayer-089ac58c.js";import{t as q}from"./ScaleRangeLayer-2709e17c.js";import{d as Y,p as Z}from"./commonProperties-b537568a.js";import{$ as N,Z as B,w as C}from"./elevationInfoUtils-0c072087.js";import"./portalItemUtils-bca17985.js";import"./ElevationInfo-58ee6e4f.js";import"./lengthUtils-806c8c03.js";let m=class extends G(O(P(q(k(K(F(W))))))){constructor(r){super(r),this.operationalLayerType="IntegratedMesh3DTilesLayer",this.spatialReference=new A({wkid:4326,vcsWkid:115700}),this.fullExtent=new b(-180,-90,180,90,this.spatialReference),this.url=null,this.type="integrated-mesh-3dtiles",this.path=null,this.minScale=0,this.maxScale=0}set elevationInfo(r){this._set("elevationInfo",r),this._validateElevationInfo()}_verifyArray(r,i){if(!Array.isArray(r)||r.length<i)return!1;for(const n of r)if(typeof n!="number")return!1;return!0}_initFullExtent(r){var I,M;const i=(I=r.root)==null?void 0:I.boundingVolume;if(!i)return;if(i.box){const t=i==null?void 0:i.box;if(t[3]>7972671&&t[7]>7972671&&t[11]>7945940)return}const n=(M=r.root)==null?void 0:M.transform,f=g();if(i.region&&this._verifyArray(i.region,6)){const t=i.region,l=_(t[0]),o=_(t[1]),a=t[4],s=_(t[2]),e=_(t[3]),y=t[5];this.fullExtent=new b({xmin:l,ymin:o,zmin:a,xmax:s,ymax:e,zmax:y,spatialReference:this.spatialReference})}else if(i.sphere&&this._verifyArray(i.sphere,4)){const t=i.sphere,l=x(t[0],t[1],t[2]),o=t[3]/Math.sqrt(3),a=g();U(a,l,x(o,o,o));const s=g();if(p(s,l,x(o,o,o)),n&&this._verifyArray(n,16)){const v=n;$(f,a,v),S(a,f),$(f,s,v),S(s,f)}E(a,L,0,a,A.WGS84,0,1),E(s,L,0,s,A.WGS84,0,1);const e=g(),y=g();T(e,a,s),R(y,a,s),this.fullExtent=new b({xmin:e[0],ymin:e[1],zmin:e[2],xmax:y[0],ymax:y[1],zmax:y[2],spatialReference:this.spatialReference})}else if(i.box&&this._verifyArray(i.box,12)){const t=i.box,l=x(t[0],t[1],t[2]),o=x(t[3],t[4],t[5]),a=x(t[6],t[7],t[8]),s=x(t[9],t[10],t[11]),e=[];for(let h=0;h<8;++h)e.push(g());if(p(e[0],l,o),p(e[0],e[0],a),p(e[0],e[0],s),d(e[1],l,o),p(e[1],e[1],a),p(e[1],e[1],s),p(e[2],l,o),d(e[2],e[2],a),p(e[2],e[2],s),d(e[3],l,o),d(e[3],e[3],a),p(e[3],e[3],s),p(e[4],l,o),p(e[4],e[4],a),d(e[4],e[4],s),d(e[5],l,o),p(e[5],e[5],a),d(e[5],e[5],s),p(e[6],l,o),d(e[6],e[6],a),d(e[6],e[6],s),d(e[7],l,o),d(e[7],e[7],a),d(e[7],e[7],s),n&&this._verifyArray(n,16)){const h=n;for(let w=0;w<8;++w)$(e[w],e[w],h)}const y=x(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),v=x(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE);for(let h=0;h<8;++h)E(e[h],L,0,e[h],A.WGS84,0,1),T(v,v,e[h]),R(y,y,e[h]);this.fullExtent=new b({xmin:v[0],ymin:v[1],zmin:v[2],xmax:y[0],ymax:y[1],zmax:y[2],spatialReference:this.spatialReference})}}async load(r){return this.addResolvingPromise(this._doLoad(r)),this}async _doLoad(r){const i=r!=null?r.signal:null;try{await this.loadFromPortal({supportedTypes:["3DTiles Service"],validateItem:n=>{var f;if((f=n.typeKeywords)!=null&&f.includes("IntegratedMesh"))return!0;throw new j("portal:invalid-layer-item-type","Invalid layer item, expected '${expectedType}' ",{expectedType:"3DTiles Service containing IntegratedMesh"})}},r)}catch(n){D(n)}this.url&&await z(this.url,{query:{f:"json",...this.customParameters,token:this.apiKey},responseType:"json",signal:i}).then(f=>{this._initFullExtent(f.data)},f=>{D(f)})}async fetchAttributionData(){return this.load().then(()=>({}))}_validateElevationInfo(){const r=this.elevationInfo,i="Integrated mesh 3d tiles layers";N(V.getLogger(this),B(i,"absolute-height",r)),N(V.getLogger(this),C(i,r))}};c([u({type:["IntegratedMesh3DTilesLayer"]})],m.prototype,"operationalLayerType",void 0),c([u({type:A})],m.prototype,"spatialReference",void 0),c([u({type:b})],m.prototype,"fullExtent",void 0),c([u(Y)],m.prototype,"elevationInfo",null),c([u({type:["show","hide"]})],m.prototype,"listMode",void 0),c([u(Z)],m.prototype,"url",void 0),c([u({readOnly:!0})],m.prototype,"type",void 0),c([u({type:String,json:{origins:{"web-scene":{read:!0,write:!0},"portal-item":{read:!0,write:!0}},read:!1}})],m.prototype,"path",void 0),c([u({type:Number,json:{name:"layerDefinition.minScale",write:!0,origins:{service:{read:!1,write:!1}}}})],m.prototype,"minScale",void 0),c([u({type:Number,json:{name:"layerDefinition.maxScale",write:!0,origins:{service:{read:!1,write:!1}}}})],m.prototype,"maxScale",void 0),m=c([X("esri.layers.IntegratedMesh3DTilesLayer")],m);const me=m;export{me as default};
