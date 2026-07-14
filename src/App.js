import { useEffect, useState } from 'react';
import './App.css';

const projects = [
  { id: '01', name: 'Synapse', type: 'AI PRODUCT / DIGITAL', tone: 'violet', mark: 'SYN//APSE' },
  { id: '02', name: 'Noma Objects', type: 'IDENTITY / COMMERCE', tone: 'coral', mark: 'NOMA' },
  { id: '03', name: 'Northstar', type: 'PLATFORM / EXPERIENCE', tone: 'acid', mark: 'NORTH\nSTAR' },
  { id: '04', name: 'Field Notes', type: 'EDITORIAL / MOTION', tone: 'blue', mark: 'FIELD®' },
  { id: '05', name: 'Formless', type: 'WEBGL / CAMPAIGN', tone: 'mono', mark: 'F—LESS' },
  { id: '06', name: 'Afterdark', type: 'CULTURE / IMMERSIVE', tone: 'orange', mark: 'A/D' },
];

const services = [
  { n: '01', title: 'Brand systems', text: 'Distinct identities built to move, stretch and remain unmistakable across every digital surface.', tags: ['Strategy', 'Identity', 'Art direction', 'Campaigns'] },
  { n: '02', title: 'Digital experiences', text: 'High-performance websites and products where interaction, narrative and utility work as one system.', tags: ['UX / UI', 'Development', 'WebGL', 'Creative code'] },
  { n: '03', title: 'Motion worlds', text: 'Motion languages that give brands a pulse—from tiny interface gestures to cinematic launch films.', tags: ['Motion systems', '3D', 'Film', 'Prototyping'] },
];

const testimonials = [
  { quote: 'They found the idea hiding inside the brief, then made it feel inevitable. The result has completely changed how people see us.', name: 'Mara Lin', role: 'Founder, Northstar' },
  { quote: 'A rare mix of strategic clarity and creative nerve. Every interaction has intent, and every detail earns its place.', name: 'Alex Kova', role: 'Product Director, Synapse' },
  { quote: 'They work like an embedded creative team: fast, honest and relentlessly focused on making the strongest thing possible.', name: 'Jules Moreau', role: 'Co-founder, Noma' },
];

function Arrow({ diagonal = false }) {
  return <span className={diagonal ? 'arrow diagonal' : 'arrow'} aria-hidden="true">→</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [testimonial, setTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900);
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const nextTestimonial = (direction) => {
    setTestimonial((testimonial + direction + testimonials.length) % testimonials.length);
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
            <div><span className="eyebrow-label">( SELECTED WORK )</span><h2>BUILT TO<br />BE FELT.</h2></div>
            <p>A selection of identities, products and digital worlds designed to move brands forward.</p>
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
                <div className="project-meta"><h3>{project.name}</h3><span>{project.type}</span><button aria-label={`View ${project.name}`}><Arrow diagonal /></button></div>
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
            <div><strong>08</strong><span>Core specialists</span></div>
            <div><strong>14</strong><span>Countries reached</span></div>
            <div><strong>42</strong><span>Launches & counting</span></div>
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
        </section>

        <section className="toolbox">
          <div className="toolbox-title section-pad"><span>( EVERYDAY TOOLBOX )</span><h2>IDEAS FIRST.<br />TOOLS SECOND.</h2></div>
          <div className="tool-row"><div>{['FIGMA', 'THREE.JS', 'GSAP', 'REACT', 'BLENDER', 'WEBGL', 'RIVE', 'TOUCH'].map(x => <span key={x}>{x}<i>✦</i></span>)}</div></div>
        </section>

        <section className="testimonials section-pad">
          <div className="eyebrow"><span>( CLIENT NOTES )</span><span>{String(testimonial + 1).padStart(2, '0')} / 03</span></div>
          <div className="quote-mark">“</div>
          <blockquote>{testimonials[testimonial].quote}</blockquote>
          <div className="quote-footer"><div><strong>{testimonials[testimonial].name}</strong><span>{testimonials[testimonial].role}</span></div><div><button onClick={() => nextTestimonial(-1)}>←</button><button onClick={() => nextTestimonial(1)}>→</button></div></div>
        </section>

        <section className="awards section-pad">
          <div className="section-heading"><div><span className="eyebrow-label">( SIGNALS / RECOGNITION )</span><h2>NICE WHEN<br />THEY NOTICE.</h2></div><p>The work matters more than the trophy. Still, we keep the shiny objects.</p></div>
          <div className="award-list">
            {[['AWWWARDS', 'Honorable Mention', '2026'], ['CSS DESIGN AWARDS', 'Special Kudos', '2026'], ['THE FWA', 'FWA of the Day', '2025'], ['ORPETRON', 'Site of the Day', '2025']].map(row => <div key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><time>{row[2]}</time><Arrow diagonal /></div>)}
          </div>
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
    </div>
  );
}

export default App;
