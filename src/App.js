import { useEffect, useRef, useState } from 'react';
import './App.css';
import fullTranslations from './translations.full.json';
import logoMark from './assets/logo-mark.png';
import imgEdaSolar from './assets/projects/eda-solar.webp';
import imgNovatex from './assets/projects/novatex.webp';
import imgSahgri from './assets/projects/sahgri.webp';
import imgOratek from './assets/projects/oratek.webp';

const translations = {
  DE: {
    ...fullTranslations.DE,
    'Independent creative studio':'Unabhängiges Kreativstudio','Navigate / 2026':'Navigation / 2026','Work':'Projekte','Services':'Leistungen','Studio':'Studio','Contact':'Kontakt','WE MAKE':'WIR MACHEN','DIGITAL':'DIGITALES','FEEL ALIVE.':'SPÜRBAR.','EXPLORE':'PROJEKTE','OUR WORK':'ENTDECKEN','SCROLL TO DISCOVER':'WEITER SCROLLEN','BUILT TO':'GEMACHT, UM','BE FELT.':'ZU WIRKEN.','VIEW ALL PROJECTS':'ALLE PROJEKTE','ONE STUDIO.':'EIN STUDIO.','NO SILOS.':'KEINE SILOS.','HOW WE WORK':'WIE WIR ARBEITEN','FOUR STAGES.':'VIER PHASEN.','NO THEATRE.':'KEIN THEATER.','Discover':'Entdecken','Define':'Definieren','Build':'Umsetzen','Launch & steward':'Start & Betreuung','THE STUDIO':'DAS STUDIO','SENIOR PEOPLE.':'ERFAHRENE MENSCHEN.','ZERO THEATRE.':'NULL THEATER.','CORE TEAM':'KERNTEAM','THE USEFUL QUESTIONS.':'DIE WICHTIGEN FRAGEN.','GIVE US THE':'NENNEN SIE UNS DAS','REAL PROBLEM.':'ECHTE PROBLEM.','What are you planning?':'Was planen Sie?','Name':'Name','Email':'E-Mail','Tell us about it':'Erzählen Sie uns davon','SEND INQUIRY':'ANFRAGE SENDEN','START A PROJECT':'PROJEKT STARTEN','SENDING…':'WIRD GESENDET…','DIRECT CONTACT':'DIREKTER KONTAKT','CLIENT PROJECT':'KUNDENPROJEKT','SOLUTION BLUEPRINT':'LÖSUNGSKONZEPT','CAPABILITIES':'KOMPETENZEN','SCOPE':'UMFANG','THE CHALLENGE':'DIE HERAUSFORDERUNG','OUR RESPONSE':'UNSERE LÖSUNG','THE RESULT':'DAS ERGEBNIS','VISIT LIVE WEBSITE':'LIVE-WEBSITE ÖFFNEN','NEXT CASE':'NÄCHSTES PROJEKT','CLOSE':'SCHLIESSEN','BACK TO TOP':'NACH OBEN',
    'Kosovo / Worldwide':'Kosovo / Weltweit','KOSOVO':'KOSOVO','Thank you.':'Vielen Dank.',
    'Your brief is on its way — we reply within two business days.':'Ihre Anfrage ist unterwegs — wir antworten innerhalb von zwei Werktagen.',
    'Could not send — please email contact@ossolut.com directly.':'Senden fehlgeschlagen — bitte schreiben Sie direkt an contact@ossolut.com.',
    'Name, a valid email and a short brief. We reply within two business days.':'Name, eine gültige E-Mail und ein kurzes Briefing. Wir antworten innerhalb von zwei Werktagen.',
    'A short brief is enough. It lands directly with the engineers who will actually build your project.':'Ein kurzes Briefing genügt. Es landet direkt bei den Ingenieuren, die Ihr Projekt tatsächlich umsetzen.',
    'Custom automation, web and mobile products, AI integrations and security work — engagements where design and engineering need to stay connected from the first workshop to production.':'Individuelle Automatisierung, Web- und Mobile-Produkte, KI-Integrationen und Security-Arbeit — Projekte, bei denen Design und Engineering vom ersten Workshop bis zur Produktion verbunden bleiben.',
    'Can you replace our Zapier, Make or n8n workflows?':'Können Sie unsere Zapier-, Make- oder n8n-Workflows ersetzen?',
    'Yes — it is one of our core services. We rebuild no-code automations as maintainable custom code with monitoring and error handling, typically cutting recurring tool costs by up to 70%.':'Ja — das ist eine unserer Kernleistungen. Wir bauen No-Code-Automatisierungen als wartbaren, individuellen Code mit Monitoring und Fehlerbehandlung neu — mit bis zu 70% geringeren laufenden Tool-Kosten.',
    'How does security testing work?':'Wie läuft Security-Testing ab?',
    'Every engagement is authorized and scoped in writing before testing begins. You receive a report of exploitable findings ranked by business impact, plus hands-on support fixing them.':'Jeder Auftrag wird vor Testbeginn schriftlich autorisiert und abgegrenzt. Sie erhalten einen Bericht ausnutzbarer Schwachstellen, priorisiert nach Geschäftsrisiko, plus konkrete Unterstützung bei der Behebung.',
    'We operate from Kosovo, in the Central European timezone, and collaborate remotely with clients across Europe and worldwide. Workshops can be held online or on-site.':'Wir arbeiten aus dem Kosovo in der mitteleuropäischen Zeitzone und kooperieren remote mit Kunden in ganz Europa und weltweit. Workshops finden online oder vor Ort statt.',
    'Full-Stack Developer · Automation Engineer':'Full-Stack-Entwickler · Automatisierung',
    'Full-Stack Engineer · Process Automation':'Full-Stack-Engineer · Prozessautomatisierung',
    'AI Security Architect':'KI-Sicherheitsarchitekt',
    'Data Scientist · AI/ML Engineer':'Data Scientist · KI/ML-Engineer',
    'Builds workflow automations, AI integrations and scalable web applications — from API architecture to production.':'Entwickelt Workflow-Automatisierungen, KI-Integrationen und skalierbare Webanwendungen — von der API-Architektur bis zur Produktion.',
    'Focused on intelligent automation, custom integrations and the systems that streamline business processes.':'Fokussiert auf intelligente Automatisierung, individuelle Integrationen und Systeme, die Geschäftsprozesse verschlanken.',
    'Specializes in application security, secure system design and AI-powered security automation — integrating security across the development lifecycle.':'Spezialisiert auf Anwendungssicherheit, sicheres Systemdesign und KI-gestützte Security-Automatisierung — Sicherheit über den gesamten Entwicklungszyklus hinweg.',
    'Builds full-stack systems, multi-agent platforms and RAG pipelines — from data science down to embedded hardware.':'Entwickelt Full-Stack-Systeme, Multi-Agent-Plattformen und RAG-Pipelines — von Data Science bis zu Embedded Hardware.',
    'OPEN CASE':'PROJEKT ÖFFNEN','DRAG THE DECK — CLICK TO OPEN':'DECK ZIEHEN — KLICKEN ZUM ÖFFNEN',
    'START A':'PROJEKT','PROJECT.':'STARTEN.'
  },
  FR: {
    ...fullTranslations.FR,
    'Independent creative studio':'Studio créatif indépendant','Navigate / 2026':'Navigation / 2026','Work':'Projets','Services':'Services','Studio':'Studio','Contact':'Contact','WE MAKE':'NOUS RENDONS','DIGITAL':'LE DIGITAL','FEEL ALIVE.':'VIVANT.','EXPLORE':'DÉCOUVREZ','OUR WORK':'NOS PROJETS','SCROLL TO DISCOVER':'FAITES DÉFILER','BUILT TO':'CONÇU POUR','BE FELT.':'ÊTRE RESSENTI.','VIEW ALL PROJECTS':'VOIR TOUS LES PROJETS','ONE STUDIO.':'UN STUDIO.','NO SILOS.':'SANS SILOS.','HOW WE WORK':'NOTRE MÉTHODE','FOUR STAGES.':'QUATRE ÉTAPES.','NO THEATRE.':'SANS CINÉMA.','Discover':'Découvrir','Define':'Définir','Build':'Construire','Launch & steward':'Lancer & accompagner','THE STUDIO':'LE STUDIO','SENIOR PEOPLE.':'DES EXPERTS.','ZERO THEATRE.':'SANS CINÉMA.','CORE TEAM':'ÉQUIPE PRINCIPALE','THE USEFUL QUESTIONS.':'LES BONNES QUESTIONS.','GIVE US THE':'PARLEZ-NOUS DU','REAL PROBLEM.':'VRAI PROBLÈME.','What are you planning?':'Que prévoyez-vous ?','Name':'Nom','Email':'E-mail','Tell us about it':'Parlez-nous du projet','SEND INQUIRY':'ENVOYER LA DEMANDE','START A PROJECT':'DÉMARRER UN PROJET','SENDING…':'ENVOI…','DIRECT CONTACT':'CONTACT DIRECT','CLIENT PROJECT':'PROJET CLIENT','SOLUTION BLUEPRINT':'CONCEPT DE SOLUTION','CAPABILITIES':'COMPÉTENCES','SCOPE':'PÉRIMÈTRE','THE CHALLENGE':'LE DÉFI','OUR RESPONSE':'NOTRE RÉPONSE','THE RESULT':'LE RÉSULTAT','VISIT LIVE WEBSITE':'VISITER LE SITE','NEXT CASE':'PROJET SUIVANT','CLOSE':'FERMER','BACK TO TOP':'RETOUR EN HAUT',
    'Kosovo / Worldwide':'Kosovo / Monde entier','Thank you.':'Merci.',
    'Your brief is on its way — we reply within two business days.':'Votre brief est en route — nous répondons sous deux jours ouvrés.',
    'Could not send — please email contact@ossolut.com directly.':'Échec de l’envoi — écrivez-nous directement à contact@ossolut.com.',
    'Name, a valid email and a short brief. We reply within two business days.':'Un nom, un e-mail valide et un brief court. Nous répondons sous deux jours ouvrés.',
    'A short brief is enough. It lands directly with the engineers who will actually build your project.':'Un brief court suffit. Il arrive directement aux ingénieurs qui construiront réellement votre projet.',
    'Custom automation, web and mobile products, AI integrations and security work — engagements where design and engineering need to stay connected from the first workshop to production.':'Automatisation sur mesure, produits web et mobiles, intégrations IA et travail de sécurité — des missions où design et ingénierie restent connectés du premier atelier à la production.',
    'Can you replace our Zapier, Make or n8n workflows?':'Pouvez-vous remplacer nos workflows Zapier, Make ou n8n ?',
    'Yes — it is one of our core services. We rebuild no-code automations as maintainable custom code with monitoring and error handling, typically cutting recurring tool costs by up to 70%.':'Oui — c’est l’un de nos services clés. Nous reconstruisons les automatisations no-code en code sur mesure maintenable, avec monitoring et gestion d’erreurs — jusqu’à 70% de coûts récurrents en moins.',
    'How does security testing work?':'Comment se déroulent les tests de sécurité ?',
    'Every engagement is authorized and scoped in writing before testing begins. You receive a report of exploitable findings ranked by business impact, plus hands-on support fixing them.':'Chaque mission est autorisée et cadrée par écrit avant le début des tests. Vous recevez un rapport des failles exploitables, classées par impact métier, avec un accompagnement concret pour les corriger.',
    'We operate from Kosovo, in the Central European timezone, and collaborate remotely with clients across Europe and worldwide. Workshops can be held online or on-site.':'Nous opérons depuis le Kosovo, sur le fuseau horaire d’Europe centrale, et collaborons à distance avec des clients en Europe et dans le monde. Les ateliers se tiennent en ligne ou sur site.',
    'Full-Stack Developer · Automation Engineer':'Développeur Full-Stack · Automatisation',
    'Full-Stack Engineer · Process Automation':'Ingénieur Full-Stack · Automatisation des processus',
    'AI Security Architect':'Architecte Sécurité IA',
    'Data Scientist · AI/ML Engineer':'Data Scientist · Ingénieur IA/ML',
    'Builds workflow automations, AI integrations and scalable web applications — from API architecture to production.':'Conçoit des automatisations de workflows, des intégrations IA et des applications web évolutives — de l’architecture API à la production.',
    'Focused on intelligent automation, custom integrations and the systems that streamline business processes.':'Automatisation intelligente, intégrations personnalisées et systèmes qui fluidifient les processus métier.',
    'Specializes in application security, secure system design and AI-powered security automation — integrating security across the development lifecycle.':'Sécurité applicative, conception de systèmes sécurisés et automatisation de la sécurité par IA — intégrées à l’ensemble du cycle de développement.',
    'Builds full-stack systems, multi-agent platforms and RAG pipelines — from data science down to embedded hardware.':'Construit des systèmes full-stack, des plateformes multi-agents et des pipelines RAG — de la data science au hardware embarqué.',
    'OPEN CASE':'VOIR LE PROJET','DRAG THE DECK — CLICK TO OPEN':'FAITES GLISSER — CLIQUEZ POUR OUVRIR',
    'START A':'DÉMARRER UN','PROJECT.':'PROJET.'
  }
};

