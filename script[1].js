const screens = [...document.querySelectorAll('.screen')];

function show(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo(0,0);
}

document.querySelectorAll('[data-screen]').forEach(el=>{
  el.addEventListener('click', ()=>show(el.dataset.screen));
});

document.querySelectorAll('.back').forEach(el=>{
  el.addEventListener('click', ()=>show('home'));
});

// Add your WhatsApp number here in international format, digits only.
// Example for Ireland: 353871234567
const ZOO_WHATSAPP_NUMBER = "353879184618";

document.getElementById('whatsappBtn').addEventListener('click', ()=>{
  show('whatsapp');
});

// Return to home after 90 seconds of inactivity.
let timer;
function resetTimer(){
  clearTimeout(timer);
  timer = setTimeout(()=>show('home'), 90000);
}
['touchstart','click','keydown'].forEach(evt => document.addEventListener(evt, resetTimer, {passive:true}));
resetTimer();
