import{i as o,y as e,j as m,bj as C,cC as d,a4 as y,ee as h,bl as p}from"./index-c6cfe049.js";let s=class extends C{constructor(t){super(t),this.type=null}};o([e({readOnly:!0,json:{read:!1,write:!0}})],s.prototype,"type",void 0),s=o([m("esri.rest.support.ColorRamp")],s);const n=s;var i;let r=i=class extends n{constructor(t){super(t),this.algorithm=null,this.fromColor=null,this.toColor=null,this.type="algorithmic"}clone(){return new i({fromColor:p(this.fromColor),toColor:p(this.toColor),algorithm:this.algorithm})}};o([d({esriCIELabAlgorithm:"cie-lab",esriHSVAlgorithm:"hsv",esriLabLChAlgorithm:"lab-lch"})],r.prototype,"algorithm",void 0),o([e({type:y,json:{type:[h],write:!0}})],r.prototype,"fromColor",void 0),o([e({type:y,json:{type:[h],write:!0}})],r.prototype,"toColor",void 0),o([e({type:["algorithmic"]})],r.prototype,"type",void 0),r=i=o([m("esri.rest.support.AlgorithmicColorRamp")],r);const c=r;var a;let l=a=class extends n{constructor(t){super(t),this.colorRamps=null,this.type="multipart"}clone(){return new a({colorRamps:p(this.colorRamps)})}};o([e({type:[c],json:{write:!0}})],l.prototype,"colorRamps",void 0),o([e({type:["multipart"]})],l.prototype,"type",void 0),l=a=o([m("esri.rest.support.MultipartColorRamp")],l);const u=l,v={key:"type",base:n,typeMap:{algorithmic:c,multipart:u}};function f(t){return t!=null&&t.type?t.type==="algorithmic"?c.fromJSON(t):t.type==="multipart"?u.fromJSON(t):null:null}export{u as a,v as m,f as p};
