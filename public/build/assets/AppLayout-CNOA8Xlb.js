import{Q as B,d as m,K as D,o as a,e as i,n as c,a as e,h as w,t as z,i as C,A as b,c as _,w as g,r as p,j as L,b as h,F as A,p as E,I as Z,k as $,N as x,u as v,l as S,x as M,O,P as j,f as k,R as V,Z as N}from"./app-Cb7TLskx.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const I={class:"max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8"},H={class:"flex items-center justify-between flex-wrap"},T={class:"w-0 flex-1 flex items-center min-w-0"},F={key:0,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},P={key:1,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},R={class:"ms-3 font-medium text-sm text-white truncate"},q={class:"shrink-0 sm:ms-3"},K={__name:"Banner",setup(s){const t=B(),r=m(!0),l=m("success"),d=m("");return D(async()=>{var n,o;l.value=((n=t.props.jetstream.flash)==null?void 0:n.bannerStyle)||"success",d.value=((o=t.props.jetstream.flash)==null?void 0:o.banner)||"",r.value=!0}),(n,o)=>(a(),i("div",null,[r.value&&d.value?(a(),i("div",{key:0,class:c({"bg-indigo-500":l.value=="success","bg-red-700":l.value=="danger"})},[e("div",I,[e("div",H,[e("div",T,[e("span",{class:c(["flex p-2 rounded-lg",{"bg-indigo-600":l.value=="success","bg-red-600":l.value=="danger"}])},[l.value=="success"?(a(),i("svg",F,o[1]||(o[1]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1)]))):w("",!0),l.value=="danger"?(a(),i("svg",P,o[2]||(o[2]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"},null,-1)]))):w("",!0)],2),e("p",R,z(d.value),1)]),e("div",q,[e("button",{type:"button",class:c(["-me-1 flex p-2 rounded-md focus:outline-none sm:-me-2 transition",{"hover:bg-indigo-600 focus:bg-indigo-600":l.value=="success","hover:bg-red-600 focus:bg-red-600":l.value=="danger"}]),"aria-label":"Dismiss",onClick:o[0]||(o[0]=C(u=>r.value=!1,["prevent"]))},o[3]||(o[3]=[e("svg",{class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1)]),2)])])])],2)):w("",!0)]))}},Q={name:"LinkCustomer",components:{Link:L},props:{href:{type:String,required:!0},linkClass:{type:String,default:"flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"}}};function U(s,t,r,l,d,n){const o=b("Link");return a(),_(o,{href:r.href,class:c(r.linkClass)},{default:g(()=>[p(s.$slots,"default",{},void 0,!0)]),_:3},8,["href","class"])}const G=y(Q,[["render",U],["__scopeId","data-v-1d0571de"]]),J={},W={viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function X(s,t){return a(),i("svg",W,t[0]||(t[0]=[e("path",{d:"M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z",fill:"#6875F5"},null,-1),e("path",{d:"M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z",fill:"#6875F5"},null,-1)]))}const Y=y(J,[["render",X]]),ee={components:{LinkCustomer:G,ApplicationMark:Y},data(){return{isSidebarOpen:!1,isDropdownOpen:{layouts:!1,crud:!1}}},mounted(){const s=document.getElementById("toggleSidebarMobile");s&&s.addEventListener("click",this.toggleSidebar)},beforeDestroy(){const s=document.getElementById("toggleSidebarMobile");s&&s.removeEventListener("click",this.toggleSidebar)},methods:{toggleSidebar(){this.isSidebarOpen=!this.isSidebarOpen},toggleDropdown(s){this.$set(this.isDropdownOpen,s,!this.isDropdownOpen[s])},isActive(s){return route().current(s)}}},te={class:"relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"},se={class:"flex flex-col flex-1 pt-5 pb-4 overflow-y-auto"},re={class:"flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-800"},oe={class:"pb-2 space-y-2"};function ae(s,t,r,l,d,n){const o=b("LinkCustomer");return a(),i(A,null,[e("aside",{class:c([{hidden:!d.isSidebarOpen,flex:d.isSidebarOpen},"fixed top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"]),"aria-label":"Sidebar"},[e("div",te,[e("div",se,[e("div",re,[e("ul",oe,[e("li",{class:c({"bg-gray-200 dark:bg-gray-700 rounded-lg":n.isActive("dashboard")})},[h(o,{href:s.route("dashboard")},{default:g(()=>t[1]||(t[1]=[e("svg",{class:"w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"}),e("path",{d:"M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"})],-1),e("span",{class:"ml-3","sidebar-toggle-item":""},"Dashboard",-1)])),_:1},8,["href"])],2),e("li",{class:c({"bg-gray-200 dark:bg-gray-700 rounded-lg":n.isActive("finance.index")})},[h(o,{href:s.route("finance.index")},{default:g(()=>t[2]||(t[2]=[e("svg",{class:"w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",viewBox:"0 0 24 24"},[e("path",{"fill-rule":"evenodd",d:"M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z","clip-rule":"evenodd"}),e("path",{"fill-rule":"evenodd",d:"M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z","clip-rule":"evenodd"}),e("path",{d:"M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"})],-1),e("span",{class:"ml-3","sidebar-toggle-item":""},"Finanzas",-1)])),_:1},8,["href"])],2)])])]),t[3]||(t[3]=e("div",{class:"absolute bottom-0 left-0 justify-center w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800","sidebar-bottom-menu":""},null,-1))])],2),e("div",{class:c([{hidden:!d.isSidebarOpen,block:d.isSidebarOpen},"fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90"]),id:"sidebarBackdrop",onClick:t[0]||(t[0]=(...u)=>n.toggleSidebar&&n.toggleSidebar(...u))},null,2)],64)}const ne=y(ee,[["render",ae]]),le={class:"relative"},ie={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:Array,default:()=>["py-1","bg-white"]}},setup(s){const t=s;let r=m(!1);const l=o=>{r.value&&o.key==="Escape"&&(r.value=!1)};E(()=>document.addEventListener("keydown",l)),Z(()=>document.removeEventListener("keydown",l));const d=$(()=>({48:"w-48"})[t.width.toString()]),n=$(()=>t.align==="left"?"ltr:origin-top-left rtl:origin-top-right start-0":t.align==="right"?"ltr:origin-top-right rtl:origin-top-left end-0":"origin-top");return(o,u)=>(a(),i("div",le,[e("div",{onClick:u[0]||(u[0]=f=>x(r)?r.value=!v(r):r=!v(r))},[p(o.$slots,"trigger")]),S(e("div",{class:"fixed inset-0 z-40",onClick:u[1]||(u[1]=f=>x(r)?r.value=!1:r=!1)},null,512),[[M,v(r)]]),h(O,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"transform opacity-0 scale-95","enter-to-class":"transform opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"transform opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-95"},{default:g(()=>[S(e("div",{class:c(["absolute z-50 mt-2 rounded-md shadow-lg",[d.value,n.value]]),style:{display:"none"},onClick:u[2]||(u[2]=f=>x(r)?r.value=!1:r=!1)},[e("div",{class:c(["rounded-md ring-1 ring-black ring-opacity-5",s.contentClasses])},[p(o.$slots,"content")],2)],2),[[M,v(r)]])]),_:3})]))}},de={key:0,type:"submit",class:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},ue=["href"],ge={__name:"DropdownLink",props:{href:String,as:String},setup(s){return(t,r)=>(a(),i("div",null,[s.as=="button"?(a(),i("button",de,[p(t.$slots,"default")])):s.as=="a"?(a(),i("a",{key:1,href:s.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},[p(t.$slots,"default")],8,ue)):(a(),_(v(L),{key:2,href:s.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},{default:g(()=>[p(t.$slots,"default")]),_:3},8,["href"]))]))}},ce={components:{Dropdown:ie,DropdownLink:ge},data(){return{theme:"light",showTooltip:!1}},mounted(){localStorage.getItem("theme")?this.theme=localStorage.getItem("theme"):this.theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",document.documentElement.classList.toggle("dark",this.theme==="dark"),new MutationObserver(t=>{t.forEach(r=>{r.attributeName==="class"&&(this.theme=document.documentElement.classList.contains("dark")?"dark":"light",localStorage.setItem("theme",this.theme))})}).observe(document.documentElement,{attributes:!0})},methods:{toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.classList.toggle("dark",this.theme==="dark"),localStorage.setItem("theme",this.theme)},logout(){V.post(route("logout"))}}},he={class:"fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"},pe={class:"px-3 py-3 lg:px-5 lg:pl-3"},fe={class:"flex items-center justify-between"},ve={class:"flex items-center"},me={key:0,class:"w-6 h-6 text-gray-800 dark:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",viewBox:"0 0 24 24"},we={key:1,class:"w-6 h-6 text-gray-800 dark:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",viewBox:"0 0 24 24"},be={class:"ms-3 relative"},ye={key:0,class:"flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"},xe=["src","alt"];function ke(s,t,r,l,d,n){const o=b("DropdownLink"),u=b("Dropdown");return a(),i("nav",he,[e("div",pe,[e("div",fe,[t[10]||(t[10]=j('<div class="flex items-center justify-start" data-v-47218104><button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" class="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-v-47218104><svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-v-47218104><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" data-v-47218104></path></svg><svg id="toggleSidebarMobileClose" class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-v-47218104><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-47218104></path></svg></button><a href="" class="flex ml-2 md:mr-2" data-v-47218104><img src="/resource/logos/01.png" class="h-12 mr-3" alt="DailyIA Logo" data-v-47218104></a></div>',1)),e("div",ve,[e("button",{type:"button",class:"text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5",onClick:t[0]||(t[0]=(...f)=>n.toggleTheme&&n.toggleTheme(...f))},[d.theme==="dark"?(a(),i("svg",me,t[2]||(t[2]=[e("path",{"fill-rule":"evenodd",d:"M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z","clip-rule":"evenodd"},null,-1)]))):(a(),i("svg",we,t[3]||(t[3]=[e("path",{"fill-rule":"evenodd",d:"M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z","clip-rule":"evenodd"},null,-1)])))]),e("div",be,[h(u,{align:"right",width:"48"},{trigger:g(()=>[(a(),i("button",ye,[e("img",{class:"h-8 w-8 rounded-full object-cover",src:s.$page.props.auth.user.profile_photo_url,alt:s.$page.props.auth.user.name},null,8,xe)]))]),content:g(()=>[t[8]||(t[8]=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Account ",-1)),h(o,{href:s.route("profile.show")},{default:g(()=>t[5]||(t[5]=[k(" Profile ")])),_:1},8,["href"]),s.$page.props.jetstream.hasApiFeatures?(a(),_(o,{key:0,href:s.route("api-tokens.index")},{default:g(()=>t[6]||(t[6]=[k(" API Tokens ")])),_:1},8,["href"])):w("",!0),t[9]||(t[9]=e("div",{class:"border-t border-gray-200"},null,-1)),e("form",{onSubmit:t[1]||(t[1]=C((...f)=>n.logout&&n.logout(...f),["prevent"]))},[h(o,{as:"button"},{default:g(()=>t[7]||(t[7]=[k(" Log Out ")])),_:1})],32)]),_:1})])])])])])}const _e=y(ce,[["render",ke],["__scopeId","data-v-47218104"]]),$e={class:"flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900"},Se={id:"main-content",class:"relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"},Me={class:"px-4 pt-6"},Be={__name:"AppLayout",props:{title:String},setup(s){return m(!1),(t,r)=>(a(),i("div",null,[h(v(N),{title:s.title},null,8,["title"]),h(K),h(_e),e("div",$e,[h(ne),e("div",Se,[e("main",null,[e("div",Me,[p(t.$slots,"content")])])])])]))}};export{Be as _};