import{aJ as Xr,ey as Me}from"./index-c6cfe049.js";var Pr,Ue,$r,kr={exports:{}};Pr=kr,Ue=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0,$r=function(z){var c,Ie,te;z=z||{},c||(c=z!==void 0?z:{}),c.ready=new Promise(function(e,r){Ie=e,te=r});var Re=Object.assign({},c),xe="./this.program",D="";typeof document<"u"&&document.currentScript&&(D=document.currentScript.src),Ue&&(D=Ue),D=D.indexOf("blob:")!==0?D.substr(0,D.replace(/[?#].*/,"").lastIndexOf("/")+1):"";var q,Wr=c.print||console.log.bind(console),H=c.printErr||console.warn.bind(console);Object.assign(c,Re),Re=null,c.thisProgram&&(xe=c.thisProgram),c.wasmBinary&&(q=c.wasmBinary),c.noExitRuntime,typeof WebAssembly!="object"&&L("no native wasm support detected");var Ae,Te,j,_,I,N,w,y,Ye,He,Ve,Be,ze=!1,qe=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function ae(e,r,n){var t=r+n;for(n=r;e[n]&&!(n>=t);)++n;if(16<n-r&&e.buffer&&qe)return qe.decode(e.subarray(r,n));for(t="";r<n;){var a=e[r++];if(128&a){var o=63&e[r++];if((224&a)==192)t+=String.fromCharCode((31&a)<<6|o);else{var f=63&e[r++];65536>(a=(240&a)==224?(15&a)<<12|o<<6|f:(7&a)<<18|o<<12|f<<6|63&e[r++])?t+=String.fromCharCode(a):(a-=65536,t+=String.fromCharCode(55296|a>>10,56320|1023&a))}}else t+=String.fromCharCode(a)}return t}function Ne(e,r,n,t){if(0<t){t=n+t-1;for(var a=0;a<e.length;++a){var o=e.charCodeAt(a);if(55296<=o&&57343>=o&&(o=65536+((1023&o)<<10)|1023&e.charCodeAt(++a)),127>=o){if(n>=t)break;r[n++]=o}else{if(2047>=o){if(n+1>=t)break;r[n++]=192|o>>6}else{if(65535>=o){if(n+2>=t)break;r[n++]=224|o>>12}else{if(n+3>=t)break;r[n++]=240|o>>18,r[n++]=128|o>>12&63}r[n++]=128|o>>6&63}r[n++]=128|63&o}}r[n]=0}}function Je(e){for(var r=0,n=0;n<e.length;++n){var t=e.charCodeAt(n);127>=t?r++:2047>=t?r+=2:55296<=t&&57343>=t?(r+=4,++n):r+=3}return r}function Le(){var e=Ae.buffer;Te=e,c.HEAP8=j=new Int8Array(e),c.HEAP16=I=new Int16Array(e),c.HEAP32=w=new Int32Array(e),c.HEAPU8=_=new Uint8Array(e),c.HEAPU16=N=new Uint16Array(e),c.HEAPU32=y=new Uint32Array(e),c.HEAPF32=Ye=new Float32Array(e),c.HEAPF64=Be=new Float64Array(e),c.HEAP64=He=new BigInt64Array(e),c.HEAPU64=Ve=new BigUint64Array(e)}var Ge,Ze=[],Xe=[],Ke=[];function Er(){var e=c.preRun.shift();Ze.unshift(e)}var S,R=0,J=null;function L(e){throw c.onAbort&&c.onAbort(e),H(e="Aborted("+e+")"),ze=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),te(e),e}function Qe(){return S.startsWith("data:application/octet-stream;base64,")}if(S="arcgis-knowledge-client-core.wasm",!Qe()){var er=S;S=c.locateFile?c.locateFile(er,D):D+er}function rr(){var e=S;try{if(e==S&&q)return new Uint8Array(q);throw"both async and sync fetching of the wasm failed"}catch(r){L(r)}}function Or(){return q||typeof fetch!="function"?Promise.resolve().then(function(){return rr()}):fetch(S,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+S+"'";return e.arrayBuffer()}).catch(function(){return rr()})}function _e(e){for(;0<e.length;)e.shift()(c)}function jr(e){this.ga=e-24,this.Za=function(r){y[this.ga+4>>2]=r},this.Ua=function(r){y[this.ga+8>>2]=r},this.Va=function(){w[this.ga>>2]=0},this.Oa=function(){j[this.ga+12|0]=0},this.Ya=function(){j[this.ga+13|0]=0},this.La=function(r,n){this.Ma(),this.Za(r),this.Ua(n),this.Va(),this.Oa(),this.Ya()},this.Ma=function(){y[this.ga+16>>2]=0}}var oe={};function ie(e){for(;e.length;){var r=e.pop();e.pop()(r)}}function G(e){return this.fromWireType(w[e>>2])}var V={},x={},ue={};function nr(e){if(e===void 0)return"_unknown";var r=(e=e.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return 48<=r&&57>=r?"_"+e:e}function Ce(e,r){return e=nr(e),function(){return r.apply(this,arguments)}}function Pe(e){var r=Error,n=Ce(e,function(t){this.name=e,this.message=t,(t=Error(t).stack)!==void 0&&(this.stack=this.toString()+`
`+t.replace(/^Error(:[^\n]*)?\n/,""))});return n.prototype=Object.create(r.prototype),n.prototype.constructor=n,n.prototype.toString=function(){return this.message===void 0?this.name:this.name+": "+this.message},n}var tr=void 0;function ce(e){throw new tr(e)}function $(e,r,n){function t(u){(u=n(u)).length!==e.length&&ce("Mismatched type converter count");for(var l=0;l<e.length;++l)W(e[l],u[l])}e.forEach(function(u){ue[u]=r});var a=Array(r.length),o=[],f=0;r.forEach((u,l)=>{x.hasOwnProperty(u)?a[l]=x[u]:(o.push(u),V.hasOwnProperty(u)||(V[u]=[]),V[u].push(()=>{a[l]=x[u],++f===o.length&&t(a)}))}),o.length===0&&t(a)}function Z(e){if(e===null)return"null";var r=typeof e;return r==="object"||r==="array"||r==="function"?e.toString():""+e}var ar=void 0;function b(e){for(var r="";_[e];)r+=ar[_[e++]];return r}var B=void 0;function m(e){throw new B(e)}function W(e,r,n={}){if(!("argPackAdvance"in r))throw new TypeError("registerType registeredInstance requires argPackAdvance");var t=r.name;if(e||m('type "'+t+'" must have a positive integer typeid pointer'),x.hasOwnProperty(e)){if(n.Wa)return;m("Cannot register type '"+t+"' twice")}x[e]=r,delete ue[e],V.hasOwnProperty(e)&&(r=V[e],delete V[e],r.forEach(a=>a()))}function or(e,r,n){switch(r){case 0:return n?function(t){return j[t]}:function(t){return _[t]};case 1:return n?function(t){return I[t>>1]}:function(t){return N[t>>1]};case 2:return n?function(t){return w[t>>2]}:function(t){return y[t>>2]};case 3:return n?function(t){return He[t>>3]}:function(t){return Ve[t>>3]};default:throw new TypeError("Unknown integer type: "+e)}}function X(e){switch(e){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+e)}}function $e(e){m(e.ea.ha.fa.name+" instance already deleted")}var ke=!1;function ir(){}function ur(e){--e.count.value,e.count.value===0&&(e.ja?e.la.oa(e.ja):e.ha.fa.oa(e.ga))}function cr(e,r,n){return r===n?e:n.ma===void 0||(e=cr(e,r,n.ma))===null?null:n.Ka(e)}var fr={},K=[];function We(){for(;K.length;){var e=K.pop();e.ea.ua=!1,e.delete()}}var Q=void 0,ee={};function Sr(e,r){for(r===void 0&&m("ptr should not be undefined");e.ma;)r=e.wa(r),e=e.ma;return ee[r]}function fe(e,r){return r.ha&&r.ga||ce("makeClassHandle requires ptr and ptrType"),!!r.la!=!!r.ja&&ce("Both smartPtrType and smartPtr must be specified"),r.count={value:1},se(Object.create(e,{ea:{value:r}}))}function se(e){return typeof FinalizationRegistry>"u"?(se=r=>r,e):(ke=new FinalizationRegistry(r=>{ur(r.ea)}),ir=r=>{ke.unregister(r)},(se=r=>{var n=r.ea;return n.ja&&ke.register(r,{ea:n},r),r})(e))}function M(){}function Ee(e,r,n){if(e[r].ia===void 0){var t=e[r];e[r]=function(){return e[r].ia.hasOwnProperty(arguments.length)||m("Function '"+n+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+e[r].ia+")!"),e[r].ia[arguments.length].apply(this,arguments)},e[r].ia=[],e[r].ia[t.ta]=t}}function Oe(e,r,n){c.hasOwnProperty(e)?((n===void 0||c[e].ia!==void 0&&c[e].ia[n]!==void 0)&&m("Cannot register public name '"+e+"' twice"),Ee(c,e,e),c.hasOwnProperty(n)&&m("Cannot register multiple overloads of a function with the same number of arguments ("+n+")!"),c[e].ia[n]=r):(c[e]=r,n!==void 0&&(c[e].lb=n))}function Fr(e,r,n,t,a,o,f,u){this.name=e,this.constructor=r,this.pa=n,this.oa=t,this.ma=a,this.Pa=o,this.wa=f,this.Ka=u,this.ab=[]}function le(e,r,n){for(;r!==n;)r.wa||m("Expected null or instance of "+n.name+", got an instance of "+r.name),e=r.wa(e),r=r.ma;return e}function Dr(e,r){return r===null?(this.Ba&&m("null is not a valid "+this.name),0):(r.ea||m('Cannot pass "'+Z(r)+'" as a '+this.name),r.ea.ga||m("Cannot pass deleted object as a pointer of type "+this.name),le(r.ea.ga,r.ea.ha.fa,this.fa))}function Mr(e,r){if(r===null){if(this.Ba&&m("null is not a valid "+this.name),this.ya){var n=this.Ca();return e!==null&&e.push(this.oa,n),n}return 0}if(r.ea||m('Cannot pass "'+Z(r)+'" as a '+this.name),r.ea.ga||m("Cannot pass deleted object as a pointer of type "+this.name),!this.xa&&r.ea.ha.xa&&m("Cannot convert argument of type "+(r.ea.la?r.ea.la.name:r.ea.ha.name)+" to parameter type "+this.name),n=le(r.ea.ga,r.ea.ha.fa,this.fa),this.ya)switch(r.ea.ja===void 0&&m("Passing raw pointer to smart pointer is illegal"),this.gb){case 0:r.ea.la===this?n=r.ea.ja:m("Cannot convert argument of type "+(r.ea.la?r.ea.la.name:r.ea.ha.name)+" to parameter type "+this.name);break;case 1:n=r.ea.ja;break;case 2:if(r.ea.la===this)n=r.ea.ja;else{var t=r.clone();n=this.bb(n,k(function(){t.delete()})),e!==null&&e.push(this.oa,n)}break;default:m("Unsupporting sharing policy")}return n}function Ur(e,r){return r===null?(this.Ba&&m("null is not a valid "+this.name),0):(r.ea||m('Cannot pass "'+Z(r)+'" as a '+this.name),r.ea.ga||m("Cannot pass deleted object as a pointer of type "+this.name),r.ea.ha.xa&&m("Cannot convert argument of type "+r.ea.ha.name+" to parameter type "+this.name),le(r.ea.ga,r.ea.ha.fa,this.fa))}function O(e,r,n,t,a,o,f,u,l,s,h){this.name=e,this.fa=r,this.Ba=n,this.xa=t,this.ya=a,this.$a=o,this.gb=f,this.Ha=u,this.Ca=l,this.bb=s,this.oa=h,a||r.ma!==void 0?this.toWireType=Mr:(this.toWireType=t?Dr:Ur,this.ka=null)}function sr(e,r,n){c.hasOwnProperty(e)||ce("Replacing nonexistant public symbol"),c[e].ia!==void 0&&n!==void 0?c[e].ia[n]=r:(c[e]=r,c[e].ta=n)}var he=[];function T(e,r){e=b(e);var n=he[r];return n||(r>=he.length&&(he.length=r+1),he[r]=n=Ge.get(r)),typeof n!="function"&&m("unknown function pointer with signature "+e+": "+r),n}var lr=void 0;function hr(e){var r=b(e=Tr(e));return F(e),r}function Y(e,r){function n(o){a[o]||x[o]||(ue[o]?ue[o].forEach(n):(t.push(o),a[o]=!0))}var t=[],a={};throw r.forEach(n),new lr(e+": "+t.map(hr).join([", "]))}function pe(e,r,n,t,a){var o=r.length;2>o&&m("argTypes array size mismatch! Must at least get return value and 'this' types!");var f=r[1]!==null&&n!==null,u=!1;for(n=1;n<r.length;++n)if(r[n]!==null&&r[n].ka===void 0){u=!0;break}var l=r[0].name!=="void",s=o-2,h=Array(s),v=[],d=[];return function(){if(arguments.length!==s&&m("function "+e+" called with "+arguments.length+" arguments, expected "+s+" args!"),d.length=0,v.length=f?2:1,v[0]=a,f){var i=r[1].toWireType(d,this);v[1]=i}for(var p=0;p<s;++p)h[p]=r[p+2].toWireType(d,arguments[p]),v.push(h[p]);if(p=t.apply(null,v),u)ie(d);else for(var g=f?1:2;g<r.length;g++){var A=g===1?i:h[g-2];r[g].ka!==null&&r[g].ka(A)}return i=l?r[0].fromWireType(p):void 0}}function ve(e,r){for(var n=[],t=0;t<e;t++)n.push(y[r+4*t>>2]);return n}function pr(e,r,n){return e instanceof Object||m(n+' with invalid "this": '+e),e instanceof r.fa.constructor||m(n+' incompatible with "this" of type '+e.constructor.name),e.ea.ga||m("cannot call emscripten binding method "+n+" on deleted object"),le(e.ea.ga,e.ea.ha.fa,r.fa)}var je=[],E=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function Se(e){4<e&&--E[e].Da==0&&(E[e]=void 0,je.push(e))}var C=e=>(e||m("Cannot use deleted val. handle = "+e),E[e].value),k=e=>{switch(e){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var r=je.length?je.pop():E.length;return E[r]={Da:1,value:e},r}};function Ir(e,r,n){switch(r){case 0:return function(t){return this.fromWireType((n?j:_)[t])};case 1:return function(t){return this.fromWireType((n?I:N)[t>>1])};case 2:return function(t){return this.fromWireType((n?w:y)[t>>2])};default:throw new TypeError("Unknown integer type: "+e)}}function re(e,r){var n=x[e];return n===void 0&&m(r+" has unknown type "+hr(e)),n}function Rr(e,r){switch(r){case 2:return function(n){return this.fromWireType(Ye[n>>2])};case 3:return function(n){return this.fromWireType(Be[n>>3])};default:throw new TypeError("Unknown float type: "+e)}}var vr=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0;function xr(e,r){for(var n=e>>1,t=n+r/2;!(n>=t)&&N[n];)++n;if(32<(n<<=1)-e&&vr)return vr.decode(_.subarray(e,n));for(n="",t=0;!(t>=r/2);++t){var a=I[e+2*t>>1];if(a==0)break;n+=String.fromCharCode(a)}return n}function Yr(e,r,n){if(n===void 0&&(n=2147483647),2>n)return 0;var t=r;n=(n-=2)<2*e.length?n/2:e.length;for(var a=0;a<n;++a)I[r>>1]=e.charCodeAt(a),r+=2;return I[r>>1]=0,r-t}function Hr(e){return 2*e.length}function Vr(e,r){for(var n=0,t="";!(n>=r/4);){var a=w[e+4*n>>2];if(a==0)break;++n,65536<=a?(a-=65536,t+=String.fromCharCode(55296|a>>10,56320|1023&a)):t+=String.fromCharCode(a)}return t}function Br(e,r,n){if(n===void 0&&(n=2147483647),4>n)return 0;var t=r;n=t+n-4;for(var a=0;a<e.length;++a){var o=e.charCodeAt(a);if(55296<=o&&57343>=o&&(o=65536+((1023&o)<<10)|1023&e.charCodeAt(++a)),w[r>>2]=o,(r+=4)+4>n)break}return w[r>>2]=0,r-t}function zr(e){for(var r=0,n=0;n<e.length;++n){var t=e.charCodeAt(n);55296<=t&&57343>=t&&++n,r+=4}return r}function dr(e,r){for(var n=Array(e),t=0;t<e;++t)n[t]=re(y[r+4*t>>2],"parameter "+t);return n}var qr={};function de(e){var r=qr[e];return r===void 0?b(e):r}var ge=[];function gr(){function e(r){r.$$$embind_global$$$=r;var n=typeof $$$embind_global$$$=="object"&&r.$$$embind_global$$$==r;return n||delete r.$$$embind_global$$$,n}if(typeof globalThis=="object")return globalThis;if(typeof $$$embind_global$$$=="object"||(typeof Me=="object"&&e(Me)?$$$embind_global$$$=Me:typeof self=="object"&&e(self)&&($$$embind_global$$$=self),typeof $$$embind_global$$$=="object"))return $$$embind_global$$$;throw Error("unable to get global object.")}function Nr(e){var r=ge.length;return ge.push(e),r}var mr=[],Fe={};function yr(){if(!De){var e,r={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:xe||"./this.program"};for(e in Fe)Fe[e]===void 0?delete r[e]:r[e]=Fe[e];var n=[];for(e in r)n.push(e+"="+r[e]);De=n}return De}var De,Jr=[null,[],[]];function me(e){return e%4==0&&(e%100!=0||e%400==0)}var br=[31,29,31,30,31,30,31,31,30,31,30,31],wr=[31,28,31,30,31,30,31,31,30,31,30,31];function Lr(e){var r=Array(Je(e)+1);return Ne(e,r,0,r.length),r}function Gr(e,r,n,t){function a(i,p,g){for(i=typeof i=="number"?i.toString():i||"";i.length<p;)i=g[0]+i;return i}function o(i,p){return a(i,p,"0")}function f(i,p){function g(P){return 0>P?-1:0<P?1:0}var A;return(A=g(i.getFullYear()-p.getFullYear()))===0&&(A=g(i.getMonth()-p.getMonth()))===0&&(A=g(i.getDate()-p.getDate())),A}function u(i){switch(i.getDay()){case 0:return new Date(i.getFullYear()-1,11,29);case 1:return i;case 2:return new Date(i.getFullYear(),0,3);case 3:return new Date(i.getFullYear(),0,2);case 4:return new Date(i.getFullYear(),0,1);case 5:return new Date(i.getFullYear()-1,11,31);case 6:return new Date(i.getFullYear()-1,11,30)}}function l(i){var p=i.ra;for(i=new Date(new Date(i.sa+1900,0,1).getTime());0<p;){var g=i.getMonth(),A=(me(i.getFullYear())?br:wr)[g];if(!(p>A-i.getDate())){i.setDate(i.getDate()+p);break}p-=A-i.getDate()+1,i.setDate(1),11>g?i.setMonth(g+1):(i.setMonth(0),i.setFullYear(i.getFullYear()+1))}return g=new Date(i.getFullYear()+1,0,4),p=u(new Date(i.getFullYear(),0,4)),g=u(g),0>=f(p,i)?0>=f(g,i)?i.getFullYear()+1:i.getFullYear():i.getFullYear()-1}var s=w[t+40>>2];for(var h in t={jb:w[t>>2],ib:w[t+4>>2],za:w[t+8>>2],Ea:w[t+12>>2],Aa:w[t+16>>2],sa:w[t+20>>2],na:w[t+24>>2],ra:w[t+28>>2],mb:w[t+32>>2],hb:w[t+36>>2],kb:s&&s?ae(_,s):""},n=n?ae(_,n):"",s={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})n=n.replace(new RegExp(h,"g"),s[h]);var v="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),d="January February March April May June July August September October November December".split(" ");for(h in s={"%a":function(i){return v[i.na].substring(0,3)},"%A":function(i){return v[i.na]},"%b":function(i){return d[i.Aa].substring(0,3)},"%B":function(i){return d[i.Aa]},"%C":function(i){return o((i.sa+1900)/100|0,2)},"%d":function(i){return o(i.Ea,2)},"%e":function(i){return a(i.Ea,2," ")},"%g":function(i){return l(i).toString().substring(2)},"%G":function(i){return l(i)},"%H":function(i){return o(i.za,2)},"%I":function(i){return(i=i.za)==0?i=12:12<i&&(i-=12),o(i,2)},"%j":function(i){for(var p=0,g=0;g<=i.Aa-1;p+=(me(i.sa+1900)?br:wr)[g++]);return o(i.Ea+p,3)},"%m":function(i){return o(i.Aa+1,2)},"%M":function(i){return o(i.ib,2)},"%n":function(){return`
`},"%p":function(i){return 0<=i.za&&12>i.za?"AM":"PM"},"%S":function(i){return o(i.jb,2)},"%t":function(){return"	"},"%u":function(i){return i.na||7},"%U":function(i){return o(Math.floor((i.ra+7-i.na)/7),2)},"%V":function(i){var p=Math.floor((i.ra+7-(i.na+6)%7)/7);if(2>=(i.na+371-i.ra-2)%7&&p++,p)p==53&&((g=(i.na+371-i.ra)%7)==4||g==3&&me(i.sa)||(p=1));else{p=52;var g=(i.na+7-i.ra-1)%7;(g==4||g==5&&me(i.sa%400-1))&&p++}return o(p,2)},"%w":function(i){return i.na},"%W":function(i){return o(Math.floor((i.ra+7-(i.na+6)%7)/7),2)},"%y":function(i){return(i.sa+1900).toString().substring(2)},"%Y":function(i){return i.sa+1900},"%z":function(i){var p=0<=(i=i.hb);return i=Math.abs(i)/60,(p?"+":"-")+("0000"+(i/60*100+i%60)).slice(-4)},"%Z":function(i){return i.kb},"%%":function(){return"%"}},n=n.replace(/%%/g,"\0\0"),s)n.includes(h)&&(n=n.replace(new RegExp(h,"g"),s[h](t)));return(h=Lr(n=n.replace(/\0\0/g,"%"))).length>r?0:(j.set(h,e),h.length-1)}tr=c.InternalError=Pe("InternalError");for(var Ar=Array(256),ye=0;256>ye;++ye)Ar[ye]=String.fromCharCode(ye);ar=Ar,B=c.BindingError=Pe("BindingError"),M.prototype.isAliasOf=function(e){if(!(this instanceof M&&e instanceof M))return!1;var r=this.ea.ha.fa,n=this.ea.ga,t=e.ea.ha.fa;for(e=e.ea.ga;r.ma;)n=r.wa(n),r=r.ma;for(;t.ma;)e=t.wa(e),t=t.ma;return r===t&&n===e},M.prototype.clone=function(){if(this.ea.ga||$e(this),this.ea.va)return this.ea.count.value+=1,this;var e=se,r=Object,n=r.create,t=Object.getPrototypeOf(this),a=this.ea;return(e=e(n.call(r,t,{ea:{value:{count:a.count,ua:a.ua,va:a.va,ga:a.ga,ha:a.ha,ja:a.ja,la:a.la}}}))).ea.count.value+=1,e.ea.ua=!1,e},M.prototype.delete=function(){this.ea.ga||$e(this),this.ea.ua&&!this.ea.va&&m("Object already scheduled for deletion"),ir(this),ur(this.ea),this.ea.va||(this.ea.ja=void 0,this.ea.ga=void 0)},M.prototype.isDeleted=function(){return!this.ea.ga},M.prototype.deleteLater=function(){return this.ea.ga||$e(this),this.ea.ua&&!this.ea.va&&m("Object already scheduled for deletion"),K.push(this),K.length===1&&Q&&Q(We),this.ea.ua=!0,this},c.getInheritedInstanceCount=function(){return Object.keys(ee).length},c.getLiveInheritedInstances=function(){var e,r=[];for(e in ee)ee.hasOwnProperty(e)&&r.push(ee[e]);return r},c.flushPendingDeletes=We,c.setDelayFunction=function(e){Q=e,K.length&&Q&&Q(We)},O.prototype.Qa=function(e){return this.Ha&&(e=this.Ha(e)),e},O.prototype.Fa=function(e){this.oa&&this.oa(e)},O.prototype.argPackAdvance=8,O.prototype.readValueFromPointer=G,O.prototype.deleteObject=function(e){e!==null&&e.delete()},O.prototype.fromWireType=function(e){function r(){return this.ya?fe(this.fa.pa,{ha:this.$a,ga:n,la:this,ja:e}):fe(this.fa.pa,{ha:this,ga:e})}var n=this.Qa(e);if(!n)return this.Fa(e),null;var t=Sr(this.fa,n);if(t!==void 0)return t.ea.count.value===0?(t.ea.ga=n,t.ea.ja=e,t.clone()):(t=t.clone(),this.Fa(e),t);if(t=this.fa.Pa(n),!(t=fr[t]))return r.call(this);t=this.xa?t.Ia:t.pointerType;var a=cr(n,this.fa,t.fa);return a===null?r.call(this):this.ya?fe(t.fa.pa,{ha:t,ga:a,la:this,ja:e}):fe(t.fa.pa,{ha:t,ga:a})},lr=c.UnboundTypeError=Pe("UnboundTypeError"),c.count_emval_handles=function(){for(var e=0,r=5;r<E.length;++r)E[r]!==void 0&&++e;return e},c.get_first_emval=function(){for(var e=5;e<E.length;++e)if(E[e]!==void 0)return E[e];return null};var Zr={n:function(e){return we(e+24)+24},m:function(e,r,n){throw new jr(e).La(r,n),e},s:function(e){var r=oe[e];delete oe[e];var n=r.Ca,t=r.oa,a=r.Ga;$([e],a.map(o=>o.Ta).concat(a.map(o=>o.eb)),o=>{var f={};return a.forEach((u,l)=>{var s=o[l],h=u.Ra,v=u.Sa,d=o[l+a.length],i=u.cb,p=u.fb;f[u.Na]={read:g=>s.fromWireType(h(v,g)),write:(g,A)=>{var P=[];i(p,g,d.toWireType(P,A)),ie(P)}}}),[{name:r.name,fromWireType:function(u){var l,s={};for(l in f)s[l]=f[l].read(u);return t(u),s},toWireType:function(u,l){for(var s in f)if(!(s in l))throw new TypeError('Missing field:  "'+s+'"');var h=n();for(s in f)f[s].write(h,l[s]);return u!==null&&u.push(t,h),h},argPackAdvance:8,readValueFromPointer:G,ka:t}]})},F:function(e,r,n,t,a){r=b(r),n=X(n);var o=r.indexOf("u")!=-1;o&&(a=(1n<<64n)-1n),W(e,{name:r,fromWireType:function(f){return f},toWireType:function(f,u){if(typeof u!="bigint"&&typeof u!="number")throw new TypeError('Cannot convert "'+Z(u)+'" to '+this.name);if(u<t||u>a)throw new TypeError('Passing a number "'+Z(u)+'" from JS side to C/C++ side to an argument of type "'+r+'", which is outside the valid range ['+t+", "+a+"]!");return u},argPackAdvance:8,readValueFromPointer:or(r,n,!o),ka:null})},S:function(e,r,n,t,a){var o=X(n);W(e,{name:r=b(r),fromWireType:function(f){return!!f},toWireType:function(f,u){return u?t:a},argPackAdvance:8,readValueFromPointer:function(f){if(n===1)var u=j;else if(n===2)u=I;else{if(n!==4)throw new TypeError("Unknown boolean type size: "+r);u=w}return this.fromWireType(u[f>>o])},ka:null})},f:function(e,r,n,t,a,o,f,u,l,s,h,v,d){h=b(h),o=T(a,o),u&&(u=T(f,u)),s&&(s=T(l,s)),d=T(v,d);var i=nr(h);Oe(i,function(){Y("Cannot construct "+h+" due to unbound types",[t])}),$([e,r,n],t?[t]:[],function(p){if(p=p[0],t)var g=p.fa,A=g.pa;else A=M.prototype;p=Ce(i,function(){if(Object.getPrototypeOf(this)!==P)throw new B("Use 'new' to construct "+h);if(U.qa===void 0)throw new B(h+" has no accessible constructor");var Cr=U.qa[arguments.length];if(Cr===void 0)throw new B("Tried to invoke ctor of "+h+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(U.qa).toString()+") parameters instead!");return Cr.apply(this,arguments)});var P=Object.create(A,{constructor:{value:p}});p.prototype=P;var U=new Fr(h,p,P,d,g,o,u,s);g=new O(h,U,!0,!1,!1),A=new O(h+"*",U,!1,!1,!1);var ne=new O(h+" const*",U,!1,!0,!1);return fr[e]={pointerType:A,Ia:ne},sr(i,p),[g,A,ne]})},v:function(e,r,n,t,a,o,f){var u=ve(n,t);r=b(r),o=T(a,o),$([],[e],function(l){function s(){Y("Cannot call "+h+" due to unbound types",u)}var h=(l=l[0]).name+"."+r;r.startsWith("@@")&&(r=Symbol[r.substring(2)]);var v=l.fa.constructor;return v[r]===void 0?(s.ta=n-1,v[r]=s):(Ee(v,r,h),v[r].ia[n-1]=s),$([],u,function(d){return d=pe(h,[d[0],null].concat(d.slice(1)),null,o,f),v[r].ia===void 0?(d.ta=n-1,v[r]=d):v[r].ia[n-1]=d,[]}),[]})},i:function(e,r,n,t,a,o){0<r||L();var f=ve(r,n);a=T(t,a),$([],[e],function(u){var l="constructor "+(u=u[0]).name;if(u.fa.qa===void 0&&(u.fa.qa=[]),u.fa.qa[r-1]!==void 0)throw new B("Cannot register multiple constructors with identical number of parameters ("+(r-1)+") for class '"+u.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return u.fa.qa[r-1]=()=>{Y("Cannot construct "+u.name+" due to unbound types",f)},$([],f,function(s){return s.splice(1,0,null),u.fa.qa[r-1]=pe(l,s,null,a,o),[]}),[]})},b:function(e,r,n,t,a,o,f,u){var l=ve(n,t);r=b(r),o=T(a,o),$([],[e],function(s){function h(){Y("Cannot call "+v+" due to unbound types",l)}var v=(s=s[0]).name+"."+r;r.startsWith("@@")&&(r=Symbol[r.substring(2)]),u&&s.fa.ab.push(r);var d=s.fa.pa,i=d[r];return i===void 0||i.ia===void 0&&i.className!==s.name&&i.ta===n-2?(h.ta=n-2,h.className=s.name,d[r]=h):(Ee(d,r,v),d[r].ia[n-2]=h),$([],l,function(p){return p=pe(v,p,s,o,f),d[r].ia===void 0?(p.ta=n-2,d[r]=p):d[r].ia[n-2]=p,[]}),[]})},c:function(e,r,n,t,a,o,f,u,l,s){r=b(r),a=T(t,a),$([],[e],function(h){var v=(h=h[0]).name+"."+r,d={get:function(){Y("Cannot access "+v+" due to unbound types",[n,f])},enumerable:!0,configurable:!0};return d.set=l?()=>{Y("Cannot access "+v+" due to unbound types",[n,f])}:()=>{m(v+" is a read-only property")},Object.defineProperty(h.fa.pa,r,d),$([],l?[n,f]:[n],function(i){var p=i[0],g={get:function(){var P=pr(this,h,v+" getter");return p.fromWireType(a(o,P))},enumerable:!0};if(l){l=T(u,l);var A=i[1];g.set=function(P){var U=pr(this,h,v+" setter"),ne=[];l(s,U,A.toWireType(ne,P)),ie(ne)}}return Object.defineProperty(h.fa.pa,r,g),[]}),[]})},R:function(e,r){W(e,{name:r=b(r),fromWireType:function(n){var t=C(n);return Se(n),t},toWireType:function(n,t){return k(t)},argPackAdvance:8,readValueFromPointer:G,ka:null})},o:function(e,r,n,t){function a(){}n=X(n),r=b(r),a.values={},W(e,{name:r,constructor:a,fromWireType:function(o){return this.constructor.values[o]},toWireType:function(o,f){return f.value},argPackAdvance:8,readValueFromPointer:Ir(r,n,t),ka:null}),Oe(r,a)},e:function(e,r,n){var t=re(e,"enum");r=b(r),e=t.constructor,t=Object.create(t.constructor.prototype,{value:{value:n},constructor:{value:Ce(t.name+"_"+r,function(){})}}),e.values[n]=t,e[r]=t},E:function(e,r,n){n=X(n),W(e,{name:r=b(r),fromWireType:function(t){return t},toWireType:function(t,a){return a},argPackAdvance:8,readValueFromPointer:Rr(r,n),ka:null})},W:function(e,r,n,t,a,o){var f=ve(r,n);e=b(e),a=T(t,a),Oe(e,function(){Y("Cannot call "+e+" due to unbound types",f)},r-1),$([],f,function(u){return sr(e,pe(e,[u[0],null].concat(u.slice(1)),null,a,o),r-1),[]})},w:function(e,r,n,t,a){r=b(r),a===-1&&(a=4294967295),a=X(n);var o=u=>u;if(t===0){var f=32-8*n;o=u=>u<<f>>>f}n=r.includes("unsigned")?function(u,l){return l>>>0}:function(u,l){return l},W(e,{name:r,fromWireType:o,toWireType:n,argPackAdvance:8,readValueFromPointer:or(r,a,t!==0),ka:null})},r:function(e,r,n){function t(o){var f=y;return new a(Te,f[1+(o>>=2)],f[o])}var a=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][r];W(e,{name:n=b(n),fromWireType:t,argPackAdvance:8,readValueFromPointer:t},{Wa:!0})},h:function(e,r,n,t,a,o,f,u,l,s,h,v){n=b(n),o=T(a,o),u=T(f,u),s=T(l,s),v=T(h,v),$([e],[r],function(d){return d=d[0],[new O(n,d.fa,!1,!1,!0,d,t,o,u,s,v)]})},G:function(e,r){var n=(r=b(r))==="std::string";W(e,{name:r,fromWireType:function(t){var a=y[t>>2],o=t+4;if(n)for(var f=o,u=0;u<=a;++u){var l=o+u;if(u==a||_[l]==0){if(f=f?ae(_,f,l-f):"",s===void 0)var s=f;else s+=String.fromCharCode(0),s+=f;f=l+1}}else{for(s=Array(a),u=0;u<a;++u)s[u]=String.fromCharCode(_[o+u]);s=s.join("")}return F(t),s},toWireType:function(t,a){a instanceof ArrayBuffer&&(a=new Uint8Array(a));var o=typeof a=="string";o||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int8Array||m("Cannot pass non-string to std::string");var f=n&&o?Je(a):a.length,u=we(4+f+1),l=u+4;if(y[u>>2]=f,n&&o)Ne(a,_,l,f+1);else if(o)for(o=0;o<f;++o){var s=a.charCodeAt(o);255<s&&(F(l),m("String has UTF-16 code units that do not fit in 8 bits")),_[l+o]=s}else for(o=0;o<f;++o)_[l+o]=a[o];return t!==null&&t.push(F,u),u},argPackAdvance:8,readValueFromPointer:G,ka:function(t){F(t)}})},B:function(e,r,n){if(n=b(n),r===2)var t=xr,a=Yr,o=Hr,f=()=>N,u=1;else r===4&&(t=Vr,a=Br,o=zr,f=()=>y,u=2);W(e,{name:n,fromWireType:function(l){for(var s,h=y[l>>2],v=f(),d=l+4,i=0;i<=h;++i){var p=l+4+i*r;i!=h&&v[p>>u]!=0||(d=t(d,p-d),s===void 0?s=d:(s+=String.fromCharCode(0),s+=d),d=p+r)}return F(l),s},toWireType:function(l,s){typeof s!="string"&&m("Cannot pass non-string to C++ string type "+n);var h=o(s),v=we(4+h+r);return y[v>>2]=h>>u,a(s,v+4,h+r),l!==null&&l.push(F,v),v},argPackAdvance:8,readValueFromPointer:G,ka:function(l){F(l)}})},t:function(e,r,n,t,a,o){oe[e]={name:b(r),Ca:T(n,t),oa:T(a,o),Ga:[]}},j:function(e,r,n,t,a,o,f,u,l,s){oe[e].Ga.push({Na:b(r),Ta:n,Ra:T(t,a),Sa:o,eb:f,cb:T(u,l),fb:s})},T:function(e,r){W(e,{Xa:!0,name:r=b(r),argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},l:function(e,r,n){e=C(e),r=re(r,"emval::as");var t=[],a=k(t);return y[n>>2]=a,r.toWireType(t,e)},z:function(e,r){return e=C(e),(r=re(r,"emval::as")).toWireType(null,e)},X:function(e,r,n,t){e=C(e),n=dr(r,n);for(var a=Array(r),o=0;o<r;++o){var f=n[o];a[o]=f.readValueFromPointer(t),t+=f.argPackAdvance}return e=e.apply(void 0,a),k(e)},U:function(e,r,n,t,a){e=ge[e],r=C(r),n=de(n);var o=[];return y[t>>2]=k(o),e(r,n,o,a)},C:function(e,r,n,t){(e=ge[e])(r=C(r),n=de(n),null,t)},a:Se,H:function(e){return e===0?k(gr()):(e=de(e),k(gr()[e]))},A:function(e,r){var n=dr(e,r),t=n[0];r=t.name+"_$"+n.slice(1).map(function(f){return f.name}).join("_")+"$";var a=mr[r];if(a!==void 0)return a;var o=Array(e-1);return a=Nr((f,u,l,s)=>{for(var h=0,v=0;v<e-1;++v)o[v]=n[v+1].readValueFromPointer(s+h),h+=n[v+1].argPackAdvance;for(f=f[u].apply(f,o),v=0;v<e-1;++v)n[v+1].Ja&&n[v+1].Ja(o[v]);if(!t.Xa)return t.toWireType(l,f)}),mr[r]=a},q:function(e,r){return e=C(e),r=C(r),k(e[r])},g:function(e){4<e&&(E[e].Da+=1)},I:function(e,r){return(e=C(e))instanceof(r=C(r))},u:function(e){return typeof(e=C(e))=="number"},x:function(e){return typeof(e=C(e))=="string"},V:function(){return k([])},p:function(e){return k(de(e))},k:function(e){ie(C(e)),Se(e)},d:function(e,r){return e=(e=re(e,"_emval_take_value")).readValueFromPointer(r),k(e)},y:function(e){return e=C(e),k(typeof e)},D:function(){L("")},N:function(e,r,n){_.copyWithin(e,r,r+n)},M:function(e){var r=_.length;if(2147483648<(e>>>=0))return!1;for(var n=1;4>=n;n*=2){var t=r*(1+.2/n);t=Math.min(t,e+100663296);var a=Math;t=Math.max(e,t),a=a.min.call(a,2147483648,t+(65536-t%65536)%65536);e:{try{Ae.grow(a-Te.byteLength+65535>>>16),Le();var o=1;break e}catch{}o=void 0}if(o)return!0}return!1},K:function(e,r){var n=0;return yr().forEach(function(t,a){var o=r+n;for(a=y[e+4*a>>2]=o,o=0;o<t.length;++o)j[0|a++]=t.charCodeAt(o);j[0|a]=0,n+=t.length+1}),0},L:function(e,r){var n=yr();y[e>>2]=n.length;var t=0;return n.forEach(function(a){t+=a.length+1}),y[r>>2]=t,0},Q:function(){return 52},P:function(){return 70},O:function(e,r,n,t){for(var a=0,o=0;o<n;o++){var f=y[r>>2],u=y[r+4>>2];r+=8;for(var l=0;l<u;l++){var s=_[f+l],h=Jr[e];s===0||s===10?((e===1?Wr:H)(ae(h,0)),h.length=0):h.push(s)}a+=u}return y[t>>2]=a,0},J:function(e,r,n,t){return Gr(e,r,n,t)}};(function(){function e(a){c.asm=a.exports,Ae=c.asm.Y,Le(),Ge=c.asm.ca,Xe.unshift(c.asm.Z),R--,c.monitorRunDependencies&&c.monitorRunDependencies(R),R==0&&J&&(a=J,J=null,a())}function r(a){e(a.instance)}function n(a){return Or().then(function(o){return WebAssembly.instantiate(o,t)}).then(function(o){return o}).then(a,function(o){H("failed to asynchronously prepare wasm: "+o),L(o)})}var t={a:Zr};if(R++,c.monitorRunDependencies&&c.monitorRunDependencies(R),c.instantiateWasm)try{return c.instantiateWasm(t,e)}catch(a){H("Module.instantiateWasm callback failed with error: "+a),te(a)}(q||typeof WebAssembly.instantiateStreaming!="function"||Qe()||typeof fetch!="function"?n(r):fetch(S,{credentials:"same-origin"}).then(function(a){return WebAssembly.instantiateStreaming(a,t).then(r,function(o){return H("wasm streaming compile failed: "+o),H("falling back to ArrayBuffer instantiation"),n(r)})})).catch(te)})(),c.___wasm_call_ctors=function(){return(c.___wasm_call_ctors=c.asm.Z).apply(null,arguments)};var be,we=c._malloc=function(){return(we=c._malloc=c.asm._).apply(null,arguments)},F=c._free=function(){return(F=c._free=c.asm.$).apply(null,arguments)},Tr=c.___getTypeName=function(){return(Tr=c.___getTypeName=c.asm.aa).apply(null,arguments)};function _r(){function e(){if(!be&&(be=!0,c.calledRun=!0,!ze)){if(_e(Xe),Ie(c),c.onRuntimeInitialized&&c.onRuntimeInitialized(),c.postRun)for(typeof c.postRun=="function"&&(c.postRun=[c.postRun]);c.postRun.length;){var r=c.postRun.shift();Ke.unshift(r)}_e(Ke)}}if(!(0<R)){if(c.preRun)for(typeof c.preRun=="function"&&(c.preRun=[c.preRun]);c.preRun.length;)Er();_e(Ze),0<R||(c.setStatus?(c.setStatus("Running..."),setTimeout(function(){setTimeout(function(){c.setStatus("")},1),e()},1)):e())}}if(c.__embind_initialize_bindings=function(){return(c.__embind_initialize_bindings=c.asm.ba).apply(null,arguments)},c.___cxa_is_pointer_type=function(){return(c.___cxa_is_pointer_type=c.asm.da).apply(null,arguments)},J=function e(){be||_r(),be||(J=e)},c.preInit)for(typeof c.preInit=="function"&&(c.preInit=[c.preInit]);0<c.preInit.length;)c.preInit.pop()();return _r(),z.ready},Pr.exports=$r;const Kr=Xr(kr.exports),en=Object.freeze(Object.defineProperty({__proto__:null,default:Kr},Symbol.toStringTag,{value:"Module"}));export{en as a};
