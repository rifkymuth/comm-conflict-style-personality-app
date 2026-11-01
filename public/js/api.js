/* ---------- API SESI ---------- */
/* Kode sesi: huruf besar, angka, tanda hubung; 3–32 karakter (sama dengan validasi server) */
const normCode=s=>String(s||'').trim().toUpperCase().replace(/\s+/g,'-');
const validCode=s=>/^[A-Z0-9-]{3,32}$/.test(s);
function randomCode(){const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',r=crypto.getRandomValues(new Uint8Array(6));return Array.from(r,x=>A[x%A.length]).join('');}
async function api(method,path,body){
 const res=await fetch(path,{method,headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});
 const data=await res.json().catch(()=>({}));
 if(!res.ok)throw new Error(data.error||('HTTP '+res.status));
 return data;
}
const sessionUrl=c=>'/api/sessions/'+encodeURIComponent(c);
const getSession=c=>api('GET',sessionUrl(c));
const submitResult=(c,code)=>api('POST',sessionUrl(c)+'/results',{result:code});
const saveSession=(c,codes)=>api('PUT',sessionUrl(c),{results:codes});
