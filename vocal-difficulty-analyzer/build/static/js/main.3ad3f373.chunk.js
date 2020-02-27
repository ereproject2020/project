(this["webpackJsonpvocal-difficulty-analyzer"]=this["webpackJsonpvocal-difficulty-analyzer"]||[]).push([[0],{23:function(e,t,n){e.exports=n.p+"static/media/reset.a6b1cf7a.svg"},24:function(e,t,n){e.exports=n(49)},29:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(21),o=n.n(s),i=(n(29),n(1)),c=n(2),u=n(4),l=n(3),d=n(5),p=n(7),m=n.n(p),f=n(8),h=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){console.log("Criteria");return r.a.createElement("div",{style:{border:"1px solid black",pfadding:"8px",margin:"8px"}},"difficulty Criteria")}}]),t}(a.Component),g=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){console.log("Guide");return r.a.createElement("div",{style:{border:"1px solid black",padding:"8px",margin:"8px"}},"This extension is to help users to calibrate vocal difficulty")}}]),t}(a.Component),v=Object(a.createContext)(),b=v.Provider,x=v.Consumer,I=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={userInfo:{userId:"",name:"",image:""},songInfo:[],comment:[{userId:"Nan",text:"",starsIdx:6,starsRating:2}],difficulty:0},n.actions={setUserInfo:function(e){n.setState({userInfo:e})},setSongInfo:function(e){n.setState({songInfo:n.state.songInfo.concat(e[0])})},setComment:function(e){n.setState({comment:[].concat(e)})}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e={state:this.state,actions:this.actions};return r.a.createElement(b,{value:e},this.props.children)}}]),t}(a.Component);function y(e){return function(t){return r.a.createElement(x,null,(function(n){var a=n.state,s=n.actions;return r.a.createElement(e,Object.assign({},t,{userInfo:a.userInfo,songInfo:a.songInfo,comment:a.comment,difficulty:a.difficulty,setId:s.setId,setSongInfo:s.setSongInfo,setComment:s.setComment,setUserInfo:s.setUserInfo}))}))}}var O=n(6),j=n.n(O);j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var C=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={loading:!0,difficulty:0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"getDifficulty",value:function(){j.a.get("/api/comment/",{params:{song:this.props.songInfo.id}}).then(function(e){var t=0;for(var n in e.data)t=t+e.data[n].starsIdx+e.data[n].starsRating;this.setState({difficulty:(t/e.data.length).toFixed(2)})}.bind(this)).then(this.setState({loading:!1})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this.props.songInfo;return console.log(e),0==this.state.loading?r.a.createElement("div",null,"\ub178\ub798\uc81c\ubaa9: ",e.title,"   \uac00\uc218: ",e.singer,"  \ub09c\uc774\ub3c4:",this.state.difficulty):(this.getDifficulty(),r.a.createElement("div",null,"loading.."))}}]),t}(a.Component);j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var k=y(function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).chooseSong=function(){var e=Object(f.a)(m.a.mark((function e(t){var a,r,s,o,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.props,r=a.setSongInfo,s=a.setComment,o=a.onMode,i=n.props.songList.filter((function(e){return e.id===parseInt(t.target.id)})),console.log(i),r(i),console.log(n.props.songInfo),e.next=7,j.a.get("/api/comment/",{params:{song:t.target.id}}).then((function(e){s(e.data)})).then(o());case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t={border:"1px solid black",padding:"8px",margin:"8px"},n=this.props.songList.map((function(n){return r.a.createElement("div",{key:n.id,style:t},r.a.createElement(C,{songInfo:n,difficulty:e.props.difficulty,comment:e.props.comment}),r.a.createElement("button",{id:n.id,onClick:e.chooseSong},"\ud3c9\uac00"))}));return r.a.createElement("div",null,n)}}]),t}(a.Component)),E=n(22);j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var S=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={mode:"default",title:"",singer:""},n.handleMode=function(){n.props.onMode("result")},n.createSong=function(){n.setState({mode:"create"})},n.handleChange=function(e){var t=e.target,a=t.name;n.setState(Object(E.a)({},a,t.value))},n.handleSubmit=function(){var e=Object(f.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,j.a.post("/api/song/",{title:n.state.title,singer:n.state.singer});case 3:n.props.onMode(n.state.title);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return"default"===this.state.mode?r.a.createElement("div",null,r.a.createElement("div",null,"\ucc3e\uc73c\uc2dc\ub294 \ub178\ub798\uac00 \uc5c6\ub098\uc694?"),r.a.createElement("button",{onClick:this.createSong},"\ub2e4\ub978 \uc0ac\uc6a9\uc790\ub97c \uc704\ud574 \ub178\ub798 \uc815\ubcf4\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694"),r.a.createElement("button",{type:"button",onClick:this.handleMode},"\ub4a4\ub85c")):"create"===this.state.mode?r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{name:"title",type:"text",placeholder:"\uc81c\ubaa9",onChange:this.handleChange,value:this.state.title}),r.a.createElement("input",{name:"singer",type:"text",placeholder:"\uac00\uc218",onChange:this.handleChange,value:this.state.singer}),r.a.createElement("button",{type:"submit"},"\ub178\ub798 \uc815\ubcf4 \uc81c\ucd9c"))):void 0}}]),t}(a.Component);j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var w=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,s=new Array(a),o=0;o<a;o++)s[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).state={songname:"",rawsongname:"",show:"",songList:[{}]},n.showContent=function(){var e=n.state.show;return"criteria"===e?r.a.createElement(h,null):"guide"===e?r.a.createElement(g,null):"list"===e?r.a.createElement("div",null,r.a.createElement(k,{onMode:n.modeUpdate,songList:n.state.songList}),r.a.createElement(S,{onMode:n.backToSearch})):"create"===e?r.a.createElement(S,{onMode:n.backToSearch}):r.a.createElement("div",null)},n.backToSearch=function(){var e=Object(f.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get("/api/song/",{params:{title:t}}).then((function(e){return n.setState({show:"list",songList:e.data})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.modeUpdate=function(){n.props.onMode("result")},n.handleChange=function(e){e.preventDefault();var t=e.target.value,a=t.toLowerCase().replace(/(\s*)/g,"");n.setState({rawsongname:t,songname:a})},n.handleSubmit=function(){var e=Object(f.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,j.a.get("/api/song/",{params:{title:n.state.songname}}).then((function(e){return n.setState({songList:e.data})}));case 3:0===n.state.songList.length?n.setState({show:"create"}):n.setState({show:"list"});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.handleshowCri=function(){n.setState({show:"criteria"})},n.handleshowGui=function(){n.setState({show:"guide"})},n.handleshowSrch=function(){n.setState({show:"list"})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{name:"rawsongname",placeholder:"\ub178\ub798 \uc81c\ubaa9\uc744 \uc785\ub825\ud558\uc138\uc694",onChange:this.handleChange,value:this.state.rawsongname}),r.a.createElement("button",{type:"submit"},"search")),r.a.createElement("button",{type:"submit",onClick:this.handleshowGui},"\ub3c4\uc6c0\ub9d0"),r.a.createElement("button",{type:"submit",onClick:this.handleshowCri},"\ub09c\uc774\ub3c4"),this.showContent())}}]),t}(a.Component),R=n(10),M=n(23),N=n.n(M),_=(n(48),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e)))._modeSetting=function(){if(n.state.update)return r.a.createElement("div",{className:"reset__btn"},r.a.createElement("img",{src:N.a,alt:"reset",onClick:function(e){n._resetRating(e)}}))},n.state={update:n.props.update},n._resetRating=n._resetRating.bind(Object(R.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.update!==e.update&&this.setState({update:this.props.update})}},{key:"_resetRating",value:function(e){"mouseleave"===e.type||"onTouchEnd"===e.type?this.props.onChange(this.props.starsIdx,this.props.starsRating):"click"===e.type&&this.props.onChange(0,0)}},{key:"_makeStars",value:function(){for(var e=this,t=[],n=function(n){var a="star__rate";0!==e.props.rating?n<=e.props.idx&&(e.props.idx===n&&e.props.rating%2!==0?a+=" is-half-selected":a+=" is-selected"):0!==e.props.starsRating&&n<=e.props.starsIdx&&(e.props.starsIdx===n&&e.props.starsRating%2!==0?a+=" is-half-selected":a+=" is-selected"),e.state.update?t.push(r.a.createElement("label",{key:n,className:a,onClick:function(){e.props.onChange(e.props.idx,e.props.rating)},onMouseOver:function(t){e.props._mouseOver(t,n)},onMouseMove:function(t){e.props._mouseOver(t,n)},onMouseLeave:function(t){e._resetRating(t)},onTouchMove:function(t){e.props._mouseOver(t,n)},onTouchStart:function(t){e.props._mouseOver(t,n)},onTouchEnd:function(t){e._resetRating(t)}})):t.push(r.a.createElement("label",{key:n,className:a}))},a=0;a<10;a+=2)n(a);return t}},{key:"render",value:function(){return r.a.createElement("div",{className:"starRate__wrap"},this._makeStars(),this._modeSetting())}}]),t}(a.Component)),U=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={idx:0,rating:0,starsIdx:n.props.starsIdx,starsRating:n.props.starsRating},n._mouseOver=function(e,t){if(e.persist(),e.nativeEvent.offsetX>e.target.clientWidth/2){n.setState({idx:t,rating:2})}else{n.setState({idx:t,rating:1})}},n.handleChange=function(e,t){n.setState({idx:0,rating:0,starsIdx:e,starsRating:t}),n.props.starUpdate(n.state)},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(_,{_mouseOver:this._mouseOver,onChange:this.handleChange,idx:this.state.idx,rating:this.state.rating,starsIdx:this.state.starsIdx,starsRating:this.state.starsRating,update:this.props.update})}}]),t}(a.Component);U.defaultProp={starsIdx:0,starsRating:0};var T=U;j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var L=y(function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={update:!1,text:"",starsIdx:n.props.info.starsIdx,starsRating:n.props.info.starsRating},n.authorized=!1,n.handleUpdate=Object(f.a)(m.a.mark((function e(){var t,a,r,s,o,i,c,u,l;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.state,a=t.update,r=t.text,s=t.starsIdx,o=t.starsRating,i=n.props,c=i.info,u=i.comment,l=i.setComment,!a){e.next=8;break}return l(u.map((function(e){return c.id===e.id?{id:n.props.info.id,text:r,starsIdx:s,starsRating:o,userId:c.userId,userName:c.userName,userImage:c.userImage,song:n.props.songInfo[0].id}:e}))),e.next=6,j.a.put("/api/comment/".concat(n.props.info.id,"/"),{id:n.props.info.id,text:r,starsIdx:s,starsRating:o,userId:c.userId,userName:c.userName,userImage:c.userImage,song:n.props.songInfo[0].id}).then().catch((function(e){return console.log(e.message)}));case 6:e.next=9;break;case 8:n.setState({text:c.text});case 9:n.setState({update:!a});case 10:case"end":return e.stop()}}),e)}))),n.handleRemove=Object(f.a)(m.a.mark((function e(){var t,a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.props,a=t.setComment,r=t.comment,e.next=3,j.a.delete("/api/comment/".concat(n.props.info.id));case 3:a(r.filter((function(e){return e.id!==n.props.info.id})));case 4:case"end":return e.stop()}}),e)}))),n.handleChange=function(e){n.setState({text:e.target.value})},n.handleUpdateStar=function(e){n.setState({starsIdx:e.starsIdx,starsRating:e.starsRating})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){console.log(this.props.info);var e=this.state.update;this.props.info.userId===this.props.userInfo.userId&&(this.authorized=!0,console.log("here"));return r.a.createElement("div",{style:{border:"1px solid black",padding:"8px",margin:"8px"}},e?r.a.createElement("div",null,r.a.createElement("input",{name:"text",onChange:this.handleChange,value:this.state.text})):r.a.createElement("div",null,this.props.info.text),r.a.createElement(T,{starsIdx:this.state.starsIdx,starsRating:this.state.starsRating,update:this.state.update,starUpdate:this.handleUpdateStar})," ",this.state.starsIdx+this.state.starsRating,"/10",this.authorized?r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:this.handleUpdate},e?"\uc785\ub825":"\uc218\uc815"),r.a.createElement("button",{type:"submit",onClick:this.handleRemove},"\uc0ad\uc81c")):r.a.createElement("div",null))}}]),t}(a.Component)),A=y(function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={index:0},n.moreReview=function(){n.setState({index:n.state.index+5})},n.pastReview=function(){n.setState({index:n.state.index-5})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.comment.map(function(e,t,n){if(t>n.length-this.state.index-5&&t<n.length-this.state.index)return r.a.createElement("div",{key:t},r.a.createElement(L,{info:e,setComment:this.props.setComment}))}.bind(this));return r.a.createElement("div",null,r.a.createElement("div",null,e),r.a.createElement("button",{type:"submit",onClick:this.moreReview},"more review"),r.a.createElement("button",{type:"submit",onClick:this.pastReview},"past review"))}}]),t}(a.Component)),F=n(11),X=n.n(F);j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var D=y(function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).responseGoogle=function(){var e=Object(f.a)(m.a.mark((function e(t){var a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.props,r=a.userInfo,(0,a.setUserInfo)({userId:t.googleId,name:t.profileObj.name,image:t.profileObj.imageUrl}),0!==r.userId&&n.props.onModeComment();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.responseFail=function(e){console.error(e)},n.responseLogout=function(){var e=n.props.setUserInfo;alert("\ub85c\uadf8\uc544\uc6c3 \ub418\uc5c8\uc2b5\ub2c8\ub2e4."),e({userId:"",name:"",image:""}),console.log("logout")},n.showButton=function(){return n.props.userInfo.userId?r.a.createElement("div",null,r.a.createElement(F.GoogleLogout,{clientId:"759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:n.responseLogout}),r.a.createElement("button",{onClick:n.props.onModeComment}," \uc758\uacac \ub0a8\uae30\uae30")):r.a.createElement("div",null,r.a.createElement(X.a,{clientId:"759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com",buttonText:"\uc758\uacac \ub0a8\uae30\uae30",onSuccess:n.responseGoogle,onFailure:n.responseFail,cookiePolicy:"single_host_origin"}))},n.state={id:"",name:"",image:""},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return console.log(this.props.userInfo),r.a.createElement("div",null,this.showButton())}}]),t}(r.a.Component)),H=y(function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={},n.onModeComment=function(){n.props.onMode("comment")},n.onModeSearch=function(){n.props.onMode("search")},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.songInfo;return r.a.createElement("div",null,r.a.createElement(C,{songInfo:e[0]}),r.a.createElement("div",null,"\ucd1d ",this.props.comment.length,"\uba85\uc774 \ud3c9\uac00\ud558\uc600\uc2b5\ub2c8\ub2e4."),r.a.createElement(A,{difficultyUpdate:this.difficultyUpdate}),r.a.createElement(D,{onModeComment:this.onModeComment}),r.a.createElement("button",{type:"button",onClick:this.onModeSearch}," \ub4a4\ub85c "))}}]),t}(a.Component));j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var G=y(function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={userId:n.props.userInfo.userId,userName:n.props.userInfo.name,userImage:n.props.userInfo.image,song:n.props.songInfo[0].title,text:"",starsIdx:"",starsRating:""},n.handleMode=function(){n.props.onMode("result")},n.handleChange=function(e){n.setState({text:e.target.value})},n.handleUpdateStar=function(e){n.setState({starsIdx:e.starsIdx,starsRating:e.starsRating})},n.handleSubmit=function(){var e=Object(f.a)(m.a.mark((function e(t){var a,r,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.props,r=a.setComment,s=a.comment,t.preventDefault(),e.next=4,j.a.post("/api/comment/",{song:n.props.songInfo[0].id,text:n.state.text,starsIdx:n.state.starsIdx,starsRating:n.state.starsRating,userId:n.state.userId,userName:n.state.userName,userImage:n.state.userImage}).then((function(e){r(s.concat({id:e.data.id,song:n.props.songInfo[0].id,text:n.state.text,starsIdx:n.state.starsIdx,starsRating:n.state.starsRating,userId:n.state.userId,userName:n.state.userName,userImage:n.state.userImage})),console.log(e.data)}));case 4:n.handleMode();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(C,{songInfo:this.props.songInfo[0]}),r.a.createElement("div",null,"\ucd1d ",this.props.comment.length,"\uba85\uc774 \ud3c9\uac00\ud558\uc600\uc2b5\ub2c8\ub2e4."),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("img",{src:this.state.userImage,alt:"\uc0ac\uc6a9\uc790 \uc774\ubbf8\uc9c0"}),r.a.createElement("input",{name:"text",placeholder:"\uc774\uacf3\uc5d0 \uc758\uacac\uc744 \ub0a8\uaca8\uc8fc\uc138\uc694",onChange:this.handleChange,value:this.state.text}),r.a.createElement("button",{type:"submit"},"\ub313\uae00 \uc785\ub825"),r.a.createElement("div",null,"\ub2f9\uc2e0\uc774 \ud3c9\uac00\ud55c \ub09c\uc774\ub3c4\ub294?",r.a.createElement(T,{update:!0,starUpdate:this.handleUpdateStar}),this.state.starsIdx+this.state.starsRating,"/10")),r.a.createElement("button",{type:"button",onClick:this.handleMode},"\ub4a4\ub85c"))}}]),t}(a.Component)),z=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,s=new Array(a),o=0;o<a;o++)s[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).state={mode:""},n.handleMode=function(e){n.setState({mode:e})},n.chooseContent=function(){var e=n.state.mode;return"result"===e?r.a.createElement(H,{onMode:n.handleMode}):"comment"===e?r.a.createElement(G,{onMode:n.handleMode}):r.a.createElement(w,{onMode:n.handleMode})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return console.log("app"),console.log(this.state.mode),r.a.createElement(I,null,this.chooseContent())}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.3ad3f373.chunk.js.map