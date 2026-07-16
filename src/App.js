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
    'Independent creative studio':'Unabhängiges Kreativstudio','Navigate / 2026':'Navigation / 2026','Work':'Projekte','Services':'Leistungen','Studio':'Studio','Contact':'Kontakt','WE MAKE':'WIR MACHEN','DIGITAL':'DIGITALES','FEEL ALIVE.':'SPÜRBAR.','EXPLORE':'PROJEKTE','OUR WORK':'ENTDECKEN','SCROLL TO DISCOVER':'WEITER SCROLLEN','BUILT TO':'GEMACHT, UM','BE FELT.':'ZU WIRKEN.','VIEW ALL PROJECTS':'ALLE PROJEKTE','ONE STUDIO.':'EIN STUDIO.','NO SILOS.':'KEINE SILOS.','HOW WE WORK':'WIE WIR ARBEITEN','FOUR STAGES.':'VIER PHASEN.','NO THEATRE.':'KEIN THEATER.','Discover':'Entdecken','Define':'Definieren','Build':'Umsetzen','Launch & steward':'Start & Betreuung','THE STUDIO':'DAS STUDIO','SENIOR PEOPLE.':'ERFAHRENE MENSCHEN.','ZERO THEATRE.':'NULL THEATER.','CORE TEAM':'KERNTEAM','THE USEFUL QUESTIONS.':'DIE WICHTIGEN FRAGEN.','GIVE US THE':'NENNEN SIE UNS DAS','REAL PROBLEM.':'ECHTE PROBLEM.','What are you planning?':'Was planen Sie?','Name':'Name','Email':'E-Mail','Tell us about it':'Erzählen Sie uns davon','PREPARE INQUIRY':'ANFRAGE VORBEREITEN','DIRECT CONTACT':'DIREKTER KONTAKT','DISCOVERY CALL':'ERSTGESPRÄCH','30 minutes.':'30 Minuten.','No pitch deck.':'Keine Präsentation.','REQUEST A CALL':'GESPRÄCH ANFRAGEN','CLIENT PROJECT':'KUNDENPROJEKT','SOLUTION BLUEPRINT':'LÖSUNGSKONZEPT','CAPABILITIES':'KOMPETENZEN','SCOPE':'UMFANG','THE CHALLENGE':'DIE HERAUSFORDERUNG','OUR RESPONSE':'UNSERE LÖSUNG','THE RESULT':'DAS ERGEBNIS','VISIT LIVE WEBSITE':'LIVE-WEBSITE ÖFFNEN','NEXT CASE':'NÄCHSTES PROJEKT','CLOSE':'SCHLIESSEN','BACK TO TOP':'NACH OBEN'
  },
  FR: {
    ...fullTranslations.FR,
    'Independent creative studio':'Studio créatif indépendant','Navigate / 2026':'Navigation / 2026','Work':'Projets','Services':'Services','Studio':'Studio','Contact':'Contact','WE MAKE':'NOUS RENDONS','DIGITAL':'LE DIGITAL','FEEL ALIVE.':'VIVANT.','EXPLORE':'DÉCOUVREZ','OUR WORK':'NOS PROJETS','SCROLL TO DISCOVER':'FAITES DÉFILER','BUILT TO':'CONÇU POUR','BE FELT.':'ÊTRE RESSENTI.','VIEW ALL PROJECTS':'VOIR TOUS LES PROJETS','ONE STUDIO.':'UN STUDIO.','NO SILOS.':'SANS SILOS.','HOW WE WORK':'NOTRE MÉTHODE','FOUR STAGES.':'QUATRE ÉTAPES.','NO THEATRE.':'SANS CINÉMA.','Discover':'Découvrir','Define':'Définir','Build':'Construire','Launch & steward':'Lancer & accompagner','THE STUDIO':'LE STUDIO','SENIOR PEOPLE.':'DES EXPERTS.','ZERO THEATRE.':'SANS CINÉMA.','CORE TEAM':'ÉQUIPE PRINCIPALE','THE USEFUL QUESTIONS.':'LES BONNES QUESTIONS.','GIVE US THE':'PARLEZ-NOUS DU','REAL PROBLEM.':'VRAI PROBLÈME.','What are you planning?':'Que prévoyez-vous ?','Name':'Nom','Email':'E-mail','Tell us about it':'Parlez-nous du projet','PREPARE INQUIRY':'PRÉPARER LA DEMANDE','DIRECT CONTACT':'CONTACT DIRECT','DISCOVERY CALL':'APPEL DÉCOUVERTE','30 minutes.':'30 minutes.','No pitch deck.':'Sans présentation.','REQUEST A CALL':'DEMANDER UN APPEL','CLIENT PROJECT':'PROJET CLIENT','SOLUTION BLUEPRINT':'CONCEPT DE SOLUTION','CAPABILITIES':'COMPÉTENCES','SCOPE':'PÉRIMÈTRE','THE CHALLENGE':'LE DÉFI','OUR RESPONSE':'NOTRE RÉPONSE','THE RESULT':'LE RÉSULTAT','VISIT LIVE WEBSITE':'VISITER LE SITE','NEXT CASE':'PROJET SUIVANT','CLOSE':'FERMER','BACK TO TOP':'RETOUR EN HAUT'
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
  { initials:'EG', name:'Erin Gashi', role:'Founder · Creative Technology', bio:'Leads product direction, interaction design and the connection between brand systems and working software.', skills:['Product strategy','Creative development','Interaction'] },
  { initials:'EO', name:'Euron Osmani', role:'Engineering Director', bio:'Shapes application architecture, platform reliability and the engineering practices that keep products maintainable.', skills:['Architecture','React / Node','Cloud'] },
  { initials:'LM', name:'Lum Meta', role:'Design Director', bio:'Builds identities and digital systems with a focus on typography, editorial structure and expressive usability.', skills:['Brand systems','UX / UI','Art direction'] },
  { initials:'AS', name:'Art Sahiti', role:'Motion & 3D Director', bio:'Creates motion languages, realtime visuals and prototypes that explain ideas through behaviour rather than decoration.', skills:['Motion systems','3D / WebGL','Prototyping'] },
];

