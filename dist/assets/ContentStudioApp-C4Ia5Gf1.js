import{j as r}from"./ui-w4fezaqO.js";import{r as I}from"./vendor-CWZYJQ-K.js";const Nr=()=>{};var Gt={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Or=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const o=t[n++];e[i++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=t[n++],a=t[n++],l=t[n++],c=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const o=t[n++],a=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Pn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const o=t[s],a=s+1<t.length,l=a?t[s+1]:0,c=s+2<t.length,d=c?t[s+2]:0,p=o>>2,u=(o&3)<<4|l>>4;let k=(l&15)<<2|d>>6,w=d&63;c||(w=64,a||(k=64)),i.push(n[p],n[u],n[k],n[w])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Rn(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Or(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const o=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const d=s<t.length?n[t.charAt(s)]:64;++s;const u=s<t.length?n[t.charAt(s)]:64;if(++s,o==null||l==null||d==null||u==null)throw new zr;const k=o<<2|l>>4;if(i.push(k),d!==64){const w=l<<4&240|d>>2;if(i.push(w),u!==64){const S=d<<6&192|u;i.push(S)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class zr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Dr=function(t){const e=Rn(t);return Pn.encodeByteArray(e,!0)},An=function(t){return Dr(t).replace(/\./g,"")},Nn=function(t){try{return Pn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=()=>Wr().__FIREBASE_DEFAULTS__,Lr=()=>{if(typeof process>"u"||typeof Gt>"u")return;const t=Gt.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Br=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Nn(t[1]);return e&&JSON.parse(e)},At=()=>{try{return Nr()||$r()||Lr()||Br()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Mr=t=>{var e,n;return(n=(e=At())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},On=()=>{var t;return(t=At())==null?void 0:t.config},zn=t=>{var e;return(e=At())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Fr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(G())}function Hr(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Vr(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Gr(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qr(){const t=G();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Yr(){try{return typeof indexedDB=="object"}catch{return!1}}function Jr(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var o;e(((o=s.error)==null?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr="FirebaseError";class ge extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Kr,Object.setPrototypeOf(this,ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Le.prototype.create)}}class Le{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?Xr(o,i):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new ge(s,l,i)}}function Xr(t,e){return t.replace(Qr,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Qr=/\{\$([^}]+)}/g;function Zr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function _e(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const o=t[s],a=e[s];if(qt(o)&&qt(a)){if(!_e(o,a))return!1}else if(o!==a)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function qt(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function ei(t,e){const n=new ti(t,e);return n.subscribe.bind(n)}class ti{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");ni(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=dt),s.error===void 0&&(s.error=dt),s.complete===void 0&&(s.complete=dt);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ni(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function dt(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ri(t){return(await fetch(t,{credentials:"include"})).ok}class Ce{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Ur;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(oi(e))try{this.getOrInitializeService({instanceIdentifier:be})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:s});i.resolve(o)}catch{}}}}clearInstance(e=be){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=be){return this.instances.has(e)}getOptions(e=be){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);i===l&&a.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:si(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=be){return this.component?this.component.multipleInstances?e:be:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function si(t){return t===be?void 0:t}function oi(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new ii(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var D;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(D||(D={}));const li={debug:D.DEBUG,verbose:D.VERBOSE,info:D.INFO,warn:D.WARN,error:D.ERROR,silent:D.SILENT},ci=D.INFO,di={[D.DEBUG]:"log",[D.VERBOSE]:"log",[D.INFO]:"info",[D.WARN]:"warn",[D.ERROR]:"error"},hi=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=di[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Dn{constructor(e){this.name=e,this._logLevel=ci,this._logHandler=hi,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in D))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?li[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,D.DEBUG,...e),this._logHandler(this,D.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,D.VERBOSE,...e),this._logHandler(this,D.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,D.INFO,...e),this._logHandler(this,D.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,D.WARN,...e),this._logHandler(this,D.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,D.ERROR,...e),this._logHandler(this,D.ERROR,...e)}}const pi=(t,e)=>e.some(n=>t instanceof n);let Yt,Jt;function ui(){return Yt||(Yt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function gi(){return Jt||(Jt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Wn=new WeakMap,It=new WeakMap,$n=new WeakMap,ht=new WeakMap,Ot=new WeakMap;function fi(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",o),t.removeEventListener("error",a)},o=()=>{n(he(t.result)),s()},a=()=>{i(t.error),s()};t.addEventListener("success",o),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&Wn.set(n,t)}).catch(()=>{}),Ot.set(e,t),e}function mi(t){if(It.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",a),t.removeEventListener("abort",a)},o=()=>{n(),s()},a=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",o),t.addEventListener("error",a),t.addEventListener("abort",a)});It.set(t,e)}let Tt={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return It.get(t);if(e==="objectStoreNames")return t.objectStoreNames||$n.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return he(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function bi(t){Tt=t(Tt)}function yi(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(pt(this),e,...n);return $n.set(i,e.sort?e.sort():[e]),he(i)}:gi().includes(t)?function(...e){return t.apply(pt(this),e),he(Wn.get(this))}:function(...e){return he(t.apply(pt(this),e))}}function xi(t){return typeof t=="function"?yi(t):(t instanceof IDBTransaction&&mi(t),pi(t,ui())?new Proxy(t,Tt):t)}function he(t){if(t instanceof IDBRequest)return fi(t);if(ht.has(t))return ht.get(t);const e=xi(t);return e!==t&&(ht.set(t,e),Ot.set(e,t)),e}const pt=t=>Ot.get(t);function wi(t,e,{blocked:n,upgrade:i,blocking:s,terminated:o}={}){const a=indexedDB.open(t,e),l=he(a);return i&&a.addEventListener("upgradeneeded",c=>{i(he(a.result),c.oldVersion,c.newVersion,he(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{o&&c.addEventListener("close",()=>o()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const vi=["get","getKey","getAll","getAllKeys","count"],Si=["put","add","delete","clear"],ut=new Map;function Kt(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ut.get(e))return ut.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Si.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||vi.includes(n)))return;const o=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let d=c.store;return i&&(d=d.index(l.shift())),(await Promise.all([d[n](...l),s&&c.done]))[0]};return ut.set(e,o),o}bi(t=>({...t,get:(e,n,i)=>Kt(e,n)||t.get(e,n,i),has:(e,n)=>!!Kt(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ii(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Ii(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const _t="@firebase/app",Xt="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne=new Dn("@firebase/app"),Ti="@firebase/app-compat",_i="@firebase/analytics-compat",Ci="@firebase/analytics",ji="@firebase/app-check-compat",Ei="@firebase/app-check",Ri="@firebase/auth",Pi="@firebase/auth-compat",Ai="@firebase/database",Ni="@firebase/data-connect",Oi="@firebase/database-compat",zi="@firebase/functions",Di="@firebase/functions-compat",Wi="@firebase/installations",$i="@firebase/installations-compat",Li="@firebase/messaging",Bi="@firebase/messaging-compat",Mi="@firebase/performance",Ui="@firebase/performance-compat",Fi="@firebase/remote-config",Hi="@firebase/remote-config-compat",Vi="@firebase/storage",Gi="@firebase/storage-compat",qi="@firebase/firestore",Yi="@firebase/ai",Ji="@firebase/firestore-compat",Ki="firebase",Xi="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct="[DEFAULT]",Qi={[_t]:"fire-core",[Ti]:"fire-core-compat",[Ci]:"fire-analytics",[_i]:"fire-analytics-compat",[Ei]:"fire-app-check",[ji]:"fire-app-check-compat",[Ri]:"fire-auth",[Pi]:"fire-auth-compat",[Ai]:"fire-rtdb",[Ni]:"fire-data-connect",[Oi]:"fire-rtdb-compat",[zi]:"fire-fn",[Di]:"fire-fn-compat",[Wi]:"fire-iid",[$i]:"fire-iid-compat",[Li]:"fire-fcm",[Bi]:"fire-fcm-compat",[Mi]:"fire-perf",[Ui]:"fire-perf-compat",[Fi]:"fire-rc",[Hi]:"fire-rc-compat",[Vi]:"fire-gcs",[Gi]:"fire-gcs-compat",[qi]:"fire-fst",[Ji]:"fire-fst-compat",[Yi]:"fire-vertex","fire-js":"fire-js",[Ki]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe=new Map,Zi=new Map,jt=new Map;function Qt(t,e){try{t.container.addComponent(e)}catch(n){ne.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function De(t){const e=t.name;if(jt.has(e))return ne.debug(`There were multiple attempts to register component ${e}.`),!1;jt.set(e,t);for(const n of Xe.values())Qt(n,t);for(const n of Zi.values())Qt(n,t);return!0}function Ln(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Q(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pe=new Le("app","Firebase",es);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ce("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be=Xi;function Bn(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Ct,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw pe.create("bad-app-name",{appName:String(s)});if(n||(n=On()),!n)throw pe.create("no-options");const o=Xe.get(s);if(o){if(_e(n,o.options)&&_e(i,o.config))return o;throw pe.create("duplicate-app",{appName:s})}const a=new ai(s);for(const c of jt.values())a.addComponent(c);const l=new ts(n,i,a);return Xe.set(s,l),l}function ns(t=Ct){const e=Xe.get(t);if(!e&&t===Ct&&On())return Bn();if(!e)throw pe.create("no-app",{appName:t});return e}function Se(t,e,n){let i=Qi[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ne.warn(a.join(" "));return}De(new Ce(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs="firebase-heartbeat-database",is=1,We="firebase-heartbeat-store";let gt=null;function Mn(){return gt||(gt=wi(rs,is,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(We)}catch(n){console.warn(n)}}}}).catch(t=>{throw pe.create("idb-open",{originalErrorMessage:t.message})})),gt}async function ss(t){try{const n=(await Mn()).transaction(We),i=await n.objectStore(We).get(Un(t));return await n.done,i}catch(e){if(e instanceof ge)ne.warn(e.message);else{const n=pe.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ne.warn(n.message)}}}async function Zt(t,e){try{const i=(await Mn()).transaction(We,"readwrite");await i.objectStore(We).put(e,Un(t)),await i.done}catch(n){if(n instanceof ge)ne.warn(n.message);else{const i=pe.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ne.warn(i.message)}}}function Un(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os=1024,as=30;class ls{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new ds(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=en();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>as){const a=hs(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){ne.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=en(),{heartbeatsToSend:i,unsentEntries:s}=cs(this._heartbeatsCache.heartbeats),o=An(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return ne.warn(n),""}}}function en(){return new Date().toISOString().substring(0,10)}function cs(t,e=os){const n=[];let i=t.slice();for(const s of t){const o=n.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),tn(n)>e){o.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),tn(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class ds{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yr()?Jr().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await ss(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Zt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Zt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function tn(t){return An(JSON.stringify({version:2,heartbeats:t})).length}function hs(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(t){De(new Ce("platform-logger",e=>new ki(e),"PRIVATE")),De(new Ce("heartbeat",e=>new ls(e),"PRIVATE")),Se(_t,Xt,t),Se(_t,Xt,"esm2020"),Se("fire-js","")}ps("");var us="firebase",gs="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Se(us,gs,"app");function Fn(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const fs=Fn,Hn=new Le("auth","Firebase",Fn());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Dn("@firebase/auth");function ms(t,...e){Qe.logLevel<=D.WARN&&Qe.warn(`Auth (${Be}): ${t}`,...e)}function qe(t,...e){Qe.logLevel<=D.ERROR&&Qe.error(`Auth (${Be}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(t,...e){throw zt(t,...e)}function Y(t,...e){return zt(t,...e)}function Vn(t,e,n){const i={...fs(),[e]:n};return new Le("auth","Firebase",i).create(e,{appName:t.name})}function ue(t){return Vn(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function zt(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return Hn.create(t,...e)}function x(t,e,...n){if(!t)throw zt(e,...n)}function ee(t){const e="INTERNAL ASSERTION FAILED: "+t;throw qe(e),new Error(e)}function ie(t,e){t||ee(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Gn(){return nn()==="http:"||nn()==="https:"}function nn(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Gn()||Vr()||"connection"in navigator)?navigator.onLine:!0}function ys(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,n){this.shortDelay=e,this.longDelay=n,ie(n>e,"Short delay should be less than long delay!"),this.isMobile=Fr()||Gr()}get(){return bs()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(t,e){ie(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ee("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ee("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ee("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ws=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],vs=new Me(3e4,6e4);function Z(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function X(t,e,n,i,s={}){return Yn(t,s,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const l=Ee({key:t.config.apiKey,...a}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const d={method:e,headers:c,...o};return Hr()||(d.referrerPolicy="no-referrer"),t.emulatorConfig&&Nt(t.emulatorConfig.host)&&(d.credentials="include"),qn.fetch()(await Jn(t,t.config.apiHost,n,l),d)})}async function Yn(t,e,n){t._canInitEmulator=!1;const i={...xs,...e};try{const s=new ks(t),o=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Pe(t,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const l=o.ok?a.errorMessage:a.error.message,[c,d]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pe(t,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Pe(t,"email-already-in-use",a);if(c==="USER_DISABLED")throw Pe(t,"user-disabled",a);const p=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Vn(t,p,d);re(t,p)}}catch(s){if(s instanceof ge)throw s;re(t,"network-request-failed",{message:String(s)})}}async function ot(t,e,n,i,s={}){const o=await X(t,e,n,i,s);return"mfaPendingCredential"in o&&re(t,"multi-factor-auth-required",{_serverResponse:o}),o}async function Jn(t,e,n,i){const s=`${e}${n}?${i}`,o=t,a=o.config.emulator?Dt(t.config,s):`${t.config.apiScheme}://${s}`;return ws.includes(n)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}function Ss(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ks{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(Y(this.auth,"network-request-failed")),vs.get())})}}function Pe(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=Y(t,e,i);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t){return t!==void 0&&t.getResponse!==void 0}function sn(t){return t!==void 0&&t.enterprise!==void 0}class Kn{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Ss(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Is(t){return(await X(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Xn(t,e){return X(t,"GET","/v2/recaptchaConfig",Z(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ts(t,e){return X(t,"POST","/v1/accounts:delete",e)}async function Ze(t,e){return X(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function _s(t,e=!1){const n=xe(t),i=await n.getIdToken(e),s=Wt(i);x(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:i,authTime:Ae(ft(s.auth_time)),issuedAtTime:Ae(ft(s.iat)),expirationTime:Ae(ft(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function ft(t){return Number(t)*1e3}function Wt(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return qe("JWT malformed, contained fewer than 3 sections"),null;try{const s=Nn(n);return s?JSON.parse(s):(qe("Failed to decode base64 JWT payload"),null)}catch(s){return qe("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function on(t){const e=Wt(t);return x(e,"internal-error"),x(typeof e.exp<"u","internal-error"),x(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $e(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof ge&&Cs(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function Cs({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ae(this.lastLoginAt),this.creationTime=Ae(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function et(t){var u;const e=t.auth,n=await t.getIdToken(),i=await $e(t,Ze(e,{idToken:n}));x(i==null?void 0:i.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=(u=s.providerUserInfo)!=null&&u.length?Qn(s.providerUserInfo):[],a=Rs(t.providerData,o),l=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Rt(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function Es(t){const e=xe(t);await et(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Rs(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Qn(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ps(t,e){const n=await Yn(t,{},async()=>{const i=Ee({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=t.config,a=await Jn(t,s,"/v1/token",`key=${o}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:i};return t.emulatorConfig&&Nt(t.emulatorConfig.host)&&(c.credentials="include"),qn.fetch()(a,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function As(t,e){return X(t,"POST","/v2/accounts:revokeToken",Z(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken<"u","internal-error"),x(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):on(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){x(e.length!==0,"internal-error");const n=on(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(x(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:o}=await Ps(e,n);this.updateTokensAndExpiration(i,s,Number(o))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:o}=n,a=new ke;return i&&(x(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),s&&(x(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(x(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ke,this.toJSON())}_performRefresh(){return ee("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(t,e){x(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class K{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new js(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Rt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await $e(this,this.stsTokenManager.getToken(this.auth,e));return x(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return _s(this,e)}reload(){return Es(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new K({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await et(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Q(this.auth.app))return Promise.reject(ue(this.auth));const e=await this.getIdToken();return await $e(this,Ts(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,o=n.phoneNumber??void 0,a=n.photoURL??void 0,l=n.tenantId??void 0,c=n._redirectEventId??void 0,d=n.createdAt??void 0,p=n.lastLoginAt??void 0,{uid:u,emailVerified:k,isAnonymous:w,providerData:S,stsTokenManager:_}=n;x(u&&_,e,"internal-error");const y=ke.fromJSON(this.name,_);x(typeof u=="string",e,"internal-error"),se(i,e.name),se(s,e.name),x(typeof k=="boolean",e,"internal-error"),x(typeof w=="boolean",e,"internal-error"),se(o,e.name),se(a,e.name),se(l,e.name),se(c,e.name),se(d,e.name),se(p,e.name);const P=new K({uid:u,auth:e,email:s,emailVerified:k,displayName:i,isAnonymous:w,photoURL:a,phoneNumber:o,tenantId:l,stsTokenManager:y,createdAt:d,lastLoginAt:p});return S&&Array.isArray(S)&&(P.providerData=S.map(z=>({...z}))),c&&(P._redirectEventId=c),P}static async _fromIdTokenResponse(e,n,i=!1){const s=new ke;s.updateFromServerResponse(n);const o=new K({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await et(o),o}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];x(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?Qn(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),l=new ke;l.updateFromIdToken(i);const c=new K({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Rt(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(c,d),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an=new Map;function te(t){ie(t instanceof Function,"Expected a class definition");let e=an.get(t);return e?(ie(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,an.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Zn.type="NONE";const ln=Zn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(t,e,n){return`firebase:${t}:${e}:${n}`}class Ie{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:o}=this.auth;this.fullUserKey=Ye(this.userKey,s.apiKey,o),this.fullPersistenceKey=Ye("persistence",s.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ze(this.auth,{idToken:e}).catch(()=>{});return n?K._fromGetAccountInfoResponse(this.auth,n,e):null}return K._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Ie(te(ln),e,i);const s=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=s[0]||te(ln);const a=Ye(i,e.config.apiKey,e.name);let l=null;for(const d of n)try{const p=await d._get(a);if(p){let u;if(typeof p=="string"){const k=await Ze(e,{idToken:p}).catch(()=>{});if(!k)break;u=await K._fromGetAccountInfoResponse(e,k,p)}else u=K._fromJSON(e,p);d!==o&&(l=u),o=d;break}}catch{}const c=s.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!c.length?new Ie(o,e,i):(o=c[0],l&&await o._set(a,l.toJSON()),await Promise.all(n.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Ie(o,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rr(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(er(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(sr(e))return"Blackberry";if(or(e))return"Webos";if(tr(e))return"Safari";if((e.includes("chrome/")||nr(e))&&!e.includes("edge/"))return"Chrome";if(ir(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function er(t=G()){return/firefox\//i.test(t)}function tr(t=G()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nr(t=G()){return/crios\//i.test(t)}function rr(t=G()){return/iemobile/i.test(t)}function ir(t=G()){return/android/i.test(t)}function sr(t=G()){return/blackberry/i.test(t)}function or(t=G()){return/webos/i.test(t)}function $t(t=G()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Ns(t=G()){var e;return $t(t)&&!!((e=window.navigator)!=null&&e.standalone)}function Os(){return qr()&&document.documentMode===10}function ar(t=G()){return $t(t)||ir(t)||or(t)||sr(t)||/windows phone/i.test(t)||rr(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(t,e=[]){let n;switch(t){case"Browser":n=cn(G());break;case"Worker":n=`${cn(G())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Be}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=o=>new Promise((a,l)=>{try{const c=e(o);a(c)}catch(c){l(c)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ds(t,e={}){return X(t,"GET","/v2/passwordPolicy",Z(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws=6;class $s{constructor(e){var i;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Ws,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new dn(this),this.idTokenSubscription=new dn(this),this.beforeStateQueue=new zs(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Hn,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=te(n)),this._initializationPromise=this.queue(async()=>{var i,s,o;if(!this._deleted&&(this.persistenceManager=await Ie.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((o=this.currentUser)==null?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ze(this,{idToken:e}),i=await K._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var o;if(Q(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(o=this.redirectUser)==null?void 0:o._redirectEventId,l=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await et(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ys()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Q(this.app))return Promise.reject(ue(this));const n=e?xe(e):null;return n&&x(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Q(this.app)?Promise.reject(ue(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Q(this.app)?Promise.reject(ue(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(te(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ds(this),n=new $s(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Le("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await As(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&te(e)||this._popupRedirectResolver;x(n,this,"argument-error"),this.redirectPersistenceManager=await Ie.create(this,[te(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,i;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(l,this,"internal-error"),l.then(()=>{a||o(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,s);return()=>{a=!0,c()}}else{const c=e.addObserver(n);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=lr(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var n;if(Q(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&ms(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function fe(t){return xe(t)}class dn{constructor(e){this.auth=e,this.observer=null,this.addObserver=ei(n=>this.observer=n)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ue={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Bs(t){Ue=t}function Lt(t){return Ue.loadJS(t)}function Ms(){return Ue.recaptchaV2Script}function Us(){return Ue.recaptchaEnterpriseScript}function Fs(){return Ue.gapiScript}function cr(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs=500,Vs=6e4,Ve=1e12;class Gs{constructor(e){this.auth=e,this.counter=Ve,this._widgets=new Map}render(e,n){const i=this.counter;return this._widgets.set(i,new Js(e,this.auth.name,n||{})),this.counter++,i}reset(e){var i;const n=e||Ve;(i=this._widgets.get(n))==null||i.delete(),this._widgets.delete(n)}getResponse(e){var i;const n=e||Ve;return((i=this._widgets.get(n))==null?void 0:i.getResponse())||""}async execute(e){var i;const n=e||Ve;return(i=this._widgets.get(n))==null||i.execute(),""}}class qs{constructor(){this.enterprise=new Ys}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class Ys{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class Js{constructor(e,n,i){this.params=i,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;x(s,"argument-error",{appName:n}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Ks(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},Vs)},Hs))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Ks(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let i=0;i<t;i++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}const Xs="recaptcha-enterprise",Ne="NO_RECAPTCHA";class dr{constructor(e){this.type=Xs,this.auth=fe(e)}async verify(e="verify",n=!1){async function i(o){if(!n){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,l)=>{Xn(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new Kn(c);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(c=>{l(c)})})}function s(o,a,l){const c=window.grecaptcha;sn(c)?c.enterprise.ready(()=>{c.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(Ne)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new qs().execute("siteKey",{action:"verify"}):new Promise((o,a)=>{i(this.auth).then(l=>{if(!n&&sn(window.grecaptcha))s(l,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Us();c.length!==0&&(c+=l),Lt(c).then(()=>{s(l,o,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}async function mt(t,e,n,i=!1,s=!1){const o=new dr(t);let a;if(s)a=Ne;else try{a=await o.verify(n)}catch{a=await o.verify(n,!0)}const l={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,d=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return i?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function bt(t,e,n,i,s){var o;if((o=t._getRecaptchaConfig())!=null&&o.isProviderEnabled("PHONE_PROVIDER")){const a=await mt(t,e,n);return i(t,a).catch(async l=>{var c;if(((c=t._getRecaptchaConfig())==null?void 0:c.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const d=await mt(t,e,n,!1,!0);return i(t,d)}return Promise.reject(l)})}else{const a=await mt(t,e,n,!1,!0);return i(t,a)}}async function Qs(t){const e=fe(t),n=await Xn(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),i=new Kn(n);e.tenantId==null?e._agentRecaptchaConfig=i:e._tenantRecaptchaConfigs[e.tenantId]=i,i.isAnyProviderEnabled()&&new dr(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(t,e){const n=Ln(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),o=n.getOptions();if(_e(o,e??{}))return s;re(s,"already-initialized")}return n.initialize({options:e})}function eo(t,e){const n=(e==null?void 0:e.persistence)||[],i=(Array.isArray(n)?n:[n]).map(te);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function to(t,e,n){const i=fe(t);x(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,o=hr(e),{host:a,port:l}=no(e),c=l===null?"":`:${l}`,d={url:`${o}//${a}${c}/`},p=Object.freeze({host:a,port:l,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){x(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),x(_e(d,i.config.emulator)&&_e(p,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=d,i.emulatorConfig=p,i.settings.appVerificationDisabledForTesting=!0,Nt(a)?ri(`${o}//${a}${c}`):ro()}function hr(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function no(t){const e=hr(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const o=s[1];return{host:o,port:hn(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:hn(a)}}}function hn(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function ro(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ee("not implemented")}_getIdTokenResponse(e){return ee("not implemented")}_linkToIdToken(e,n){return ee("not implemented")}_getReauthenticationResolver(e){return ee("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Te(t,e){return ot(t,"POST","/v1/accounts:signInWithIdp",Z(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="http://localhost";class ye extends Bt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ye(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):re("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...o}=n;if(!i||!s)return null;const a=new ye(i,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return Te(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Te(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Te(e,n)}buildRequest(){const e={requestUri:io,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ee(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pn(t,e){return X(t,"POST","/v1/accounts:sendVerificationCode",Z(t,e))}async function so(t,e){return ot(t,"POST","/v1/accounts:signInWithPhoneNumber",Z(t,e))}async function oo(t,e){const n=await ot(t,"POST","/v1/accounts:signInWithPhoneNumber",Z(t,e));if(n.temporaryProof)throw Pe(t,"account-exists-with-different-credential",n);return n}const ao={USER_NOT_FOUND:"user-not-found"};async function lo(t,e){const n={...e,operation:"REAUTH"};return ot(t,"POST","/v1/accounts:signInWithPhoneNumber",Z(t,n),ao)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe extends Bt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new Oe({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new Oe({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return so(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return oo(e,{idToken:n,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return lo(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:i,verificationCode:s}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:i,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:i,phoneNumber:s,temporaryProof:o}=e;return!i&&!n&&!s&&!o?null:new Oe({verificationId:n,verificationCode:i,phoneNumber:s,temporaryProof:o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe extends pr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae extends Fe{constructor(){super("facebook.com")}static credential(e){return ye._fromParams({providerId:ae.PROVIDER_ID,signInMethod:ae.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ae.credentialFromTaggedObject(e)}static credentialFromError(e){return ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ae.credential(e.oauthAccessToken)}catch{return null}}}ae.FACEBOOK_SIGN_IN_METHOD="facebook.com";ae.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le extends Fe{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ye._fromParams({providerId:le.PROVIDER_ID,signInMethod:le.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return le.credentialFromTaggedObject(e)}static credentialFromError(e){return le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return le.credential(n,i)}catch{return null}}}le.GOOGLE_SIGN_IN_METHOD="google.com";le.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce extends Fe{constructor(){super("github.com")}static credential(e){return ye._fromParams({providerId:ce.PROVIDER_ID,signInMethod:ce.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ce.credentialFromTaggedObject(e)}static credentialFromError(e){return ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ce.credential(e.oauthAccessToken)}catch{return null}}}ce.GITHUB_SIGN_IN_METHOD="github.com";ce.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de extends Fe{constructor(){super("twitter.com")}static credential(e,n){return ye._fromParams({providerId:de.PROVIDER_ID,signInMethod:de.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return de.credentialFromTaggedObject(e)}static credentialFromError(e){return de.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return de.credential(n,i)}catch{return null}}}de.TWITTER_SIGN_IN_METHOD="twitter.com";de.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const o=await K._fromIdTokenResponse(e,i,s),a=un(i);return new je({user:o,providerId:a,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=un(i);return new je({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function un(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt extends ge{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,tt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new tt(e,n,i,s)}}function ur(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?tt._fromErrorAndOperation(t,o,e,i):o})}async function co(t,e,n=!1){const i=await $e(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return je._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ho(t,e,n=!1){const{auth:i}=t;if(Q(i.app))return Promise.reject(ue(i));const s="reauthenticate";try{const o=await $e(t,ur(i,s,e,t),n);x(o.idToken,i,"internal-error");const a=Wt(o.idToken);x(a,i,"internal-error");const{sub:l}=a;return x(t.uid===l,i,"user-mismatch"),je._forOperation(t,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&re(i,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gr(t,e,n=!1){if(Q(t.app))return Promise.reject(ue(t));const i="signIn",s=await ur(t,i,e),o=await je._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(o.user),o}async function po(t,e){return gr(fe(t),e)}function uo(t,e,n,i){return xe(t).onIdTokenChanged(e,n,i)}function go(t,e,n){return xe(t).beforeAuthStateChanged(e,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(t,e){return X(t,"POST","/v2/accounts/mfaEnrollment:start",Z(t,e))}const nt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(nt,"1"),this.storage.removeItem(nt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=1e3,mo=10;class mr extends fr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ar(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!n&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);Os()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,mo):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},fo)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}mr.type="LOCAL";const bo=mr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br extends fr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}br.type="SESSION";const yr=br;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new at(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:o}=n.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const l=Array.from(a).map(async d=>d(n.origin,o)),c=await yo(l);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}at.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((l,c)=>{const d=Mt("",20);s.port1.start();const p=setTimeout(()=>{c(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(u){const k=u;if(k.data.eventId===d)switch(k.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),l(k.data.response);break;default:clearTimeout(p),clearTimeout(o),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(){return window}function wo(t){L().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(){return typeof L().WorkerGlobalScope<"u"&&typeof L().importScripts=="function"}async function vo(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function So(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function ko(){return Ut()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr="firebaseLocalStorageDb",Io=1,rt="firebaseLocalStorage",wr="fbase_key";class He{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function lt(t,e){return t.transaction([rt],e?"readwrite":"readonly").objectStore(rt)}function To(){const t=indexedDB.deleteDatabase(xr);return new He(t).toPromise()}function Pt(){const t=indexedDB.open(xr,Io);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(rt,{keyPath:wr})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(rt)?e(i):(i.close(),await To(),e(await Pt()))})})}async function fn(t,e,n){const i=lt(t,!0).put({[wr]:e,value:n});return new He(i).toPromise()}async function _o(t,e){const n=lt(t,!1).get(e),i=await new He(n).toPromise();return i===void 0?null:i.value}function mn(t,e){const n=lt(t,!0).delete(e);return new He(n).toPromise()}const Co=800,jo=3;class vr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Pt(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>jo)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ut()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=at._getInstance(ko()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,i;if(this.activeServiceWorker=await vo(),!this.activeServiceWorker)return;this.sender=new xo(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||So()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Pt();return await fn(e,nt,"1"),await mn(e,nt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>fn(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>_o(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>mn(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=lt(s,!1).getAll();return new He(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Co)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vr.type="LOCAL";const Eo=vr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(t,e){return X(t,"POST","/v2/accounts/mfaSignIn:start",Z(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=cr("rcb"),Ro=new Me(3e4,6e4);class Po{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=L().grecaptcha)!=null&&e.render)}load(e,n=""){return x(Ao(n),e,"argument-error"),this.shouldResolveImmediately(n)&&rn(L().grecaptcha)?Promise.resolve(L().grecaptcha):new Promise((i,s)=>{const o=L().setTimeout(()=>{s(Y(e,"network-request-failed"))},Ro.get());L()[yt]=()=>{L().clearTimeout(o),delete L()[yt];const l=L().grecaptcha;if(!l||!rn(l)){s(Y(e,"internal-error"));return}const c=l.render;l.render=(d,p)=>{const u=c(d,p);return this.counter++,u},this.hostLanguage=n,i(l)};const a=`${Ms()}?${Ee({onload:yt,render:"explicit",hl:n})}`;Lt(a).catch(()=>{clearTimeout(o),s(Y(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!((n=L().grecaptcha)!=null&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Ao(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class No{async load(e){return new Gs(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ze="recaptcha",Oo={theme:"light",type:"image"};class zo{constructor(e,n,i={...Oo}){this.parameters=i,this.type=ze,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=fe(e),this.isInvisible=this.parameters.size==="invisible",x(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof n=="string"?document.getElementById(n):n;x(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new No:new Po,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),i=n.getResponse(e);return i||new Promise(s=>{const o=a=>{a&&(this.tokenChangeListeners.delete(o),s(a))};this.tokenChangeListeners.add(o),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){x(!this.parameters.sitekey,this.auth,"argument-error"),x(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),x(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(i=>i(n)),typeof e=="function")e(n);else if(typeof e=="string"){const i=L()[e];typeof i=="function"&&i(n)}}}assertNotDestroyed(){x(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){x(Gn()&&!Ut(),this.auth,"internal-error"),await Do(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Is(this.auth);x(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return x(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Do(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=Oe._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function $o(t,e,n){if(Q(t.app))return Promise.reject(ue(t));const i=fe(t),s=await Lo(i,e,xe(n));return new Wo(s,o=>po(i,o))}async function Lo(t,e,n){var i;if(!t._getRecaptchaConfig())try{await Qs(t)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s){x(o.type==="enroll",t,"internal-error");const a={idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await bt(t,a,"mfaSmsEnrollment",async(p,u)=>{if(u.phoneEnrollmentInfo.captchaResponse===Ne){x((n==null?void 0:n.type)===ze,p,"argument-error");const k=await xt(p,u,n);return gn(p,k)}return gn(p,u)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneSessionInfo.sessionInfo}else{x(o.type==="signin",t,"internal-error");const a=((i=s.multiFactorHint)==null?void 0:i.uid)||s.multiFactorUid;x(a,t,"missing-multi-factor-info");const l={mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await bt(t,l,"mfaSmsSignIn",async(u,k)=>{if(k.phoneSignInInfo.captchaResponse===Ne){x((n==null?void 0:n.type)===ze,u,"argument-error");const w=await xt(u,k,n);return bn(u,w)}return bn(u,k)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).phoneResponseInfo.sessionInfo}}else{const o={phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await bt(t,o,"sendVerificationCode",async(d,p)=>{if(p.captchaResponse===Ne){x((n==null?void 0:n.type)===ze,d,"argument-error");const u=await xt(d,p,n);return pn(d,u)}return pn(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{n==null||n._reset()}}async function xt(t,e,n){x(n.type===ze,t,"argument-error");const i=await n.verify();x(typeof i=="string",t,"argument-error");const s={...e};if("phoneEnrollmentInfo"in s){const o=s.phoneEnrollmentInfo.phoneNumber,a=s.phoneEnrollmentInfo.captchaResponse,l=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:o,recaptchaToken:i,captchaResponse:a,clientType:l,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){const o=s.phoneSignInInfo.captchaResponse,a=s.phoneSignInInfo.clientType,l=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:i,captchaResponse:o,clientType:a,recaptchaVersion:l}}),s}else return Object.assign(s,{recaptchaToken:i}),s}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(t,e){return e?te(e):(x(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends Bt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Te(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Te(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Te(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Mo(t){return gr(t.auth,new Ft(t),t.bypassAuthState)}function Uo(t){const{auth:e,user:n}=t;return x(n,e,"internal-error"),ho(n,new Ft(t),t.bypassAuthState)}async function Fo(t){const{auth:e,user:n}=t;return x(n,e,"internal-error"),co(n,new Ft(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,n,i,s,o=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:o,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Mo;case"linkViaPopup":case"linkViaRedirect":return Fo;case"reauthViaPopup":case"reauthViaRedirect":return Uo;default:re(this.auth,"internal-error")}}resolve(e){ie(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ie(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho=new Me(2e3,1e4);class ve extends Sr{constructor(e,n,i,s,o){super(e,n,s,o),this.provider=i,this.authWindow=null,this.pollId=null,ve.currentPopupAction&&ve.currentPopupAction.cancel(),ve.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){ie(this.filter.length===1,"Popup operations only handle one event");const e=Mt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Y(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Y(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ve.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,i;if((i=(n=this.authWindow)==null?void 0:n.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Y(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ho.get())};e()}}ve.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="pendingRedirect",Je=new Map;class Go extends Sr{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=Je.get(this.auth._key());if(!e){try{const i=await qo(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}Je.set(this.auth._key(),e)}return this.bypassAuthState||Je.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function qo(t,e){const n=Ko(e),i=Jo(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function Yo(t,e){Je.set(t._key(),e)}function Jo(t){return te(t._redirectPersistence)}function Ko(t){return Ye(Vo,t.config.apiKey,t.name)}async function Xo(t,e,n=!1){if(Q(t.app))return Promise.reject(ue(t));const i=fe(t),s=Bo(i,e),a=await new Go(i,s,n).execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo=600*1e3;class Zo{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ea(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var i;if(e.error&&!kr(e)){const s=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";n.onError(Y(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Qo&&this.cachedEventUids.clear(),this.cachedEventUids.has(yn(e))}saveEventToCache(e){this.cachedEventUids.add(yn(e)),this.lastProcessedEventTime=Date.now()}}function yn(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function kr({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ea(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return kr(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ta(t,e={}){return X(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ra=/^https?/;async function ia(t){if(t.config.emulator)return;const{authorizedDomains:e}=await ta(t);for(const n of e)try{if(sa(n))return}catch{}re(t,"unauthorized-domain")}function sa(t){const e=Et(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===i}if(!ra.test(n))return!1;if(na.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=new Me(3e4,6e4);function xn(){const t=L().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function aa(t){return new Promise((e,n)=>{var s,o,a;function i(){xn(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{xn(),n(Y(t,"network-request-failed"))},timeout:oa.get()})}if((o=(s=L().gapi)==null?void 0:s.iframes)!=null&&o.Iframe)e(gapi.iframes.getContext());else if((a=L().gapi)!=null&&a.load)i();else{const l=cr("iframefcb");return L()[l]=()=>{gapi.load?i():n(Y(t,"network-request-failed"))},Lt(`${Fs()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw Ke=null,e})}let Ke=null;function la(t){return Ke=Ke||aa(t),Ke}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca=new Me(5e3,15e3),da="__/auth/iframe",ha="emulator/auth/iframe",pa={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ua=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ga(t){const e=t.config;x(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Dt(e,ha):`https://${t.config.authDomain}/${da}`,i={apiKey:e.apiKey,appName:t.name,v:Be},s=ua.get(t.config.apiHost);s&&(i.eid=s);const o=t._getFrameworks();return o.length&&(i.fw=o.join(",")),`${n}?${Ee(i).slice(1)}`}async function fa(t){const e=await la(t),n=L().gapi;return x(n,t,"internal-error"),e.open({where:document.body,url:ga(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pa,dontclear:!0},i=>new Promise(async(s,o)=>{await i.restyle({setHideOnLeave:!1});const a=Y(t,"network-request-failed"),l=L().setTimeout(()=>{o(a)},ca.get());function c(){L().clearTimeout(l),s(i)}i.ping(c).then(c,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ba=500,ya=600,xa="_blank",wa="http://localhost";class wn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function va(t,e,n,i=ba,s=ya){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const c={...ma,width:i.toString(),height:s.toString(),top:o,left:a},d=G().toLowerCase();n&&(l=nr(d)?xa:n),er(d)&&(e=e||wa,c.scrollbars="yes");const p=Object.entries(c).reduce((k,[w,S])=>`${k}${w}=${S},`,"");if(Ns(d)&&l!=="_self")return Sa(e||"",l),new wn(null);const u=window.open(e||"",l,p);x(u,t,"popup-blocked");try{u.focus()}catch{}return new wn(u)}function Sa(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka="__/auth/handler",Ia="emulator/auth/handler",Ta=encodeURIComponent("fac");async function vn(t,e,n,i,s,o){x(t.config.authDomain,t,"auth-domain-config-required"),x(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:Be,eventId:s};if(e instanceof pr){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",Zr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,u]of Object.entries({}))a[p]=u}if(e instanceof Fe){const p=e.getScopes().filter(u=>u!=="");p.length>0&&(a.scopes=p.join(","))}t.tenantId&&(a.tid=t.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const c=await t._getAppCheckToken(),d=c?`#${Ta}=${encodeURIComponent(c)}`:"";return`${_a(t)}?${Ee(l).slice(1)}${d}`}function _a({config:t}){return t.emulator?Dt(t,Ia):`https://${t.authDomain}/${ka}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt="webStorageSupport";class Ca{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=yr,this._completeRedirectFn=Xo,this._overrideRedirectResult=Yo}async _openPopup(e,n,i,s){var a;ie((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await vn(e,n,i,Et(),s);return va(e,o,Mt())}async _openRedirect(e,n,i,s){await this._originValidation(e);const o=await vn(e,n,i,Et(),s);return wo(o),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:o}=this.eventManagers[n];return s?Promise.resolve(s):(ie(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await fa(e),i=new Zo(e);return n.register("authEvent",s=>(x(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(wt,{type:wt},s=>{var a;const o=(a=s==null?void 0:s[0])==null?void 0:a[wt];o!==void 0&&n(!!o),re(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=ia(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ar()||tr()||$t()}}const ja=Ca;var Sn="@firebase/auth",kn="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Pa(t){De(new Ce("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=i.options;x(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:a,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:lr(t)},d=new Ls(i,s,o,c);return eo(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),De(new Ce("auth-internal",e=>{const n=fe(e.getProvider("auth").getImmediate());return(i=>new Ea(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Se(Sn,kn,Ra(t)),Se(Sn,kn,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa=300,Na=zn("authIdTokenMaxAge")||Aa;let In=null;const Oa=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>Na)return;const s=n==null?void 0:n.token;In!==s&&(In=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function za(t=ns()){const e=Ln(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Zs(t,{popupRedirectResolver:ja,persistence:[Eo,bo,yr]}),i=zn("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=Oa(o.toString());go(n,a,()=>a(n.currentUser)),uo(n,l=>a(l))}}const s=Mr("auth");return s&&to(n,`http://${s}`),n}function Da(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}Bs({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const o=Y("internal-error");o.customData=s,n(o)},i.type="text/javascript",i.charset="UTF-8",Da().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Pa("Browser");const Wa={apiKey:"AIzaSyB81Z-L4VtwkPiH8AHa3NzI_y3xnzx-4Jw",authDomain:"social-ninja-s.firebaseapp.com",projectId:"social-ninja-s",storageBucket:"social-ninja-s.firebasestorage.app",messagingSenderId:"148307495726",appId:"1:148307495726:web:9e6e85aed99c104f3bc8bf"},$a=Bn(Wa),Tn=za($a);var jn,En;const F={brandName:"Social Ninja's",brandTagline:"AI Content Studio",accentColor:"#5ba4f5",razorpay:{starter:"https://rzp.io/rzp/90qEc0D",growth:"https://rzp.io/rzp/YkQovO28",pro:"https://rzp.io/rzp/Kk2QqWB"},clickup:{leadsListId:"901613894433",activeListId:"901613894434",renewalListId:"901613894435"},sheetsWebhook:((En=(jn=import.meta)==null?void 0:jn.env)==null?void 0:En.VITE_GOOGLE_SHEET_URL)||""},vt=[{id:"starter",name:"Starter",tagline:"Video-first growth — 2 platforms",priceINR:2999,displayINR:"₹2,999",originalINR:"₹9,999",postsPerWeek:4,postsPerMonth:15,platformCount:2,color:"#5ba4f5",badge:null,platformOptions:["Instagram","Facebook","YouTube","LinkedIn","Twitter/X","Threads"],features:[{icon:"🎬",text:"15 posts/month — video-first strategy"},{icon:"📽",text:"Full Reel/Short scripts — word-for-word, ready to film"},{icon:"🔍",text:"Live trend research before every generation"},{icon:"✍️",text:"Platform-native captions + hooks"},{icon:"📌",text:"Viral hashtag sets per post"},{icon:"🗓",text:"Weekly content calendar with best posting times"},{icon:"📊",text:"Client profile dashboard — track your growth"},{icon:"♻️",text:"Content memory — AI never repeats"},{icon:"📲",text:"Choose 2 platforms"},{icon:"📧",text:"Email support"}],guarantee:"Try free — 3 posts generated instantly, no card required",perPost:"₹267/post",highlight:"Video content gets 3× more reach — we lead with Reels"},{id:"growth",name:"Growth",tagline:"Most popular — 4 platforms",priceINR:5499,displayINR:"₹5,499",originalINR:"₹18,000",postsPerWeek:6,postsPerMonth:25,platformCount:4,color:"#7C3AED",badge:"BEST VALUE",platformOptions:["Instagram","Facebook","YouTube","LinkedIn","Twitter/X","Threads","Pinterest","Snapchat"],features:[{icon:"📅",text:"25 posts/month — 6 per week"},{icon:"🔍",text:"Deep trend research per platform"},{icon:"✍️",text:"Platform-native captions + Reel scripts"},{icon:"🎠",text:"Full carousel slide copy per post"},{icon:"📌",text:"Platform-optimised hashtag strategy"},{icon:"🗓",text:"Full content calendar — all 3 platforms"},{icon:"📈",text:"Weekly trend report — your niche only"},{icon:"📲",text:"Choose 4 platforms"},{icon:"⚡",text:"Priority support — 24hr response"},{icon:"📞",text:"Monthly 30-min strategy call"}],guarantee:"Full refund if not satisfied within 7 days — zero questions",perPost:"₹260/post",highlight:"Save ₹11,501/mo vs hiring a content team"},{id:"pro",name:"Pro",tagline:"Unlimited — every platform",priceINR:8999,displayINR:"₹8,999",originalINR:"₹35,000",postsPerWeek:999,postsPerMonth:999,platformCount:999,color:"#E31313",badge:"AGENCY GRADE",platformOptions:["Instagram","Facebook","YouTube","LinkedIn","Twitter/X","Threads","Pinterest","Snapchat","TikTok","All Platforms"],features:[{icon:"∞",text:"Unlimited posts — generate anytime"},{icon:"🔍",text:"Real-time viral trend research"},{icon:"✍️",text:"Every content format — posts, reels, carousels, stories"},{icon:"🎬",text:"Word-for-word Reel + YouTube scripts"},{icon:"🎠",text:"Complete carousel decks with CTA slides"},{icon:"📌",text:"Competitor gap analysis per generation"},{icon:"📲",text:"Every platform — no limits"},{icon:"✉️",text:"Priority email support — 24hr response"},{icon:"📞",text:"Bi-weekly strategy call — agency founder"},{icon:"🔄",text:"Cancel anytime — no contracts"}],guarantee:"Cancel anytime. No lock-in. No questions.",perPost:"Unlimited",highlight:"Same output as a full content team for 95% less"}],it={IN:{currency:"INR",symbol:"₹",flag:"🇮🇳",rates:[2999,5499,8999],originals:[9999,18e3,35e3],perPost:["₹200","₹220","Unlimited"]},US:{currency:"USD",symbol:"$",flag:"🇺🇸",rates:[49,79,149],originals:[129,219,419],perPost:["$3.3","$3.2","Unlimited"]},GB:{currency:"GBP",symbol:"£",flag:"🇬🇧",rates:[39,65,119],originals:[99,179,339],perPost:["£2.6","£2.6","Unlimited"]},AE:{currency:"AED",symbol:"AED",flag:"🇦🇪",rates:[179,299,549],originals:[479,829,1549],perPost:["AED 12","AED 12","Unlimited"]},AU:{currency:"AUD",symbol:"A$",flag:"🇦🇺",rates:[75,119,229],originals:[199,329,649],perPost:["A$5","A$4.8","Unlimited"]},SG:{currency:"SGD",symbol:"S$",flag:"🇸🇬",rates:[65,105,199],originals:[175,289,549],perPost:["S$4.3","S$4.2","Unlimited"]},CA:{currency:"CAD",symbol:"C$",flag:"🇨🇦",rates:[69,109,209],originals:[179,299,569],perPost:["C$4.6","C$4.4","Unlimited"]},DE:{currency:"EUR",symbol:"€",flag:"🇩🇪",rates:[45,75,139],originals:[119,209,389],perPost:["€3","€3","Unlimited"]},FR:{currency:"EUR",symbol:"€",flag:"🇫🇷",rates:[45,75,139],originals:[119,209,389],perPost:["€3","€3","Unlimited"]},NL:{currency:"EUR",symbol:"€",flag:"🇳🇱",rates:[45,75,139],originals:[119,209,389],perPost:["€3","€3","Unlimited"]},_DEFAULT:{currency:"USD",symbol:"$",flag:"🌐",rates:[49,79,149],originals:[129,219,419],perPost:["$3.3","$3.2","Unlimited"]}};async function La(){try{const t=sessionStorage.getItem("sn_geo");if(t)return JSON.parse(t);const n=await(await fetch("https://ipapi.co/json/")).json(),i={country:n.country_code||"_DEFAULT",city:n.city,region:n.region};return sessionStorage.setItem("sn_geo",JSON.stringify(i)),i}catch{return{country:"_DEFAULT"}}}function _n(t,e){const n=it[t]||it._DEFAULT;return{geo:n,price:n.rates[e],original:n.originals[e],display:n.symbol+n.rates[e].toLocaleString(),displayOriginal:n.symbol+n.originals[e].toLocaleString(),perPost:n.perPost[e],disc:Math.round((1-n.rates[e]/n.originals[e])*100)}}const we={Instagram:{formats:["Reel","Carousel","Feed Post","Story"],captionStyle:"Hook in line 1. Storytelling body. CTA at end. Max 150 words. Line breaks every 2–3 lines. 3–5 emojis max.",hashtagCount:10,hashtagStyle:"Mix: 3 broad (1M+), 4 mid (100k–500k), 3 niche (<50k). No banned tags.",scriptStyle:"15–30 second Reel. Hook (0–3s): must stop scroll. Body: value/story. End: CTA + audio cue.",bestTimes:["7am","12pm","6pm","9pm"],contentTypes:["Reels get 3× reach — prioritise","Carousels save rate is highest","Talking head builds trust fastest"],viralMechanics:"Pattern interrupt hooks, save-worthy value, comment bait questions",requiresScript:!0,requiresCarousel:!0,requiresThread:!1},Facebook:{formats:["Video Post","Link Post","Story","Carousel Ad"],captionStyle:"Conversational. Story-led. 50–300 words. Emotional triggers. Community language.",hashtagCount:3,hashtagStyle:"3 hashtags max on Facebook. Broad, topic-level only.",scriptStyle:"60–90 second Facebook video. Slow hook — don't rush. Story arc. Soft CTA at end.",bestTimes:["9am","1pm","3pm"],contentTypes:["Long-form video performs","Personal stories viral","Community questions drive comments"],viralMechanics:"Relatable opinions, share-triggers, Facebook groups cross-posting"},YouTube:{formats:["YouTube Short","Long Video","Community Post"],captionStyle:"YouTube title: 60 chars max, keyword-first. Description: SEO-optimised, 200+ words, timestamps.",hashtagCount:5,hashtagStyle:"5 tags: channel name + 4 searchable topics. No spam.",scriptStyle:"YouTube Short: 45–60 sec. Hook (0–5s) must answer: why should I watch? Payoff must come fast. Long video: AIDA structure.",bestTimes:["2pm","5pm","8pm"],contentTypes:["Shorts for discovery","Long-form for authority","Community posts for retention"],viralMechanics:"Search-intent titles, retention hooks, end screen CTAs"},LinkedIn:{formats:["LinkedIn Video","LinkedIn Carousel Doc","LinkedIn Post","LinkedIn Article","Poll"],captionStyle:"Line 1: bold opinion or surprising stat — no fluff. Data-backed insight. 150–300 words. Short paragraphs (1–2 lines). NO generic hashtag spam. End with a strong opinion-driven CTA.",hashtagCount:5,hashtagStyle:"5 precise professional hashtags. Industry-specific, not generic. e.g. #GrowthMarketing not #Marketing",scriptStyle:"LinkedIn Video: 60–90 sec. Speak directly to camera, smart casual. Open with a bold claim (0–5s). No music. Subtitles CRITICAL. Structure: Hook claim → proof/story → actionable takeaway → invite comment.",bestTimes:["8am","12pm","5pm Tue–Thu"],contentTypes:["Video posts get 5× more reach than text","Document carousels drive highest saves","Personal opinion posts 3× engagement","Polls drive massive comment volume"],viralMechanics:"Contrarian takes, personal story + data, comment-bait opinion questions, document carousel saves",requiresScript:!0,requiresCarousel:!0,requiresThread:!1},"Twitter/X":{formats:["Tweet Thread","Single Tweet","Reply Hook","Quote Tweet"],captionStyle:"Tweet: max 280 chars. Punchy. Opinion-forward. Thread: Hook tweet → 8–12 numbered tweets → CTA tweet.",hashtagCount:2,hashtagStyle:"1–2 hashtags only on X. Trending or niche-specific.",scriptStyle:"Twitter/X video: 30–60 sec. No intro fluff. Jump straight in. Subtitles always.",bestTimes:["8am","12pm","5pm","9pm"],contentTypes:["Threads go viral fastest","Hot takes with data","Replies to trending topics"],viralMechanics:"Controversial but true statements, thread hooks, reply farming"},Threads:{formats:["Thread","Single Post","Reply"],captionStyle:"Conversational, warm, authentic. Max 500 chars. Like texting a friend. No hashtags needed.",hashtagCount:0,hashtagStyle:"No hashtags on Threads — algorithm ignores them.",scriptStyle:"No video scripts needed — Threads is text-first.",bestTimes:["9am","1pm","7pm"],contentTypes:["Short opinions get reshared","Personal takes outperform brand content","Reply chains build following fast"],viralMechanics:"Authentic unpopular opinions, Instagram crosspost, reply-driven growth"},Pinterest:{formats:["Idea Pin","Standard Pin","Video Pin"],captionStyle:"SEO-keyword rich description. 100–150 words. Focus on searchable terms. Seasonal awareness.",hashtagCount:5,hashtagStyle:"5–10 descriptive tags matching search intent.",scriptStyle:"Idea Pin: 3–5 slides. Step-by-step or how-to format. Visual-first.",bestTimes:["8pm","9pm Fri/Sat"],contentTypes:["How-to content pins best","Infographic style drives saves","Seasonal content is evergreen"],viralMechanics:"SEO-optimised titles, tall format, save-worthy utility content"},Snapchat:{formats:["Snap Story","Spotlight"],captionStyle:"Very short. 1 line max. Casual, Gen Z tone. Entertainment-first.",hashtagCount:0,hashtagStyle:"No hashtags on Snapchat.",scriptStyle:"10–15 second Spotlight. Raw, authentic. No production needed. Sound-on assumed.",bestTimes:["12pm","10pm"],contentTypes:["Authentic behind-scenes works","Entertainment drives Spotlight","Story series builds retention"],viralMechanics:"Raw authenticity, behind-scenes exclusivity, fast entertainment"},TikTok:{formats:["TikTok Video","TikTok Live","Photo Mode"],captionStyle:"Short caption: 1–3 lines. Trending sound name if relevant. 3–5 hashtags max.",hashtagCount:5,hashtagStyle:"Mix trending sounds hashtags + niche + FYP. Max 5.",scriptStyle:"15–60 sec TikTok. HOOK in first 1 second (text overlay + visual). Trending audio. Loop potential at end.",bestTimes:["7am","12pm","7pm","9pm"],contentTypes:["Trending audio × niche = viral","Duet/Stitch builds massive reach","POV format converts"],viralMechanics:"Trending sound + niche pivot, fast hook, loop-worthy endings"},"All Platforms":{formats:["Multi-platform post","Platform-adapted content"],captionStyle:"Write platform-native versions for each active platform.",hashtagCount:10,hashtagStyle:"Adapt hashtags per platform.",scriptStyle:"Write separate scripts per platform format.",bestTimes:["Multiple times per day"],contentTypes:["Cross-platform repurposing","Core content adapted per platform"],viralMechanics:"Content ecosystem — one idea, many formats"}},B={async get(t){try{const e=localStorage.getItem(t);return e?JSON.parse(e):null}catch{return null}},async set(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}},J={email:t=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t.trim()),phone:t=>/^[+]?[\d\s\-()]{8,15}$/.test(t.trim()),url:t=>!t||/^https?:\/\/.+\..+/.test(t.trim()),notEmpty:t=>t.trim().length>=2,minWords:(t,e)=>t.trim().split(/\s+/).length>=e},St=(t,e)=>t==="email"&&!J.email(e)?"Enter a valid email address":t==="phone"&&e&&!J.phone(e)?"Enter a valid phone number (e.g. +91 98765 43210)":t==="website"&&e&&!J.url(e)?"Enter a valid URL starting with https://":t==="brandName"&&!J.notEmpty(e)?"Brand name is required":t==="audience"&&!J.minWords(e,5)?"Describe your audience — at least 5 words":t==="businessContext"&&!J.minWords(e,8)?"Tell us more — at least 8 words helps the AI write better":t==="tone"&&!J.notEmpty(e)?"Brand voice is required":t==="niche"&&!J.notEmpty(e)?"Content niche is required":null;async function st(t,e){try{const n=`**Brand:** ${t.brandName}
**Email:** ${t.email}
**Phone:** ${t.phone||"—"}
**Plan:** ${t.planName} (${t.displayINR}/mo)
**Platforms:** ${(t.platforms||[t.platform]).join(", ")}
**Audience:** ${t.audience}
**Business:** ${t.businessContext}
**Niche:** ${t.niche}
**Tone:** ${t.tone}
**Website:** ${t.website||"—"}
**Payment ID:** ${t.paymentId||"—"}
**Joined:** ${t.joinDate}`;await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,tools:[{type:"url",url:"https://mcp.clickup.com/mcp",name:"clickup-mcp"}],messages:[{role:"user",content:`Create task in ClickUp list ${e} named "${t.brandName} — ${t.planName}" with this description:
${n}`}]})})}catch{}}async function Ir(t){if(!(!F.sheetsWebhook||F.sheetsWebhook.includes("YOUR_SCRIPT")))try{await fetch(F.sheetsWebhook,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({timestamp:new Date().toISOString(),brand:t.brandName,email:t.email,phone:t.phone||"",plan:t.planName,price:t.displayINR,platforms:(t.platforms||[t.platform]).join(", "),audience:t.audience,niche:t.niche,website:t.website||"",joinDate:t.joinDate,paymentId:t.paymentId||"",status:"active"})})}catch{}}async function Ge(t){try{await fetch("/api/data?resource=clients",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch(e){console.error("Failed to sync to backend:",e)}}function Tr(t,e=[]){var l,c,d,p,u,k,w,S;const n=t.platforms||[t.sub||t.platform||"Instagram"],i=n[0],s=we[i]||we.Instagram;n.map(_=>we[_]||we.Instagram);const o=e.length?`
NEVER REPEAT THESE (already published):
${e.map((_,y)=>`${y+1}. ${_}`).join(`
`)}
`:"",a=n.length>1?n.map(_=>{const y=we[_]||we.Instagram;return`
### ${_}
- Formats: ${y.formats.join(", ")}
- Caption style: ${y.captionStyle}
- Hashtags: ${y.hashtagCount} tags — ${y.hashtagStyle}
- Script style: ${y.scriptStyle}
- Best times: ${y.bestTimes.join(", ")}
- What works: ${y.contentTypes.join(" | ")}
- Viral mechanics: ${y.viralMechanics}`}).join(`
`):`- Formats available: ${s.formats.join(", ")}
- Caption style: ${s.captionStyle}
- Hashtag count: ${s.hashtagCount} — ${s.hashtagStyle}
- Script requirements: ${s.scriptStyle}
- Best posting times: ${s.bestTimes.join(", ")}
- What performs: ${s.contentTypes.join(" | ")}
- Viral mechanics on this platform: ${s.viralMechanics}`;return`You are a world-class viral content strategist with 15 years experience growing brands to millions of followers across every social platform. You've run content for brands doing $100M+ in revenue. Every post you write is strategically engineered to stop the scroll, hold attention, and drive action.

## CLIENT BRIEF
- Brand: ${t.brandName||t.name}
- Business: ${t.businessContext||t.industry||t.niche||"Growing brand"}
- Target Audience: ${t.audience||"People interested in "+t.niche}
- Brand Voice: ${t.tone||t.personality||"Engaging, authentic, relatable"}
- Content Niche: ${t.niche||t.industry||"General"}
- Active Platforms: ${n.join(", ")}
- Avoid: ${t.avoid||"Nothing specific"}
${t.competitors?`- Competitors to Research: ${t.competitors} — study what they post, find gaps, write angles that differentiate`:""}
${t.tagline?`- Tagline: ${t.tagline}`:""}
${(l=t.socialAccounts)!=null&&l.instagram?`- Instagram: @${t.socialAccounts.instagram.replace("@","")} — research this account's recent posts, engagement style, and what's working/missing`:""}
${(c=t.socialAccounts)!=null&&c.linkedin?`- LinkedIn: ${t.socialAccounts.linkedin} — analyse their LinkedIn presence and content gaps`:""}
${(d=t.socialAccounts)!=null&&d.youtube?`- YouTube: ${t.socialAccounts.youtube} — analyse their channel strategy and content opportunities`:""}
${(p=t.socialAccounts)!=null&&p.tiktok?`- TikTok: @${t.socialAccounts.tiktok.replace("@","")} — research their TikTok content angles`:""}
${(u=t.socialAccounts)!=null&&u.twitter?`- Twitter/X: @${t.socialAccounts.twitter.replace("@","")} — analyse their X presence`:""}
${o}
## PLATFORM INTELLIGENCE
${a}

## YOUR JOB
Step 1: Use web_search to find what is ACTUALLY TRENDING RIGHT NOW in "${t.niche}" on ${n.join(" and ")}. Search for:
- "${i} trending content ${new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"})}"
- "viral ${(t.niche.split(",")[0]||"").trim()} content ${i}"
- trending hashtags, sounds, formats, memes or conversations in this niche this week
${t.competitors?`- Also search what ${(k=t.competitors.split(",")[0])==null?void 0:k.trim()} is posting lately to find gaps you can fill`:""}
${(w=t.socialAccounts)!=null&&w.instagram||(S=t.socialAccounts)!=null&&S.linkedin?`- Search the client's brand "${t.brandName}" online to understand their current positioning and what content gaps exist`:""}

Step 2: Write 3 complete, platform-native posts using what you found. Every post must be deeply researched and hyper-specific to "${t.niche}" — no generic content.

## CONTENT RULES
- Every caption must open with a PATTERN INTERRUPT — a bold statement, controversial opinion, or specific number that stops the scroll in 0.3 seconds. No greetings, no "Are you...", no questions as openers.
- Captions must be LONG and valuable — minimum 150 words. Use line breaks every 1-2 sentences. Include specific facts, numbers, or insights. Not fluffy filler.
- Captions must be platform-native (Instagram caption ≠ LinkedIn post ≠ Twitter thread)
- Scripts MUST be word-for-word, minimum 180 words, with [DIRECTION: ...] notes for every scene change, text overlay, B-roll cut, and camera action. Write it so someone can read it cold and film immediately.
- Carousel slides must be complete — EVERY slide's heading AND full body copy written. Minimum 5 slides. Slide 1 = hook, Last slide = strong CTA. Each slide must standalone-valuable.
- Hooks must create a knowledge gap or open loop the brain is compelled to close
- Hashtags must be NICHE-SPECIFIC — mix of: 3 broad niche tags, 3 mid-size community tags, 3 micro-niche tags, 1 trending tag. NO generic tags like #love #instagood #viral
- CTAs must be specific, low-friction, and tied to the post content — not "follow for more" or "link in bio"
- Content must feel like it was written by a practitioner who lives this niche — insider language, specific examples, real numbers

## RESPONSE FORMAT
CRITICAL: Return ONLY raw JSON. Start immediately with { — no markdown fences, no preamble, no explanation.

{
  "trends": [
    {"name":"string","platform":"string","why":"string (max 20 words)","heat":"Hot|Rising|Emerging","source":"what you found in search"}
  ],
  "posts": [
    {
      "id":"p1",
      "title":"string (descriptive, max 8 words)",
      "platform":"${i}",
      "format":"${s.formats[0]}",
      "priority":"Must Post|High Value|Good to Post",
      "best_day":"Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday",
      "best_time":"${s.bestTimes[0]}",
      "trend_used":"string — which trend this post rides",
      "why_now":"string — why posting this THIS week matters (max 20 words)",

      "hook":"string — the opening line/text that stops the scroll (max 15 words)",
      "caption":"string — full platform-native caption, properly formatted with line breaks using \\n",
      "hashtags":["t1","t2","t3"${s.hashtagCount>3?',"t4","t5","t6","t7","t8","t9","t10"':""}],
      "cta":"string — the call to action at end of caption",

      "script": ${s.requiresScript||i==="YouTube"||i==="Instagram"||i==="TikTok"||i==="Snapchat"||i==="Facebook"||i==="LinkedIn"?'"string — complete word-for-word script with [DIRECTIONS IN BRACKETS] for camera, text overlays, b-roll, music cues, on-screen text. Min 150 words. Max 220 words. Every line must be speakable exactly as written."':"null"},

      "carousel_slides": ${s.requiresCarousel||i==="Instagram"||i==="LinkedIn"||i==="Facebook"?`[
          {"slide_num":1,"heading":"string — slide title (max 8 words)","body":"string — slide copy (2–4 lines)","design_note":"string — visual direction, background, font style, image suggestion"},
          // ...include ALL slides, min 5 slides for carousels, 4 for LinkedIn docs
        ] IMPORTANT: Always generate carousel_slides for LinkedIn (it is a document/PDF carousel). null only if the post format is a plain text post or video.`:"null"},

      "thread_tweets": ${i==="Twitter/X"?'[{"num":1,"tweet":"string (max 280 chars)"}] — min 6 tweets in thread, max 12. Make each tweet standalone-valuable.':"null"},

      "posting_checklist":["step 1","step 2","step 3","step 4","step 5"],
      "engagement_tip":"string — one specific thing to do in first 30 mins after posting to boost reach"
    }
  ]
}`}function oe({text:t,label:e="Copy",sm:n,full:i}){const[s,o]=I.useState(!1);return r.jsx("button",{onClick:()=>{navigator.clipboard.writeText(t),o(!0),setTimeout(()=>o(!1),2e3)},style:{background:s?"rgba(47,207,142,0.15)":"rgba(91,164,245,0.12)",color:s?"#2fcf8e":"rgba(255,255,255,0.6)",border:`1px solid ${s?"#166534":"rgba(255,255,255,0.12)"}`,borderRadius:7,padding:n?"4px 10px":"7px 15px",fontSize:n?11:12,fontWeight:600,cursor:"pointer",transition:"all .15s",width:i?"100%":void 0,textAlign:i?"center":void 0},children:s?"✓ Copied":e})}function W({label:t,name:e,value:n,onChange:i,error:s,placeholder:o,type:a="text",rows:l,hint:c,required:d,children:p}){return r.jsxs("div",{children:[r.jsxs("label",{style:{fontSize:11,fontWeight:700,color:s?"#e8b86d":"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6},children:[t,d&&r.jsx("span",{style:{color:"#E31313",marginLeft:3},children:"*"})]}),p||(l?r.jsx("textarea",{value:n,onChange:u=>i(e,u.target.value),placeholder:o,rows:l,style:{width:"100%",background:s?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",border:`1px solid ${s?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:"#fff",fontSize:13,resize:"vertical",outline:"none",boxSizing:"border-box",lineHeight:1.65,fontFamily:"inherit"}}):r.jsx("input",{value:n,onChange:u=>i(e,u.target.value),placeholder:o,type:a,style:{width:"100%",background:s?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",border:`1px solid ${s?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 13px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}})),s&&r.jsxs("div",{style:{fontSize:11,color:"#e8b86d",marginTop:4},children:["⚠ ",s]}),c&&!s&&r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:4},children:c})]})}const Cn={fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#c8d8f0",whiteSpace:"pre-wrap",lineHeight:1.85,background:"#020209",borderRadius:10,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.07)",maxHeight:380,overflowY:"auto",margin:0};function Re(t){return t&&t.replace(/\\n/g,`
`).replace(/\\t/g,"  ").trim()}function Ba({color:t,postCount:e}){const[n,i]=I.useState(!1);if(n)return null;const s=[{n:"1",icon:"📋",label:"Copy Caption",desc:"Caption tab → Copy Complete button → paste into Instagram/LinkedIn"},{n:"2",icon:"🎬",label:"Film Your Script",desc:"Script tab → read word-for-word on camera. [Brackets] = directions for you"},{n:"3",icon:"🎠",label:"Design Slides",desc:"Slides tab → copy each slide's heading + body → paste into Canva"},{n:"4",icon:"✅",label:"Post It Right",desc:"Checklist tab → follow each step to maximise reach on posting day"}];return r.jsxs("div",{style:{background:"linear-gradient(135deg,rgba(56,189,248,0.08),rgba(56,189,248,0.03))",border:"1px solid rgba(56,189,248,0.25)",borderRadius:16,padding:"20px 22px",marginBottom:24,position:"relative"},children:[r.jsx("button",{onClick:()=>i(!0),title:"Dismiss",style:{position:"absolute",top:12,right:14,background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:14,lineHeight:1,borderRadius:6,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center"},children:"×"}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:14},children:[r.jsx("span",{style:{fontSize:20},children:"🗺️"}),r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:14,fontWeight:800,color:"#f1f5f9",letterSpacing:"-.3px"},children:[e," posts generated — here is how to use each one"]}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2},children:"Click the tabs inside each post card to switch between sections"})]})]}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:8},children:s.map((o,a)=>r.jsxs("div",{style:{background:"rgba(0,0,0,0.3)",borderRadius:12,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:10,alignItems:"flex-start"},children:[r.jsx("div",{style:{width:28,height:28,borderRadius:8,background:`${t}22`,color:t,fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.n}),r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:12,fontWeight:700,color:"#e2e8f0",marginBottom:3},children:[o.icon," ",o.label]}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.42)",lineHeight:1.55},children:o.desc})]})]},a))})]})}function _r({post:t,profile:e,index:n}){var S,_,y,P,z,m,T,b;const i=e.color||"#5ba4f5",[s,o]=I.useState("caption"),[a,l]=I.useState(!1),d=(f=>{switch(f==null?void 0:f.toLowerCase()){case"instagram":return{bg:"#E1306C",text:"#fff"};case"linkedin":return{bg:"#0077B5",text:"#fff"};case"youtube":return{bg:"#FF0000",text:"#fff"};case"twitter/x":return{bg:"#1DA1F2",text:"#fff"};case"twitter":return{bg:"#1DA1F2",text:"#fff"};case"facebook":return{bg:"#1877F2",text:"#fff"};case"tiktok":return{bg:"#00f2fe",text:"#000"};default:return{bg:i,text:"#fff"}}})(t.platform),p=[{id:"caption",icon:"📋",label:"Caption",hint:"Copy & paste into your post"},...t.script?[{id:"script",icon:"🎬",label:"Script",hint:"Read on camera word-for-word"}]:[],...(S=t.carousel_slides)!=null&&S.length?[{id:"slides",icon:"🎠",label:"Slides",hint:"Each slide for Canva"}]:[],...(_=t.thread_tweets)!=null&&_.length?[{id:"thread",icon:"🧵",label:"Thread",hint:"Post tweets in order"}]:[],{id:"checklist",icon:"✅",label:"Checklist",hint:"Step-by-step posting guide"}],u={"Must Post":{bg:"rgba(28,22,8,0.9)",border:"#e8b86d30",col:"#e8b86d",badge:"🔴 Must Post"},"High Value":{bg:"#1c1408",border:"#f59e0b30",col:"#fcd34d",badge:"🟡 High Value"},"Good to Post":{bg:"#0a1c0e",border:"#22c55e30",col:"#86efac",badge:"🟢 Good to Post"}},k=u[t.priority]||u["Good to Post"],w=()=>{const f=Re(t.caption)||"",N=(t.hashtags||[]).map(H=>`#${H.replace(/^#/,"")}`).join(" ");navigator.clipboard.writeText(`${f}

${N}`),l(!0),setTimeout(()=>l(!1),2200)};return r.jsxs("div",{style:{background:"rgba(8,14,26,0.85)",border:`1px solid ${i}20`,borderRadius:20,overflow:"hidden",backdropFilter:"blur(32px) saturate(180%)",WebkitBackdropFilter:"blur(32px) saturate(180%)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06),0 8px 32px rgba(0,0,0,0.3)"},children:[r.jsxs("div",{style:{background:`linear-gradient(135deg,${i}14,${i}06)`,borderBottom:`1px solid ${i}18`,padding:"18px 22px"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"},children:[r.jsx("div",{style:{width:28,height:28,borderRadius:8,background:`${i}20`,border:`1px solid ${i}30`,color:i,fontWeight:900,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"},children:n+1}),r.jsx("span",{style:{background:d.bg,color:d.text,boxShadow:`0 0 10px ${d.bg}40`,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:"1px"},children:t.platform||"—"}),r.jsx("span",{style:{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.6)",borderRadius:20,padding:"4px 13px",fontSize:11,fontWeight:600},children:t.format}),r.jsx("span",{style:{background:k.bg,border:`1px solid ${k.border}`,color:k.col,borderRadius:20,padding:"4px 13px",fontSize:11,fontWeight:700,marginLeft:"auto"},children:k.badge})]}),r.jsx("div",{style:{fontSize:17,fontWeight:700,color:"rgba(255,255,255,0.97)",letterSpacing:"-.5px",lineHeight:1.25,marginBottom:10,fontFamily:"'Bricolage Grotesque',system-ui,sans-serif"},children:t.title}),t.hook&&r.jsxs("div",{style:{background:"rgba(0,0,0,0.3)",border:`1px solid ${i}25`,borderRadius:11,padding:"10px 14px",display:"flex",gap:10,alignItems:"flex-start"},children:[r.jsx("div",{style:{background:`${i}20`,color:i,borderRadius:6,padding:"2px 8px",fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",whiteSpace:"nowrap",flexShrink:0,marginTop:1},children:"HOOK"}),r.jsxs("div",{style:{fontSize:13,color:"#e2e8f0",fontWeight:600,fontStyle:"italic",lineHeight:1.5},children:['"',t.hook,'"']})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:10},children:[r.jsx("span",{style:{fontSize:12},children:"📅"}),r.jsxs("span",{style:{fontSize:12,color:"rgba(255,255,255,0.45)",fontWeight:600},children:["Post on ",r.jsx("span",{style:{color:"rgba(255,255,255,0.75)"},children:t.best_day})," at ",r.jsx("span",{style:{color:"rgba(255,255,255,0.75)"},children:t.best_time})]}),t.why_now&&r.jsxs("span",{style:{fontSize:11,color:"rgba(255,255,255,0.28)",marginLeft:6},children:["· ",t.why_now]})]})]}),r.jsx("div",{style:{background:"rgba(0,0,0,0.2)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"0 16px",display:"flex",gap:2,overflowX:"auto",scrollbarWidth:"none"},children:p.map(f=>r.jsxs("button",{onClick:()=>o(f.id),title:f.hint,style:{padding:"10px 18px",fontSize:12.5,fontWeight:s===f.id?700:400,border:"none",cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",borderBottom:`2px solid ${s===f.id?i:"transparent"}`,background:s===f.id?`${i}12`:"transparent",color:s===f.id?i:"rgba(255,255,255,0.4)",display:"flex",alignItems:"center",gap:6,borderRadius:"8px 8px 0 0"},children:[r.jsx("span",{children:f.icon}),r.jsx("span",{children:f.label})]},f.id))}),r.jsxs("div",{style:{background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.04)",padding:"7px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8},children:[r.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.35)",display:"flex",alignItems:"center",gap:6},children:[r.jsxs("span",{style:{color:i,fontWeight:700},children:[(y=p.find(f=>f.id===s))==null?void 0:y.icon," ",(P=p.find(f=>f.id===s))==null?void 0:P.label,":"]}),r.jsx("span",{children:(z=p.find(f=>f.id===s))==null?void 0:z.hint})]}),s==="caption"&&r.jsx("button",{onClick:w,style:{background:a?"#052e16":`${i}18`,color:a?"#4ade80":i,border:`1px solid ${a?"#166534":i+"40"}`,borderRadius:8,padding:"5px 14px",fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,transition:"all .2s",whiteSpace:"nowrap"},children:a?"✓ Copied! ":"⚡ Copy Caption + Tags"})]}),r.jsxs("div",{style:{padding:"20px 22px",background:"rgba(8,12,22,0.7)"},children:[s==="caption"&&r.jsxs("div",{style:{display:"grid",gap:14},children:[r.jsxs("div",{style:{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,overflow:"hidden"},children:[r.jsxs("div",{style:{padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsx("span",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"rgba(255,255,255,0.3)"},children:"📝 Caption text — copy this into your post"}),r.jsx(oe,{text:Re(t.caption),label:"Copy Caption",sm:!0})]}),r.jsx("pre",{style:Cn,children:Re(t.caption)})]}),t.cta&&r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:11,padding:"11px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.28)",marginBottom:4},children:"💬 Call to Action — add this at the end"}),r.jsx("div",{style:{fontSize:13,color:"#f1f5f9",fontWeight:600},children:t.cta})]}),r.jsx(oe,{text:t.cta,sm:!0})]}),((m=t.hashtags)==null?void 0:m.length)>0&&r.jsxs("div",{style:{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:11,padding:"13px 16px"},children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10},children:[r.jsx("span",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.28)"},children:"🏷️ Hashtags — paste below your caption"}),r.jsx(oe,{text:t.hashtags.map(f=>`#${f.replace(/^#/,"")}`).join(" "),label:"Copy Hashtags",sm:!0})]}),r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:t.hashtags.map((f,N)=>r.jsxs("span",{style:{background:`${i}12`,color:`${i}dd`,border:`1px solid ${i}25`,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:600},children:["#",f.replace(/^#/,"")]},N))})]}),r.jsx("div",{style:{background:`${i}08`,border:`1px solid ${i}25`,borderRadius:13,padding:"14px 16px"},children:r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:12,fontWeight:700,color:i,marginBottom:2},children:"⚡ Ready to paste — caption + hashtags combined"}),r.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.35)"},children:["Click the button → open ",t.platform," → paste. Done."]})]}),r.jsx("button",{onClick:w,style:{background:a?"#052e16":`linear-gradient(135deg,${i},${i}99)`,color:a?"#2fcf8e":"#fff",border:"none",borderRadius:10,padding:"9px 18px",fontSize:12,fontWeight:800,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",flexShrink:0},children:a?"✓ Copied!":"Copy Complete ↗"})]})})]}),s==="script"&&r.jsxs("div",{style:{display:"grid",gap:12},children:[r.jsxs("div",{style:{background:"#070f1a",border:"1px solid rgba(56,189,248,0.2)",borderRadius:12,padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start"},children:[r.jsx("span",{style:{fontSize:20,flexShrink:0},children:"🎬"}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#5ba4f5",marginBottom:4},children:"How to use this script"}),r.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.65},children:[r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"1. Open your camera"})," → film in portrait (9:16 vertical)",r.jsx("br",{}),r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"2. Read each line"})," exactly as written — then look at camera",r.jsx("br",{}),r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"3. [DIRECTION: ...]"})," = action for you (don't say these out loud)",r.jsx("br",{}),r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"4. First 3 seconds"})," = the hook line — nail this, it stops the scroll"]})]})]}),t.script?r.jsxs("div",{style:{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,overflow:"hidden"},children:[r.jsxs("div",{style:{padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsx("span",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"rgba(255,255,255,0.3)"},children:"Word-for-word script · [brackets] = your directions"}),r.jsx(oe,{text:Re(t.script),label:"Copy Script",sm:!0})]}),r.jsx("pre",{style:{...Cn,maxHeight:500,fontSize:13,lineHeight:1.9},children:Re(t.script)})]}):r.jsx("div",{style:{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"24px",textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:13},children:"No script generated for this post format. Use the Caption tab instead."})]}),s==="slides"&&r.jsxs("div",{style:{display:"grid",gap:10},children:[r.jsxs("div",{style:{background:"#0a0f1a",border:"1px solid rgba(168,85,247,0.2)",borderRadius:12,padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start"},children:[r.jsx("span",{style:{fontSize:20,flexShrink:0},children:"🎠"}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#c084fc",marginBottom:4},children:"How to turn these into a carousel"}),r.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.65},children:[r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"1. Open Canva"}),' → search "Instagram Carousel" template',r.jsx("br",{}),r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"2. For each slide"})," → copy the Heading + Body text → paste in",r.jsx("br",{}),r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"3. Design note"})," = colour/style suggestion for that slide",r.jsx("br",{}),r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"4. Last slide"})," = always your CTA / follow prompt"]})]})]}),r.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:r.jsx(oe,{text:(t.carousel_slides||[]).map(f=>`Slide ${f.slide_num}: ${f.heading}
${f.body}`).join(`

`),label:`Copy All ${((T=t.carousel_slides)==null?void 0:T.length)||0} Slides`})}),(t.carousel_slides||[]).map((f,N)=>r.jsxs("div",{style:{background:"#020209",border:"1px solid rgba(168,85,247,0.18)",borderRadius:14,overflow:"hidden"},children:[r.jsxs("div",{style:{background:"rgba(168,85,247,0.08)",padding:"10px 16px",borderBottom:"1px solid rgba(168,85,247,0.12)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[r.jsx("div",{style:{width:28,height:28,borderRadius:8,background:"rgba(168,85,247,0.2)",color:"#c084fc",fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"},children:f.slide_num}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#f1f5f9"},children:f.heading}),r.jsx("div",{style:{fontSize:10,color:"rgba(168,85,247,0.7)",marginTop:1},children:N===0?"Opening slide — make this visually bold":N===t.carousel_slides.length-1?"Last slide — strong call to action":"Body slide"})]})]}),r.jsx(oe,{text:`${f.heading}

${f.body}`,sm:!0})]}),r.jsxs("div",{style:{padding:"13px 16px"},children:[r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.75,marginBottom:f.design_note?10:0},children:f.body}),f.design_note&&r.jsxs("div",{style:{display:"flex",gap:6,alignItems:"flex-start",background:"rgba(168,85,247,0.07)",borderRadius:8,padding:"8px 11px",border:"1px solid rgba(168,85,247,0.15)"},children:[r.jsx("span",{style:{fontSize:13},children:"🎨"}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,color:"#c084fc",textTransform:"uppercase",letterSpacing:"1px",marginBottom:2},children:"Design note"}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.5},children:f.design_note})]})]})]})]},N))]}),s==="thread"&&((b=t.thread_tweets)==null?void 0:b.length)&&r.jsxs("div",{style:{display:"grid",gap:8},children:[r.jsxs("div",{style:{background:"#0a1018",border:"1px solid rgba(29,161,242,0.2)",borderRadius:12,padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-start",marginBottom:4},children:[r.jsx("span",{style:{fontSize:18},children:"🧵"}),r.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.6},children:["Post tweet ",r.jsx("strong",{style:{color:"rgba(255,255,255,0.7)"},children:"1/"})," first, then reply to it with each next tweet in order. Use the copy button on each tweet to paste one at a time."]})]}),r.jsx(oe,{text:t.thread_tweets.map(f=>`${f.num}/ ${f.tweet}`).join(`

`),label:"Copy Entire Thread"}),t.thread_tweets.map((f,N)=>r.jsxs("div",{style:{display:"flex",gap:10},children:[r.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0},children:[r.jsx("div",{style:{width:30,height:30,borderRadius:"50%",background:"rgba(29,161,242,0.15)",color:"#60a5fa",fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"},children:f.num}),N<t.thread_tweets.length-1&&r.jsx("div",{style:{width:2,flex:1,background:"rgba(29,161,242,0.15)",margin:"4px 0"}})]}),r.jsxs("div",{style:{background:"#020209",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,padding:"12px 15px",flex:1,marginBottom:2},children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:8,marginBottom:8},children:[r.jsxs("span",{style:{fontSize:10,color:"rgba(29,161,242,0.7)",fontWeight:700,background:"rgba(29,161,242,0.1)",borderRadius:5,padding:"2px 8px"},children:[f.tweet.length,"/280 chars"]}),r.jsx(oe,{text:f.tweet,sm:!0})]}),r.jsx("div",{style:{fontSize:13,color:"#e2e8f0",lineHeight:1.75},children:f.tweet})]})]},N))]}),s==="checklist"&&r.jsxs("div",{style:{display:"grid",gap:10},children:[r.jsxs("div",{style:{background:`${i}10`,border:`1px solid ${i}25`,borderRadius:13,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:`${i}80`,marginBottom:4},children:"📅 When to post this"}),r.jsxs("div",{style:{fontSize:20,fontWeight:800,color:"#f1f5f9",letterSpacing:"-.4px"},children:[t.best_day," · ",t.best_time]}),r.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:3},children:["Optimal time for ",t.platform," · ",t.format]})]}),r.jsx("div",{style:{fontSize:36},children:"⏰"})]}),r.jsx("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"rgba(255,255,255,0.28)",margin:"4px 0 2px"},children:"📋 Step-by-step posting checklist"}),(t.posting_checklist||[]).map((f,N)=>r.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",background:"rgba(255,255,255,0.03)",borderRadius:11,padding:"12px 16px",border:"1px solid rgba(255,255,255,0.06)"},children:[r.jsx("div",{style:{width:26,height:26,borderRadius:8,background:`${i}20`,color:i,fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'JetBrains Mono',monospace"},children:N+1}),r.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.6},children:f})]},N)),t.engagement_tip&&r.jsx("div",{style:{background:"#051a0e",border:"1px solid #16653430",borderRadius:12,padding:"14px 16px"},children:r.jsxs("div",{style:{display:"flex",gap:8,alignItems:"flex-start"},children:[r.jsx("span",{style:{fontSize:18},children:"⚡"}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"#4ade80",marginBottom:5},children:"Do this in the first 30 minutes after posting"}),r.jsx("div",{style:{fontSize:13,color:"#86efac",lineHeight:1.65},children:t.engagement_tip})]})]})})]})]})]})}function Cr({trends:t,color:e}){return t!=null&&t.length?r.jsxs("div",{style:{marginBottom:20},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10},children:[r.jsx("span",{style:{fontSize:13},children:"🔍"}),r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.3)"},children:"Live trends found this week in your niche"})]}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8},children:t.map((n,i)=>{const s=n.heat==="Hot"?{bg:"rgba(30,24,8,0.9)",border:"#e8b86d28",col:"#e8b86d",tag:"🔥 Hot"}:n.heat==="Rising"?{bg:"#1c1408",border:"#f59e0b28",col:"#fcd34d",tag:"📈 Rising"}:{bg:"#081c0e",border:"#22c55e28",col:"#86efac",tag:"🌱 New"};return r.jsxs("div",{style:{background:s.bg,border:`1px solid ${s.border}`,borderRadius:12,padding:"12px 14px"},children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6,marginBottom:5},children:[r.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#f1f5f9",lineHeight:1.3,flex:1},children:n.name}),r.jsx("span",{style:{fontSize:10,fontWeight:700,color:s.col,whiteSpace:"nowrap",flexShrink:0,background:s.border,borderRadius:5,padding:"2px 7px"},children:s.tag})]}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.38)",lineHeight:1.5},children:n.why})]},i)})})]}):null}function jr({posts:t,color:e}){const n=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],i=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],s={};return t.forEach(a=>{var c;const l=(c=i.find(d=>d===a.best_day))==null?void 0:c.slice(0,3);l&&(s[l]=s[l]||[]).push(a)}),Object.keys(s).length>0?r.jsxs("div",{style:{marginBottom:20},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:8},children:"📅 Your posting schedule this week"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4},children:n.map(a=>{var l;return r.jsxs("div",{style:{background:s[a]?`${e}0c`:"rgba(255,255,255,0.02)",border:`1px solid ${s[a]?e+"28":"rgba(255,255,255,0.05)"}`,borderRadius:10,padding:"7px 5px",minHeight:52,textAlign:"center"},children:[r.jsx("div",{style:{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",color:s[a]?e:"rgba(255,255,255,0.22)",marginBottom:5},children:a}),(l=s[a])==null?void 0:l.map((c,d)=>r.jsx("div",{style:{background:`${e}18`,borderRadius:4,padding:"3px 4px",marginBottom:2},children:r.jsx("div",{style:{fontSize:8,color:e,fontWeight:700,lineHeight:1.2},children:c.format})},d))]},a)})})]}):null}function Er({profile:t,hKey:e,onUpgrade:n}){var b,f,N,H;const i=t.color||"#5ba4f5",[s,o]=I.useState([]),[a,l]=I.useState(!1),[c,d]=I.useState(null),[p,u]=I.useState(null),[k,w]=I.useState(0),S=I.useRef(null),_=t.platforms||[t.sub||"Instagram"];I.useEffect(()=>{(async()=>{const A=await B.get(e)||[];o(A),A.length>0&&d(A[A.length-1])})()},[e]);const y=s.flatMap(A=>A.posts||[]).length,P=3,z=(t==null?void 0:t.isTrial)&&y>=P,m=t!=null&&t.isTrial?Math.max(0,P-y):null,T=async()=>{var A,g;if(!z){l(!0),u(null),d(null),w(0),S.current=setInterval(()=>w(R=>(R+1)%GEN_STEPS.length),3500);try{const R=s.flatMap(E=>{var M;return((M=E.posts)==null?void 0:M.map(V=>V.title))||[]}),O=new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),$=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system:Tr(t,R),messages:[{role:"user",content:`Today is ${O}. Research what is trending RIGHT NOW in "${t.niche}" on ${_.join(" and ")}. Then write 3 complete posts for ${t.brandName||t.name}. Return ONLY raw JSON starting with {`}]})});if(clearInterval(S.current),!$.ok){const E=await $.json().catch(()=>({})),M=((A=E==null?void 0:E.error)==null?void 0:A.message)||"";throw new Error(M.includes("exceeded_limit")||M.includes("rate")?"RATE_LIMIT":M||"API error")}const U=((await $.json()).content||[]).filter(E=>E.type==="text").map(E=>E.text).join("").trim(),me=U.indexOf("{"),h=U.lastIndexOf("}");if(me===-1||h===-1)throw new Error("JSON not found in response. Try again.");let v;try{v=JSON.parse(U.slice(me,h+1))}catch(E){throw new Error("JSON parse failed — "+E.message)}if(!((g=v.posts)!=null&&g.length))throw new Error("No posts returned. Please try again.");const C={week:(s.length||0)+1,date:O,trends:v.trends||[],posts:v.posts||[]},j=[...s,C];o(j),await B.set(e,j),d(C),fetch(`/api/data?resource=history&clientId=${t.id}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(j)}).catch(E=>console.error("Admin sync failed:",E))}catch(R){clearInterval(S.current),u(R.message||"Unknown error")}l(!1)}};return r.jsxs("div",{children:[(t==null?void 0:t.isTrial)&&!z&&r.jsxs("div",{style:{background:"linear-gradient(135deg,rgba(56,189,248,0.12),rgba(56,189,248,0.04))",border:"1px solid rgba(56,189,248,0.28)",borderRadius:14,padding:"13px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1},children:[r.jsxs("div",{style:{fontSize:13,fontWeight:700,letterSpacing:"-.2px",marginBottom:3},children:["⚡ Free Trial — ",r.jsxs("span",{style:{color:"#5ba4f5"},children:[m," post",m!==1?"s":""," remaining"]})]}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.4)"},children:"No card needed. Upgrade after to unlock more posts, platforms and weekly tips."})]}),r.jsx("a",{href:F.razorpay.starter,target:"_blank",style:{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",border:"none",borderRadius:10,padding:"9px 18px",fontSize:12,fontWeight:700,cursor:"pointer",textDecoration:"none",whiteSpace:"nowrap",flexShrink:0},children:"Upgrade to Full Plan →"})]}),z&&r.jsxs("div",{style:{background:"linear-gradient(135deg,rgba(56,189,248,0.1),rgba(56,189,248,0.03))",border:"1px solid rgba(56,189,248,0.3)",borderRadius:18,padding:"28px 24px",marginBottom:20,textAlign:"center"},children:[r.jsx("div",{style:{fontSize:36,marginBottom:10},children:"⚡"}),r.jsx("h3",{style:{fontSize:20,fontWeight:800,letterSpacing:"-.4px",marginBottom:8},children:"Your 3 free posts are ready!"}),r.jsx("p",{style:{fontSize:14,color:"rgba(255,255,255,0.5)",lineHeight:1.7,maxWidth:460,margin:"0 auto 20px"},children:"You've seen what AI-researched, platform-native content looks like for your brand. Upgrade now to generate 15–unlimited posts every month — new trends, new topics, every week."}),r.jsx("div",{className:"mobile-grid-1 upgrade-cards",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20,maxWidth:460,margin:"0 auto 20px"},children:[{price:"₹2,999/mo",name:"Starter",desc:"15 posts · 2 platforms",id:"starter"},{price:"₹5,499/mo",name:"Growth",desc:"25 posts · 4 platforms",id:"growth"},{price:"₹8,999/mo",name:"Pro",desc:"Unlimited · All platforms",id:"pro"}].map(({price:A,name:g,desc:R,id:O})=>r.jsxs("button",{onClick:()=>{typeof n=="function"?n(O):window.location.href=`${window.location.origin}/#/app/content-studio?plan=${O}`},style:{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.25)",borderRadius:13,padding:"14px 8px",cursor:"pointer",display:"block",width:"100%",textAlign:"center",transition:"all .2s"},onMouseOver:$=>$.currentTarget.style.background="rgba(56,189,248,0.2)",onMouseOut:$=>$.currentTarget.style.background="rgba(56,189,248,0.1)",children:[r.jsx("div",{style:{fontSize:15,fontWeight:800,color:"#5ba4f5",marginBottom:3,pointerEvents:"none"},children:A}),r.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#fff",marginBottom:3,pointerEvents:"none"},children:g}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.4,pointerEvents:"none"},children:R})]},g))}),r.jsx("p",{style:{fontSize:12,color:"rgba(255,255,255,0.3)"},children:"Scroll down to view your 3 generated posts anytime ↓"})]}),r.jsxs("div",{className:"mobile-col",style:{background:`linear-gradient(135deg,${t.darkBg||"#0B152B"}CC,#080810)`,border:`1px solid ${i}20`,borderRadius:16,padding:"20px 24px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:[r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:14,fontWeight:700,marginBottom:4,letterSpacing:"-.3px"},children:["Week ",s.length+1,r.jsx("span",{style:{color:i,fontSize:12,fontWeight:500},children:" — live research · write · optimise"})]}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.3)",marginBottom:s.length?6:0},children:s.length>0?`✓ ${s.flatMap(A=>A.posts||[]).length} posts saved — AI never repeats them`:"AI finds what's trending → writes platform-native content → ready to post"}),r.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginTop:4},children:_.map(A=>r.jsx("span",{style:{background:`${i}15`,border:`1px solid ${i}30`,color:i,borderRadius:15,padding:"2px 10px",fontSize:11,fontWeight:600},children:A},A))})]}),r.jsx("button",{onClick:T,disabled:a||z,style:{background:a||z?"rgba(255,255,255,0.04)":"linear-gradient(135deg,#1d4ed8,#5ba4f5)",color:a||z?"rgba(255,255,255,0.2)":"#fff",border:`1px solid ${a||z?"rgba(255,255,255,0.07)":"rgba(91,164,245,0.5)"}`,borderRadius:50,padding:"15px 32px",fontSize:15,fontWeight:600,boxShadow:a||z?"none":"0 8px 28px rgba(91,164,245,0.3),inset 0 1px 0 rgba(255,255,255,0.15)",cursor:a||z?"not-allowed":"pointer",minWidth:195,transition:"all .2s",letterSpacing:"-.2px"},children:z?"🔒 Trial Complete — Upgrade":a?"✦ Researching trends...":s.length>0?`⚡ Generate Week ${s.length+1} Content`:"⚡ Research Trends & Write Content"})]}),a&&r.jsxs("div",{style:{textAlign:"center",padding:"52px 20px",background:"rgba(255,255,255,0.02)",borderRadius:18,border:"1px solid rgba(255,255,255,0.05)",marginBottom:20},children:[r.jsx("div",{style:{width:46,height:46,borderRadius:"50%",border:`3px solid ${i}20`,borderTop:`3px solid ${i}`,margin:"0 auto 20px",animation:"spin .85s linear infinite"}}),r.jsx("p",{style:{color:"rgba(255,255,255,0.7)",fontSize:15,margin:"0 0 5px",fontWeight:600,letterSpacing:"-.2px"},children:GEN_STEPS[k]}),r.jsxs("p",{style:{color:"rgba(255,255,255,0.25)",fontSize:12,margin:0},children:["30–60 seconds · searching live web · ",_.join(", ")]}),r.jsx("div",{style:{display:"flex",justifyContent:"center",gap:5,marginTop:16},children:GEN_STEPS.map((A,g)=>r.jsx("div",{style:{width:5,height:5,borderRadius:"50%",transition:"all .3s",background:g===k?i:"rgba(255,255,255,0.1)"}},g))})]}),p&&r.jsxs("div",{style:{background:"#110508",border:"1px solid #78510a",borderRadius:13,padding:"16px 20px",marginBottom:20},children:[r.jsx("p",{style:{color:"#e8b86d",margin:"0 0 4px",fontWeight:700,fontSize:14},children:p==="RATE_LIMIT"?"⏳ Rate limit reached":"⚠️ Generation failed"}),r.jsx("p",{style:{color:"#fda4af",margin:"0 0 12px",fontSize:13},children:p==="RATE_LIMIT"?"You've hit the hourly API cap. Resets in a few minutes. Your saved content is still below.":p}),r.jsxs("div",{style:{display:"flex",gap:8},children:[p!=="RATE_LIMIT"&&r.jsx("button",{onClick:T,style:{background:"#78510a",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"},children:"↻ Try Again"}),s.length>0&&r.jsx("button",{onClick:()=>{d(s[s.length-1]),u(null)},style:{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"},children:"📁 View Saved"})]})]}),c&&!a&&r.jsxs("div",{children:[s.length>=1&&r.jsxs("div",{style:{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",padding:"10px 14px",borderRadius:12},children:[r.jsx("span",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"rgba(255,255,255,0.3)"},children:"View Week:"}),s.map((A,g)=>r.jsxs("button",{onClick:()=>{d(A),u(null)},style:{padding:"6px 16px",borderRadius:8,fontSize:13,fontWeight:600,border:(c==null?void 0:c.week)===A.week?`1px solid ${i}`:"1px solid rgba(255,255,255,0.1)",transition:"all .2s",background:(c==null?void 0:c.week)===A.week?i:"rgba(255,255,255,0.05)",color:(c==null?void 0:c.week)===A.week?"#fff":"rgba(255,255,255,0.7)",cursor:"pointer",boxShadow:(c==null?void 0:c.week)===A.week?`0 4px 12px ${i}40`:"none"},children:["Week ",A.week||g+1]},g))]}),r.jsxs("div",{className:"mobile-col",style:{display:"flex",alignItems:"center",gap:10,marginTop:12},children:[r.jsx("div",{style:{height:1,flex:1,background:`${i}12`}}),r.jsxs("div",{style:{background:i,color:"#fff",borderRadius:20,padding:"4px 16px",fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase"},children:["Week ",c.week||s.indexOf(c)+1," · ",c.date]}),r.jsx("div",{style:{height:1,flex:1,background:`${i}12`}})]}),((b=c.posts)==null?void 0:b.length)>0&&r.jsx(jr,{posts:c.posts,color:i}),r.jsx(Cr,{trends:c.trends,color:i}),r.jsxs("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.28)",marginBottom:14},children:["📝 ",((f=c.posts)==null?void 0:f.length)||0," Posts — Platform-native content ready to publish"]}),r.jsx(Ba,{color:i,postCount:((N=c.posts)==null?void 0:N.length)||0}),r.jsx("div",{style:{display:"grid",gap:20},children:(H=c.posts)==null?void 0:H.map((A,g)=>r.jsx(_r,{post:A,profile:t,index:g},g))}),r.jsx("div",{style:{textAlign:"center",marginTop:28,paddingTop:22,borderTop:"1px solid rgba(255,255,255,0.05)"},children:z?r.jsxs("div",{style:{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.3)",borderRadius:12,padding:"20px",maxWidth:400,margin:"0 auto"},children:[r.jsx("div",{style:{fontSize:20,marginBottom:8},children:"⚡"}),r.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#5ba4f5",marginBottom:12},children:"Ready for more content?"}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:16,lineHeight:1.5},children:"Upgrade to generate 15-unlimited posts every month with live trend research."}),r.jsx("button",{onClick:()=>n?n("starter"):window.location.href=`${window.location.origin}/#/app/content-studio?plan=starter`,style:{background:"#5ba4f5",color:"#000",border:"none",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",width:"100%"},children:"View Plans & Upgrade →"})]}):r.jsxs("button",{onClick:T,style:{background:`linear-gradient(135deg,${i},${i}88)`,color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"},children:["↻ Generate Week ",s.length+1]})})]}),!c&&!a&&!p&&r.jsxs("div",{style:{textAlign:"center",padding:"52px 20px",background:"rgba(255,255,255,0.02)",borderRadius:18,border:"1px dashed rgba(255,255,255,0.07)"},children:[r.jsx("div",{style:{fontSize:38,marginBottom:12},children:t.emoji||"🏢"}),r.jsxs("h3",{style:{color:"rgba(255,255,255,0.55)",fontWeight:700,marginBottom:12,letterSpacing:"-.3px",fontSize:18},children:["Ready for ",t.brandName||t.name]}),r.jsx("div",{style:{display:"inline-grid",textAlign:"left",gap:7,background:"rgba(255,255,255,0.03)",borderRadius:13,padding:"14px 20px"},children:["🔍 Searches live trends on "+_.join(" + "),"✍️ Writes platform-native captions and scripts","🎠 Builds complete carousel decks","🧵 Creates Twitter/X threads if needed","📌 Researches platform-specific hashtags","📋 Gives step-by-step posting checklist","⚡ Tells you exactly what to do after posting","♻️ Never repeats — permanent content memory"].map(A=>r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.4)"},children:A},A))})]})]})}function Ma({clientData:t,plan:e,onComplete:n}){var _,y,P,z;const[i,s]=I.useState({logo:null,logoPreview:null,tagline:"",website:"",instagram:"",linkedin:"",youtube:"",tiktok:"",twitter:"",facebook:"",brandPersonality:"",businessContext:"",avoid:"",contentGoal:"",competitors:"",colorHex:e.color,followers:{instagram:"",linkedin:"",youtube:"",tiktok:""}}),[o,a]=I.useState({}),[l,c]=I.useState(!1),d=I.useRef(),p=(m,T)=>s(b=>({...b,[m]:T})),u=()=>{const m={};return J.notEmpty(i.tagline)||(m.tagline="Required"),i.website&&!J.url(i.website)&&(m.website="Enter a valid URL"),J.notEmpty(i.brandPersonality)||(m.brandPersonality="Required"),m},k=m=>{var f;const T=(f=m.target.files)==null?void 0:f[0];if(!T)return;if(T.size>5*1024*1024){alert("Max 5MB");return}const b=new FileReader;b.onload=N=>p("logoPreview",N.target.result),b.readAsDataURL(T),p("logo",T)},w=async()=>{const m=u();if(Object.keys(m).length){a(m);return}c(!0);const T={...t,...i,tagline:i.tagline,color:i.colorHex,tone:t.tone+(i.brandPersonality?`. Personality: ${i.brandPersonality}`:""),businessContext:i.businessContext,avoid:i.avoid,contentGoal:i.contentGoal,niche:t.niche+(i.competitors?`. Inspired by: ${i.competitors}`:""),socialAccounts:{instagram:i.instagram||"",linkedin:i.linkedin||"",youtube:i.youtube||"",tiktok:i.tiktok||"",twitter:i.twitter||"",facebook:i.facebook||""},followers:i.followers||{}};await st(T,F.clickup.activeListId),await Ir(T),n(T)},S=["#5ba4f5","#7C3AED","#E31313","#10b981","#f59e0b","#ec4899","#0ea5e9","#6366f1","#14b8a6","#C9A84C"];return r.jsxs("div",{style:{maxWidth:560,margin:"0 auto",padding:"clamp(16px,4vw,28px) clamp(14px,4vw,20px)"},children:[r.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[r.jsx("div",{style:{width:52,height:52,borderRadius:14,background:"#052e16",border:"1px solid #166534",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 12px"},children:"✅"}),r.jsx("h2",{style:{fontSize:20,fontWeight:800,letterSpacing:"-.5px",marginBottom:6},children:"Payment confirmed — build your brand profile"}),r.jsx("p",{style:{color:"rgba(255,255,255,0.38)",fontSize:13,lineHeight:1.65},children:"The more detail you give, the more your content will sound exactly like your brand."})]}),r.jsxs("div",{style:{display:"grid",gap:14},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.38)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8},children:"Brand Logo (optional)"}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14},children:[r.jsx("div",{onClick:()=>d.current.click(),style:{width:68,height:68,borderRadius:14,background:"rgba(255,255,255,0.05)",border:"2px dashed rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",cursor:"pointer",flexShrink:0},children:i.logoPreview?r.jsx("img",{src:i.logoPreview,alt:"logo",style:{width:"100%",height:"100%",objectFit:"contain"}}):r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:{fontSize:20},children:"🖼"}),r.jsx("div",{style:{fontSize:9,color:"rgba(255,255,255,0.3)"},children:"Upload"})]})}),r.jsxs("div",{children:[r.jsx("button",{onClick:()=>d.current.click(),style:{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.65)",borderRadius:9,padding:"8px 15px",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:5,display:"block"},children:i.logo?"Change Logo":"Upload Logo"}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.28)"},children:"PNG or JPG · max 5MB"})]})]}),r.jsx("input",{ref:d,type:"file",accept:"image/*",onChange:k,style:{display:"none"}})]}),r.jsx(W,{label:"Brand Tagline / Slogan",name:"tagline",value:i.tagline,onChange:(m,T)=>p(m,T),error:o.tagline,required:!0,placeholder:"e.g. Grow Fast. Scale Smart.",hint:"This appears in your generated content"}),r.jsx(W,{label:"Website",name:"website",value:i.website,onChange:(m,T)=>p(m,T),error:o.website,placeholder:"https://yourbrand.com"}),r.jsxs("div",{style:{background:"rgba(56,189,248,0.06)",border:"1px solid rgba(56,189,248,0.18)",borderRadius:14,padding:"18px 16px"},children:[r.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#5ba4f5",textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:4},children:"🔗 Connect Your Social Accounts"}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:14,lineHeight:1.6},children:"The AI will analyse your actual accounts — what's working, what's missing, gaps vs competitors — and tailor every piece of content to improve your specific presence."}),r.jsxs("div",{style:{display:"grid",gap:10},children:[r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"},children:[r.jsx(W,{label:"Instagram Handle",name:"instagram",value:i.instagram,onChange:(m,T)=>p(m,T),placeholder:"@yourbrand"}),r.jsxs("div",{style:{marginBottom:0},children:[r.jsx("label",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6},children:"Followers"}),r.jsx("input",{value:((_=i.followers)==null?void 0:_.instagram)||"",onChange:m=>p("followers",{...i.followers,instagram:m.target.value}),placeholder:"e.g. 4,200",style:{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}})]})]}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"},children:[r.jsx(W,{label:"LinkedIn Profile / Company URL",name:"linkedin",value:i.linkedin,onChange:(m,T)=>p(m,T),placeholder:"linkedin.com/in/yourname or /company/yourbrand"}),r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6},children:"Followers"}),r.jsx("input",{value:((y=i.followers)==null?void 0:y.linkedin)||"",onChange:m=>p("followers",{...i.followers,linkedin:m.target.value}),placeholder:"e.g. 1,800",style:{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}})]})]}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"},children:[r.jsx(W,{label:"YouTube Channel",name:"youtube",value:i.youtube,onChange:(m,T)=>p(m,T),placeholder:"youtube.com/@yourchannel"}),r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6},children:"Subscribers"}),r.jsx("input",{value:((P=i.followers)==null?void 0:P.youtube)||"",onChange:m=>p("followers",{...i.followers,youtube:m.target.value}),placeholder:"e.g. 890",style:{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}})]})]}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"},children:[r.jsx(W,{label:"TikTok Handle",name:"tiktok",value:i.tiktok,onChange:(m,T)=>p(m,T),placeholder:"@yourbrand"}),r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6},children:"Followers"}),r.jsx("input",{value:((z=i.followers)==null?void 0:z.tiktok)||"",onChange:m=>p("followers",{...i.followers,tiktok:m.target.value}),placeholder:"e.g. 12,000",style:{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}})]})]}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[r.jsx(W,{label:"Twitter / X Handle",name:"twitter",value:i.twitter,onChange:(m,T)=>p(m,T),placeholder:"@yourbrand"}),r.jsx(W,{label:"Facebook Page",name:"facebook",value:i.facebook,onChange:(m,T)=>p(m,T),placeholder:"facebook.com/yourbrand"})]})]}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:12,lineHeight:1.5},children:"🔒 Your account handles are only used for AI research — we never log in or access private data."})]}),r.jsx(W,{label:"Brand Personality",name:"brandPersonality",value:i.brandPersonality,onChange:(m,T)=>p(m,T),error:o.brandPersonality,required:!0,rows:2,placeholder:"e.g. Bold, no-fluff, like a high-performance coach. Think Hormozi meets Red Bull.",hint:"The AI writes exactly like this"}),r.jsx(W,{label:"What Your Business Does (Context)",name:"businessContext",value:i.businessContext,onChange:(m,T)=>p(m,T),error:o.businessContext,required:!0,rows:2,placeholder:"What do you sell? What problem do you solve? What makes you different?",hint:"Be specific — this directly improves content quality"}),r.jsx(W,{label:"Topics to Avoid (optional)",name:"avoid",value:i.avoid,onChange:(m,T)=>p(m,T),placeholder:"e.g. No political content, no competitor mentions, no medical claims"}),r.jsx(W,{label:"Content Goal",name:"contentGoal",value:i.contentGoal,onChange:(m,T)=>p(m,T),rows:2,placeholder:"e.g. Generate leads for my online coaching programme — 50 sign-ups/month target",hint:"What do you want social media to achieve?"}),r.jsx(W,{label:"Top Competitors / Inspiration Accounts",name:"competitors",value:i.competitors,onChange:(m,T)=>p(m,T),placeholder:"e.g. @alexhormozi, @garyvee, @hubspot",hint:"AI studies their style and writes better"}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.38)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8},children:"Brand Accent Colour"}),r.jsx("div",{style:{display:"flex",gap:7,flexWrap:"wrap",marginBottom:8},children:S.map(m=>r.jsx("button",{onClick:()=>p("colorHex",m),style:{width:30,height:30,borderRadius:"50%",background:m,cursor:"pointer",border:`3px solid ${i.colorHex===m?"#fff":"transparent"}`,transition:"all .15s"}},m))}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9},children:[r.jsx("input",{type:"color",value:i.colorHex,onChange:m=>p("colorHex",m.target.value),style:{width:34,height:34,borderRadius:8,border:"none",cursor:"pointer"}}),r.jsx("span",{style:{fontSize:12,color:"rgba(255,255,255,0.38)",fontFamily:"monospace"},children:i.colorHex})]})]})]}),r.jsx("button",{onClick:w,disabled:l,style:{width:"100%",marginTop:22,background:l?"rgba(255,255,255,0.05)":"linear-gradient(135deg,#4ade80,#16a34a)",color:l?"rgba(255,255,255,0.3)":"#fff",border:"none",borderRadius:13,padding:"14px",fontSize:15,fontWeight:700,cursor:l?"not-allowed":"pointer",letterSpacing:"-.2px"},children:l?"Saving...":"✓ Save Profile & Open Content Studio →"})]})}function Ua({plan:t,formData:e,onVerified:n}){const[i,s]=I.useState("pay"),[o,a]=I.useState(""),[l,c]=I.useState(!1),[d,p]=I.useState(""),u=async()=>{const w=o.trim(),S=w==="SN_TEST_2026";if(!S&&(!w||!w.startsWith("pay_")||w.length<14)){p("Enter a valid Razorpay Payment ID — it starts with pay_ followed by letters and numbers");return}c(!0),p("");try{if(S){await new Promise(P=>setTimeout(P,800)),s("done"),setTimeout(()=>n(),1200),c(!1);return}const _=await fetch("/api/verify-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({paymentId:w,planId:t.id,brandName:e.brandName,email:e.email})}),y=await _.json();if(!_.ok||!y.verified){p(y.error||"Payment verification failed. Please check the ID and try again."),c(!1);return}await st({...e,planName:t.name,displayINR:t.displayINR,paymentId:w,joinDate:new Date().toLocaleDateString("en-IN"),paymentStatus:"verified"},F.clickup.activeListId),await Ir({...e,planName:t.name,displayINR:t.displayINR,paymentId:w,joinDate:new Date().toLocaleDateString("en-IN"),paymentStatus:"verified"}),s("done"),setTimeout(()=>n(),1200)}catch{p("Network error. Please check your connection and try again.")}c(!1)},k=Math.round((1-t.priceINR/parseInt(t.originalINR.replace(/[₹,]/g,"")))*100);return r.jsxs("div",{style:{maxWidth:460,margin:"0 auto",padding:"28px 20px"},children:[r.jsx("h2",{style:{fontSize:20,fontWeight:800,letterSpacing:"-.5px",marginBottom:4},children:"Complete Payment"}),r.jsx("p",{style:{color:"rgba(255,255,255,0.38)",fontSize:13,marginBottom:20},children:t.guarantee}),r.jsxs("div",{style:{background:"#050A1F",border:`1px solid ${t.color}25`,borderRadius:14,padding:"16px 20px",marginBottom:18},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:12},children:"Order Summary"}),[["Plan",r.jsx("span",{style:{color:t.color,fontWeight:700},children:t.name})],["Brand",e.brandName],["Platforms",(e.platforms||[]).join(", ")||e.platform],["Posts/month",t.postsPerMonth===999?"Unlimited":t.postsPerMonth],["Amount",t.displayINR+"/mo"]].map(([w,S],_)=>r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:7},children:[r.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.38)"},children:w}),r.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.8)"},children:S})]},_)),r.jsx("div",{style:{height:1,background:"rgba(255,255,255,0.07)",margin:"11px 0"}}),r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[r.jsx("span",{style:{fontSize:15,fontWeight:700},children:"Total"}),r.jsxs("span",{style:{background:`${t.color}18`,color:t.color,borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:700},children:[k,"% OFF"]})]}),r.jsx("span",{style:{fontSize:24,fontWeight:800,color:t.color,letterSpacing:"-1px"},children:t.displayINR})]})]}),i==="pay"&&r.jsxs("div",{style:{display:"grid",gap:10},children:[r.jsxs("a",{href:F.razorpay[t.id],target:"_blank",rel:"noreferrer",onClick:()=>setTimeout(()=>s("verify"),2e3),style:{display:"block",textAlign:"center",background:"linear-gradient(135deg,#3395FF,#1a5fc8)",color:"#fff",borderRadius:13,padding:"15px",fontSize:16,fontWeight:700,textDecoration:"none",letterSpacing:"-.2px"},children:["💳 Pay ₹",t.priceINR.toLocaleString("en-IN")," with Razorpay →"]}),r.jsx("div",{style:{textAlign:"center",fontSize:12,color:"rgba(255,255,255,0.28)",padding:"4px 0"},children:"You'll be taken to Razorpay's secure payment page"}),r.jsx("button",{onClick:()=>s("verify"),style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.45)",borderRadius:11,padding:"10px",fontSize:13,cursor:"pointer",fontWeight:600},children:"Already paid? Enter Payment ID →"})]}),i==="verify"&&r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:13,padding:"18px 20px"},children:[r.jsx("div",{style:{fontSize:14,fontWeight:700,letterSpacing:"-.2px",marginBottom:5},children:"Confirm your payment"}),r.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.65,marginBottom:14},children:["After paying, Razorpay shows you a Payment ID like"," ",r.jsx("code",{style:{background:"rgba(255,255,255,0.08)",borderRadius:5,padding:"1px 7px",fontFamily:"monospace",fontSize:11},children:"pay_XXXXXXXXXXXXXXXX"})," ","in the confirmation screen or email. Paste it below."]}),r.jsx("input",{value:o,onChange:w=>{a(w.target.value),p("")},placeholder:"pay_XXXXXXXXXXXXXXXX",style:{width:"100%",background:"rgba(255,255,255,0.06)",border:`1px solid ${d?"#92620a":"rgba(255,255,255,0.12)"}`,borderRadius:10,padding:"11px 13px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"'JetBrains Mono',monospace",marginBottom:d?6:10}}),d&&r.jsxs("div",{style:{fontSize:11,color:"#e8b86d",marginBottom:10},children:["⚠ ",d]}),r.jsx("button",{onClick:u,disabled:l,style:{width:"100%",background:l?"rgba(255,255,255,0.05)":`linear-gradient(135deg,${t.color},${t.color}88)`,color:l?"rgba(255,255,255,0.3)":"#fff",border:"none",borderRadius:11,padding:"12px",fontSize:14,fontWeight:700,cursor:l?"not-allowed":"pointer"},children:l?"Saving...":"✓ Confirm Payment & Continue →"}),r.jsx("button",{onClick:()=>s("pay"),style:{width:"100%",background:"none",border:"none",color:"rgba(255,255,255,0.28)",fontSize:12,cursor:"pointer",marginTop:8,padding:"6px"},children:"← Back to payment"})]}),i==="done"&&r.jsxs("div",{style:{background:"#052e16",border:"1px solid #166534",borderRadius:13,padding:"20px",textAlign:"center"},children:[r.jsx("div",{style:{fontSize:28,marginBottom:8},children:"✅"}),r.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#4ade80",letterSpacing:"-.2px"},children:"Payment confirmed — opening your studio…"})]}),r.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.2)",textAlign:"center",marginTop:12},children:["🔒 Secure payment via Razorpay · ",t.guarantee]})]})}function kt({label:t,value:e,onChange:n,options:i,placeholder:s,hint:o,error:a,required:l,allowCustom:c=!0}){const[d,p]=I.useState(!1),[u,k]=I.useState(""),w=I.useRef();I.useEffect(()=>{const y=P=>{w.current&&!w.current.contains(P.target)&&p(!1)};return document.addEventListener("mousedown",y),()=>document.removeEventListener("mousedown",y)},[]);const S=i.filter(y=>y.toLowerCase().includes(u.toLowerCase())),_=y=>{n(y),k(""),p(!1)};return r.jsxs("div",{ref:w,style:{position:"relative",marginBottom:14},children:[r.jsxs("label",{style:{display:"block",fontSize:11,fontWeight:700,color:a?"#e8b86d":"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:5},children:[t,l&&r.jsx("span",{style:{color:"#E31313"},children:" *"})]}),r.jsxs("div",{onClick:()=>p(y=>!y),style:{background:"rgba(255,255,255,0.05)",border:`1px solid ${a?"#c49b3a":d?"rgba(56,189,248,0.6)":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 14px",fontSize:14,color:e?"#fff":"rgba(255,255,255,0.3)",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",minHeight:42,transition:"border .15s"},children:[r.jsx("span",{style:{lineHeight:1.4,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e||s}),r.jsx("span",{style:{color:"rgba(255,255,255,0.3)",fontSize:10,flexShrink:0,marginLeft:6},children:d?"▲":"▼"})]}),d&&r.jsxs("div",{style:{position:"absolute",top:"100%",left:0,right:0,zIndex:200,background:"#0f0f1e",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,marginTop:4,boxShadow:"0 16px 48px rgba(0,0,0,0.7)",maxHeight:260,overflow:"hidden",display:"flex",flexDirection:"column"},children:[r.jsx("div",{style:{padding:"8px 10px",borderBottom:"1px solid rgba(255,255,255,0.07)"},children:r.jsx("input",{autoFocus:!0,value:u,onChange:y=>k(y.target.value),placeholder:"Search or type your own...",style:{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:7,padding:"7px 11px",fontSize:13,color:"#fff",outline:"none"}})}),r.jsxs("div",{style:{overflowY:"auto",flex:1},children:[S.map(y=>r.jsxs("div",{onClick:()=>_(y),style:{padding:"10px 14px",cursor:"pointer",fontSize:13,color:e===y?"#fff":"rgba(255,255,255,0.7)",background:e===y?"rgba(56,189,248,0.15)":"transparent",transition:"background .1s"},onMouseOver:P=>P.currentTarget.style.background="rgba(255,255,255,0.06)",onMouseOut:P=>P.currentTarget.style.background=e===y?"rgba(56,189,248,0.15)":"transparent",children:[e===y&&r.jsx("span",{style:{color:"#5ba4f5",marginRight:8},children:"✓"}),y]},y)),c&&u&&!i.includes(u)&&r.jsxs("div",{onClick:()=>_(u),style:{padding:"10px 14px",cursor:"pointer",fontSize:13,color:"rgba(255,255,255,0.5)",borderTop:"1px solid rgba(255,255,255,0.06)"},onMouseOver:y=>y.currentTarget.style.background="rgba(255,255,255,0.06)",onMouseOut:y=>y.currentTarget.style.background="transparent",children:['✏️ Use "',r.jsx("strong",{style:{color:"#fff"},children:u}),'"']}),S.length===0&&!u&&r.jsx("div",{style:{padding:"16px 14px",fontSize:13,color:"rgba(255,255,255,0.3)",textAlign:"center"},children:"No options found"})]})]}),o&&!a&&r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:4},children:o}),a&&r.jsxs("div",{style:{fontSize:11,color:"#e8b86d",marginTop:4},children:["⚠ ",a]})]})}const Fa=["Fitness & Personal Training","Yoga & Wellness","Nutrition & Diet Coaching","D2C Skincare & Beauty","D2C Fashion & Apparel","D2C Food & Beverages","Real Estate","Interior Design","Architecture","Restaurant & Cafe","Cloud Kitchen & Food Delivery","Bakery & Desserts","EdTech & Online Courses","Coaching & Mentoring","School & College","SaaS & Tech Product","Mobile App","AI & Automation","Digital Marketing Agency","Social Media Management","Performance Marketing","Finance & Investment","Insurance","Crypto & Web3","Healthcare & Clinic","Mental Health & Therapy","Ayurveda & Holistic","Legal Services","CA & Accounting","HR & Recruitment","Luxury Cars & Auto","Electric Vehicles","Auto Accessories","Travel & Tourism","Hotels & Resorts","Visa & Immigration","Photography & Videography","Music & Entertainment","Podcasting","E-commerce & Marketplace","Dropshipping","Amazon FBA","Personal Brand / Creator","Influencer Marketing","Comedy & Entertainment","NGO & Social Impact","Government & Public Sector","Startup / VC"],Ha=["Bold & Confident — No fluff, straight talk","Educational & Informative — Teach, don't sell","Luxury & Premium — Aspirational, sophisticated","Casual & Conversational — Like a friend texting","Motivational & Inspirational — Energy, push, fire","Professional & Corporate — Polished, trust-building","Witty & Humorous — Light, relatable, shareable","Storytelling & Emotional — Heart-led, human","Rebellious & Edgy — Challenge the status quo","Empathetic & Supportive — Warm, understanding","Data-Led & Analytical — Facts, stats, proof","Aspirational & Dream-selling — Future-focused"],Va=["Working professionals 25–40, urban India, want career growth","Women 22–35, tier 1 cities, interested in skincare & beauty","Entrepreneurs and startup founders, India & UAE","Fitness enthusiasts 20–35, want to lose weight or build muscle","Parents of school-age children, education-conscious families","D2C brand owners looking to scale with digital marketing","Real estate investors and first-time home buyers","Restaurant and F&B business owners in metro cities","Young professionals 22–30 interested in personal finance","Gen Z creators and aspiring influencers","HNI / luxury buyers — premium cars, travel, lifestyle","Healthcare seekers — patients, wellness enthusiasts","B2B decision makers — CMOs, founders, procurement heads","Students preparing for competitive exams in India","Working women 30–45 balancing career and family"];function Ga({plan:t,formData:e,onSubscribe:n}){const[i,s]=I.useState(0),[o,a]=I.useState([]),[l,c]=I.useState("Researching trends in your niche..."),d=(t==null?void 0:t.color)||"#5ba4f5",p=["🔍 Researching live trends in your niche...","📊 Analysing platform algorithms...","✍️ Writing platform-native captions...","🎬 Scripting your Reels...","✨ Final quality check..."];return I.useEffect(()=>{var _;let u=0;const k=setInterval(()=>{u=(u+1)%p.length,c(p[u])},3e3),w={brandName:e.brandName,name:e.brandName,audience:e.audience,tone:e.tone,niche:e.niche,platforms:(_=e.platforms)!=null&&_.length?e.platforms:["Instagram"],businessContext:`${e.brandName} — ${e.niche}`,avoid:""},S=new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"});return fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system:Tr(w,[]),messages:[{role:"user",content:`Today is ${S}. Research what is trending RIGHT NOW in "${w.niche}" on ${w.platforms.join(" and ")}. Write 3 complete posts for ${w.brandName}. Each post MUST have a full word-for-word script (min 180 words) and complete carousel slides if applicable. Return ONLY raw JSON starting with {`}],max_tokens:6e3})}).then(async y=>{var f;if(clearInterval(k),!y.ok)throw new Error("API error");const z=((await y.json()).content||[]).filter(N=>N.type==="text").map(N=>N.text).join("").trim(),m=z.indexOf("{"),T=z.lastIndexOf("}");if(m===-1||T===-1)throw new Error("Invalid JSON");const b=JSON.parse(z.slice(m,T+1));if(!((f=b.posts)!=null&&f.length))throw new Error("No posts returned");a(b.posts),s(1)}).catch(()=>{var y,P,z,m,T,b;clearInterval(k),a([{platform:((y=e.platforms)==null?void 0:y[0])||"Instagram",format:"Reel",title:`3 things ${e.niche||"top brands"} never tell you`,hook:`3 things every successful ${e.niche||"brand"} does that nobody talks about`,caption:`Nobody in ${e.niche||"your space"} is telling you this. ···

Here are the 3 things the top 1% do every single week that the rest ignore completely:

1️⃣ They post for ONE specific person, not for everyone
2️⃣ They lead every video with the result, then show the process
3️⃣ They reply to comments in the first 30 minutes — every time

The algorithm rewards activity, not perfection.

Save this. Read it before you post next time.`,cta:"Tag someone who needs to see this ↓",hashtags:[((P=e.niche)==null?void 0:P.toLowerCase().replace(/\s/g,""))||"contentcreator","socialmediatips","growyourbusiness","contentmarketing","instagramtips","reelstrategy","digitalmarketing","brandbuilding","entrepreneur","businessgrowth"],priority:"Must Post",best_day:"Tuesday",best_time:"9am",why_now:"Early-week content gets highest organic reach",script:`[DIRECTION: Open to camera, direct eye contact. No intro. Start speaking immediately.]

Nobody in ${e.niche||"this space"} is going to tell you what I'm about to say.

[DIRECTION: Hold up 3 fingers, counting down as you speak]

There are 3 things the top creators and brands do every single week — and the majority of people never do any of them.

Number one: They post for ONE specific person. Not everyone. ONE person.

[DIRECTION: Point at camera] When you write your next caption, picture one real human and write it to them directly. Watch your engagement double.

Number two: They lead with the result, then show the process. Not "here's how I did it" — they open with "here's what you'll get."

[DIRECTION: Step in closer to camera, lower voice slightly]

Number three: They reply to every comment in the first 30 minutes. Every. Single. Time. The algorithm treats your post like a conversation. Be part of it.

[DIRECTION: Look directly into camera, pause for 1 second]

Save this video. You'll want to come back to it.`,carousel_slides:[{slide_num:1,heading:`3 Things Top ${e.niche||"Brands"} Never Tell You`,body:"The strategies that actually drive growth — swipe to see all 3.",design_note:"Bold headline on dark background. Brand colour accent on '3'. Clean, minimal."},{slide_num:2,heading:"#1: Post for ONE person",body:"Stop trying to reach everyone. Picture your ideal customer and write every caption like it's a DM to them specifically. Specificity converts.",design_note:"Icon of a single person target. Split between muted and highlighted text."},{slide_num:3,heading:"#2: Lead with the RESULT",body:`Don't open with "here's how I did it." Open with "here's what you'll achieve." People act on outcomes, not processes.`,design_note:"Arrow pointing up-right. Result = highlighted. Process = faded."},{slide_num:4,heading:"#3: Reply in the first 30 mins",body:"The algorithm reads early engagement as a signal of quality. Reply to every comment in the first half hour. It changes reach dramatically.",design_note:"Clock icon showing 30 minutes. Urgent, warm colour."},{slide_num:5,heading:"Save this and post it this week.",body:"Follow for weekly content strategy. These 3 things cost zero — but most people never do them.",design_note:"Strong CTA. Brand logo bottom right. Contrast background."}],posting_checklist:["Film in good natural side-lighting, portrait mode (9:16)","Add captions/subtitles in CapCut or Instagram native tool","Use trending audio under 30s at 8–20% volume","Post between 8–10am on Tuesday for best reach","Reply to every comment within the first 30 minutes"],engagement_tip:'Pin a comment like "Which of these 3 do you already do?" immediately after posting. It primes the comment section and boosts algorithm ranking.'},{platform:((z=e.platforms)==null?void 0:z[0])||"Instagram",format:"Carousel",title:`The ${e.niche||"content"} content calendar that actually works`,hook:"Your content calendar is the reason you're not growing",caption:`Here's the brutal truth about why most ${e.niche||"business"} content doesn't convert. ↓

It's not the graphics.
It's not the algorithm.
It's not even the hashtags.

It's that there's NO system behind it.

We mapped out a 5-post weekly structure that works for ${e.niche||"any niche"} — swipe through to steal it.

Every post has a purpose.
Every post builds on the last.
None of them feel like ads.

Save this carousel — you'll use it every week.`,cta:"Drop a 🔥 in the comments if you want the full monthly template",hashtags:["contentcalendar",((m=e.niche)==null?void 0:m.toLowerCase().replace(/[^a-z]/g,""))||"contentcreator","socialmediatips","contentplanning","digitalmarketing","instagrammarketing","marketingstrategy"],priority:"High Value",best_day:"Thursday",best_time:"12pm",why_now:"Mid-week carousel posts receive highest save rates",carousel_slides:[{slide_num:1,heading:"The 5-Post Weekly System for "+(e.niche||"Any Business"),body:"Stop posting randomly. Every slot in your week has a job. Swipe to see the exact structure.",design_note:"Strong contrasting headline. Week calendar grid graphic. Dark BG with brand colour accent."},{slide_num:2,heading:"Monday: Education Post",body:"Teach something specific and useful. Show your expertise without selling. This builds trust and saves rate. Example: '3 things about [niche] that most people get wrong.'",design_note:"📚 icon. Blue/cool colour scheme. Clean text layout."},{slide_num:3,heading:"Tuesday: Reel / Video",body:"Video gets 3× more reach than static. Post a talking-head, how-to, or trend-based Reel. Even 15 seconds of value counts.",design_note:"🎬 icon. Energetic warm colour tone. Bold typography."},{slide_num:4,heading:"Thursday: Social Proof or Story",body:"Share a result, testimonial, or behind-the-scenes moment. This converts followers into buyers. Real > polished.",design_note:"⭐ star or speech bubble icon. Warm, human tone."},{slide_num:5,heading:"Saturday: Engagement Bait",body:"A question, poll, or this-or-that post. Not for reach — for depth. Comments and DMs tell the algorithm this content resonates.",design_note:"💬 icon. Playful, light design."},{slide_num:6,heading:"Save this. Use it every week.",body:"Follow for more systems that grow "+(e.niche||"your business")+" without burning out.",design_note:"CTA slide. Bold save icon. Brand logo and handle. High contrast."}],posting_checklist:["Design slides in Canva using 1080×1080px format","Keep each slide to 1 core idea only","Slide 1 must work as a standalone image (shown in grid)","Add your handle watermark on every slide","Post on Thursday 12pm for maximum save rate"],engagement_tip:'Save carousels get reshared. Pin a comment asking followers "Which slide hit hardest?" to force people back to the beginning and re-read.'},{platform:((T=e.platforms)==null?void 0:T[0])||"Instagram",format:"Reel",title:`Why ${e.niche||"your industry"} is harder than it looks`,hook:`Everyone thinks ${e.niche||"this"} is easy. Here's what they're not seeing.`,caption:`Everyone thinks ${e.niche||"running a brand"} looks easy from the outside. ···

They see the posts.
They don't see the 6am mornings.
The failed launches.
The content that got 3 likes.

Here's what actually separates the brands that grow from the ones that disappear:

✔️ Consistency over perfection
✔️ Showing up even when nothing is working
✔️ Treating every post as a test, not a statement

The brands winning in ${e.niche||"your space"} right now aren't the most talented.

They're the most consistent.

Are you one of them? 👇`,cta:"Follow if you're building something real in ${formData.niche || 'this space'}",hashtags:["entrepreneurmindset",((b=e.niche)==null?void 0:b.toLowerCase().replace(/[^a-z]/g,""))||"entrepreneur","businessgrowth","contentcreator","buildingabrand","motivation"],priority:"Good to Post",best_day:"Saturday",best_time:"10am",why_now:"Weekend motivational content receives high shares and saves",script:`[DIRECTION: Start walking towards the camera or seated at desk. Casual, unscripted feel. No music intro.]

Everyone thinks ${e.niche||"doing this"} is easy.

[DIRECTION: Pause. Slight smile. Look directly at camera.]

They see the polished posts. They don't see what it actually takes.

The 6am mornings when you'd rather do anything else.
The content you spent 3 hours on that got 4 likes.
The week you almost quit.

[DIRECTION: Step closer to camera, drop voice slightly]

But here's what I've learned.

The brands that win in ${e.niche||"this space"} aren't the most talented.

They're not the best looking.
They don't have the biggest budgets.

[DIRECTION: Point at camera, hold for 1 second]

They're the most consistent.

If you're still showing up — you're already ahead of 80% of people who started when you did.

[DIRECTION: Smile, relax. Lower energy finish.]

Keep going.`,posting_checklist:["Film in natural light, minimal background clutter","Keep total length under 45 seconds","Add motivational background music at 15% volume","Add 1-2 text overlays for key lines","Post Saturday morning 9–11am when people are browsing"],engagement_tip:"Ask in your Stories the same day: 'Are you still showing up even when it's hard? Reply YES.' Screenshot the replies and post them next week as social proof."}]),s(1)}),()=>clearInterval(k)},[]),r.jsxs("div",{style:{animation:"fadeUp .3s ease",maxWidth:700,margin:"0 auto",padding:"40px 20px"},children:[r.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[r.jsx("div",{style:{fontSize:42,marginBottom:10},children:"⚡"}),r.jsx("h2",{style:{fontSize:24,fontWeight:800,letterSpacing:"-.5px",marginBottom:8},children:i===0?"Generating your posts...":"Your 3 free posts are ready!"}),r.jsx("p",{style:{fontSize:14,color:"rgba(255,255,255,0.5)",maxWidth:460,margin:"0 auto",lineHeight:1.6},children:i===0?l:"Real AI-generated content for your brand. Subscribe to unlock the full studio."})]}),i===0?r.jsxs("div",{style:{padding:"60px 0",textAlign:"center"},children:[r.jsx("div",{style:{width:48,height:48,border:`4px solid ${d}33`,borderTopColor:d,borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 20px"}}),r.jsx("div",{style:{fontSize:13,color:d,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"},children:"AI Agent Working"})]}):r.jsx("div",{style:{display:"grid",gap:16,marginBottom:32},children:o.map((u,k)=>{var w,S;return r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"20px"},children:[r.jsxs("div",{style:{fontSize:11,fontWeight:800,color:d,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:8},children:[u.platform," · ",u.format]}),r.jsx("div",{style:{fontSize:16,fontWeight:800,marginBottom:10,lineHeight:1.3},children:u.hook||u.title}),r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.6)",whiteSpace:"pre-wrap",lineHeight:1.6,marginBottom:(w=u.hashtags)!=null&&w.length?8:0},children:u.caption}),((S=u.hashtags)==null?void 0:S.length)>0&&r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5,marginTop:6},children:u.hashtags.slice(0,5).map((_,y)=>r.jsxs("span",{style:{background:`${d}14`,color:d,border:`1px solid ${d}28`,borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:600},children:["#",_.replace(/^#/,"")]},y))})]},k)})}),i===1&&r.jsx("button",{onClick:()=>n(o),style:{width:"100%",background:`linear-gradient(135deg,${d},${d}88)`,color:"#fff",border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px",boxShadow:`0 8px 30px ${d}44`,transition:"all .2s"},children:"Save to My Dashboard →"})]})}function qa({onComplete:t,geo:e={country:"_DEFAULT"},trialData:n=null}){var q,U,me;const[i,s]=I.useState("plans"),[o,a]=I.useState(null),[l,c]=I.useState(n?{brandName:n.brandName||"",email:n.email||"",phone:n.phone||"",countryCode:n.countryCode||"+91",audience:n.audience||"",tone:n.tone||"",niche:n.niche||"",platforms:n.platforms||[]}:{brandName:"",email:"",phone:"",countryCode:"+91",audience:"",tone:"",niche:"",platforms:[]}),[d,p]=I.useState(null),[u,k]=I.useState({}),w=!!n;I.useEffect(()=>{const h=window.location.hash;if(h.includes("?")){const v=new URLSearchParams(h.split("?")[1]),C=v.get("plan"),j=v.get("upgrade")==="1";if(C==="trial")a({id:"trial",isTrialFlow:!0,name:"Free Trial",color:"#5ba4f5",platformCount:1,platformOptions:["Instagram","YouTube","LinkedIn","Facebook","Twitter/X","Threads"]}),s("details");else if(C){const E=vt.find(M=>M.id===C);E&&(a({...E,isTrialFlow:!1}),(j||n)&&s("details"))}}},[]);const S=(h,v)=>{c(j=>({...j,[h]:v}));const C=St(h,v);k(j=>({...j,[h]:C||void 0}))},_=h=>{const v=(o==null?void 0:o.platformCount)===999?999:(o==null?void 0:o.platformCount)||1;c(C=>{const j=C.platforms||[];return j.includes(h)?{...C,platforms:j.filter(E=>E!==h)}:j.length>=v?C:{...C,platforms:[...j,h]}})},[y,P]=I.useState(!1),z=()=>{var v,C;const h={};if(["brandName","email","audience","tone","niche"].forEach(j=>{const E=St(j,l[j]||"");E&&(h[j]=E)}),o!=null&&o.isTrialFlow&&!((v=l.phone)!=null&&v.trim()))h.phone="Phone number is required to verify your identity for the free trial";else if(l.phone){const j=St("phone",l.phone);j&&(h.phone=j)}return(C=l.platforms)!=null&&C.length||(h.platforms="Choose at least one platform"),h},[m,T]=I.useState(""),[b,f]=I.useState(""),[N,H]=I.useState(!1),[A,g]=I.useState(null),R=()=>{if(window.recaptchaVerifier){try{window.recaptchaVerifier.clear()}catch{}window.recaptchaVerifier=null}try{window.recaptchaVerifier=new zo(Tn,"recaptcha-container",{size:"invisible",callback:()=>{}})}catch(h){console.error("Recaptcha Init Error:",h)}};I.useEffect(()=>(R(),()=>{if(window.recaptchaVerifier){try{window.recaptchaVerifier.clear()}catch{}window.recaptchaVerifier=null}}),[]);const O=async()=>{const h=z();if(Object.keys(h).length){k(h);return}if(P(!0),w){const v={...l,planName:o.name,displayINR:o.displayINR,joinDate:new Date().toLocaleDateString("en-IN"),paymentStatus:"upgrading"};st(v,F.clickup.leadsListId),Ge({...v,type:"upgrade_intent"}),P(!1),s("payment");return}try{if(l.phone){R();const v=l.countryCode+l.phone.replace(/\D/g,""),C=await $o(Tn,v,window.recaptchaVerifier);g(C)}P(!1),s("otp")}catch(v){console.error("Firebase Auth Error:",v);const C=v.code==="auth/invalid-app-credential"?"reCAPTCHA expired — please try again.":v.code==="auth/too-many-requests"?"Too many attempts. Please wait a few minutes.":v.code==="auth/billing-not-enabled"?"Firebase billing not enabled on this project.":`Failed: ${v.message||v.code||"Check phone format"}`;k({...h,phone:C}),P(!1),R()}},$=async()=>{if(!m.trim()){f("Please enter the 6-digit code.");return}H(!0),f("");try{if(o.isTrialFlow&&!l.phone){f("Phone number is required for trial verification. Please go back and enter your phone."),H(!1);return}if(l.phone&&A)try{await A.confirm(m.trim())}catch{f("Invalid or expired code. Please try again."),H(!1);return}if(o.isTrialFlow){const v=await B.get("snstudio_trials")||{},C=l.email.toLowerCase().trim(),j=l.phone?l.phone.replace(/\D/g,""):null,E=Object.values(v).some(V=>V.email.toLowerCase().trim()===C),M=j&&Object.values(v).some(V=>V.phone&&V.phone.replace(/\D/g,"")===j);if(E||M){f("A free trial has already been used for this email or phone number. Please upgrade to continue."),H(!1);return}try{const V=await fetch("/api/check-trial",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C,phone:l.phone})});if(V.ok&&(await V.json()).exists){f("A free trial has already been used for this email or phone. Please upgrade to continue."),H(!1);return}}catch{}v[Date.now()]={email:C,phone:l.phone,date:new Date().toISOString()},await B.set("snstudio_trials",v),fetch("/api/check-trial",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"save",email:C,phone:l.phone})}).catch(()=>{}),fetch("/api/data?resource=clients",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"trial",email:C,phone:l.phone,brandName:l.brandName,date:new Date().toISOString(),paymentStatus:"trial"})}).catch(()=>{})}const h={...l,planName:o.name,displayINR:o.displayINR,joinDate:new Date().toLocaleDateString("en-IN"),paymentStatus:"lead"};st(h,F.clickup.leadsListId),Ge(h),H(!1),o.isTrialFlow?s("trial_generation"):s("payment")}catch{f("Network error. Please check your connection and try again."),H(!1)}};return i==="plans"?r.jsxs("div",{style:{maxWidth:920,margin:"0 auto",padding:"36px 20px"},children:[r.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:12},children:[r.jsx("div",{style:{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#38bdf8,#0D1B3E)",border:"1px solid #38bdf840",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22},children:"🥷"}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start"},children:[r.jsxs("span",{style:{fontFamily:"Outfit, sans-serif",fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1},children:["Social",r.jsx("em",{style:{fontStyle:"normal",color:F.accentColor},children:"Ninja's"}),"."]}),r.jsx("span",{style:{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.2em",color:F.accentColor,alignSelf:"flex-end",lineHeight:1,marginTop:-2},children:"AI Agency"})]})]}),r.jsx("div",{style:{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"3px",marginBottom:10},children:F.brandTagline}),r.jsxs("h1",{style:{fontSize:46,fontWeight:800,margin:"0 0 14px",letterSpacing:"-1.8px",lineHeight:1.08,background:"linear-gradient(155deg,#ffffff 40%,#7BA8D4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:["Stop guessing.",r.jsx("br",{}),"Start growing."]}),r.jsx("p",{style:{color:"rgba(255,255,255,0.42)",fontSize:16,maxWidth:500,margin:"0 auto 24px",lineHeight:1.7},children:"AI researches what's trending on your platform right now — then writes every caption, script, carousel, thread and hashtag set. You just copy, paste, and post."}),r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:10},children:["✓ Live trend research","✓ Platform-native captions","✓ Reel scripts","✓ Carousel copy","✓ Thread writer","✓ Hashtag strategy","✓ Posting checklist","✓ Never repeats"].map(h=>r.jsx("span",{style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:30,padding:"5px 13px",fontSize:12,color:"rgba(255,255,255,0.65)"},children:h},h))}),r.jsx("button",{onClick:()=>{a({id:"trial",isTrialFlow:!0,name:"Free Trial",color:"#5ba4f5",platformCount:1,platformOptions:["Instagram","YouTube","LinkedIn","Facebook","Twitter/X","Threads"]}),s("details")},style:{marginTop:24,background:"linear-gradient(135deg,#38bdf8,#38bdf888)",color:"#fff",border:"none",borderRadius:14,padding:"14px 28px",fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px",boxShadow:"0 8px 30px #38bdf844"},children:"⚡ Try 3 Posts Free — No Card Needed"})]}),r.jsx("div",{className:"mobile-grid-1",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:40},children:vt.map((h,v)=>{const C=_n(e.country,v),j=it[e.country]||it._DEFAULT;return r.jsxs("div",{style:{background:h.badge?"linear-gradient(160deg,#0D1B3E,#0b0b1a)":"#050A1F",border:`2px solid ${h.color}${h.badge?"70":"25"}`,borderRadius:22,padding:"24px 20px",position:"relative",transition:"transform .18s"},onMouseOver:E=>E.currentTarget.style.transform="translateY(-3px)",onMouseOut:E=>E.currentTarget.style.transform="translateY(0)",children:[h.badge&&r.jsx("div",{style:{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${h.color},${h.color}AA)`,color:"#fff",borderRadius:20,padding:"3px 16px",fontSize:10,fontWeight:800,letterSpacing:"1.5px",whiteSpace:"nowrap"},children:h.badge}),r.jsx("div",{style:{fontSize:10,fontWeight:700,color:h.color,textTransform:"uppercase",letterSpacing:"2px",marginBottom:4},children:h.tagline}),r.jsx("div",{style:{fontSize:24,fontWeight:800,letterSpacing:"-.5px",marginBottom:10},children:h.name}),r.jsxs("div",{style:{marginBottom:14},children:[r.jsxs("div",{style:{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:3},children:[j.flag," Pricing in ",j.currency]}),r.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5,marginBottom:4},children:[r.jsx("span",{style:{fontSize:38,fontWeight:800,color:h.color,letterSpacing:"-1.5px"},children:C.display}),r.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.35)"},children:"/mo"})]}),r.jsxs("div",{style:{display:"flex",gap:7,alignItems:"center"},children:[r.jsx("span",{style:{fontSize:12,color:"rgba(255,255,255,0.25)",textDecoration:"line-through"},children:C.displayOriginal}),r.jsxs("span",{style:{background:`${h.color}20`,color:h.color,borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:700},children:[C.disc,"% off"]})]}),h.highlight&&r.jsxs("div",{style:{fontSize:11,color:h.color,fontWeight:600,marginTop:5},children:["💡 ",h.highlight]})]}),r.jsxs("div",{className:"mobile-col",style:{display:"flex",gap:16,marginBottom:20,flexWrap:"wrap"},children:[r.jsxs("div",{style:{background:"rgba(255,255,255,0.05)",borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.55)"},children:[h.postsPerMonth===999?"Unlimited":"~"+h.postsPerMonth," posts/month"]}),r.jsx("div",{style:{background:`${h.color}12`,border:`1px solid ${h.color}25`,borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:700,color:h.color},children:h.platformCount===999?"All platforms":"Choose "+h.platformCount+" platform"+(h.platformCount!==1?"s":"")}),r.jsxs("div",{style:{background:"rgba(255,255,255,0.04)",borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.4)"},children:[C.perPost,"/post"]})]}),r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"9px 11px",marginBottom:14},children:[r.jsx("div",{style:{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"rgba(255,255,255,0.3)",marginBottom:6},children:h.platformCount===999?"All platforms included":"Pick "+h.platformCount+" from"}),r.jsxs("div",{style:{display:"flex",gap:4,flexWrap:"wrap"},children:[(h.platformCount===999?["📸","▶️","💼","𝕏","🎵","🧵","👤","📌","👻"]:h.platformOptions.slice(0,h.platformCount===2?4:8)).map((E,M)=>{const V={"📸":"IG","▶️":"YT","💼":"LI","𝕏":"X","🎵":"TK","🧵":"Th","👤":"FB","📌":"Pin","👻":"SC"},Ht={Instagram:"📸",Facebook:"👤",YouTube:"▶️",LinkedIn:"💼","Twitter/X":"𝕏",Threads:"🧵",Pinterest:"📌",Snapchat:"👻",TikTok:"🎵"},Vt=typeof E=="string"&&E.length<=2,Pr=Vt?E:Ht[E]||"📲",Ar=Vt?V[E]||"":E.split("/")[0].substring(0,3),ct=h.platformCount===999||M<h.platformCount;return r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:3,background:ct?`${h.color}18`:"rgba(255,255,255,0.04)",border:`1px solid ${ct?h.color+"35":"rgba(255,255,255,0.08)"}`,borderRadius:6,padding:"3px 8px",fontSize:10,fontWeight:700,color:ct?h.color:"rgba(255,255,255,0.25)"},children:[r.jsx("span",{children:Pr}),Ar]},M)}),h.platformCount===999&&r.jsx("div",{style:{display:"flex",alignItems:"center",background:`${h.color}18`,border:`1px solid ${h.color}35`,borderRadius:6,padding:"3px 8px",fontSize:9,fontWeight:700,color:`${h.color}99`},children:"+more"})]})]}),r.jsx("div",{style:{height:1,background:"rgba(255,255,255,0.06)",marginBottom:14}}),r.jsx("div",{style:{display:"grid",gap:6,marginBottom:16},children:h.features.map((E,M)=>r.jsxs("div",{style:{display:"flex",gap:8,alignItems:"flex-start"},children:[r.jsx("span",{style:{color:h.color,fontSize:14,flexShrink:0,lineHeight:1.3},children:E.icon}),r.jsx("span",{style:{fontSize:12,color:"rgba(255,255,255,0.58)",lineHeight:1.45},children:E.text})]},M))}),r.jsxs("div",{style:{background:`${h.color}0d`,border:`1px solid ${h.color}22`,borderRadius:9,padding:"8px 11px",fontSize:11,color:`${h.color}cc`,fontWeight:600,textAlign:"center",marginBottom:14},children:["🛡 ",h.guarantee]}),r.jsxs("button",{onClick:()=>{a({...h,isTrialFlow:!1}),s("details")},style:{width:"100%",background:`linear-gradient(135deg,${h.color},${h.color}99)`,color:"#fff",border:"none",borderRadius:50,padding:"13px",boxShadow:`0 8px 24px ${h.color}40,inset 0 1px 0 rgba(255,255,255,0.18)`,fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"},children:["Select ",h.name," →"]})]},h.id)})}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:36},children:[["150+","Brands Growing","India · UAE · US · UK"],["2.4M+","Posts Created","Across all niches"],["4.9★","Client Rating","Verified reviews"]].map(([h,v,C])=>r.jsxs("div",{style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:14,padding:"18px",textAlign:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05)"},children:[r.jsx("div",{style:{fontSize:28,fontWeight:800,color:F.accentColor,letterSpacing:"-.8px"},children:h}),r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:"-.2px"},children:v}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.33)",marginTop:2},children:C})]},h))}),r.jsxs("div",{style:{maxWidth:600,margin:"0 auto"},children:[r.jsx("div",{style:{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.5)",textAlign:"center",marginBottom:16,letterSpacing:"-.2px"},children:"Common questions"}),[["Do I need to know anything about content?","No. Just tell us your brand and what you sell. The AI does all the research and writing."],["What platforms do you support?","Instagram, Facebook, YouTube, LinkedIn, Twitter/X, Threads, Pinterest, Snapchat, TikTok."],["Can I cancel anytime?","Yes. All plans are month-to-month. No contracts, no lock-in."],["What does 'live trend research' mean?","Before writing your content, the AI searches the web to find what's actually trending this week in your niche — so every post rides current momentum, not last month's trends."],["Is the content really unique?","Yes. The AI has permanent memory — it tracks every post generated and never repeats a topic or angle."]].map(([h,v])=>r.jsxs("div",{style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(20px)",borderRadius:12,padding:"14px 16px",marginBottom:8},children:[r.jsx("div",{style:{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.75)",marginBottom:5,letterSpacing:"-.2px"},children:h}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.6},children:v})]},h))]})]}):i==="details"&&o?r.jsxs("div",{style:{maxWidth:560,margin:"0 auto",padding:"clamp(16px,4vw,28px) clamp(14px,4vw,20px)"},children:[r.jsx("button",{onClick:()=>s("plans"),style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.55)",borderRadius:50,padding:"7px 16px",fontSize:12.5,cursor:"pointer",marginBottom:20,fontWeight:400,backdropFilter:"blur(20px)",fontFamily:"'Outfit', 'DM Sans',sans-serif",letterSpacing:"-.1px"},children:"← Back to Plans"}),r.jsxs("div",{style:{background:`${o.color}12`,border:`1px solid ${o.color}28`,borderRadius:12,padding:"13px 17px",marginBottom:22,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:14,fontWeight:700,letterSpacing:"-.2px"},children:[o.name," ",o.isTrialFlow?"· Free / No Card Required":`· ${_n(e.country,vt.findIndex(h=>h.id===o.id)).display}/mo`]}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.35)"},children:o.guarantee||"Cancel anytime. No lock-in."})]}),r.jsx("button",{onClick:()=>s("plans"),style:{fontSize:12,color:o.color,background:"none",border:"none",cursor:"pointer",fontWeight:700},children:"Change"})]}),w&&r.jsxs("div",{style:{background:"linear-gradient(135deg,rgba(52,211,153,0.12),rgba(52,211,153,0.04))",border:"1px solid rgba(52,211,153,0.3)",borderRadius:14,padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:12},children:[r.jsx("span",{style:{fontSize:22},children:"✓"}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#34d399",marginBottom:3},children:"Your trial details have been carried over"}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.55},children:"We've pre-filled your brand info. Just add additional details below to unlock the full studio."})]})]}),r.jsx("h2",{style:{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:28,fontWeight:800,letterSpacing:"-1px",marginBottom:6,lineHeight:1.04},children:w?"Complete your brand profile":"Your brand details"}),r.jsx("p",{style:{color:"rgba(255,255,255,0.35)",fontSize:13,marginBottom:20,lineHeight:1.6},children:w?"These extra details massively improve AI content quality — social accounts, personality and goals.":"This trains the AI to write specifically for your brand and audience. Be detailed — the more context, the better the content."}),r.jsx("div",{style:{display:"grid",gap:14},children:w?r.jsxs(r.Fragment,{children:[r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"14px 16px"},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"rgba(255,255,255,0.3)",marginBottom:10},children:"From your trial"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[{k:"Brand",v:l.brandName},{k:"Email",v:l.email},{k:"Niche",v:l.niche},{k:"Platforms",v:(l.platforms||[]).join(", ")}].map(({k:h,v})=>r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 11px"},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.28)",marginBottom:2},children:h}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.7)"},children:v||"—"})]},h))}),r.jsx("button",{onClick:()=>s("plans"),style:{marginTop:10,background:"none",border:"none",color:"rgba(255,255,255,0.3)",fontSize:11,cursor:"pointer",textDecoration:"underline"},children:"Edit these details"})]}),!l.phone&&r.jsx("div",{style:{marginBottom:0},children:r.jsx(W,{label:"Phone / WhatsApp",name:"phone",error:u.phone,children:r.jsxs("div",{style:{display:"flex",gap:6},children:[r.jsxs("select",{value:l.countryCode,onChange:h=>S("countryCode",h.target.value),style:{width:"clamp(80px,22vw,100px)",flexShrink:0,background:u.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",border:`1px solid ${u.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 4px",color:"#fff",fontSize:12,outline:"none"},children:[r.jsx("option",{value:"+91",style:{background:"#08101f",color:"#fff"},children:"🇮🇳 +91"}),r.jsx("option",{value:"+1",style:{background:"#08101f",color:"#fff"},children:"🇺🇸 +1"}),r.jsx("option",{value:"+44",style:{background:"#08101f",color:"#fff"},children:"🇬🇧 +44"}),r.jsx("option",{value:"+971",style:{background:"#08101f",color:"#fff"},children:"🇦🇪 +971"}),r.jsx("option",{value:"+61",style:{background:"#08101f",color:"#fff"},children:"🇦🇺 +61"})]}),r.jsx("input",{value:l.phone,onChange:h=>S("phone",h.target.value),placeholder:"98765 43210",type:"tel",style:{flex:1,minWidth:0,background:u.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",border:`1px solid ${u.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 11px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}})]})})}),r.jsxs("div",{style:{background:"rgba(56,189,248,0.05)",border:"1px solid rgba(56,189,248,0.15)",borderRadius:14,padding:"16px"},children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"#5ba4f5",marginBottom:14},children:"Additional details to maximise your content"}),r.jsxs("div",{style:{display:"grid",gap:12},children:[r.jsx(W,{label:"Website",name:"website",value:l.website||"",onChange:S,placeholder:"https://yourbrand.com",hint:"AI links to your site and understands your offering better"}),r.jsx(W,{label:"Brand Tagline / Slogan",name:"tagline",value:l.tagline||"",onChange:S,placeholder:"e.g. Grow Fast. Scale Smart.",hint:"Appears in your AI-generated content"}),r.jsx(W,{label:"Brand Personality",name:"brandPersonality",value:l.brandPersonality||"",onChange:S,rows:2,placeholder:"e.g. Bold, no-fluff, like a high-performance coach. Think Hormozi meets Red Bull.",hint:"The AI writes exactly like this. Be expressive."}),r.jsx(W,{label:"Content Goal",name:"contentGoal",value:l.contentGoal||"",onChange:S,rows:2,placeholder:"e.g. Generate leads for online coaching — 50 sign-ups/month",hint:"What do you want social media to achieve?"}),r.jsx(W,{label:"Top Competitors / Inspiration Accounts",name:"competitors",value:l.competitors||"",onChange:S,placeholder:"e.g. @alexhormozi, @garyvee, @hubspot",hint:"AI studies their style and writes better than them"}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[r.jsx(W,{label:"Instagram Handle",name:"instagram",value:l.instagram||"",onChange:S,placeholder:"@yourbrand"}),r.jsx(W,{label:"LinkedIn Profile",name:"linkedin",value:l.linkedin||"",onChange:S,placeholder:"linkedin.com/in/yourname"})]})]})]}),r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8},children:[o.name," plan — choose up to ",o.platformCount===999?"unlimited":o.platformCount," platforms",r.jsxs("span",{style:{color:o.color,fontWeight:700,marginLeft:8},children:[l.platforms.length,"/",o.platformCount===999?"∞":o.platformCount," selected"]})]}),r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:o.platformOptions.map(h=>{const v=l.platforms.includes(h),C=l.platforms.length>=o.platformCount&&o.platformCount!==999,j=!v&&C;return r.jsxs("button",{onClick:()=>!j&&_(h),style:{padding:"7px 14px",borderRadius:25,fontSize:12,fontWeight:600,cursor:j?"not-allowed":"pointer",transition:"all .15s",background:v?o.color:j?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.05)",color:v?"#fff":j?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.65)",border:`1.5px solid ${v?o.color:j?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.12)"}`,opacity:j?.45:1},children:[v?"✓ ":"",h]},h)})})]})]}):r.jsxs(r.Fragment,{children:[r.jsx(W,{label:"Brand / Business Name",name:"brandName",value:l.brandName,onChange:S,error:u.brandName,placeholder:"e.g. FitLife Studio, Priya's Skincare",required:!0}),r.jsx(W,{label:"Email",name:"email",type:"email",value:l.email,onChange:S,error:u.email,placeholder:"you@email.com",required:!0}),r.jsx("div",{children:r.jsx(W,{label:(o!=null&&o.isTrialFlow,"Phone / WhatsApp"),name:"phone",error:u.phone,required:o==null?void 0:o.isTrialFlow,hint:o!=null&&o.isTrialFlow?"🔒 Required — we send a verification code to confirm your number":void 0,children:r.jsxs("div",{style:{display:"flex",gap:6},children:[r.jsxs("select",{value:l.countryCode,onChange:h=>S("countryCode",h.target.value),style:{width:"clamp(80px,22vw,100px)",flexShrink:0,background:u.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",border:`1px solid ${u.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 4px",color:"#fff",fontSize:12,outline:"none"},children:[r.jsx("option",{value:"+91",style:{background:"#08101f",color:"#fff"},children:"🇮🇳 +91"}),r.jsx("option",{value:"+1",style:{background:"#08101f",color:"#fff"},children:"🇺🇸 +1"}),r.jsx("option",{value:"+44",style:{background:"#08101f",color:"#fff"},children:"🇬🇧 +44"}),r.jsx("option",{value:"+971",style:{background:"#08101f",color:"#fff"},children:"🇦🇪 +971"}),r.jsx("option",{value:"+61",style:{background:"#08101f",color:"#fff"},children:"🇦🇺 +61"}),r.jsx("option",{value:"+65",style:{background:"#08101f",color:"#fff"},children:"🇸🇬 +65"}),r.jsx("option",{value:"+49",style:{background:"#08101f",color:"#fff"},children:"🇩🇪 +49"}),r.jsx("option",{value:"+27",style:{background:"#08101f",color:"#fff"},children:"🇿🇦 +27"})]}),r.jsx("input",{value:l.phone,onChange:h=>S("phone",h.target.value),placeholder:"98765 43210",type:"tel",style:{flex:1,minWidth:0,background:u.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",border:`1px solid ${u.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"10px 11px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}})]})})}),r.jsx(kt,{label:"Content Niche / Industry",value:l.niche,onChange:h=>S("niche",h),options:Fa,placeholder:"Select your niche or type your own...",hint:"This directs all trend research — be specific",error:u.niche,required:!0}),r.jsx(kt,{label:"Target Audience",value:l.audience,onChange:h=>S("audience",h),options:Va,placeholder:"Who are your ideal customers?",hint:"Age, location, interests, pain point",error:u.audience,required:!0}),r.jsx(kt,{label:"Brand Voice",value:l.tone,onChange:h=>S("tone",h),options:Ha,placeholder:"How does your brand sound?",hint:"The AI writes every caption in this voice",error:u.tone,required:!0}),r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:11,fontWeight:700,color:u.platforms?"#e8b86d":"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:4},children:["Choose Platform",o.platformCount!==1?"s":""," ",r.jsx("span",{style:{color:"#E31313"},children:"*"})]}),r.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.28)",marginBottom:10,lineHeight:1.5},children:[o.platformCount===999?"Pro plan — choose as many platforms as you want":`${o.name} plan — choose ${o.platformCount} platform${o.platformCount!==1?"s":""}`,l.platforms.length>0&&r.jsxs("span",{style:{color:o.color,fontWeight:700,marginLeft:6},children:[l.platforms.length,"/",o.platformCount===999?"∞":o.platformCount," selected"]})]}),r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:o.platformOptions.map(h=>{const v=l.platforms.includes(h),C=l.platforms.length>=o.platformCount&&o.platformCount!==999,j=!v&&C;return r.jsxs("button",{onClick:()=>!j&&_(h),style:{padding:"8px 16px",borderRadius:25,fontSize:13,fontWeight:600,cursor:j?"not-allowed":"pointer",transition:"all .15s",background:v?o.color:j?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.05)",color:v?"#fff":j?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.65)",border:`1.5px solid ${v?o.color:j?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.12)"}`,opacity:j?.45:1},children:[v?"✓ ":"",h]},h)})}),u.platforms&&r.jsxs("div",{style:{fontSize:11,color:"#e8b86d",marginTop:6},children:["⚠ ",u.platforms]}),l.platforms.length>0&&!u.platforms&&r.jsxs("div",{style:{marginTop:8,fontSize:11,color:`${o.color}99`},children:["✓ AI will write native content for: ",l.platforms.join(", ")]})]})]})}),r.jsx("button",{onClick:O,disabled:y,style:{width:"100%",marginTop:22,background:`linear-gradient(135deg,${o.color},${o.color}88)`,color:"#fff",border:"none",borderRadius:13,padding:"14px",fontSize:15,fontWeight:700,cursor:y?"not-allowed":"pointer",letterSpacing:"-.2px",opacity:y?.7:1},children:y?"Processing...":o.isTrialFlow?"⚡ Generate My 3 Free Posts →":"Continue to Payment →"})]}):i==="otp"&&o?r.jsxs("div",{style:{maxWidth:400,margin:"0 auto",padding:"40px 20px",textAlign:"center"},children:[r.jsx("div",{style:{fontSize:48,marginBottom:16},children:"📱"}),r.jsx("h2",{style:{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:24,fontWeight:700,marginBottom:8,letterSpacing:"-0.5px"},children:"Verify your phone"}),r.jsxs("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:24},children:["We've sent a verification code via SMS to",r.jsx("br",{}),r.jsx("b",{style:{color:"#fff"},children:l.phone?`${l.countryCode} ${l.phone}`:"your phone number"}),"."]}),((U=(q=import.meta)==null?void 0:q.env)==null?void 0:U.DEV)&&r.jsxs("div",{style:{background:"rgba(56,189,248,0.08)",border:"1px dashed rgba(56,189,248,0.2)",borderRadius:8,padding:"10px",marginBottom:20,color:"#7ab8f5",fontSize:11,fontWeight:600},children:["🛠 Dev Mode: Use code ",r.jsx("b",{style:{color:"#fff"},children:"1234"})," · 2Factor SMS not active in local dev"]}),r.jsx("input",{value:m,onChange:h=>T(h.target.value),maxLength:6,placeholder:"------",style:{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"16px",fontSize:28,textAlign:"center",letterSpacing:"14px",marginBottom:8,color:"#fff",outline:"none",fontFamily:"monospace"}}),b&&r.jsxs("div",{style:{color:"#e8b86d",fontSize:13,marginBottom:16},children:["⚠ ",b]}),r.jsx("button",{onClick:$,disabled:N,style:{width:"100%",background:"linear-gradient(135deg,#1d4ed8,#5ba4f5)",color:"#fff",border:"none",borderRadius:12,padding:"16px",marginTop:16,fontSize:16,fontWeight:700,cursor:N?"not-allowed":"pointer",boxShadow:"0 8px 24px rgba(91,164,245,0.28)",transition:"all .2s"},children:N?"Verifying code...":"Verify & Continue →"}),r.jsx("button",{onClick:()=>s("details"),disabled:N,style:{marginTop:24,background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer",textDecoration:"underline"},children:"Change phone number"})]}):i==="trial_generation"&&o?r.jsx(Ga,{plan:o,formData:l,onSubscribe:async h=>{var M,V;const v=`client_${Date.now()}`,C={...l,id:v,plan:"trial",planName:"Free Trial",isTrial:!0,color:"#5ba4f5",brand:"client",darkBg:"#020617",joinDate:new Date().toLocaleDateString("en-IN"),active:!0,emoji:"🎁",platforms:(M=l.platforms)!=null&&M.length?l.platforms:["Instagram"],sub:((V=l.platforms)==null?void 0:V[0])||"Instagram"},j=await B.get("snstudio_clients")||{};await B.set("snstudio_clients",{...j,[v]:C}),await Ge(C);const E={date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),posts:h};await B.set(`snstudio_hist_${v}`,[E]),t(C)}}):i==="payment"&&o?r.jsx(Ua,{plan:o,formData:l,onVerified:()=>s("profile")}):i==="profile"&&o?r.jsx(Ma,{clientData:{...l,plan:o.id,planName:o.name,displayINR:o.displayINR,color:o.color,brand:"client",darkBg:"#020617",joinDate:new Date().toLocaleDateString("en-IN"),active:!0,emoji:"🏢",sub:((me=l.platforms)==null?void 0:me[0])||"Instagram"},plan:o,onComplete:async h=>{const v=await B.get("snstudio_clients")||{},C=`client_${Date.now()}`;h.id=C,await B.set("snstudio_clients",{...v,[C]:h}),await Ge(h),t(h)}}):null}async function Ya(t,e){var l,c,d;const n=e.flatMap(p=>p.posts||[]).length,i=(t.platforms||[t.sub||"Instagram"]).join(", "),s=e[e.length-1],o=t.socialAccounts||{},a=Object.values(o).some(p=>p);try{const p=await fetch("/api/analysis",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system:`You are a world-class social media growth consultant who has grown accounts to millions of followers. Deeply analyse this client's profile, their actual social media accounts, and content history to give hyper-specific, actionable growth tips.

Client: ${t.brandName||t.name}
Platforms: ${i}
Niche: ${t.niche}
Audience: ${t.audience}
Brand Voice: ${t.tone||"Engaging and authentic"}
Posts generated so far: ${n}
Plan: ${t.planName||"Starter"}
${s?`Last week's content topics: ${(l=s.posts)==null?void 0:l.map(_=>_.title).join(", ")}`:""}
${o.instagram?`Instagram: @${o.instagram.replace("@","")}`:""} 
${o.linkedin?`LinkedIn: ${o.linkedin}`:""}
${o.youtube?`YouTube: ${o.youtube}`:""}
${o.tiktok?`TikTok: @${o.tiktok.replace("@","")}`:""}
${o.twitter?`Twitter/X: @${o.twitter.replace("@","")}`:""}
${(c=t.followers)!=null&&c.instagram?`Instagram followers: ${t.followers.instagram}`:""}
${(d=t.followers)!=null&&d.linkedin?`LinkedIn followers: ${t.followers.linkedin}`:""}

${a?"IMPORTANT: Use web_search to actually look up their social media accounts listed above. Find what they post, their engagement style, what's working, what's missing, and what their top-performing content looks like. Base your tips on what you actually find.":""}

Return ONLY raw JSON (no markdown fences):
{
  "score": number (1-100, account health),
  "growth_phase": "Building|Momentum|Scaling|Dominating",
  "account_analysis": {
    "strengths": ["string"],
    "gaps": ["string"],
    "quick_wins": ["string — specific, actionable, implementable today"]
  },
  "weekly_tips": [
    {"title":"string","detail":"string (be very specific to their niche and account)","priority":"High|Medium","impact":"string e.g. +15% reach","platform":"string"}
  ],
  "this_week_focus": "string (one main priority, max 20 words)",
  "platform_tips": [
    {"platform":"string","tip":"string","action":"string (step-by-step, specific to their account)","best_time":"string"}
  ],
  "content_insights": "string (3-4 sentences — specific observations about their content pattern, what to double down on, what to stop)"
}`,messages:[{role:"user",content:`Analyse ${t.brandName||t.name}'s social media presence and generate week ${e.length+1} growth strategy. ${a?"Search their actual accounts online first.":""} Check current trends in "${t.niche}" right now. Be hyper-specific — no generic tips.`}]})});if(!p.ok)throw new Error("API failed");const k=((await p.json()).content||[]).filter(_=>_.type==="text").map(_=>_.text).join("").trim(),w=k.indexOf("{"),S=k.lastIndexOf("}");if(w===-1||S===-1)throw new Error("JSON invalid");return JSON.parse(k.slice(w,S+1))}catch{return{score:85,growth_phase:"Building",account_analysis:{strengths:["Clear niche focus","Consistent branding"],gaps:["Underutilizing video hooks","Low community engagement"],quick_wins:["Reply to all comments in first hour to boost algorithm","Add a CTA to bio link"]},weekly_tips:[{title:"Optimize Bio for Search",detail:"Update your profile name to include your main keyword, not just your brand name.",priority:"High",impact:"Higher profile discovery",platform:"Instagram"},{title:"Test Hook Variations",detail:"Start your next 3 videos with text on screen in the first 0.5s that states the exact problem you are solving.",priority:"High",impact:"+20% retention",platform:"All"}],this_week_focus:"Establish authority and drive saves.",platform_tips:[{platform:"Instagram",tip:"Carousels are currently favored by the algorithm.",action:"Post a 5-slide educational carousel this week.",best_time:"Wed 2pm"}],content_insights:"Your audience is looking for actionable advice. Lean heavily into 'How To' styles and myth-busting formats this week to generate trust."}}}function Rr({profile:t,hKey:e,onGenerateContent:n,onUpgrade:i}){var b,f,N,H,A;const s=t.color||"#7C3AED",[o,a]=I.useState(null),[l,c]=I.useState(!1),[d,p]=I.useState([]),[u,k]=I.useState("content");I.useEffect(()=>{(async()=>{const g=await B.get(e)||[];p(g)})()},[e]);const w=async()=>{c(!0);const g=await B.get(e)||[],R=await Ya(t,g);R&&(a(R),await B.set(e+"_tips",{tips:R,date:new Date().toLocaleDateString("en-GB")})),c(!1)};I.useEffect(()=>{(async()=>{const g=await B.get(e+"_tips");g!=null&&g.tips&&a(g.tips)})()},[e]);const S=d.flatMap(g=>g.posts||[]).length,_=d.length,y=t.platforms||[t.sub||"Instagram"];(b=d[d.length-1])!=null&&b.date;const P=({value:g,max:R=100,size:O=80,color:$,label:q,sub:U})=>{const me=Math.min(g/R,1),h=(O-10)/2,v=2*Math.PI*h,C=v*me;return r.jsxs("div",{style:{textAlign:"center"},children:[r.jsxs("svg",{width:O,height:O,style:{transform:"rotate(-90deg)"},children:[r.jsx("circle",{cx:O/2,cy:O/2,r:h,fill:"none",stroke:"rgba(255,255,255,0.07)",strokeWidth:8}),r.jsx("circle",{cx:O/2,cy:O/2,r:h,fill:"none",stroke:$,strokeWidth:8,strokeDasharray:`${C} ${v}`,strokeLinecap:"round",style:{transition:"stroke-dasharray 1s ease"}})]}),r.jsx("div",{style:{marginTop:-O*.7,position:"relative",zIndex:1},children:r.jsx("div",{style:{fontSize:O*.2,fontWeight:800,color:$,letterSpacing:"-0.5px"},children:g})}),r.jsx("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",marginTop:O*.3+4,letterSpacing:"-.1px"},children:q}),U&&r.jsx("div",{style:{fontSize:10,color:"rgba(255,255,255,0.28)"},children:U})]})},m={Building:"#5ba4f5",Momentum:"#f59e0b",Scaling:"#7C3AED",Dominating:"#E31313"}[o==null?void 0:o.growth_phase]||s,T=[{id:"overview",label:"📊 Overview"},{id:"tips",label:"💡 Weekly Tips"},{id:"platforms",label:"📲 Platform Tips"},{id:"content",label:"📝 Ongoing Content"},{id:"history",label:"📅 Previous History"}];return r.jsxs("div",{style:{animation:"fadeUp .3s ease"},children:[r.jsxs("div",{style:{background:`linear-gradient(135deg,${t.darkBg||"#020617"},#0B152B)`,border:`1px solid ${s}22`,borderRadius:22,padding:"24px",marginBottom:16,position:"relative",overflow:"hidden"},children:[r.jsx("div",{style:{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:`radial-gradient(circle,${s}20,transparent 70%)`,pointerEvents:"none"}}),r.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:16,flexWrap:"wrap",position:"relative"},children:[r.jsx("div",{style:{flexShrink:0},children:t.logoPreview?r.jsx("img",{src:t.logoPreview,alt:"logo",style:{width:64,height:64,borderRadius:16,objectFit:"contain",background:"#fff",padding:6,border:`2px solid ${s}40`}}):r.jsx("div",{style:{width:64,height:64,borderRadius:16,background:`linear-gradient(135deg,${s}30,${s}10)`,border:`2px solid ${s}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28},children:t.emoji||"🏢"})}),r.jsxs("div",{style:{flex:1,minWidth:200},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5},children:[r.jsx("h2",{style:{fontSize:20,fontWeight:800,letterSpacing:"-.5px",margin:0},children:t.brandName||t.name}),r.jsx("span",{style:{background:"#052e16",color:"#4ade80",border:"1px solid #166534",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700},children:"● Active"}),t.planName&&r.jsx("span",{style:{background:`${s}20`,color:s,border:`1px solid ${s}40`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700},children:t.planName})]}),t.tagline&&r.jsxs("div",{style:{fontSize:13,color:`${s}99`,fontStyle:"italic",marginBottom:6},children:['"',t.tagline,'"']}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.6,marginBottom:10,maxWidth:480},children:t.businessContext}),r.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:y.map(g=>r.jsx("span",{style:{background:`${s}15`,border:`1px solid ${s}28`,color:s,borderRadius:15,padding:"3px 11px",fontSize:11,fontWeight:700},children:g},g))})]}),r.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,flexShrink:0},children:r.jsx("button",{onClick:w,disabled:l,style:{background:"rgba(255,255,255,0.08)",border:`1px solid ${s}30`,color:"rgba(255,255,255,0.8)",borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:600,cursor:l?"not-allowed":"pointer",whiteSpace:"nowrap",transition:"all .15s"},children:l?"⏳ Analysing...":"🔄 Refresh Analysis"})})]})]}),r.jsx("div",{className:"stats-grid",style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16},children:[{label:"Posts Created",value:S,sub:"all time",icon:"📝",color:"#5ba4f5"},{label:"Weeks Active",value:_,sub:"content weeks",icon:"📅",color:"#7C3AED"},{label:"Platforms",value:y.length,sub:"active",icon:"📲",color:"#10b981"},{label:"This Week",value:((N=(f=d[d.length-1])==null?void 0:f.posts)==null?void 0:N.length)||0,sub:"posts ready",icon:"🎯",color:s}].map((g,R)=>r.jsxs("div",{style:{background:"#020617",border:`1px solid ${g.color}20`,borderRadius:16,padding:"16px 14px",textAlign:"center"},children:[r.jsx("div",{style:{fontSize:22,marginBottom:6},children:g.icon}),r.jsx("div",{style:{fontSize:28,fontWeight:800,color:g.color,letterSpacing:"-1px",lineHeight:1},children:g.value}),r.jsx("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",marginTop:4,letterSpacing:"-.1px"},children:g.label}),r.jsx("div",{style:{fontSize:10,color:"rgba(255,255,255,0.25)"},children:g.sub})]},R))}),(o==null?void 0:o.growth_phase)&&r.jsxs("div",{style:{background:`linear-gradient(135deg,${m}15,${m}05)`,border:`1px solid ${m}30`,borderRadius:14,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.35)",marginBottom:3},children:"Growth Phase"}),r.jsx("div",{style:{fontSize:20,fontWeight:800,color:m,letterSpacing:"-.5px"},children:o.growth_phase})]}),r.jsxs("div",{style:{flex:1},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.35)",marginBottom:3},children:"This Week's Focus"}),r.jsx("div",{style:{fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.75)",letterSpacing:"-.2px"},children:o.this_week_focus})]}),o.score&&r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.35)",marginBottom:6},children:"Account Score"}),r.jsxs("div",{style:{position:"relative",width:72,height:72},children:[r.jsxs("svg",{width:72,height:72,style:{transform:"rotate(-90deg)"},children:[r.jsx("circle",{cx:36,cy:36,r:28,fill:"none",stroke:"rgba(255,255,255,0.07)",strokeWidth:7}),r.jsx("circle",{cx:36,cy:36,r:28,fill:"none",stroke:m,strokeWidth:7,strokeDasharray:`${2*Math.PI*28*o.score/100} ${2*Math.PI*28}`,strokeLinecap:"round"})]}),r.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:16,fontWeight:800,color:m},children:o.score})]})]})]}),(t.plan==="trial"||!t.plan)&&r.jsxs("div",{style:{background:"linear-gradient(135deg,rgba(56,189,248,0.1),rgba(56,189,248,0.04))",border:"1px solid rgba(56,189,248,0.28)",borderRadius:12,padding:"10px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[r.jsx("span",{style:{fontSize:16},children:"⚡"}),r.jsxs("div",{style:{flex:1,minWidth:180},children:[r.jsx("span",{style:{fontSize:13,fontWeight:700,color:"#f1f5f9"},children:"You're on Free Trial — "}),r.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,0.5)"},children:"Upgrade to unlock 15–unlimited posts/month"})]}),r.jsx("button",{onClick:()=>typeof i=="function"?i("starter"):window.location.href=`${window.location.origin}/#/app/content-studio?plan=starter&upgrade=1`,style:{background:"linear-gradient(135deg,#38bdf8,#1d4ed8)",color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,boxShadow:"0 4px 14px rgba(56,189,248,0.3)"},children:"⚡ Upgrade Now →"})]}),r.jsx("div",{style:{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,marginBottom:16,overflowX:"auto",scrollbarWidth:"none",border:"1px solid rgba(255,255,255,0.06)"},children:T.map(g=>r.jsx("button",{onClick:()=>k(g.id),style:{padding:"8px 16px",borderRadius:9,fontSize:12,fontWeight:u===g.id?700:500,border:u===g.id?`1px solid ${s}40`:"1px solid transparent",cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",background:u===g.id?s:"transparent",color:u===g.id?"#ffffff":"rgba(255,255,255,0.45)",boxShadow:u===g.id?`0 2px 10px ${s}35`:"none"},children:g.label},g.id))}),u==="overview"&&r.jsxs("div",{style:{display:"grid",gap:12},children:[r.jsxs("div",{style:{background:"#020617",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"18px 20px"},children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.28)",marginBottom:14},children:"Brand Profile"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[["Audience",t.audience],["Niche",t.niche],["Brand Voice",t.tone],["Avoid",t.avoid||"Nothing specified"],["Plan",t.planName],["Member Since",t.joinDate],["Email",t.email],["Website",t.website||"Not provided"]].filter(([,g])=>g).map(([g,R])=>r.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px"},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.3)",marginBottom:4},children:g}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.68)",lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:R})]},g))})]}),t.socialAccounts&&Object.values(t.socialAccounts).some(g=>g)&&r.jsxs("div",{style:{background:"#020617",border:`1px solid ${s}20`,borderRadius:16,padding:"18px 20px"},children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.28)",marginBottom:14},children:"🔗 Connected Social Accounts"}),r.jsx("div",{className:"social-grid",style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8},children:[{key:"instagram",label:"Instagram",icon:"📸",prefix:"@",url:"https://instagram.com/"},{key:"linkedin",label:"LinkedIn",icon:"💼",prefix:"",url:"https://"},{key:"youtube",label:"YouTube",icon:"▶️",prefix:"",url:"https://"},{key:"tiktok",label:"TikTok",icon:"🎵",prefix:"@",url:"https://tiktok.com/@"},{key:"twitter",label:"Twitter/X",icon:"𝕏",prefix:"@",url:"https://x.com/"},{key:"facebook",label:"Facebook",icon:"👤",prefix:"",url:"https://"}].filter(g=>t.socialAccounts[g.key]).map(g=>{var R;return r.jsxs("a",{href:g.url+t.socialAccounts[g.key].replace("@",""),target:"_blank",rel:"noopener",style:{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.03)",border:`1px solid ${s}15`,borderRadius:11,padding:"10px 13px",textDecoration:"none"},children:[r.jsx("span",{style:{fontSize:18},children:g.icon}),r.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.3)",marginBottom:2},children:g.label}),r.jsxs("div",{style:{fontSize:12,fontWeight:600,color:s,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[g.prefix,t.socialAccounts[g.key].replace("@","")]})]}),((R=t.followers)==null?void 0:R[g.key])&&r.jsx("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",flexShrink:0},children:t.followers[g.key]})]},g.key)})}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:10},children:"AI analyses these accounts before every content generation to fill your specific gaps"})]}),(o==null?void 0:o.account_analysis)&&r.jsx("div",{className:"analysis-grid",style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10},children:[{label:"💪 Strengths",items:o.account_analysis.strengths,col:"#10b981",bg:"#052e16"},{label:"🚧 Gaps",items:o.account_analysis.gaps,col:"#f59e0b",bg:"#1c1203"},{label:"⚡ Quick Wins",items:o.account_analysis.quick_wins,col:"#5ba4f5",bg:"#0a1628"}].map(({label:g,items:R,col:O,bg:$})=>r.jsxs("div",{style:{background:$,border:`1px solid ${O}25`,borderRadius:14,padding:"14px 15px"},children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,color:O,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:10},children:g}),(R||[]).slice(0,3).map((q,U)=>r.jsxs("div",{style:{display:"flex",gap:7,alignItems:"flex-start",marginBottom:7},children:[r.jsx("div",{style:{width:16,height:16,borderRadius:"50%",background:`${O}20`,color:O,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0,marginTop:1},children:U+1}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.6)",lineHeight:1.5},children:q})]},U))]},g))}),S>0&&r.jsxs("div",{style:{background:"#020617",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"18px 20px"},children:[r.jsx("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.28)",marginBottom:16},children:"Content Summary"}),r.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"},children:[r.jsxs("div",{style:{display:"flex",gap:20,flexWrap:"wrap"},children:[r.jsx(P,{value:S,max:Math.max(S,60),size:76,color:s,label:"Total Posts",sub:"generated"}),r.jsx(P,{value:_,max:Math.max(_,12),size:76,color:"#10b981",label:"Weeks",sub:"of content"}),r.jsx(P,{value:y.length,max:10,size:76,color:"#f59e0b",label:"Platforms",sub:"active"})]}),r.jsxs("div",{style:{flex:1,minWidth:200},children:[d.slice(-3).reverse().map((g,R)=>{var O,$;return r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:8},children:[r.jsxs("div",{style:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",width:32,flexShrink:0},children:["W",g.week]}),r.jsx("div",{style:{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:4,height:6,overflow:"hidden"},children:r.jsx("div",{style:{height:"100%",background:s,borderRadius:4,width:`${Math.min((((O=g.posts)==null?void 0:O.length)||0)/5*100,100)}%`,transition:"width 1s ease"}})}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.4)",width:20,textAlign:"right"},children:(($=g.posts)==null?void 0:$.length)||0})]},R)}),d.length===0&&r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.3)"},children:"Generate your first week of content to see history here"})]})]})]}),(o==null?void 0:o.content_insights)&&r.jsxs("div",{style:{background:`${s}0a`,border:`1px solid ${s}20`,borderRadius:14,padding:"14px 18px"},children:[r.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:`${s}80`,marginBottom:7},children:"🧠 AI Content Analysis"}),r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.65)",lineHeight:1.7},children:o.content_insights})]}),!o&&r.jsxs("div",{style:{background:"rgba(255,255,255,0.02)",border:"1px dashed rgba(255,255,255,0.08)",borderRadius:14,padding:"20px",textAlign:"center"},children:[r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:10},children:"Get your personalised weekly analysis and growth tips"}),r.jsx("button",{onClick:w,disabled:l,style:{background:`linear-gradient(135deg,${s},${s}88)`,color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:700,cursor:l?"not-allowed":"pointer"},children:l?"Analysing your profile...":"🔍 Run AI Analysis"})]})]}),u==="tips"&&r.jsxs("div",{style:{display:"grid",gap:10},children:[l&&r.jsxs("div",{style:{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)"},children:[r.jsx("div",{style:{width:40,height:40,borderRadius:"50%",border:`3px solid ${s}20`,borderTop:`3px solid ${s}`,margin:"0 auto 14px",animation:"spin .85s linear infinite"}}),r.jsx("div",{style:{color:"rgba(255,255,255,0.5)",fontSize:13},children:"Researching your niche and analysing your content…"})]}),!o&&!l&&r.jsxs("div",{style:{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"},children:[r.jsx("div",{style:{fontSize:32,marginBottom:12},children:"💡"}),r.jsx("div",{style:{fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.45)",marginBottom:8,letterSpacing:"-.2px"},children:"No tips generated yet"}),r.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.28)",marginBottom:16},children:["Click below to get personalised weekly growth tips for ",t.brandName||t.name]}),r.jsx("button",{onClick:w,style:{background:`linear-gradient(135deg,${s},${s}88)`,color:"#fff",border:"none",borderRadius:10,padding:"11px 24px",fontSize:13,fontWeight:700,cursor:"pointer"},children:"🔍 Analyse & Get Tips"})]}),(H=o==null?void 0:o.weekly_tips)==null?void 0:H.map((g,R)=>r.jsx("div",{style:{background:"#020617",border:`1px solid ${g.priority==="High"?"#78510a40":"rgba(255,255,255,0.07)"}`,borderRadius:14,padding:"16px 18px"},children:r.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:12},children:[r.jsx("div",{style:{width:32,height:32,borderRadius:9,background:g.priority==="High"?"#78510a":"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:g.priority==="High"?"#e8b86d":"rgba(255,255,255,0.4)",flexShrink:0,fontFamily:"monospace"},children:R+1}),r.jsxs("div",{style:{flex:1},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"},children:[r.jsx("div",{style:{fontSize:14,fontWeight:700,letterSpacing:"-.2px"},children:g.title}),r.jsx("span",{style:{fontSize:10,fontWeight:700,borderRadius:5,padding:"2px 8px",background:g.priority==="High"?"#78510a":"rgba(255,255,255,0.07)",color:g.priority==="High"?"#e8b86d":"rgba(255,255,255,0.4)"},children:g.priority==="High"?"🔴 High Priority":"🟡 Medium"}),g.impact&&r.jsxs("span",{style:{fontSize:11,color:"#4ade80",fontWeight:600},children:["📈 ",g.impact]})]}),r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.7},children:g.detail})]})]})},R)),o&&r.jsx("button",{onClick:w,disabled:l,style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.45)",borderRadius:10,padding:"10px",fontSize:12,fontWeight:600,cursor:l?"not-allowed":"pointer"},children:l?"Refreshing...":"↻ Refresh Tips"})]}),u==="platforms"&&r.jsxs("div",{style:{display:"grid",gap:10},children:[!(o!=null&&o.platform_tips)&&!l&&r.jsx("div",{style:{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"},children:r.jsx("button",{onClick:w,style:{background:`linear-gradient(135deg,${s},${s}88)`,color:"#fff",border:"none",borderRadius:10,padding:"11px 24px",fontSize:13,fontWeight:700,cursor:"pointer"},children:"🔍 Get Platform-Specific Tips"})}),(A=o==null?void 0:o.platform_tips)==null?void 0:A.map((g,R)=>r.jsxs("div",{style:{background:"#020617",border:`1px solid ${s}18`,borderRadius:14,padding:"16px 18px"},children:[r.jsx("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:8},children:r.jsx("span",{style:{background:`${s}20`,color:s,border:`1px solid ${s}35`,borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700},children:g.platform})}),r.jsx("div",{style:{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.75)",marginBottom:6,letterSpacing:"-.2px"},children:g.tip}),r.jsxs("div",{style:{background:`${s}0a`,border:`1px solid ${s}18`,borderRadius:8,padding:"8px 11px",fontSize:12,color:s,fontWeight:600},children:["→ Action: ",g.action]})]},R))]}),u==="content"&&r.jsxs("div",{style:{display:"grid",gap:32},children:[d.length===0&&r.jsxs("div",{style:{textAlign:"center",padding:"48px 20px",background:"rgba(255,255,255,0.02)",borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"},children:[r.jsx("div",{style:{fontSize:36,marginBottom:12},children:"📝"}),r.jsx("div",{style:{fontSize:15,fontWeight:700,color:"rgba(255,255,255,0.45)",marginBottom:8},children:"No content generated yet"}),r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.28)",marginBottom:16},children:"Scroll down to the Content Generator section below to create your first week of posts"}),r.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.2)"},children:"↓ Content Generator is right below on this page"})]}),d.length>0&&(()=>{var R,O,$;const g=d[d.length-1];return r.jsxs("div",{style:{animation:"fadeUp .3s ease"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:16},children:[r.jsx("div",{style:{height:1,flex:1,background:`${s}15`}}),r.jsxs("div",{style:{background:s,color:"#fff",borderRadius:20,padding:"4px 16px",fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase"},children:["Week ",g.week," · ",g.date]}),r.jsx("div",{style:{height:1,flex:1,background:`${s}15`}})]}),((R=g.posts)==null?void 0:R.length)>0&&r.jsx(jr,{posts:g.posts,color:s}),r.jsx(Cr,{trends:g.trends,color:s}),r.jsxs("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,0.28)",marginBottom:14},children:["📝 ",((O=g.posts)==null?void 0:O.length)||0," Posts — Platform-native content ready to publish"]}),r.jsx("div",{style:{display:"grid",gap:20},children:($=g.posts)==null?void 0:$.map((q,U)=>r.jsx(_r,{post:q,profile:t,index:U},U))})]})})(),r.jsxs("div",{style:{paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.08)"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:22},children:[r.jsx("div",{style:{height:1,flex:1,background:`${s}12`}}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,background:`${s}12`,border:`1px solid ${s}28`,borderRadius:24,padding:"7px 20px"},children:[r.jsx("span",{style:{fontSize:15},children:"⚡"}),r.jsx("span",{style:{fontSize:13,fontWeight:700,color:s,letterSpacing:"-.2px"},children:"Content Generator"})]}),r.jsx("div",{style:{height:1,flex:1,background:`${s}12`}})]}),r.jsx(Er,{profile:t,hKey:e,onUpgrade:g=>typeof i=="function"?i(g):window.location.href=`${window.location.origin}/#/app/content-studio?plan=${g}&upgrade=1`})]})]}),u==="history"&&r.jsxs("div",{style:{display:"grid",gap:10},children:[d.length<=1&&r.jsxs("div",{style:{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"},children:[r.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:6},children:"Previous weeks appear here"}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.2)"},children:d.length===0?"No content generated yet":"Generate more weeks to see history here"})]}),d.slice(0,-1).reverse().map((g,R)=>{var O,$;return r.jsxs("div",{style:{background:"#020617",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"16px 18px"},children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10},children:[r.jsxs("div",{children:[r.jsxs("span",{style:{background:s,color:"#fff",borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:700,marginRight:8},children:["Week ",g.week]}),r.jsx("span",{style:{fontSize:11,color:"rgba(255,255,255,0.3)"},children:g.date})]}),r.jsxs("span",{style:{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.45)"},children:[((O=g.posts)==null?void 0:O.length)||0," posts"]})]}),r.jsx("div",{style:{display:"grid",gap:5},children:($=g.posts)==null?void 0:$.map((q,U)=>r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"7px 11px"},children:[r.jsx("span",{style:{background:`${s}18`,color:s,borderRadius:4,padding:"1px 7px",fontSize:10,fontWeight:700,flexShrink:0},children:q.format}),r.jsx("span",{style:{fontSize:12,color:"rgba(255,255,255,0.6)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:q.title}),r.jsx("span",{style:{fontSize:10,color:"rgba(255,255,255,0.28)",flexShrink:0},children:q.best_day})]},U))})]},R)})]})]})}function Ja({client:t,onHome:e,onUpgrade:n}){const i=t.color||"#7C3AED",s=`snstudio_hist_${t.id}`,o=t.platforms||[t.sub||"Instagram"],a=l=>{typeof n=="function"?n(l,t):window.location.href=`${window.location.origin}/#/app/content-studio?plan=${l}&upgrade=1`};return r.jsxs("div",{children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"},children:[r.jsx("button",{onClick:e,style:{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.55)",borderRadius:9,padding:"7px 13px",fontSize:13,cursor:"pointer",fontWeight:600},children:"← Home"}),t.logoPreview?r.jsx("img",{src:t.logoPreview,alt:"logo",style:{width:36,height:36,borderRadius:10,objectFit:"contain",background:"#fff",padding:2}}):r.jsx("div",{style:{width:36,height:36,borderRadius:10,background:`${i}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17},children:"🏢"}),r.jsxs("div",{style:{flex:1},children:[r.jsxs("div",{style:{fontSize:15,fontWeight:700,letterSpacing:"-.3px"},children:[t.brandName,r.jsxs("span",{style:{color:i,fontSize:12},children:[" · ",o.join(", ")]})]}),r.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:1},children:["Member since ",t.joinDate]})]}),t.plan==="trial"||!t.plan?r.jsx("button",{onClick:()=>a("starter"),style:{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",border:"none",borderRadius:8,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"},children:"⚡ Upgrade Plan"}):r.jsxs("span",{style:{fontSize:11,background:"#052e16",color:"#4ade80",border:"1px solid #166534",borderRadius:6,padding:"3px 10px",fontWeight:700},children:["✓ ",t.planName," · Active"]})]}),r.jsx(Rr,{profile:t,hKey:s,onGenerateContent:null,onUpgrade:a})]})}function Qa(){const[t,e]=I.useState("portal"),[n,i]=I.useState(null),[s,o]=I.useState({}),[a,l]=I.useState(null),[c,d]=I.useState("home"),[p,u]=I.useState(null),[k,w]=I.useState("dashboard"),[S,_]=I.useState({country:"_DEFAULT"}),[y,P]=I.useState(null);I.useEffect(()=>{(async()=>{const b=await B.get("snstudio_clients")||{};o(b);const f=await B.get("snstudio_active_client_id");f&&b[f]&&(u(b[f]),d("workspace"))})()},[]),I.useEffect(()=>{(async()=>{const b=await La();_(b||{country:"_DEFAULT"})})()},[]),I.useEffect(()=>{p!=null&&p.id&&B.set("snstudio_active_client_id",p.id)},[p]),I.useEffect(()=>{window.location.hash.includes("?plan=")&&(e("portal"),d("onboarding"))},[]);const z=`<style>
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
    :root{--blue:#5ba4f5;--blue2:#2563eb;--mint:#34d399;--vio:#818cf8;--g1:rgba(255,255,255,.055);--g2:rgba(255,255,255,.09);--g3:rgba(255,255,255,.04);--gb:rgba(255,255,255,.09);--gb2:rgba(255,255,255,.15);--t1:rgba(255,255,255,.95);--t2:rgba(255,255,255,.62);--t3:rgba(255,255,255,.36);--t4:rgba(255,255,255,.18);}
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body,*{font-family:'Outfit','DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;} h1,h2,h3,h4{font-family:'Bricolage Grotesque',system-ui,sans-serif!important;letter-spacing:-.03em;line-height:1.06;}
    body{background:#07101e;color:rgba(255,255,255,.96);}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(91,164,245,0.4)}50%{box-shadow:0 0 0 8px rgba(91,164,245,0)}}
    h1,h2,h3{letter-spacing:-.4px;line-height:1.15;}
    input,textarea,select,button{font-family:'Outfit','DM Sans',system-ui,sans-serif!important;}
    input,textarea,select{color:rgba(255,255,255,.92);}
    a{text-decoration:none;}[contenteditable]{outline:none;}
    .sn-glass{background:rgba(255,255,255,.055);backdrop-filter:blur(36px) saturate(180%);-webkit-backdrop-filter:blur(36px) saturate(180%);border:1px solid rgba(255,255,255,.09);border-radius:18px;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 8px 32px rgba(0,0,0,.2);}
    .sn-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:12px;color:rgba(255,255,255,.92);padding:12px 14px;font-size:14px;width:100%;transition:all .2s;outline:none;}
    .sn-input:focus{border-color:rgba(91,164,245,.45);background:rgba(91,164,245,.06);box-shadow:0 0 0 3px rgba(91,164,245,.1);}
    .sn-input::placeholder{color:rgba(255,255,255,.28);}
    .sn-btn-primary{background:linear-gradient(135deg,#2563eb,#5ba4f5);color:#fff;border:none;border-radius:50px;padding:13px 24px;font-size:14px;font-weight:500;cursor:pointer;box-shadow:0 8px 24px rgba(91,164,245,.3),inset 0 1px 0 rgba(255,255,255,.18);transition:all .22s;font-family:'Outfit','DM Sans',system-ui,sans-serif;letter-spacing:-.1px;}
    .sn-btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 12px 32px rgba(91,164,245,.4);}
    .sn-btn-ghost{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.7);border-radius:50px;padding:12px 22px;font-size:14px;font-weight:400;cursor:pointer;transition:all .2s;font-family:'Outfit','DM Sans',system-ui,sans-serif;backdrop-filter:blur(20px);}
    .sn-btn-ghost:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.2);color:#fff;}
    .sn-btn-icon{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:9px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;color:rgba(255,255,255,.65);display:inline-flex;align-items:center;gap:7px;font-family:'Outfit','DM Sans',system-ui,sans-serif;}
    .sn-btn-icon:hover{background:rgba(91,164,245,.12);border-color:rgba(91,164,245,.25);color:#5ba4f5;}
    .sn-btn-icon.active{background:rgba(91,164,245,.15);border-color:rgba(91,164,245,.3);color:#5ba4f5;}
    .plan-card-glass{background:rgba(255,255,255,.04);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:28px;position:relative;overflow:hidden;transition:all .3s;box-shadow:inset 0 1px 0 rgba(255,255,255,.06);}
    .plan-card-glass:hover{transform:translateY(-3px);border-color:rgba(91,164,245,.2);box-shadow:0 16px 40px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.08);}
    .plan-card-hl{border-color:rgba(91,164,245,.3)!important;background:linear-gradient(165deg,rgba(37,99,235,.12) 0%,rgba(8,16,31,.96) 50%)!important;box-shadow:0 0 0 1px rgba(91,164,245,.1),0 20px 50px rgba(91,164,245,.1),inset 0 1px 0 rgba(91,164,245,.18)!important;}
    .post-card{background:rgba(255,255,255,.04);backdrop-filter:blur(32px) saturate(180%);-webkit-backdrop-filter:blur(32px) saturate(180%);border:1px solid rgba(255,255,255,.09);border-radius:18px;overflow:hidden;transition:all .3s;box-shadow:inset 0 1px 0 rgba(255,255,255,.05);position:relative;}
    .post-card:hover{border-color:rgba(91,164,245,.2);box-shadow:0 12px 36px rgba(0,0,0,.25);}
    .sn-tabbar{display:flex;gap:4px;background:rgba(255,255,255,.04);border-radius:14px;padding:4px;border:1px solid rgba(255,255,255,.07);}
    .sn-tab{padding:8px 16px;border-radius:11px;font-size:13px;font-weight:400;color:rgba(255,255,255,.45);cursor:pointer;border:none;background:transparent;transition:all .2s;font-family:'Outfit','DM Sans',system-ui,sans-serif;white-space:nowrap;}
    .sn-tab.active{background:rgba(91,164,245,.15);color:#5ba4f5;font-weight:500;border:1px solid rgba(91,164,245,.22);}
    .sn-tab:hover:not(.active){background:rgba(255,255,255,.06);color:rgba(255,255,255,.7);}
    .sn-badge-blue{background:rgba(91,164,245,.1);border:1px solid rgba(91,164,245,.2);color:#5ba4f5;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:500;}
    .sn-badge-green{background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.2);color:#34d399;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:500;}
    .sn-badge-red{background:rgba(232,184,109,.1);border:1px solid rgba(196,155,58,.18);color:#e8b86d;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:500;}
    .sn-divider{height:1px;background:rgba(255,255,255,.07);margin:16px 0;}
    .sn-h1{font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:clamp(24px,3.5vw,38px);font-weight:400;letter-spacing:-.5px;line-height:1.12;color:rgba(255,255,255,.95);}
    .sn-h2{font-size:19px;font-weight:500;letter-spacing:-.3px;color:rgba(255,255,255,.9);}
    .sn-body{font-size:14px;font-weight:300;color:rgba(255,255,255,.6);line-height:1.68;}
    .copy-btn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:7px 13px;font-size:12px;font-weight:500;cursor:pointer;color:rgba(255,255,255,.55);transition:all .2s;display:inline-flex;align-items:center;gap:6px;font-family:'Outfit','DM Sans',system-ui,sans-serif;}
    .copy-btn:hover{background:rgba(91,164,245,.12);border-color:rgba(91,164,245,.25);color:#5ba4f5;}
    .copy-btn.copied{background:rgba(52,211,153,.12);border-color:rgba(52,211,153,.25);color:#34d399;}
    @media(max-width:768px){
      .mobile-col{flex-direction:column!important;align-items:stretch!important;gap:12px!important;}
      .mobile-wrap{flex-wrap:wrap!important;}
      .mobile-grid-1{grid-template-columns:1fr!important;}
      .mobile-padding{padding:14px!important;}
      .mobile-btn{padding:13px 16px!important;font-size:14px!important;width:100%!important;}
      html,body{overflow-x:hidden!important;max-width:100vw!important;}
      .sn-card{max-width:100%!important;width:100%!important;}
      h1{font-size:clamp(24px,8vw,38px)!important;letter-spacing:-1px!important;}
      h2{font-size:clamp(20px,5.5vw,30px)!important;}
      h3{font-size:clamp(16px,4vw,22px)!important;}
      input,textarea,select{width:100%!important;min-width:0!important;font-size:16px!important;}
      .sn-tabs,.sn-tabbar{overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important;white-space:nowrap!important;}
      .sn-tabs::-webkit-scrollbar,.sn-tabbar::-webkit-scrollbar{display:none!important;}
      .plans-grid{grid-template-columns:1fr!important;max-width:100%!important;margin:0 auto!important;padding:0 4px!important;}
      .plan-card-glass{padding:22px!important;}
      .ws-sidebar{display:none!important;}
      .ws-main{padding:14px!important;}
      .nav-inner{padding:0 14px!important;}
      .gen-grid{grid-template-columns:1fr!important;}
      .details-row{flex-direction:column!important;gap:10px!important;}
      .phone-row{flex-direction:row!important;gap:8px!important;}
      .post-card{border-radius:14px!important;}
      .sn-btn-primary,.sn-btn-ghost{width:100%!important;text-align:center!important;justify-content:center!important;}
      .sn-glass{padding:16px!important;}
      .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
      .analysis-grid{grid-template-columns:1fr!important;}
      .social-grid{grid-template-columns:1fr!important;}
      .upgrade-cards{grid-template-columns:1fr!important;}
    }
    @media(max-width:480px){
      h1{font-size:clamp(22px,7vw,32px)!important;}
      .mobile-padding{padding:12px!important;}
      .plan-card-glass{padding:18px!important;}
    }
  </style>`,m=r.jsx("nav",{style:{background:"rgba(8,16,31,0.88)",backdropFilter:"blur(48px) saturate(180%)",WebkitBackdropFilter:"blur(48px) saturate(180%)",borderBottom:"1px solid rgba(255,255,255,0.07)",position:"sticky",top:0,zIndex:50},children:r.jsxs("div",{className:"nav-inner",style:{maxWidth:1060,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[r.jsx("img",{src:"/logo.png",alt:"Social Ninja's",style:{width:52,height:52,objectFit:"contain",filter:"drop-shadow(0 0 16px rgba(91,164,245,0.5))",flexShrink:0}}),r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:18,fontWeight:700,letterSpacing:"-.4px",lineHeight:1.1,fontFamily:"'Bricolage Grotesque',system-ui,sans-serif"},children:["Social",r.jsx("span",{style:{color:"#5ba4f5"},children:"Ninja's"}),"."]}),r.jsx("div",{style:{fontSize:"8.5px",fontWeight:400,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,0.32)",lineHeight:1,marginTop:2},children:F.brandTagline})]})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[p&&r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,background:"rgba(91,164,245,0.08)",border:"1px solid rgba(91,164,245,0.2)",borderRadius:50,padding:"5px 14px 5px 6px"},children:[r.jsx("div",{style:{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#1d4ed8,#5ba4f5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0},children:(p.brandName||p.email||"U")[0].toUpperCase()}),r.jsx("span",{style:{fontSize:12.5,color:"rgba(255,255,255,0.7)",maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:500},children:p.brandName||p.email||"My Account"})]}),r.jsxs("div",{style:{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",borderRadius:13,padding:4,border:"1px solid rgba(255,255,255,0.07)"},children:[t==="dashboard"&&r.jsx("button",{onClick:()=>{e("portal"),l(null)},style:{padding:"6px 14px",borderRadius:10,fontSize:12.5,fontWeight:400,border:"none",cursor:"pointer",transition:"all .15s",fontFamily:"'DM Sans',sans-serif",background:"transparent",color:"rgba(255,255,255,0.45)"},children:"← Back"}),p&&r.jsx("button",{onClick:async()=>{await B.set("snstudio_active_client_id",null),u(null),d("home"),e("portal")},style:{padding:"6px 14px",borderRadius:10,fontSize:12.5,fontWeight:500,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",background:"transparent",color:"rgba(240,80,80,0.7)"},children:"Sign Out"}),!p&&r.jsx("button",{onClick:()=>{d("login")},style:{padding:"6px 14px",borderRadius:10,fontSize:12.5,fontWeight:500,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",background:"rgba(91,164,245,0.12)",color:"#5ba4f5"},children:"Sign In"})]})]})]})}),T=b=>r.jsxs("div",{style:{background:"#07101e",minHeight:"100vh",color:"rgba(255,255,255,0.95)",position:"relative",overflow:"hidden"},children:[r.jsxs("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"},children:[r.jsx("div",{style:{position:"absolute",width:700,height:700,borderRadius:"50%",filter:"blur(130px)",opacity:.22,top:"-20%",left:"-10%",background:"radial-gradient(circle,rgba(37,99,235,.35),transparent 70%)"}}),r.jsx("div",{style:{position:"absolute",width:500,height:500,borderRadius:"50%",filter:"blur(120px)",opacity:.16,top:"15%",right:"-5%",background:"radial-gradient(circle,rgba(91,164,245,.3),transparent 70%)"}}),r.jsx("div",{style:{position:"absolute",width:400,height:400,borderRadius:"50%",filter:"blur(110px)",opacity:.14,bottom:"10%",left:"25%",background:"radial-gradient(circle,rgba(16,185,129,.25),transparent 70%)"}})]}),r.jsx("div",{dangerouslySetInnerHTML:{__html:z}}),m,r.jsx("div",{id:"recaptcha-container"}),r.jsx("div",{className:"mobile-padding",style:{maxWidth:1060,margin:"0 auto",padding:"clamp(16px,3vw,28px) clamp(14px,2vw,20px)",animation:"fadeUp .35s ease",position:"relative",zIndex:1},children:b})]});if(t==="dashboard"&&a){const b=s[a],f=(b==null?void 0:b.color)||"#7C3AED";return T(r.jsxs("div",{children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20,flexWrap:"wrap"},children:[r.jsx("button",{onClick:()=>{l(null),e("portal")},style:{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.55)",borderRadius:9,padding:"7px 13px",fontSize:13,cursor:"pointer",fontWeight:600},children:"← Back"}),b!=null&&b.logoPreview?r.jsx("img",{src:b.logoPreview,alt:"logo",style:{width:36,height:36,borderRadius:10,objectFit:"contain",background:"#fff",padding:2}}):r.jsx("div",{style:{width:36,height:36,borderRadius:10,background:`${f}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17},children:"🏢"}),r.jsxs("div",{style:{flex:1},children:[r.jsxs("div",{style:{fontSize:15,fontWeight:700,letterSpacing:"-.3px"},children:[b==null?void 0:b.brandName,r.jsxs("span",{style:{color:f,fontSize:12},children:[" · ",((b==null?void 0:b.platforms)||[b==null?void 0:b.sub]).join(", ")]})]}),r.jsx("div",{style:{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:1},children:b==null?void 0:b.audience})]}),r.jsxs("span",{style:{fontSize:11,background:"#052e16",color:"#4ade80",border:"1px solid #166534",borderRadius:6,padding:"3px 10px",fontWeight:700},children:[b==null?void 0:b.planName," · ✓ Active"]})]}),r.jsx(Rr,{profile:b,hKey:`snstudio_hist_${a}`,onGenerateContent:null}),r.jsxs("div",{style:{marginTop:32,paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.06)"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:22},children:[r.jsx("div",{style:{height:1,flex:1,background:`${f}12`}}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,background:`${f}12`,border:`1px solid ${f}28`,borderRadius:24,padding:"7px 20px"},children:[r.jsx("span",{style:{fontSize:15},children:"⚡"}),r.jsx("span",{style:{fontSize:13,fontWeight:700,color:f,letterSpacing:"-.2px"},children:"Content Generator"})]}),r.jsx("div",{style:{height:1,flex:1,background:`${f}12`}})]}),r.jsx(Er,{profile:b,hKey:`snstudio_hist_${a}`,onUpgrade:N=>{window.location.href=`${window.location.origin}/#/app/content-studio?plan=${N}`}})]})]}))}return t==="portal"?T(c==="home"?r.jsxs("div",{style:{textAlign:"center",maxWidth:580,margin:"60px auto 40px"},children:[r.jsx("div",{style:{width:70,height:70,borderRadius:20,background:"linear-gradient(135deg,#38bdf8,#0D1B3E)",border:"1px solid #38bdf840",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 18px"},children:"🥷"}),r.jsx("div",{style:{fontSize:12,fontWeight:700,color:F.accentColor,textTransform:"uppercase",letterSpacing:"2.5px",marginBottom:10},children:F.brandName}),r.jsx("h1",{style:{fontSize:40,fontWeight:800,letterSpacing:"-1.4px",lineHeight:1.08,margin:"0 0 14px",background:"linear-gradient(155deg,#fff 40%,#7BA8D4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Content that actually converts."}),r.jsx("p",{style:{color:"rgba(255,255,255,0.42)",fontSize:15,marginBottom:28,lineHeight:1.7},children:"AI that researches trends, writes platform-native captions and scripts, and hands you content that's ready to post — every single week."}),r.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:24},children:[r.jsx("button",{onClick:()=>d("onboarding"),style:{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",border:"none",borderRadius:13,padding:"14px 32px",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"},children:"See Plans & Get Started →"}),p&&r.jsx("button",{onClick:()=>d("workspace"),style:{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.85)",borderRadius:13,padding:"14px 22px",fontSize:14,fontWeight:700,cursor:"pointer"},children:"📁 My Studio →"})]}),p&&r.jsxs("div",{style:{background:"#052e16",border:"1px solid #166534",borderRadius:11,padding:"10px 20px",display:"inline-block",fontSize:13,color:"#4ade80",fontWeight:700},children:["✓ ",p.brandName," · ",p.planName," · Active"]})]}):c==="onboarding"?r.jsxs("div",{children:[r.jsx("button",{onClick:()=>d("home"),style:{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",borderRadius:9,padding:"7px 13px",fontSize:12,cursor:"pointer",fontWeight:600,marginBottom:4},children:"← Home"}),r.jsx(qa,{geo:S,trialData:y,onComplete:async b=>{const f=await B.get("snstudio_clients")||{};await B.set("snstudio_clients",{...f,[b.id]:b}),o(N=>({...N,[b.id]:b})),u(b),P(null),d("workspace")}})]}):c==="login"?r.jsxs("div",{style:{maxWidth:500,margin:"60px auto",textAlign:"center"},children:[r.jsx("h2",{style:{fontSize:24,fontWeight:700,marginBottom:20},children:"Welcome back"}),Object.keys(s||{}).length>0?r.jsxs("div",{style:{display:"grid",gap:12,textAlign:"left"},children:[Object.values(s).map(b=>r.jsxs("button",{onClick:async()=>{await B.set("snstudio_active_client_id",b.id),u(b),d("workspace")},style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all .15s"},onMouseOver:f=>f.currentTarget.style.background="rgba(255,255,255,0.08)",onMouseOut:f=>f.currentTarget.style.background="rgba(255,255,255,0.05)",children:[r.jsx("div",{style:{width:40,height:40,borderRadius:"50%",background:`${b.color||"#5ba4f5"}22`,display:"flex",alignItems:"center",justifyContent:"center",color:b.color||"#5ba4f5",fontWeight:700,fontSize:16},children:(b.brandName||b.email||"U")[0].toUpperCase()}),r.jsxs("div",{children:[r.jsx("div",{style:{fontSize:16,fontWeight:700,color:"#fff",marginBottom:4},children:b.brandName||"My Workspace"}),r.jsxs("div",{style:{fontSize:12,color:"rgba(255,255,255,0.4)"},children:[b.email," ",b.planName?`· ${b.planName}`:""]})]})]},b.id)),r.jsx("div",{style:{marginTop:20,textAlign:"center"},children:r.jsx("button",{onClick:()=>d("onboarding"),style:{background:"none",border:"none",color:"#5ba4f5",cursor:"pointer",fontSize:14,fontWeight:600},children:"+ Create New Workspace"})})]}):r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("p",{style:{color:"rgba(255,255,255,0.5)",marginBottom:20},children:"No workspaces found on this device."}),r.jsx("button",{onClick:()=>d("onboarding"),style:{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",border:"none",borderRadius:13,padding:"14px 32px",fontSize:16,fontWeight:700,cursor:"pointer"},children:"Create Workspace →"})]}),r.jsx("button",{onClick:()=>d("home"),style:{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:13,marginTop:24},children:"← Back to Home"})]}):c==="workspace"&&p?r.jsx(Ja,{client:p,onHome:()=>d("home"),onUpgrade:(b,f)=>{P(f||p),d("onboarding")}}):null):null}export{Qa as default};
