import{aF as u,bl as n}from"./index-c6cfe049.js";import{t as i}from"./QueryEngineCapabilities-85c4f1d0.js";import{l as a,o as l,S as c}from"./defaultsJSON-59981e75.js";function $(t){return{renderer:{type:"simple",symbol:t==="esriGeometryPoint"||t==="esriGeometryMultipoint"?a:t==="esriGeometryPolyline"?l:c}}}const y=/^[_$a-zA-Z][_$a-zA-Z0-9]*$/;let d=1;function f(t,s){if(u("esri-csp-restrictions"))return()=>({[s]:null,...t});try{let e=`this${p(s)} = null;`;for(const r in t)e+=`this${p(r)} = ${JSON.stringify(t[r])};`;const o=new Function(`
      return class AttributesClass$${d++} {
        constructor() {
          ${e};
        }
      }
    `)();return()=>new o}catch{return()=>({[s]:null,...t})}}function p(t){return y.test(t)?`.${t}`:`["${t}"]`}function C(t={}){return[{name:"New Feature",description:"",prototype:{attributes:n(t)}}]}function S(t,s){return{analytics:{supportsCacheHint:!1},attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:t},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:s,supportsDelete:s,supportsEditing:s,supportsChangeTracking:!1,supportsQuery:!0,supportsQueryAnalytics:!1,supportsQueryAttachments:!1,supportsQueryTopFeatures:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:s,supportsExceedsLimitStatistics:!0,supportsAsyncConvert3D:!1},query:i,queryRelated:{supportsCount:!0,supportsOrderBy:!0,supportsPagination:!0,supportsCacheHint:!1},queryTopFeatures:{supportsCacheHint:!1},editing:{supportsGeometryUpdate:s,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsAsyncApplyEdits:!1,zDefault:void 0}}}export{C as c,f as i,S as l,$ as o};
