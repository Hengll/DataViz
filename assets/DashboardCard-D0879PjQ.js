import{q as G,aa as j,x as I,B as L,C as Q,E as R,G as U,ab as T,I as J,D as P,az as W,d as q,at as H,N as Z,g as t,W as p,_,c as ee,e as ae,o as n,n as o,w as a,m as te,j as k,aq as S,U as m,t as i,ct as M,X as f,am as $,k as g,f as A,F as x,p as y,an as D,V as b,h as B,ak as N}from"./index-Dmk4SA0r.js";import{V as w,a as u}from"./VRow-k7vr7YzK.js";import{V as z}from"./VHover-fwOHTnKj.js";const le={actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, heading","card-avatar":"image, list-item-avatar",chip:"chip","date-picker":"list-item, heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",divider:"divider",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",ossein:"ossein",paragraph:"text@3",sentences:"text@2",subtitle:"text",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"chip, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"text@6","table-tfoot":"text@2, avatar@2",text:"text"};function ne(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t("div",{class:["v-skeleton-loader__bone",`v-skeleton-loader__${e}`]},[r])}function O(e){const[r,l]=e.split("@");return Array.from({length:l}).map(()=>C(r))}function C(e){let r=[];if(!e)return r;const l=le[e];if(e!==l){if(e.includes(","))return Y(e);if(e.includes("@"))return O(e);l.includes(",")?r=Y(l):l.includes("@")?r=O(l):l&&r.push(C(l))}return[ne(e,r)]}function Y(e){return e.replace(/\s/g,"").split(",").map(C)}const de=G({boilerplate:Boolean,color:String,loading:Boolean,loadingText:{type:String,default:"$vuetify.loading"},type:{type:[String,Array],default:"ossein"},...j(),...I(),...L()},"VSkeletonLoader"),me=Q()({name:"VSkeletonLoader",props:de(),setup(e,r){let{slots:l}=r;const{backgroundColorClasses:d,backgroundColorStyles:s}=R(U(e,"color")),{dimensionStyles:h}=T(e),{elevationClasses:c}=J(e),{themeClasses:v}=P(e),{t:K}=W(),X=q(()=>C(H(e.type).join(",")));return Z(()=>{var F;const V=!l.default||e.loading,E=e.boilerplate||!V?{}:{ariaLive:"polite",ariaLabel:K(e.loadingText),role:"alert"};return t("div",p({class:["v-skeleton-loader",{"v-skeleton-loader--boilerplate":e.boilerplate},v.value,d.value,c.value],style:[s.value,V?h.value:{}]},E),[V?X.value:(F=l.default)==null?void 0:F.call(l)])}),{}}}),se=["lazy-src","src"],ie={class:"overflow-x-hidden"},re={__name:"DashboardCard",props:{_id:{type:String,default:""},dashboardName:{type:String,default:""},user:{type:Object,default:()=>{}},like:{type:Number,default:0},view:{type:Number,default:0},image:{type:String,default:""},updatedAt:{type:String,default:""},readOnly:{type:Boolean,default:!1},cardForm:{type:Boolean,default:!0}},emits:["edit","delete"],setup(e){const{name:r}=ee(),l=new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAIAAACwpMoFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADXSURBVHhe7dEBDQAADMOg+ze9+yDFArfQCsYVjCsYVzCuYFzBuIJxBeMKxhWMKxhXMK5gXMG4gnEF4wrGFYwrGFcwrmBcwbiCcQXjCsYVjCsYVzCuYFzBuIJxBeMKxhWMKxhXMK5gXMG4gnEF4wrGFYwrGFcwrmBcwbiCcQXjCsYVjCsYVzCuYFzBuIJxBeMKxhWMKxhXMK5gXMG4gnEF4wrGFYwrGFcwrmBcwbiCcQXjCsYVjCsYVzCuYFzBuIJxBeMKxhWMKxhXMK5gXMG4gnEF4wqmbQ9nUyEZ+x9srQAAAABJRU5ErkJggg==",import.meta.url).href;return(d,s)=>{const h=ae("router-link");return e.cardForm?(n(),o(N,{key:0},{default:a(()=>[t(h,{to:e.readOnly?"/dashboard/"+e._id:"/editor/dashboard/"+e._id,class:"dashboard-link"},{default:a(()=>[t(w,null,{default:a(()=>[t(u,{cols:"12",class:"pb-0"},{default:a(()=>[t(te,{class:"border ma-1 rounded-t","lazy-src":k(l),src:e.image||k(l)},null,8,["lazy-src","src"])]),_:1}),t(u,{cols:"8",class:"pt-0"},{default:a(()=>[t(S,{title:e.dashboardName},{default:a(()=>[m(i(e.dashboardName),1)]),_:1},8,["title"]),t(M,null,{default:a(()=>[t(z,null,{default:a(({isHovering:c,props:v})=>[e.readOnly?(n(),o(h,p({key:0,title:e.user.userName},v,{to:"/author/"+e.user._id,class:["dashboard-link",{"text-primary":!!c}]}),{default:a(()=>[m(i(e.user.userName),1)]),_:2},1040,["title","to","class"])):f("",!0)]),_:1})]),_:1}),t($,null,{default:a(()=>[t(w,null,{default:a(()=>[e.readOnly?(n(),A(x,{key:1},[t(u,{cols:"6",class:"d-flex align-end"},{default:a(()=>[t(y,{class:"me-2",icon:"mdi-thumb-up-outline"}),g("span",null,i(e.like),1)]),_:1}),t(u,{cols:"6",class:"d-flex align-end"},{default:a(()=>[t(y,{class:"me-2",icon:"mdi-eye-outline"}),g("span",null,i(e.view),1)]),_:1})],64)):(n(),o(u,{key:0,cols:"12"},{default:a(()=>[g("span",null,i(d.$t("dashboard.updatedAt")+" : "+new Date(e.updatedAt).toLocaleDateString()),1)]),_:1}))]),_:1})]),_:1})]),_:1}),t(u,{cols:"4",class:"pt-0"},{default:a(()=>[t(D,{class:"d-flex flex-column align-end"},{default:a(()=>[e.readOnly?f("",!0):(n(),o(b,{key:0,variant:"outlined",color:"primary",onClick:s[0]||(s[0]=c=>d.$emit("edit"))},{default:a(()=>[m(i(d.$t("dashboard.edit")),1)]),_:1})),e.readOnly?f("",!0):(n(),o(b,{key:1,variant:"outlined",onClick:s[1]||(s[1]=B(c=>d.$emit("delete"),["prevent"]))},{default:a(()=>[m(i(d.$t("dashboard.delete")),1)]),_:1}))]),_:1})]),_:1})]),_:1})]),_:1},8,["to"])]),_:1})):(n(),o(N,{key:1},{default:a(()=>[t(h,{to:e.readOnly?"/dashboard/"+e._id:"/editor/dashboard/"+e._id,class:"dashboard-link"},{default:a(()=>[t(w,{class:"d-flex flex-nowrap flex-row pa-1 align-center"},{default:a(()=>[t(u,{class:"flex-0-0 d-flex align-center w-auto pe-0",style:{height:"125px"}},{default:a(()=>[g("img",{class:"border rounded h-100","lazy-src":k(l),src:e.image||k(l)},null,8,se)]),_:1}),t(u,{class:"flex-1-1 w-auto px-0 px-xs-3",style:{height:"125px",minWidth:0}},{default:a(()=>[t(S,{class:"pb-0 pb-xs-2",title:e.dashboardName},{default:a(()=>[m(i(e.dashboardName),1)]),_:1},8,["title"]),e.readOnly?(n(),o(M,{key:0},{default:a(()=>[t(z,null,{default:a(({isHovering:c,props:v})=>[t(h,p({title:e.user.userName},v,{to:"/author/"+e.user._id,class:["dashboard-link",{"text-primary":!!c}]}),{default:a(()=>[m(i(e.user.userName),1)]),_:2},1040,["title","to","class"])]),_:1})]),_:1})):f("",!0),t($,null,{default:a(()=>[t(w,null,{default:a(()=>[e.readOnly?(n(),A(x,{key:1},[t(u,{cols:"6",class:"d-flex align-end"},{default:a(()=>[t(y,{class:"me-2",icon:"mdi-thumb-up-outline"}),g("span",null,i(e.like),1)]),_:1}),t(u,{cols:"6",class:"d-flex align-end"},{default:a(()=>[t(y,{class:"me-2",icon:"mdi-eye-outline"}),g("span",null,i(e.view),1)]),_:1})],64)):(n(),o(u,{key:0,cols:"12"},{default:a(()=>[g("span",ie,i(d.$t("dashboard.updatedAt")+" : "+new Date(e.updatedAt).toLocaleDateString()),1)]),_:1}))]),_:1})]),_:1})]),_:1}),t(u,{class:"flex-0-0 w-auto",style:{height:"125px"}},{default:a(()=>[t(D,{class:"d-flex flex-column align-end justify-center"},{default:a(()=>[k(r)!=="xs"?(n(),A(x,{key:0},[e.readOnly?f("",!0):(n(),o(b,{key:0,variant:"outlined",color:"primary",onClick:s[2]||(s[2]=c=>d.$emit("edit"))},{default:a(()=>[m(i(d.$t("dashboard.edit")),1)]),_:1})),e.readOnly?f("",!0):(n(),o(b,{key:1,variant:"outlined",onClick:s[3]||(s[3]=B(c=>d.$emit("delete"),["prevent"]))},{default:a(()=>[m(i(d.$t("dashboard.delete")),1)]),_:1}))],64)):(n(),A(x,{key:1},[e.readOnly?f("",!0):(n(),o(b,{key:0,"min-width":"24",variant:"outlined",color:"primary",onClick:s[4]||(s[4]=c=>d.$emit("edit"))},{default:a(()=>[t(y,{color:"primary",icon:"mdi-pencil",size:"x-small"})]),_:1})),e.readOnly?f("",!0):(n(),o(b,{key:1,"min-width":"24",variant:"outlined",onClick:s[5]||(s[5]=B(c=>d.$emit("delete"),["prevent"]))},{default:a(()=>[t(y,{icon:"mdi-close",size:"x-small"})]),_:1}))],64))]),_:1})]),_:1})]),_:1})]),_:1},8,["to"])]),_:1}))}}},fe=_(re,[["__scopeId","data-v-dfe94bfe"]]);export{fe as D,me as V};
