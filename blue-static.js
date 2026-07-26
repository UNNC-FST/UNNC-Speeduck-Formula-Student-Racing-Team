'use strict';
const navbar=document.querySelector('.navbar'),navToggle=document.querySelector('.nav-toggle'),navLinks=document.querySelector('.nav-links'),navAnchors=[...document.querySelectorAll('.nav-links a')];
function closeNav(){if(!navToggle||!navLinks)return;navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','打开导航菜单');navLinks.classList.remove('is-open')}
navToggle?.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'关闭导航菜单':'打开导航菜单');navLinks?.classList.toggle('is-open',open)});navAnchors.forEach(a=>a.addEventListener('click',closeNav));
document.querySelectorAll('[data-scroll-target]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.scrollTarget)?.scrollIntoView({behavior:'smooth'})));
const groups={electric:{button:'.el-btn',panel:'.el-content',prefix:'el-',section:'ele'},mechanical:{button:'.mc-btn',panel:'.mc-content',prefix:'mc-',section:'machine'},past:{button:'.past-btn',panel:'.past-content',prefix:'past-'}};
document.querySelectorAll('[data-panel-group]').forEach(btn=>btn.addEventListener('click',()=>{const c=groups[btn.dataset.panelGroup];if(!c)return;document.querySelectorAll(c.panel).forEach(p=>p.classList.remove('active'));document.querySelectorAll(c.button).forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});document.getElementById(c.prefix+btn.dataset.panel)?.classList.add('active');btn.classList.add('active');btn.setAttribute('aria-pressed','true');if(c.section)document.getElementById(c.section)?.scrollIntoView({behavior:'smooth',block:'start'})}));
const progress=document.createElement('div');progress.className='scroll-progress';document.body.appendChild(progress);const glow=document.createElement('div');glow.className='cursor-glow';glow.setAttribute('aria-hidden','true');document.body.appendChild(glow);addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
const sections=navAnchors.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);function update(){navbar?.classList.toggle('is-scrolled',scrollY>36);const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';let active=sections[0]?.id;sections.forEach(s=>{if(s.getBoundingClientRect().top<=innerHeight*.36)active=s.id});navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active))}
const targets=document.querySelectorAll('.intro-block,.hub-card,.bine-intro,.benefit-item,.bine-gallery,.contact-social-block,.el-nav,.el-content,.mc-nav,.mc-content,.past-nav,.past-content,.spon-card,.spon-action');targets.forEach(e=>e.classList.add('reveal'));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.09,rootMargin:'0px 0px -40px'});targets.forEach(e=>observer.observe(e));
document.querySelectorAll('.hub-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(matchMedia('(pointer:coarse)').matches)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.transform=`perspective(900px) rotateX(${(.5-y)*4}deg) rotateY(${(x-.5)*5}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
function particles(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const canvas=document.createElement('canvas');canvas.className='particle-field';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);const ctx=canvas.getContext('2d');let w,h,dots=[];function resize(){const ratio=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*ratio;canvas.height=h*ratio;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(ratio,0,0,ratio,0,0);dots=Array.from({length:Math.min(78,Math.max(34,Math.floor(w/19)))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:-.1-Math.random()*.3,r:.7+Math.random()*1.7}))}function draw(){ctx.clearRect(0,0,w,h);for(let i=0;i<dots.length;i++){const p=dots[i];p.x+=p.vx;p.y+=p.vy;if(p.y< -12)p.y=h+12;if(p.x< -12)p.x=w+12;if(p.x>w+12)p.x=-12;ctx.beginPath();ctx.fillStyle='rgba(54,129,221,.34)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();for(let j=i+1;j<dots.length;j++){const q=dots[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<112){ctx.beginPath();ctx.strokeStyle=`rgba(64,133,218,${.09*(1-d/112)})`;ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}requestAnimationFrame(draw)}resize();addEventListener('resize',resize,{passive:true});requestAnimationFrame(draw)}
addEventListener('scroll',update,{passive:true});addEventListener('resize',()=>{if(innerWidth>820)closeNav();update()},{passive:true});update();particles();

// V1 ENTRY GATE
const entryGate=document.querySelector('.entry-gate');
let entryCompleted=false;
function enterExperience(event){
  event?.preventDefault();
  if(entryCompleted){document.querySelector('#home')?.scrollIntoView({behavior:'smooth'});return}
  entryCompleted=true;
  entryGate?.classList.add('is-entering');
  setTimeout(()=>{
    document.body.classList.remove('entry-active');
    document.querySelector('#home')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
    setTimeout(()=>entryGate?.classList.remove('is-entering'),900);
  },matchMedia('(prefers-reduced-motion:reduce)').matches?0:620);
}
entryGate?.querySelectorAll('a[href="#home"]').forEach(link=>link.addEventListener('click',enterExperience));
addEventListener('scroll',()=>{
  if(!entryCompleted&&scrollY>Math.min(innerHeight*.28,240)){
    entryCompleted=true;
    document.body.classList.remove('entry-active');
  }
},{passive:true});