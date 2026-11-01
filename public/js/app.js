/* ---------- STATE ---------- */
/* Mode uji coba: tombol demo & data contoh hanya muncul bila URL memuat ?demo */
const DEMO=new URLSearchParams(location.search).has('demo');
if(DEMO){document.getElementById('btn-demo').hidden=false;document.getElementById('btn-sample').hidden=false;}
let ans={}, sent=null; /* sent = {s,c}: kode hasil terakhir yang berhasil dikirim ke sesi s */
const LS='negprof.v1';
/* Kode sesi dari tautan peserta (?s=KODE) mengalahkan yang tersimpan */
const URL_SC=normCode(new URLSearchParams(location.search).get('s'));
try{const s=JSON.parse(localStorage.getItem(LS)||'null'); if(s){ans=s.ans||{}; sent=s.sent||null; setTimeout(()=>{nm.value=s.nm||'';un.value=s.un||'';if(!URL_SC)sc.value=s.sc||'';},0)}}catch(e){}
function save(){try{localStorage.setItem(LS,JSON.stringify({ans,nm:nm.value,un:un.value,sc:sc.value,sent}))}catch(e){}}
const $=s=>document.querySelector(s);
const nm=$('#nm'),un=$('#un'),sc=$('#sc');
if(URL_SC){sc.value=URL_SC;$('#team-sc').value=URL_SC;setTimeout(save,0);}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- RENDER TES ---------- */
function renderTest(){
 let n=0,h='';
 SECTIONS.forEach((s,si)=>{
  h+=`<div class="card"><div class="section-head"><div class="eyebrow">Bagian ${si+1} dari 5 · ${s.tag}</div><h2>${s.title}</h2><p class="muted">${s.intro}</p></div>`;
  if(s.type==='lik') h+=`<div class="scale-legend"><span>1 = ${s.lab[0]}</span><span>5 = ${s.lab[4]}</span></div>`;
  s.items.forEach(it=>{n++;
   h+=`<div class="item" id="it-${it.id}"><div class="q"><b>${n}</b><span>${esc(it.q)}</span></div>`;
   if(s.type==='lik'){h+=`<div class="lik" role="radiogroup" aria-label="Pernyataan ${n}">`;
    for(let v=1;v<=5;v++) h+=`<label><input type="radio" name="${it.id}" id="${it.id}-${v}" value="${v}" ${ans[it.id]==v?'checked':''}><span>${v}</span>${s.lab[v-1]}</label>`;
    h+='</div>';}
   else{h+=`<div class="opts" role="radiogroup">`;
    it.o.forEach(o=>h+=`<label><input type="radio" name="${it.id}" id="${it.id}-${o[0]}" value="${o[0]}" ${ans[it.id]==o[0]?'checked':''}>${esc(o[1])}</label>`);
    h+='</div>';}
   h+='</div>';});
  h+='</div>';});
 $('#sections').innerHTML=h;
 progress();
}
$('#sections').addEventListener('change',e=>{const t=e.target; if(t.type!=='radio')return;
 ans[t.name]=isNaN(t.value)?t.value:+t.value; document.getElementById('it-'+t.name).classList.remove('missing'); save(); progress();});
[nm,un,sc].forEach(el=>el.addEventListener('input',save));
function progress(){const d=ALL.filter(k=>ans[k]!=null).length; $('#pbar').style.width=(d/ALL.length*100)+'%'; $('#pcount').textContent=d+'/'+ALL.length;}
function finish(){
 const miss=ALL.filter(k=>ans[k]==null);
 if(miss.length){miss.forEach(k=>document.getElementById('it-'+k).classList.add('missing'));
  const el=document.getElementById('it-'+miss[0]); el.scrollIntoView({behavior:'smooth',block:'center'});
  $('#pcount').textContent=`${ALL.length-miss.length}/${ALL.length} · ${miss.length} belum dijawab`; return;}
 show('hasil');
}
$('#btn-finish').onclick=finish; $('#btn-finish2').onclick=finish;
$('#btn-demo').onclick=()=>{ALL.forEach(k=>{if(ans[k]==null){const it=VAK.find(x=>x[0]==k)||MP.find(x=>x[0]==k);
  ans[k]= it? (VAK.find(x=>x[0]==k)? 'vak'[Math.floor(Math.random()*3)] : 'AB'[Math.floor(Math.random()*2)]) : 1+Math.floor(Math.random()*5);}});
 if(!nm.value)nm.value='Peserta Uji Coba'; save(); renderTest();};
