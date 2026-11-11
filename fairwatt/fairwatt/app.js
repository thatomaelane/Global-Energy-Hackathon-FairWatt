const F=[
{n:"Maitama Heights",b:"A",p:20,d:21,h:30,inc:900,m:92,t:225,e:3},
{n:"Garki Central",b:"B",p:16,d:14.5,h:14,inc:350,m:78,t:63,e:4},
{n:"Wuse Market",b:"C",p:12,d:11,h:12,inc:280,m:70,t:54,e:2},
{n:"Gwarinpa Estate",b:"B",p:16,d:17,h:25,inc:400,m:81,t:63,e:3},
{n:"Kubwa East",b:"C",p:12,d:8.5,h:20,inc:150,m:52,t:54,e:3},
{n:"Karu Compound",b:"D",p:8,d:8,h:16,inc:90,m:38,t:48,e:2},
{n:"Nyanya Settlement",b:"D",p:8,d:6,h:22,inc:70,m:24,t:48,e:3},
{n:"Bwari Rural",b:"E",p:4,d:4.5,h:10,inc:55,m:15,t:42,e:2}];
const GEN=600,COST=190,COLL=.81,LIFE=20;
const S={tab:"c",fi:4,inc:null,layer:"g",s:100,sur:10,cap:18,rep:[12,41,27,18,96,64,133,57],mine:{}};
const $=id=>document.getElementById(id),fm=n=>Math.round(n).toLocaleString("en");
const col=v=>v<35?"var(--good)":v<60?"var(--warn)":"var(--bad)";
const mcol=v=>v>=75?"var(--good)":v>=45?"var(--warn)":"var(--bad)";
function hh(f,d,fair){const N=Math.min(250,80+f.inc/5),g=Math.min(1,d/18),grid=N*g,gen=.3*(N-grid);let t=f.t;
 if(fair){t*=Math.min(1,d/f.p);if(f.inc>=500)t*=1+S.sur/100}
 let bill=grid*t;if(fair&&f.inc<200){const l=Math.min(50,grid);bill=l*LIFE+(grid-l)*t}
 return{N,grid,gen,bill,cost:bill+gen*GEN}}
function alloc(s,fair){let d=F.map(f=>Math.min(24,f.d*s));if(!fair)return d;let pool=0;
 d.forEach((x,i)=>{const f=F[i];if(f.inc>=500&&x>S.cap){pool+=(x-S.cap)*f.h;d[i]=S.cap}});
 const w=F.map((f,i)=>d[i]<f.p?f.h*(f.p-d[i])*(f.inc<200?2:1):0),W=w.reduce((a,b)=>a+b,0);
 return W?d.map((x,i)=>w[i]?Math.min(F[i].p,x+pool*w[i]/W/F[i].h):x):d}
function sim(fair){const d=alloc(S.s/100,fair);return F.map((f,i)=>{const r=hh(f,d[i],fair),sh=Math.max(0,1-d[i]/f.p),bu=r.cost/(f.inc*1000);
 return{...r,f,d:d[i],sh,bu,fgi:Math.round(40*Math.min(1,sh*2.5)+40*Math.min(1,bu/.2)+20*(1-f.m/100))}})}
function agg(R){let rev=0,cost=0,lh=0,lb=0,lw=0;R.forEach(r=>{rev+=r.f.h*1000*r.bill*COLL;cost+=r.f.h*1000*r.grid*COST;
 if(r.f.inc<200){lh+=r.d*r.f.h;lb+=r.bu*r.f.h;lw+=r.f.h}});
 return{rec:100*rev/cost,sub:Math.max(0,cost-rev)/1e6,hrs:lh/lw,bur:100*lb/lw}}
function setTab(t){S.tab=t;draw()}
function draw(){const T=[["c","My household"],["r","Regulator view"],["u","Utility and funding"]];
 $("nav").innerHTML=T.map(([k,l])=>`<button aria-pressed="${S.tab===k}" onclick="setTab('${k}')">${l}</button>`).join("");
 $("app").innerHTML=S.tab==="c"?cust():S.tab==="r"?reg():util()}
