import{g2 as m,g3 as c,g4 as p,g5 as I,V as f,g6 as M,g7 as x,bI as d,a4 as w,g8 as D,cw as g,g9 as L,A as b,X as v,W as F,dT as T,Y as U,Z as W,ga as z,gb as E,gc as P,gd as V}from"./index-c6cfe049.js";import{S as j,u as A,c as X}from"./defaults-458d9190.js";import{e as Y,i as Z}from"./defaultsJSON-59981e75.js";m.fromSimpleMarkerSymbol(j);c.fromSimpleLineSymbol(A);p.fromSimpleFillSymbol(X);new I({symbolLayers:new f([new M({material:{color:Y},edges:new x({size:d(1),color:new w(Z)})})])});const q=new c({symbolLayers:new f([new D({material:{color:new w([0,0,0])},size:d(1)})])}),B=new p({symbolLayers:new f([new M({outline:{color:new w([0,0,0]),size:d(1)}})])}),t={retainId:!1,ignoreDrivers:!1,hasLabelingContext:!0};function G(e,o=t){var S,u,$,C;if(!e)return{symbol:null};const{retainId:i=t.retainId,ignoreDrivers:s=t.ignoreDrivers,hasLabelingContext:l=t.hasLabelingContext,retainCIM:a=t.retainCIM,cimFallbackEnabled:r=t.cimFallbackEnabled}=o;let n=null;if(g(e)||e instanceof L)n=e.clone();else if(e.type==="cim"){const y=(u=(S=e.data)==null?void 0:S.symbol)==null?void 0:u.type;switch(y){case"CIMPointSymbol":n=a?e.clone():m.fromCIMSymbol(e);break;case"CIMLineSymbol":r&&(n=q.clone(),($=o==null?void 0:o.logWarning)==null||$.call(o,"Unsupported CIM line symbology converted to fallback 3D line symbology"));break;case"CIMPolygonSymbol":r&&(n=B.clone(),(C=o==null?void 0:o.logWarning)==null||C.call(o,"Unsupported CIM polygon symbology converted to fallback 3D polygon symbology"))}if(!n)return{error:new b("symbol-conversion:unsupported-cim-symbol",`CIM symbol of type '${y||"unknown"}' is unsupported in 3D`,{symbol:e})}}else if(e instanceof v)n=c.fromSimpleLineSymbol(e);else if(e instanceof F)n=m.fromSimpleMarkerSymbol(e);else if(e instanceof T)n=m.fromPictureMarkerSymbol(e);else if(e instanceof U)n=o.geometryType&&o.geometryType==="mesh"?I.fromSimpleFillSymbol(e):p.fromSimpleFillSymbol(e);else{if(!(e instanceof W))return{error:new b("symbol-conversion:unsupported-2d-symbol",`2D symbol of type '${e.type||e.declaredClass}' is unsupported in 3D`,{symbol:e})};n=l?z.fromTextSymbol(e):m.fromTextSymbol(e)}return i&&n&&n.type!=="cim"&&(n.id=e.id),s&&g(n)&&n.symbolLayers.forEach(y=>y.ignoreDrivers=!0),{symbol:n}}function N(e,o,i,s){const l=k(e,{},{context:s,isLabelSymbol:!1});l!=null&&(o[i]=l)}function O(e,o,i,s){const l=k(e,{},{context:s,isLabelSymbol:!0});l!=null&&(o[i]=l)}function h(e){return e instanceof V||e instanceof L}function k(e,o,i){if(e==null)return null;const{context:s,isLabelSymbol:l}=i,a=s==null?void 0:s.origin,r=s==null?void 0:s.messages;if(a==="web-scene"&&!h(e)){const n=G(e,{retainCIM:!0,hasLabelingContext:l});return n.symbol!=null?n.symbol.write(o,s):(r==null||r.push(new b("symbol:unsupported",`Symbols of type '${e.declaredClass}' are not supported in scenes. Use 3D symbology instead when working with WebScene and SceneView`,{symbol:e,context:s,error:n.error})),null)}return(a==="web-map"||a==="portal-item"&&!E(s==null?void 0:s.layer))&&h(e)?(r==null||r.push(new b("symbol:unsupported",`Symbols of type '${e.declaredClass}' are not supported in web maps and portal items. Use 2D symbology and CIMSymbol instead when working with MapView`,{symbol:e,context:s})),null):e.write(o,s)}function Q(e,o){return P(e,null,o)}export{Q as b,O as i,N as l};
