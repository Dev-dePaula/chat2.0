const contacts=[
{id:"joao",name:"João Silva",initials:"JS",time:"15:45",preview:"A arquitetura ficou bem interessante.",status:"online agora"},
{id:"maria",name:"Maria Oliveira",initials:"MO",time:"15:30",preview:"Podemos conversar mais tarde?",status:"online há 2 min"},
{id:"equipe",name:"Equipe do Projeto",initials:"EP",time:"14:18",preview:"Nova versão disponível para testes.",status:"4 online"},
{id:"carlos",name:"Carlos Mendes",initials:"CM",time:"13:12",preview:"Vou te responder ainda hoje.",status:"visto há 20 min"}
];
const msgs={
joao:[
{m:0,t:"Olá Anderson! Tudo certo?",h:"15:42"},{m:1,t:"Tudo certo! Estou preparando a demonstração do projeto.",h:"15:43"},{m:0,t:"Legal! A arquitetura com chat, salas e agenda ficou bem interessante.",h:"15:44"},{m:1,t:"A ideia é apresentar uma primeira versão fiel ao conceito.",h:"15:45"}],
maria:[{m:0,t:"Oi! Podemos conversar mais tarde?",h:"15:30"}],
equipe:[{m:0,t:"Pessoal, a nova versão da plataforma está disponível para testes.",h:"14:18"}],
carlos:[{m:1,t:"Você conseguiu revisar o documento?",h:"13:07"},{m:0,t:"Sim, vou te responder ainda hoje.",h:"13:12"}]
};
let current="joao";
const main=document.getElementById("main");

function avatar(c,cl=""){return `<div class="avatar ${cl}">${c.initials}</div>`}
function renderContacts(){
 document.getElementById("contacts").innerHTML=contacts.map(c=>`<div class="contact ${c.id===current?"selected":""}" onclick="selectChat('${c.id}')">${avatar(c)}<div class="meta"><b>${c.name}<time>${c.time}</time></b><p>${c.preview}</p><span class="online">● ${c.status}</span></div></div>`).join("");
}
function selectChat(id){current=id;document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));document.querySelector('[data-page="chat"]').classList.add("active");renderContacts();renderChat()}
function renderChat(){
 const c=contacts.find(x=>x.id===current), list=msgs[current]||[];
 main.innerHTML=`<div class="page"><div class="chat-layout"><section class="chat-center">
 <header class="chat-head">${avatar(c)}<div class="meta"><b>${c.name}</b><small>${c.status}</small></div><button class="btn" onclick="openCall('audio')">☎ Áudio</button><button class="btn" onclick="openCall('video')">▣ Vídeo</button><button class="btn" onclick="toast('Mais opções da conversa')">⋮</button></header>
 <div class="messages"><div class="day">HOJE</div>${list.map(x=>`<div class="row ${x.m?"mine":""}"><div class="bubble"><p>${esc(x.t)}</p><div class="meta-msg">${x.h}${x.m?" · ✓✓":""}</div></div></div>`).join("")}</div>
 <div class="typing">João está digitando<span>...</span></div>
 <div class="composer"><button onclick="toast('Galeria / Câmera')">＋</button><button onclick="toast('Emoji')">☺</button><input id="message" placeholder="Digite uma mensagem..."><button class="send" onclick="sendMessage()">➤</button></div>
 </section><aside class="info"><div class="info-cover">${avatar(c,"big")}<b>${c.name}</b><small>${c.status}</small></div><div class="info-body"><h4>RECURSOS</h4><div class="feature">✓ Mensagens de texto</div><div class="feature">✓ Áudio e vídeo</div><div class="feature">✓ Arquivos e mídia</div><div class="feature">✓ Localização e contatos</div><div class="feature">✓ Enquetes</div><h4 style="margin-top:22px">ARQUITETURA PREVISTA</h4><div class="feature">Socket.IO + NestJS</div><div class="feature">WebRTC + LiveKit</div><div class="feature">Redis / PostgreSQL</div><div class="feature">Cloudflare R2</div></div></aside></div></div>`;
 const input=document.getElementById("message");input.addEventListener("keydown",e=>{if(e.key==="Enter")sendMessage()});
}
function sendMessage(){const i=document.getElementById("message");if(!i||!i.value.trim())return;msgs[current].push({m:1,t:i.value.trim(),h:time()});const c=contacts.find(x=>x.id===current);c.preview="Você: "+i.value.trim();c.time=time();i.value="";renderChat();renderContacts();setTimeout(()=>{if(current==="joao"){msgs.joao.push({m:0,t:"Perfeito! A demonstração já está pronta para apresentar ao cliente.",h:time()});renderChat();}},900)}
function time(){return new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
function esc(s){return String(s).replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[x]))}

