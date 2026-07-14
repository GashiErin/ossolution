import { useEffect, useState } from 'react';
import './App.css';

const projects = [
  { id:'01', name:'Synapse', type:'AI PRODUCT', tone:'violet', mark:'SYN//APSE', year:'2026', impact:'63% faster review cycles', stack:'React · FastAPI · PostgreSQL · AI', scope:'Strategy · Product · Engineering', problem:'Research teams were losing decisions across meetings, documents and disconnected AI tools.', solution:'A secure knowledge workspace that turns source material into cited decisions, searchable briefs and repeatable review workflows.', outcome:'The concept demonstrates how a complex AI workflow can remain transparent, navigable and useful to non-technical teams.' },
  { id:'02', name:'Noma Objects', type:'IDENTITY / COMMERCE', tone:'coral', mark:'NOMA', year:'2026', impact:'Three markets, one storefront', stack:'React · Commerce API · Motion', scope:'Identity · UX · Development', problem:'A design label needed one system for product stories, limited drops and international retail partners.', solution:'We connected a modular identity to a narrative commerce experience with editorial product pages and flexible campaign blocks.', outcome:'A coherent prototype that can scale from a five-product collection to a multi-market catalogue.' },
  { id:'03', name:'Northstar', type:'PLATFORM / EXPERIENCE', tone:'acid', mark:'NORTH\nSTAR', year:'2025', impact:'One operational source of truth', stack:'TypeScript · Node · Postgres', scope:'Architecture · UX · Platform', problem:'Distributed operations teams were coordinating launches through spreadsheets and status meetings.', solution:'A role-aware command centre combining milestones, risk signals, approvals and accountable decision logs.', outcome:'The product model reduces reporting overhead and makes project risk visible before deadlines move.' },
  { id:'04', name:'Field Notes', type:'EDITORIAL / MOTION', tone:'blue', mark:'FIELD®', year:'2025', impact:'12 formats, one publishing system', stack:'React · Headless CMS · GSAP', scope:'Editorial · Motion · Web', problem:'A research publisher needed long-form stories to feel distinct without redesigning every article.', solution:'A composable editorial system with kinetic type, responsive media treatments and reusable narrative transitions.', outcome:'Editors can create expressive releases while preserving accessibility, performance and brand consistency.' },
  { id:'05', name:'Formless', type:'WEBGL / CAMPAIGN', tone:'mono', mark:'F—LESS', year:'2025', impact:'Interactive at every breakpoint', stack:'WebGL · Three.js · React', scope:'Creative code · 3D · Campaign', problem:'A technical materials company needed to explain invisible physical behaviour without another product film.', solution:'An interactive WebGL story translates pressure, flow and deformation into a responsive product narrative.', outcome:'A memorable launch concept where the interaction itself demonstrates the core technology.' },
  { id:'06', name:'Afterdark', type:'CULTURE / IMMERSIVE', tone:'orange', mark:'A/D', year:'2024', impact:'A living archive for 80 events', stack:'React · Web Audio · CMS', scope:'Brand · Platform · Experience', problem:'A cultural programme had years of performances but no meaningful way to explore its archive.', solution:'A sound-led archive connecting artists, venues and fragments through an exploratory visual index.', outcome:'Past programming becomes a useful discovery tool instead of a chronological list.' },
  { id:'07', name:'Relay', type:'LOGISTICS / MOBILE', tone:'acid', mark:'RELAY', year:'2024', impact:'Offline-first field workflow', stack:'React Native · Node · SQLite', scope:'Mobile · Backend · Operations', problem:'Field teams needed reliable task capture in locations where connectivity could not be assumed.', solution:'An offline-first mobile workflow with queued evidence uploads, route context and conflict-safe synchronization.', outcome:'The prototype preserves every field action and makes recovery understandable when a connection returns.' },
  { id:'08', name:'Common Ground', type:'CLIMATE / DATA', tone:'violet', mark:'COMMON\nGROUND', year:'2024', impact:'14 data sources unified', stack:'React · Python · Mapbox', scope:'Data · UX · Visualization', problem:'Regional climate data was technically available but fragmented across institutions and formats.', solution:'A shared spatial interface normalizes datasets and turns them into comparable local scenarios.', outcome:'Planners can explore evidence without needing to understand the structure of every source dataset.' },
];

