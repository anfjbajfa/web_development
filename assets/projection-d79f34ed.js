import{cT as M,cU as _,cV as j,cW as S,cX as R,cY as w,cZ as x,c_ as O,bT as W,c$ as b,d0 as Y,cS as B,d1 as U,d2 as q,d3 as z,d4 as L,d5 as J,av as X,d6 as Z}from"./index-c6cfe049.js";import{e as D}from"./mat3f64-e19cdcb8.js";import{o as N,e as H}from"./mat4f64-9a8384aa.js";import{a as C}from"./spatialReferenceEllipsoidUtils-eca7bf87.js";import{u as V}from"./computeTranslationToOriginAndRotation-ad79d5a8.js";import{t as G,o as I}from"./DoubleArray-2311ad80.js";import{i as A,T as F}from"./BufferView-b0b4cfa5.js";import{f as K,l as $,e as k}from"./vec3-a9852a06.js";import{n as Q}from"./vec4-4ea09148.js";import"./vec42-614f5847.js";const pr="Projection may be possible after calling projection.load().";function Tr(r,o,t,a){r.error(`Failed to project from (wkid:${o.wkid}) to (wkid:${t.wkid}).${a?" ":""}${a}`)}function Pr(r,o,t,a,e){return E(d.TO_PCPF,A.fromTypedArray(r),u.NORMAL,F.fromTypedArray(o),F.fromTypedArray(t),a,A.fromTypedArray(e))?e:null}function yr(r,o,t,a,e){return E(d.FROM_PCPF,A.fromTypedArray(r),u.NORMAL,F.fromTypedArray(o),F.fromTypedArray(t),a,A.fromTypedArray(e))?e:null}function dr(r,o,t){return M(r,o,0,t,C(o),0,r.length/3)?t:null}function Ar(r,o,t){return M(r,C(t),0,o,t,0,r.length/3)?o:null}function Fr(r,o,t){return _(f,t),K(o,r,f),j(f)&&$(o,o),o}function Nr(r,o,t){return S(f,t),Q(o,r,f),j(f)&&$(o,o,4),o}function gr(r,o,t,a){const e=o===u.NORMAL;return v(r,o,t,(c,l)=>{const n=Math.cos(Z(c));l[0]=e?n:1/n,l[1]=1},a)}function Mr(r,o,t,a){const e=o===u.NORMAL;return v(r,o,t,(c,l)=>{const n=Math.cosh(-c/X.radius);l[0]=1,l[1]=e?n:1/n},a)}function v(r,o,t,a,e){const c=o===u.NORMAL?3:4,l=[0,0];for(let n=0,m=1;n<r.length;n+=c,m+=3){a(t[m],l);const i=r[n]*l[0],p=r[n+1]*l[1],s=r[n+2],P=1/Math.sqrt(i*i+p*p+s*s);e[n]=i*P,e[n+1]=p*P,e[n+2]=s*P,c===4&&(e[n+3]=r[n+3])}return e}function Cr(r,o,t,a,e){if(!E(d.TO_PCPF,A.fromTypedArray(r,4*Float32Array.BYTES_PER_ELEMENT),u.TANGENT,F.fromTypedArray(o),F.fromTypedArray(t),a,A.fromTypedArray(e,4*Float32Array.BYTES_PER_ELEMENT)))return null;for(let c=3;c<r.length;c+=4)e[c]=r[c];return e}function Er(r,o,t,a,e){if(!E(d.FROM_PCPF,A.fromTypedArray(r,16),u.TANGENT,F.fromTypedArray(o),F.fromTypedArray(t),a,A.fromTypedArray(e,16)))return null;for(let c=3;c<r.length;c+=4)e[c]=r[c];return e}var u,d;function h(r,o,t,a,e){switch(V(a,t,y,a),r===d.FROM_PCPF&&J(y,y),o){case u.NORMAL:return _(e,y);case u.TANGENT:return S(e,y)}}function E(r,o,t,a,e,c,l){if(!o)return;const n=a.count,m=C(c);if(tr(c))for(let i=0;i<n;i++)e.getVec(i,g),o.getVec(i,T),R(T,T,h(r,t,g,m,f)),l.setVec(i,T);else for(let i=0;i<n;i++){e.getVec(i,g),o.getVec(i,T);const p=w(a.get(i,1));let s=Math.cos(p);t===u.TANGENT!=(r===d.TO_PCPF)&&(s=1/s),h(r,t,g,m,f),r===d.TO_PCPF?(f[0]*=s,f[1]*=s,f[2]*=s,f[3]*=s,f[4]*=s,f[5]*=s):(f[0]*=s,f[3]*=s,f[6]*=s,f[1]*=s,f[4]*=s,f[7]*=s),R(T,T,f),x(T,T),l.setVec(i,T)}return l}function Or(r){return r.vertexSpace.type==="local"?rr(r):or(r)}function rr({vertexSpace:r,transform:o,inSpatialReference:t,outSpatialReference:a,localMode:e,outPositions:c,positions:l}){const n=r.origin??O,m=r.origin!=null?(o==null?void 0:o.localMatrix)??N:N,i=C(t),p=a.isWebMercator&&e||!W(t,i)?t:i;V(t,n,y,p),b(y,y,m);const s=c??G(l.length);return k(s,l,y),M(s,p,0,s,a,0,s.length/3),s}function or({vertexSpace:r,transform:o,outPositions:t,positions:a,inSpatialReference:e,outSpatialReference:c}){const l=r.origin!=null?(o==null?void 0:o.localMatrix)??N:N,n=t??G(a.length);Y(l,N)?I(n,a):k(n,a,l);const m=r.origin??O;if(!B(m,O)){const[i,p,s]=m;for(let P=0;P<n.length;P+=3)n[P]+=i,n[P+1]+=p,n[P+2]+=s}return M(n,e,0,n,c,0,n.length/3)?n:null}function tr(r){return r.isWGS84||U(r)||q(r)||z(r)}(function(r){r[r.NORMAL=0]="NORMAL",r[r.TANGENT=1]="TANGENT"})(u||(u={})),function(r){r[r.TO_PCPF=0]="TO_PCPF",r[r.FROM_PCPF=1]="FROM_PCPF"}(d||(d={}));const g=L(),T=L(),y=H(),f=D();export{u as VectorType,pr as loadProjectErrorMessage,Tr as logProjectionError,Or as project,Ar as projectFromPCPF,yr as projectNormalFromPCPF,Pr as projectNormalToPCPF,Er as projectTangentFromPCPF,Cr as projectTangentToPCPF,dr as projectToPCPF,Fr as transformNormal,Nr as transformTangent,gr as transformVectorENUPlateCarree,Mr as transformVectorWMPlateCarree};
