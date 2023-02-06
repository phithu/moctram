!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.datepicker=t():e.datepicker=t()}(window,function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t||4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,(function(t){return e[t]}).bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var a=[],i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],r=["January","February","March","April","May","June","July","August","September","October","November","December"],o={t:"top",r:"right",b:"bottom",l:"left",c:"centered"};function s(){}var l=["click","focusin","keydown","input"];function c(e){l.forEach(function(t){e.addEventListener(t,e===document?S:$)})}function d(e,t){var n,a,i,r,o,s,l,c=e.calendar.querySelector(".qs-overlay"),d=c&&!c.classList.contains("qs-hidden");t=t||new Date(e.currentYear,e.currentMonth),e.calendar.innerHTML=[(n=t,a=e,i=d,['<div class="qs-controls'+(i?" qs-blur":"")+'">','<div class="qs-arrow qs-left"></div>','<div class="qs-month-year">','<span class="qs-month">'+a.months[n.getMonth()]+"</span>",'<span class="qs-year">'+n.getFullYear()+"</span>","</div>",'<div class="qs-arrow qs-right"></div>',"</div>"].join("")),function e(t,n,a){var i=n.currentMonth,r=n.currentYear,o=n.dateSelected,s=n.maxDate,l=n.minDate,c=n.showAllDates,d=n.days,u=n.disabledDates,h=n.startDay,f=n.weekendIndices,v=n.events,m=n.getRange?n.getRange():{},y=+m.start,g=+m.end,D=p(new Date(t).setDate(1)),b=D.getDay()-h;D.setMonth(D.getMonth()+1),D.setDate(0);var q=D.getDate(),w=[],M=(b<0?7:0)+7*((b+q)/7|0);M+=(b+q)%7?7:0;for(var S=1;S<=M;S++){var $=(S-1)%7,x=d[$],_=S-(b>=0?b:7+b),Y=new Date(r,i,_),C=v[+Y],L=_<1||_>q,E=L?_<1?-1:1:0,P=L&&!c,k=P?"":Y.getDate(),j=+Y==+o,N=$===f[0]||$===f[1],O=y!==g,I="qs-square "+x;C&&!P&&(I+=" qs-event"),L&&(I+=" qs-outside-current-month"),!c&&L||(I+=" qs-num"),j&&(I+=" qs-active"),(u[+Y]||n.disabler(Y)||N&&n.noWeekends||l&&+Y<+l||s&&+Y>+s)&&!P&&(I+=" qs-disabled"),+p(new Date)==+Y&&(I+=" qs-current"),+Y===y&&g&&O&&(I+=" qs-range-start"),+Y>y&&+Y<g&&(I+=" qs-range-middle"),+Y===g&&y&&O&&(I+=" qs-range-end"),P&&(I+=" qs-empty",k=""),w.push('<div class="'+I+'" data-direction="'+E+'">'+k+"</div>")}var R=d.map(function(e){return'<div class="qs-square qs-day">'+e+"</div>"}).concat(w);return R.unshift('<div class="qs-squares'+(a?" qs-blur":"")+'">'),R.push("</div>"),R.join("")}(t,e,d),(r=e,o=d,s=r.overlayPlaceholder,l=r.overlayButton,['<div class="qs-overlay'+(o?"":" qs-hidden")+'">',"<div>",'<input class="qs-overlay-year" placeholder="'+s+'" />','<div class="qs-close">&#10005;</div>',"</div>",'<div class="qs-overlay-month-container">'+r.overlayMonths.map(function(e,t){return'<div class="qs-overlay-month" data-month-num="'+t+'">'+e+"</div>"}).join("")+"</div>",'<div class="qs-submit qs-disabled">'+l+"</div>","</div>"].join(""))].join(""),d&&window.requestAnimationFrame(function(){b(!0,e)})}function u(e,t,n){var a=t.el,i=t.calendar.querySelector(".qs-active"),r=e.textContent,o=t.sibling;(a.disabled||a.readOnly)&&t.respectDisabledReadOnly||(t.dateSelected=n?void 0:new Date(t.currentYear,t.currentMonth,r),i&&i.classList.remove("qs-active"),n||e.classList.add("qs-active"),f(a,t,n),n||g(t),o&&(h({instance:t,deselect:n}),t.first&&!o.dateSelected&&(o.currentYear=t.currentYear,o.currentMonth=t.currentMonth,o.currentMonthName=t.currentMonthName),d(t),d(o)),t.onSelect(t,n?void 0:new Date(t.dateSelected)))}function h(e){var t=e.instance.first?e.instance:e.instance.sibling,n=t.sibling;t===e.instance?e.deselect?(t.minDate=t.originalMinDate,n.minDate=n.originalMinDate):n.minDate=t.dateSelected:e.deselect?(n.maxDate=n.originalMaxDate,t.maxDate=t.originalMaxDate):t.maxDate=n.dateSelected}function f(e,t,n){if(!t.nonInput)return n?e.value="":t.formatter!==s?t.formatter(e,t.dateSelected,t):void(e.value=t.dateSelected.toDateString())}function v(e,t,n,a){n||a?(n&&(t.currentYear=+n),a&&(t.currentMonth=+a)):(t.currentMonth+=e.contains("qs-right")?1:-1,12===t.currentMonth?(t.currentMonth=0,t.currentYear++):-1===t.currentMonth&&(t.currentMonth=11,t.currentYear--)),t.currentMonthName=t.months[t.currentMonth],d(t),t.onMonthChange(t)}function m(e){if(!e.noPosition){var t=e.position.top,n=e.position.right;if(e.position.centered)return e.calendarContainer.classList.add("qs-centered");var a=e.positionedEl.getBoundingClientRect(),i=e.el.getBoundingClientRect(),r=e.calendarContainer.getBoundingClientRect(),o=i.top-a.top+(t?-1*r.height:i.height)+"px",s=i.left-a.left+(n?i.width-r.width:0)+"px";e.calendarContainer.style.setProperty("top",o),e.calendarContainer.style.setProperty("left",s)}}function y(e){return"[object Date]"===w(e)&&"Invalid Date"!==e.toString()}function p(e){if(y(e)||"number"==typeof e&&!isNaN(e)){var t=new Date(+e);return new Date(t.getFullYear(),t.getMonth(),t.getDate())}}function g(e){!e.disabled&&(e.calendarContainer.classList.contains("qs-hidden")||e.alwaysShow||(b(!0,e),e.calendarContainer.classList.add("qs-hidden"),e.onHide(e)))}function D(e){e.disabled||(e.calendarContainer.classList.remove("qs-hidden"),m(e),e.onShow(e))}function b(e,t){var n=t.calendar,a=n.querySelector(".qs-overlay"),i=a.querySelector(".qs-overlay-year"),r=n.querySelector(".qs-controls"),o=n.querySelector(".qs-squares");e?(a.classList.add("qs-hidden"),r.classList.remove("qs-blur"),o.classList.remove("qs-blur"),i.value=""):(a.classList.remove("qs-hidden"),r.classList.add("qs-blur"),o.classList.add("qs-blur"),i.focus())}function q(e,t,n,a){var i=isNaN(+(new Date).setFullYear(t.value||void 0)),r=i?null:t.value;13===e.which||13===e.keyCode||"click"===e.type?a?v(null,n,r,a):i||t.classList.contains("qs-disabled")||v(null,n,r):n.calendar.contains(t)&&n.calendar.querySelector(".qs-submit").classList[i?"add":"remove"]("qs-disabled")}function w(e){return({}).toString.call(e)}function M(e){a.forEach(function(t){t!==e&&g(t)})}function S(e){if(!e.__qs_shadow_dom){var t=e.which||e.keyCode,n=e.type,i=e.target,o=i.classList,s=a.filter(function(e){return e.calendar.contains(i)||e.el===i})[0],l=s&&s.calendar.contains(i);if(!(s&&s.isMobile&&s.disableMobile)){if("click"===n){if(!s)return a.forEach(g);if(s.disabled)return;var c=s.calendar,h=s.calendarContainer,f=s.disableYearOverlay,m=s.nonInput,y=c.querySelector(".qs-overlay-year"),p=!!c.querySelector(".qs-hidden"),w=c.querySelector(".qs-month-year").contains(i),S=i.dataset.monthNum;if(s.noPosition&&!l)(h.classList.contains("qs-hidden")?D:g)(s);else if(o.contains("qs-arrow"))v(o,s);else if(w||o.contains("qs-close"))f||b(!p,s);else if(S)q(e,y,s,S);else{if(o.contains("qs-disabled"))return;if(o.contains("qs-num")){var $=i.textContent,x=+i.dataset.direction,_=new Date(s.currentYear,s.currentMonth+x,$);if(x){s.currentYear=_.getFullYear(),s.currentMonth=_.getMonth(),s.currentMonthName=r[s.currentMonth],d(s);for(var Y,C=s.calendar.querySelectorAll('[data-direction="0"]'),L=0;!Y;){var E=C[L];E.textContent===$&&(Y=E),L++}i=Y}return void(+_==+s.dateSelected?u(i,s,!0):i.classList.contains("qs-disabled")||u(i,s))}o.contains("qs-submit")?q(e,y,s):m&&i===s.el&&(D(s),M(s))}}else if("focusin"===n&&s)D(s),M(s);else if("keydown"===n&&9===t&&s)g(s);else if("keydown"===n&&s&&!s.disabled){var P=!s.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");13===t&&P&&l?q(e,i,s):27===t&&P&&l&&b(!0,s)}else if("input"===n){if(!s||!s.calendar.contains(i))return;var k=s.calendar.querySelector(".qs-submit"),j=i.value.split("").reduce(function(e,t){return e||"0"!==t?e+(t.match(/[0-9]/)?t:""):""},"").slice(0,4);i.value=j,k.classList[4===j.length?"remove":"add"]("qs-disabled")}}}}function $(e){S(e),e.__qs_shadow_dom=!0}function x(e,t){l.forEach(function(n){e.removeEventListener(n,t)})}function _(){D(this)}function Y(){g(this)}function C(e,t){var n=p(e),a=this.currentYear,i=this.currentMonth,r=this.sibling;if(null==e)return this.dateSelected=void 0,f(this.el,this,!0),r&&(h({instance:this,deselect:!0}),d(r)),d(this),this;if(!y(e))throw Error("`setDate` needs a JavaScript Date object.");if(this.disabledDates[+n]||n<this.minDate||n>this.maxDate)throw Error("You can't manually set a date that's disabled.");this.dateSelected=n,t&&(this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),this.currentMonthName=this.months[n.getMonth()]),f(this.el,this),r&&(h({instance:this}),d(r));var o=a===n.getFullYear()&&i===n.getMonth();return o||t?d(this,n):o||d(this,new Date(a,i,1)),this}function L(e){return P(this,e,!0)}function E(e){return P(this,e)}function P(e,t,n){var a=e.dateSelected,i=e.first,r=e.sibling,o=e.minDate,s=e.maxDate,l=p(t),c=n?"Min":"Max";function u(){return"original"+c+"Date"}function h(){return c.toLowerCase()+"Date"}function f(){return"set"+c}function v(){throw Error("Out-of-range date passed to "+f())}if(null==t)e[u()]=void 0,r?(r[u()]=void 0,n?(!i||a)&&(i||r.dateSelected)||(e.minDate=void 0,r.minDate=void 0):(!i||r.dateSelected)&&(i||a)||(e.maxDate=void 0,r.maxDate=void 0)):e[h()]=void 0;else{if(!y(t))throw Error("Invalid date passed to "+f());r?((i&&n&&l>(a||s)||i&&!n&&l<(r.dateSelected||o)||!i&&n&&l>(r.dateSelected||s)||!i&&!n&&l<(a||o))&&v(),e[u()]=l,r[u()]=l,(!n||(!i||a)&&(i||r.dateSelected))&&(n||(!i||r.dateSelected)&&(i||a))||(e[h()]=l,r[h()]=l)):((n&&l>(a||s)||!n&&l<(a||o))&&v(),e[h()]=l)}return r&&d(r),d(e),e}function k(){var e=this.first?this:this.sibling,t=e.sibling;return{start:e.dateSelected,end:t.dateSelected}}function j(){var e=this.shadowDom,t=this.positionedEl,n=this.calendarContainer,i=this.sibling,r=this;this.inlinePosition&&(a.some(function(e){return e!==r&&e.positionedEl===t})||t.style.setProperty("position",null)),n.remove(),a=a.filter(function(e){return e!==r}),i&&delete i.sibling,a.length||x(document,S);var o=a.some(function(t){return t.shadowDom===e});for(var s in e&&!o&&x(e,$),this)delete this[s];a.length||l.forEach(function(e){document.removeEventListener(e,S)})}function N(e,t){var n=new Date(e);if(!y(n))throw Error("Invalid date passed to `navigate`");this.currentYear=n.getFullYear(),this.currentMonth=n.getMonth(),d(this),t&&this.onMonthChange(this)}t.default=function(e,t){var n=function(e,t){var n,l,c=function(e){var t,n,r,l,c=function e(t){return Array.isArray(t)?t.map(e):"[object Object]"===w(t)?Object.keys(t).reduce(function(n,a){return n[a]=e(t[a]),n},{}):t}(e);c.events&&(c.events=c.events.reduce(function(e,t){if(!y(t))throw Error('"options.events" must only contain valid JavaScript Date objects.');return e[+p(t)]=!0,e},{})),["startDate","dateSelected","minDate","maxDate"].forEach(function(e){var t=c[e];if(t&&!y(t))throw Error('"options.'+e+'" needs to be a valid JavaScript Date object.');c[e]=p(t)});var d=c.position,u=c.maxDate,h=c.minDate,f=c.dateSelected,v=c.overlayPlaceholder,m=c.overlayButton,g=c.startDay,D=c.id;if(c.startDate=p(c.startDate||f||new Date),c.disabledDates=(c.disabledDates||[]).reduce(function(e,t){var n=+p(t);if(!y(t))throw Error('You supplied an invalid date to "options.disabledDates".');if(n===+p(f))throw Error('"disabledDates" cannot contain the same date as "dateSelected".');return e[n]=1,e},{}),c.hasOwnProperty("id")&&null==D)throw Error("`id` cannot be `null` or `undefined`");if(null!=D){var b=a.filter(function(e){return e.id===D});if(b.length>1)throw Error("Only two datepickers can share an id.");b.length?(c.second=!0,c.sibling=b[0]):c.first=!0}var q=["tr","tl","br","bl","c"].some(function(e){return d===e});if(d&&!q)throw Error('"options.position" must be one of the following: tl, tr, bl, br, or c.');function M(e){throw Error('"dateSelected" in options is '+(e?"less":"greater")+' than "'+(e||"max")+'Date".')}if(c.position=(n=(t=d||"bl")[0],r=t[1],(l={})[o[n]]=1,r&&(l[o[r]]=1),l),u<h)throw Error('"maxDate" in options is less than "minDate".');if(f&&(h>f&&M("min"),u<f&&M()),["onSelect","onShow","onHide","onMonthChange","formatter","disabler"].forEach(function(e){"function"!=typeof c[e]&&(c[e]=s)}),["customDays","customMonths","customOverlayMonths"].forEach(function(e,t){var n=c[e],a=t?12:7;if(n){if(!Array.isArray(n)||n.length!==a||n.some(function(e){return"string"!=typeof e}))throw Error('"'+e+'" must be an array with '+a+" strings.");c[t?t<2?"months":"overlayMonths":"days"]=n}}),g&&g>0&&g<7){var S=(c.customDays||i).slice(),$=S.splice(0,g);c.customDays=S.concat($),c.startDay=+g,c.weekendIndices=[S.length-1,S.length]}else c.startDay=0,c.weekendIndices=[6,0];return"string"!=typeof v&&delete c.overlayPlaceholder,"string"!=typeof m&&delete c.overlayButton,c}(t||{startDate:p(new Date),position:"bl"}),d=e;if("string"==typeof d)d="#"===d[0]?document.getElementById(d.slice(1)):document.querySelector(d);else{if("[object ShadowRoot]"===w(d))throw Error("Using a shadow DOM as your selector is not supported.");for(var u,h=d.parentNode;!u;){var v=w(h);"[object HTMLDocument]"===v?u=!0:"[object ShadowRoot]"===v?(u=!0,n=h,l=h.host):h=h.parentNode}}if(!d)throw Error("No selector / element found.");if(a.some(function(e){return e.el===d}))throw Error("A datepicker already exists on that element.");var m=d===document.body,g=n?d.parentElement||n:m?document.body:d.parentElement,b=n?d.parentElement||l:g,q=document.createElement("div"),M=document.createElement("div");q.className="qs-datepicker-container qs-hidden",M.className="qs-datepicker";var S={shadowDom:n,customElement:l,positionedEl:b,el:d,parent:g,nonInput:"INPUT"!==d.nodeName,noPosition:m,position:!m&&c.position,startDate:c.startDate,dateSelected:c.dateSelected,disabledDates:c.disabledDates,minDate:c.minDate,maxDate:c.maxDate,noWeekends:!!c.noWeekends,weekendIndices:c.weekendIndices,calendarContainer:q,calendar:M,currentMonth:(c.startDate||c.dateSelected).getMonth(),currentMonthName:(c.months||r)[(c.startDate||c.dateSelected).getMonth()],currentYear:(c.startDate||c.dateSelected).getFullYear(),events:c.events||{},setDate:C,remove:j,setMin:L,setMax:E,show:_,hide:Y,navigate:N,onSelect:c.onSelect,onShow:c.onShow,onHide:c.onHide,onMonthChange:c.onMonthChange,formatter:c.formatter,disabler:c.disabler,months:c.months||r,days:c.customDays||i,startDay:c.startDay,overlayMonths:c.overlayMonths||(c.months||r).map(function(e){return e.slice(0,3)}),overlayPlaceholder:c.overlayPlaceholder||"4-digit year",overlayButton:c.overlayButton||"Submit",disableYearOverlay:!!c.disableYearOverlay,disableMobile:!!c.disableMobile,isMobile:"ontouchstart"in window,alwaysShow:!!c.alwaysShow,id:c.id,showAllDates:!!c.showAllDates,respectDisabledReadOnly:!!c.respectDisabledReadOnly,first:c.first,second:c.second};if(c.sibling){var $=c.sibling,x=S,P=$.minDate||x.minDate,O=$.maxDate||x.maxDate;x.sibling=$,$.sibling=x,$.minDate=P,$.maxDate=O,x.minDate=P,x.maxDate=O,$.originalMinDate=P,$.originalMaxDate=O,x.originalMinDate=P,x.originalMaxDate=O,$.getRange=k,x.getRange=k}c.dateSelected&&f(d,S);var I=getComputedStyle(b).position;m||I&&"static"!==I||(S.inlinePosition=!0,b.style.setProperty("position","relative"));var R=a.filter(function(e){return e.positionedEl===S.positionedEl});return R.some(function(e){return e.inlinePosition})&&(S.inlinePosition=!0,R.forEach(function(e){e.inlinePosition=!0})),q.appendChild(M),g.appendChild(q),S.alwaysShow&&D(S),S}(e,t);if(a.length||c(document),n.shadowDom&&(a.some(function(e){return e.shadowDom===n.shadowDom})||c(n.shadowDom)),a.push(n),n.second){var l=n.sibling;h({instance:n,deselect:!n.dateSelected}),h({instance:l,deselect:!l.dateSelected}),d(l)}return d(n,n.startDate||n.dateSelected),n.alwaysShow&&m(n),n}}]).default});

