import{_ as T,b as M,T as P,R as E,u as F,e as I,o as L,n as B,w as l,k as n,g as a,m as j,j as e,t as p,h as D,aq as i,V as Q,U as _,Y as J}from"./index-CQj0lzTV.js";import{c as O,a as m,f as Y,u as z,b as d}from"./index.esm-Dgpy6Www.js";import{v as k}from"./index-Cg6v6Qfq.js";import{b as U}from"./route-block-B_A1xBdJ.js";import{a as u,V as G}from"./VRow-Bj0CGdzn.js";import{V as H}from"./VForm-DIldRjYS.js";import{V as K}from"./VContainer-Dd9goq2h.js";const W={class:"user-container"},X={class:"text-center"},Z={class:"d-flex justify-center mt-10"},ee={class:"text-center"},$={__name:"register",setup(se){const N=new URL("@/assets/logo.png",import.meta.url).href,S=new URL(""+new URL("logo_dark-iAJrQSQx.png",import.meta.url).href,import.meta.url).href,{t:o}=M(),{api:x}=J(),w=P(),y=E(),R=F(),q=O({account:m().required(o("api.userAccountRequired")).min(4,o("api.userAccountTooShort")).max(20,o("api.userAccountTooLong")).test("isAlphanumeric",o("api.userAccountInvalid"),s=>k.isAlphanumeric(s)),userName:m().required(o("api.userUserNameRequired")),email:m().required(o("api.userEmailRequired")).test("isEmail",o("api.userEmailInvalid"),s=>k.isEmail(s)),password:m().required(o("api.userPasswordRequired")).min(4,o("api.userPasswordTooShort")).max(20,o("api.userPasswordTooLong")),passwordConfirm:m().oneOf([Y("password")],o("api.userPasswordNotMatch"))}),{handleSubmit:A,isSubmitting:h}=z({validationSchema:q}),g=d("account"),v=d("userName"),f=d("email"),V=d("password"),b=d("passwordConfirm"),C=A(async s=>{var t,c;try{await x.post("/user",{account:s.account,userName:s.userName,email:s.email,password:s.password}),w({text:o("register.success"),snackbarProps:{color:"green"}}),y.push("/login")}catch(r){console.log(r),w({text:o("api."+((c=(t=r==null?void 0:r.response)==null?void 0:t.data)==null?void 0:c.message)||"unknownError"),snackbarProps:{color:"red"}})}});return(s,t)=>{const c=I("router-link");return L(),B(K,{class:"d-flex justify-center"},{default:l(()=>[n("div",W,[a(G,null,{default:l(()=>[a(u,{cols:"12",class:"pa-0"},{default:l(()=>[a(j,{src:e(R).theme==="lightTheme"?e(N):e(S)},null,8,["src"])]),_:1}),a(u,{cols:"12"}),a(u,{cols:"12"},{default:l(()=>[n("h1",X,p(s.$t("nav.register")),1)]),_:1}),a(u,{cols:"12"},{default:l(()=>[a(H,{disabled:e(h),onSubmit:D(e(C),["prevent"])},{default:l(()=>[a(i,{modelValue:e(g).value.value,"onUpdate:modelValue":t[0]||(t[0]=r=>e(g).value.value=r),variant:"outlined","error-messages":e(g).errorMessage.value,label:s.$t("user.account"),counter:"",minlength:"4",maxlength:"20"},null,8,["modelValue","error-messages","label"]),a(i,{modelValue:e(v).value.value,"onUpdate:modelValue":t[1]||(t[1]=r=>e(v).value.value=r),variant:"outlined","error-messages":e(v).errorMessage.value,label:s.$t("user.userName")},null,8,["modelValue","error-messages","label"]),a(i,{modelValue:e(f).value.value,"onUpdate:modelValue":t[2]||(t[2]=r=>e(f).value.value=r),variant:"outlined","error-messages":e(f).errorMessage.value,label:s.$t("user.email")},null,8,["modelValue","error-messages","label"]),a(i,{modelValue:e(V).value.value,"onUpdate:modelValue":t[3]||(t[3]=r=>e(V).value.value=r),variant:"outlined",type:"password",autocomplete:"","error-messages":e(V).errorMessage.value,label:s.$t("user.password"),counter:"",minlength:"4",maxlength:"20"},null,8,["modelValue","error-messages","label"]),a(i,{modelValue:e(b).value.value,"onUpdate:modelValue":t[4]||(t[4]=r=>e(b).value.value=r),variant:"outlined",type:"password",autocomplete:"","error-messages":e(b).errorMessage.value,label:s.$t("user.passwordConfirm"),counter:"",minlength:"4",maxlength:"20"},null,8,["modelValue","error-messages","label"]),n("div",Z,[a(Q,{loading:e(h),variant:"outlined",type:"submit",color:"primary"},{default:l(()=>[_(p(s.$t("register.register")),1)]),_:1},8,["loading"])])]),_:1},8,["disabled","onSubmit"])]),_:1}),a(u,{cols:"12"}),a(u,{cols:"12"},{default:l(()=>[n("p",ee,[n("span",null,p(s.$t("register.notFirstUse")),1),a(c,{to:"/login",class:"link-login"},{default:l(()=>[_(p(s.$t("register.login")),1)]),_:1})])]),_:1})]),_:1})])]),_:1})}}};typeof U=="function"&&U($);const ie=T($,[["__scopeId","data-v-1477e2ab"]]);export{ie as default};