const originalText = new WeakMap();
const originalAttributes = new WeakMap();

const projects = [
  { id:'01', name:'EDA Solar', type:'RENEWABLE ENERGY / WEB', tone:'acid', mark:'EDA\nSOLAR', image:imgEdaSolar, year:'LIVE', impact:'Solar energy, made easier to understand', stack:'UX / UI · Development · Content', scope:'Website · Solutions · Lead journey', url:'https://www.eda-ks.com/', problem:'EDA Solar needed one clear digital home for a broad offer spanning on-grid, off-grid and hybrid solar systems, battery storage and EV charging.', solution:'We designed and developed a structured company website that guides households and businesses from the right energy solution through consultation, planning, installation and activation.', outcome:'A live bilingual platform that brings EDA’s solutions, process and contact path together in one accessible experience.' },
  { id:'02', name:'Novatex', type:'MANUFACTURING / PRODUCT CATALOG', tone:'coral', mark:'NOVA\nTEX', image:imgNovatex, year:'LIVE', impact:'Technical products with a clearer commercial story', stack:'UX / UI · Development · Catalog', scope:'Website · Product system · Enquiries', url:'https://www.novatex-ks.com/', problem:'Novatex manufactures fiberglass mesh in numerous weights and grid specifications, so buyers need technical clarity without losing the company story and service offer.', solution:'We designed and developed a focused product website that organizes specifications, custom production, delivery, quality assurance and consulting into a straightforward buyer journey.', outcome:'A live company and product platform that gives European and regional customers a direct route from product comparison to enquiry.' },
  { id:'03', name:'Sahgri SARL', type:'CONSTRUCTION / CORPORATE WEB', tone:'orange', mark:'SAHGRI\nSARL', image:imgSahgri, year:'LIVE', impact:'Craft, consultancy and references in one place', stack:'UX / UI · Development · Content', scope:'Website · Services · Project archive', url:'https://sahgri.ch/', problem:'Sahgri’s work covers plastering, painting, consulting, suspended ceilings and acoustic solutions, backed by substantial Swiss reference projects that needed room to speak.', solution:'We designed and developed a service-led website that separates each expertise, presents reference work and makes quotation and contact information easy to reach.', outcome:'A live business platform connecting Sahgri’s specialist capabilities, completed projects and enquiry flow for clients across French-speaking Switzerland.' },
  { id:'04', name:'ORA-TEK Engineering', type:'PRECISION ENGINEERING / WEB', tone:'blue', mark:'ORA—TEK', image:imgOratek, year:'LIVE', impact:'Precision manufacturing presented with precision', stack:'UX / UI · Development · Multilingual', scope:'Website · Expertise · Machine park', url:'https://ora-tek-engineering.com/', problem:'ORA-TEK combines CNC manufacturing, engineering, industrial project leadership and training—a technical offer that must establish capability and trust quickly.', solution:'We designed and developed a multilingual website around its FANUC machine park, precision-mechanics expertise, quality commitment and direct access to the engineering team.', outcome:'A live four-language platform that presents the company’s capabilities and equipment to both regional and Swiss industrial audiences.' },
];

