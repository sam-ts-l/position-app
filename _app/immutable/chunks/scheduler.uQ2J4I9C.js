function N(){}function S(t,n){for(const e in n)t[e]=n[e];return t}function T(t){return t()}function J(){return Object.create(null)}function P(t){t.forEach(T)}function H(t){return typeof t=="function"}function K(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function Q(t){return Object.keys(t).length===0}function w(t,...n){if(t==null){for(const i of n)i(void 0);return N}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function V(t){let n;return w(t,e=>n=e)(),n}function X(t,n,e){t.$$.on_destroy.push(w(n,e))}function Y(t,n,e,i){if(t){const r=A(t,n,e,i);return t[0](r)}}function A(t,n,e,i){return t[1]&&i?S(e.ctx.slice(),t[1](i(n))):e.ctx}function Z(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(n.dirty.length,r.length);for(let s=0;s<c;s+=1)o[s]=n.dirty[s]|r[s];return o}return n.dirty|r}return n.dirty}function $(t,n,e,i,r,o){if(r){const c=A(n,e,i,o);t.p(c,r)}}function tt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function nt(t){const n={};for(const e in t)n[e]=!0;return n}function et(t){return t??""}function it(t,n,e){return t.set(e),n}function rt(t){return t&&H(t.destroy)?t.destroy:N}let p=!1;function ct(){p=!0}function lt(){p=!1}function B(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function L(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&l.push(a)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const u=n[l].claim_order,a=(r>0&&n[e[r]].claim_order<=u?r+1:B(1,r,D=>n[e[D]].claim_order,u))-1;i[l]=e[a]+1;const E=a+1;e[E]=l,r=Math.max(E,r)}const o=[],c=[];let s=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(o.push(n[l-1]);s>=l;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);o.reverse(),c.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<c.length;l++){for(;u<o.length&&c[l].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(c[l],a)}}function M(t,n){if(p){for(L(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function st(t,n,e){p&&!e?M(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function ot(t){t.parentNode&&t.parentNode.removeChild(t)}function O(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function ut(){return v(" ")}function at(){return v("")}function ft(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function _t(t){return function(n){return n.preventDefault(),t.call(this,n)}}function dt(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function ht(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function mt(t){return t.dataset.svelteH}function pt(t){return Array.from(t.childNodes)}function q(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function j(t,n,e,i,r=!1){q(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function z(t,n,e,i){return j(t,r=>r.nodeName===n,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];e[s.name]||o.push(s.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(n))}function yt(t,n,e){return z(t,n,e,O)}function F(t,n){return j(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function bt(t){return F(t," ")}function gt(t,n){n=""+n,t.data!==n&&(t.data=n)}function xt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function vt(t,n,e){t.classList.toggle(n,!!e)}function I(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function Et(t,n){const e=[];let i=0;for(const r of n.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,e.push(r)):o===`HEAD_${t}_START`&&(i+=1,e.push(r))}else i>0&&e.push(r);return e}function kt(t,n){return new t(n)}let m;function y(t){m=t}function d(){if(!m)throw new Error("Function called outside component initialization");return m}function Nt(t){d().$$.on_mount.push(t)}function wt(t){d().$$.after_update.push(t)}function At(t){d().$$.on_destroy.push(t)}function jt(){const t=d();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const o=I(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}function Ct(t,n){return d().$$.context.set(t,n),n}function Dt(t){return d().$$.context.get(t)}function St(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const h=[],k=[];let _=[];const g=[],C=Promise.resolve();let x=!1;function R(){x||(x=!0,C.then(W))}function Tt(){return R(),C}function U(t){_.push(t)}function Pt(t){g.push(t)}const b=new Set;let f=0;function W(){if(f!==0)return;const t=m;do{try{for(;f<h.length;){const n=h[f];f++,y(n),G(n.$$)}}catch(n){throw h.length=0,f=0,n}for(y(null),h.length=0,f=0;k.length;)k.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];b.has(e)||(b.add(e),e())}_.length=0}while(h.length);for(;g.length;)g.pop()();x=!1,b.clear(),y(t)}function G(t){if(t.fragment!==null){t.update(),P(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(U)}}function Ht(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{h as $,P as A,jt as B,Ct as C,Dt as D,X as E,At as F,it as G,Pt as H,St as I,V as J,et as K,vt as L,ft as M,rt as N,dt as O,_t as P,H as Q,nt as R,M as S,J as T,W as U,Q as V,U as W,Ht as X,m as Y,y as Z,T as _,ut as a,R as a0,ct as a1,lt as a2,wt as b,bt as c,ot as d,at as e,O as f,yt as g,pt as h,st as i,ht as j,xt as k,v as l,F as m,gt as n,Nt as o,k as p,kt as q,Y as r,K as s,Tt as t,Et as u,mt as v,$ as w,tt as x,Z as y,N as z};
