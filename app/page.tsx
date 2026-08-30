const external = {
  github: "https://github.com/midhun9901",
  linkedin: "https://www.linkedin.com/in/midhun-somanunnithan",
  email: "mailto:midhunnrd812@gmail.com",
};

const featuredProjects = [
  {
    index: "01",
    kind: "Research · Computer Vision",
    title: "Metric learning for archaeological vase retrieval",
    description:
      "A seven-pipeline content-based image retrieval benchmark for matching different depictions of the same historical vase across viewpoint, occlusion, and near-identical instances.",
    proof: "83.4% mAP · 100% Recall@10",
    detail:
      "DINOv2 ViT-S/14 with Triplet Loss was the strongest setup. The project also documents two negative results—background removal and pose cues—because knowing what did not help is part of the result.",
    tags: ["PyTorch", "DINOv2", "FAISS", "Metric Learning", "SLURM"],
    href: "https://github.com/midhun9901/vase-urn-project",
    visual: "retrieval",
  },
  {
    index: "02",
    kind: "Learning in public · Deep Learning",
    title: "Deep learning, rebuilt from the bottom up",
    description:
      "A staged implementation of the ideas behind modern neural networks: a tiny autograd engine, character-level language models, embeddings, deeper MLPs, activations, gradients, and BatchNorm.",
    proof: "Bigram → MLP → BatchNorm → GPT next",
    detail:
      "The current 6-layer network has 47,024 parameters and improves held-out negative log-likelihood from 2.45 to 2.09 on 32,033 names. Every stage is runnable and explained in plain language.",
    tags: ["Python", "PyTorch", "Autograd", "Language Models", "Jupyter"],
    href: "https://github.com/midhun9901/deep-learning-from-scratch",
    visual: "autograd",
  },
  {
    index: "03",
    kind: "Product build · Agent systems",
    title: "JARVIS, a local voice AI assistant I use daily",
    description:
      "An always-on Windows assistant with real-time voice interaction, tool execution, screen vision, Gmail and Calendar integrations, persistent memory, and pluggable LLM providers.",
    proof: "Voice → reason → act → remember",
    detail:
      "The system includes background agents for memory consolidation, proactive nudges, and reviewing repeated failure patterns—designed to stay useful without silently changing its own code.",
    tags: ["FastAPI", "React", "WebSockets", "OAuth2", "LLM Routing"],
    href: "https://github.com/midhun9901/jarvis",
    visual: "agent",
  },
];

const compactProjects = [
  {
    number: "04",
    title: "MIDFLOW",
    kicker: "Lightweight Windows utility",
    copy: "Hold-to-talk voice typing with an audio-reactive window border, built on native Windows dictation with no third-party Python packages.",
    tags: ["Python", "Windows API", "ctypes"],
    href: "https://github.com/midhun9901/MIDFLOW",
  },
  {
    number: "05",
    title: "TinyML speed reduction",
    kicker: "Bachelor’s thesis · Embedded ML",
    copy: "A Random Forest zone-aware speed-reduction model deployed on a microcontroller-based embedded prototype.",
    tags: ["Random Forest", "Microcontroller", "C/C++"],
  },
  {
    number: "06",
    title: "Automated DIC preparation",
    kicker: "Research hardware · Automation",
    copy: "A repeatable spray-booth workflow using multi-axis motion and pneumatic control, validated through parameter studies on physical equipment.",
    tags: ["Automation", "Motion Control", "Validation"],
  },
  {
    number: "07",
    title: "Kerala Connect landing page",
    kicker: "Web build · Static product site",
    copy: "A responsive dark-theme marketing site for a mobile community app, built as a lightweight, no-build static deployment.",
    tags: ["HTML", "CSS", "Responsive UI"],
    href: "https://github.com/midhun9901/jokering",
  },
];