const services = [
  { n: '01', title: 'Custom automation', text: 'We replace expensive Zapier, Make and n8n workflows with maintainable custom code—up to 70% lower recurring costs.', tags: ['API integrations', 'Custom backends', 'Monitoring'] },
  { n: '02', title: 'Web & mobile products', text: 'Websites, internal platforms and mobile apps designed around the exact job your team or customers need to complete.', tags: ['Websites', 'Mobile apps', 'React'] },
  { n: '03', title: 'Security & pentesting', text: 'Authorized security testing that finds exploitable weaknesses and helps your team fix them responsibly.', tags: ['Web pentesting', 'API security', 'Hardening'] },
  { n: '04', title: 'Digital experiences', text: 'High-performance websites where interaction, narrative and utility work as one system.', tags: ['UX / UI', 'Development', 'Creative code'] },
  { n: '05', title: 'Brand systems', text: 'Distinct identities built to stay unmistakable across every digital surface.', tags: ['Strategy', 'Identity', 'Art direction'] },
  { n: '06', title: 'Motion & 3D', text: 'Motion languages that give brands a pulse—from interface gestures to launch films.', tags: ['Motion systems', '3D', 'Prototyping'] },
];

const process = [
  { n:'01', title:'Discover', time:'1–2 weeks', text:'We align on the actual problem, users, constraints and success measures before prescribing an interface or stack.' },
  { n:'02', title:'Define', time:'1–3 weeks', text:'Architecture, content, experience direction and a milestone plan become concrete enough to challenge and price.' },
  { n:'03', title:'Build', time:'6–16 weeks', text:'A senior pod designs and ships in weekly increments. You see working software early, not a reveal at the end.' },
  { n:'04', title:'Launch & steward', time:'Ongoing', text:'We prepare analytics, performance, documentation and handover, then stay available for deliberate iteration.' },
];