function cust(){const f=F[S.fi],inc=S.inc??f.inc,ff={...f,inc},r=hh(ff,f.d,false),use=r.grid+r.gen,eff=r.cost/use,bur=100*r.cost/(inc*1000),sc=Math.min(100,Math.round(100*f.d/f.p)),owed=f.d<f.p?r.bill*(1-f.d/f.p):0;
 const v=sc>=95?"You are getting the service your band promises.":sc>=75?"You are getting somewhat less than your band promises.":"You are paying for a band you are not getting. Ask for a refund or a lower band.";
 return`<div class="g g2"><div class="c"><h2>Check your power</h2>
 <label for="a">Your area</label><select id="a" onchange="S.fi=+this.value;S.inc=null;draw()">${F.map((x,i)=>`<option value="${i}" ${i===S.fi?"selected":""}>${x.n} (Band ${x.b})</option>`).join("")}</select>
 <label for="i">Household income per month (₦ thousand)</label><input id="i" type="number" min="10" value="${inc}" onchange="S.inc=+this.value||F[S.fi].inc;draw()">
 <h3 style="margin-top:20px">Hours of power per day</h3>
 <div class="bar"><i style="width:${Math.min(100,100*f.d/24)}%;background:${sc>=95?"var(--good)":sc>=75?"var(--warn)":"var(--bad)"}"></i><b style="left:${100*f.p/24}%"></b></div>
 <div class="mut">Received: ${f.d} h. Promised by Band ${f.b}: ${f.p} h (black mark).</div>
 <p><b>${v}</b></p>
 ${owed?`<p>Estimated credit you could claim each month: <b>₦${fm(owed)}</b></p>`:""}
 </div>
 <div class="c"><h2>What your power really costs</h2>
 <div class="row"><span>Service score</span><b class="big" style="font-size:22px;font-weight:700;color:${sc>=95?"var(--good)":sc>=75?"var(--warn)":"var(--bad)"}">${sc}%</b></div>
 <div class="row"><span>Grid units used per month</span><b>${fm(r.grid)} kWh</b></div>
 <div class="row"><span>Generator units (estimated)</span><b>${fm(r.gen)} kWh</b></div>
 <div class="row"><span>Grid tariff</span><b>₦${f.t} per kWh</b></div>
 <div class="row"><span>Total spent on electricity</span><b>₦${fm(r.cost)}</b></div>
 <div class="row"><span>True cost per useful kWh</span><b>₦${fm(eff)}</b></div>
 <div class="row"><span>Share of income spent on power</span><b style="color:${bur>10?"var(--bad)":"var(--good)"}">${bur.toFixed(1)}%</b></div>
 <p class="mut">Over 10% of income is a common energy poverty line. Your grid tariff may look low while generator fuel makes your true cost much higher.</p>
 <h3>Community check</h3>
 <div class="mut">${S.rep[S.fi]} neighbours reported outages on this feeder this week.</div>
 <button class="btn" onclick="S.rep[S.fi]++;draw()">Report an outage now</button>
 <div class="mut">Reports from households verify the hours the utility claims.</div></div></div>`}
