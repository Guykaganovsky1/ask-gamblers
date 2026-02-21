(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,495889,e=>{"use strict";var t=e.i(843476);let i=[[-14,-14],[14,-14],[0,0],[-14,14],[14,14]],a=[[-10,-10],[0,0],[10,10]],n=[[95,42,3.1,0],[490,160,2.8,1.2],[830,185,3.7,.8],[1160,172,2.5,.3],[1370,136,3.9,1]];function r({title:e,subtitle:r,badge:s}){return(0,t.jsxs)("div",{className:"relative w-full overflow-hidden",style:{height:300},children:[(0,t.jsx)("style",{children:`
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
      `}),(0,t.jsx)("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg, #06060E 0%, #0B0619 50%, #06060E 100%)"}}),(0,t.jsx)("div",{className:"absolute inset-0",style:{background:"radial-gradient(ellipse 70% 110% at 50% 50%, rgba(139,92,246,0.14) 0%, transparent 65%)"}}),(0,t.jsxs)("svg",{className:"absolute inset-0 w-full h-full",viewBox:"0 0 1440 300",preserveAspectRatio:"xMidYMid slice","aria-hidden":"true",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("filter",{id:"f-dice",x:"-35%",y:"-35%",width:"170%",height:"170%",children:[(0,t.jsx)("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"6",result:"blur"}),(0,t.jsx)("feColorMatrix",{in:"blur",type:"matrix",values:"1.4 0 0 0 0.1  0 0.05 0 0 0  0 0 0.05 0 0  0 0 0 0.8 0",result:"coloredBlur"}),(0,t.jsxs)("feMerge",{children:[(0,t.jsx)("feMergeNode",{in:"coloredBlur"}),(0,t.jsx)("feMergeNode",{in:"SourceGraphic"})]})]})}),(0,t.jsx)("g",{className:"d1x",children:(0,t.jsx)("g",{className:"d1y",children:(0,t.jsxs)("g",{className:"d1spin",filter:"url(#f-dice)",children:[(0,t.jsx)("polygon",{points:"27,-27 43,-43 43,12 27,27",fill:"#7F1D1D"}),(0,t.jsx)("ellipse",{cx:"31",cy:"-20",rx:"2.5",ry:"3",fill:"white",opacity:"0.72"}),(0,t.jsx)("ellipse",{cx:"35",cy:"-6",rx:"2.5",ry:"3",fill:"white",opacity:"0.72"}),(0,t.jsx)("ellipse",{cx:"39",cy:"8",rx:"2.5",ry:"3",fill:"white",opacity:"0.72"}),(0,t.jsx)("polygon",{points:"-27,-27 27,-27 43,-43 -11,-43",fill:"#F87171"}),(0,t.jsx)("ellipse",{cx:"-1",cy:"-37",rx:"3.2",ry:"2",fill:"white",opacity:"0.6"}),(0,t.jsx)("ellipse",{cx:"20",cy:"-37",rx:"3.2",ry:"2",fill:"white",opacity:"0.6"}),(0,t.jsx)("rect",{x:"-27",y:"-27",width:"54",height:"54",rx:"7",fill:"#DC2626"}),(0,t.jsx)("line",{x1:"-27",y1:"-27",x2:"27",y2:"-27",stroke:"rgba(255,255,255,0.22)",strokeWidth:"1.2"}),(0,t.jsx)("line",{x1:"-27",y1:"-27",x2:"-27",y2:"27",stroke:"rgba(255,255,255,0.18)",strokeWidth:"1.2"}),i.map(([e,i],a)=>(0,t.jsx)("circle",{cx:e,cy:i,r:"4.2",fill:"white",opacity:"0.93"},a))]})})}),(0,t.jsx)("g",{className:"d2x",children:(0,t.jsx)("g",{className:"d2y",children:(0,t.jsxs)("g",{className:"d2spin",filter:"url(#f-dice)",children:[(0,t.jsx)("polygon",{points:"22,-22 34,-34 34,10 22,22",fill:"#7F1D1D"}),(0,t.jsx)("ellipse",{cx:"28",cy:"-16",rx:"2",ry:"2.5",fill:"white",opacity:"0.7"}),(0,t.jsx)("ellipse",{cx:"28",cy:"2",rx:"2",ry:"2.5",fill:"white",opacity:"0.7"}),(0,t.jsx)("polygon",{points:"-22,-22 22,-22 34,-34 -10,-34",fill:"#F87171"}),(0,t.jsx)("ellipse",{cx:"7",cy:"-29",rx:"2.8",ry:"1.8",fill:"white",opacity:"0.6"}),(0,t.jsx)("rect",{x:"-22",y:"-22",width:"44",height:"44",rx:"6",fill:"#DC2626"}),(0,t.jsx)("line",{x1:"-22",y1:"-22",x2:"22",y2:"-22",stroke:"rgba(255,255,255,0.22)",strokeWidth:"1"}),(0,t.jsx)("line",{x1:"-22",y1:"-22",x2:"-22",y2:"22",stroke:"rgba(255,255,255,0.18)",strokeWidth:"1"}),a.map(([e,i],a)=>(0,t.jsx)("circle",{cx:e,cy:i,r:"3.8",fill:"white",opacity:"0.92"},a))]})})}),n.map(([e,i,a,n],r)=>(0,t.jsx)("text",{x:e,y:i,textAnchor:"middle",dominantBaseline:"middle",fontSize:8+r%3*3,fill:"rgba(168,85,247,0.9)",className:"ph-spark",style:{animation:`phTwinkle ${a}s ease-in-out infinite ${n}s`},children:"✦"},r)),(0,t.jsx)("line",{x1:"0",y1:"298",x2:"1440",y2:"298",stroke:"rgba(168,85,247,0.10)",strokeWidth:"1"})]}),(0,t.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6 z-10",children:[s&&(0,t.jsx)("span",{className:"inline-block rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest",children:s}),(0,t.jsx)("h1",{className:"font-heading text-4xl md:text-5xl font-black text-text-primary",style:{textShadow:"0 0 40px rgba(139,92,246,0.45)"},children:e}),r&&(0,t.jsx)("p",{className:"text-text-muted text-sm md:text-base max-w-lg leading-relaxed",children:r})]}),(0,t.jsx)("div",{className:"absolute bottom-0 left-0 right-0 h-20 pointer-events-none",style:{background:"linear-gradient(to bottom, transparent, #0A0A0F)"}})]})}e.s(["PageHero",()=>r])},654632,e=>{"use strict";var t=e.i(843476),i=e.i(846932);let a=[{icon:"🎰",name:"סלוטס",description:"מאות מכונות מזל מהספקים המובילים בעולם עם ג'קפוטים עצומים",tag:"הכי פופולרי"},{icon:"♠️",name:"פוקר",description:"טורנירים ושולחנות לכל רמות המיומנות - מתחילים ועד מקצוענים",tag:null},{icon:"🃏",name:"בלאקג'ק",description:"הגע ל-21 ונצח את הבנק. אחוז החזר גבוה ואסטרטגיה פשוטה",tag:"אחוז החזר גבוה"},{icon:"🎡",name:"רולטה",description:"סובב את הגלגל ובחר את המספר שלך — אירופאית, אמריקאית או צרפתית",tag:null},{icon:"📺",name:"קזינו חי",description:"דילרים אמיתיים בשידור חי 24/7 — חוויה אמיתית מהבית",tag:"חדש"},{icon:"🎲",name:"קרפס ובינגו",description:"משחקי קוביה ובינגו מרגשים — פשוטים, מהירים ומשתלמים",tag:null}];function n(){return(0,t.jsx)("div",{className:"grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",children:a.map((e,a)=>(0,t.jsxs)(i.motion.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:0},transition:{delay:.08*a,duration:.45},className:"group relative",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-accent-light to-emerald-neon p-[1px]"}),(0,t.jsxs)("div",{className:"relative flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card p-6 h-full backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_36px_rgba(168,85,247,0.3)]",children:[e.tag&&(0,t.jsx)("span",{className:"absolute top-4 left-4 rounded-full bg-accent/20 border border-accent/30 px-2.5 py-0.5 text-[10px] font-bold text-accent tracking-wide",children:e.tag}),(0,t.jsx)("div",{className:"flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-3xl transition-transform duration-300 group-hover:scale-110",children:e.icon}),(0,t.jsxs)("div",{className:"flex flex-col gap-2 flex-1",children:[(0,t.jsx)("h3",{className:"font-heading text-xl font-black text-text-primary group-hover:text-accent transition-colors",children:e.name}),(0,t.jsx)("p",{className:"text-sm text-text-secondary leading-relaxed",children:e.description})]}),(0,t.jsx)("button",{className:"mt-2 w-full rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/30 hover:border-accent py-2.5 text-sm font-bold transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",children:"שחקו עכשיו"})]})]},e.name))})}e.s(["GameFinder",()=>n])}]);