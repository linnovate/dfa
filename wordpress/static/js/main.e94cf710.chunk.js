(this.webpackJsonpdfa=this.webpackJsonpdfa||[]).push([[0],{385:function(e,t,n){},393:function(e,t){},395:function(e,t){},405:function(e,t){},407:function(e,t){},434:function(e,t){},435:function(e,t){},440:function(e,t){},442:function(e,t){},449:function(e,t){},468:function(e,t){},700:function(e,t,n){"use strict";n.r(t);var a,r,c,s,i,o,l,u,j=n(10),d=n(11),b=n(23),p=n(26),h=n(369),m=n(0),g=n.n(m),f=n(54),O=n.n(f),x=(n(384),n(385),n(27)),v=n(21),y=n(9),w=n(2),k=Object(m.createContext)({}),S=function(e){var t=Object(m.useState)(e.store||{}),n=Object(y.a)(t,2);return a=n[0],r=n[1],Object(w.jsx)(k.Provider,{value:[a,r],children:e.children})},I=function(e,t){var n=Object(m.useContext)(k),r=Object(y.a)(n,2),c=(r[0],r[1]);return e&&void 0!==t&&(a[e]=t),[e?a[e]:a,function(t){c(Object(v.a)(Object(v.a)({},a),{},Object(x.a)({},e,t)))}]},q=n(45),C=function(e){var t=Object(m.useState)([]),n=Object(y.a)(t,2),a=n[0],r=n[1];return c=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=O.a.createPortal(g.a.createElement(t,n),e),r([].concat(Object(q.a)(a),[t]))},a},N=n(24),E=n(13),M=n.n(E),R=n(712),L=n(350),U=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"".concat(window.location.host,"/v1");Object(j.a)(this,e);var n=new URL(window.location.toString()),a=n.searchParams.get("baseUrl");this.baseUrl=a||t,this.token=sessionStorage.getItem("token"),this.party=sessionStorage.getItem("party")}return Object(d.a)(e,[{key:"createCredentials",value:function(){var e=Object(N.a)(M.a.mark((function e(t){var n,a,r,c;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=new URL(window.location.toString()),a=n.searchParams.get("ledgerId")){e.next=5;break}return alert("'ledgerId' must appear in URL parameters."),e.abrupt("return");case 5:r={"https://daml.com/ledger-api":{ledgerId:a,applicationId:"dfa-sandbox",actAs:[t]}},"secret",c=Object(L.encode)(r,"secret","HS256"),sessionStorage.setItem("token",c),sessionStorage.setItem("party",t),this.token=c,this.party=t;case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"logout",value:function(){this.token=null,this.party=null,sessionStorage.removeItem("token"),sessionStorage.removeItem("party")}},{key:"post",value:function(e,t){return fetch("//".concat(this.baseUrl).concat(e),{method:"post",headers:{Authorization:"Bearer ".concat(this.token),"Content-Type":"application/json"},body:JSON.stringify(t||"")}).then((function(e){return e.json()})).then((function(e){if(e.status<200&&e.status>299)throw e.errors;return e})).catch((function(e){return console.log(e)}))}},{key:"get",value:function(e){return fetch("//".concat(this.baseUrl).concat(e),{method:"get",headers:{Authorization:"Bearer ".concat(this.token),"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){if(e.status<200&&e.status>299)throw e.errors;return e})).catch((function(e){return console.log(e)}))}},{key:"getParteis",value:function(){var e=Object(N.a)(M.a.mark((function e(){var t;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.parteis){e.next=2;break}return e.abrupt("return",this.parteis);case 2:return e.next=4,this.get("/parties");case 4:return t=e.sent,e.abrupt("return",this.parteis=t.result);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addParty",value:function(){var e=Object(N.a)(M.a.mark((function e(t,n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.post("/parties/allocate",{identifierHint:t,displayName:n}));case 1:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"create",value:function(e,t){return this.post("/create",{templateId:e,payload:t})}},{key:"exercise",value:function(e,t,n,a){return this.post("/exercise",{templateId:e,contractId:t,choice:n,argument:a})}},{key:"query",value:function(e,t,n){return this.post("/query",{templateIds:e,query:t,readers:n})}},{key:"querySocket",value:function(e,t,n){var a="https:"==window.location.protocol?"wss":"ws",r=new WebSocket("".concat(a,"://").concat(this.baseUrl,"/stream/query"),["jwt.token.".concat(this.token),"daml.ws.auth"]);return r.addEventListener("open",(function(){r.send(JSON.stringify({templateIds:e,query:t,readers:n}))})),r}},{key:"messageHandler",value:function(e,t){var n=!1;return JSON.parse(e.data).events.forEach((function(e){if(e.archived){var a=t.findIndex((function(t){return t.contractId==e.archived.contractId}));t.splice(a,1)}else e.created&&t.push(e.created);n=!0})),n}}]),e}(),A=null,T=A||(A=new U),D=n(713),H=n(714),P=n(709),F=n(716),G=n(711),B=function(e){var t=e.onLogin,n=(T.ledgerId,Object(m.useState)("")),a=Object(y.a)(n,2),r=a[0],c=a[1],s=(new URL(window.location.toString()).searchParams.get("token"),function(){var e=Object(N.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),T.createCredentials(r),t();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());return Object(w.jsx)(D.a,{className:"login-from",textAlign:"center",style:{height:"100vh"},verticalAlign:"middle",children:Object(w.jsxs)(D.a.Column,{style:{maxWidth:450},children:[Object(w.jsx)(H.a,{as:"h1",textAlign:"center",size:"huge",style:{color:"#223668"},children:Object(w.jsx)(H.a.Content,{children:"Distrubuted Flight Approval"})}),Object(w.jsx)(P.a,{size:"large",className:"test-select-login-screen",children:Object(w.jsxs)(F.a,{children:[Object(w.jsx)(P.a.Input,{fluid:!0,icon:"user",iconPosition:"left",placeholder:"Username",className:"test-select-username-field",onChange:function(e){return c(e.currentTarget.value)}}),Object(w.jsx)(G.a,{primary:!0,fluid:!0,className:"test-select-login-button",onClick:s,disabled:!r,children:"Log in"})]})})]})})},W=function(){var e=T.party,t=I("user"),n=Object(y.a)(t,2),a=(n[0],n[1]),r=Object(m.useState)(!1),c=Object(y.a)(r,2),s=c[0],i=c[1],o=function(){var e=Object(N.a)(M.a.mark((function e(){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a({}),i(!1);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)(R.a,{icon:!0,borderless:!0,children:[Object(w.jsxs)(R.a.Menu,{position:"right",className:"test-select-main-menu",children:[e&&Object(w.jsxs)(R.a.Item,{position:"right",children:["You are logged in as ",e.split("::")[0],"."]}),e&&Object(w.jsx)(R.a.Item,{position:"right",active:!1,className:"test-select-log-out",onClick:function(){T.logout(),a(null)},icon:"log out",title:"log out"}),!e&&Object(w.jsx)(R.a.Item,{position:"right",active:!1,className:"test-select-sign-in",onClick:function(){return i(!s)},icon:"sign in",title:"sign in"})]}),s&&Object(w.jsx)(B,{onLogin:o})]})},z=n(73),J=n(708),Z=n(64),Y=function(e){var t=Object(m.useState)(!1),n=Object(y.a)(t,2),a=n[0],r=n[1];return Object(w.jsx)(Z.Marker,{position:e.position,visible:e.visible,onMouseOver:function(){r(!0)},onMouseOut:function(){r(!1)},children:a&&Object(w.jsx)(Z.InfoWindow,{children:Object(w.jsxs)("h4",{children:["Lat: ",e.position.lat,Object(w.jsx)("br",{})," Lng: ",e.position.lng]})})})},_=Object(Z.withScriptjs)(Object(Z.withGoogleMap)((function(e){return Object(w.jsx)(Z.GoogleMap,{defaultZoom:8,defaultCenter:{lat:e.lat,lng:e.lng},children:Object(w.jsx)(Y,{position:{lat:e.lat,lng:e.lng},visible:!0})})}))),K=function(e){return Object(w.jsx)(_,{googleMapURL:"https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCGNWEx_cSfFlxaon2GjBqynYxrAD7kJbY&libraries=geometry,drawing,places",loadingElement:Object(w.jsx)("div",{style:{height:"100%"}}),containerElement:Object(w.jsx)("div",{style:{height:"100%"}}),mapElement:Object(w.jsx)("div",{style:{height:"100%"}}),lat:e.lat,lng:e.lng})},Q=Object(Z.withScriptjs)(Object(Z.withGoogleMap)((function(e){var t=Object(m.useState)({lat:33.36157687471931,lng:35.648549973336756}),n=Object(y.a)(t,2),a=n[0],r=n[1],c=Object(m.useState)(9),s=Object(y.a)(c,2),i=s[0],o=s[1],l=Object(m.useState)({lat:33.36157687471931,lng:35.648549973336756}),u=Object(y.a)(l,2),j=u[0],d=u[1],b=Object(m.useState)(!1),p=Object(y.a)(b,2),h=p[0],g=p[1];return Object(w.jsx)(Z.GoogleMap,{onRightClick:function(e){navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){r({lat:e.coords.latitude,lng:e.coords.longitude}),o(13)}))},onClick:function(t){t.latLng&&(d({lat:t.latLng.lat(),lng:t.latLng.lng()}),g(!0),e.onSubmit(t.latLng.lat(),t.latLng.lng()))},zoom:i,center:a,defaultZoom:8,defaultCenter:{lat:0,lng:0},children:Object(w.jsx)(Y,{position:j,visible:h})})}))),V=function(e){return Object(w.jsx)(Q,{googleMapURL:"https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCGNWEx_cSfFlxaon2GjBqynYxrAD7kJbY&libraries=geometry,drawing,places",loadingElement:Object(w.jsx)("div",{style:{height:"100%"}}),containerElement:Object(w.jsx)("div",{style:{height:"100%"}}),mapElement:Object(w.jsx)("div",{style:{height:"100%"}}),onSubmit:e.onSubmit})},X=["Zoolog","Meteorologist","Hamal"],$=function(){var e=T.party,t=I("user"),n=Object(y.a)(t,2),a=(n[0],n[1],Object(m.useState)({})),r=Object(y.a)(a,2),c=r[0],s=r[1],i=Object(m.useState)(!1),o=Object(y.a)(i,2),l=o[0],u=o[1],j=Object(m.useState)(!0),d=Object(y.a)(j,2),b=d[0],p=d[1],h=function(){var t=Object(N.a)(M.a.mark((function t(n){var a,r;return M.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),u(!0),t.next=4,T.getParteis();case 4:return a=t.sent,r=a.filter((function(e){return X.includes(e.displayName)})).map((function(e){return e.identifier})),t.next=8,T.create("User:FlightRequest",{user:e,parties:r,flight:c,approvers:[],disapprovers:[]}).catch((function(){return u(!1)}));case 8:t.sent,u(!1);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"Create Request"})]}),Object(w.jsx)(J.a,{}),e&&Object(w.jsxs)(P.a,{className:"create-request-form",children:[Object(w.jsxs)(G.a,{basic:!0,color:"blue",icon:!0,labelPosition:"left",onClick:function(){p(!b)},children:[Object(w.jsx)(z.a,{name:"map"})," map"]}),Object(w.jsx)("div",{className:"create-request-map",style:{width:"100%",height:b?"400px":"0px"},children:b&&Object(w.jsx)(V,{onSubmit:function(e,t){return s(Object(v.a)(Object(v.a)({},c),{},{lat:e.toString(),lng:t.toString()}))}})}),Object(w.jsx)(P.a.Input,{className:"select-request-content",label:"lat coordinates",value:c.lat,onChange:function(e){return s(Object(v.a)(Object(v.a)({},c),{},{lat:e.currentTarget.value}))}}),Object(w.jsx)(P.a.Input,{className:"select-request-content",label:"lng coordinates",value:c.lng,onChange:function(e){return s(Object(v.a)(Object(v.a)({},c),{},{lng:e.currentTarget.value}))}}),Object(w.jsx)(P.a.Input,{className:"select-request-content",label:"Altitude",type:"number",step:"100",min:"0",value:c.altitude,onChange:function(e){return s(Object(v.a)(Object(v.a)({},c),{},{altitude:e.currentTarget.value}))}}),Object(w.jsx)(J.a,{className:"Divider"}),Object(w.jsx)(P.a.Input,{className:"select-request-content",label:"Start time",type:"datetime-local",value:c.timeStart,onChange:function(e){return s(Object(v.a)(Object(v.a)({},c),{},{timeStart:e.currentTarget.value}))}}),Object(w.jsx)(P.a.Input,{className:"select-request-content",label:"End time",type:"datetime-local",value:c.timeEnd,onChange:function(e){return s(Object(v.a)(Object(v.a)({},c),{},{timeEnd:e.currentTarget.value}))}}),Object(w.jsx)(G.a,{primary:!0,className:"select-request-send-button",onClick:h,disabled:l||!(c.lat&&c.lng&&c.altitude),loading:l,content:"Send"})]})]})},ee=n(710),te=n(158),ne=[],ae=function(){var e,t=T.party,n=I("user"),a=Object(y.a)(n,2),r=(a[0],a[1],Object(m.useState)()),c=Object(y.a)(r,2),o=c[0],l=c[1];return o&&(e=o.map((function(e){return Object(v.a)(Object(v.a)({},e.payload),{},{contractId:e.contractId})}))).sort((function(e,t){return new Date(e.flight.time).getTime()-new Date(t.flight.time).getTime()})),Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function e(){var n,a;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?((s=T.querySocket(["User:FlightRequest"])).addEventListener("message",(function(e){T.messageHandler(e,ne)&&l([].concat(ne))})),(i=T.querySocket(["User:CompletedRequest"])).addEventListener("message",(function(e){T.messageHandler(e,ne)&&l([].concat(ne))}))):(null===(n=s)||void 0===n||n.close(),null===(a=i)||void 0===a||a.close(),l());case 1:case"end":return e.stop()}}),e)})))()}),[t]),Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"All Requests"})]}),Object(w.jsx)(J.a,{}),Object(w.jsx)(ee.a,{relaxed:!0,className:"items",children:e&&e.map((function(e,t){return Object(w.jsxs)(F.a,{children:[e.approvers.length===e.parties.length?Object(w.jsx)(te.a,{color:"green",ribbon:!0,className:"label",children:"Approve"}):Object(w.jsx)(te.a,{color:"blue",ribbon:!0,className:"label",children:"Request"}),Object(w.jsxs)(ee.a.Item,{children:["Info: ",Object(w.jsxs)("strong",{children:["lat: ",e.flight.lat,", lng: ",e.flight.lng,", altitude: ",e.flight.altitude]})]}),Object(w.jsxs)(ee.a.Item,{children:["Time: ",Object(w.jsxs)("strong",{children:[e.flight.timeStart," --\x3e ",e.flight.timeEnd]})]}),Object(w.jsxs)(ee.a.Item,{children:["User: ",Object(w.jsx)("strong",{children:e.user.split("::")[0]})]})]},e.contractId)}))})]})},re=[],ce=function(){var e,t=T.party,n=I("user"),a=Object(y.a)(n,2),r=(a[0],a[1],Object(m.useState)()),c=Object(y.a)(r,2),s=c[0],i=c[1];return s&&(e=s.filter((function(e){return e.payload.disapprovers.length+e.payload.approvers.length<e.payload.parties.length})).map((function(e){return Object(v.a)(Object(v.a)({},e.payload),{},{contractId:e.contractId})})).reverse()),Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function e(){var n;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?(o=T.querySocket(["User:FlightRequest"],{user:t})).addEventListener("message",(function(e){T.messageHandler(e,re)&&i([].concat(re))})):(null===(n=o)||void 0===n||n.close(),i(null));case 1:case"end":return e.stop()}}),e)})))()}),[t]),Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"My Requests"})]}),Object(w.jsx)(J.a,{}),Object(w.jsx)(ee.a,{relaxed:!0,className:"items",children:e&&e.map((function(e,t){return Object(w.jsxs)(F.a,{children:[Object(w.jsx)(te.a,{color:"blue",ribbon:!0,className:"label",children:"Request"}),Object(w.jsxs)(ee.a,{children:[Object(w.jsxs)(ee.a.Item,{children:["Info: ",Object(w.jsxs)("strong",{children:["lat: ",e.flight.lat,", lng: ",e.flight.lng,", altitude: ",e.flight.altitude]})]}),Object(w.jsxs)(ee.a.Item,{children:["Time: ",Object(w.jsxs)("strong",{children:[e.flight.timeStart," --\x3e ",e.flight.timeEnd]})]}),Object(w.jsxs)(ee.a.Item,{children:["Approvers: ",Object(w.jsx)("strong",{children:e.approvers.map((function(e){return e.split("::")[0]})).join(", ")||"---"})]}),Object(w.jsxs)(ee.a.Item,{children:["Disapprovers: ",Object(w.jsx)("strong",{children:e.disapprovers.map((function(e){return e.split("::")[0]})).join(", ")||"---"})]})]})]},e.contractId)}))})]})},se=[],ie=function(){var e,t=T.party,n=I("user"),a=Object(y.a)(n,2),r=(a[0],a[1],Object(m.useState)()),c=Object(y.a)(r,2),s=c[0],i=c[1];return s&&(e=s.map((function(e){return Object(v.a)(Object(v.a)({},e.payload),{},{contractId:e.contractId})})).reverse()),Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function e(){var n;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?(l=T.querySocket(["User:CompletedRequest"],{user:t})).addEventListener("message",(function(e){T.messageHandler(e,se)&&i([].concat(se))})):(null===(n=l)||void 0===n||n.close(),i(null));case 1:case"end":return e.stop()}}),e)})))()}),[t]),Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"My Approved Requests"})]}),Object(w.jsx)(J.a,{}),Object(w.jsx)(ee.a,{relaxed:!0,className:"items",children:e&&e.map((function(e,t){return Object(w.jsxs)(F.a,{children:[Object(w.jsxs)(ee.a.Item,{children:["Time: ",Object(w.jsxs)("strong",{children:[new Date(e.flight.timeStart).toLocaleString()," -> ",new Date(e.flight.timeEnd).toLocaleString()]})]}),Object(w.jsxs)(ee.a.Item,{children:["Info: ",Object(w.jsxs)("strong",{children:["lat: ",e.flight.lat," | lng: ",e.flight.lng," | altitude: ",e.flight.altitude]})]})]},e.contractId)}))})]})},oe=[],le=function(){var e,t=T.party,n=I("user"),a=Object(y.a)(n,2),r=(a[0],a[1],Object(m.useState)()),c=Object(y.a)(r,2),s=c[0],i=c[1],o=g.a.useState(!1),l=Object(y.a)(o,2),j=l[0],d=l[1];function b(){return(b=Object(N.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.exercise("User:FlightRequest",n,"Approved",{approver:t});case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(){return(p=Object(N.a)(M.a.mark((function e(n){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.exercise("User:FlightRequest",n,"Disapproved",{disapprover:t});case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return s&&(e=s.filter((function(e){return e.payload.parties.includes(t)&&!(e.payload.approvers.includes(t)||e.payload.disapprovers.includes(t))})).map((function(e){return Object(v.a)(Object(v.a)({},e.payload),{},{contractId:e.contractId})}))),Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function e(){var n;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?(u=T.querySocket(["User:FlightRequest"])).addEventListener("message",(function(e){T.messageHandler(e,oe)&&i([].concat(oe))})):(null===(n=u)||void 0===n||n.close(),i(null));case 1:case"end":return e.stop()}}),e)})))()}),[t]),Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"Requests For Approval"})]}),Object(w.jsx)(J.a,{}),Object(w.jsx)(ee.a,{relaxed:!0,className:"items",children:e&&e.map((function(e,n){return Object(w.jsxs)(F.a,{children:[Object(w.jsx)(te.a,{as:"a",color:"teal",ribbon:!0,children:"Review"}),Object(w.jsx)("div",{className:"create-request-map",style:{width:"100%",height:j?"200px":"0px"},children:j&&Object(w.jsx)(K,{lat:parseFloat(e.flight.lat),lng:parseFloat(e.flight.lng)})}),Object(w.jsxs)(ee.a.Item,{children:["Time: ",Object(w.jsxs)("strong",{children:[e.flight.timeStart," --\x3e ",e.flight.timeEnd]})]}),Object(w.jsxs)(ee.a.Item,{children:["Location: ",Object(w.jsxs)("strong",{children:["lat: ",e.flight.lat,",  lng: ",e.flight.lng,",  altitude: ",e.flight.altitude]})]}),Object(w.jsxs)(ee.a.Item,{children:["User: ",Object(w.jsx)("strong",{children:e.user.split("::")[0]})]}),e.parties.includes(t)&&Object(w.jsxs)("div",{className:"actions",children:[Object(w.jsx)(G.a,{positive:!0,onClick:function(){return function(e){return b.apply(this,arguments)}(e.contractId)},children:"Approve"}),Object(w.jsx)(G.a,{secondary:!0,onClick:function(){return function(e){return p.apply(this,arguments)}(e.contractId)},children:"Disapprove"}),Object(w.jsxs)(G.a,{basic:!0,color:"blue",icon:!0,labelPosition:"left",onClick:function(){d(!j)},children:[Object(w.jsx)(z.a,{name:"map"}),"map"]})]})]},e.contractId)}))})]})},ue=n(28);ue.f.register(ue.a,ue.l,ue.c,ue.p,ue.b,ue.d,ue.h,ue.k,ue.o,ue.q,ue.r,ue.t,ue.e,ue.m,ue.n,ue.s,ue.v,ue.w,ue.g,ue.i,ue.j,ue.x,ue.y,ue.u);var je,de,be=[],pe=function(){var e=T.party,t=I("user"),n=Object(y.a)(t,2),a=(n[0],n[1],Object(m.useState)({group:"",member:""})),r=Object(y.a)(a,2),c=r[0],s=r[1],i=Object(m.useState)(!1),o=Object(y.a)(i,2),l=o[0],u=o[1],j=Object(m.useState)([]),d=Object(y.a)(j,2),b=d[0],p=d[1];Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function t(){var n,a;return M.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=4;break}p([]),t.next=9;break;case 4:return t.next=6,T.getParteis();case 6:n=t.sent,a=n.map((function(e){return{key:e.identifier,text:e.identifier,value:e.identifier}})),p(a);case 9:case"end":return t.stop()}}),t)})))()}),[e]);var h=function(){var t=Object(N.a)(M.a.mark((function t(n){return M.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),u(!0),t.next=4,T.create("User:GroupMember",{org:e,group:c.group,member:c.member}).catch((function(){u(!1)}));case 4:u(!1);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"Create Members"})]}),Object(w.jsx)(J.a,{}),e&&Object(w.jsxs)(P.a,{className:"create-request-form",children:[Object(w.jsx)(P.a.Dropdown,{fluid:!0,search:!0,selection:!0,className:"select-request-receiver",placeholder:"Select group",options:[{key:"User",text:"User",value:"User"},{key:"Zoolog",text:"Zoolog",value:"Zoolog"},{key:"Meteorologist",text:"Meteorologist",value:"Meteorologist"},{key:"Hamal",text:"Hamal",value:"Hamal"}],onChange:function(e){return s(Object(v.a)(Object(v.a)({},c),{},{group:e.currentTarget.textContent}))}}),Object(w.jsx)(P.a.Dropdown,{fluid:!0,search:!0,selection:!0,className:"select-request-receiver",placeholder:"Select group",options:b||[],onChange:function(e){return s(Object(v.a)(Object(v.a)({},c),{},{member:e.currentTarget.textContent}))}}),Object(w.jsx)(G.a,{primary:!0,className:"select-request-send-button",onClick:h,loading:l,content:"Send"})]})]})},he=[],me={UserWidget:W,CreateRequest:$,AllRequests:ae,MyRequests:ce,MyApprovedRequests:ie,RequestsForApproval:le,RequestsGraph:function(){var e,t,n=T.party,a=I("user"),r=Object(y.a)(a,2),c=(r[0],r[1],Object(m.useState)()),s=Object(y.a)(c,2),i=s[0],o=s[1],l=Object(m.useRef)();Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function e(){var t;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n?(je=T.querySocket(["User:FlightRequest"],{user:n})).addEventListener("message",(function(e){T.messageHandler(e,be)&&o([].concat(be))})):(null===(t=je)||void 0===t||t.close(),o(null));case 1:case"end":return e.stop()}}),e)})))()}),[n]);var u=[],j=[];return i&&(j=i.map((function(n){var a=n.payload.flight;e=new Date(a.timeStart).toLocaleString(),t=new Date(a.timeEnd).toLocaleString(),u.includes(e)||u.push(e),u.includes(t)||u.push(t);var r=200*Math.random()+55,c=200*Math.random()+55,s=200*Math.random()+55;return{data:[{x:e,y:a.altitude,r:13,backgroundColor:"rgba(".concat(r,", ").concat(c,", ").concat(s,", 1)")},{x:t,y:a.altitude,r:13,backgroundColor:"rgba(".concat(r,", ").concat(c,", ").concat(s,", 1)")}],label:n.payload.user.split("::")[0],borderColor:"rgba(".concat(r,", ").concat(c,", ").concat(s,", 1)"),backgroundColor:"rgba(".concat(r,", ").concat(c,", ").concat(s,", 0.5)"),tension:.1}}))),u.sort((function(e,t){return new Date(e).getTime()-new Date(t).getTime()})),Object(m.useEffect)((function(){var e;return l.current&&(e=new ue.f(l.current,{type:"line",data:{labels:u,datasets:j},options:{responsive:!0,scales:{y:{display:!0,title:{display:!0,text:"altitude"},suggestedMin:0,suggestedMax:2e3}}}})),function(){e&&e.destroy()}}),[j]),Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"Requests Graph"})]}),Object(w.jsx)(J.a,{}),i&&Object(w.jsx)("canvas",{ref:l})]})},Parteis:function(){var e=T.party,t=I("user"),n=Object(y.a)(t,2),a=(n[0],n[1],Object(m.useState)()),r=Object(y.a)(a,2),c=r[0],s=r[1];return Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function t(){var n;return M.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=4;break}s(null),t.next=8;break;case 4:return t.next=6,T.getParteis();case 6:n=t.sent,s(n);case 8:case"end":return t.stop()}}),t)})))()}),[e]),Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"Parteis"})]}),Object(w.jsx)(J.a,{}),Object(w.jsx)(ee.a,{relaxed:!0,className:"items",children:e&&c&&c.map((function(e,t){return Object(w.jsxs)(F.a,{children:[Object(w.jsxs)(ee.a.Item,{children:["Display name: ",Object(w.jsx)("strong",{children:e.displayName})]}),Object(w.jsxs)(ee.a.Item,{children:["Identifier: ",Object(w.jsx)("strong",{children:e.identifier})]}),Object(w.jsxs)(ee.a.Item,{children:["Is local: ",Object(w.jsx)("strong",{children:e.isLocal?"yes":"no"})]})]},e.identifier)}))})]})},CreateMember:pe,Members:function(){var e=T.party,t=I("user"),n=Object(y.a)(t,2),a=(n[0],n[1],Object(m.useState)()),r=Object(y.a)(a,2),c=r[0],s=r[1],i={};return c&&c.forEach((function(e){i[e.payload.group]||(i[e.payload.group]=[]),i[e.payload.group].push(e.payload.member.split("::")[0])})),Object(m.useEffect)((function(){Object(N.a)(M.a.mark((function t(){var n;return M.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e?(de=T.querySocket(["User:GroupMember"])).addEventListener("message",(function(e){T.messageHandler(e,he)&&s([].concat(he))})):(null===(n=de)||void 0===n||n.close(),s(null));case 1:case"end":return t.stop()}}),t)})))()}),[e]),Object(w.jsxs)(F.a,{className:"daml-section",children:[Object(w.jsxs)(H.a,{as:"h2",children:[Object(w.jsx)(z.a,{name:"globe"}),Object(w.jsx)(H.a.Content,{children:"Members"})]}),Object(w.jsx)(J.a,{}),Object(w.jsx)(ee.a,{relaxed:!0,className:"items",children:e&&i&&Object.keys(i).map((function(e){return Object(w.jsxs)(F.a,{children:[Object(w.jsxs)(ee.a.Item,{children:["Group: ",Object(w.jsx)("strong",{children:e})]}),Object(w.jsxs)(ee.a.Item,{children:["Members: ",Object(w.jsx)("strong",{children:i[e].join(", ")})]})]},e)}))})]})}};window.BlocktreeWidgets=function(e,t,n){try{me[e]?c(t,me[e],n):t.innerHTML="Block <strong>".concat(e,"</strong> is empty client component")}catch(a){t.innerHTML="Client component is broken. <br/> ".concat(a)}};var ge=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(j.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"connectedCallback",value:function(){var e=this.getAttribute("name");try{me[e]?c(this,me[e],this.dataset):this.innerHTML="Block <strong>".concat(e,"</strong> is empty client component")}catch(t){this.innerHTML="Client component is broken. <br/> ".concat(t)}}}]),n}(Object(h.a)(HTMLElement));customElements.define("elementree-widget",ge),O.a.render(Object(w.jsx)(S,{children:Object(w.jsx)(C,{})}),document.createElement("div"));var fe=document.getElementById("root");fe&&(fe.innerHTML="\n  <elementree-widget name='UserWidget'></elementree-widget>\n\n  <elementree-widget name='CreateMember'></elementree-widget>\n  <elementree-widget name='Members'></elementree-widget>\n\n  <elementree-widget name='CreateRequest'></elementree-widget>\n  <elementree-widget name='MyRequests'></elementree-widget>\n\n  <elementree-widget name='MyApprovedRequests'></elementree-widget>\n\n  <elementree-widget name='RequestsForApproval'></elementree-widget>\n\n  <elementree-widget name='RequestsGraph'></elementree-widget>\n\n  <elementree-widget name='AllRequests'></elementree-widget>\n\n  <elementree-widget name='Parteis'></elementree-widget>\n")}},[[700,1,2]]]);
//# sourceMappingURL=main.e94cf710.chunk.js.map