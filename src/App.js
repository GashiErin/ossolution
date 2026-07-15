import { useEffect, useState } from 'react';
import './App.css';
import fullTranslations from './translations.full.json';

const translations = {
  DE: {
    ...fullTranslations.DE,
    'Independent creative studio':'Unabhängiges Kreativstudio','Navigate / 2026':'Navigation / 2026','Work':'Projekte','Services':'Leistungen','Studio':'Studio','Contact':'Kontakt','WE MAKE':'WIR MACHEN','DIGITAL':'DIGITALES','FEEL ALIVE.':'SPÜRBAR.','EXPLORE':'PROJEKTE','OUR WORK':'ENTDECKEN','SCROLL TO DISCOVER':'WEITER SCROLLEN','SELECTED COLLABORATORS':'AUSGEWÄHLTE PARTNER','BUILT TO':'GEMACHT, UM','BE FELT.':'ZU WIRKEN.','VIEW ALL PROJECTS':'ALLE PROJEKTE','ONE STUDIO.':'EIN STUDIO.','NO SILOS.':'KEINE SILOS.','HOW WE WORK':'WIE WIR ARBEITEN','FOUR STAGES.':'VIER PHASEN.','NO THEATRE.':'KEIN THEATER.','Discover':'Entdecken','Define':'Definieren','Build':'Umsetzen','Launch & steward':'Start & Betreuung','HOW WE THINK':'WIE WIR DENKEN','THE STUDIO':'DAS STUDIO','BUILT DIFFERENT':'ANDERS AUFGEBAUT','SENIOR PEOPLE.':'ERFAHRENE MENSCHEN.','ZERO THEATRE.':'NULL THEATER.','CORE TEAM':'KERNTEAM','THE PEOPLE IN THE ROOM':'DIE MENSCHEN IM RAUM','MAKE THE WORK.':'MACHEN DIE ARBEIT.','EVERYDAY TOOLBOX':'UNSERE WERKZEUGE','IDEAS FIRST.':'IDEEN ZUERST.','TOOLS SECOND.':'WERKZEUGE DANACH.','THE USEFUL QUESTIONS.':'DIE WICHTIGEN FRAGEN.','GIVE US THE':'NENNEN SIE UNS DAS','REAL PROBLEM.':'ECHTE PROBLEM.','What are you planning?':'Was planen Sie?','Capabilities':'Kompetenzen','Timeline':'Zeitrahmen','Investment range':'Investitionsrahmen','Name':'Name','Company':'Unternehmen','Email':'E-Mail','Role':'Rolle','Tell us about it':'Erzählen Sie uns davon','PREPARE INQUIRY':'ANFRAGE VORBEREITEN','DIRECT CONTACT':'DIREKTER KONTAKT','DISCOVERY CALL':'ERSTGESPRÄCH','30 minutes.':'30 Minuten.','No pitch deck.':'Keine Präsentation.','REQUEST A CALL':'GESPRÄCH ANFRAGEN','CLIENT PROJECT':'KUNDENPROJEKT','SOLUTION BLUEPRINT':'LÖSUNGSKONZEPT','CAPABILITIES':'KOMPETENZEN','SCOPE':'UMFANG','THE CHALLENGE':'DIE HERAUSFORDERUNG','OUR RESPONSE':'UNSERE LÖSUNG','THE RESULT':'DAS ERGEBNIS','VISIT LIVE WEBSITE':'LIVE-WEBSITE ÖFFNEN','NEXT CASE':'NÄCHSTES PROJEKT','CLOSE':'SCHLIESSEN','BACK TO TOP':'NACH OBEN','This quarter':'Dieses Quartal','Next quarter':'Nächstes Quartal','This year':'Dieses Jahr','Just exploring':'Nur informieren','To be discussed':'Nach Absprache'
  },
  FR: {
    ...fullTranslations.FR,
    'Independent creative studio':'Studio créatif indépendant','Navigate / 2026':'Navigation / 2026','Work':'Projets','Services':'Services','Studio':'Studio','Contact':'Contact','WE MAKE':'NOUS RENDONS','DIGITAL':'LE DIGITAL','FEEL ALIVE.':'VIVANT.','EXPLORE':'DÉCOUVREZ','OUR WORK':'NOS PROJETS','SCROLL TO DISCOVER':'FAITES DÉFILER','SELECTED COLLABORATORS':'COLLABORATEURS SÉLECTIONNÉS','BUILT TO':'CONÇU POUR','BE FELT.':'ÊTRE RESSENTI.','VIEW ALL PROJECTS':'VOIR TOUS LES PROJETS','ONE STUDIO.':'UN STUDIO.','NO SILOS.':'SANS SILOS.','HOW WE WORK':'NOTRE MÉTHODE','FOUR STAGES.':'QUATRE ÉTAPES.','NO THEATRE.':'SANS CINÉMA.','Discover':'Découvrir','Define':'Définir','Build':'Construire','Launch & steward':'Lancer & accompagner','HOW WE THINK':'NOTRE VISION','THE STUDIO':'LE STUDIO','BUILT DIFFERENT':'CONSTRUIT AUTREMENT','SENIOR PEOPLE.':'DES EXPERTS.','ZERO THEATRE.':'SANS CINÉMA.','CORE TEAM':'ÉQUIPE PRINCIPALE','THE PEOPLE IN THE ROOM':'LES PERSONNES PRÉSENTES','MAKE THE WORK.':'FONT LE TRAVAIL.','EVERYDAY TOOLBOX':'NOS OUTILS','IDEAS FIRST.':'LES IDÉES D’ABORD.','TOOLS SECOND.':'LES OUTILS ENSUITE.','THE USEFUL QUESTIONS.':'LES BONNES QUESTIONS.','GIVE US THE':'PARLEZ-NOUS DU','REAL PROBLEM.':'VRAI PROBLÈME.','What are you planning?':'Que prévoyez-vous ?','Capabilities':'Compétences','Timeline':'Calendrier','Investment range':'Budget envisagé','Name':'Nom','Company':'Entreprise','Email':'E-mail','Role':'Fonction','Tell us about it':'Parlez-nous du projet','PREPARE INQUIRY':'PRÉPARER LA DEMANDE','DIRECT CONTACT':'CONTACT DIRECT','DISCOVERY CALL':'APPEL DÉCOUVERTE','30 minutes.':'30 minutes.','No pitch deck.':'Sans présentation.','REQUEST A CALL':'DEMANDER UN APPEL','CLIENT PROJECT':'PROJET CLIENT','SOLUTION BLUEPRINT':'CONCEPT DE SOLUTION','CAPABILITIES':'COMPÉTENCES','SCOPE':'PÉRIMÈTRE','THE CHALLENGE':'LE DÉFI','OUR RESPONSE':'NOTRE RÉPONSE','THE RESULT':'LE RÉSULTAT','VISIT LIVE WEBSITE':'VISITER LE SITE','NEXT CASE':'PROJET SUIVANT','CLOSE':'FERMER','BACK TO TOP':'RETOUR EN HAUT','This quarter':'Ce trimestre','Next quarter':'Trimestre prochain','This year':'Cette année','Just exploring':'Je me renseigne','To be discussed':'À discuter'
  }
};

