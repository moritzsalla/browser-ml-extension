parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ggYy":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,e){this.address=t,this.protocol=e?"https":"http"}return t.prototype.setColor=function(t,e,o){console.log("setting sensehat color");var s=new XMLHttpRequest;s.open("GET",this.protocol+"://"+this.address+"/color?r="+t+"&g="+e+"&b="+o),s.send()},t.prototype.clear=function(){console.log("clearing sensehat");var t=new XMLHttpRequest;t.open("GET",this.protocol+"://"+this.address+"/clear"),t.send()},t.prototype.test=function(){console.log("running sensehat tests");var t=new XMLHttpRequest;t.open("GET",this.protocol+"://"+this.address+"/test"),t.send()},t}();exports.default=t;
},{}],"shBX":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("../background/sensehat")),o=new t.default("192.168.0.24",!0);setInterval(function(){chrome.storage.local.get(["key"],function(e){if(e.key.constructor===Array){var t=e.key[e.key.length-1];o.setColor(255*t,255*t,255*t),console.log(t+" was received by background script")}else console.log("no data received by background script")})},400),chrome.runtime.onInstalled.addListener(function(){chrome.declarativeContent.onPageChanged.removeRules(void 0,function(){chrome.declarativeContent.onPageChanged.addRules([{conditions:[new chrome.declarativeContent.PageStateMatcher({pageUrl:{schemes:["http","https"]}})],actions:[new chrome.declarativeContent.ShowPageAction]}])})});
},{"../background/sensehat":"ggYy"}]},{},["shBX"], null)
//# sourceMappingURL=/background/background.js.map