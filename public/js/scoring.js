/* ---------- SKOR ---------- */
const pct=(sum,min,max)=>Math.round((sum-min)/(max-min)*100);
function compute(a,name,unit){
 const b={};['E','A','C','N','O'].forEach(t=>{const its=B5.filter(x=>x[1]==t); b[t]=pct(its.reduce((s,x)=>s+(x[2]?6-a[x[0]]:a[x[0]]),0),4,20);});
 const s={};['a','r'].forEach(t=>{const its=SS.filter(x=>x[1]==t); s[t]=pct(its.reduce((q,x)=>q+(x[2]?6-a[x[0]]:a[x[0]]),0),6,30);});
 const c={};['comp','coll','compr','avoid','acc'].forEach(t=>{c[t]=pct(CF.filter(x=>x[1]==t).reduce((q,x)=>q+a[x[0]],0),3,15)});
 const k={v:0,a:0,k:0}; VAK.forEach(x=>k[a[x[0]]]++);
 const m={mot:0,ref:0,opt:0,scope:0}; MP.forEach(x=>{if(a[x[0]]=='A')m[x[1]]++});
 return {n:name||'Tanpa nama',u:unit||'',b:{E:b.E,A:b.A,C:b.C,S:100-b.N,O:b.O},s,c,k,m};
}
function derive(R){
 const comm=R.s.a>=50?(R.s.r>=50?'peacock':'tiger'):(R.s.r>=50?'dolphin':'owl');
 const order=['coll','compr','comp','acc','avoid'];
 const conf=Object.keys(R.c).sort((x,y)=>R.c[y]-R.c[x]||order.indexOf(x)-order.indexOf(y));
 const ei=R.b.E>60?'Ekstrovert':R.b.E<40?'Introvert':'Ambivert';
 const vmax=Math.max(R.k.v,R.k.a,R.k.k); const vak=['v','a','k'].filter(x=>R.k[x]==vmax);
 return {comm,conf,ei,vak};
}
const lvl=v=>v>60?'Tinggi':v<40?'Rendah':'Sedang';
/* kode */
function encode(R){const arr=[R.n,R.u,[R.b.E,R.b.A,R.b.C,R.b.S,R.b.O],[R.s.a,R.s.r],[R.c.comp,R.c.coll,R.c.compr,R.c.avoid,R.c.acc],[R.k.v,R.k.a,R.k.k],[R.m.mot,R.m.ref,R.m.opt,R.m.scope]];
 return 'NEG1.'+btoa(unescape(encodeURIComponent(JSON.stringify(arr)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function decode(code){try{let s=code.trim().slice(5).replace(/-/g,'+').replace(/_/g,'/'); while(s.length%4)s+='=';
 const a=JSON.parse(decodeURIComponent(escape(atob(s))));
 return {n:a[0],u:a[1],b:{E:a[2][0],A:a[2][1],C:a[2][2],S:a[2][3],O:a[2][4]},s:{a:a[3][0],r:a[3][1]},c:{comp:a[4][0],coll:a[4][1],compr:a[4][2],avoid:a[4][3],acc:a[4][4]},k:{v:a[5][0],a:a[5][1],k:a[5][2]},m:{mot:a[6][0],ref:a[6][1],opt:a[6][2],scope:a[6][3]}};}catch(e){return null}}
