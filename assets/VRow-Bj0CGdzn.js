import{cy as i,aC as u,q as m,v as S,A as b,C as k,d as N,ag as j}from"./index-CQj0lzTV.js";const V=i.reduce((e,a)=>(e[a]={type:[Boolean,String,Number],default:!1},e),{}),v=i.reduce((e,a)=>{const t="offset"+u(a);return e[t]={type:[String,Number],default:null},e},{}),L=i.reduce((e,a)=>{const t="order"+u(a);return e[t]={type:[String,Number],default:null},e},{}),y={col:Object.keys(V),offset:Object.keys(v),order:Object.keys(L)};function G(e,a,t){let s=e;if(!(t==null||t===!1)){if(a){const n=a.replace(e,"");s+=`-${n}`}return e==="col"&&(s="v-"+s),e==="col"&&(t===""||t===!0)||(s+=`-${t}`),s.toLowerCase()}}const _=["auto","start","end","center","baseline","stretch"],I=m({cols:{type:[Boolean,String,Number],default:!1},...V,offset:{type:[String,Number],default:null},...v,order:{type:[String,Number],default:null},...L,alignSelf:{type:String,default:null,validator:e=>_.includes(e)},...S(),...b()},"VCol"),x=k()({name:"VCol",props:I(),setup(e,a){let{slots:t}=a;const s=N(()=>{const n=[];let l;for(l in y)y[l].forEach(o=>{const c=e[o],g=G(l,o,c);g&&n.push(g)});const r=n.some(o=>o.startsWith("v-col-"));return n.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),n});return()=>{var n;return j(e.tag,{class:[s.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}}),f=["start","end","center"],$=["space-between","space-around","space-evenly"];function d(e,a){return i.reduce((t,s)=>{const n=e+u(s);return t[n]=a(),t},{})}const R=[...f,"baseline","stretch"],h=e=>R.includes(e),w=d("align",()=>({type:String,default:null,validator:h})),T=[...f,...$],P=e=>T.includes(e),A=d("justify",()=>({type:String,default:null,validator:P})),U=[...f,...$,"stretch"],E=e=>U.includes(e),O=d("alignContent",()=>({type:String,default:null,validator:E})),C={align:Object.keys(w),justify:Object.keys(A),alignContent:Object.keys(O)},B={align:"align",justify:"justify",alignContent:"align-content"};function M(e,a,t){let s=B[e];if(t!=null){if(a){const n=a.replace(e,"");s+=`-${n}`}return s+=`-${t}`,s.toLowerCase()}}const F=m({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h},...w,justify:{type:String,default:null,validator:P},...A,alignContent:{type:String,default:null,validator:E},...O,...S(),...b()},"VRow"),q=k()({name:"VRow",props:F(),setup(e,a){let{slots:t}=a;const s=N(()=>{const n=[];let l;for(l in C)C[l].forEach(r=>{const o=e[r],c=M(l,r,o);c&&n.push(c)});return n.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),n});return()=>{var n;return j(e.tag,{class:["v-row",s.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}});export{q as V,x as a};