const experience = [
  {
    dates: "Feb 2026 — Present",
    role: "Deep Learning Research Assistant — Computer Vision",
    place: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
    bullets: [
      "Designed, trained, and evaluated seven PyTorch retrieval pipelines across CNN and Vision Transformer backbones.",
      "Compared Triplet, ProxyAnchor, and ArcFace objectives; integrated SAM crops and YOLOv11 pose features.",
      "Kept A100 GPU experiments reproducible with Linux, Git, SLURM, shared splits, ablations, and failure analysis.",
    ],
  },
  {
    dates: "2026 — Present",
    role: "Research Assistant — Automation & Mechatronics",
    place: "FAU Institute of Manufacturing Technology",
    bullets: [
      "Built an automated spray-booth workflow for repeatable sample preparation using multi-axis motion and pneumatic control.",
      "Planned parameter studies, validated repeatability on real equipment, and documented the setup for reuse.",
    ],
  },
  {
    dates: "Oct 2023 — Dec 2023",
    role: "Data Science & Machine Learning Intern",
    place: "Entri Elevate",
    bullets: [
      "Cleaned and prepared tabular data, engineered features with Pandas and NumPy, and evaluated models with cross-validation.",
    ],
  },
];

const skills = [
  {
    title: "Machine learning",
    items: "PyTorch, TensorFlow / Keras, scikit-learn, neural networks from scratch, metric learning, benchmarking, ablations",
  },
  {
    title: "Computer vision",
    items: "DINOv2, Vision Transformers, ResNet50, YOLOv11, SAM, OpenCV, FAISS, image retrieval, robustness analysis",
  },
  {
    title: "Systems & compute",
    items: "Python, C / C++, FastAPI, WebSockets, Linux, Git, shell, SLURM, A100 GPUs, OAuth2",
  },
  {
    title: "Data & engineering",
    items: "NumPy, Pandas, data cleaning, feature engineering, microcontrollers, multi-axis motion, pneumatic control",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "retrieval") {
    return (
      <div className="project-visual retrieval-visual" aria-label="Retrieval experiment summary">
        <div className="visual-topline">
          <span>V6 · BEST MODEL</span>
          <span className="visual-status">evaluated</span>
        </div>
        <div className="retrieval-flow" aria-hidden="true">
          <div className="sample-stack">
            <span>VASE</span>
            <span>VASE</span>
            <span>VASE</span>
          </div>
          <div className="flow-line" />
          <div className="model-node">DINOv2</div>
          <div className="flow-line" />
          <div className="result-node">
            <b>83.4</b>
            <span>mAP</span>
          </div>
        </div>
        <div className="visual-footline">
          <span>ViT-S/14 + Triplet</span>
          <span>Recall@10 · 100%</span>
        </div>
      </div>
    );
  }

  if (type === "autograd") {
    return (
      <div className="project-visual autograd-visual" aria-label="Deep learning roadmap">
        <div className="visual-topline">
          <span>BUILD LOG</span>
          <span className="visual-status">4 stages done</span>
        </div>
        <div className="roadmap" aria-hidden="true">
          <div className="roadmap-row done"><span>01</span><b>micrograd</b><em>done</em></div>
          <div className="roadmap-row done"><span>02</span><b>bigram</b><em>done</em></div>
          <div className="roadmap-row done"><span>03</span><b>MLP</b><em>done</em></div>
          <div className="roadmap-row active"><span>04</span><b>BatchNorm</b><em>done</em></div>
          <div className="roadmap-row next"><span>05</span><b>nanoGPT</b><em>next</em></div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual agent-visual" aria-label="JARVIS assistant architecture">
      <div className="visual-topline">
        <span>LOCAL AGENT</span>
        <span className="visual-status">daily use</span>
      </div>
      <div className="agent-orbit" aria-hidden="true">
        <div className="agent-core"><span>J</span></div>
        <span className="orbit-label label-voice">voice</span>
        <span className="orbit-label label-memory">memory</span>
        <span className="orbit-label label-tools">tools</span>
        <span className="orbit-label label-vision">vision</span>
      </div>
      <div className="visual-footline">
        <span>FastAPI + React</span>
        <span>Local-first</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Midhun Somanunnithan, back to top">
          <img src="/profile.png" alt="" width="34" height="34" />
          <span>MIDHUN.S</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </div>
        <a className="nav-contact" href="#contact">Let’s talk <span aria-hidden="true">↘</span></a>
      </nav>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="signal-dot" /> Nuremberg / Erlangen, Germany</p>
          <h1 id="hero-title">
            I build learning systems from <em>first principles.</em>
          </h1>
          <p className="hero-lede">
            Then I test what survives reality. I’m Midhun—a deep learning research assistant and E-Mobility master’s student working across computer vision, ML systems, automation, and embedded intelligence.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="button button-secondary" href={external.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          </div>
        </div>

        <aside className="hero-lab" aria-label="Featured research result">
          <div className="lab-grid" aria-hidden="true" />
          <div className="lab-header">
            <span>EXPERIMENT NOTE · 06/07</span>
            <span>FAU · 2026</span>
          </div>
          <div className="lab-title">
            <span className="lab-kicker">BEST RETRIEVAL PIPELINE</span>
            <h2>DINOv2 + Triplet Loss</h2>
          </div>
          <div className="lab-metrics">
            <div><strong>83.4<sup>%</sup></strong><span>mean average precision</span></div>
            <div><strong>100<sup>%</sup></strong><span>Recall@10</span></div>
          </div>
          <div className="pipeline" aria-hidden="true">
            <span>image</span><i>→</i><span>ViT-S/14</span><i>→</i><span>embedding</span><i>→</i><span>FAISS</span>
          </div>
          <div className="lab-footer">
            <span>7 controlled pipelines</span>
            <span>80 / 20 held-out split</span>
          </div>
        </aside>
      </section>

      <section className="proof-strip" aria-label="Key facts">
        <div className="proof-item"><strong>7</strong><span>vision pipelines benchmarked</span></div>
        <div className="proof-item"><strong>A100</strong><span>GPU experiments via SLURM</span></div>
        <div className="proof-item"><strong>2×</strong><span>research roles at FAU</span></div>
        <div className="proof-item"><strong>C1 / B2</strong><span>English / German</span></div>
      </section>

      <section className="manifesto section-shell" id="about" aria-labelledby="manifesto-title">
        <div className="section-label"><span>00</span> PROFILE</div>
        <div className="manifesto-grid">
          <h2 id="manifesto-title">A mechanical engineer’s systems instinct, applied to machine learning.</h2>
          <div className="manifesto-copy">
            <p>
              My path into AI started with physical systems: motion, control, signals, embedded hardware, and the habit of asking whether a result still holds outside a notebook.
            </p>
            <p>
              Today I bring that same instinct to computer vision and deep learning—building controlled experiments, comparing honest baselines, tracing failure modes, and turning research code into reproducible systems.
            </p>
            <div className="principles">
              <span>Build it</span><i>→</i><span>Measure it</span><i>→</i><span>Explain it</span>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <div className="section-label light"><span>01</span> SELECTED WORK</div>
              <h2 id="work-title">Projects with a point of view.</h2>
            </div>
            <p>Research experiments, useful tools, and systems built to understand what is happening under the hood.</p>
          </div>

          <div className="featured-projects">
            {featuredProjects.map((project) => (
              <article className="featured-project" key={project.index}>
                <div className="project-copy">
                  <div className="project-meta"><span>{project.index}</span><span>{project.kind}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <strong className="project-proof">{project.proof}</strong>
                  <p className="project-detail">{project.detail}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                    View repository <Arrow />
                  </a>
                </div>
                <ProjectVisual type={project.visual} />
              </article>
            ))}
          </div>

          <div className="compact-grid">
            {compactProjects.map((project) => (
              <article className="compact-project" key={project.number}>
                <div className="compact-number">{project.number}</div>
                <p className="compact-kicker">{project.kicker}</p>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
                <div className="tag-row compact-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
                    Open project <Arrow />
                  </a>
                ) : <span className="project-type">Academic / research work</span>}
              </article>
            ))}
          </div>

          <div className="repo-directory">
            <div>
              <span className="repo-count">07</span>
              <p>public repositories, including a house-price regression learning project and my living GitHub profile.</p>
            </div>
            <a className="button button-accent" href={external.github} target="_blank" rel="noreferrer">Browse all repositories <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="experience-section section-shell" id="experience" aria-labelledby="experience-title">
        <div className="section-heading dark-heading">
          <div>
            <div className="section-label"><span>02</span> EXPERIENCE</div>
            <h2 id="experience-title">Work grounded in experiments and hardware.</h2>
          </div>
          <p>From GPU clusters to physical automation: the common thread is careful evaluation and systems that can be repeated.</p>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item" key={item.role}>
              <div className="timeline-index">0{index + 1}</div>
              <div className="timeline-date">{item.dates}</div>
              <div className="timeline-main">
                <h3>{item.role}</h3>
                <p className="timeline-place">{item.place}</p>
                <ul>
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education-section" aria-labelledby="education-title">
        <div className="section-shell">
          <div className="section-label light"><span>03</span> EDUCATION</div>
          <h2 id="education-title">Built between engineering and intelligence.</h2>
          <div className="education-grid">
            <article>
              <span className="education-year">2022 — PRESENT</span>
              <p className="degree-type">MASTER OF SCIENCE</p>
              <h3>E-Mobility (ACES)</h3>
              <p>Friedrich-Alexander-Universität Erlangen-Nürnberg</p>
              <div className="degree-note">Computer vision · Deep learning · physical systems</div>
            </article>
            <article>
              <span className="education-year">2017 — 2021</span>
              <p className="degree-type">BACHELOR OF TECHNOLOGY</p>
              <h3>Mechanical Engineering</h3>
              <p>APJ Abdul Kalam Technological University</p>
              <div className="degree-note">Differential equations · Fourier analysis · fluid dynamics</div>
            </article>
          </div>
        </div>
      </section>

      <section className="toolkit-section section-shell" aria-labelledby="toolkit-title">
        <div className="section-heading dark-heading">
          <div>
            <div className="section-label"><span>04</span> TOOLKIT</div>
            <h2 id="toolkit-title">Methods before buzzwords.</h2>
          </div>
          <p>I choose tools around the question, then make the comparison reproducible enough to defend.</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <article key={skill.title}>
              <span>0{index + 1}</span>
              <h3>{skill.title}</h3>
              <p>{skill.items}</p>
            </article>
          ))}
        </div>
        <div className="method-band" aria-label="Working methods">
          <span>experiment design</span><i>•</i><span>held-out evaluation</span><i>•</i><span>failure analysis</span><i>•</i><span>ablation studies</span><i>•</i><span>reproducible pipelines</span>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-noise" aria-hidden="true" />
        <div className="section-shell contact-inner">
          <p className="eyebrow contact-eyebrow"><span className="signal-dot" /> AVAILABLE IMMEDIATELY OR BY AGREEMENT</p>
          <h2 id="contact-title">Have a hard problem worth <em>understanding?</em></h2>
          <p className="contact-copy">
            I’m open to research, master’s thesis, and working-student opportunities in machine learning, computer vision, scientific ML, and intelligent systems.
          </p>
          <div className="contact-actions">
            <a className="button contact-button" href={external.email}>midhunnrd812@gmail.com <span aria-hidden="true">↗</span></a>
            <a className="social-link" href={external.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            <a className="social-link" href={external.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          </div>
          <div className="contact-footer">
            <div>
              <img src="/profile.png" alt="" width="42" height="42" />
              <span><b>Midhun Somanunnithan</b><small>Machine learning researcher & builder</small></span>
            </div>
            <p>English · C1 &nbsp; / &nbsp; German · B2 working proficiency</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Midhun Somanunnithan</span>
        <a href="#top">Back to top ↑</a>
        <span>Built from real work, not buzzwords.</span>
      </footer>
    </main>
  );
}
