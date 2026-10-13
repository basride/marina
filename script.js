/* ==============================
   SADECE BURAYI DÜZENLEMEN YETERLİ
   ============================== */
const CONFIG = {
  name1: "B",
  name2: "M",
  startDate: "2026-07-24T00:00:00",
  spotifyUrl: "https://open.spotify.com/track/0QZ5yyl6B6utIWkxeBDxQN",
  timeline: [
    {label:"İlk karşılaşma", title:"Her şeyin başladığı o gün.", text:"Buraya ilk tanıştığınız günü, nerede olduğunuzu ve o güne dair bir cümleyi yaz."},
    {label:"İlk güzel an", title:"Birlikte gülmeye başladığımız yer.", text:"İlk buluşma, ilk uzun konuşma ya da unutamadığın bir hatıra."},
    {label:"Bugün", title:"Hâlâ seçtiğim kişi: sen.", text:"Hikâyemizin en güzel yanı, hâlâ yazılıyor olması."}
  ],
  letter: { title:"Bir mektup", paragraphs:[
    "Hayatımdaki en güzel şeylerin hepsi büyük olaylar değil. Bazen bir mesajın, bazen bir bakışın, bazen de birlikte sessizce oturmanın bile günümü değiştirdiğini fark ediyorum.",
    "Seninle geçen zamanın bana öğrettiği en güzel şey şu: mutluluk her zaman büyük bir şey olmak zorunda değil. Bazen sadece doğru insanla aynı anda aynı yerde olmaktır.",
    "Ve ben, bütün bu küçük anların içinde seni seçtiğim için çok mutluyum."
  ], signature:"İyi ki varsın.\n— Ben" },
  surpriseMessages: [
    "Dünyadaki bütün güzel tesadüflerin içinden seni bulmuş olmak bana hâlâ inanılmaz geliyor.",
    "Seninle ilgili en sevdiğim şeylerden biri, en sıradan günü bile özel bir anıya çevirebilmen.",
    "Bir gün geriye dönüp baktığımızda, bugünlerin ne kadar değerli olduğunu hatırlayacağım.",
    "Sana söylemek istediğim çok şey var ama bazen tek bir cümle hepsini anlatıyor: iyi ki sen.",
    "Bu sayfadaki fotoğraflar değişebilir; ama benim en sevdiğim kare hep senin yanında olduğum kare olacak."
  ]
};

document.title = `${CONFIG.name1} & ${CONFIG.name2} · Bizim Hikâyemiz`;
const logo = document.querySelector('.logo');
if (logo) logo.innerHTML = `${CONFIG.name1} & ${CONFIG.name2} <span>♥</span>`;
// Hikâye durakları ve mektup: içerikleri CONFIG bölümünden düzenleyebilirsin.
const timeline = document.querySelector('.timeline');
if (timeline) timeline.innerHTML = CONFIG.timeline.map((item,i)=>`<article class="timeline-item reveal"><div class="timeline-dot">${String(i+1).padStart(2,'0')}</div><div><span>${item.label}</span><h3>${item.title}</h3><p>${item.text}</p></div></article>`).join('');
const letterPaper = document.querySelector('.letter-paper');
if (letterPaper) letterPaper.innerHTML = `<div class="paper-top">♥ &nbsp; SANA</div><h2>${CONFIG.letter.title}</h2>${CONFIG.letter.paragraphs.map(p=>`<p>${p}</p>`).join('')}<p class="signature">${CONFIG.letter.signature.replace(/\\n/g,'<br>')}</p>`;


const preloader = document.getElementById('preloader');
const openExperience = document.getElementById('openExperience');
const openSite = () => preloader.classList.add('hide');
openExperience.addEventListener('click', openSite);
openExperience.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openSite(); });

// Star field
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeStars(){
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  const count = Math.min(180, Math.floor(innerWidth/7));
  stars = Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.2,a:Math.random()*.8+.2,s:Math.random()*.25+.03}));
}
resizeStars(); addEventListener('resize', resizeStars);
function drawStars(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const s of stars){ s.a += (Math.random()-.5)*s.s*.04; s.a=Math.max(.15,Math.min(1,s.a)); ctx.globalAlpha=s.a; ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); }
  requestAnimationFrame(drawStars);
}
drawStars();

// Counter
function updateCounter(){
  const start = new Date(CONFIG.startDate);
  let diff = Math.max(0, Date.now()-start.getTime());
  const days = Math.floor(diff/86400000); diff%=86400000;
  const hours = Math.floor(diff/3600000); diff%=3600000;
  const minutes = Math.floor(diff/60000); diff%=60000;
  const seconds = Math.floor(diff/1000);
  document.getElementById('days').textContent=days.toLocaleString('tr-TR');
  document.getElementById('hours').textContent=hours.toString().padStart(2,'0');
  document.getElementById('minutes').textContent=minutes.toString().padStart(2,'0');
  document.getElementById('seconds').textContent=seconds.toString().padStart(2,'0');
}
updateCounter(); setInterval(updateCounter,1000);

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Surprise modal
const modal=document.getElementById('surpriseModal');
const surpriseText=document.getElementById('surpriseText');
let msgIndex=0;
function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
document.getElementById('surpriseBtn').onclick=openModal;
document.getElementById('finalBtn').onclick=()=>{ burstHearts(innerWidth/2,innerHeight*.6,30); openModal(); };
document.getElementById('closeModal').onclick=closeModal;
document.querySelector('.modal-backdrop').onclick=closeModal;
document.getElementById('anotherBtn').onclick=()=>{msgIndex=(msgIndex+1)%CONFIG.surpriseMessages.length; surpriseText.textContent=CONFIG.surpriseMessages[msgIndex]; burstHearts(innerWidth/2,innerHeight*.5,12);};

// Hearts burst
function heart(x,y){
  const el=document.createElement('div'); el.className='heart-particle'; el.textContent=Math.random()>.2?'♥':'✦'; el.style.left=x+'px'; el.style.top=y+'px'; el.style.setProperty('--x',((Math.random()-.5)*180)+'px'); el.style.color=Math.random()>.5?'#ff8eaa':'#cf9aff'; document.body.appendChild(el); setTimeout(()=>el.remove(),1700);
}
function burstHearts(x,y,n=14){for(let i=0;i<n;i++) setTimeout(()=>heart(x+(Math.random()-.5)*100,y+(Math.random()-.5)*30),i*35)}
document.addEventListener('click',(e)=>{if(Math.random()<.18) heart(e.clientX,e.clientY)});

// Music
const music=document.getElementById('bgMusic');
const musicBtn=document.getElementById('musicBtn');
let musicPlaying=false;
function syncMusic(){musicPlaying=!musicPlaying; if(musicPlaying){music.play().catch(()=>{musicPlaying=false;}); musicBtn.textContent='❚❚';}else{music.pause();musicBtn.textContent='♫';}}
musicBtn.onclick=syncMusic;


// Spotify oynatıcısına git; müzik kullanıcı dokunuşuyla başlar.
musicBtn.onclick=()=>document.getElementById('musicSection').scrollIntoView({behavior:'smooth',block:'center'});
