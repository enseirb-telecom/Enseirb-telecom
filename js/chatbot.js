/* =============================================
   ENSEIRB-MATMECA — Département Télécommunications
   chatbot.js — Assistant virtuel IA
   ============================================= */

const RESPONSES = {
  admission: {
    text: `📋 <strong>Admission :</strong><br><br>
• <strong>CCINP</strong> — MP (17 pl.), MPI (7 pl.), PC (7 pl.), PSI (18 pl.), TSI (1 pl.), PT (1 pl.)<br>
• <strong>CPBx / Prépa des INP</strong> — 3 + 3 places<br>
• <strong>Titres</strong> — BUT/Licence en 1A (4 pl.), Master 1 en 2A<br>
• <strong>Pass'Ingénieur</strong> — L2/L3 (1 place)<br><br>
📅 Candidatures : 13 mars – 22 mai 2025<br>
📧 candidater-enseirbmatmeca@bordeaux-inp.fr`,
    replies: ['💰 Frais de scolarité', '📞 Contact', '📚 Programme']
  },
  programme: {
    text: `📚 <strong>Programme — 3 ans (Bac+5) :</strong><br><br>
• <strong>180 crédits ECTS</strong> — Labels CTI & EUR-ACE<br>
• 4 piliers : Réseaux & Sécurité · Informatique · Communications Numériques · Signal & IA<br>
• Stages cumulés : 12 mois<br>
• Mobilité internationale obligatoire : ≥ 17 semaines<br>
• 3 spécialisations en 3A : RSC · AISC · GLRT`,
    replies: ['🔒 Spécialisation RSC', '🤖 Spécialisation AISC', '⚙️ Spécialisation GLRT', '💼 Stages']
  },
  stages: {
    text: `💼 <strong>Stages (12 mois cumulés) :</strong><br><br>
• <strong>1A</strong> — Découverte (1-2 mois, mai-août)<br>
• <strong>2A</strong> — Application (3-4 mois, mai-septembre)<br>
• <strong>3A</strong> — Projet de fin d'études (5-6 mois, fév-sept)<br><br>
🎯 70 % des étudiants signent avant la sortie<br>
📈 96 % en activité à 3 mois`,
    replies: ['🏢 Partenaires industriels', '🔧 Projets S8/S9', '📊 Insertion pro']
  },
  entreprises: {
    text: `🏢 <strong>Partenaires industriels (domaine Télécom) :</strong><br><br>
Thales · Eviden (Atos) · Cdiscount · Orange · Capgemini<br>
NXP Semiconductors · STMicroelectronics · Sopra Steria<br>
SPIE ICS · ESA · CEA · SII · Alten · Expleo<br><br>
Ces entreprises proposent des stages, projets S8/S9 et des interventions régulières.`,
    replies: ['💼 Stages', '🔧 Projets S8/S9', '📞 Contact entreprises']
  },
  projets: {
    text: `🔧 <strong>Projets S8 et S9 :</strong><br><br>
<strong>S8 (2A) :</strong><br>
POLARIS (codes polaires 5G) · SHIFT (ML financier) · Digital Twin VR · DOR (routage anonyme) · Jeu de Dames IA · MailFilter · Drones chiffrés<br><br>
<strong>S9 (3A) :</strong><br>
Restauration d'images par diffusion · The Polar Game (RL) · KARMA (Kalman/cyber) · Assistant IA & MCP · Stockage distribué chiffré · IoT & Paillier<br><br>
Parrainés par Thales et Atos.`,
    replies: ['🔒 Spécialisation RSC', '🤖 Spécialisation AISC', '🏢 Partenaires']
  },
  faq: {
    text: `❓ <strong>FAQ :</strong><br><br>
La rubrique FAQ est en cours de construction.<br><br>
📝 <em>À remplir — À discuter avec Delphine</em><br><br>
En attendant, posez-moi votre question directement !`,
    replies: ['📋 Admission', '📚 Programme', '💼 Stages', '📞 Contact']
  },
  contact: {
    text: `📞 <strong>Nous contacter :</strong><br><br>
📱 Filière Télécoms : <strong>05.56.84.23.21</strong><br>
📋 Direction des études : <strong>05.56.84.65.09</strong><br>
📧 <strong>sec_telecom@enseirb-matmeca.fr</strong><br>
📍 1 avenue du Docteur Schweitzer, 33400 Talence<br><br>
Ouvert lun–ven, 9h–17h.`,
    replies: ['📋 Admission', '🏢 Partenaires', '📚 Programme']
  },
  frais: {
    text: `💰 <strong>Droits de scolarité 2025-2026 :</strong><br><br>
• Élèves UE : <strong>628 €/an</strong><br>
• Hors UE (1ère inscription) : <strong>3 941 €</strong><br>
• Hors UE (réinscription) : <strong>628 €</strong><br>
• Année de césure : <strong>419 €</strong><br>
• CVEC : <strong>105 €/an</strong><br><br>
💡 En contrat pro (3A) : <strong>formation gratuite</strong> !`,
    replies: ['📋 Admission', '📞 Contact']
  },
  specialisations: {
    text: `🎯 <strong>Spécialisations de 3ème année :</strong><br><br>
🔒 <strong>RSC</strong> — Réseaux, Sécurité & Objets Connectés<br>
IoT, blockchain, cybersécurité, gestion du risque<br><br>
🤖 <strong>AISC</strong> — Apprentissage, Image, Signal & Comm.<br>
Machine learning, 5G multi-antennes, GPS, biomédical<br><br>
⚙️ <strong>GLRT</strong> — Génie Logiciel Réseaux & Télécom<br>
Architectures logicielles, Web/mobile, distribué`,
    replies: ['💼 Stages', '🔧 Projets S9', '📋 Admission']
  },
  international: {
    text: `🌍 <strong>Dimension internationale :</strong><br><br>
• Mobilité obligatoire : <strong>minimum 17 semaines</strong><br>
• Plus de <strong>150 universités partenaires</strong> dans le monde<br>
• Échanges ou stages à l'étranger<br>
• Enseignements et soutenances en anglais<br>
• Collaborations de recherche : Canada, Suisse, Japon, Inde, Liban...`,
    replies: ['📚 Programme', '💼 Stages', '📋 Admission']
  },
  insertion: {
    text: `📊 <strong>Insertion professionnelle :</strong><br><br>
• <strong>70%</strong> signent avant de diplômer<br>
• <strong>96%</strong> en activité à 3 mois<br>
• <strong>8%</strong> poursuivent en thèse<br><br>
<strong>Zones géographiques :</strong><br>
Nouvelle-Aquitaine 37% · Île-de-France 37% · International 3%<br><br>
<strong>Secteurs :</strong><br>
Conseil & bureaux d'études 50% · Informatique 29% · Aéronautique 5%`,
    replies: ['🏢 Partenaires industriels', '📚 Programme', '📞 Contact']
  },
  default: {
    text: `Bonjour ! Je peux vous renseigner sur :<br><br>
📋 Admission &nbsp;|&nbsp; 📚 Programme &nbsp;|&nbsp; 💼 Stages<br>
🏢 Partenaires &nbsp;|&nbsp; 🔧 Projets &nbsp;|&nbsp; ❓ FAQ &nbsp;|&nbsp; 📞 Contact`,
    replies: ['📋 Admission', '📚 Programme', '💼 Stages', '🏢 Partenaires', '🔧 Projets', '❓ FAQ', '📞 Contact']
  }
};

