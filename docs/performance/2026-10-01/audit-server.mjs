import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const output = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(output, '../../../dist');
await mkdir(output, { recursive: true });
const probe = `(() => {
 const runs = [], errors = [], shifts = [], tasks = [], frames = [];
 let draws = 0, start = performance.now(), last = 0, end = start + 10000, tag = 'initial-load';
 const query = new URLSearchParams(location.search);
 const run = query.get('run') || 'aux';
 const gate = query.get('gate');
 if (gate === 'reduced') {
  const original = window.matchMedia.bind(window);
  window.matchMedia = query => {const media=original(query);if(query==='(prefers-reduced-motion: reduce)')Object.defineProperty(media,'matches',{value:true});return media;};
 }
 if (gate === 'saver') Object.defineProperty(navigator,'connection',{value:{saveData:true,effectiveType:'4g'}});
 for (const name of ['WebGLRenderingContext','WebGL2RenderingContext']) {
  const prototype = window[name]?.prototype;
  if (!prototype) continue;
  for (const method of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']) {
   const original = prototype[method];
   if (!original) continue;
   prototype[method] = function(...args) { draws++; return original.apply(this,args); };
  }
 }
 for (const type of ['longtask','layout-shift','largest-contentful-paint']) {
  if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
  new PerformanceObserver(list => {
   for (const entry of list.getEntries()) {
    if (type === 'longtask') tasks.push({start:entry.startTime,duration:entry.duration});
    if (type === 'layout-shift') shifts.push({start:entry.startTime,value:entry.value,input:entry.hadRecentInput});
    if (type === 'largest-contentful-paint') document.documentElement.dataset.auditLcp = JSON.stringify({time:entry.startTime,size:entry.size,element:entry.element?.tagName,class:entry.element?.className,url:entry.url});
   }
  }).observe({type,buffered:true});
 }
 addEventListener('error', e => errors.push(e.message));
 function snapshot() {
  const sample = frames.filter(f => f.t>=start && f.t<=end);
  const sorted = sample.map(f => f.dt).sort((a,b)=>a-b);
  const busy = sample.filter(f => f.draws>0);
  const scenes = [...document.querySelectorAll('[data-scene]')].map(e=>({scene:e.dataset.scene,state:e.dataset.renderState}));
  return {run,tag,url:location.href,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},userAgent:navigator.userAgent,start,end,frames:sample,summary:{samples:sample.length,p50:sorted[Math.floor(sorted.length*.5)],p95:sorted[Math.floor(sorted.length*.95)],max:sorted.at(-1),over25:sample.filter(f=>f.dt>25).length,over50:sample.filter(f=>f.dt>50).length,drawCalls:sample.reduce((n,f)=>n+f.draws,0),renderedFrames:busy.length,maxDraws:Math.max(0,...busy.map(f=>f.draws))},longTasks:tasks.filter(t=>t.start>=start && t.start<=end),cls:shifts.filter(s=>!s.input).reduce((n,s)=>n+s.value,0),shifts,lcp:JSON.parse(document.documentElement.dataset.auditLcp||'null'),paint:performance.getEntriesByType('paint').map(e=>e.toJSON()),navigation:performance.getEntriesByType('navigation').map(e=>e.toJSON()),resources:performance.getEntriesByType('resource').filter(e=>!e.name.includes('/__audit')).map(e=>e.toJSON()),scenes,errors};
 }
 async function save() {
  const data = snapshot(); runs.push(data);
  document.documentElement.dataset.auditMetrics=JSON.stringify(data.summary);
  await fetch('/__audit/'+run+'-'+tag+'.json',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});
  panel.textContent='Sample 8 seconds';
 }
 function tick(t) {
  if(last && !document.hidden) frames.push({t,dt:t-last,draws});
  last=t;draws=0;
  if(frames.length>20000) frames.splice(0,10000);
  requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
 const panel=document.createElement('button');panel.textContent='Measuring initial load';panel.id='audit-sample';
 panel.style.cssText='position:fixed;bottom:12px;right:12px;z-index:999;font:12px system-ui;padding:12px;background:white;color:black;border:1px solid black';
 panel.addEventListener('click',()=>{ tag='sample-'+runs.length;start=performance.now();end=start+8000;panel.textContent='Sampling…';setTimeout(save,8100); });
 document.addEventListener('DOMContentLoaded',()=>document.body.append(panel));
 setTimeout(save,10100);
})();`;
const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.glb':'model/gltf-binary'};
createServer(async (req,res) => {
 try {
  const path = new URL(req.url,'http://localhost').pathname;
  if(path==='/__audit/probe.js'){res.setHeader('Content-Type','text/javascript');res.end(probe);return;}
  if(req.method==='POST' && /^\/__audit\/[a-z0-9-]+\.json$/.test(path)) {
   let raw='';for await (const chunk of req) {raw+=chunk;if(raw.length>2000000)throw Error('too large');}
   const data=JSON.parse(raw);if(!data.viewport||!data.summary)throw Error('Invalid metrics');
   await writeFile(resolve(output,path.split('/').at(-1)),JSON.stringify(data,null,2));res.end('saved');return;
  }
  let file=resolve(root,'.'+decodeURIComponent(path));if(!file.startsWith(root+'/') && file!==root)throw Error('Invalid path');
  if(!extname(file)) file=resolve(file,'index.html');
  let body=await readFile(file);if(extname(file)==='.html') {
   const run = new URL(req.url,'http://localhost').searchParams.get('run') || 'aux';
   const html = body.toString().replace(/(\/_astro\/[^\s"<>]+\.webp)/g, '$1?audit='+encodeURIComponent(run));
   body=Buffer.from(html.replace('<head>','<head><script src="/__audit/probe.js"></script>'));
  }
  res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(body);
 } catch(e) {res.statusCode=404;res.end('Not found');}
}).listen(4322,'127.0.0.1',()=>console.log('Instrumented production build: http://127.0.0.1:4322'));
