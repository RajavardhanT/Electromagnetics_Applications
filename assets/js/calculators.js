(() => {
  const C = 299792458;
  const MU0 = 4 * Math.PI * 1e-7;
  const HBAR = 1.054571817e-34;
  const ECHARGE = 1.602176634e-19;
  const A0 = 5.29177210903e-11;
  const val = id => Number(document.getElementById(id)?.value);
  const out = (id, text) => { const e = document.getElementById(id); if (e) e.textContent = text; };
  const good = (...xs) => xs.every(Number.isFinite);
  const fmt = (x, digits=4) => Number.isFinite(x) ? x.toLocaleString(undefined,{maximumSignificantDigits:digits}) : '—';
  const eng = (x, unit='') => {
    if (!Number.isFinite(x)) return '—';
    const a = Math.abs(x);
    const scales = [[1e9,'G'],[1e6,'M'],[1e3,'k'],[1,''],[1e-3,'m'],[1e-6,'µ'],[1e-9,'n'],[1e-12,'p']];
    for (const [s,p] of scales) if (a >= s || s === 1e-12) return `${fmt(x/s)} ${p}${unit}`;
  };
  const calcs = {
    wavelength(){ const f=val('wl-f')*Number(document.getElementById('wl-unit').value); if(!good(f)||f<=0)return; const l=C/f; out('wl-out',`λ = ${eng(l,'m')}  •  quarter-wave = ${eng(l/4,'m')}`); },
    fspl(){ const f=val('fspl-f')*1e9,r=val('fspl-r'); if(!good(f,r)||f<=0||r<=0)return; const l=C/f,db=20*Math.log10(4*Math.PI*r/l); out('fspl-out',`FSPL = ${fmt(db)} dB  •  λ = ${eng(l,'m')}`); },
    friis(){ const pt=val('friis-pt'),gt=val('friis-gt'),gr=val('friis-gr'),f=val('friis-f')*1e9,r=val('friis-r'); if(!good(pt,gt,gr,f,r)||f<=0||r<=0)return; const fspl=20*Math.log10(4*Math.PI*r/(C/f)),pr=pt+gt+gr-fspl; out('friis-out',`Pᵣ = ${fmt(pr)} dBm  •  FSPL = ${fmt(fspl)} dB`); },
    noise(){ const b=val('noise-b'),nf=val('noise-nf'); if(!good(b,nf)||b<=0)return; const n=-174+10*Math.log10(b)+nf; out('noise-out',`Noise floor ≈ ${fmt(n)} dBm`); },
    skin(){ const f=val('skin-f')*1e6,s=val('skin-s'),mur=val('skin-mur'); if(!good(f,s,mur)||f<=0||s<=0||mur<=0)return; const d=1/Math.sqrt(Math.PI*f*MU0*mur*s); out('skin-out',`δ = ${eng(d,'m')}  •  3δ = ${eng(3*d,'m')}`); },
    waveguide(){ const a=val('wg-a')*1e-3,er=val('wg-er'); if(!good(a,er)||a<=0||er<=0)return; const fc=C/(2*a*Math.sqrt(er)); out('wg-out',`f_c,TE10 = ${eng(fc,'Hz')}`); },
    rangeResolution(){ const b=val('rr-b')*1e6; if(!good(b)||b<=0)return; const dr=C/(2*b); out('rr-out',`ΔR ≈ ${eng(dr,'m')}`); },
    doppler(){ const f=val('dop-f')*1e9,v=val('dop-v'); if(!good(f,v)||f<=0)return; const fd=2*v/(C/f); out('dop-out',`f_D = ${eng(fd,'Hz')}  •  λ = ${eng(C/f,'m')}`); },
    larmor(){ const g=val('lar-g'),b=val('lar-b')*1e-6; if(!good(g,b))return; const fl=g*b; out('lar-out',`f_L = ${eng(fl,'Hz')}`); },
    rabi(){ const d=val('rabi-d')*ECHARGE*A0,e=val('rabi-e'); if(!good(d,e))return; const om=d*e/HBAR,fhz=om/(2*Math.PI); out('rabi-out',`Ω/2π = ${eng(fhz,'Hz')}  •  Ω = ${eng(om,'rad/s')}`); },
    halbach(){ const br=val('halb-br'),ri=val('halb-ri'),ro=val('halb-ro'); if(!good(br,ri,ro)||ri<=0||ro<=ri)return; const b=br*Math.log(ro/ri); out('halb-out',`Ideal bore field ≈ ${fmt(b)} T`); }
  };
  document.addEventListener('click', e => { const key=e.target?.dataset?.calc; if(key && calcs[key]) calcs[key](); });
  document.querySelectorAll('[data-calc]').forEach(b=>b.click());
})();