function matchResponse(msg) {
  const m = msg.toLowerCase();
  if (/faq|foire|question fr/.test(m))                              return RESPONSES.faq;
  if (/admission|candidat|intégrer|rejoindre|postuler/.test(m))    return RESPONSES.admission;
  if (/programme|formation|cours|cursus|semestre/.test(m))         return RESPONSES.programme;
  if (/stage|pfe|alternance|apprentissage/.test(m))                return RESPONSES.stages;
  if (/entreprise|partenaire|thales|orange|capgemini|nxp|eviden/.test(m)) return RESPONSES.entreprises;
  if (/projet|s8|s9|polaris|shift|dor|mailfilter|digital twin/.test(m)) return RESPONSES.projets;
  if (/contact|téléphone|email|adresse|secrétariat/.test(m))       return RESPONSES.contact;
  if (/frais|prix|coût|scolarité|tarif|gratuit/.test(m))           return RESPONSES.frais;
  if (/spécialisation|rsc|aisc|glrt|option/.test(m))               return RESPONSES.specialisations;
  if (/international|étranger|mobilité|anglais/.test(m))           return RESPONSES.international;
  if (/insertion|emploi|travail|salaire|métier/.test(m))           return RESPONSES.insertion;
  return RESPONSES.default;
}

function buildBotHTML(response) {
  let html = `<div>${response.text}</div>`;
  if (response.replies?.length) {
    html += '<div class="quick-replies">' +
      response.replies.map(r => `<button class="quick-reply" data-reply="${r.toLowerCase()}">${r}</button>`).join('') +
      '</div>';
  }
  return html;
}

function addMessage(container, text, type) {
  const div  = document.createElement('div');
  div.className = `chatbot-message message-${type}`;
  const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (type === 'bot') {
    div.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div>
        <div class="message-content">${text}</div>
        <div class="message-time">${time}</div>
      </div>`;
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
  const msgs     = document.getElementById('chatbotMessages');
  const input    = document.getElementById('chatbotInput');
  const send     = document.getElementById('chatbotSend');
  const typing   = document.getElementById('chatbotTyping');
  const badge    = document.getElementById('chatbotBadge');

  if (!btn) return;

  btn.addEventListener('click', () => {
    win.classList.toggle('active');
    if (badge) badge.style.display = 'none';
  });
  closeBtn.addEventListener('click', () => win.classList.remove('active'));

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(msgs, text, 'user');
    input.value = '';
    typing.classList.add('active');
    msgs.scrollTop = msgs.scrollHeight;

    setTimeout(() => {
      typing.classList.remove('active');
      const response = matchResponse(text);
      addMessage(msgs, buildBotHTML(response), 'bot');
    }, 700 + Math.random() * 700);
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('quick-reply')) {
      input.value = e.target.textContent;
      sendMessage();
    }
  });

  // Show notification badge after 3s
  setTimeout(() => { if (badge) badge.style.display = 'flex'; }, 3000);
}

document.addEventListener('DOMContentLoaded', initChatbot);