function reg(){const R=sim(false),L=S.layer==="g",sel=R[S.fi];
 const tile=(r,i)=>{const v=L?r.fgi:r.f.m,c=L?col(v):mcol(v);return`<button class="t" style="background:${c}" aria-pressed="${i===S.fi}" onclick="S.fi=${i};draw()"><b>${v}${L?"":"%"}</b><span>${r.f.n}</span></button>`};
 const top=[...R.map((r,i)=>({r,i}))].sort((a,b)=>b.r.fgi-a.r.fgi);
 return`<div class="c"><h2>Where is the tariff system least fair?</h2>
 <p class="mut">${L?"Fairness gap index, 0 is fair and 100 is severe. It combines hours missing from the promised band, share of income spent on power, and how little of the area is metered.":"Share of customers with a working meter. Red areas are billed by estimate, so fairness cannot be checked."}</p>
 <div class="seg"><button aria-pressed="${L}" onclick="S.layer='g';draw()">Fairness gap</button><button aria-pressed="${!L}" onclick="S.layer='m';draw()">Metering</button></div>
 <div class="tiles">${R.map(tile).join("")}</div></div>
 <div class="g g2" style="margin-top:12px"><div class="c"><h3>${sel.f.n} in detail</h3>
 <div class="row"><span>Hours received vs promised</span><b>${sel.f.d} / ${sel.f.p}</b></div>
 <div class="row"><span>Households</span><b>${sel.f.h},000</b></div>
 <div class="row"><span>Typical income per month</span><b>₦${sel.f.inc},000</b></div>
 <div class="row"><span>Income spent on power</span><b>${(100*sel.bu).toFixed(1)}%</b></div>
 <div class="row"><span>Essential facilities served</span><b>${sel.f.e}${sel.f.d<12?" (at risk)":""}</b></div>
 <div class="row"><span>Suggested action</span><b>${sel.fgi>=60?"Lifeline and extra hours first":sel.fgi>=35?"Monitor and refund shortfall":"No action needed"}</b></div></div>
 <div class="c wrap"><h3>Priority list for lifeline support</h3><table><tr><th>Area</th><th>Index</th><th>Meters</th></tr>
 ${top.map(({r})=>`<tr><td>${r.f.n}</td><td><span class="pill" style="background:${col(r.fgi)}">${r.fgi}</span></td><td>${r.f.m}%</td></tr>`).join("")}</table></div></div>`}
function util(){const A=sim(false),B=sim(true),a=agg(A),b=agg(B),worse=B.filter((r,i)=>r.f.inc<200&&r.bu>A[i].bu+.002).length,
 card=(t,x,o)=>`<div class="c"><h3>${t}</h3>
 <div class="row"><span>Utility cost recovery</span><b>${x.rec.toFixed(0)}%</b></div>
 <div class="row"><span>Subsidy needed per month</span><b>₦${x.sub.toFixed(0)} million</b></div>
 <div class="row"><span>Hours per day, low-income areas</span><b>${x.hrs.toFixed(1)} h</b></div>
 <div class="row"><span>Income spent on power, low-income areas</span><b>${x.bur.toFixed(1)}%</b></div></div>`;
 const sl=(id,l,min,max,k,u)=>`<label for="${id}">${l}: <b>${S[k]}${u}</b></label><input id="${id}" type="range" min="${min}" max="${max}" value="${S[k]}" oninput="S.${k}=+this.value;draw();$('${id}').focus()">`;
 return`<div class="c"><h2>Can a fairer system pay for itself?</h2>
 <p class="mut">Fairness-weighted model: (1) refund when hours fall short, (2) first 50 kWh at ₦${LIFE} for low-income areas, (3) wealthier areas share hours above a cap and pay a surcharge that funds it.</p>
 <div class="g g2"><div>${sl("s","Supply compared with today",50,200,"s","%")}</div><div>${sl("c","Hour cap for high-income areas",14,24,"cap"," h")}${sl("u","Surcharge on high-income tariffs",0,30,"sur","%")}</div></div></div>
 <div class="cmp" style="margin-top:12px">${card("Today: flat bands",a)}${card("Fairness-weighted",b)}</div>
 <div class="c" style="margin-top:12px"><h3>Verdict</h3><p style="margin:0">${worse===0?"No low-income area pays a larger share of income than today.":worse+" low-income area(s) are worse off. Lower the surcharge or raise the cap."} Subsidy changes by <b>${b.sub<=a.sub?"-":"+"}₦${Math.abs(b.sub-a.sub).toFixed(0)} million</b> a month, and low-income areas gain <b>${(b.hrs-a.hrs).toFixed(1)} hours</b> a day. Move supply to 50% or 200% to test whether the rules stay fair.</p></div>`}
draw();