const originalText = new WeakMap();
const originalAttributes = new WeakMap();

const projects = [
  { id:'01', name:'EDA Solar', type:'RENEWABLE ENERGY / WEB', tone:'acid', mark:'EDA\nSOLAR', image:'/projects/eda-solar.webp', year:'LIVE', impact:'Solar energy, made easier to understand', stack:'UX / UI · Development · Content', scope:'Website · Solutions · Lead journey', url:'https://www.eda-ks.com/', problem:'EDA Solar needed one clear digital home for a broad offer spanning on-grid, off-grid and hybrid solar systems, battery storage and EV charging.', solution:'We designed and developed a structured company website that guides households and businesses from the right energy solution through consultation, planning, installation and activation.', outcome:'A live bilingual platform that brings EDA’s solutions, process and contact path together in one accessible experience.' },
  { id:'02', name:'Novatex', type:'MANUFACTURING / PRODUCT CATALOG', tone:'coral', mark:'NOVA\nTEX', image:'/projects/novatex.webp', year:'LIVE', impact:'Technical products with a clearer commercial story', stack:'UX / UI · Development · Catalog', scope:'Website · Product system · Enquiries', url:'https://www.novatex-ks.com/', problem:'Novatex manufactures fiberglass mesh in numerous weights and grid specifications, so buyers need technical clarity without losing the company story and service offer.', solution:'We designed and developed a focused product website that organizes specifications, custom production, delivery, quality assurance and consulting into a straightforward buyer journey.', outcome:'A live company and product platform that gives European and regional customers a direct route from product comparison to enquiry.' },
  { id:'03', name:'Sahgri SARL', type:'CONSTRUCTION / CORPORATE WEB', tone:'orange', mark:'SAHGRI\nSARL', image:'/projects/sahgri.webp', year:'LIVE', impact:'Craft, consultancy and references in one place', stack:'UX / UI · Development · Content', scope:'Website · Services · Project archive', url:'https://sahgri.ch/', problem:'Sahgri’s work covers plastering, painting, consulting, suspended ceilings and acoustic solutions, backed by substantial Swiss reference projects that needed room to speak.', solution:'We designed and developed a service-led website that separates each expertise, presents reference work and makes quotation and contact information easy to reach.', outcome:'A live business platform connecting Sahgri’s specialist capabilities, completed projects and enquiry flow for clients across French-speaking Switzerland.' },
  { id:'04', name:'ORA-TEK Engineering', type:'PRECISION ENGINEERING / WEB', tone:'blue', mark:'ORA—TEK', image:'/projects/oratek.webp', year:'LIVE', impact:'Precision manufacturing presented with precision', stack:'UX / UI · Development · Multilingual', scope:'Website · Expertise · Machine park', url:'https://ora-tek-engineering.com/', problem:'ORA-TEK combines CNC manufacturing, engineering, industrial project leadership and training—a technical offer that must establish capability and trust quickly.', solution:'We designed and developed a multilingual website around its FANUC machine park, precision-mechanics expertise, quality commitment and direct access to the engineering team.', outcome:'A live four-language platform that presents the company’s capabilities and equipment to both regional and Swiss industrial audiences.' },
  { id:'05', name:'Editor Operations', type:'CUSTOM BACKEND / AUTOMATION', tone:'violet', mark:'EDITOR\nFLOW', year:'LIVE', impact:'One upload. Every system stays in sync.', stack:'Custom backend · APIs · Automation', scope:'Frame.io · Airtable · monday.com · Slack', problem:'A media company’s editors were repeating the same administrative work across four tools after every video upload, creating delays, inconsistent records and missed production updates.', solution:'We built a custom event-driven backend that receives new Frame.io uploads, saves structured video data in Airtable, creates and updates production items in monday.com, and sends the right Slack notifications automatically.', outcome:'Editors can stay focused on the work while a reliable backend moves project data, status and notifications through the production workflow. The client remains confidential, so identifying information is intentionally omitted.' },
  { id:'06', name:'Lead Response Engine', type:'CUSTOM AUTOMATION / BLUEPRINT', tone:'acid', mark:'LEAD\nENGINE', year:'READY', impact:'From new enquiry to qualified opportunity', stack:'Custom backend · CRM · Notifications', scope:'Lead capture · Qualification · Follow-up', demo:true, problem:'Service businesses lose valuable leads when enquiries sit in an inbox, qualification is inconsistent and follow-up depends on someone manually copying information between tools.', solution:'We shaped a custom-code workflow that validates each enquiry, enriches the company record, scores fit against agreed rules, updates the CRM, alerts the right owner and prepares a personalized follow-up task.', outcome:'A reusable automation blueprint that can be adapted to a client’s existing forms, CRM, email and internal tools—without adding another fragile chain of per-task automation subscriptions.' },
];

