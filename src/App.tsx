import { useEffect, useState } from "react";

const external = {
  github: "https://github.com/midhun9901",
  linkedin: "https://www.linkedin.com/in/midhun-somanunnithan/",
  email: "mailto:midhunnrd812@gmail.com",
  cv: "./Midhun_Somanunnithan_CV.pdf",
};

const navigation = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected work" },
  { id: "contact", label: "Contact" },
];

const experience = [
  {
    date: "Feb 2026 — Present",
    title: "Deep Learning Research Assistant — Computer Vision",
    company: "FAU Erlangen-Nürnberg",
    copy: "Designing and evaluating reproducible image-retrieval experiments across CNN and Vision Transformer backbones, metric-learning objectives, segmentation, and pose features.",
    tools: ["PyTorch", "DINOv2", "FAISS", "SLURM", "A100"],
  },
  {
    date: "2026 — Present",
    title: "Research Assistant — Automation & Mechatronics",
    company: "FAU Institute of Manufacturing Technology",
    copy: "Developing automated spray workflows with multi-axis motion and pneumatic control, then validating repeatability through parameter studies on physical equipment.",
    tools: ["GRBL", "OpenCV", "Automation", "Validation"],
  },
  {
    date: "Oct — Dec 2023",
    title: "Data Science & Machine Learning Intern",
    company: "Entri Elevate",
    copy: "Prepared tabular data, engineered features, and evaluated machine-learning models with cross-validation.",
    tools: ["Python", "Pandas", "NumPy", "scikit-learn"],
  },
];

const projects = [
  {
    number: "01",
    title: "Fine-grained vase retrieval",
    label: "Computer vision research",
    problem: "Match different historical depictions of the same vase despite viewpoint changes, crops, occlusion, and near-identical objects.",
    contribution: "Built seven controlled retrieval families on one folder-level split, comparing CNN and ViT features with metric-learning objectives, segmentation, and pose cues.",
    proof: "83.39% mAP · 80.77% Acc@1 · 100% Acc@10",
    tags: ["PyTorch", "DINOv2", "Metric Learning", "FAISS"],
    href: "https://github.com/midhun9901/vase-urn-project",
    visual: "https://raw.githubusercontent.com/midhun9901/vase-urn-project/v5-dinov2-retrieval/results.svg",
    visualAlt: "Chart comparing held-out retrieval results across six vase retrieval methods",
    featured: true,
  },
  {
    number: "02",
    title: "Automated spray intelligence",
    label: "Automation · Vision · Optimization",
    problem: "Turn a physical spray process into a repeatable system whose motion, pneumatic timing, and coating quality can be measured and improved.",
    contribution: "Developed programmable multi-axis trajectories and pneumatic control, then connected OpenCV measurement, learned quality models, and Bayesian parameter optimization.",
    proof: "Programmable motion · vision-based measurement · parameter search",
    tags: ["GRBL", "OpenCV", "PyTorch", "Bayesian Optimization"],
  },
  {
    number: "03",
    title: "Deep learning from scratch",
    label: "Independent study",
    problem: "Understand the mechanisms beneath high-level frameworks by implementing and measuring them directly.",
    contribution: "Built a scalar autograd engine, a bigram model, an embedding MLP, and a stable six-layer BatchNorm network with explicit activation and gradient diagnostics.",
    proof: "47,024 parameters · validation loss 2.09",
    tags: ["Autograd", "Language Models", "BatchNorm", "PyTorch"],
    href: "https://github.com/midhun9901/deep-learning-from-scratch",
    visual: "https://raw.githubusercontent.com/midhun9901/deep-learning-from-scratch/main/01-micrograd/assets/computation_graph.png",
    visualAlt: "Computation graph produced by the project's scalar automatic differentiation engine",
  },
  {
    number: "04",
    title: "JARVIS",
    label: "Local agent system",
    problem: "Coordinate voice, model responses, local tools, connected services, and persistent context without hiding sensitive actions.",
    contribution: "Built a React/FastAPI voice application with WebSocket state, provider fallbacks, an inspectable tool protocol, local memory, and confirmation gates.",
    proof: "Voice request → verified tool action → visible result",
    tags: ["FastAPI", "React", "WebSockets", "OAuth2"],
    href: "https://github.com/midhun9901/jarvis",
    visual: "https://raw.githubusercontent.com/midhun9901/jarvis/main/docs/system-architecture.svg",
    visualAlt: "Architecture diagram showing how JARVIS routes a voice request through verified tool execution",
  },
];

