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


// ---------- Zoo Fitness free local receptionist ----------
const askForm = document.getElementById('askForm');
const askInput = document.getElementById('askInput');
const chatLog = document.getElementById('chatLog');

function addBubble(text, who='bot'){
  if(!chatLog) return;
  const div = document.createElement('div');
  div.className = `bubble ${who}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function normalise(text){
  return text.toLowerCase()
    .replace(/[€£$,?!.'’]/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function dayHours(){
  const day = new Date().getDay(); // 0 Sun ... 6 Sat
  if(day >= 1 && day <= 5) return "Today’s public opening hours are 6:30am to 9:00pm.";
  if(day === 6) return "Today’s public opening hours are 9:00am to 4:00pm.";
  return "Today’s public opening hours are 9:00am to 2:00pm.";
}

function answerZooFitness(question){
  const q = normalise(question);

  if(/\b(password|pin|card number|cvv|security code|bank details|iban)\b/.test(q)){
    return "For security, please don’t enter passwords or payment details here. Use the secure ClubRight member area or choose Need Staff Help.";
  }
  if(/\b(injury|injured|chest pain|fainted|unconscious|bleeding|medical emergency|ambulance)\b/.test(q)){
    return "I can’t assess medical problems. If this is an emergency, call 112 or 999 and alert a member of staff immediately.";
  }
  if(/\b(cancel|cancellation|freeze|frozen|refund|charged|payment problem|payment issue|complaint|dispute)\b/.test(q)){
    return "That needs member-account or staff support. Please use your ClubRight member account, or choose Need Staff Help.";
  }

  if(/\b(age|old enough|15|14|13|12|under 16|minor|teen)\b/.test(q)){
    return "The minimum joining age at Zoo Fitness is 16, so someone aged 15 cannot join yet.";
  }
  if(/\b(16|17|18|19)\b/.test(q) && /\b(join|joining|sign up|signup|register|member)\b/.test(q)){
    return "Yes. The minimum joining age at Zoo Fitness is 16.";
  }

  if(/\b(6 month|six month|6 months|six months)\b/.test(q)){
    return "6 months is €190. Tap Membership Prices and choose the 6-month option to continue.";
  }
  if(/\b(3 month|three month|3 months|three months)\b/.test(q)){
    return "3 months is €100. Tap Membership Prices and choose the 3-month option to continue.";
  }
  if(/\b(12 month|twelve month|12 months|twelve months|annual|year membership)\b/.test(q)){
    return "12 months is €345. Tap Membership Prices and choose the 12-month option to continue.";
  }
  if(/\b(1 month|one month)\b/.test(q) && !/\b(recurring|ongoing|direct debit)\b/.test(q)){
    return "1 month is €39. Tap Membership Prices and choose the 1-month option to continue.";
  }
  if(/\b(day pass|single day|one day)\b/.test(q)){
    return "A day pass is €10. Open Membership Prices and tap Day pass to continue.";
  }
  if(/\b(week pass|1 week|one week|weekly)\b/.test(q)){
    return "A 1-week pass is €25. Open Membership Prices and tap 1 week to continue.";
  }
  if(/\b(recurring|ongoing monthly|monthly recurring|direct debit)\b/.test(q)){
    return "The recurring monthly membership is €35 per month plus a €4 initial fee. We recommend completing that signup on your own phone using the QR code under Membership Prices.";
  }

  if(/\b(price|prices|membership price|membership prices|cost|how much|rates)\b/.test(q)){
    return "Zoo Fitness prices are: day pass €10, 1 week €25, 1 month €39, 3 months €100, 6 months €190, 12 months €345, or recurring monthly €35 plus a €4 initial fee.";
  }

  if(/\b(join|joining|sign up|signup|register|become a member|new member)\b/.test(q)){
    return "You can join from this kiosk. Choose Join Zoo Fitness, or open Membership Prices first if you want to compare the options.";
  }

  if(/\b(today|tonight)\b/.test(q) && /\b(open|close|hours|closing)\b/.test(q)){
    return dayHours();
  }
  if(/\b(opening hours|hours|open|close|closing time)\b/.test(q)){
    return "Public opening hours are Monday–Friday 6:30am–9:00pm, Saturday 9:00am–4:00pm, Sunday 9:00am–2:00pm, and Bank Holidays 9:00am–2:00pm.";
  }

  if(/\b(existing member|already a member|member login|login|log in|clubright|forgot password|reset password)\b/.test(q)){
    if(/\b(forgot password|reset password)\b/.test(q)) return "Use the ClubRight member login and choose the password-reset option. For account-specific problems, choose Need Staff Help.";
    return "Choose I’m Already a Member on the reception screen to open your secure ClubRight member account.";
  }

  if(/\b(class|classes|timetable|pt|personal trainer|personal training|shower|showers|parking|wifi|sauna|locker|changing room|guest|bring a friend)\b/.test(q)){
    return "I don’t have a confirmed Zoo Fitness answer for that yet, so I won’t guess. Please choose Need Staff Help.";
  }

  if(/\b(staff|human|person|help|whatsapp|ring|doorbell|speak to someone)\b/.test(q)){
    return "Choose Need Staff Help. You can wait for a staff member, scan the WhatsApp QR code on your own phone, or use the Ring doorbell.";
  }

  if(/\b(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(q)){
    return "Hi! I can help with membership prices, joining, opening hours and member support. What would you like to know?";
  }

  return "I’m not certain about that, so I don’t want to give you the wrong answer. Please choose Need Staff Help, or ask me about memberships, prices, opening hours, joining or member login.";
}

if(askForm){
  askForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const question = askInput.value.trim();
    if(!question) return;
    addBubble(question, 'user');
    askInput.value = '';
    setTimeout(()=>addBubble(answerZooFitness(question), 'bot'), 180);
  });
}

document.querySelectorAll('[data-question]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const q = btn.dataset.question;
    addBubble(q, 'user');
    setTimeout(()=>addBubble(answerZooFitness(q), 'bot'), 150);
  });
});

if(askInput){
  askInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      askForm.requestSubmit();
    }
  });
}
