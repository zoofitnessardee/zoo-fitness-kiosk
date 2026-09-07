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

  if(/\b(forgot|forgotten|reset)\b/.test(q) && /\b(password|clubright|login|log in)\b/.test(q)){
    return "Use the ClubRight member login and choose the password-reset option. If you still need help, choose Need Staff Help.";
  }

  if(/\b(my password is|password:|pin:|card number|cvv|security code|bank details|iban)\b/.test(q)){
    return "For security, please don’t enter passwords, PINs or payment details here. Use the secure ClubRight member area or choose Need Staff Help.";
  }
  if(/\b(injury|injured|chest pain|fainted|unconscious|bleeding|medical emergency|ambulance|can't breathe|cannot breathe)\b/.test(q)){
    return "If this is an emergency, call 112 or 999 first. Then alert staff or use the Ring doorbell or WhatsApp if no staff member is available. Email is best kept for non-urgent follow-up.";
  }

  if(/\b(cancel|cancellation|cancel membership|cancel recurring)\b/.test(q)){
    return "Recurring memberships require 28 days’ notice to cancel. Please email zoofitnessardee@gmail.com to request cancellation in writing.";
  }
  if(/\b(freeze|frozen|pause membership|pause my membership)\b/.test(q)){
    return "Memberships can only be frozen with a doctor’s note or a note from medical personnel. Please contact Zoo Fitness by email, WhatsApp or speak to a staff member.";
  }
  if(/\b(refund|swap membership|transfer membership|give my membership|change membership to someone)\b/.test(q)){
    return "Zoo Fitness does not offer refunds, and memberships cannot be swapped or transferred to another person.";
  }
  if(/\b(charged|payment problem|payment issue|billing|charged twice|wrong charge)\b/.test(q)){
    return "For payment or billing questions, please contact Zoo Fitness by email at zoofitnessardee@gmail.com, WhatsApp, or speak to a staff member.";
  }

  if(/\b(under 16|15|14|13|12|11|10|child|minor)\b/.test(q) && /\b(join|member|gym|allowed|age|old enough|come in)\b/.test(q)){
    return "No. Zoo Fitness is strictly 16+ for membership and gym access. Under-16s are not permitted to join.";
  }
  if(/\b(age|old enough|minimum age)\b/.test(q)){
    return "The minimum age to join and use Zoo Fitness is 16. Under-16s are not permitted to join.";
  }
  if(/\b(16|17|18|19)\b/.test(q) && /\b(join|joining|sign up|signup|register|member)\b/.test(q)){
    return "Yes. The minimum joining age at Zoo Fitness is 16.";
  }

  if(/\b(year|yearly|annual|12 month|twelve month|12 months|twelve months)\b/.test(q)){
    return "A 12-month membership is €345.";
  }
  if(/\b(6 month|six month|6 months|six months)\b/.test(q)){
    return "A 6-month membership is €190.";
  }
  if(/\b(3 month|three month|3 months|three months)\b/.test(q)){
    return "A 3-month membership is €100.";
  }
  if(/\b(monthly|per month)\b/.test(q) && !/\b(3 month|6 month|12 month)\b/.test(q)){
    return "We have two monthly options: a 1-month membership for €39, or recurring membership for €35 per month plus a €4 initial fee.";
  }
  if(/\b(1 month|one month)\b/.test(q)){
    return "A 1-month membership is €39.";
  }
  if(/\b(day pass|single day|one day|today only)\b/.test(q)){
    return "A day pass is €10.";
  }
  if(/\b(week pass|1 week|one week|weekly|here for a week|only here for a week)\b/.test(q)){
    return "A 1-week pass is €25.";
  }
  if(/\b(recurring|ongoing monthly|monthly recurring|direct debit)\b/.test(q)){
    return "Recurring membership is €35 per month plus a €4 initial fee. We recommend completing the signup on your own phone using the QR code under Membership Prices.";
  }
  if(/\b(cheapest|lowest price|least expensive|smallest membership)\b/.test(q)){
    return "Our cheapest option is a Day Pass for €10. If you want membership for longer than one visit, a 1-week pass is €25.";
  }
  if(/\b(price|prices|membership price|membership prices|cost|how much|rates)\b/.test(q)){
    return "Zoo Fitness prices are: Day Pass €10, 1 week €25, 1 month €39, 3 months €100, 6 months €190, 12 months €345, or recurring membership €35 per month plus a €4 initial fee.";
  }

  if(/\b(cash|pay cash|cash payment)\b/.test(q)){
    return "Yes, you can pay cash, but only when a staff member is on duty.";
  }
  if(/\b(friend|guest|bring someone|bring a friend|visitor)\b/.test(q)){
    return "Yes. Friends or guests can attend by purchasing a €10 Day Pass each.";
  }

  if(/\b(join|joining|sign up|signup|register|become a member|new member)\b/.test(q)){
    return "You can join from this kiosk. Choose Join Zoo Fitness, or open Membership Prices first if you want to compare the options.";
  }

  if(/\b(bank holiday|bank holidays)\b/.test(q)){
    return "Zoo Fitness is open 9:00am–2:00pm on Bank Holidays.";
  }
  if(/\b(today|tonight)\b/.test(q) && /\b(open|close|hours|closing)\b/.test(q)){
    return dayHours() + " Bank Holiday hours are always 9:00am–2:00pm.";
  }
  if(/\b(saturday|sat)\b/.test(q) && /\b(open|close|hours|time)\b/.test(q)){
    return "Saturday opening hours are 9:00am–4:00pm.";
  }
  if(/\b(sunday|sun)\b/.test(q) && /\b(open|close|hours|time)\b/.test(q)){
    return "Sunday opening hours are 9:00am–2:00pm.";
  }
  if(/\b(opening hours|hours|open|close|closing time)\b/.test(q)){
    return "Public opening hours are Monday–Friday 6:30am–9:00pm, Saturday 9:00am–4:00pm, Sunday 9:00am–2:00pm, and Bank Holidays 9:00am–2:00pm.";
  }

  if(/\b(qr code|turnstile|access gym|get in|entry|clubright app|app access)\b/.test(q)){
    return "After joining, download the ClubRight app and set up your account. Your membership QR code will appear in the app; scan it at the turnstile to enter the gym.";
  }
  if(/\b(existing member|already a member|member login|login|log in|clubright)\b/.test(q)){
    return "Choose I’m Already a Member on the reception screen to open your secure ClubRight member account.";
  }

  if(/\b(shower|showers)\b/.test(q)){
    return "Yes, Zoo Fitness has showers.";
  }
  if(/\b(parking|park my car|car park)\b/.test(q)){
    return "Yes. Member parking is available at the front and rear of the Enterprise Centre.";
  }
  if(/\b(personal trainer|personal training|pt)\b/.test(q)){
    return "Personal training is not available at Zoo Fitness at the moment.";
  }
  if(/\b(class|classes|timetable|studio class|fitness class)\b/.test(q)){
    return "Zoo Fitness does not currently run classes. Our sister studio, Voltage on John Street, offers classes — check out Voltage on Instagram.";
  }
  if(/\b(free trial|trial pass|try before|free pass)\b/.test(q)){
    return "Zoo Fitness does not offer free trial passes. A Day Pass is €10.";
  }
  if(/\b(induction|show me equipment|how to use equipment|orientation)\b/.test(q)){
    return "Inductions are required. If you would like an induction, please speak to a staff member or contact us by WhatsApp or email at zoofitnessardee@gmail.com.";
  }
  if(/\b(student|oap|pensioner|senior|discount|concession)\b/.test(q)){
    return "Zoo Fitness does not have student or OAP rates. Everyone pays the same membership prices.";
  }
  if(/\b(lost property|lost item|left my|forgot my|lost something)\b/.test(q)){
    return "For lost property, please speak to a staff member or contact Zoo Fitness by WhatsApp or email at zoofitnessardee@gmail.com.";
  }
  if(/\b(wifi|wi-fi|internet|guest wifi)\b/.test(q)){
    return "Use the “Zoo Fitness Guest” Wi-Fi network. The password is displayed on notices around the gym.";
  }

  if(/\b(email|contact email)\b/.test(q)){
    return "You can email Zoo Fitness at zoofitnessardee@gmail.com.";
  }
  if(/\b(staff|human|person|help|whatsapp|ring|doorbell|speak to someone|contact us)\b/.test(q)){
    return "Choose Need Staff Help. You can wait for a staff member, scan the WhatsApp QR code on your own phone, use the Ring doorbell, or email zoofitnessardee@gmail.com.";
  }

  if(/\b(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(q)){
    return "Hi! I can help with memberships, prices, opening hours, joining, access, facilities and member support. What would you like to know?";
  }

  return "I’m not certain about that, so I don’t want to give you the wrong answer. Please choose Need Staff Help, or ask me about memberships, prices, opening hours, joining, gym access or facilities.";
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
