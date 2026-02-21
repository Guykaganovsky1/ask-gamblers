(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,495889,e=>{"use strict";var t=e.i(843476);let i=[[-14,-14],[14,-14],[0,0],[-14,14],[14,14]],s=[[-10,-10],[0,0],[10,10]],r=[[95,42,3.1,0],[490,160,2.8,1.2],[830,185,3.7,.8],[1160,172,2.5,.3],[1370,136,3.9,1]];function a({title:e,subtitle:a,badge:n}){return(0,t.jsxs)("div",{className:"relative w-full overflow-hidden",style:{height:300},children:[(0,t.jsx)("style",{children:`
        /* ── X: constant linear travel ── */
        @keyframes d1x {
          from { transform: translateX(-100px); }
          to   { transform: translateX(1560px); }
        }
        @keyframes d2x {
          from { transform: translateX(1560px); }
          to   { transform: translateX(-100px); }
        }

        /* ── Y: smooth arc bounces (3 full arcs per pass) ── */
        @keyframes d1y {
          0%     { transform: translateY(245px); animation-timing-function: ease-in; }
          16.67% { transform: translateY(55px);  animation-timing-function: ease-out; }
          33.33% { transform: translateY(245px); animation-timing-function: ease-in; }
          50%    { transform: translateY(55px);  animation-timing-function: ease-out; }
          66.67% { transform: translateY(245px); animation-timing-function: ease-in; }
          83.33% { transform: translateY(55px);  animation-timing-function: ease-out; }
          100%   { transform: translateY(245px); }
        }

        /* ── Spin: continuous slow axis rotation ── */
        @keyframes dSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Sparkles ── */
        @keyframes phTwinkle {
          0%, 100% { opacity: 0.07; transform: scale(0.5); }
          50%      { opacity: 0.55; transform: scale(1); }
        }

        .d1x { animation: d1x 20s linear infinite; }
        .d2x { animation: d2x 20s linear infinite 10s; }
        .d1y { animation: d1y 20s linear infinite; }
        .d2y { animation: d1y 20s linear infinite 10s; }
        .d1spin {
          animation: dSpin 11s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .d2spin {
          animation: dSpin 14s linear infinite reverse;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .ph-spark { transform-box: fill-box; transform-origin: 50% 50%; }
      `}),(0,t.jsx)("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg, #06060E 0%, #0B0619 50%, #06060E 100%)"}}),(0,t.jsx)("div",{className:"absolute inset-0",style:{background:"radial-gradient(ellipse 70% 110% at 50% 50%, rgba(139,92,246,0.14) 0%, transparent 65%)"}}),(0,t.jsxs)("svg",{className:"absolute inset-0 w-full h-full",viewBox:"0 0 1440 300",preserveAspectRatio:"xMidYMid slice","aria-hidden":"true",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("filter",{id:"f-dice",x:"-35%",y:"-35%",width:"170%",height:"170%",children:[(0,t.jsx)("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"6",result:"blur"}),(0,t.jsx)("feColorMatrix",{in:"blur",type:"matrix",values:"1.4 0 0 0 0.1  0 0.05 0 0 0  0 0 0.05 0 0  0 0 0 0.8 0",result:"coloredBlur"}),(0,t.jsxs)("feMerge",{children:[(0,t.jsx)("feMergeNode",{in:"coloredBlur"}),(0,t.jsx)("feMergeNode",{in:"SourceGraphic"})]})]})}),(0,t.jsx)("g",{className:"d1x",children:(0,t.jsx)("g",{className:"d1y",children:(0,t.jsxs)("g",{className:"d1spin",filter:"url(#f-dice)",children:[(0,t.jsx)("polygon",{points:"27,-27 43,-43 43,12 27,27",fill:"#7F1D1D"}),(0,t.jsx)("ellipse",{cx:"31",cy:"-20",rx:"2.5",ry:"3",fill:"white",opacity:"0.72"}),(0,t.jsx)("ellipse",{cx:"35",cy:"-6",rx:"2.5",ry:"3",fill:"white",opacity:"0.72"}),(0,t.jsx)("ellipse",{cx:"39",cy:"8",rx:"2.5",ry:"3",fill:"white",opacity:"0.72"}),(0,t.jsx)("polygon",{points:"-27,-27 27,-27 43,-43 -11,-43",fill:"#F87171"}),(0,t.jsx)("ellipse",{cx:"-1",cy:"-37",rx:"3.2",ry:"2",fill:"white",opacity:"0.6"}),(0,t.jsx)("ellipse",{cx:"20",cy:"-37",rx:"3.2",ry:"2",fill:"white",opacity:"0.6"}),(0,t.jsx)("rect",{x:"-27",y:"-27",width:"54",height:"54",rx:"7",fill:"#DC2626"}),(0,t.jsx)("line",{x1:"-27",y1:"-27",x2:"27",y2:"-27",stroke:"rgba(255,255,255,0.22)",strokeWidth:"1.2"}),(0,t.jsx)("line",{x1:"-27",y1:"-27",x2:"-27",y2:"27",stroke:"rgba(255,255,255,0.18)",strokeWidth:"1.2"}),i.map(([e,i],s)=>(0,t.jsx)("circle",{cx:e,cy:i,r:"4.2",fill:"white",opacity:"0.93"},s))]})})}),(0,t.jsx)("g",{className:"d2x",children:(0,t.jsx)("g",{className:"d2y",children:(0,t.jsxs)("g",{className:"d2spin",filter:"url(#f-dice)",children:[(0,t.jsx)("polygon",{points:"22,-22 34,-34 34,10 22,22",fill:"#7F1D1D"}),(0,t.jsx)("ellipse",{cx:"28",cy:"-16",rx:"2",ry:"2.5",fill:"white",opacity:"0.7"}),(0,t.jsx)("ellipse",{cx:"28",cy:"2",rx:"2",ry:"2.5",fill:"white",opacity:"0.7"}),(0,t.jsx)("polygon",{points:"-22,-22 22,-22 34,-34 -10,-34",fill:"#F87171"}),(0,t.jsx)("ellipse",{cx:"7",cy:"-29",rx:"2.8",ry:"1.8",fill:"white",opacity:"0.6"}),(0,t.jsx)("rect",{x:"-22",y:"-22",width:"44",height:"44",rx:"6",fill:"#DC2626"}),(0,t.jsx)("line",{x1:"-22",y1:"-22",x2:"22",y2:"-22",stroke:"rgba(255,255,255,0.22)",strokeWidth:"1"}),(0,t.jsx)("line",{x1:"-22",y1:"-22",x2:"-22",y2:"22",stroke:"rgba(255,255,255,0.18)",strokeWidth:"1"}),s.map(([e,i],s)=>(0,t.jsx)("circle",{cx:e,cy:i,r:"3.8",fill:"white",opacity:"0.92"},s))]})})}),r.map(([e,i,s,r],a)=>(0,t.jsx)("text",{x:e,y:i,textAnchor:"middle",dominantBaseline:"middle",fontSize:8+a%3*3,fill:"rgba(168,85,247,0.9)",className:"ph-spark",style:{animation:`phTwinkle ${s}s ease-in-out infinite ${r}s`},children:"✦"},a)),(0,t.jsx)("line",{x1:"0",y1:"298",x2:"1440",y2:"298",stroke:"rgba(168,85,247,0.10)",strokeWidth:"1"})]}),(0,t.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6 z-10",children:[n&&(0,t.jsx)("span",{className:"inline-block rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest",children:n}),(0,t.jsx)("h1",{className:"font-heading text-4xl md:text-5xl font-black text-text-primary",style:{textShadow:"0 0 40px rgba(139,92,246,0.45)"},children:e}),a&&(0,t.jsx)("p",{className:"text-text-muted text-sm md:text-base max-w-lg leading-relaxed",children:a})]}),(0,t.jsx)("div",{className:"absolute bottom-0 left-0 right-0 h-20 pointer-events-none",style:{background:"linear-gradient(to bottom, transparent, #0A0A0F)"}})]})}e.s(["PageHero",()=>a])},922883,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(634949);let r=[{label:"הכל",key:"all"},{label:"מאומתים",key:"certified"},{label:"מובייל",key:"mobile"},{label:"חדשים",key:"newest"},{label:"אונליין",key:"online"}],a={certified:["certified","מאומת"],mobile:["mobile","מובייל"],newest:["newest","חדש","new"],online:["online","אונליין"]};function n(e,t){if("all"===t)return!0;if(!e.categories||0===e.categories.length)return!1;let i=a[t];return e.categories.some(e=>i.some(t=>e.name.toLowerCase().includes(t.toLowerCase())))}function l({casinos:e}){let[a,l]=(0,i.useState)("all"),o=e.filter(e=>n(e,a));return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"mb-10 flex flex-wrap gap-2",dir:"rtl",children:r.map(({label:i,key:s})=>(0,t.jsxs)("button",{onClick:()=>l(s),className:`rounded-full border px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${a===s?"border-accent bg-accent text-white shadow-lg shadow-accent/30":"border-border-glass bg-card/40 text-text-muted hover:border-accent/60 hover:text-accent"}`,children:[i,"all"!==s&&(0,t.jsxs)("span",{className:"ms-1.5 text-xs opacity-60",children:["(",e.filter(e=>n(e,s)).length,")"]})]},s))}),o.length>0?(0,t.jsx)("div",{className:"grid gap-6 sm:grid-cols-2 lg:grid-cols-3",children:o.map((e,i)=>(0,t.jsx)(s.CasinoCard,{...e,index:i},e._id))}):(0,t.jsx)("div",{className:"py-24 text-center text-text-muted",children:"לא נמצאו קזינו בקטגוריה זו"})]})}e.s(["CasinoFilter",()=>l])}]);