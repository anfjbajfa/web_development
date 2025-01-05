import{c6 as j,c7 as z,c8 as G,c9 as A,ca as B,cb as C,cc as D,cd as E,ay as L,ce as k}from"./index-c6cfe049.js";import{r as q}from"./vec3f32-ad1dc57f.js";import{n as F,h as H}from"./WGLContainer-437ea4a6.js";import{E as J}from"./Container-5acd0ce7.js";class V extends F{constructor(){super(...arguments),this._viewStateId=-1,this._dvsMat3=j()}get dvsMat3(){return this._dvsMat3}beforeRender(e){this._updateMatrices(e),this._updateOverlays(e,this.children);for(const s of this.children)s.beforeRender(e)}prepareRenderPasses(e){const s=e.registerRenderPass({name:"overlay",brushes:[H.overlay],target:()=>this.children,drawPhase:J.MAP});return[...super.prepareRenderPasses(e),s]}_updateMatrices(e){const{state:s}=e,{id:a,size:h,pixelRatio:r,resolution:c,rotation:l,viewpoint:u,displayMat3:_}=s;if(this._viewStateId===a)return;const p=Math.PI/180*l,i=r*h[0],n=r*h[1];this._localOrigin=u.targetGeometry.clone();const{x:d,y:v}=this._localOrigin,M=z(d,s.spatialReference);this._localOrigin.x=M,this._localOrigin.y=v;const m=c*i,g=c*n,t=G(this._dvsMat3);A(t,t,_),B(t,t,C(i/2,n/2)),D(t,t,q(i/m,-n/g,1)),E(t,t,-p),this._viewStateId=a}_updateOverlays(e,s){const{state:a}=e,{rotation:h,spatialReference:r,worldScreenWidth:c,size:l,viewpoint:u}=a,_=this._localOrigin;let p,i=0;const n=L(r);if(n&&r.isWrappable){const d=l[0],v=l[1],M=180/Math.PI*h,m=Math.abs(Math.cos(M)),g=Math.abs(Math.sin(M)),t=Math.round(d*m+v*g),[b,x]=n.valid,o=k(r),{x:O,y:I}=u.targetGeometry,S=[O,I],y=[0,0];a.toScreen(y,S);const f=[0,0];let w;w=t>c?.5*c:.5*t;const P=Math.floor((O+.5*o)/o),$=b+P*o,W=x+P*o,R=[y[0]+w,0];a.toMap(f,R),f[0]>W&&(i=o),R[0]=y[0]-w,a.toMap(f,R),f[0]<$&&(i=-o),p={worldWidth:o,xBounds:[b,x]}}for(const d of s)d.updateDrawCoords(_,i,r,p)}}export{V as f};
