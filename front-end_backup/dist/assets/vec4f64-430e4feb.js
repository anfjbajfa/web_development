function o(){return[0,0,0,0]}function s(n){return[n[0],n[1],n[2],n[3]]}function e(n,t,u,r){return[n,t,u,r]}function N(n,t=o()){const u=Math.min(4,n.length);for(let r=0;r<u;++r)t[r]=n[r];return t}function T(n,t){return new Float64Array(n,t,4)}function i(){return o()}function c(){return e(1,1,1,1)}function f(){return e(1,0,0,0)}function l(){return e(0,1,0,0)}function a(){return e(0,0,1,0)}function _(){return e(0,0,0,1)}const m=i(),y=c(),I=f(),O=l(),S=a(),U=_();Object.freeze(Object.defineProperty({__proto__:null,ONES:y,UNIT_W:U,UNIT_X:I,UNIT_Y:O,UNIT_Z:S,ZEROS:m,clone:s,create:o,createView:T,fromArray:N,fromValues:e,ones:c,unitW:_,unitX:f,unitY:l,unitZ:a,zeros:i},Symbol.toStringTag,{value:"Module"}));export{o as n,e as r};