let resetArm=false;
$('#btn-reset').onclick=e=>{const b=e.currentTarget; if(!resetArm){resetArm=true;b.textContent='Yakin? Klik sekali lagi';setTimeout(()=>{resetArm=false;b.textContent='Kosongkan jawaban'},4000);return;}
 ans={};resetArm=false;b.textContent='Kosongkan jawaban';save();renderTest();window.scrollTo(0,0);};

/* ---------- VISUAL ---------- */
function quad(points){
 const X=v=>44+v/100*280, Y=v=>18+(100-v)/100*280;
 let g=`<svg class="quad" viewBox="0 0 340 340" role="img" aria-label="Peta gaya komunikasi">`;
 const q=[['tiger',44,18],['peacock',184,18],['owl',44,158],['dolphin',184,158]];
 q.forEach(([k,x,y])=>{g+=`<rect x="${x}" y="${y}" width="140" height="140" fill="var(${COMM[k].col})" fill-opacity=".12"/>`;
  g+=`<text x="${x+8}" y="${y+20}" font-size="13" font-weight="700" style="fill:var(${COMM[k].col})">${COMM[k].en}</text>`;});
 g+=`<line x1="184" y1="18" x2="184" y2="298" stroke="var(--line)" stroke-width="1.5"/><line x1="44" y1="158" x2="324" y2="158" stroke="var(--line)" stroke-width="1.5"/>`;
 g+=`<rect x="44" y="18" width="280" height="280" fill="none" stroke="var(--line)"/>`;
 g+=`<text x="184" y="318" font-size="11" text-anchor="middle">Fokus tugas  ←  Responsivitas  →  Fokus orang</text>`;
 g+=`<text x="14" y="158" font-size="11" text-anchor="middle" transform="rotate(-90 14 158)">Bertanya  ←  Asertivitas  →  Mengarahkan</text>`;
 points.forEach(p=>{const x=X(Math.min(97,Math.max(3,p.r))),y=Y(Math.min(97,Math.max(3,p.a)));
  g+=`<circle cx="${x}" cy="${y}" r="${p.lbl?11:8}" fill="var(--accent)" stroke="var(--surface)" stroke-width="2.5"/>`;
  if(p.lbl)g+=`<text x="${x}" y="${y+4}" font-size="9.5" font-weight="700" text-anchor="middle" style="fill:var(--surface)">${esc(p.lbl)}</text>`;});
 return g+'</svg>';
}
function bars(rows){return `<div class="bars">${rows.map(r=>`<div class="barrow ${r.top?'top':''}"><span class="lbl">${r.l}</span><span class="track"><i style="width:${Math.max(2,r.v)}%;background:var(${r.c||'--accent'})"></i></span><span class="v">${r.v}</span></div>`).join('')}</div>`}
const badge=(o,sz)=>`<div class="badge" style="background:var(${o.col})${sz?';width:'+sz+'px;height:'+sz+'px':''}" aria-hidden="true">${o.mono}</div>`;