const team = [
  { initials:'AS', name:'Art Sahiti', role:'Full-Stack Developer · Automation Engineer', bio:'Builds workflow automations, AI integrations and scalable web applications — from API architecture to production.', skills:['Workflow Automation','AI Integrations','Full-Stack Development','API Integrations'] },
  { initials:'EG', name:'Erin Gashi', role:'Full-Stack Engineer · Process Automation', bio:'Focused on intelligent automation, custom integrations and the systems that streamline business processes.', skills:['Workflow Automation','Full-Stack Development','System Integrations','Process Automation'] },
  { initials:'EO', name:'Euron Osmani', role:'AI Security Architect', bio:'Specializes in application security, secure system design and AI-powered security automation — integrating security across the development lifecycle.', skills:['AI Security Architecture','Application Security','Security Automation','AI Solutions'] },
  { initials:'LM', name:'Lum Meta', role:'Data Scientist · AI/ML Engineer', bio:'Builds full-stack systems, multi-agent platforms and RAG pipelines — from data science down to embedded hardware.', skills:['Data Science','AI/ML Engineering','Full-Stack Development','Embedded Systems'] },
];

const faqs = [
  ['What kind of projects fit Ossolut?', 'Custom automation, web and mobile products, AI integrations and security work — engagements where design and engineering need to stay connected from the first workshop to production.'],
  ['Can you replace our Zapier, Make or n8n workflows?', 'Yes — it is one of our core services. We rebuild no-code automations as maintainable custom code with monitoring and error handling, typically cutting recurring tool costs by up to 70%.'],
  ['How does security testing work?', 'Every engagement is authorized and scoped in writing before testing begins. You receive a report of exploitable findings ranked by business impact, plus hands-on support fixing them.'],
  ['Do you sign NDAs?', 'Yes. We can review your NDA before discovery, or provide a mutual NDA when sensitive product, customer or technical information is involved.'],
  ['Who owns the final work?', 'Once agreed invoices are paid, you own the project-specific deliverables. Reusable internal tooling and third-party software remain governed by their respective terms.'],
  ['Where does the team work?', 'We operate from Kosovo, in the Central European timezone, and collaborate remotely with clients across Europe and worldwide. Workshops can be held online or on-site.'],
  ['What happens after launch?', 'We offer structured stabilization and ongoing stewardship. Documentation, monitoring and knowledge transfer are planned deliverables, not afterthoughts.'],
];

function Arrow({ diagonal = false }) {
  return <span className={diagonal ? 'arrow diagonal' : 'arrow'} aria-hidden="true">→</span>;
}