const services = [
  { n: '01', title: 'Brand systems', text: 'Distinct identities built to move, stretch and remain unmistakable across every digital surface.', tags: ['Strategy', 'Identity', 'Art direction', 'Campaigns'] },
  { n: '02', title: 'Digital experiences', text: 'High-performance websites and products where interaction, narrative and utility work as one system.', tags: ['UX / UI', 'Development', 'WebGL', 'Creative code'] },
  { n: '03', title: 'Motion worlds', text: 'Motion languages that give brands a pulse—from tiny interface gestures to cinematic launch films.', tags: ['Motion systems', '3D', 'Film', 'Prototyping'] },
  { n: '04', title: 'Custom automation', text: 'We replace expensive Zapier, Make and n8n workflows with maintainable custom code. For suitable workloads, this can reduce recurring automation costs by up to 70%.', tags: ['API integrations', 'Custom backends', 'Queues', 'Monitoring'] },
  { n: '05', title: 'Security & pentesting', text: 'Authorized security testing that finds exploitable weaknesses, explains the real business risk and helps your team fix them responsibly.', tags: ['Web pentesting', 'API security', 'Hardening', 'Remediation'] },
  { n: '06', title: 'Web & mobile products', text: 'Websites, internal platforms and mobile apps designed around the exact job your team or customers need to complete.', tags: ['Websites', 'Mobile apps', 'React', 'Platforms'] },
];