const services = [
  { n: '01', title: 'Brand systems', text: 'Distinct identities built to move, stretch and remain unmistakable across every digital surface.', tags: ['Strategy', 'Identity', 'Art direction', 'Campaigns'] },
  { n: '02', title: 'Digital experiences', text: 'High-performance websites and products where interaction, narrative and utility work as one system.', tags: ['UX / UI', 'Development', 'WebGL', 'Creative code'] },
  { n: '03', title: 'Motion worlds', text: 'Motion languages that give brands a pulse—from tiny interface gestures to cinematic launch films.', tags: ['Motion systems', '3D', 'Film', 'Prototyping'] },
  { n: '04', title: 'Product engineering', text: 'Robust web platforms and internal tools shaped around real workflows, clear architecture and maintainable systems.', tags: ['React', 'APIs', 'Data', 'Platforms'] },
  { n: '05', title: 'AI systems', text: 'Useful intelligence embedded into products with transparent workflows, evaluation and human control.', tags: ['LLM integration', 'Search', 'Automation', 'Evaluation'] },
  { n: '06', title: 'Cloud & launch', text: 'The infrastructure, observability and release discipline required to move from prototype to dependable production.', tags: ['Cloud', 'CI/CD', 'Performance', 'Stewardship'] },
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
    window.location.href = `mailto:hello@orbit.studio?subject=${subject}&body=${body}`;
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
        <div className="menu-bottom"><span>Budapest / Worldwide</span><span>hello@orbit.studio</span></div>
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
            <div><span className="eyebrow-label">( CONCEPT CASE STUDIES )</span><h2>BUILT TO<br />BE FELT.</h2></div>
            <p>Original demonstration projects showing how we frame product, identity and technology challenges. Replace them with verified client work before launch.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${index % 3 === 1 ? 'tall' : ''}`} key={project.name}>
                <div className={`project-visual ${project.tone}`}>
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
          <aside className="direct-contact"><div><span>( DIRECT CONTACT )</span><a href="mailto:hello@orbit.studio">hello@orbit.studio</a><p>For an NDA, RFP or a quick fit check. Replace this prototype address with your verified studio inbox before launch.</p></div><div><span>( DISCOVERY CALL )</span><h3>30 minutes.<br />No pitch deck.</h3><p>Request a focused call about the product, constraint and next useful decision.</p><button onClick={requestCall}>REQUEST A CALL <Arrow diagonal /></button></div></aside>
        </section>

        <section className="contact" id="contact">
          <div className="contact-top section-pad"><span>( ENOUGH TALK )</span><a href="mailto:hello@orbit.studio">hello@orbit.studio</a></div>
          <a className="contact-cta" href="mailto:hello@orbit.studio"><span>LET'S MAKE</span><span>SOMETHING <i>MOVE.</i></span><b><Arrow diagonal /></b></a>
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
        <div className={`case-hero ${selectedProject.tone}`}><span>CASE / {selectedProject.id} · {selectedProject.year}</span><h2>{selectedProject.name}</h2><strong>{selectedProject.impact}</strong></div>
        <div className="case-body"><div className="case-meta"><span>STACK</span><b>{selectedProject.stack}</b><span>SCOPE</span><b>{selectedProject.scope}</b></div><section><span>01 / THE PROBLEM</span><p>{selectedProject.problem}</p></section><section><span>02 / THE RESPONSE</span><p>{selectedProject.solution}</p></section><section><span>03 / THE OUTCOME</span><p>{selectedProject.outcome}</p></section><button onClick={() => { const index = projects.indexOf(selectedProject); setSelectedProject(projects[(index + 1) % projects.length]); }}>NEXT CASE <Arrow /></button></div>
      </div>}
    </div>
  );
}

export default App;
