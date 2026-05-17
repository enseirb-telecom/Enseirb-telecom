/**
 * chatbot.js — Assistant virtuel ENSEIRB-MATMECA Télécommunications
 */

const RESPONSES = {
  admission: {
    text: `📋 <strong>Informations sur l'admission :</strong><br><br>
Vous pouvez intégrer notre formation via :<br>
• Concours Commun INP (CCINP) — filières MP, MPI, PC, PSI, TSI, PT<br>
• Classes Préparatoires Intégrées (CPBx, Prépa des INP…)<br>
• Recrutement sur titres (BUT/Licence en 1A, Master 1 en 2A)<br>
• Concours Pass'Ingénieur (L2/L3)<br><br>
📅 Candidatures : 13 mars - 22 mai 2025<br>
📧 candidater-enseirbmatmeca@bordeaux-inp.fr`,
    replies: ['💰 Frais de scolarité', '📞 Contact', '📚 Programme']
  },
  programme: {
    text: `📚 <strong>Notre programme de formation :</strong><br><br>
• 3 années (Bac+5) — 180 crédits ECTS<br>
• 4 piliers : Réseaux & Sécurité, Informatique, Communications Numériques, Signal<br>
• Labels CTI et EUR-ACE<br>
• 3 spécialisations en 3ème année : RSC, AISC, GLRT<br>
• Mobilité internationale obligatoire (17 semaines min.)`,
    replies: ['🔒 Spécialisation RSC', '🤖 Spécialisation AISC', '⚙️ Spécialisation GLRT', '💼 Stages']
  },
  stages: {
    text: `💼 <strong>Les stages (12 mois cumulés) :</strong><br><br>
• <strong>1ère année :</strong> Stage découverte (1-2 mois, mai-août)<br>
• <strong>2ème année :</strong> Stage application (3-4 mois, mai-septembre)<br>
• <strong>3ème année :</strong> Projet de fin d'études (5-6 mois, fév-sept)<br><br>
🎯 <strong>70%</strong> des étudiants trouvent un emploi avant de diplômer !<br>
📈 <strong>96%</strong> en activité à 3 mois.`,
    replies: ['🌍 Mobilité internationale', '🏢 Partenaires entreprises', '🔧 Projets S8/S9']
  },
  entreprises: {
    text: `🏢 <strong>Nos partenaires industriels Télécom :</strong><br><br>
Thales, Eviden (Atos), Cdiscount, Orange, Capgemini, NXP Semiconductors,
STMicroelectronics, Sopra Steria, SPIE ICS, ESA, CEA, SII, Alten, Expleo.<br><br>
Ces entreprises proposent des stages, des projets S8/S9 encadrés et des interventions dans notre formation.`,
    replies: ['💼 Stages', '🔧 Projets S8/S9', '📞 Contact entreprises']
  },
  projets: {
    text: `🔧 <strong>Projets S8 et S9 :</strong><br><br>
<strong>Semestre 8 (2A) :</strong> POLARIS (5G/sécurité), SHIFT (ML financier),
Digital Twin VR, DOR (routage anonyme), Détection collisions drones, MailFilter…<br><br>
<strong>Semestre 9 (3A) :</strong> Restauration d'images par diffusion, The Polar Game (RL),
KARMA (Kalman/cybersécurité), Assistant IA & MCP, Stockage distribué chiffré…<br><br>
Projets parrainés par Thales et Atos.`,
    replies: ['🔒 Spécialisation RSC', '🤖 Spécialisation AISC', '🏢 Partenaires']
  },
  faq: {
    text: `❓ <strong>FAQ :</strong><br><br>
La rubrique FAQ est en cours de construction.<br><br>
📝 <em>À remplir — À discuter avec Delphine</em><br><br>
En attendant, posez-moi directement votre question !`,
    replies: ['📞 Contact', '📋 Admission', '📚 Programme']
  },
  contact: {
    text: `📞 <strong>Contactez-nous :</strong><br><br>
📱 Filière Télécoms : <strong>05.56.84.23.21</strong><br>
📧 Email : <strong>sec_telecom@enseirb-matmeca.fr</strong><br>
🏫 1 av. du Docteur Schweitzer, 33400 Talence<br><br>
Du lundi au vendredi, 9h–17h.`,
    replies: ['📋 Admission', '🏢 Partenaires', '📚 Programme']
  },
  frais: {
    text: `💰 <strong>Frais de scolarité 2025-2026 :</strong><br><br>
• Élèves UE : <strong>628 €/an</strong><br>
• Élèves hors UE (1ère inscription) : <strong>3 941 €</strong><br>
• Réinscription hors UE : <strong>628 €</strong><br>
• Année de césure : <strong>419 €</strong><br>
• CVEC : <strong>105 €/an</strong><br><br>
En contrat de professionnalisation (3A), la formation est <strong>gratuite</strong> ! 🎓`,
    replies: ['📋 Admission', '📞 Contact']
  },
  specialisations: {
    text: `🎯 <strong>Les 3 spécialisations (3ème année) :</strong><br><br>
🔒 <strong>RSC</strong> — Réseaux, Sécurité & Objets Connectés<br>
IoT, blockchain, cybersécurité, management du risque<br><br>
🤖 <strong>AISC</strong> — Apprentissage, Image, Signal & Communications<br>
Machine learning, 5G multi-antennes, GPS, biomédical<br><br>
⚙️ <strong>GLRT</strong> — Génie Logiciel Réseaux & Télécom<br>
Architectures logicielles, Web/mobile, systèmes distribués`,
    replies: ['💼 Stages', '🔧 Projets S9', '📋 Admission']
  },
  default: {
    text: `Je suis là pour vous aider ! 😊 Choisissez un sujet ou posez votre question :`,
    replies: ['📋 Admission', '📚 Programme', '💼 Stages', '🏢 Partenaires', '🔧 Projets', '❓ FAQ', '📞 Contact']
  }
};