const process = [
  { n:'01', title:'Discover', time:'1–2 weeks', text:'We align on the actual problem, users, constraints and success measures before prescribing an interface or stack.' },
  { n:'02', title:'Define', time:'1–3 weeks', text:'Architecture, content, experience direction and a milestone plan become concrete enough to challenge and price.' },
  { n:'03', title:'Build', time:'6–16 weeks', text:'A senior pod designs and ships in weekly increments. You see working software early, not a reveal at the end.' },
  { n:'04', title:'Launch & steward', time:'Ongoing', text:'We prepare analytics, performance, documentation and handover, then stay available for deliberate iteration.' },
];

const team = [
  { initials:'EG', name:'Erin Gashi', role:'Founder · Creative Technology', bio:'Leads product direction, interaction design and the connection between brand systems and working software.', skills:['Product strategy','Creative development','Interaction'] },
  { initials:'EO', name:'Euron Osmani', role:'Engineering Director', bio:'Shapes application architecture, platform reliability and the engineering practices that keep products maintainable.', skills:['Architecture','React / Node','Cloud'] },
  { initials:'LM', name:'Lum Meta', role:'Design Director', bio:'Builds identities and digital systems with a focus on typography, editorial structure and expressive usability.', skills:['Brand systems','UX / UI','Art direction'] },
  { initials:'AS', name:'Art Sahiti', role:'Motion & 3D Director', bio:'Creates motion languages, realtime visuals and prototypes that explain ideas through behaviour rather than decoration.', skills:['Motion systems','3D / WebGL','Prototyping'] },
];

const faqs = [
  ['What kind of projects fit Orbit?', 'New digital products, complex platform redesigns, brand-and-web engagements and focused interactive experiences where design and engineering need to stay connected.'],
  ['Can you work with an existing codebase?', 'Yes. We begin with a short paid audit to understand architecture, quality, risk and whether taking ownership is responsible for both sides.'],
  ['Do you sign NDAs?', 'Yes. We can review your NDA before discovery, or provide a mutual NDA when sensitive product, customer or technical information is involved.'],
  ['Who owns the final work?', 'Once agreed invoices are paid, you own the project-specific deliverables. Reusable internal tooling and third-party software remain governed by their respective terms.'],
  ['Where does the team work?', 'We operate from Central Europe and collaborate remotely. Workshops can be held online or planned on-site when the engagement benefits from it.'],
  ['What happens after launch?', 'We offer structured stabilization and ongoing stewardship. Documentation, monitoring and knowledge transfer are planned deliverables, not afterthoughts.'],
];

const testimonials = [
  { quote: 'The person shaping the direction should stay close enough to the work to remain accountable for every important decision.', name: 'Erin Gashi', role: 'Creative Technology' },
  { quote: 'A memorable interface still has to be a dependable system. Expression and engineering discipline belong in the same room.', name: 'Euron Osmani', role: 'Engineering' },
  { quote: 'Motion earns its place when it explains hierarchy, state or character. If it only delays the user, it is decoration.', name: 'Art Sahiti', role: 'Motion & 3D' },
];