/**
 * Interactive particle field: navy specks that drift slowly, scatter away from
 * the pointer and brighten as it passes. Pure canvas, brand-monochrome.
 */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const RADIUS = 140;   // pointer influence radius
    const PUSH = 34;      // max scatter distance (px)
    let width = 0, height = 0, raf = 0;
    let particles = [];
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const build = () => {
      const count = Math.min(130, Math.round((width * height) / 11000));
      particles = Array.from({ length: count }, () => ({
        hx: Math.random() * width,
        hy: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1 + Math.random() * 1.8,
        a: 0.18 + Math.random() * 0.32,
      }));
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) draw();
    };

    const draw = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.1;
      pointer.y += (pointer.ty - pointer.y) * 0.1;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduced) {
          p.hx += p.vx; p.hy += p.vy;
          if (p.hx < -20) p.hx = width + 20; else if (p.hx > width + 20) p.hx = -20;
          if (p.hy < -20) p.hy = height + 20; else if (p.hy > height + 20) p.hy = -20;
        }
        const dx = p.hx - pointer.x, dy = p.hy - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = Math.max(0, 1 - dist / RADIUS);
        const ox = (dx / dist) * PUSH * force;
        const oy = (dy / dist) * PUSH * force;
        ctx.beginPath();
        ctx.arc(p.hx + ox, p.hy + oy, p.r * (1 + force * 0.9), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11,23,48,${Math.min(0.85, p.a * (1 + force * 2))})`;
        ctx.fill();
      }
    };

    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onLeave = () => { pointer.tx = -9999; pointer.ty = -9999; };

    resize();
    window.addEventListener('resize', resize);
    if (reduced) {
      draw();
    } else {
      wrap.addEventListener('pointermove', onMove);
      wrap.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

/**
 * Manifesto: the first statement is written in ~2,000 ink particles that
 * dissolve mid-scroll and re-assemble into the second while the section is
 * pinned. "remembered." resolves in accent blue; the pointer scatters the
 * dots, echoing the hero field. Pure canvas, no libraries.
 */
function ManifestoMorph() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Reduced motion: the CSS fallback shows the statement as static text.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const sticky = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const INK = { r: 11, g: 23, b: 48 };
    const ACCENT = { r: 65, g: 96, b: 159 };
    let width = 0, height = 0, particles = [], raf = 0, visible = false, progress = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    // Greedy word-wrap for a phrase at a given font/width.
    const layout = (octx, text, font, maxWidth) => {
      octx.font = font;
      const space = octx.measureText(' ').width;
      const lines = [[]];
      let lineWidth = 0;
      text.split(' ').forEach((word) => {
        const w = octx.measureText(word).width;
        if (lineWidth > 0 && lineWidth + space + w > maxWidth) { lines.push([]); lineWidth = 0; }
        lines[lines.length - 1].push({ word, w });
        lineWidth += (lineWidth > 0 ? space : 0) + w;
      });
      return lines.map((words) => ({
        words,
        width: words.reduce((sum, entry, i) => sum + entry.w + (i > 0 ? space : 0), 0),
      }));
    };

    // Render a phrase offscreen (accent word in the green channel, the rest
    // in red) and sample the pixels into dot targets.
    const samplePhrase = (text, accentWord) => {
      const off = document.createElement('canvas');
      off.width = width; off.height = height;
      const octx = off.getContext('2d');
      const fontSize = Math.max(30, Math.min(86, width * 0.058));
      const font = `600 ${fontSize}px Manrope, sans-serif`;
      const lineHeight = fontSize * 1.18;
      const lines = layout(octx, text, font, width * 0.86);
      const space = octx.measureText(' ').width;
      octx.textBaseline = 'middle';
      lines.forEach((line, li) => {
        let x = (width - line.width) / 2;
        const y = height / 2 + (li - (lines.length - 1) / 2) * lineHeight;
        line.words.forEach((entry) => {
          octx.fillStyle = entry.word === accentWord ? '#00ff00' : '#ff0000';
          octx.fillText(entry.word, x, y);
          x += entry.w + space;
        });
      });
      const data = octx.getImageData(0, 0, width, height).data;
      const step = fontSize > 56 ? 4 : 3;
      const points = [];
      for (let py = 0; py < height; py += step) {
        for (let px = 0; px < width; px += step) {
          const i = (py * width + px) * 4;
          if (data[i + 3] > 128) points.push({ x: px, y: py, accent: data[i + 1] > 128 });
        }
      }
      return points;
    };

    const shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const build = () => {
      width = Math.round(section.getBoundingClientRect().width);
      height = Math.round(window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const a = shuffle(samplePhrase('Most digital work is designed to be understood.', null));
      const b = shuffle(samplePhrase('We design it to be remembered.', 'remembered.'));
      if (!a.length || !b.length) { particles = []; return; }
      const count = Math.min(2600, Math.max(a.length, b.length));
      particles = Array.from({ length: count }, (_, i) => {
        const pa = a[i % a.length];
        const pb = b[i % b.length];
        const angle = Math.random() * Math.PI * 2;
        return {
          ax: pa.x, ay: pa.y, bx: pb.x, by: pb.y, accent: pb.accent,
          size: 1.1 + Math.random() * 1.5,
          sx: Math.cos(angle), sy: Math.sin(angle),
          amp: 60 + Math.random() * 130,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.8,
        };
      });
    };

    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const mix = (c1, c2, t) => ({
      r: Math.round(c1.r + (c2.r - c1.r) * t),
      g: Math.round(c1.g + (c2.g - c1.g) * t),
      b: Math.round(c1.b + (c2.b - c1.b) * t),
    });

    const draw = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      ctx.clearRect(0, 0, width, height);
      const t = ease(Math.min(1, Math.max(0, (progress - 0.24) / 0.52)));
      const scatter = Math.sin(Math.PI * t); // 0 → 1 → 0 across the morph
      const settle = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));
      const time = performance.now() / 1000;
      const drift = 1 - settle * 0.85; // dots calm down once phrase B lands
      for (const p of particles) {
        let x = p.ax + (p.bx - p.ax) * t + p.sx * p.amp * scatter + Math.sin(time * p.speed + p.phase) * 1.4 * drift;
        let y = p.ay + (p.by - p.ay) * t + p.sy * p.amp * 0.7 * scatter + Math.cos(time * p.speed * 0.9 + p.phase) * 1.4 * drift;
        const dx = x - pointer.x, dy = y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = Math.max(0, 1 - dist / 110);
        x += (dx / dist) * 30 * force;
        y += (dy / dist) * 30 * force;
        const c = p.accent ? mix(INK, ACCENT, t) : INK;
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${0.5 + 0.4 * (1 - scatter) + force * 0.1})`;
        ctx.fillRect(x, y, p.size, p.size);
      }
    };

    // Scroll drives the scrub directly (works even where rAF is throttled);
    // the rAF loop only adds idle drift and pointer response while visible.
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      draw();
    };
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };
    const onLeave = () => { pointer.tx = -9999; pointer.ty = -9999; };
    const onResize = () => { build(); onScroll(); };

    build();
    onScroll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);
    io.observe(section);
    sticky.addEventListener('pointermove', onMove);
    sticky.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      sticky.removeEventListener('pointermove', onMove);
      sticky.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="manifesto" ref={sectionRef}>
      <div className="manifesto-sticky">
        <span className="manifesto-tag">( THE DIFFERENCE )</span>
        <canvas ref={canvasRef} className="manifesto-canvas" aria-hidden="true" />
        <p className="manifesto-static">Most digital work is designed to be understood. <em>We design it to be remembered.</em></p>
      </div>
    </section>
  );
}

