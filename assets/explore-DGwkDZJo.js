import{_ as F,S as L,r as u,d as N,o as i,n as $,w as t,g as r,ar as S,ao as T,al as U,V as c,ai as v,U as m,t as y,f as V,l as k,F as q,k as j,W as b,Y as I}from"./index-Dmk4SA0r.js";import{V as K,D as R}from"./DashboardCard-D0879PjQ.js";import{b as x}from"./route-block-B_A1xBdJ.js";import{a as o,V as C}from"./VRow-k7vr7YzK.js";import{V as z}from"./VPagination-DLEna0LD.js";import{V as E}from"./VContainer-DIX44aNH.js";import{V as H}from"./VHover-fwOHTnKj.js";const w=12,B={__name:"explore",setup(M){const{api:D}=I(),s=L(),g=u(!0),n=u(""),d=N(()=>s.query.sort==="createdAt"?1:s.query.sort==="like"?2:0),p=u([]),h=u(1),f=u(s.query.page*1||1);return(async()=>{try{const{data:e}=await D.get(`/dashboard/public?page=${s.query.page||1}&limit=${w}&sort=${s.query.sort||"view"}&search=${s.query.search||""}`);p.value=e.result,h.value=Math.ceil(p.value.length/w),g.value=!1}catch(e){console.log(e)}})(),(e,a)=>(i(),$(E,null,{default:t(()=>[r(C,null,{default:t(()=>[r(o,{cols:"12",class:"d-flex justify-center align-center"},{default:t(()=>[r(o,{cols:"6"},{default:t(()=>[r(S,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=l=>n.value=l),variant:"outlined",density:"compact","append-inner-icon":"mdi-magnify",color:"secondary",placeholder:e.$t("explore.titleOrAuthor"),"onClick:appendInner":a[1]||(a[1]=l=>e.$router.push({path:"/explore",query:{search:n.value||void 0}})),onKeydown:a[2]||(a[2]=T(l=>e.$router.push({path:"/explore",query:{search:n.value||void 0}}),["enter"]))},null,8,["modelValue","placeholder"])]),_:1})]),_:1}),r(o,{cols:"12",class:"d-flex justify-end mb-0 pb-0"},{default:t(()=>[r(U,{"model-value":d.value},{default:t(()=>[r(c,{class:v(["h-75 underline-btn",{"text-primary":d.value===0}]),variant:"text",onClick:a[3]||(a[3]=l=>e.$router.push({path:"/explore",query:{sort:"view",search:e.$route.query.search||void 0}}))},{default:t(()=>[m(y(e.$t("explore.popular")),1)]),_:1},8,["class"]),r(c,{class:v(["h-75 underline-btn",{"text-primary":d.value===1}]),variant:"text",onClick:a[4]||(a[4]=l=>e.$router.push({path:"/explore",query:{sort:"createdAt",search:e.$route.query.search||void 0}}))},{default:t(()=>[m(y(e.$t("explore.new")),1)]),_:1},8,["class"]),r(c,{class:v(["h-75 underline-btn",{"text-primary":d.value===2}]),variant:"text",onClick:a[5]||(a[5]=l=>e.$router.push({path:"/explore",query:{sort:"like",search:e.$route.query.search||void 0}}))},{default:t(()=>[m(y(e.$t("explore.good")),1)]),_:1},8,["class"])]),_:1},8,["model-value"])]),_:1}),r(o,{cols:"12"},{default:t(()=>[r(C,null,{default:t(()=>[g.value?(i(),V(q,{key:0},k(12,l=>r(o,{key:l,class:"v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"},{default:t(()=>[r(K,{type:"image, article"})]),_:2},1024)),64)):(i(!0),V(q,{key:1},k(p.value,l=>(i(),$(o,{key:l._id,class:"v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"},{default:t(()=>[r(H,null,{default:t(({isHovering:P,props:A})=>[j("div",b({ref_for:!0},A,{class:"bg-secondary rounded"}),[r(R,b({ref_for:!0},l,{"read-only":!0,class:{"dashboard-hover":!!P},style:{transition:"0.2s"}}),null,16,["class"])],16)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),r(o,{cols:"12"},{default:t(()=>[r(z,{modelValue:f.value,"onUpdate:modelValue":a[6]||(a[6]=l=>f.value=l),length:h.value,onClick:a[7]||(a[7]=l=>e.$router.push({path:"/explore",query:{page:f.value,sort:e.$route.query.sort||void 0,search:e.$route.query.search||void 0}}))},null,8,["modelValue","length"])]),_:1})]),_:1})]),_:1}))}};typeof x=="function"&&x(B);const _=F(B,[["__scopeId","data-v-23bb75a5"]]);export{_ as default};
