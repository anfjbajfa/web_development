import{A as c,bc as f,ev as u,ew as p,U as w}from"./index-c6cfe049.js";async function g(e,s,i,o){if(!s)throw new c("post:missing-guid","guid for version is missing");const t=f(e),r=i.toJSON(),a=u(t.query,{query:p({...r,f:"json"}),...o,method:"post"});s.startsWith("{")&&(s=s.slice(1,-1));const d=`${t.path}/versions/${s}/deleteForwardEdits`,{data:n}=await w(d,a);return n}export{g as deleteForwardEdits};
