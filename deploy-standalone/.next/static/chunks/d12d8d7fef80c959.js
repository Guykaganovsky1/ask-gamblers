(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88653,e=>{"use strict";e.i(247167);var t=e.i(843476),r=e.i(271645),n=e.i(231178),o=e.i(947414),a=e.i(674008),i=e.i(821476),s=e.i(772846),l=r,c=e.i(737806);function u(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class f extends l.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,r=(0,s.isHTMLElement)(e)&&e.offsetWidth||0,n=(0,s.isHTMLElement)(e)&&e.offsetHeight||0,o=this.props.sizeRef.current;o.height=t.offsetHeight||0,o.width=t.offsetWidth||0,o.top=t.offsetTop,o.left=t.offsetLeft,o.right=r-o.width-o.left,o.bottom=n-o.height-o.top}return null}componentDidUpdate(){}render(){return this.props.children}}function d({children:e,isPresent:n,anchorX:o,anchorY:a,root:i,pop:s}){let d=(0,l.useId)(),p=(0,l.useRef)(null),h=(0,l.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:g}=(0,l.useContext)(c.MotionConfigContext),x=function(...e){return r.useCallback(function(...e){return t=>{let r=!1,n=e.map(e=>{let n=u(e,t);return r||"function"!=typeof n||(r=!0),n});if(r)return()=>{for(let t=0;t<n.length;t++){let r=n[t];"function"==typeof r?r():u(e[t],null)}}}}(...e),e)}(p,e.props?.ref??e?.ref);return(0,l.useInsertionEffect)(()=>{let{width:e,height:t,top:r,left:l,right:c,bottom:u}=h.current;if(n||!1===s||!p.current||!e||!t)return;let f="left"===o?`left: ${l}`:`right: ${c}`,x="bottom"===a?`bottom: ${u}`:`top: ${r}`;p.current.dataset.motionPopId=d;let m=document.createElement("style");g&&(m.nonce=g);let b=i??document.head;return b.appendChild(m),m.sheet&&m.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${f}px !important;
            ${x}px !important;
          }
        `),()=>{b.contains(m)&&b.removeChild(m)}},[n]),(0,t.jsx)(f,{isPresent:n,childRef:p,sizeRef:h,pop:s,children:!1===s?e:l.cloneElement(e,{ref:x})})}let p=({children:e,initial:n,isPresent:a,onExitComplete:s,custom:l,presenceAffectsLayout:c,mode:u,anchorX:f,anchorY:p,root:g})=>{let x=(0,o.useConstant)(h),m=(0,r.useId)(),b=!0,y=(0,r.useMemo)(()=>(b=!1,{id:m,initial:n,isPresent:a,custom:l,onExitComplete:e=>{for(let t of(x.set(e,!0),x.values()))if(!t)return;s&&s()},register:e=>(x.set(e,!1),()=>x.delete(e))}),[a,x,s]);return c&&b&&(y={...y}),(0,r.useMemo)(()=>{x.forEach((e,t)=>x.set(t,!1))},[a]),r.useEffect(()=>{a||x.size||!s||s()},[a]),e=(0,t.jsx)(d,{pop:"popLayout"===u,isPresent:a,anchorX:f,anchorY:p,root:g,children:e}),(0,t.jsx)(i.PresenceContext.Provider,{value:y,children:e})};function h(){return new Map}var g=e.i(464978);let x=e=>e.key||"";function m(e){let t=[];return r.Children.forEach(e,e=>{(0,r.isValidElement)(e)&&t.push(e)}),t}let b=({children:e,custom:i,initial:s=!0,onExitComplete:l,presenceAffectsLayout:c=!0,mode:u="sync",propagate:f=!1,anchorX:d="left",anchorY:h="top",root:b})=>{let[y,v]=(0,g.usePresence)(f),j=(0,r.useMemo)(()=>m(e),[e]),w=f&&!y?[]:j.map(x),k=(0,r.useRef)(!0),P=(0,r.useRef)(j),C=(0,o.useConstant)(()=>new Map),E=(0,r.useRef)(new Set),[N,A]=(0,r.useState)(j),[S,F]=(0,r.useState)(j);(0,a.useIsomorphicLayoutEffect)(()=>{k.current=!1,P.current=j;for(let e=0;e<S.length;e++){let t=x(S[e]);w.includes(t)?(C.delete(t),E.current.delete(t)):!0!==C.get(t)&&C.set(t,!1)}},[S,w.length,w.join("-")]);let _=[];if(j!==N){let e=[...j];for(let t=0;t<S.length;t++){let r=S[t],n=x(r);w.includes(n)||(e.splice(t,0,r),_.push(r))}return"wait"===u&&_.length&&(e=_),F(m(e)),A(j),null}let{forceRender:O}=(0,r.useContext)(n.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:S.map(e=>{let r=x(e),n=(!f||!!y)&&(j===S||w.includes(r));return(0,t.jsx)(p,{isPresent:n,initial:(!k.current||!!s)&&void 0,custom:i,presenceAffectsLayout:c,mode:u,root:b,onExitComplete:n?void 0:()=>{if(E.current.has(r)||(E.current.add(r),!C.has(r)))return;C.set(r,!0);let e=!0;C.forEach(t=>{t||(e=!1)}),e&&(O?.(),F(P.current),f&&v?.(),l&&l())},anchorX:d,anchorY:h,children:e},r)})})};e.s(["AnimatePresence",()=>b],88653)},233525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},998183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function a(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function i(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,i(e));else t.set(r,i(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},195057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return s},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(190809)._(e.r(998183)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",s=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(a.urlQueryToSearchParams(l)));let u=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==c?(c="//"+(c||""),o&&"/"!==o[0]&&(o="/"+o)):c||(c=""),s&&"#"!==s[0]&&(s="#"+s),u&&"?"!==u[0]&&(u="?"+u),o=o.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${c}${o}${u}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return s(e)}},818581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(271645);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=a(e,n)),t&&(o.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},718967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return m},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return v},NormalizeError:function(){return b},PageNotFoundError:function(){return y},SP:function(){return g},ST:function(){return x},WEB_VITALS:function(){return a},execOnce:function(){return i},getDisplayName:function(){return f},getLocationOrigin:function(){return c},getURL:function(){return u},isAbsoluteUrl:function(){return l},isResSent:function(){return d},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return w}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=c();return e.substring(t.length)}function f(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function d(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&d(r))return n;if(!n)throw Object.defineProperty(Error(`"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let g="u">typeof performance,x=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class m extends Error{}class b extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},573668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(718967),o=e.r(652817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},284508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},522016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return m},useLinkStatus:function(){return y}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(190809),i=e.r(843476),s=a._(e.r(271645)),l=e.r(195057),c=e.r(8372),u=e.r(818581),f=e.r(718967),d=e.r(405550);e.r(233525);let p=e.r(91949),h=e.r(573668),g=e.r(509396);function x(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function m(t){var r;let n,o,a,[l,m]=(0,s.useOptimistic)(p.IDLE_LINK_STATUS),y=(0,s.useRef)(null),{href:v,as:j,children:w,prefetch:k=null,passHref:P,replace:C,shallow:E,scroll:N,onClick:A,onMouseEnter:S,onTouchStart:F,legacyBehavior:_=!1,onNavigate:O,ref:R,unstable_dynamicOnHover:L,...T}=t;n=w,_&&("string"==typeof n||"number"==typeof n)&&(n=(0,i.jsx)("a",{children:n}));let B=s.default.useContext(c.AppRouterContext),M=!1!==k,z=!1!==k?null===(r=k)||"auto"===r?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,{href:D,as:$}=s.default.useMemo(()=>{let e=x(v);return{href:e,as:j?x(j):e}},[v,j]);if(_){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=s.default.Children.only(n)}let I=_?o&&"object"==typeof o&&o.ref:R,U=s.default.useCallback(e=>(null!==B&&(y.current=(0,p.mountLinkInstance)(e,D,B,z,M,m)),()=>{y.current&&((0,p.unmountLinkForCurrentNavigation)(y.current),y.current=null),(0,p.unmountPrefetchableInstance)(e)}),[M,D,B,z,m]),W={ref:(0,u.useMergedRef)(U,I),onClick(t){_||"function"!=typeof A||A(t),_&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!B||t.defaultPrevented||function(t,r,n,o,a,i,l){if("u">typeof window){let c,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(699781);s.default.startTransition(()=>{f(n||r,a?"replace":"push",i??!0,o.current)})}}(t,D,$,y,C,N,O)},onMouseEnter(e){_||"function"!=typeof S||S(e),_&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),B&&M&&(0,p.onNavigationIntent)(e.currentTarget,!0===L)},onTouchStart:function(e){_||"function"!=typeof F||F(e),_&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),B&&M&&(0,p.onNavigationIntent)(e.currentTarget,!0===L)}};return(0,f.isAbsoluteUrl)($)?W.href=$:_&&!P&&("a"!==o.type||"href"in o.props)||(W.href=(0,d.addBasePath)($)),a=_?s.default.cloneElement(o,W):(0,i.jsx)("a",{...T,...W,children:n}),(0,i.jsx)(b.Provider,{value:l,children:a})}e.r(284508);let b=(0,s.createContext)(p.IDLE_LINK_STATUS),y=()=>(0,s.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},618566,(e,t,r)=>{t.exports=e.r(976562)},400138,e=>{"use strict";var t=e.i(843476),r=e.i(271645),n=e.i(522016),o=e.i(618566),a=e.i(846932),i=e.i(88653);function s({open:e,onClose:r,links:o}){return(0,t.jsx)(i.AnimatePresence,{children:e&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 bg-black/60",onClick:r}),(0,t.jsxs)(a.motion.nav,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",damping:25,stiffness:200},className:"fixed top-0 right-0 z-[60] flex h-full w-72 flex-col overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-b from-card-light/95 via-card/95 to-background/98 backdrop-blur-xl"}),(0,t.jsx)("div",{className:"absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-emerald-neon to-accent opacity-60"}),(0,t.jsx)("div",{className:"absolute inset-0 overflow-hidden",children:(0,t.jsx)("div",{className:"absolute inset-0 opacity-20",style:{background:"linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)"}})}),(0,t.jsxs)("div",{className:"relative z-10 flex h-full w-full flex-col p-8",children:[(0,t.jsx)("button",{onClick:r,className:"mb-8 self-start text-2xl text-text-muted hover:text-accent transition-colors",children:"✕"}),o.map((e,o)=>(0,t.jsx)(a.motion.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.1+.05*o},children:(0,t.jsxs)(n.default,{href:e.href,onClick:r,className:"flex items-center gap-3 py-4 px-3 font-heading text-lg font-bold text-text-primary transition-all duration-200 hover:text-accent hover:bg-white/5 rounded-lg",children:[e.label,e.badge&&(0,t.jsx)("span",{className:"text-[9px] font-extrabold px-2 py-0.5 rounded-full text-white leading-none",style:{background:e.badge.bg},children:e.badge.text})]})},e.href))]})]})]})})}function l(){return(0,t.jsxs)(n.default,{href:"/",className:"group flex items-center gap-3",style:{direction:"ltr"},children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

        @keyframes slotGlow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(168,85,247,0.4)); }
          50%       { filter: drop-shadow(0 0 16px rgba(168,85,247,0.85)); }
        }
        @keyframes leverBounce {
          0%, 100% { transform: rotate(0deg); }
          20%      { transform: rotate(-18deg); }
          50%      { transform: rotate(5deg); }
        }

        .slot-machine {
          animation: slotGlow 3.5s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .group:hover .slot-machine {
          transform: scale(1.06);
        }
        .slot-lever {
          transform-origin: 36px 11px;
        }
        .group:hover .slot-lever {
          animation: leverBounce 0.8s ease-in-out forwards;
        }

        .logo-name-royal {
          font-family: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.18em;
          background: linear-gradient(160deg, #fff 0%, #D8B4FE 60%, #A855F7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .logo-name-spinz {
          font-family: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.22em;
          background: linear-gradient(160deg, #D8B4FE 0%, #A855F7 60%, #7C3AED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
      `}),(0,t.jsxs)("svg",{className:"slot-machine h-11 w-auto flex-shrink-0",viewBox:"0 0 48 52",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Slot machine",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"sl-purple",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#D8B4FE"}),(0,t.jsx)("stop",{offset:"45%",stopColor:"#A855F7"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#7C3AED"})]}),(0,t.jsxs)("linearGradient",{id:"sl-body",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#1e1030"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0d0818"})]}),(0,t.jsxs)("linearGradient",{id:"sl-top",x1:"0",y1:"0",x2:"1",y2:"0",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#D8B4FE"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"#A855F7"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#7C3AED"})]})]}),(0,t.jsx)("rect",{x:"3",y:"2",width:"36",height:"4",rx:"2",fill:"url(#sl-top)"}),(0,t.jsx)("rect",{x:"3",y:"6",width:"36",height:"35",rx:"4",fill:"url(#sl-body)",stroke:"url(#sl-purple)",strokeWidth:"1.4"}),(0,t.jsx)("rect",{x:"7",y:"11",width:"28",height:"18",rx:"2.5",fill:"#06020f",stroke:"#A855F7",strokeWidth:"1"}),(0,t.jsx)("line",{x1:"16.3",y1:"11",x2:"16.3",y2:"29",stroke:"#A855F7",strokeWidth:"0.7",opacity:"0.55"}),(0,t.jsx)("line",{x1:"25.7",y1:"11",x2:"25.7",y2:"29",stroke:"#A855F7",strokeWidth:"0.7",opacity:"0.55"}),(0,t.jsx)("text",{x:"11.5",y:"24.5",textAnchor:"middle",fontFamily:"Georgia, serif",fontSize:"12",fontWeight:"bold",fill:"#A855F7",children:"7"}),(0,t.jsx)("text",{x:"21",y:"24",textAnchor:"middle",fontFamily:"serif",fontSize:"11",fill:"#D8B4FE",children:"★"}),(0,t.jsx)("text",{x:"30.5",y:"24.5",textAnchor:"middle",fontFamily:"Georgia, serif",fontSize:"12",fontWeight:"bold",fill:"#A855F7",children:"7"}),(0,t.jsx)("line",{x1:"7",y1:"20",x2:"35",y2:"20",stroke:"#10B981",strokeWidth:"0.6",strokeDasharray:"2 1.5",opacity:"0.6"}),(0,t.jsxs)("g",{className:"slot-lever",children:[(0,t.jsx)("rect",{x:"37",y:"11",width:"3.5",height:"18",rx:"1.75",fill:"url(#sl-purple)"}),(0,t.jsx)("circle",{cx:"38.75",cy:"11",r:"3.2",fill:"#D8B4FE",stroke:"#7C3AED",strokeWidth:"0.8"})]}),(0,t.jsx)("rect",{x:"18",y:"33",width:"8",height:"2",rx:"1",fill:"#A855F7",opacity:"0.6"}),(0,t.jsx)("rect",{x:"3",y:"38",width:"36",height:"5",rx:"3",fill:"url(#sl-purple)",opacity:"0.35"}),(0,t.jsx)("rect",{x:"8",y:"42",width:"5",height:"8",rx:"2",fill:"#A855F7",opacity:"0.4"}),(0,t.jsx)("rect",{x:"29",y:"42",width:"5",height:"8",rx:"2",fill:"#A855F7",opacity:"0.4"})]}),(0,t.jsxs)("div",{className:"flex flex-col leading-none gap-[3px]",children:[(0,t.jsx)("span",{className:"logo-name-royal",children:"ROYAL"}),(0,t.jsx)("span",{className:"logo-name-spinz",children:"SPINZ"})]})]})}let c=[{href:"/",label:"דף הבית",highlight:!0},{href:"/softwares",label:"ספקי תוכנה"},{href:"/news",label:"חדשות"},{href:"/casinos",label:"בתי קזינו",badge:{text:"Best",bg:"#16a34a"}},{href:"/games",label:"משחקים",badge:{text:"Top",bg:"#0891b2"}},{href:"/bonuses",label:"בונוסים",badge:{text:"Hot",bg:"#dc2626"}},{href:"/blog",label:"בלוג"}];function u(){let[e,a]=(0,r.useState)(!1),i=(0,o.usePathname)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        /* ── Neon home button glow pulse ── */
        @keyframes homePulse {
          0%, 100% {
            box-shadow:
              0 0 5px rgba(168,85,247,0.5),
              0 0 14px rgba(168,85,247,0.3),
              0 0 28px rgba(168,85,247,0.15),
              inset 0 1px 0 rgba(255,255,255,0.1);
          }
          50% {
            box-shadow:
              0 0 8px rgba(192,132,252,0.65),
              0 0 20px rgba(168,85,247,0.4),
              0 0 40px rgba(168,85,247,0.2),
              inset 0 1px 0 rgba(255,255,255,0.15);
          }
        }

        /* ── Shine sweep ── */
        @keyframes homeShine {
          0%   { transform: translateX(-150%); opacity: 0; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.4; }
          100% { transform: translateX(150%); opacity: 0; }
        }

        /* ── Neon scan line on header bottom ── */
        @keyframes scanPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* ── Nav link hover glow ── */
        @keyframes navGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(168,85,247,0.6); }
          50%       { text-shadow: 0 0 16px rgba(192,132,252,0.9); }
        }

        .home-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9333EA 100%);
          animation: homePulse 2.8s ease-in-out infinite;
          border: 1px solid rgba(192,132,252,0.6);
          transition: transform 0.15s ease;
        }
        .home-btn:hover {
          transform: translateY(-1px) scale(1.03);
        }
        .home-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 60%; height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.35),
            transparent
          );
          animation: homeShine 3s ease-in-out infinite;
          pointer-events: none;
        }

        .nav-link {
          position: relative;
          transition: all 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%; height: 1px;
          background: linear-gradient(90deg, transparent, #A855F7, transparent);
          transition: transform 0.25s ease;
        }
        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        .nav-link:hover {
          color: #D8B4FE;
          text-shadow: 0 0 12px rgba(168,85,247,0.7);
        }

        .nav-active {
          color: #C084FC;
          background: rgba(168,85,247,0.12);
          border: 1px solid rgba(168,85,247,0.25);
          text-shadow: 0 0 10px rgba(168,85,247,0.6);
          box-shadow: inset 0 0 12px rgba(168,85,247,0.08);
        }
        .nav-active::after {
          transform: translateX(-50%) scaleX(1) !important;
        }

        .header-scanline {
          animation: scanPulse 3s ease-in-out infinite;
        }

        .burger-line {
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .burger-btn:hover .burger-line {
          background: #A855F7;
          box-shadow: 0 0 6px rgba(168,85,247,0.7);
        }

        @keyframes badgePop {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50%       { transform: translateX(-50%) scale(1.1); }
        }
        .nav-badge {
          position: absolute;
          top: -9px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 9px;
          font-weight: 800;
          line-height: 1;
          padding: 2px 6px;
          border-radius: 999px;
          color: #fff;
          white-space: nowrap;
          letter-spacing: 0.04em;
          pointer-events: none;
          animation: badgePop 2.5s ease-in-out infinite;
        }
      `}),(0,t.jsxs)("header",{className:"sticky top-0 z-50 relative overflow-hidden",style:{background:"linear-gradient(180deg, rgba(11,14,20,0.98) 0%, rgba(15,10,25,0.97) 100%)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(168,85,247,0.15)"},children:[(0,t.jsx)("div",{className:"header-scanline absolute bottom-0 left-0 right-0 h-px",style:{background:"linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.6) 20%, rgba(192,132,252,0.9) 50%, rgba(168,85,247,0.6) 80%, transparent 100%)"}}),(0,t.jsx)("div",{className:"absolute top-0 left-0 right-0 h-px",style:{background:"linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)"}}),(0,t.jsxs)("div",{className:"relative z-10 flex w-full items-center justify-between px-6 py-3",dir:"ltr",children:[(0,t.jsx)(l,{}),(0,t.jsx)("nav",{className:"hidden items-center gap-0.5 lg:flex",dir:"rtl",children:c.map(e=>{let r=e.highlight,o=r?"/"===i:i.startsWith(e.href);return r?(0,t.jsx)(n.default,{href:e.href,className:"home-btn mx-1 rounded-lg px-5 py-2 font-heading text-sm font-bold text-white",children:(0,t.jsx)("span",{className:"relative z-10",children:e.label})},e.href):(0,t.jsxs)(n.default,{href:e.href,className:`nav-link relative rounded-lg px-4 py-2 font-heading text-sm font-semibold ${o?"nav-active":"text-text-muted"}`,children:["badge"in e&&e.badge&&(0,t.jsx)("span",{className:"nav-badge",style:{background:e.badge.bg},children:e.badge.text}),e.label]},e.href+e.label)})}),(0,t.jsxs)("button",{onClick:()=>a(!0),className:"burger-btn flex flex-col gap-[5px] lg:hidden p-2","aria-label":"תפריט",children:[(0,t.jsx)("span",{className:"burger-line block h-[2px] w-6 rounded-full bg-text-secondary"}),(0,t.jsx)("span",{className:"burger-line block h-[2px] w-6 rounded-full bg-text-secondary"}),(0,t.jsx)("span",{className:"burger-line block h-[2px] w-4 rounded-full bg-text-secondary"})]})]})]}),(0,t.jsx)(s,{open:e,onClose:()=>a(!1),links:c})]})}e.s(["Header",()=>u],400138)},657532,e=>{"use strict";var t=e.i(843476);function r(){return(0,t.jsxs)("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[(0,t.jsx)("style",{children:`
        @keyframes shineSlide {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .footer-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.3) 25%,
            rgba(212, 175, 55, 0.6) 50%,
            rgba(212, 175, 55, 0.3) 75%,
            transparent 100%
          );
          animation: shineSlide 6s ease-in-out infinite;
          width: 200%;
        }
      `}),(0,t.jsx)("div",{className:"footer-shine"})]})}e.s(["FooterShine",()=>r])},600813,e=>{"use strict";var t=e.i(843476),r=e.i(271645),n=e.i(846932),o=e.i(88653);function a(){let[e,a]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let e=()=>{window.scrollY>300?a(!0):a(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),(0,t.jsx)(o.AnimatePresence,{children:e&&(0,t.jsx)(n.motion.button,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},transition:{duration:.3},onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},"aria-label":"Back to top",className:"fixed bottom-8 left-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gold text-background hover:bg-gold/90 transition-colors shadow-lg",children:(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 10l7-7m0 0l7 7m-7-7v18"})})})})}e.s(["BackToTop",()=>a])},565445,e=>{"use strict";var t=e.i(843476),r=e.i(271645);function n(){let[e,n]=(0,r.useState)(!1);return(0,t.jsxs)("a",{href:"https://wa.me/972500000000",target:"_blank",rel:"noopener noreferrer",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),"aria-label":"שוחח עם נציג בוואטסאפ",style:{position:"fixed",bottom:"24px",right:"24px",zIndex:9999,display:"flex",alignItems:"center",gap:"10px",direction:"rtl",background:e?"linear-gradient(135deg, #A855F7, #7C3AED)":"linear-gradient(135deg, #1A1A2E, #131825)",border:"1px solid rgba(168,85,247,0.45)",borderRadius:"50px",padding:"10px 18px 10px 14px",boxShadow:e?"0 0 28px rgba(168,85,247,0.55), 0 4px 20px rgba(0,0,0,0.4)":"0 0 14px rgba(168,85,247,0.2), 0 4px 16px rgba(0,0,0,0.35)",cursor:"pointer",textDecoration:"none",transition:"all 0.3s ease",transform:e?"translateY(-2px) scale(1.03)":"translateY(0) scale(1)"},children:[(0,t.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{flexShrink:0},children:[(0,t.jsx)("path",{d:"M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z",fill:e?"rgba(255,255,255,0.2)":"rgba(168,85,247,0.15)"}),(0,t.jsx)("path",{d:"M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z",stroke:e?"#fff":"#A855F7",strokeWidth:"1.5",fill:"none"}),(0,t.jsx)("path",{d:"M8.5 9.5C8.5 9 9 8 9.5 8c.4 0 .6.2.8.5l1 2c.2.3.1.6-.1.8l-.6.6c.4.8 1 1.4 1.8 1.8l.6-.6c.2-.2.5-.3.8-.1l2 1c.3.2.5.4.5.8 0 .5-1 1-1.5 1C11 15.8 8.2 13 8.5 9.5z",fill:e?"#fff":"#D8B4FE"})]}),(0,t.jsx)("span",{style:{fontFamily:"'Heebo', sans-serif",fontSize:"13px",fontWeight:600,color:e?"#fff":"#D8B4FE",whiteSpace:"nowrap",transition:"color 0.3s ease",letterSpacing:"0.01em"},children:"שוחח עם נציג"}),!e&&(0,t.jsx)("span",{style:{position:"absolute",inset:"-1px",borderRadius:"50px",border:"1px solid rgba(168,85,247,0.4)",animation:"waPulse 2.5s ease-out infinite",pointerEvents:"none"}}),(0,t.jsx)("style",{children:`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(1.08); opacity: 0; }
        }
      `})]})}e.s(["WhatsAppButton",()=>n])}]);