function roomsPage(){
main.innerHTML=`<div class="page"><header class="topbar"><div><h1>Salas de Áudio</h1><p>Explore salas ao vivo, entre no palco e participe das conversas.</p></div><div class="actions"><button class="btn" onclick="toast('Pesquisar salas')">⌕ Pesquisar</button><button class="btn primary" onclick="toast('Criar sala — demo')">＋ Criar sala</button></div></header><div class="content"><div class="filters"><button class="filter active">Todos</button><button class="filter">Games</button><button class="filter">Tech & Cibersegurança</button><button class="filter">Música</button><button class="filter">Negócios</button></div><div class="room-grid">
${room("LIVE","Agentes Autônomos e Defesa de Redes em Tempo Real","Discussão sobre agentes, automação e segurança.","Tech & Cibersegurança","1.417")}
${room("LIVE","FINAL CHAMPIONSHIP CS2 & VALORANT","Estratégias, meta e análise da competição.","Games","892")}
${room("AO VIVO","Música, Produção e Bastidores","Conversa aberta com produtores e artistas.","Música","326")}
${room("AGENDADA","Roadmap e Produto — Equipe Alpha","Alinhamento da equipe e próximos passos.","Negócios","74")}
</div></div></div>`;
}
function room(status,title,desc,cat,count){return `<article class="room"><div class="room-top"><span class="${status==='LIVE'?'live':''}">● ${status}</span><span>${cat}</span></div><h3>${title}</h3><p>${desc}</p><div class="room-foot"><div class="mini-stack">${avatar({initials:"AP"})}${avatar({initials:"JS"})}${avatar({initials:"MO"})}</div><span>👥 ${count} ouvindo</span></div><button class="btn primary" onclick="stagePage('${title.replace(/'/g,"")}')">Entrar na sala</button></article>`}
function stagePage(title){
main.innerHTML=`<div class="page"><header class="topbar"><div><h1>← Sala ao vivo</h1><p>Palco de áudio e audiência</p></div><button class="btn" onclick="roomsPage()">Voltar para salas</button></header><div class="content"><div class="stage"><section class="stage-main"><div class="stage-title"><div><h2>${title}</h2><small>Ao vivo • 1.417 participantes</small></div><button class="btn">Compartilhar</button></div><div class="speakers">${["AP","JS","MO","CM"].map((x,i)=>`<div class="speaker">${avatar({initials:x})}<span>${["Host","Speaker","Speaker","Speaker"][i]}</span></div>`).join("")}</div><div class="micbar"><button onclick="toast('Você entrou no palco — demo')">🎙 Entrar no palco</button></div></section><aside class="stage-side"><h4>AUDIÊNCIA</h4>${["Ana Souza","Lucas Almeida","Marcos Silva","Fernanda Costa","Rafael Lima"].map(x=>`<div class="audience">${avatar({initials:x.split(" ").map(a=>a[0]).join("")})}<span>${x}</span></div>`).join("")}<div class="room-actions"><button class="btn" onclick="toast('Convite copiado')">Convidar</button><button class="btn" onclick="toast('Sala compartilhada')">Compartilhar</button></div></aside></div></div></div>`;
}
function calendarPage(){
main.innerHTML=`<div class="page"><header class="topbar"><div><h1>📅 Agenda</h1><p>Eventos, tarefas, compromissos e salas agendadas.</p></div><div class="actions"><button class="btn">Todos</button><button class="btn">Salas de Áudio</button><button class="btn primary" onclick="toast('Novo agendamento — demo')">＋ Agendar</button></div></header><div class="content"><div class="calendar"><div class="calendar-head"><button class="btn">←</button><h2>Quinta-feira, 27 de Fev</h2><button class="btn">→</button></div><div class="days">${["HOJE|27","SEX|28","SÁB|01","DOM|02","SEG|03","TER|04","QUA|05"].map((d,i)=>{let p=d.split("|");return `<div class="day-card ${i===0?"today":""}">${p[0]}<strong>${p[1]}</strong></div>`}).join("")}</div><div class="timeline">${event("21:00","Reunião de Alinhamento","Equipe Alpha & Roadmap","👥 8 participantes","")}${event("22:30","Cybersecurity & Web3: Desafios da Criptografia","Sala de áudio ao vivo","🎙 326 participantes","purple")}${event("23:45","Planejamento do próximo sprint","Tarefa de trabalho","📌 Equipe do Projeto","")}</div></div></div><button class="calendar-add" onclick="toast('Abrir formulário de novo agendamento')">＋</button></div>`;
}
function event(hour,title,sub,meta,cl){return `<div class="event"><div class="hour">${hour}</div><div class="event-card ${cl}"><b>${title}</b><p>${sub}</p><small>${meta}</small></div></div>`}
function openCall(type){document.getElementById("callTitle").textContent=type==="video"?"Chamada de vídeo":"Chamada de áudio";document.getElementById("callModal").classList.remove("hidden")}
function closeModal(){document.getElementById("callModal").classList.add("hidden")}
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>x.classList.remove("show"),2000)}
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));n.classList.add("active");if(n.dataset.page==="chat")renderChat();if(n.dataset.page==="rooms")roomsPage();if(n.dataset.page==="calendar")calendarPage()});
document.getElementById("newChat").onclick=()=>toast("Nova conversa — demo");
renderContacts();renderChat();
