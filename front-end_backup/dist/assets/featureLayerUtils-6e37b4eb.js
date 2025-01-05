import{bd as y,be as O,e_ as P,e$ as j,A as s,_ as F,f0 as x,f1 as E,aW as m,bp as R}from"./index-c6cfe049.js";import{p as C}from"./jsonUtils-0cfa0239.js";import{A as S}from"./UniqueValueRenderer-2d905f9d.js";import{c as _,d as q}from"./RelationshipQuery-21a3a6e4.js";async function L(e,t,r){t=t.clone(),e.capabilities.query.supportsMaxRecordCountFactor&&(t.maxRecordCountFactor=A(e));const n=M(e),a=e.capabilities.query.supportsPagination;t.start=0,t.num=n;let o=null;for(;;){const i=await e.source.queryFeaturesJSON(t,r);if(o==null?o=i:o.features=o.features.concat(i.features),o.exceededTransferLimit=i.exceededTransferLimit,!a||!i.exceededTransferLimit)break;t.start+=n}return o}function M(e){return A(e)*T(e)}function T(e){return e.capabilities.query.maxRecordCount||2e3}function A(e){return e.capabilities.query.supportsMaxRecordCountFactor?y.MAX_MAX_RECORD_COUNT_FACTOR:1}const U=new O({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch"});async function Z(e,t,r,n){const a=await f(e);if(await b(e,t,n),!a.addAttachment)throw new s(n,"Layer source does not support addAttachment capability");return a.addAttachment(t,r)}function b(e,t,r){var o,i;const{attributes:n}=t,{objectIdField:a}=e;return(i=(o=e.capabilities)==null?void 0:o.data)!=null&&i.supportsAttachment?t?n?a&&n[a]?Promise.resolve():Promise.reject(new s(r,`feature is missing the identifying attribute ${a}`)):Promise.reject(new s(r,"'attributes' are required on a feature to query attachments")):Promise.reject(new s(r,"A feature is required to add/delete/update attachments")):Promise.reject(new s(r,"this layer doesn't support attachments"))}async function k(e,t,r,n,a){const o=await f(e);if(await b(e,t,a),!o.updateAttachment)throw new s(a,"Layer source does not support updateAttachment capability");return o.updateAttachment(t,r,n)}async function H(e,t,r){const{applyEdits:n}=await F(()=>import("./editingSupport-208b51d8.js"),["assets/editingSupport-208b51d8.js","assets/index-c6cfe049.js","assets/index-16a932bd.css","assets/EditBusLayer-1e67be81.js","assets/infoFor3D-24efd44a.js"]),a=await e.load();let o=r;return a.type==="feature"&&a.infoFor3D&&t.deleteFeatures!=null&&a.globalIdField!=null&&(o={...o,globalIdToObjectId:await v(a,t.deleteFeatures,a.globalIdField)}),n(a,a.source,t,r)}async function X(e,t,r){const{uploadAssets:n}=await F(()=>import("./editingSupport-208b51d8.js"),["assets/editingSupport-208b51d8.js","assets/index-c6cfe049.js","assets/index-16a932bd.css","assets/EditBusLayer-1e67be81.js","assets/infoFor3D-24efd44a.js"]),a=await e.load();return n(a,a.source,t,r)}async function z(e,t,r,n){const a=await f(e);if(await b(e,t,n),!a.deleteAttachments)throw new s(n,"Layer source does not support deleteAttachments capability");return a.deleteAttachments(t,r)}async function W(e,t,r){const n=(await e.load({signal:t==null?void 0:t.signal})).source;if(!n.fetchRecomputedExtents)throw new s(r,"Layer source does not support fetchUpdates capability");return n.fetchRecomputedExtents(t)}async function B(e,t,r,n){var g,I;t=_.from(t),await e.load();const a=e.source,o=e.capabilities;if(!((g=o==null?void 0:o.data)!=null&&g.supportsAttachment))throw new s(n,"this layer doesn't support attachments");const{attachmentTypes:i,objectIds:d,globalIds:p,num:u,size:c,start:l,where:w}=t;if(!((I=o==null?void 0:o.operations)!=null&&I.supportsQueryAttachments)&&((i==null?void 0:i.length)>0||(p==null?void 0:p.length)>0||(c==null?void 0:c.length)>0||u||l||w))throw new s(n,"when 'capabilities.operations.supportsQueryAttachments' is false, only objectIds is supported",t);if(!(d!=null&&d.length||p!=null&&p.length||w))throw new s(n,"'objectIds', 'globalIds', or 'where' are required to perform attachment query",t);if(!a.queryAttachments)throw new s(n,"Layer source does not support queryAttachments capability",t);return a.queryAttachments(t)}async function K(e,t,r,n){const a=await f(e);if(!a.queryObjectIds)throw new s(n,"Layer source does not support queryObjectIds capability");return a.queryObjectIds(y.from(t)??e.createQuery(),r)}async function Y(e,t,r,n){const a=await f(e);if(!a.queryFeatureCount)throw new s(n,"Layer source does not support queryFeatureCount capability");return a.queryFeatureCount(y.from(t)??e.createQuery(),r)}async function ee(e,t,r,n){const a=await f(e);if(!a.queryExtent)throw new s(n,"Layer source does not support queryExtent capability");return a.queryExtent(y.from(t)??e.createQuery(),r)}async function te(e,t,r,n){const a=await f(e);if(!a.queryRelatedFeatures)throw new s(n,"Layer source does not support queryRelatedFeatures capability");return a.queryRelatedFeatures(q.from(t),r)}async function ne(e,t,r,n){const a=await f(e);if(!a.queryRelatedFeaturesCount)throw new s(n,"Layer source does not support queryRelatedFeaturesCount capability");return a.queryRelatedFeaturesCount(q.from(t),r)}async function re(e){const t=e.source;if(t!=null&&t.refresh)try{const{dataChanged:r,updates:n}=await t.refresh();if(n!=null&&(e.sourceJSON={...e.sourceJSON,...n},e.read(n,{origin:"service",url:e.parsedUrl})),r)return!0}catch{}if(e.definitionExpression)try{return(await x(e.definitionExpression,e.fieldsIndex)).hasDateFunctions}catch{}return!1}function ae(e){var i,d;const t=new y,r=(i=e.capabilities)==null?void 0:i.data,n=(d=e.capabilities)==null?void 0:d.query;t.historicMoment=e.historicMoment,t.gdbVersion=e.gdbVersion,t.returnGeometry=!0,n&&(t.compactGeometryEnabled=n.supportsCompactGeometry,t.defaultSpatialReferenceEnabled=n.supportsDefaultSpatialReference),r&&(r.supportsZ&&e.returnZ!=null&&(t.returnZ=e.returnZ),r.supportsM&&e.returnM!=null&&(t.returnM=e.returnM)),t.outFields=["*"];const{timeOffset:a,timeExtent:o}=e;return t.timeExtent=a!=null&&o!=null?o.offset(-a.value,a.unit):o||null,t.multipatchOption=e.geometryType==="multipatch"?"xyFootprint":null,t}function oe(e){const{globalIdField:t,fields:r}=e;if(t)return t;if(r){for(const n of r)if(n.type==="esriFieldTypeGlobalID")return n.name}}function ie(e){const{objectIdField:t,fields:r}=e;if(t)return t;if(r){for(const n of r)if(n.type==="esriFieldTypeOID")return n.name}}function se(e){return e.currentVersion?e.currentVersion:e.hasOwnProperty("capabilities")||e.hasOwnProperty("drawingInfo")||e.hasOwnProperty("hasAttachments")||e.hasOwnProperty("htmlPopupType")||e.hasOwnProperty("relationships")||e.hasOwnProperty("timeInfo")||e.hasOwnProperty("typeIdField")||e.hasOwnProperty("types")?10:9.3}function ue(e,t){const{subtypes:r,subtypeField:n}=e;if(!t||!(r!=null&&r.length)||!n)return null;const a=t.attributes[n];return a==null?null:r.find(o=>o.code===a)}async function f(e){return(await e.load()).source}async function $(e,t){if(!m||m.findCredential(e))return;let r;try{const n=await R(e,t);n&&(r=await m.checkSignInStatus(`${n}/sharing`))}catch{}if(r)try{const n=t!=null?t.signal:null;await m.getCredential(e,{signal:n})}catch{}}async function ce(e,t,r){var a;const n=(a=e.parsedUrl)==null?void 0:a.path;n&&e.authenticationTriggerEvent===t&&await $(n,r)}function le(e){return!D(e)&&(e.userHasUpdateItemPrivileges||e.editingEnabled)}const h=P({types:j});function de(e,t){var r;if(e.defaultSymbol)return(r=e.types)!=null&&r.length?new S({defaultSymbol:h(e.defaultSymbol,e,t),field:e.typeIdField,uniqueValueInfos:e.types.map(n=>({id:n.id,symbol:h(n.symbol,n,t)}))}):new C({symbol:h(e.defaultSymbol,e,t)})}function pe(e){var n,a,o;let t=(n=e.sourceJSON)==null?void 0:n.cacheMaxAge;if(!t)return!1;const r=(o=(a=e.editingInfo)==null?void 0:a.lastEditDate)==null?void 0:o.getTime();return r==null||(t*=1e3,Date.now()-r<t)}async function v(e,t,r){if(t==null)return null;const n=[],{objectIdField:a}=e;if(t.forEach(u=>{let c=null;if("attributes"in u){const{attributes:l}=u;c={globalId:l[r],objectId:l[a]!=null&&l[a]!==-1?l[a]:null}}else c={globalId:u.globalId,objectId:u.objectId!=null&&u.objectId!==-1?u.objectId:null};c.globalId!=null&&(c.objectId!=null&&c.objectId!==-1||n.push(c.globalId))}),n.length===0)return null;const o=e.createQuery();o.where=n.map(u=>`${r}='${u}'`).join(" OR "),o.returnGeometry=!1,o.outFields=[a,r],o.cacheHint=!1;const i=await E(L(e,o));if(!i.ok)return null;const d=new Map,p=i.value.features;for(const u of p){const c=u.attributes[r],l=u.attributes[a];c!=null&&l!=null&&l!==-1&&d.set(c,l)}return d}function fe(e,t,r){if(!t||!r||!e)return null;const n=r.getAttribute(t);return n==null?null:e.find(a=>{const{id:o}=a;return o!=null&&o.toString()===n.toString()})??null}function D(e){var t;return((t=e.sourceJSON)==null?void 0:t.isMultiServicesView)||G(e)}function G(e){var t,r;return!!((r=(t=e.sourceJSON)==null?void 0:t.capabilities)!=null&&r.toLowerCase().split(",").map(n=>n.trim()).includes("map"))}export{Y as A,se as C,re as E,K as F,W as I,v as J,ue as L,ie as M,fe as N,ee as O,te as P,oe as R,ne as S,ce as T,de as U,pe as V,D as Z,H as b,X as g,z as j,Z as m,B as q,le as v,k as w,ae as x,U as y};
