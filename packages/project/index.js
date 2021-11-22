#!/usr/bin/env node
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(global,(function(){return(()=>{"use strict";var e={287:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.ALL_TYPES=t.ProjectType=void 0,function(e){e.Web="web",e.Node="node",e.Lib="lib"}(r=t.ProjectType||(t.ProjectType={})),t.ALL_TYPES=[r.Web,r.Node,r.Lib]},245:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(423),a=r(369),c=r(560),u=r(287),s=r(556),l=(0,i.join)(__dirname,"templates");function E(){return n(this,void 0,void 0,(function(){var e,t,n,s;return o(this,(function(o){switch(o.label){case 0:return e=r(650),t=(0,a.cwd)(),n=(0,i.basename)(t),[4,(0,c.readdir)(t)];case 1:return o.sent().every((function(e){return e.startsWith(".")}))?[3,4]:[4,e({type:"text",name:"projectName",message:"Project name",validate:function(e){return e.length>0}})];case 2:if(void 0===(n=o.sent().projectName))throw new Error("Project name is required");return t=(0,i.join)(t,n),[4,(0,c.mkdir)(t)];case 3:o.sent(),o.label=4;case 4:return[4,e({type:"select",name:"projectType",message:"Project type",choices:[{title:"NodeJS",value:u.ProjectType.Node},{title:"Web (React)",value:u.ProjectType.Web},{title:"Lib",value:u.ProjectType.Lib}]})];case 5:if(void 0===(s=o.sent().projectType))throw new Error("Project type is required");return[4,f(t,n,s)];case 6:return o.sent(),[2]}}))}))}function f(e,t,r){return n(this,void 0,void 0,(function(){var a,u,E=this;return o(this,(function(f){switch(f.label){case 0:return console.log(e,t,r),a={PROJECT_NAME:t,PROJECT_TYPE:r,REACT_ROUTER_VERSION:s.REACT_ROUTER_VERSION,REACT_VERSION:s.REACT_VERSION,STYLED_COMPONENTS_TYPES_VERSION:s.STYLED_COMPONENTS_TYPES_VERSION,STYLED_COMPONENTS_VERSION:s.STYLED_COMPONENTS_VERSION,NODE_TYPES_VERSION:s.NODE_TYPES_VERSION},[4,p((0,i.join)(l,r))];case 1:return u=f.sent(),[4,Promise.all(u.map((function(t){return n(E,void 0,void 0,(function(){var n,u,s;return o(this,(function(o){switch(o.label){case 0:return[4,(0,c.readFile)((0,i.join)(l,r,t))];case 1:return n=o.sent(),u=n.toString().replace(/\{\{([^\}]+)\}\}/gu,(function(e,t){var r;return null!==(r=a[t])&&void 0!==r?r:""})),s=(0,i.join)(e,t),[4,(0,c.mkdir)((0,i.dirname)(s),{recursive:!0})];case 2:return o.sent(),[4,(0,c.writeFile)(s,u)];case 3:return o.sent(),[2]}}))}))})))];case 2:return f.sent(),[2]}}))}))}function p(e){return n(this,void 0,void 0,(function(){var t,r=this;return o(this,(function(a){switch(a.label){case 0:return[4,(0,c.readdir)(e)];case 1:return t=a.sent(),[4,Promise.all(t.map((function(t){return n(r,void 0,void 0,(function(){var r,n;return o(this,(function(o){switch(o.label){case 0:return r=(0,i.join)(e,t),[4,(0,c.stat)(r)];case 1:return o.sent().isDirectory()?[4,p(r)]:[3,3];case 2:return n=o.sent().map((function(e){return(0,i.join)(t,e)})),[3,4];case 3:n=t,o.label=4;case 4:return[2,n]}}))}))})))];case 2:return[2,a.sent().flat()]}}))}))}t.default=E,E().catch(console.error)},556:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NODE_TYPES_VERSION=t.STYLED_COMPONENTS_VERSION=t.STYLED_COMPONENTS_TYPES_VERSION=t.REACT_ROUTER_VERSION=t.REACT_VERSION=t.TYPESCRIPT_VERSION=t.PRETTIER_VERSION=t.ESLINT_VERSION=t.PACKAGE_VERSIONS=void 0,t.PACKAGE_VERSIONS={project:"1.0.12",eslint:"1.0.16",prettier:"1.0.1",tsconfig:"1.0.5",webpack:"1.0.11"},t.ESLINT_VERSION="8.3.x",t.PRETTIER_VERSION="2.4.x",t.TYPESCRIPT_VERSION="4.5.x",t.REACT_VERSION="17.0.x",t.REACT_ROUTER_VERSION="5.2.x",t.STYLED_COMPONENTS_TYPES_VERSION="5.1.x",t.STYLED_COMPONENTS_VERSION="5.1.x",t.NODE_TYPES_VERSION="16.11.x"},560:e=>{e.exports=require("fs/promises")},423:e=>{e.exports=require("path")},369:e=>{e.exports=require("process")},650:e=>{e.exports=require("prompts")}},t={},r=function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}(245);return r.default})()}));