const faqs = [
  ['What kind of projects fit Ossolut?', 'New digital products, complex platform redesigns, brand-and-web engagements and focused interactive experiences where design and engineering need to stay connected.'],
  ['Can you work with an existing codebase?', 'Yes. We begin with a short paid audit to understand architecture, quality, risk and whether taking ownership is responsible for both sides.'],
  ['Do you sign NDAs?', 'Yes. We can review your NDA before discovery, or provide a mutual NDA when sensitive product, customer or technical information is involved.'],
  ['Who owns the final work?', 'Once agreed invoices are paid, you own the project-specific deliverables. Reusable internal tooling and third-party software remain governed by their respective terms.'],
  ['Where does the team work?', 'We operate from Central Europe and collaborate remotely. Workshops can be held online or planned on-site when the engagement benefits from it.'],
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

function App() {
  const [language, setLanguage] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ type:'New digital product', name:'', email:'', brief:'' });

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
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
    document.body.style.overflow = menuOpen || selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, selectedProject]);

  // Reveal-on-scroll: elements fade/rise in as they enter the viewport.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll(
      '.section-heading, .project-card, .service, .process-grid article, .manifesto p, .team-grid article, .faq-list article, .inquiry-head, .direct-contact > div'
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
  const requestCall = () => { setField('type', 'Discovery call'); document.querySelector('#inquiry')?.scrollIntoView({ behavior:'smooth' }); };
  const submitInquiry = (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.brief.trim()) { setFormStatus('invalid'); return; }
    const subject = encodeURIComponent(`Project inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nProject: ${formData.type}\n\nBrief:\n${formData.brief}`);
    setFormStatus('ready');
    window.location.href = `mailto:contact@ossolut.com?subject=${subject}&body=${body}`;
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
        <div className="menu-bottom"><span>Budapest / Worldwide</span><span>contact@ossolut.com</span></div>
      </nav>

      <main id="top">
        <section className="hero section-pad">
          <ParticleField />
          <div className="eyebrow hero-eyebrow"><span>( OSSOLUT STUDIO )</span><span>EST. 2026 / HU</span></div>
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
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className={`project-visual ${project.tone}`}>
                  <img src={project.image} alt={`${project.name} website preview`} loading="lazy" />
                  <div className="visual-grid" />
                  <span className="project-mark">{project.mark.split('\n').map((line) => <span key={line}>{line}</span>)}</span>
                  <span className="project-index">({project.id})</span>
                </div>
                <div className="project-meta"><h3>{project.name}</h3><span>{project.type}</span><button onClick={() => setSelectedProject(project)} aria-label={`View ${project.name} case study`}><Arrow diagonal /></button></div>
              </article>
            ))}
          </div>
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

        <section className="manifesto section-pad">
          <p>Most digital work is designed to be understood.</p>
          <p className="muted">We design it to be remembered.</p>
        </section>

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
          <div className="inquiry-head"><span className="eyebrow-label">( PROJECT BRIEF )</span><h2>GIVE US THE<br /><em>REAL PROBLEM.</em></h2><p>Name, a valid email and a short brief. Submitting prepares an email in your default mail application.</p></div>
          <form onSubmit={submitInquiry} noValidate>
            <fieldset><legend>01 / What are you planning?</legend><div className="choice-row">{['New digital product','Replatform / redesign','Brand + website','Automation','Audit & direction'].map(value => <button type="button" className={formData.type === value ? 'active' : ''} onClick={() => setField('type', value)} key={value}>{value}</button>)}</div></fieldset>
            <div className="input-grid"><label>Name *<input value={formData.name} onChange={e => setField('name', e.target.value)} placeholder="Your name" /></label><label>Email *<input type="email" value={formData.email} onChange={e => setField('email', e.target.value)} placeholder="you@company.com" /></label></div>
            <label className="brief-label">Tell us about it *<textarea value={formData.brief} onChange={e => setField('brief', e.target.value)} placeholder="What are you building, where is it stuck, and what should be true after we work together?" /></label>
            <div className="form-foot"><span>RESPONSE / WITHIN TWO BUSINESS DAYS</span><button type="submit">PREPARE INQUIRY <Arrow diagonal /></button></div>
            {formStatus === 'invalid' && <p className="form-message error" role="alert">Please add your name, a valid email address and a short project brief.</p>}
            {formStatus === 'ready' && <p className="form-message" role="status">Your email application should now be open with the project brief prepared.</p>}
          </form>
          <aside className="direct-contact">
            <div><span>( DIRECT CONTACT )</span><a href="mailto:contact@ossolut.com">contact@ossolut.com</a><p>For an NDA, RFP or a quick fit check, contact our studio directly.</p></div>
            <div><span>( DISCOVERY CALL )</span><h3>30 minutes.<br />No pitch deck.</h3><button onClick={requestCall}>REQUEST A CALL <Arrow diagonal /></button></div>
          </aside>
        </section>

        <section className="contact" id="contact">
          <a className="contact-cta" href="mailto:contact@ossolut.com"><span>LET'S MAKE</span><span>SOMETHING <i>MOVE.</i></span><b><Arrow diagonal /></b></a>
          <footer className="footer section-pad">
            <div className="footer-brand"><img className="brand-logo" src={logoMark} alt="" /><strong>OSSOLUT</strong></div>
            <div><span>BUDAPEST, HU</span><span>AVAILABLE WORLDWIDE</span></div>
            <div><a href="mailto:contact@ossolut.com">CONTACT@OSSOLUT.COM</a><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></div>
            <small>© 2026 OSSOLUT</small>
          </footer>
        </section>
      </main>
      {selectedProject && <div className="case-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.name} case study`}>
        <button className="case-close" onClick={() => setSelectedProject(null)}>CLOSE ×</button>
        <div className={`case-hero ${selectedProject.tone}`} style={{ backgroundImage:`linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.55)), url(${selectedProject.image})` }}><span>CLIENT PROJECT / {selectedProject.id} · {selectedProject.year}</span><h2>{selectedProject.name}</h2><strong>{selectedProject.impact}</strong></div>
        <div className="case-body"><div className="case-meta"><span>CAPABILITIES</span><b>{selectedProject.stack}</b><span>SCOPE</span><b>{selectedProject.scope}</b></div><section><span>01 / THE CHALLENGE</span><p>{selectedProject.problem}</p></section><section><span>02 / OUR RESPONSE</span><p>{selectedProject.solution}</p></section><section><span>03 / THE RESULT</span><p>{selectedProject.outcome}</p></section><div className="case-actions">{selectedProject.url && <a className="case-live" href={selectedProject.url} target="_blank" rel="noreferrer">VISIT LIVE WEBSITE <Arrow diagonal /></a>}<button onClick={() => { const index = projects.indexOf(selectedProject); setSelectedProject(projects[(index + 1) % projects.length]); }}>NEXT CASE <Arrow /></button></div></div>
      </div>}
    </div>
  );
}

export default App;