/**
 * Selected work as a physical deck: cards stack with a fanned offset, the top
 * card lifts on hover, dragging (or swiping) throws it to the back of the
 * deck, clicking opens the case study. Arrow keys and buttons do the same.
 */
function WorkDeck({ projects, onOpen }) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(null); // { index, dir: 'left'|'right' }
  const drag = useRef(null);
  const count = projects.length;
  const pos = (i) => (i - active + count) % count;

  const advance = (step, dir) => {
    if (leaving) return;
    setLeaving({ index: active, dir });
    window.setTimeout(() => {
      setActive((a) => (a + step + count) % count);
      setLeaving(null);
    }, 380);
  };

  const onPointerDown = (event) => {
    if (leaving) return;
    const node = event.currentTarget;
    node.setPointerCapture(event.pointerId);
    node.classList.add('dragging');
    drag.current = { id: event.pointerId, x0: event.clientX, y0: event.clientY, dx: 0, moved: false, node };
  };
  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d || event.pointerId !== d.id) return;
    d.dx = event.clientX - d.x0;
    const dy = event.clientY - d.y0;
    if (Math.abs(d.dx) > 6 || Math.abs(dy) > 6) d.moved = true;
    d.node.style.transform = `translate(${d.dx}px, ${dy * 0.35}px) rotate(${d.dx * 0.05}deg)`;
  };
  const onPointerUp = (event) => {
    const d = drag.current;
    if (!d || event.pointerId !== d.id) return;
    drag.current = null;
    d.node.classList.remove('dragging');
    d.node.style.transform = '';
    if (Math.abs(d.dx) > 90) advance(1, d.dx < 0 ? 'left' : 'right');
    else if (!d.moved) onOpen(projects[active]);
  };
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); advance(1, 'left'); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); advance(-1, 'right'); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(projects[active]); }
  };

  const current = projects[active];
  return (
    <div className="work-deck">
      <div className="deck-stage" tabIndex={0} role="group" aria-label="Project deck — arrow keys to browse, Enter to open" onKeyDown={onKeyDown}>
        {projects.map((project, i) => {
          const p = pos(i);
          const flying = leaving && leaving.index === i;
          return (
            <article
              className={`deck-card p${p}${p === 0 ? ' top' : ''}${flying ? ` fly-${leaving.dir}` : ''}`}
              style={{ zIndex: flying ? count + 1 : count - p }}
              key={project.name}
              onPointerDown={p === 0 && !flying ? onPointerDown : undefined}
              onPointerMove={p === 0 ? onPointerMove : undefined}
              onPointerUp={p === 0 ? onPointerUp : undefined}
              onPointerCancel={p === 0 ? onPointerUp : undefined}
            >
              <div className={`project-visual ${project.tone}`}>
                <img src={project.image} alt={`${project.name} website preview`} loading="lazy" draggable={false} />
                <div className="visual-grid" />
                <span className="project-mark">{project.mark.split('\n').map((line) => <span key={line}>{line}</span>)}</span>
                <span className="project-index">({project.id})</span>
              </div>
              <div className="deck-meta"><h3>{project.name}</h3><span>{project.type}</span></div>
            </article>
          );
        })}
      </div>
      <div className="deck-info" key={current.name}>
        <span className="deck-count">0{active + 1} / 0{count}</span>
        <h3>{current.name}</h3>
        <span className="deck-type">{current.type}</span>
        <p>{current.impact}</p>
        <div className="deck-actions">
          <button className="deck-open" onClick={() => onOpen(current)}>OPEN CASE <Arrow diagonal /></button>
          <div className="deck-nav">
            <button onClick={() => advance(-1, 'right')} aria-label="Previous project">←</button>
            <button onClick={() => advance(1, 'left')} aria-label="Next project">→</button>
          </div>
        </div>
        <span className="deck-hint">DRAG THE DECK — CLICK TO OPEN</span>
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ type:'New digital product', name:'', email:'', brief:'', website:'' });
  const nameInputRef = useRef(null);

  // Focus the first field once the takeover has slid into place.
  useEffect(() => {
    if (!contactOpen) return;
    const timer = window.setTimeout(() => nameInputRef.current?.focus(), 500);
    return () => window.clearTimeout(timer);
  }, [contactOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); setContactOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    const translatePage = () => {
      const dictionary = translations[language] || {};
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (!node.nodeValue.trim() || ['SCRIPT','STYLE'].includes(node.parentElement?.tagName)) continue;
        if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        const source = originalText.get(node);
        const clean = source.trim();
        const translated = Object.entries(dictionary).sort((a,b) => b[0].length - a[0].length).reduce((value, [from, to]) => value.split(from).join(to), clean);
        node.nodeValue = source.replace(clean, translated);
      }
      document.querySelectorAll('[placeholder]').forEach(element => {
        if (!originalAttributes.has(element)) originalAttributes.set(element, element.getAttribute('placeholder'));
        const source = originalAttributes.get(element);
        const translated = Object.entries(dictionary).sort((a,b) => b[0].length - a[0].length).reduce((value, [from, to]) => value.split(from).join(to), source);
        element.setAttribute('placeholder', translated);
      });
    };
    translatePage();
    const observer = new MutationObserver(() => translatePage());
    observer.observe(document.body, { childList:true, subtree:true });
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedProject || contactOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, selectedProject, contactOpen]);

  // Reveal-on-scroll: elements fade/rise in as they enter the viewport.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll(
      '.section-heading, .work-deck, .service, .process-grid article, .team-grid article, .faq-list article, .inquiry-head, .inquiry-cta, .direct-contact > div'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    targets.forEach((target, index) => {
      target.classList.add('reveal');
      target.style.transitionDelay = `${(index % 3) * 70}ms`;
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  const setField = (key, value) => setFormData(current => ({ ...current, [key]: value }));
  const openContact = () => {
    if (formStatus === 'sent') { setFormStatus('idle'); setFormData(current => ({ ...current, brief:'' })); }
    setContactOpen(true);
  };
  const submitInquiry = async (event) => {
    event.preventDefault();
    if (formStatus === 'sending') return;
    if (!formData.name.trim() || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.brief.trim()) { setFormStatus('invalid'); return; }
    setFormStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.type,
          name: formData.name.trim(),
          email: formData.email.trim(),
          brief: formData.brief.trim(),
          website: formData.website, // honeypot — humans leave it empty
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || 'send failed');
      setFormStatus('sent');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="site">
      <header className="header">
        <a className="brand" href="#top" aria-label="Ossolut home">
          <img className="brand-logo" src={logoMark} alt="" />
          <strong>OSSOLUT</strong>
        </a>
        <div className="header-status"><i /> Independent creative studio</div>
        <div className="language-switcher" aria-label="Language selector">
          {['EN','DE','FR'].map(code => <button key={code} className={language === code ? 'active' : ''} onClick={() => setLanguage(code)} aria-pressed={language === code}>{code}</button>)}
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
          <b><i /><i /></b>
        </button>
      </header>

      <nav className={`menu-panel ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-meta">Navigate / 2026</div>
        {['Work', 'Services', 'Studio', 'Contact'].map((item, index) => (
          <a href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} key={item}>
            <small>0{index + 1}</small><span>{item}</span><Arrow diagonal />
          </a>
        ))}
        <div className="menu-bottom"><span>Kosovo / Worldwide</span><span>contact@ossolut.com</span></div>
      </nav>

      <main id="top">
        <section className="hero section-pad">
          <ParticleField />
          <div className="eyebrow hero-eyebrow"><span>( OSSOLUT STUDIO )</span><span>EST. 2026 / XK</span></div>
          <div className="hero-core">
            <img className="hero-logo" src={logoMark} alt="Ossolut logo" />
            <h1>
              <span className="hero-line">WE MAKE</span>
              <span className="hero-line">DIGITAL</span>
              <span className="hero-line">FEEL ALIVE.</span>
            </h1>
            <p>We build expressive identities and digital experiences for ambitious technology brands.</p>
            <a className="hero-cta" href="#work">EXPLORE OUR WORK <Arrow diagonal /></a>
          </div>
          <div className="hero-foot"><span className="scroll-note">SCROLL TO DISCOVER ↓</span></div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div><span className="eyebrow-label">( SELECTED WORK )</span><h2>BUILT TO<br />BE FELT.</h2></div>
            <p>Live client platforms and solution blueprints across energy, manufacturing, construction, precision engineering and custom automation.</p>
          </div>
          <WorkDeck projects={projects} onOpen={setSelectedProject} />
        </section>

        <section className="services" id="services">
          <div className="section-pad">
            <div className="section-heading">
              <div><span className="eyebrow-label">( SERVICES / EXPERTISE )</span><h2>ONE STUDIO.<br /><em>NO SILOS.</em></h2></div>
              <p>From the first strategic question to the last line of code, we keep disciplines together so the idea stays intact.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service" key={service.n}>
                  <span>{service.n}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="service-tags">{service.tags.map(tag => <small key={tag}>{tag}</small>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process section-pad" id="process">
          <div className="section-heading"><div><span className="eyebrow-label">( HOW WE WORK )</span><h2>FOUR STAGES.<br />NO THEATRE.</h2></div><p>Enough structure to remove uncertainty, with enough flexibility to keep learning while we build.</p></div>
          <div className="process-grid">
            {process.map(item => <article key={item.n}><span>/ {item.n}</span><h3>{item.title}</h3><p>{item.text}</p><time>{item.time}</time></article>)}
          </div>
        </section>

        <ManifestoMorph />

        <section className="studio section-pad" id="studio">
          <div className="section-heading">
            <div><span className="eyebrow-label">( CORE TEAM )</span><h2>SENIOR PEOPLE.<br />ZERO THEATRE.</h2></div>
            <p>Ossolut is an independent design and technology studio. The people in the room are the people making the work.</p>
          </div>
          <div className="team-grid">
            {team.map(person => <article key={person.name}><div className="team-monogram">{person.initials}</div><span>{person.role}</span><h3>{person.name}</h3><p>{person.bio}</p><div>{person.skills.map(skill => <small key={skill}>{skill}</small>)}</div></article>)}
          </div>
        </section>

        <section className="faq section-pad">
          <div className="section-heading"><div><span className="eyebrow-label">( FREQUENTLY ASKED )</span><h2>THE USEFUL<br />QUESTIONS.</h2></div><p>Practical details about fit, ownership, collaboration and what happens when the launch is over.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <article className={faqOpen === index ? 'open' : ''} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index}><span>0{index + 1}</span><strong>{question}</strong><i>+</i></button><div><p>{answer}</p></div></article>)}</div>
        </section>

        <section className="inquiry section-pad" id="inquiry">
          <div className="inquiry-head"><span className="eyebrow-label">( PROJECT BRIEF )</span><h2>GIVE US THE<br /><em>REAL PROBLEM.</em></h2><p>Name, a valid email and a short brief. We reply within two business days.</p></div>
          <div className="inquiry-cta">
            <p>A short brief is enough. It lands directly with the engineers who will actually build your project.</p>
            <button className="open-contact" onClick={openContact}>START A PROJECT <Arrow diagonal /></button>
            <span className="cta-note">RESPONSE / WITHIN TWO BUSINESS DAYS</span>
          </div>
          <aside className="direct-contact">
            <div><span>( DIRECT CONTACT )</span><a href="mailto:contact@ossolut.com">contact@ossolut.com</a><p>For an NDA, RFP or a quick fit check, contact our studio directly.</p></div>
          </aside>
        </section>

        <section className="contact" id="contact">
          <footer className="footer section-pad">
            <div className="footer-brand"><img className="brand-logo" src={logoMark} alt="" /><strong>OSSOLUT</strong></div>
            <div><span>KOSOVO</span><span>AVAILABLE WORLDWIDE</span></div>
            <div><a href="mailto:contact@ossolut.com">CONTACT@OSSOLUT.COM</a><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></div>
            <small>© 2026 OSSOLUT</small>
          </footer>
        </section>
      </main>
      <div className={`contact-takeover${contactOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Project inquiry" aria-hidden={!contactOpen}>
        <button className="takeover-close" onClick={() => setContactOpen(false)} aria-label="Close inquiry form">CLOSE ×</button>
        <div className="takeover-grid">
          <div className="takeover-intro">
            <span className="eyebrow-label">( PROJECT BRIEF )</span>
            <h3>START A<br />PROJECT.</h3>
            <p>A short brief is enough. It lands directly with the engineers who will actually build your project.</p>
            <a href="mailto:contact@ossolut.com">contact@ossolut.com</a>
          </div>
          <div className="takeover-form">
            {formStatus === 'sent' ? (
              <div className="sent-block" role="status">
                <strong>Thank you.</strong>
                <p>Your brief is on its way — we reply within two business days.</p>
                <button className="open-contact" onClick={() => setContactOpen(false)}>CLOSE</button>
              </div>
            ) : (
              <form onSubmit={submitInquiry} noValidate>
                <fieldset><legend>01 / What are you planning?</legend><div className="choice-row">{['New digital product','Replatform / redesign','Brand + website','Automation','Audit & direction'].map(value => <button type="button" className={formData.type === value ? 'active' : ''} onClick={() => setField('type', value)} key={value}>{value}</button>)}</div></fieldset>
                <div className="input-grid"><label>Name *<input ref={nameInputRef} value={formData.name} onChange={e => setField('name', e.target.value)} placeholder="Your name" autoComplete="name" /></label><label>Email *<input type="email" value={formData.email} onChange={e => setField('email', e.target.value)} placeholder="you@company.com" autoComplete="email" /></label></div>
                <label className="brief-label">Tell us about it *<textarea value={formData.brief} onChange={e => setField('brief', e.target.value)} placeholder="What are you building, where is it stuck, and what should be true after we work together?" /></label>
                <label className="hp-field" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={formData.website} onChange={e => setField('website', e.target.value)} /></label>
                <div className="form-foot"><span>RESPONSE / WITHIN TWO BUSINESS DAYS</span><button type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'SENDING…' : <>SEND INQUIRY <Arrow diagonal /></>}</button></div>
                {formStatus === 'invalid' && <p className="form-message error" role="alert">Please add your name, a valid email address and a short project brief.</p>}
                {formStatus === 'error' && <p className="form-message error" role="alert">Could not send — please email contact@ossolut.com directly.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
      {selectedProject && <div className="case-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.name} case study`}>
        <button className="case-close" onClick={() => setSelectedProject(null)}>CLOSE ×</button>
        <div className={`case-hero ${selectedProject.tone}`} style={{ backgroundImage:`linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.55)), url(${selectedProject.image})` }}><span>CLIENT PROJECT / {selectedProject.id} · {selectedProject.year}</span><h2>{selectedProject.name}</h2><strong>{selectedProject.impact}</strong></div>
        <div className="case-body"><div className="case-meta"><span>CAPABILITIES</span><b>{selectedProject.stack}</b><span>SCOPE</span><b>{selectedProject.scope}</b></div><section><span>01 / THE CHALLENGE</span><p>{selectedProject.problem}</p></section><section><span>02 / OUR RESPONSE</span><p>{selectedProject.solution}</p></section><section><span>03 / THE RESULT</span><p>{selectedProject.outcome}</p></section><div className="case-actions">{selectedProject.url && <a className="case-live" href={selectedProject.url} target="_blank" rel="noreferrer">VISIT LIVE WEBSITE <Arrow diagonal /></a>}<button onClick={() => { const index = projects.indexOf(selectedProject); setSelectedProject(projects[(index + 1) % projects.length]); }}>NEXT CASE <Arrow /></button></div></div>
      </div>}
    </div>
  );
}

export default App;
