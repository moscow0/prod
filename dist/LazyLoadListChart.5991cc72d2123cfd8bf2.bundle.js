"use strict";(self.webpackChunkuwazi=self.webpackChunkuwazi||[]).push([[155],{17105:(e,l,t)=>{t.r(l),t.d(l,{ListChartComponent:()=>b,default:()=>m,mapStateToProps:()=>v});t(67294);var r,s=t(37974),a=(t(43393),t(73581)),o=t.n(a),n=t(80129),i=t.n(n),c=t(76395),f=t(50530),d=t(13572),u=t(56053);function p(e,l,t,s){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(l||0===o||(l={children:void 0}),1===o)l.children=s;else if(o>1){for(var n=new Array(o),i=0;i<o;i++)n[i]=arguments[i+3];l.children=n}if(l&&a)for(var c in a)void 0===l[c]&&(l[c]=a[c]);else l||(l=a||{});return{$$typeof:r,type:e,key:void 0===t?null:""+t,ref:null,props:l,_owner:null}}const b=e=>{const{excludeZero:l,property:t,data:r,classname:s,context:a,scatter:n,colors:u}=e,b=u.split(",");let v=p(c.Z,{});if(r){const s=f.sq.sortValues(f.sq.formatDataForChart(r,t,{excludeZero:Boolean(l),context:a,scatter:n}));let c={filters:{}};if(e.baseUrl){const{q:l}=i().parse(e.baseUrl.substring(e.baseUrl.indexOf("?")),{ignoreQueryPrefix:!0});c=o().decode(l),c.filters=c.filters||{}}v=p("ul",{},void 0,s.map(((l,r)=>{const s=p("div",{},void 0,p("div",{className:"list-bullet",style:{backgroundColor:b[r%b.length]}},void 0,p("span",{},void 0,l.results)),p("span",{className:"list-label"},void 0,n?`${l.parent} - ${l.label}`:l.label));return c.filters[t]={values:[l.id]},p("li",{},l.id,e.baseUrl&&p(d.Z,{url:`/library/?q=${o().encode(c)}`,classname:"list-link"},void 0,s),!e.baseUrl&&s)})))}return p("div",{className:`ListChart ${s}`},void 0,v)};b.defaultProps={context:"System",excludeZero:!1,scatter:!1,classname:"",colors:"#ffcc00,#ffd633,#ffe066,#ffeb99,#fff5cc",data:null,baseUrl:null};const v=(e,l)=>({data:u.Z.getAggregations(e,l),thesauris:e.thesauris}),m=(0,s.connect)(v)(b)}}]);
//# sourceMappingURL=LazyLoadListChart.5991cc72d2123cfd8bf2.bundle.js.map