/* ---------- HASIL ---------- */
const SAMPLE_R={n:'Contoh Peserta',u:'Community Relations',b:{E:38,A:72,C:66,S:56,O:63},s:{a:42,r:67},c:{comp:33,coll:83,compr:58,avoid:50,acc:67},k:{v:3,a:1,k:2},m:{mot:1,ref:2,opt:2,scope:1}};
function renderResult(){
 const complete=ALL.every(k=>ans[k]!=null);
 const R=complete?compute(ans,nm.value.trim(),un.value.trim()):SAMPLE_R;
 const D=derive(R), cm=COMM[D.comm], c1=CONF[D.conf[0]], c2=CONF[D.conf[1]], cl=CONF[D.conf[4]];
 const code=encode(R);
 let h='';
 if(!complete)h+=`<div class="notice sample"><b>Ini contoh hasil.</b> Selesaikan semua pernyataan di tab "Isi Tes" untuk melihat profil Anda sendiri.</div>`;
 else h+=`<div class="row no-print" style="justify-content:flex-end"><button class="btn" id="btn-pdf">Simpan PDF</button></div>`;
 h+=`<div class="card hero"><div class="badges">${badge(cm)}${badge(c1)}</div><div style="display:flex;flex-direction:column;gap:6px;min-width:0">
   <div class="eyebrow">${esc(R.n)}${R.u?' · '+esc(R.u):''}</div>
   <div class="big">${cm.en} – ${c1.en}</div>
   <p>${cm.tag}, yang dalam konflik cenderung <b>${c1.verb}</b>.</p>
   <div class="chips"><span class="chip">${D.ei} (E ${R.b.E})</span><span class="chip">Komunikasi: ${cm.en} / ${cm.id}</span><span class="chip">Konflik: ${c1.en} / ${c1.id}</span><span class="chip">Cadangan: ${c2.en}</span><span class="chip">VAK: ${D.vak.map(x=>VAKINFO[x].n).join(' + ')}</span></div>
 </div></div>`;
 // charts
 h+=`<div class="grid2">
  <div class="card"><h3>Gaya komunikasi</h3>${quad([{a:R.s.a,r:R.s.r}])}<p class="small muted">Asertivitas ${R.s.a} · Responsivitas ${R.s.r}</p></div>
  <div class="card"><h3>Gaya konflik</h3>${bars(D.conf.map((k,i)=>({l:`${CONF[k].en} · ${CONF[k].name}`,v:R.c[k],c:CONF[k].col,top:i==0})))}
   <p class="small muted">Semua mode berguna pada situasi tertentu. Skor menunjukkan seberapa sering mode itu Anda pakai.</p></div>
  <div class="card"><h3>Kepribadian (Big Five)</h3>${bars(['E','A','C','S','O'].map(t=>({l:B5INFO[t].n,v:R.b[t]})))}</div>
  <div class="card"><h3>Lapis NLP</h3>${bars(['v','a','k'].map(x=>({l:VAKINFO[x].n,v:Math.round(R.k[x]/6*100),c:'--accent2'})))}
   <div class="poles">${Object.keys(MPINFO).map(d=>{const p=MPINFO[d],v=R.m[d];return `<div class="pole"><div class="ends"><span class="${v==2?'':''}">${v==2?'<b>'+p.a+'</b>':p.a}</span><span>${v==0?'<b>'+p.b+'</b>':p.b}</span></div><div class="line"><i style="left:${[92,50,8][v]}%"></i></div></div>`}).join('')}</div></div>
 </div>`;
 // interpretation
 h+=`<div class="card"><div class="row" style="gap:12px">${badge(cm,44)}<div><div class="eyebrow">Gaya komunikasi</div><h2>${cm.en} (${cm.id})</h2></div></div>
  <div class="interp"><dl class="blk"><dt>Kekuatan</dt><dd>${cm.str}</dd></dl><dl class="blk"><dt>Titik buta</dt><dd>${cm.risk}</dd></dl><dl class="blk"><dt>Latihan</dt><dd>${cm.tip}</dd></dl><dl class="blk"><dt>Cara orang lain menghadapi Anda</dt><dd>${cm.deal}</dd></dl></div></div>`;
 h+=`<div class="card"><div class="row" style="gap:12px">${badge(c1,44)}<div><div class="eyebrow">Gaya konflik utama</div><h2>${c1.en} (${c1.id}) · ${c1.name}</h2></div></div>
  <div class="interp"><dl class="blk"><dt>Tepat dipakai</dt><dd>${c1.when}</dd></dl><dl class="blk"><dt>Risiko</dt><dd>${c1.risk}</dd></dl><dl class="blk"><dt>Kembangkan</dt><dd>${c1.dev}</dd></dl>
  <dl class="blk"><dt>Gaya cadangan</dt><dd><b>${c2.en} · ${c2.name}</b>: biasanya muncul saat gaya utama tidak berhasil atau di bawah tekanan.</dd></dl>
  <dl class="blk"><dt>Paling jarang</dt><dd><b>${cl.en} · ${cl.name}</b> (skor ${R.c[D.conf[4]]}). ${cl.when.replace(/\.$/,'')} adalah situasi saat mode ini justru dibutuhkan.</dd></dl></div></div>`;
 h+=`<div class="card"><div class="eyebrow">Kepribadian & negosiasi</div><div>${['E','A','C','S','O'].map(t=>{const v=R.b[t],L=lvl(v),inf=B5INFO[t];return `<div class="trait"><b>${inf.n} ${v}<span class="lvl">${t=='E'?D.ei:L}</span></b><span>${L=='Tinggi'?inf.hi:L=='Rendah'?inf.lo:inf.mid}</span></div>`}).join('')}</div></div>`;
 h+=`<div class="card"><div class="eyebrow">Lapis NLP</div><div>${D.vak.map(x=>`<div class="trait"><b>Dominan ${VAKINFO[x].n}</b><span>${VAKINFO[x].t}</span></div>`).join('')}
  ${Object.keys(MPINFO).map(d=>{const p=MPINFO[d],v=R.m[d];return `<div class="trait"><b>${v==2?p.a:v==0?p.b:p.a+' / '+p.b+' (seimbang)'}</b><span>${v==2?p.ta:v==0?p.tb:'Luwes: '+p.ta.split(';')[0].toLowerCase()+', sekaligus '+p.tb.split(';')[0].toLowerCase()+'.'}</span></div>`}).join('')}</div></div>`;
 // plan
 const plan=[c1.dev, cm.tip.split('. ')[0]+'.'];
 if(R.b.S<40)plan.push('Siapkan rutinitas regulasi emosi: minta jeda (caucus) saat terpancing, dan latih respons untuk tiga provokasi yang paling mungkin muncul.');
 else if(R.b.A>65)plan.push('Tuliskan walk-away point dan target sebelum setiap perundingan; jangan ubah di ruangan tanpa konsultasi tim.');
 else if(R.b.E<40)plan.push('Sebagai introvert, siapkan pernyataan pembuka tertulis dan sepakati sinyal dengan rekan untuk meminta jeda.');
 else if(R.b.C<40)plan.push('Gunakan daftar periksa persiapan negosiasi (kepentingan, BATNA, ZOPA, mandat) dan notulen kesepakatan.');
 else plan.push(`Latih mode ${cl.en} (${cl.name}) lewat role-play, agar repertoar Anda lebih lengkap.`);
 h+=`<div class="card"><h3>Tiga hal untuk dilatih</h3><ul class="clean">${plan.map(p=>`<li>${p}</li>`).join('')}</ul></div>`;
 h+=`<div class="card"><h3>Kode hasil untuk fasilitator</h3><p class="small muted">Salin kode ini dan kirimkan ke fasilitator. Kode berisi nama, unit, dan skor Anda.</p>
  <div class="code" id="mycode">${complete?code:'(kode muncul setelah semua pernyataan dijawab)'}</div>
  <div class="row"><button class="btn primary" id="btn-copy" ${complete?'':'disabled'}>Salin kode</button><button class="btn" id="btn-copysum" ${complete?'':'disabled'}>Salin ringkasan</button><span class="toast" id="copy-toast"></span></div>
  ${complete?`<div class="status" id="send-status"></div>`:''}</div>`;
 $('#p-hasil').innerHTML=h;
 const summary=`${R.n}${R.u?' ('+R.u+')':''}: ${cm.en}–${c1.en} | ${D.ei} | Komunikasi ${cm.en}/${cm.id} (A${R.s.a}/R${R.s.r}) | Konflik ${c1.en} ${R.c[D.conf[0]]}, cadangan ${c2.en} | Big Five E${R.b.E} A${R.b.A} C${R.b.C} S${R.b.S} O${R.b.O} | VAK ${D.vak.map(x=>VAKINFO[x].n).join('+')}`;
 if(complete){$('#btn-copy').onclick=()=>copy(code,'#copy-toast','#mycode'); $('#btn-copysum').onclick=()=>copy(summary,'#copy-toast'); sendResult(code);
  $('#btn-pdf').onclick=()=>savePdf(`Profil Negosiasi - ${R.n}`,`${R.n}${R.u?' · '+R.u:''}`);}
}
/* Simpan PDF lewat dialog cetak browser (pilih "Simpan sebagai PDF"); judul dokumen menjadi nama berkas bawaan */
function savePdf(title,meta){
 const t=document.title; document.title=title.replace(/[\\/:*?"<>|]+/g,'-');
 $('#print-meta').textContent=meta+' · '+new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
 addEventListener('afterprint',()=>document.title=t,{once:true});
 window.print();
}
/* Kirim hasil ke sesi: otomatis saat tab Hasil dibuka; bila kode sesi kosong/gagal, tampilkan isian & tombol kirim */
async function sendResult(code,force){
 const st=$('#send-status'); if(!st)return;
 const s=normCode(sc.value);
 const ask=(msg,err)=>{st.innerHTML=`<span class="toast ${err?'err':''}" style="flex-basis:100%">${esc(msg)}</span>
   <label class="field grow" for="sc2">Kode sesi<input id="sc2" class="mono" autocomplete="off" spellcheck="false" value="${esc(s)}" placeholder="mis. K7M2QX"></label>
   <button class="btn primary" id="btn-send" style="align-self:flex-end">Kirim ke sesi</button>`;
  $('#btn-send').onclick=()=>{sc.value=normCode($('#sc2').value);save();sendResult(code,true);};};
 if(!s){ask('Belum ada kode sesi. Masukkan kode dari fasilitator untuk mengirim hasil Anda.');return;}
 if(!validCode(s)){ask('Kode sesi hanya boleh berisi huruf, angka, dan tanda hubung (3–32 karakter).',true);return;}
 if(!force&&sent&&sent.s==s&&sent.c==code){st.innerHTML=`<span class="toast">Tersimpan ke sesi ${esc(s)}</span>`;return;}
 st.innerHTML=`<span class="muted">Mengirim ke sesi ${esc(s)}…</span>`;
 try{await submitResult(s,code); sent={s,c:code}; save(); st.innerHTML=`<span class="toast">Tersimpan ke sesi ${esc(s)}</span>`;}
 catch(e){ask(`Gagal mengirim ke sesi ${s}: ${e.message}. Coba lagi, atau salin kode di atas dan kirim ke fasilitator.`,true);}
}
function copy(text,toastSel,selectSel){
 const ok=()=>{$(toastSel).textContent='Tersalin';setTimeout(()=>$(toastSel).textContent='',2500)};
 try{navigator.clipboard.writeText(text).then(ok,()=>fallback())}catch(e){fallback()}
 function fallback(){if(selectSel){const r=document.createRange();r.selectNodeContents($(selectSel));const s=getSelection();s.removeAllRanges();s.addRange(r);}
  $(toastSel).textContent='Teks sudah dipilih, tekan Ctrl/⌘+C';}
}

/* ---------- TIM ---------- */
const SAMPLE_TEAM=[
 ['Andi (contoh)','Pertanahan',[71,44,58,69,55],[78,35],[75,50,58,25,33]],
 ['Rina (contoh)','Community Relations',[63,81,50,56,69],[58,83],[33,83,58,42,75]],
 ['Bayu (contoh)','Legal',[31,50,88,75,56],[44,21],[58,75,42,50,33]],
 ['Sari (contoh)','CSR',[44,88,63,44,75],[33,79],[25,67,58,67,83]],
 ['Dimas (contoh)','HSE',[56,56,81,63,44],[67,40],[67,58,50,33,42]],
 ['Lestari (contoh)','Lingkungan',[25,69,69,38,81],[29,54],[25,58,50,75,67]],
 ['Yoga (contoh)','Operasi',[69,38,44,81,50],[83,58],[83,42,67,17,25]],
 ['Maya (contoh)','Humas',[81,75,56,50,88],[63,88],[42,67,75,50,58]]
].map(([n,u,b,s,c],i)=>encode({n,u,b:{E:b[0],A:b[1],C:b[2],S:b[3],O:b[4]},s:{a:s[0],r:s[1]},c:{comp:c[0],coll:c[1],compr:c[2],avoid:c[3],acc:c[4]},k:[{v:3,a:2,k:1},{v:1,a:4,k:1},{v:4,a:1,k:1},{v:2,a:2,k:2},{v:2,a:1,k:3},{v:4,a:1,k:1},{v:1,a:2,k:3},{v:2,a:3,k:1}][i],m:{mot:[2,1,0,1,0,0,2,2][i],ref:[2,0,2,0,1,2,2,0][i],opt:[1,2,0,2,0,1,2,2][i],scope:[2,2,0,1,0,0,1,2][i]}}));
let teamRows=[];
function initials(n){return n.replace(/\(.*?\)/g,'').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase()||'?'}
function analyzeTeam(){
 const codes=($('#codes').value.match(/NEG1\.[A-Za-z0-9_-]+/g)||[]);
 const people=codes.map(decode).filter(Boolean);
 const out=$('#team-out');
 if(!people.length){out.innerHTML=`<div class="notice">Belum ada kode yang valid. Kode diawali dengan <code>NEG1.</code></div>`;teamRows=[];return;}
 const P=people.map(R=>({R,D:derive(R),ini:initials(R.n)}));
 teamRows=P; const N=P.length;
 const cnt=(f,k)=>P.filter(p=>f(p)==k).length;
 const mean=f=>Math.round(P.reduce((s,p)=>s+f(p),0)/N);
 let h='';
 if(/contoh/.test(people[0].n))h+=`<div class="notice sample"><b>Data contoh.</b> Delapan peserta fiktif untuk menunjukkan cara kerja rekap. Ganti dengan kode peserta Anda.</div>`;
 // summary chips
 h+=`<div class="card"><div class="eyebrow">${N} peserta</div><h2>Komposisi tim</h2><div class="legend-animals">
  ${Object.keys(COMM).map(k=>`<div class="animal-mini">${badge(COMM[k])}<div><b>${COMM[k].en}</b><br><span class="muted">${cnt(p=>p.D.comm,k)} orang</span></div></div>`).join('')}
  ${Object.keys(CONF).map(k=>`<div class="animal-mini">${badge(CONF[k])}<div><b>${CONF[k].en}</b><br><span class="muted">${cnt(p=>p.D.conf[0],k)} orang · ${CONF[k].name}</span></div></div>`).join('')}
 </div><div class="chips"><span class="chip">Introvert ${cnt(p=>p.D.ei,'Introvert')}</span><span class="chip">Ambivert ${cnt(p=>p.D.ei,'Ambivert')}</span><span class="chip">Ekstrovert ${cnt(p=>p.D.ei,'Ekstrovert')}</span></div></div>`;
 h+=`<div class="grid2"><div class="card"><h3>Peta gaya komunikasi tim</h3>${quad(P.map(p=>({a:p.R.s.a,r:p.R.s.r,lbl:p.ini})))}</div>
  <div class="card"><h3>Rata-rata tim</h3><div class="eyebrow">Gaya konflik</div>${bars(Object.keys(CONF).map(k=>({l:CONF[k].en,v:mean(p=>p.R.c[k]),c:CONF[k].col})))}
  <div class="eyebrow">Big Five</div>${bars(['E','A','C','S','O'].map(t=>({l:B5INFO[t].n,v:mean(p=>p.R.b[t])})))}</div></div>`;
 // insights
 const ins=[]; const share=k=>cnt(p=>p.D.conf[0],k)/N;
 if(share('avoid')+share('acc')>=.4)ins.push(['w','Kecenderungan menghindar atau mengalah tinggi',`${Math.round((share('avoid')+share('acc'))*100)}% peserta memakai Turtle atau Teddy Bear sebagai gaya utama. Risiko: konsesi tanpa imbal balik dan isu yang tertunda. Latih teknik "jika… maka…" dan penetapan batas.`]);
 if(share('comp')>=.3)ins.push(['w','Potensi eskalasi',`${Math.round(share('comp')*100)}% peserta bergaya Shark. Dalam negosiasi dengan masyarakat, tempatkan mereka bersama Dolphin/Eagle dan latih pertanyaan kepentingan.`]);
 if(!cnt(p=>p.D.conf[0],'coll'))ins.push(['w','Tidak ada Eagle','Tidak ada peserta dengan kolaborasi sebagai gaya utama. Untuk isu FPIC atau kompensasi, latih penggalian kepentingan dan penciptaan opsi bersama.']);
 Object.keys(COMM).forEach(k=>{if(!cnt(p=>p.D.comm,k))ins.push(['i',`Tidak ada ${COMM[k].en}`,{tiger:'Tim mungkin kurang tegas saat perlu menutup kesepakatan atau menahan tekanan.',peacock:'Tim mungkin kurang luwes mencairkan suasana dan membangun antusiasme forum.',dolphin:'Tim mungkin kurang sabar mendengarkan pihak terdampak; tunjuk penjaga hubungan secara sadar.',owl:'Tim mungkin kurang teliti terhadap data dan klausul; pastikan ada peninjau dokumen.'}[k]])});
 const intro=cnt(p=>p.D.ei,'Introvert')/N;
 if(intro>=.5)ins.push(['i','Mayoritas introvert','Sediakan waktu caucus, bahan tertulis sebelum rapat, dan giliran bicara yang terstruktur dalam role-play.']);
 if(cnt(p=>p.D.ei,'Ekstrovert')/N>=.6)ins.push(['i','Mayoritas ekstrovert','Risiko saling memotong dan monolog. Terapkan aturan "rangkum dulu sebelum menanggapi".']);
 if(mean(p=>p.R.b.S)<45)ins.push(['w','Stabilitas emosi tim rendah','Masukkan sesi latihan menghadapi provokasi dan teknik jeda.']);
 if(mean(p=>p.R.b.A)>65)ins.push(['i','Keramahan tim tinggi','Kuat untuk negosiasi integratif, tetapi rentan pada tawar-menawar keras. Wajibkan penetapan walk-away point.']);
 if(!ins.length)ins.push(['i','Komposisi seimbang','Tidak ada kecenderungan ekstrem. Fokuskan latihan pada perpindahan gaya sesuai situasi.']);
 h+=`<div class="card"><h3>Temuan untuk fasilitator</h3><div style="display:flex;flex-direction:column;gap:10px">${ins.map(([s,t,d])=>`<div class="insight"><span class="sev ${s}">${s=='w'?'Perhatian':'Catatan'}</span><div><b>${t}.</b> ${d}</div></div>`).join('')}</div></div>`;
 // roles
 const used=new Set(); const pick=f=>{let best=null,bv=-1e9;P.forEach((p,i)=>{if(used.has(i))return;const v=f(p);if(v>bv){bv=v;best=i}});if(best!=null)used.add(best);return best};
 const roles=[
  ['Juru runding utama','Asertif, stabil, dan terbiasa mencari solusi bersama.',p=>p.R.s.a+p.R.b.S+Math.max(p.R.c.coll,p.R.c.compr)],
  ['Analis & penjaga dokumen','Teliti terhadap angka, klausul, dan mandat.',p=>p.R.b.C+(100-p.R.s.r)/2+(p.D.comm=='owl'?30:0)+(2-p.R.m.scope)*10],
  ['Penjaga hubungan','Membangun kepercayaan dan membaca suasana pihak lain.',p=>p.R.b.A+p.R.s.r+p.R.c.coll/2],
  ['Pengamat & pencatat','Tenang, mengamati bahasa tubuh, memberi masukan saat caucus.',p=>(100-p.R.b.E)+p.R.b.S]
 ];
 if(N>=2)h+=`<div class="card"><h3>Usulan peran tim perunding</h3><div class="roles">${roles.slice(0,Math.min(4,N)).map(([r,d,f])=>{const i=pick(f);const p=P[i];return `<div class="role"><span class="eyebrow">${r}</span><span class="who">${esc(p.R.n)}</span><span class="small muted">${COMM[p.D.comm].en} – ${CONF[p.D.conf[0]].en} · ${d}</span></div>`}).join('')}</div><p class="small muted">Usulan berbasis skor; sesuaikan dengan mandat, senioritas, dan pengetahuan isu.</p></div>`;
 // pairs (max contrast)
 if(N>=2){const left=P.map((_,i)=>i),pairs=[];
  while(left.length>1){const i=left.shift();let bj=0,bd=-1;left.forEach((j,ix)=>{const d=Math.hypot(P[i].R.s.a-P[j].R.s.a,P[i].R.s.r-P[j].R.s.r)+(P[i].D.conf[0]!=P[j].D.conf[0]?20:0);if(d>bd){bd=d;bj=ix}});pairs.push([i,left.splice(bj,1)[0]]);}
  h+=`<div class="card"><h3>Pasangan role-play</h3><p class="small muted">Dipasangkan dengan gaya yang paling berbeda agar peserta berlatih menghadapi lawan bicara yang tidak serupa.</p><div class="pairs">${pairs.map(([a,b])=>`<div>• <b>${esc(P[a].R.n)}</b> (${COMM[P[a].D.comm].en}–${CONF[P[a].D.conf[0]].en}) × <b>${esc(P[b].R.n)}</b> (${COMM[P[b].D.comm].en}–${CONF[P[b].D.conf[0]].en})</div>`).join('')}${left.length?`<div>• <b>${esc(P[left[0]].R.n)}</b> menjadi pengamat atau bergabung ke pasangan mana pun.</div>`:''}</div></div>`;}
 // table
 h+=`<div class="card"><h3>Tabel peserta</h3><div class="tablewrap"><table><thead><tr><th>Nama</th><th>Unit</th><th>Profil</th><th>E/I</th><th>Konflik utama</th><th>Cadangan</th><th>E</th><th>A</th><th>C</th><th>S</th><th>O</th><th>VAK</th></tr></thead><tbody>
  ${P.map(p=>`<tr><td data-label="Nama"><b>${esc(p.R.n)}</b></td><td data-label="Unit">${esc(p.R.u)}</td><td data-label="Profil"><span class="dot" style="background:var(${COMM[p.D.comm].col})"></span>${COMM[p.D.comm].en}–${CONF[p.D.conf[0]].en}</td><td data-label="E/I">${p.D.ei}</td><td data-label="Konflik utama"><span class="dot" style="background:var(${CONF[p.D.conf[0]].col})"></span>${CONF[p.D.conf[0]].name}</td><td data-label="Cadangan">${CONF[p.D.conf[1]].name}</td>${['E','A','C','S','O'].map(t=>`<td class="num" data-label="${B5INFO[t].n}">${p.R.b[t]}</td>`).join('')}<td data-label="VAK">${p.D.vak.map(x=>x.toUpperCase()).join('+')}</td></tr>`).join('')}
 </tbody></table></div></div>`;
 out.innerHTML=h;
}
$('#btn-team').onclick=analyzeTeam;
/* Sesi fasilitator: muat/simpan daftar kode hasil di server */
const tsc=$('#team-sc'), LS_TEAM='negprof.team.v1';
try{if(!tsc.value)tsc.value=localStorage.getItem(LS_TEAM)||''}catch(e){}
tsc.addEventListener('input',()=>{try{localStorage.setItem(LS_TEAM,tsc.value)}catch(e){}});
const sToast=(msg,err)=>{const t=$('#session-toast');t.textContent=msg;t.classList.toggle('err',!!err);clearTimeout(sToast.t);sToast.t=setTimeout(()=>t.textContent='',4000)};
function teamCode(){const s=normCode(tsc.value);tsc.value=s;try{localStorage.setItem(LS_TEAM,s)}catch(e){}
 if(!validCode(s)){sToast('Isi kode sesi: huruf, angka, atau tanda hubung (3–32 karakter)',true);tsc.focus();return null;}return s;}
async function withBusy(btn,fn){btn.disabled=true;try{await fn()}catch(e){sToast('Gagal: '+e.message,true)}finally{btn.disabled=false}}
$('#btn-load').onclick=e=>{const s=teamCode();if(!s)return;withBusy(e.currentTarget,async()=>{
 const d=await getSession(s); $('#codes').value=d.results.join('\n');
 if(d.results.length){analyzeTeam();sToast(`${d.results.length} hasil dimuat dari sesi ${s}`);}
 else{$('#team-out').innerHTML='';teamRows=[];sToast(`Sesi ${s} belum berisi hasil`);}});};
let clearArm=false;
$('#btn-save').onclick=e=>{const s=teamCode();if(!s)return;const codes=$('#codes').value.match(/NEG1\.[A-Za-z0-9_-]+/g)||[];
 /* Daftar kosong mengosongkan sesi: minta klik kedua sebagai konfirmasi */
 if(!codes.length&&!clearArm){clearArm=true;setTimeout(()=>clearArm=false,4000);sToast('Daftar kosong akan menghapus semua hasil sesi. Klik sekali lagi untuk yakin.',true);return;}
 clearArm=false;
 withBusy(e.currentTarget,async()=>{const d=await saveSession(s,codes);sToast(`${d.count} hasil tersimpan di sesi ${s}`);});};
$('#btn-gen').onclick=()=>{tsc.value=randomCode();teamCode();sToast('Kode baru dibuat. Bagikan ke peserta.');};
$('#btn-link').onclick=()=>{const s=teamCode();if(s)copy(location.origin+location.pathname+'?s='+encodeURIComponent(s),'#session-toast');};
$('#btn-sample').onclick=()=>{$('#codes').value=SAMPLE_TEAM.join('\n');analyzeTeam();};
$('#btn-team-pdf').onclick=()=>{if(!teamRows.length){$('#team-toast').textContent='Analisis tim dulu';return;}
 const s=normCode(tsc.value);
 savePdf(`Rekap Tim${s?' - '+s:''}`,`Rekap tim${s?' · sesi '+s:''} · ${teamRows.length} peserta`);};
$('#btn-csv').onclick=()=>{if(!teamRows.length){$('#team-toast').textContent='Analisis tim dulu';return;}
 const rows=[['Nama','Unit','Komunikasi','Konflik utama','Konflik cadangan','E/I','Ekstraversi','Keramahan','Ketelitian','Stabilitas','Keterbukaan','Asertivitas','Responsivitas','Shark','Eagle','Fox','Turtle','TeddyBear','V','A','K']];
 teamRows.forEach(p=>rows.push([p.R.n,p.R.u,COMM[p.D.comm].en,CONF[p.D.conf[0]].en,CONF[p.D.conf[1]].en,p.D.ei,p.R.b.E,p.R.b.A,p.R.b.C,p.R.b.S,p.R.b.O,p.R.s.a,p.R.s.r,p.R.c.comp,p.R.c.coll,p.R.c.compr,p.R.c.avoid,p.R.c.acc,p.R.k.v,p.R.k.a,p.R.k.k]));
 const csv=rows.map(r=>r.map(x=>/[",\n]/.test(String(x))?'"'+String(x).replace(/"/g,'""')+'"':x).join(',')).join('\n');
 copy(csv,'#team-toast');};

/* ---------- TABS ---------- */
function show(t){document.querySelectorAll('nav.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab==t));
 ['tes','hasil','tim','metode'].forEach(k=>$('#p-'+k).hidden=k!=t);
 if(t=='hasil')renderResult(); if(t=='tim'&&DEMO&&!$('#team-out').innerHTML){$('#codes').value=SAMPLE_TEAM.join('\n');analyzeTeam();}
 try{history.replaceState(null,'',location.pathname+location.search+'#'+t)}catch(e){} window.scrollTo(0,0);}
document.querySelectorAll('nav.tabs button').forEach(b=>b.onclick=()=>show(b.dataset.tab));
renderTest();
const h0=location.hash.slice(1); if(['hasil','tim','metode'].includes(h0))show(h0);