const KEYWORDS = [
  { keys: ['faq', 'question', 'foire'],                         id: 'faq' },
  { keys: ['admission', 'candidat', 'intégrer', 'rejoindre', 'postuler'], id: 'admission' },
  { keys: ['programme', 'formation', 'cours', 'cursus', 'semestre'],      id: 'programme' },
  { keys: ['stage', 'pfe', 'alternance', 'apprentissage'],                id: 'stages' },
  { keys: ['entreprise', 'partenaire', 'thales', 'orange', 'cdiscount', 'capgemini', 'nxp'], id: 'entreprises' },
  { keys: ['projet', 's8', 's9', 'polaris', 'shift', 'dor', 'drone', 'mailfilter'], id: 'projets' },
  { keys: ['contact', 'téléphone', 'email', 'adresse', 'joindre'],        id: 'contact' },
  { keys: ['frais', 'prix', 'coût', 'scolarité', 'tarif', 'cher'],        id: 'frais' },
  { keys: ['spécialisation', 'rsc', 'aisc', 'glrt', 'option', 'choisir'],id: 'specialisations' },
];

function matchResponse(msg) {
  const m = msg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const entry of KEYWORDS) {
    if (entry.keys.some(k => m.includes(k))) return RESPONSES[entry.id];
  }
  return RESPONSES.default;
}

function buildBotHTML(response) {
  let html = `<div>${response.text}</div>`;
  if (response.replies?.length) {
    html += '<div class="quick-replies">';
    response.replies.forEach(r => {
      html += `<button class="quick-reply" data-reply="${r.toLowerCase()}">${r}</button>`;
    });
    html += '</div>';
  }
  return html;
}

function addMessage(container, text, type) {
  const div  = document.createElement('div');
  div.className = `chatbot-message message-${type}`;
  const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (type === 'bot') {
    div.innerHTML = `<div class="message-avatar">🤖</div><div><div class="message-content">${text}</div><div class="message-time">${time}</div></div>`;
  } else {
    div.innerHTML = `<div class="message-content">${text}</div>`;
  }
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function initChatbot() {
  const btn      = document.getElementById('chatbotBtn');
  const win      = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const messages = document.getElementById('chatbotMessages');
  const input    = document.getElementById('chatbotInput');
  const sendBtn  = document.getElementById('chatbotSend');
  const typing   = document.getElementById('chatbotTyping');
  const badge    = document.getElementById('chatbotBadge');
  if (!btn) return;

  btn.addEventListener('click', () => { win.classList.toggle('active'); badge.style.display = 'none'; });
  closeBtn.addEventListener('click', () => win.classList.remove('active'));

  function send() {
    const msg = input.value.trim();
    if (!msg) return;
    addMessage(messages, msg, 'user');
    input.value = '';
    typing.classList.add('active');
    messages.scrollTop = messages.scrollHeight;
    setTimeout(() => {
      typing.classList.remove('active');
      const resp = matchResponse(msg);
      addMessage(messages, buildBotHTML(resp), 'bot');
    }, 700 + Math.random() * 700);
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('quick-reply')) {
      input.value = e.target.textContent;
      send();
    }
  });

  setTimeout(() => { badge.style.display = 'flex'; }, 3000);
}

window.addEventListener('DOMContentLoaded', initChatbot);
