import{A as s,U as y,_ as p,eq as l,b$ as b,er as w,d4 as f}from"./index-c6cfe049.js";import{e as _}from"./LRUCache-be26918b.js";let a=h();function h(){return new _(50)}function x(){a=h()}async function B(e,r){var i,t;if((i=e.resource)!=null&&i.href)return g(e.resource.href).then(n=>[n.width,n.height]);if((t=e.resource)!=null&&t.primitive)return r!=null?[r,r]:[256,256];throw new s("symbol3d:invalid-symbol-layer","symbol layers of type Icon must have either an href or a primitive resource")}function g(e){return y(e,{responseType:"image"}).then(r=>r.data)}async function I(e,r=null){var t,n;if(!e.isPrimitive){const o=(t=e.resource)==null?void 0:t.href;if(!o)throw new s("symbol:invalid-resource","The symbol does not have a valid resource");const u=a.get(o);if(u!==void 0)return u;const{fetch:m}=await p(()=>import("./objectResourceUtils-16f7f72a.js").then(v=>v.o),["assets/objectResourceUtils-16f7f72a.js","assets/devEnvironmentUtils-e93e420d.js","assets/index-c6cfe049.js","assets/index-16a932bd.css","assets/mat3f64-e19cdcb8.js","assets/mat4f64-9a8384aa.js","assets/BufferView-b0b4cfa5.js","assets/vec42-614f5847.js","assets/vec3-a9852a06.js","assets/vec4-4ea09148.js","assets/DefaultMaterial_COLOR_GAMMA-2b94785b.js","assets/enums-2e633670.js","assets/Version-d58b3305.js","assets/quat-caf9fdb6.js","assets/quatf64-81e039e4.js","assets/resourceUtils-9dea392a.js","assets/basicInterfaces-d9412f98.js","assets/Indices-0a1fac5a.js","assets/NestedMap-1b5db22e.js","assets/requestImageUtils-d72dd92f.js","assets/orientedBoundingBox-ee672638.js","assets/vec4f64-430e4feb.js","assets/spatialReferenceEllipsoidUtils-eca7bf87.js","assets/computeTranslationToOriginAndRotation-ad79d5a8.js","assets/plane-4b4dad37.js","assets/Util-bd8e9eff.js","assets/sphere-4f0e9aa4.js","assets/lineSegment-31eb7d21.js","assets/VertexAttribute-c2df436e.js","assets/Texture-6d5abce7.js","assets/InterleavedLayout-88c9013b.js","assets/types-1305598a.js","assets/NormalAttribute.glsl-28901648.js","assets/interfaces-8918b36f.js","assets/BindType-d21d71dd.js","assets/renderState-303ecedc.js","assets/doublePrecisionUtils-e3c3d0d8.js","assets/lengthUtils-806c8c03.js"]),d=await m(o,{disableTextures:!0}),c=l(d.referenceBoundingBox,f());return a.put(o,c),c}if(!((n=e.resource)!=null&&n.primitive))throw new s("symbol:invalid-resource","The symbol does not have a valid resource");const i=b(w(e.resource.primitive));if(r!=null)for(let o=0;o<i.length;o++)i[o]*=r;return l(i,f())}export{x as clearBoundingBoxCache,B as computeIconLayerResourceSize,I as computeObjectLayerResourceSize};