function LaunchSequence() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.add("is-loading");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitTimer = window.setTimeout(() => setLeaving(true), reducedMotion ? 180 : 1150);
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.classList.remove("is-loading");
    }, reducedMotion ? 320 : 1750);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`launch-sequence${leaving ? " is-leaving" : ""}`} role="status" aria-live="polite">
      <div className="launch-sequence__copy">
        <span>Portfolio / 2026</span>
        <p>Hold on<span aria-hidden="true" className="loading-dots">...</span></p>
      </div>
      <div className="launch-sequence__track" aria-hidden="true"><i /></div>
    </div>
  );
}

function SprayTrajectoryVisual() {
  return (
    <svg className="spray-trajectory" viewBox="0 0 720 430" role="img" aria-labelledby="spray-title spray-desc">
      <title id="spray-title">Automated spray workflow schematic</title>
      <desc id="spray-desc">A programmed multi-axis spray path connects motion control to image measurement and parameter optimization.</desc>
      <defs>
        <pattern id="spray-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="720" height="430" fill="url(#spray-grid)" />
      <g className="spray-axis">
        <path d="M70 350H650" />
        <path d="M70 350V70" />
        <text x="657" y="356">X</text>
        <text x="63" y="60">Y</text>
      </g>
      <path className="spray-path spray-path--shadow" d="M112 312 C188 312 184 118 276 118 S368 312 458 312 S544 118 628 118" />
      <path className="spray-path" d="M112 312 C188 312 184 118 276 118 S368 312 458 312 S544 118 628 118" />
      <g className="spray-node">
        <circle cx="112" cy="312" r="7" /><text x="94" y="340">START</text>
        <circle cx="276" cy="118" r="7" /><text x="248" y="94">MEASURE</text>
        <circle cx="458" cy="312" r="7" /><text x="430" y="340">MODEL</text>
        <circle cx="628" cy="118" r="7" /><text x="588" y="94">OPTIMIZE</text>
      </g>
      <g className="spray-nozzle" transform="translate(346 188)">
        <path d="M-18 0H18L10 28H-10Z" />
        <path d="M-3 28L-18 69M3 28L18 69M0 28V73" />
      </g>
      <text className="spray-caption" x="40" y="402">PROGRAMMED TRAJECTORY / CLOSED-LOOP STUDY</text>
    </svg>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection((visible.target as HTMLElement).dataset.section ?? "about");
      },
      { rootMargin: "-30% 0px -58%", threshold: 0 },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    sections.forEach((section) => sectionObserver.observe(section));
    reveals.forEach((item) => {
      item.classList.add("reveal-ready");
      revealObserver.observe(item);
    });

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main className="portfolio-shell">
      <LaunchSequence />
      <a className="skip-link" href="#work">Skip to selected work</a>
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>

      <aside className="intro-panel">
        <div className="intro-copy">
          <a className="monogram" href="#about">MS</a>
          <p className="availability"><i /> Based in Nuremberg / Erlangen</p>
          <h1><span>Midhun</span><span>Somanunnithan</span></h1>
          <h2>Machine Learning Researcher & Engineer</h2>
          <p className="intro-summary">Computer vision, retrieval systems, and physical automation—designed as measurable, reproducible engineering work.</p>

          <div className="hero-actions" aria-label="Primary actions">
            <a className="primary-action" href="#work">View selected work <span aria-hidden="true">↓</span></a>
            <a className="cv-action" href={external.cv} download="Midhun_Somanunnithan_CV.pdf" aria-label="Download Midhun's CV as PDF">Download CV <span aria-hidden="true">↓</span></a>
            <a href={external.linkedin} aria-label="Open Midhun's LinkedIn profile">LinkedIn <Arrow /></a>
            <a href={external.github} aria-label="Open Midhun's GitHub profile">GitHub <Arrow /></a>
          </div>

          <nav className="section-nav" aria-label="Portfolio sections">
            {navigation.map((item) => (
              <a key={item.id} className={activeSection === item.id ? "active" : ""} href={`#${item.id}`}>
                <i /><span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="depth-stage practice-stage" aria-label="Engineering scope: physical systems, computer vision, learning systems, and validation">
          <div className="practice-card">
            <div className="practice-heading">
              <span>Engineering scope</span>
              <b>Experiment / Evidence</b>
            </div>
            <div className="practice-flow">
              <div className="practice-step">
                <span>01</span><div><b>Physical systems</b><small>Motion, control, sensing</small></div><i />
              </div>
              <div className="practice-step">
                <span>02</span><div><b>Computer vision</b><small>Measurement, retrieval, evaluation</small></div><i />
              </div>
              <div className="practice-step">
                <span>03</span><div><b>Learning systems</b><small>Models, experiments, validation</small></div><i />
              </div>
            </div>
            <div className="practice-footer"><span>Research method</span><strong>Build / measure / validate</strong></div>
          </div>
        </div>

        <div className="socials">
          <a href={external.github} target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
          <a href={external.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          <a href={external.email} aria-label="Email Midhun">Email</a>
        </div>
      </aside>

      <div className="content-panel">
        <section className="content-section about-section" id="about" data-section="about" aria-labelledby="about-title">
          <p className="section-kicker">About</p>
          <div data-reveal>
            <h2 id="about-title">I work where models meet physical systems.</h2>
            <p>I am an E-Mobility master’s student and research assistant at FAU. My work ranges from fine-grained image retrieval to an automated spray system built around real motion, pneumatic control, and measurable output.</p>
            <p>My approach is end to end: define the experiment, build the pipeline, evaluate it on held-out data, and document failure as carefully as success.</p>
          </div>
          <div className="fact-row" data-reveal>
            <div><strong>7</strong><span>retrieval families compared</span></div>
            <div><strong>83.39%</strong><span>best retrieval mAP</span></div>
            <div><strong>2×</strong><span>research roles at FAU</span></div>
          </div>
        </section>

        <section className="content-section" id="experience" data-section="experience" aria-labelledby="experience-title">
          <p className="section-kicker">Experience</p>
          <h2 className="section-title" id="experience-title" data-reveal>Current work at FAU, plus the path that led there.</h2>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-card" key={item.title} data-reveal>
                <p className="experience-date">{item.date}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="company">{item.company}</p>
                  <p className="experience-copy">{item.copy}</p>
                  <div className="tag-list">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="education-note" data-reveal>
            <span>Education</span>
            <div><b>M.Sc. E-Mobility (ACES)</b><small>FAU Erlangen-Nürnberg · 2022—present</small></div>
            <div><b>B.Tech Mechanical Engineering</b><small>APJ Abdul Kalam Technological University · 2017—2021</small></div>
          </div>
        </section>

        <section className="content-section" id="work" data-section="work" aria-labelledby="work-title">
          <p className="section-kicker">Selected work</p>
          <h2 className="section-title" id="work-title" data-reveal>Evidence first. Four projects, four engineering questions.</h2>

          <div className="project-list">
            {projects.map((project) => {
              return (
                <article className={`project-card${project.featured ? " is-featured" : ""}`} key={project.number} data-reveal>
                  <div className={`project-visual${project.visual?.endsWith(".png") ? " is-light" : ""}`}>
                    {project.visual ? (
                      <img src={project.visual} alt={project.visualAlt} loading="lazy" decoding="async" />
                    ) : (
                      <SprayTrajectoryVisual />
                    )}
                    <span className="project-index">{project.number}</span>
                    {project.featured && <span className="featured-label">Featured result</span>}
                  </div>

                  <div className="project-content">
                    <div className="project-topline"><span>{project.number}</span><small>{project.label}</small></div>
                    <h3>{project.title}</h3>
                    <dl className="project-details">
                      <div><dt>Problem</dt><dd>{project.problem}</dd></div>
                      <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
                    </dl>
                    <div className="project-outcome"><span>Outcome</span><strong>{project.proof}</strong></div>
                    <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    {project.href ? (
                      <a className="project-repository" href={project.href} target="_blank" rel="noreferrer">
                        <span>Read the case study on GitHub</span><Arrow />
                      </a>
                    ) : (
                      <div className="project-repository unavailable"><span>Research code not public</span></div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-section contact-section" id="contact" data-section="contact" aria-labelledby="contact-title">
          <p className="section-kicker">Contact</p>
          <div data-reveal>
            <h2 id="contact-title">Interested in working together?</h2>
            <p>I’m open to research, master’s thesis, and working-student roles in computer vision, machine learning, scientific ML, and intelligent systems.</p>
            <div className="contact-actions">
              <a className="email-link" href={external.email}>midhunnrd812@gmail.com <Arrow /></a>
              <a href={external.cv} download="Midhun_Somanunnithan_CV.pdf">Download CV <span aria-hidden="true">↓</span></a>
              <a href={external.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
              <a href={external.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            </div>
          </div>
          <footer>
            <span>© 2026 Midhun Somanunnithan</span>
            <span>English C1 · German B2</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
