import{_ as c}from"./AppLayout-CNOA8Xlb.js";import l from"./DeleteUserForm-BZFixuGx.js";import f from"./LogoutOtherBrowserSessionsForm-BaQMqXKy.js";import{S as s}from"./SectionBorder-mn0863Y0.js";import u from"./TwoFactorAuthenticationForm-oOYl_TU7.js";import d from"./UpdatePasswordForm-wWgq4QnI.js";import _ from"./UpdateProfileInformationForm-LJ5X98Cq.js";import{o as e,c as h,w as p,a as i,e as r,b as t,h as a,F as g}from"./app-Cb7TLskx.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./DialogModal-jph20_sH.js";import"./SectionTitle-8BK06_Yq.js";import"./Modal-BiNuMcY8.js";import"./DangerButton-BbZwQamK.js";import"./TextInput-CpDQ_Rad.js";import"./SecondaryButton-Bg_QtY2O.js";import"./ActionMessage-6Rw90THa.js";import"./PrimaryButton-ByAzI2sq.js";import"./InputLabel-Bb5w4hso.js";import"./FormSection-C4sboZ9L.js";const $={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},w={key:0},k={key:1},y={key:2},z={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(m){return(o,n)=>(e(),h(c,{title:"Profile"},{header:p(()=>n[0]||(n[0]=[i("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Profile ",-1)])),default:p(()=>[i("div",null,[i("div",$,[o.$page.props.jetstream.canUpdateProfileInformation?(e(),r("div",w,[t(_,{user:o.$page.props.auth.user},null,8,["user"]),t(s)])):a("",!0),o.$page.props.jetstream.canUpdatePassword?(e(),r("div",k,[t(d,{class:"mt-10 sm:mt-0"}),t(s)])):a("",!0),o.$page.props.jetstream.canManageTwoFactorAuthentication?(e(),r("div",y,[t(u,{"requires-confirmation":m.confirmsTwoFactorAuthentication,class:"mt-10 sm:mt-0"},null,8,["requires-confirmation"]),t(s)])):a("",!0),t(f,{sessions:m.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),o.$page.props.jetstream.hasAccountDeletionFeatures?(e(),r(g,{key:3},[t(s),t(l,{class:"mt-10 sm:mt-0"})],64)):a("",!0)])])]),_:1}))}};export{z as default};