function Arrow({ diagonal = false }) {
  return <span className={diagonal ? 'arrow diagonal' : 'arrow'} aria-hidden="true">→</span>;
}

function App() {
  const [language, setLanguage] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ type:'New digital product', capabilities:[], timeline:'This quarter', budget:'To be discussed', name:'', company:'', email:'', role:'', brief:'' });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900);
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', onKey); };
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
    document.body.style.overflow = menuOpen || selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, selectedProject]);

  const nextTestimonial = (direction) => {
    setTestimonial((testimonial + direction + testimonials.length) % testimonials.length);
  };

  const setField = (key, value) => setFormData(current => ({ ...current, [key]: value }));
  const toggleCapability = (capability) => setFormData(current => ({ ...current, capabilities: current.capabilities.includes(capability) ? current.capabilities.filter(item => item !== capability) : [...current.capabilities, capability] }));
  const requestCall = () => { setField('type', 'Discovery call'); document.querySelector('#inquiry')?.scrollIntoView({ behavior:'smooth' }); };
  const submitInquiry = (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.brief.trim()) { setFormStatus('invalid'); return; }
    const subject = encodeURIComponent(`Project inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nCompany: ${formData.company}\nRole: ${formData.role}\nProject: ${formData.type}\nCapabilities: ${formData.capabilities.join(', ') || 'Not selected'}\nTimeline: ${formData.timeline}\nBudget: ${formData.budget}\n\nBrief:\n${formData.brief}`);
    setFormStatus('ready');
    window.location.href = `mailto:contact@ossolution.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className={`site ${loaded ? 'is-loaded' : ''}`}>
      <div className="loader" aria-hidden="true">
        <div className="loader-mark">OS<span>®</span></div>
        <div className="loader-line"><i /></div>
      </div>

      <header className="header">
        <a className="brand" href="#top" aria-label="Orbit Studio home">
          <span className="brand-orb" />
          <strong>ORBIT®</strong>
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
        <div className="menu-bottom"><span>Budapest / Worldwide</span><span>contact@ossolution.com</span></div>
      </nav>

      <main id="top">
        <section className="hero section-pad">
          <div className="eyebrow hero-eyebrow"><span>( ORBIT CREATIVE STUDIO )</span><span>EST. 2026 / HU</span></div>
          <h1>
            <span className="hero-line">WE MAKE</span>
            <span className="hero-line offset"><i className="hero-disc"><span /></i> DIGITAL</span>
            <span className="hero-line end">FEEL ALIVE.</span>
          </h1>
          <div className="hero-bottom">
            <p>We build expressive identities and digital experiences for ambitious technology brands.</p>
            <a className="round-link" href="#work"><span>EXPLORE<br />OUR WORK</span><Arrow diagonal /></a>
            <span className="scroll-note">SCROLL TO DISCOVER <b>↓</b></span>
          </div>
          <div className="hero-ticker"><div>STRATEGY ✦ DESIGN ✦ MOTION ✦ DEVELOPMENT ✦ STRATEGY ✦ DESIGN ✦ MOTION ✦ DEVELOPMENT ✦</div></div>
        </section>

        <section className="clients section-pad">
          <div className="eyebrow"><span>( TRUSTED BY THE RESTLESS )</span><span>SELECTED COLLABORATORS</span></div>
          <div className="client-grid">
            {['ATLAS', 'NEURAL', 'ARKT', 'MONO', 'NORTH/01', 'KOVA', 'PARALLAX', 'VANTA'].map((client, index) => (
              <span key={client} className={`client client-${index}`}>{client}</span>
            ))}
          </div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div><span className="eyebrow-label">( SELECTED WORK / LIVE PROJECTS + BLUEPRINTS )</span><h2>BUILT TO<br />BE FELT.</h2></div>
            <p>Live client platforms and solution blueprints across energy, manufacturing, construction, precision engineering and custom automation.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${index % 3 === 1 ? 'tall' : ''}`} key={project.name}>
                <div className={`project-visual ${project.tone}`}>
                  {project.image ? <img src={project.image} alt={`${project.name} campaign artwork`} loading="lazy" /> : <div className={`workflow-art ${project.demo ? 'lead-art' : ''}`} aria-hidden="true" />}
                  <div className="visual-grid" />
                  <span className="project-mark">{project.mark.split('\n').map((line) => <span key={line}>{line}</span>)}</span>
                  <span className="project-index">({project.id})</span>
                  <div className="project-orbit"><i /><i /><i /></div>
                </div>
                <div className="project-meta"><h3>{project.name}</h3><span>{project.type}</span><button onClick={() => setSelectedProject(project)} aria-label={`View ${project.name} case study`}><Arrow diagonal /></button></div>
              </article>
            ))}
          </div>
          <a className="big-link" href="#contact"><span>VIEW ALL PROJECTS</span><Arrow diagonal /></a>
        </section>

        <section className="services" id="services">
          <div className="services-intro section-pad">
            <span className="eyebrow-label">( SERVICES / EXPERTISE )</span>
            <div className="services-title"><h2>ONE STUDIO.<br /><em>NO SILOS.</em></h2><p>From the first strategic question to the last line of code, we keep disciplines together so the idea stays intact.</p></div>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service" key={service.n}>
                <span>{service.n}</span><h3>{service.title}</h3><p>{service.text}</p>
                <div className="service-tags">{service.tags.map(tag => <small key={tag}>{tag}</small>)}</div>
                <div className="service-icon"><span /><span /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-pad" id="process">
          <div className="section-heading"><div><span className="eyebrow-label">( HOW WE WORK )</span><h2>FOUR STAGES.<br />NO THEATRE.</h2></div><p>Enough structure to remove uncertainty, with enough flexibility to keep learning while we build.</p></div>
          <div className="process-grid">
            {process.map(item => <article key={item.n}><span>/ {item.n}</span><h3>{item.title}</h3><p>{item.text}</p><time>{item.time}</time></article>)}
          </div>
        </section>

        <section className="manifesto section-pad">
          <div className="manifesto-side"><span>( HOW WE THINK )</span><div className="rotator">ORBIT<br />ORBIT<br />ORBIT</div></div>
          <div className="manifesto-copy">
            <p>Most digital work is designed to be understood.</p>
            <p className="muted">We design it to be remembered.</p>
            <p>Clear thinking, unusual execution and motion with purpose—not decoration.</p>
          </div>
        </section>

        <section className="studio section-pad" id="studio">
          <div className="eyebrow"><span>( THE STUDIO )</span><span>SMALL BY DESIGN / GLOBAL BY DEFAULT</span></div>
          <div className="stats">
            <div><strong>04</strong><span>Named core team members</span></div>
            <div><strong>06</strong><span>Connected disciplines</span></div>
            <div><strong>01</strong><span>Integrated studio model</span></div>
          </div>
          <div className="studio-story">
            <div className="portrait" aria-label="Abstract studio portrait"><div className="portrait-head" /><div className="portrait-body" /><span>ORBIT / FOUNDING TEAM / 2026</span></div>
            <div className="story-copy">
              <span className="eyebrow-label">( BUILT DIFFERENT )</span>
              <h2>SENIOR PEOPLE.<br />ZERO THEATRE.</h2>
              <p>Orbit is an independent design and technology studio assembled around each challenge. The people in the room are the people making the work.</p>
              <p>We partner with founders and teams who believe their digital presence should be as original as their ambition.</p>
              <a href="#contact">More about our approach <Arrow diagonal /></a>
            </div>
          </div>
          <div className="team-head"><span className="eyebrow-label">( CORE TEAM )</span><h2>THE PEOPLE IN THE ROOM<br />MAKE THE WORK.</h2></div>
          <div className="team-grid">
            {team.map(person => <article key={person.name}><div className="team-monogram">{person.initials}</div><span>{person.role}</span><h3>{person.name}</h3><p>{person.bio}</p><div>{person.skills.map(skill => <small key={skill}>{skill}</small>)}</div></article>)}
          </div>
        </section>

        <section className="toolbox">
          <div className="toolbox-title section-pad"><span>( EVERYDAY TOOLBOX )</span><h2>IDEAS FIRST.<br />TOOLS SECOND.</h2></div>
          <div className="tool-row"><div>{['FIGMA', 'THREE.JS', 'GSAP', 'REACT', 'BLENDER', 'WEBGL', 'RIVE', 'TOUCH'].map(x => <span key={x}>{x}<i>✦</i></span>)}</div></div>
        </section>

        <section className="testimonials section-pad">
          <div className="eyebrow"><span>( COLLABORATION PRINCIPLES )</span><span>{String(testimonial + 1).padStart(2, '0')} / 03</span></div>
          <div className="quote-mark">“</div>
          <blockquote>{testimonials[testimonial].quote}</blockquote>
          <div className="quote-footer"><div><strong>{testimonials[testimonial].name}</strong><span>{testimonials[testimonial].role}</span></div><div><button onClick={() => nextTestimonial(-1)}>←</button><button onClick={() => nextTestimonial(1)}>→</button></div></div>
        </section>

        <section className="awards section-pad">
          <div className="section-heading"><div><span className="eyebrow-label">( DELIVERY STANDARDS )</span><h2>WHAT GOOD<br />LOOKS LIKE.</h2></div><p>Benchmarks we design toward on every engagement—specific targets are agreed during discovery.</p></div>
          <div className="award-list">
            {[['ACCESSIBILITY', 'Keyboard, contrast and reduced motion', 'WCAG'], ['PERFORMANCE', 'Measured budgets for critical journeys', 'CWV'], ['DOCUMENTATION', 'Architecture decisions and operating guides', 'ADRs'], ['OWNERSHIP', 'Clear handover and post-launch stewardship', 'OPS']].map(row => <div key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><time>{row[2]}</time><Arrow diagonal /></div>)}
          </div>
        </section>

        <section className="faq section-pad">
          <div className="section-heading"><div><span className="eyebrow-label">( FREQUENTLY ASKED )</span><h2>THE USEFUL<br />QUESTIONS.</h2></div><p>Practical details about fit, ownership, collaboration and what happens when the launch is over.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <article className={faqOpen === index ? 'open' : ''} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index}><span>0{index + 1}</span><strong>{question}</strong><i>+</i></button><div><p>{answer}</p></div></article>)}</div>
        </section>

        <section className="inquiry section-pad" id="inquiry">
          <div className="inquiry-head"><span className="eyebrow-label">( PROJECT BRIEF / V1.0 )</span><h2>GIVE US THE<br /><em>REAL PROBLEM.</em></h2><p>Required: name, valid email and a short brief. Submitting prepares an email in your default mail application; connect your preferred form provider before production.</p></div>
          <form onSubmit={submitInquiry} noValidate>
            <fieldset><legend>01 / What are you planning?</legend><div className="choice-row">{['New digital product','Replatform / redesign','Brand + website','Interactive campaign','Audit & direction'].map(value => <button type="button" className={formData.type === value ? 'active' : ''} onClick={() => setField('type', value)} key={value}>{value}</button>)}</div></fieldset>
            <fieldset><legend>02 / Capabilities</legend><div className="choice-row">{['Strategy','Brand','UX / UI','Engineering','AI systems','Motion / 3D'].map(value => <button type="button" className={formData.capabilities.includes(value) ? 'active' : ''} onClick={() => toggleCapability(value)} key={value}>{value}</button>)}</div></fieldset>
            <div className="select-row"><label>03 / Timeline<select value={formData.timeline} onChange={e => setField('timeline', e.target.value)}><option>This quarter</option><option>Next quarter</option><option>This year</option><option>Just exploring</option></select></label><label>04 / Investment range<select value={formData.budget} onChange={e => setField('budget', e.target.value)}><option>To be discussed</option><option>€15k–€35k</option><option>€35k–€75k</option><option>€75k+</option><option>NDA before numbers</option></select></label></div>
            <div className="input-grid"><label>Name *<input value={formData.name} onChange={e => setField('name', e.target.value)} placeholder="Your name" /></label><label>Company<input value={formData.company} onChange={e => setField('company', e.target.value)} placeholder="Company or product" /></label><label>Email *<input type="email" value={formData.email} onChange={e => setField('email', e.target.value)} placeholder="you@company.com" /></label><label>Role<input value={formData.role} onChange={e => setField('role', e.target.value)} placeholder="Your role" /></label></div>
            <label className="brief-label">Tell us about it *<textarea value={formData.brief} onChange={e => setField('brief', e.target.value)} placeholder="What are you building, where is it stuck, and what should be true after we work together?" /></label>
            <div className="form-foot"><div><span>RESPONSE / WITHIN TWO BUSINESS DAYS</span><span>NDA-FRIENDLY / YES</span><span>WORKING REGION / WORLDWIDE</span></div><button type="submit">PREPARE INQUIRY <Arrow diagonal /></button></div>
            {formStatus === 'invalid' && <p className="form-message error" role="alert">Please add your name, a valid email address and a short project brief.</p>}
            {formStatus === 'ready' && <p className="form-message" role="status">Your email application should now be open with the project brief prepared.</p>}
          </form>
          <aside className="direct-contact"><div><span>( DIRECT CONTACT )</span><a href="mailto:contact@ossolution.com">contact@ossolution.com</a><p>For an NDA, RFP or a quick fit check, contact our studio directly.</p></div><div><span>( DISCOVERY CALL )</span><h3>30 minutes.<br />No pitch deck.</h3><p>Request a focused call about the product, constraint and next useful decision.</p><button onClick={requestCall}>REQUEST A CALL <Arrow diagonal /></button></div></aside>
        </section>

        <section className="contact" id="contact">
          <div className="contact-top section-pad"><span>( ENOUGH TALK )</span><a href="mailto:contact@ossolution.com">contact@ossolution.com</a></div>
          <a className="contact-cta" href="mailto:contact@ossolution.com"><span>LET'S MAKE</span><span>SOMETHING <i>MOVE.</i></span><b><Arrow diagonal /></b></a>
          <footer className="footer section-pad">
            <div className="footer-brand"><span className="brand-orb" /><strong>ORBIT®</strong></div>
            <div><span>BUDAPEST, HU</span><span>AVAILABLE WORLDWIDE</span></div>
            <div><a href="#top">INSTAGRAM</a><a href="#top">LINKEDIN</a><a href="#top">BEHANCE</a></div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button>
            <small>© 2026 ORBIT CREATIVE STUDIO</small>
          </footer>
        </section>
      </main>
      {selectedProject && <div className="case-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.name} case study`}>
        <button className="case-close" onClick={() => setSelectedProject(null)}>CLOSE ×</button>
        <div className={`case-hero ${selectedProject.tone} ${selectedProject.image ? '' : 'workflow-case'} ${selectedProject.demo ? 'lead-case' : ''}`} style={selectedProject.image ? { backgroundImage:`linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.55)), url(${selectedProject.image})` } : undefined}><span>{selectedProject.demo ? 'SOLUTION BLUEPRINT' : 'CLIENT PROJECT'} / {selectedProject.id} · {selectedProject.year}</span><h2>{selectedProject.name}</h2><strong>{selectedProject.impact}</strong></div>
        <div className="case-body"><div className="case-meta"><span>CAPABILITIES</span><b>{selectedProject.stack}</b><span>SCOPE</span><b>{selectedProject.scope}</b></div><section><span>01 / THE CHALLENGE</span><p>{selectedProject.problem}</p></section><section><span>02 / OUR RESPONSE</span><p>{selectedProject.solution}</p></section><section><span>03 / THE RESULT</span><p>{selectedProject.outcome}</p></section><div className="case-actions">{selectedProject.name === 'EDA Solar' && <a className="case-live" href={selectedProject.url} target="_blank" rel="noreferrer">VISIT LIVE WEBSITE <Arrow diagonal /></a>}<button onClick={() => { const index = projects.indexOf(selectedProject); setSelectedProject(projects[(index + 1) % projects.length]); }}>NEXT CASE <Arrow /></button></div></div>
      </div>}
    </div>
  );
}

export default App;
