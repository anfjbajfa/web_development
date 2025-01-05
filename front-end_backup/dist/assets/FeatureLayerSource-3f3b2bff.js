import{G as P,fF as Q,bT as G,fG as V,fs as J,fH as H,n as T,A as q,o as z,bk as $,be as j,i as O,y as A,j as Y,fE as W,eE as X,k as Z,aF as D,U as f,O as M,b3 as B,bu as K,bz as ee,co as N,_ as L,bo as k,fI as te,fJ as se,bn as ae,aV as re,dM as ie,aY as ne,bd as oe}from"./index-c6cfe049.js";import{i as ue}from"./MeshLocalVertexSpace-411e8581.js";import{a as le}from"./meshVertexSpaceUtils-b044d3fd.js";import{N as de,v as ce}from"./MeshTransform-a9f50040.js";import{isFeatureIdentifierArrayWithGlobalId as pe,isFeatureIdentifierArrayWithObjectId as he}from"./editingSupport-208b51d8.js";import{o as ye}from"./clientSideDefaults-bc8f2b5a.js";import{x as me}from"./QueryTask-1b11ab84.js";import{T as v}from"./featureLayerUtils-6e37b4eb.js";import{F as fe}from"./infoFor3D-24efd44a.js";import{s as ge}from"./executeQueryJSON-98e87b3a.js";import{i as be}from"./editsZScale-d0d79ab9.js";import{i as we,a as Ie,o as Re,t as qe}from"./EditBusLayer-1e67be81.js";import"./mat4f64-9a8384aa.js";import"./quat-caf9fdb6.js";import"./mat3f64-e19cdcb8.js";import"./quatf64-81e039e4.js";import"./vec42-614f5847.js";import"./vec4f64-430e4feb.js";import"./QueryEngineCapabilities-85c4f1d0.js";import"./defaultsJSON-59981e75.js";import"./executeForIds-6228f84d.js";import"./query-6eccb0bd.js";import"./pbfQueryUtils-90563513.js";import"./pbf-459508d1.js";import"./OptimizedFeature-059c854c.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./queryZScale-679c8a27.js";import"./executeQueryPBF-5326e45a.js";import"./featureConversionUtils-830d3ed6.js";import"./FeatureSet-402c1fc5.js";import"./jsonUtils-0cfa0239.js";import"./UniqueValueRenderer-2d905f9d.js";import"./ColorStop-3bd1e817.js";import"./diffUtils-a81eba90.js";import"./colorRamps-2725f079.js";import"./sizeVariableUtils-d4870b0d.js";import"./visualVariableUtils-57487c58.js";import"./lengthUtils-806c8c03.js";import"./jsonUtils-17af088a.js";import"./defaults-458d9190.js";import"./styleUtils-12717ade.js";import"./LRUCache-be26918b.js";import"./Version-d58b3305.js";import"./FieldsIndex-815a254a.js";import"./UnknownTimeZone-b1c85c08.js";import"./OverrideHelper-78bed9ed.js";import"./colorUtils-60e0b64a.js";import"./utils-2af5df8d.js";import"./quantizationUtils-07a0781e.js";import"./heatmapUtils-dc73c34c.js";import"./RelationshipQuery-21a3a6e4.js";async function C(t,e,s){const{geometry:a}=e,r={...e.attributes};if(s!=null&&(a==null?void 0:a.type)==="mesh"){const{transformFieldRoles:i}=s,{origin:o,spatialReference:n,vertexSpace:u}=a,l=a.transform??new de,d=u.type==="local",c=t.spatialReference,w=c.isGeographic,I=P(c,n),h=Q(n,c)&&G(n,c);if(!(d&&w&&h||!d&&!w&&I))return null;const p=V(o,n,c);if(p==null)return null;if(r[i.originX]=p.x,r[i.originY]=p.y,r[i.originZ]=p.z??0,l!=null){const{translation:R,scale:y,rotation:g}=l,m=d?1:J(n)/J(c);r[i.translationX]=R[0]*m,r[i.translationY]=R[2]*m,r[i.translationZ]=-R[1]*m,r[i.scaleX]=y[0],r[i.scaleY]=y[2],r[i.scaleZ]=y[1],r[i.rotationX]=g[0],r[i.rotationY]=g[2],r[i.rotationZ]=-g[1],r[i.rotationDeg]=g[3]}return{attributes:r}}return a==null?{attributes:r}:a.type==="mesh"||a.type==="extent"?null:{geometry:a.toJSON(),attributes:r}}async function Se(t,e){const s=await Promise.all((e.addAttachments??[]).map(i=>U(t,i))),a=await Promise.all((e.updateAttachments??[]).map(i=>U(t,i))),r=e.deleteAttachments??[];return s.length||a.length||r.length?{adds:s,updates:a,deletes:[...r]}:null}async function U(t,e){var d;const{feature:s,attachment:a}=e,{globalId:r,name:i,contentType:o,data:n,uploadId:u}=a,l={globalId:r};if(s&&("attributes"in s?l.parentGlobalId=(d=s.attributes)==null?void 0:d[t.globalIdField]:s.globalId&&(l.parentGlobalId=s.globalId)),u)l.uploadId=u;else if(n){const c=await H(n);c&&(l.contentType=c.mediaType,l.data=c.data),n instanceof File&&(l.name=n.name)}return i&&(l.name=i),o&&(l.contentType=o),l}function Ee(t,e,s){if(!e||e.length===0)return[];if(s&&pe(e))return e.map(r=>r.globalId);if(he(e))return e.map(r=>r.objectId);const a=s?t.globalIdField:t.objectIdField;return a?e.map(r=>r.getAttribute(a)):[]}function _e(t){var r,i,o;const e=t==null?void 0:t.assetMaps;if(e){for(const n of e.addResults)n.success||T.getLogger("esri.layers.graphics.sources.support.sourceUtils").error(`Failed to map asset to feature with globalId ${n.globalId}.`);for(const n of e.updateResults)n.success||T.getLogger("esri.layers.graphics.sources.support.sourceUtils").error(`Failed to map asset to feature with globalId ${n.globalId}.`)}const s=t==null?void 0:t.attachments,a={addFeatureResults:((r=t==null?void 0:t.addResults)==null?void 0:r.map(b))??[],updateFeatureResults:((i=t==null?void 0:t.updateResults)==null?void 0:i.map(b))??[],deleteFeatureResults:((o=t==null?void 0:t.deleteResults)==null?void 0:o.map(b))??[],addAttachmentResults:s!=null&&s.addResults?s.addResults.map(b):[],updateAttachmentResults:s!=null&&s.updateResults?s.updateResults.map(b):[],deleteAttachmentResults:s!=null&&s.deleteResults?s.deleteResults.map(b):[]};return t!=null&&t.editMoment&&(a.editMoment=t.editMoment),a}function b(t){const e=t.success===!0?null:t.error||{code:void 0,description:void 0};return{objectId:t.objectId,globalId:t.globalId,error:e?new q("feature-layer-source:edit-failure",e.description,{code:e.code}):null}}function x(t,e){return new z({attributes:t.attributes,geometry:$({...t.geometry,spatialReference:e})})}function Oe(t,e){var s,a,r;return{adds:((s=t==null?void 0:t.adds)==null?void 0:s.map(i=>x(i,e)))||[],updates:((a=t==null?void 0:t.updates)==null?void 0:a.map(i=>({original:x(i[0],e),current:x(i[1],e)})))||[],deletes:((r=t==null?void 0:t.deletes)==null?void 0:r.map(i=>x(i,e)))||[],spatialReference:e}}function Fe(t){const e=t.details.raw,s=+e.code,a=+e.extendedCode;return s===500&&(a===-2147217144||a===-2147467261)}const Ae=new j({originalAndCurrentFeatures:"original-and-current-features",none:"none"}),ve=new j({Started:"published",Publishing:"publishing",Stopped:"unavailable"});let S=class extends W{constructor(t){super(t),this.type="feature-layer",this.supportedSourceTypes=new Set(["Feature Layer","Oriented Imagery Layer","Table","Catalog Layer"]),this.refresh=X(async()=>{var a,r;await this.load();const e=(a=this.sourceJSON.editingInfo)==null?void 0:a.lastEditDate;if(e==null)return{dataChanged:!0,updates:{}};try{await this._fetchService(null)}catch{return{dataChanged:!0,updates:{}}}const s=e!==((r=this.sourceJSON.editingInfo)==null?void 0:r.lastEditDate);return{dataChanged:s,updates:s?{editingInfo:this.sourceJSON.editingInfo,extent:this.sourceJSON.extent}:null}}),this._ongoingAssetUploads=new Map}load(t){const e=this.layer.sourceJSON,s=this._fetchService(e,{...t}).then(()=>this.layer.setUserPrivileges(this.sourceJSON.serviceItemId,t)).then(()=>this._ensureLatestMetadata(t));return this.addResolvingPromise(s),Promise.resolve(this)}initialize(){this.addHandles([Z(()=>{const t=this.layer;return t&&"lastEditsEventDate"in t?t.lastEditsEventDate:null},t=>this._handleLastEditsEventChange(t))])}destroy(){this._removeEditInterceptor()}get queryTask(){var l;const{capabilities:t,parsedUrl:e,gdbVersion:s,spatialReference:a,fieldsIndex:r}=this.layer,i="infoFor3D"in this.layer?this.layer.infoFor3D:null,o="dynamicDataSource"in this.layer?this.layer.dynamicDataSource:null,n=D("featurelayer-pbf")&&(t==null?void 0:t.query.supportsFormatPBF)&&i==null,u=((l=t==null?void 0:t.operations)==null?void 0:l.supportsQueryAttachments)??!1;return new me({url:e.path,pbfSupported:n,fieldsIndex:r,infoFor3D:i,dynamicDataSource:o,gdbVersion:s,sourceSpatialReference:a,queryAttachmentsSupported:u})}async addAttachment(t,e){await this.load();const{layer:s}=this;await v(s,"editing");const a=t.attributes[s.objectIdField],r=s.parsedUrl.path+"/"+a+"/addAttachment",i=this._getLayerRequestOptions(),o=this._getFormDataForAttachment(e,i.query);try{const n=await f(r,{body:o});return b(n.data.addAttachmentResult)}catch(n){throw this._createAttachmentErrorResult(a,n)}}async updateAttachment(t,e,s){await this.load();const{layer:a}=this;await v(a,"editing");const r=t.attributes[a.objectIdField],i=a.parsedUrl.path+"/"+r+"/updateAttachment",o=this._getLayerRequestOptions({query:{attachmentId:e}}),n=this._getFormDataForAttachment(s,o.query);try{const u=await f(i,{body:n});return b(u.data.updateAttachmentResult)}catch(u){throw this._createAttachmentErrorResult(r,u)}}async applyEdits(t,e){var E,F;await this.load();const{layer:s}=this;await v(s,"editing");const a="infoFor3D"in s?s.infoFor3D:null,r=a!=null,i=r||((e==null?void 0:e.globalIdUsed)??!1),o=r?await this._uploadMeshesAndGetAssetMapEditsJSON(t):null,n=((E=t.addFeatures)==null?void 0:E.map(_=>C(this.layer,_,a)))??[],u=(await Promise.all(n)).filter(M),l=((F=t.updateFeatures)==null?void 0:F.map(_=>C(this.layer,_,a)))??[],d=(await Promise.all(l)).filter(M),c=Ee(this.layer,t.deleteFeatures,i);be(u,d,s.spatialReference);const w=await Se(this.layer,t),I=s.capabilities.editing.supportsAsyncApplyEdits&&r,h=(e==null?void 0:e.gdbVersion)||s.gdbVersion,p={gdbVersion:h,rollbackOnFailure:e==null?void 0:e.rollbackOnFailureEnabled,useGlobalIds:i,returnEditMoment:e==null?void 0:e.returnEditMoment,usePreviousEditMoment:e==null?void 0:e.usePreviousEditMoment,async:I};await we(this.layer.url,h,!0);const R=Ie(this.layer.url,h||null);if(await Re(s.url,h,s.historicMoment))throw new q("feature-layer-source:historic-version","Editing a historic version is not allowed");e!=null&&e.returnServiceEditsOption?(p.edits=JSON.stringify([{id:s.layerId,adds:u.length?u:null,updates:d.length?d:null,deletes:c.length?c:null,attachments:w,assetMaps:o}]),p.returnServiceEditsOption=Ae.toJSON(e==null?void 0:e.returnServiceEditsOption),p.returnServiceEditsInSourceSR=e==null?void 0:e.returnServiceEditsInSourceSR):(p.adds=u.length?JSON.stringify(u):null,p.updates=d.length?JSON.stringify(d):null,p.deletes=c.length?i?JSON.stringify(c):c.join(","):null,p.attachments=w&&JSON.stringify(w),p.assetMaps=o!=null?JSON.stringify(o):void 0);const y=this._getLayerRequestOptions({method:"post",query:p});R&&(y.authMode="immediate",y.query.returnEditMoment=!0,y.query.sessionId=qe);const g=e!=null&&e.returnServiceEditsOption?s.url:s.parsedUrl.path;let m;try{m=I?await this._asyncApplyEdits(g+"/applyEdits",y):await f(g+"/applyEdits",y)}catch(_){if(!Fe(_))throw _;y.authMode="immediate",m=I?await this._asyncApplyEdits(g+"/applyEdits",y):await f(g+"/applyEdits",y)}return this._createEditsResult(m)}async deleteAttachments(t,e){await this.load();const{layer:s}=this;await v(s,"editing");const a=t.attributes[s.objectIdField],r=s.parsedUrl.path+"/"+a+"/deleteAttachments";try{return(await f(r,this._getLayerRequestOptions({query:{attachmentIds:e.join(",")},method:"post"}))).data.deleteAttachmentResults.map(b)}catch(i){throw this._createAttachmentErrorResult(a,i)}}fetchRecomputedExtents(t={}){const e=t.signal;return this.load({signal:e}).then(async()=>{const s=this._getLayerRequestOptions({...t,query:{returnUpdates:!0}}),{layerId:a,url:r}=this.layer,{data:i}=await f(`${r}/${a}`,s),{id:o,extent:n,fullExtent:u,timeExtent:l}=i,d=n||u;return{id:o,fullExtent:d&&B.fromJSON(d),timeExtent:l&&K.fromJSON({start:l[0],end:l[1]})}})}async queryAttachments(t,e={}){await this.load();const s=this._getLayerRequestOptions(e);return this.queryTask.executeAttachmentQuery(t,s)}async queryFeatures(t,e){var a;await this.load();const s=await this.queryTask.execute(t,{...e,query:this._createRequestQueryOptions(e)});return(a=t.outStatistics)!=null&&a.length&&s.features.length&&s.features.forEach(r=>{var o;const i=r.attributes;(o=t.outStatistics)==null||o.forEach(({outStatisticFieldName:n})=>{if(n){const u=n.toLowerCase();u&&u in i&&n!==u&&(i[n]=i[u],delete i[u])}})}),s}async queryFeaturesJSON(t,e){return await this.load(),this.queryTask.executeJSON(t,{...e,query:this._createRequestQueryOptions(e)})}async queryObjectIds(t,e){return await this.load(),this.queryTask.executeForIds(t,{...e,query:this._createRequestQueryOptions(e)})}async queryFeatureCount(t,e){return await this.load(),this.queryTask.executeForCount(t,{...e,query:this._createRequestQueryOptions(e)})}async queryExtent(t,e){return await this.load(),this.queryTask.executeForExtent(t,{...e,query:this._createRequestQueryOptions(e)})}async queryRelatedFeatures(t,e){return await this.load(),this.queryTask.executeRelationshipQuery(t,{...e,query:this._createRequestQueryOptions(e)})}async queryRelatedFeaturesCount(t,e){return await this.load(),this.queryTask.executeRelationshipQueryForCount(t,{...e,query:this._createRequestQueryOptions(e)})}async queryTopFeatures(t,e){return await this.load(),this.queryTask.executeTopFeaturesQuery(t,{...e,query:this._createRequestQueryOptions(e)})}async queryTopObjectIds(t,e){return await this.load(),this.queryTask.executeForTopIds(t,{...e,query:this._createRequestQueryOptions(e)})}async queryTopExtents(t,e){return await this.load(),this.queryTask.executeForTopExtents(t,{...e,query:this._createRequestQueryOptions(e)})}async queryTopCount(t,e){return await this.load(),this.queryTask.executeForTopCount(t,{...e,query:this._createRequestQueryOptions(e)})}async fetchPublishingStatus(){if(!ee(this.layer.url))return"unavailable";const t=N(this.layer.url,"status"),e=await f(t,{query:{f:"json"}});return ve.fromJSON(e.data.status)}async uploadAssets(t,e){const{uploadAssets:s}=await L(()=>import("./uploadAssets-56f5ba09.js"),["assets/uploadAssets-56f5ba09.js","assets/index-c6cfe049.js","assets/index-16a932bd.css","assets/MeshTransform-a9f50040.js","assets/infoFor3D-24efd44a.js","assets/mat4f64-9a8384aa.js","assets/quat-caf9fdb6.js","assets/mat3f64-e19cdcb8.js","assets/quatf64-81e039e4.js","assets/vec42-614f5847.js","assets/vec4f64-430e4feb.js","assets/uploadAssetErrors-0a0ab097.js"]);return s(t,{layer:this.layer,ongoingUploads:this._ongoingAssetUploads},e)}_handleLastEditsEventChange(t){var a,r,i,o;const e=this.layer;if(t==null||!("capabilities"in e)||!("effectiveCapabilities"in e)||!(!((r=(a=e.capabilities)==null?void 0:a.operations)!=null&&r.supportsEditing)&&((o=(i=e.effectiveCapabilities)==null?void 0:i.operations)!=null&&o.supportsEditing)))return;const s=e.url;s!=null&&("layerId"in e&&N(s,e.layerId.toString()),this._getOrCreateEditInterceptor(s).before=n=>{const u=n.requestOptions.method??"auto";if(u==="auto"||u==="head"){const l=n.requestOptions.query??{};l._ts=t.getTime(),n.requestOptions.query=l}})}_getOrCreateEditInterceptor(t){return this._editInterceptor==null&&(this._editInterceptor={urls:t},k.request.internalInterceptors.push(this._editInterceptor)),this._editInterceptor}_removeEditInterceptor(){this._editInterceptor!=null&&(te(k.request.internalInterceptors,this._editInterceptor),this._editInterceptor=null)}async _asyncApplyEdits(t,e){const s=(await f(t,e)).data.statusUrl;for(;;){const a=(await f(s,{query:{f:"json"},responseType:"json"})).data;switch(a.status){case"Completed":return f(a.resultUrl,{query:{f:"json"},responseType:"json"});case"CompletedWithErrors":throw new q("async-applyEdits-failed","asynchronous applyEdits call failed.");case"Failed ImportChanges":case"InProgress":case"Pending":case"ExportAttachments":case"ExportChanges":case"ExportingData":case"ExportingSnapshot":case"ImportAttachments":case"ProvisioningReplica":case"UnRegisteringReplica":break;default:throw new q("async-applyEdits-failed","asynchronous applyEdits call failed (undefined response status)")}await se(xe)}}_createRequestQueryOptions(t){const e={...this.layer.customParameters,token:this.layer.apiKey,...t==null?void 0:t.query};return this.layer.datesInUnknownTimezone&&(e.timeReferenceUnknownClient=!0),e}async _fetchService(t,e){if(!t){const a={};D("featurelayer-advanced-symbols")&&(a.returnAdvancedSymbols=!0),e!=null&&e.cacheBust&&(a._ts=Date.now());const{data:r}=await f(this.layer.parsedUrl.path,this._getLayerRequestOptions({query:a,signal:e==null?void 0:e.signal}));t=r}this.sourceJSON=await this._patchServiceJSON(t,e==null?void 0:e.signal);const s=t.type;if(!this.supportedSourceTypes.has(s))throw new q("feature-layer-source:unsupported-type",`Source type "${s}" is not supported`)}async _patchServiceJSON(t,e){var s;if(t.type!=="Table"&&t.geometryType&&!((s=t==null?void 0:t.drawingInfo)!=null&&s.renderer)&&!t.defaultSymbol){const a=ye(t.geometryType).renderer;ae("drawingInfo.renderer",a,t)}if(t.geometryType==="esriGeometryMultiPatch"&&t.infoFor3D&&(t.geometryType="mesh"),t.extent==null)try{const{data:a}=await f(this.layer.url,this._getLayerRequestOptions({signal:e}));a.spatialReference&&(t.extent={xmin:0,ymin:0,xmax:0,ymax:0,spatialReference:a.spatialReference})}catch(a){re(a)}return t}async _ensureLatestMetadata(t){if(this.layer.userHasUpdateItemPrivileges&&this.sourceJSON.cacheMaxAge>0)return this._fetchService(null,{...t,cacheBust:!0})}async _uploadMeshesAndGetAssetMapEditsJSON(t){const{addAssetFeatures:e}=t;if(!(e!=null&&e.length)||await this._areAllAssetsAlreadyMapped(e))return null;const s=t.addFeatures.filter(i=>i.geometry);if(e.length!==s.length+t.updateFeatures.length)throw new q("feature-layer-source:unsupported-mesh-edits","Mixing attribute only edits with mesh geometry edits is not currently supported");const a=new Array,r=new Map;for(const i of e){const{geometry:o}=i,{vertexSpace:n}=o;if(le(n))a.push(o);else{const u=o.anchor,{convertMeshVertexSpace:l}=await L(()=>import("./convertMeshVertexSpace-280c015b.js"),["assets/convertMeshVertexSpace-280c015b.js","assets/index-c6cfe049.js","assets/index-16a932bd.css","assets/MeshVertexAttributes-dcaaa9d9.js","assets/vertexSpaceConversion-bfc515e6.js","assets/mat3f64-e19cdcb8.js","assets/mat4f64-9a8384aa.js","assets/spatialReferenceEllipsoidUtils-eca7bf87.js","assets/computeTranslationToOriginAndRotation-ad79d5a8.js","assets/meshVertexSpaceUtils-b044d3fd.js","assets/MeshLocalVertexSpace-411e8581.js","assets/vec3-a9852a06.js","assets/projection-d79f34ed.js","assets/DoubleArray-2311ad80.js","assets/BufferView-b0b4cfa5.js","assets/vec42-614f5847.js","assets/vec4-4ea09148.js"]),d=await l(o,new ue({origin:[u.x,u.y,u.z??0]}));r.set(d,o),i.geometry=d,a.push(d)}}await this.uploadAssets(a);for(const[i,o]of r)o.addExternalSources(i.metadata.externalSources.items);return{adds:this._getAssetMapEditsJSON(e),updates:[],deletes:[]}}_getAssetMapEditsJSON(t){const e=new Array,s=this.layer.globalIdField,a=this.layer.parsedUrl;for(const r of t){const i=r.geometry,{metadata:o}=i,n=o.getExternalSourcesOnService(a),u=r.getAttribute(s);if(n.length===0){T.getLogger(this).error(`Skipping feature ${u}. The mesh it is associated with has not been uploaded to the service and cannot be mapped to it.`);continue}const{source:l}=n.find(ce)??n[0];for(const d of l)d.parts.length===1?e.push({globalId:ie(),parentGlobalId:u,assetName:d.assetName,assetHash:d.parts[0].partHash,flags:[]}):T.getLogger(this).error(`Skipping asset ${d.assetName}. It does not have exactly one part, so we cannot map it to a feature.`)}return e}_createEditsResult(t){const e=t.data,{layerId:s}=this.layer,a=[];let r=null;if(Array.isArray(e))for(const o of e)a.push({id:o.id,editedFeatures:o.editedFeatures}),o.id===s&&(r={addResults:o.addResults??[],updateResults:o.updateResults??[],deleteResults:o.deleteResults??[],attachments:o.attachments,editMoment:o.editMoment});else r=e;const i=_e(r);if(a.length>0){i.editedFeatureResults=[];for(const o of a){const{editedFeatures:n}=o,u=n!=null&&n.spatialReference?new ne(n.spatialReference):null;i.editedFeatureResults.push({layerId:o.id,editedFeatures:Oe(n,u)})}}return i}_createAttachmentErrorResult(t,e){var r;const s=((r=e.details.messages)==null?void 0:r[0])||e.message,a=e.details.httpStatus||e.details.messageCode;return{objectId:t,globalId:null,error:new q("feature-layer-source:attachment-failure",s,{code:a})}}_getFormDataForAttachment(t,e){const s=t instanceof FormData?t:t&&t.elements?new FormData(t):null;if(s)for(const a in e){const r=e[a];r!=null&&(s.set?s.set(a,r):s.append(a,r))}return s}_getLayerRequestOptions(t={}){const{layer:e,layer:{parsedUrl:s,gdbVersion:a}}=this;return{...t,query:{gdbVersion:a,layer:"dynamicDataSource"in e&&e.dynamicDataSource?JSON.stringify({source:e.dynamicDataSource}):void 0,...s.query,f:"json",...this._createRequestQueryOptions(t)},responseType:"json"}}async _areAllAssetsAlreadyMapped(t){const{layer:e}=this,{globalIdField:s,parsedUrl:a}=e,r="infoFor3D"in e?e.infoFor3D:null;if(r==null||s==null)return!1;const i=fe(r);if(i==null)return!1;const o=N(a.path,`../${i.id}`),n=new Array;for(const h of t){if(!(h.geometry.metadata.getExternalSourcesOnService(a).length>0))return!1;n.push(h)}const u=n.map(h=>h.getAttribute(s)).filter(M);if(u.length===0)return!1;const{assetMapFieldRoles:{parentGlobalId:l,assetHash:d}}=r,c=new oe({where:`${l} IN (${u.map(h=>`'${h}'`)})`,outFields:[d,l],returnGeometry:!1}),w=await ge(o,c),{features:I}=w;return I.length!==0&&!n.some(h=>{const p=h.getAttribute(s);if(!p)return!0;const{metadata:R}=h.geometry,y=I.filter(m=>m.getAttribute(l)===p);if(y.length===0)return!0;const g=y.map(m=>m.getAttribute(d));return R.getExternalSourcesOnService(a).flatMap(({source:m})=>m.flatMap(E=>E.parts.map(F=>F.partHash))).some(m=>g.every(E=>m!==E))})}};O([A()],S.prototype,"type",void 0),O([A({constructOnly:!0})],S.prototype,"layer",void 0),O([A({constructOnly:!0})],S.prototype,"supportedSourceTypes",void 0),O([A({readOnly:!0})],S.prototype,"queryTask",null),S=O([Y("esri.layers.graphics.sources.FeatureLayerSource")],S);const xe=1e3,At=S;export{At as default};
