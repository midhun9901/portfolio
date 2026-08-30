"use client";

import { useEffect, useState, type CSSProperties } from "react";

const external = {
  github: "https://github.com/midhun9901",
  linkedin: "https://www.linkedin.com/in/midhun-somanunnithan",
  email: "mailto:midhunnrd812@gmail.com",
};

const storyChapters = [
  { id: "top", label: "Hello" },
  { id: "about", label: "The beginning" },
  { id: "work", label: "The work" },
  { id: "experience", label: "In practice" },
  { id: "toolkit", label: "The method" },
  { id: "contact", label: "What’s next" },
];

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
    kind: "Independent study · Deep Learning",
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
    title: "JARVIS, a local voice-agent system",
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState("top");
  const [openFieldNote, setOpenFieldNote] = useState<string | null>("01");

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveChapter((visible.target as HTMLElement).dataset.chapter ?? "top");
      },
      { rootMargin: "-35% 0px -55%", threshold: 0 },
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
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    const chapters = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    chapters.forEach((chapter) => chapterObserver.observe(chapter));
    revealItems.forEach((item) => {
      item.classList.add("reveal-ready");
      revealObserver.observe(item);
    });
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      chapterObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main
      id="top"
      style={{ "--story-progress": `${scrollProgress}%` } as CSSProperties}
    >
      <div className="story-progress" aria-hidden="true"><span /></div>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Midhun Somanunnithan, back to top">
          <img src="/profile.png" alt="" width="34" height="34" />
          <span>MIDHUN.S</span>
        </a>
        <div className="nav-links">
          <a href="#about">My story</a>
          <a href="#work">Projects</a>
          <a href="#experience">Experience</a>
        </div>
        <a className="nav-contact" href="#contact">Let’s talk <span aria-hidden="true">↘</span></a>
      </nav>

      <aside className="story-rail" aria-label="Story chapters">
        <span>THE STORY</span>
        <ol>
          {storyChapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a className={activeChapter === chapter.id ? "active" : ""} href={`#${chapter.id}`}>
                <b>0{index + 1}</b><span>{chapter.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </aside>

      <section className="hero section-shell" data-chapter="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="signal-dot" /> Nuremberg / Erlangen, Germany</p>
          <p className="story-kicker">Hey, I’m Midhun.</p>
          <h1 id="hero-title">
            I began with machines. <em>Then I taught them to learn.</em>
          </h1>
          <p className="hero-lede">
            This is the short story of how a mechanical engineer became a deep-learning researcher—without losing the habit of testing whether things actually work outside the notebook.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#about">Start the story <span aria-hidden="true">↓</span></a>
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

      <section className="manifesto section-shell" id="about" data-chapter="about" aria-labelledby="manifesto-title">
        <div className="section-label"><span>01</span> THE BEGINNING</div>
        <div className="manifesto-grid" data-reveal>
          <h2 id="manifesto-title">I started with machines I could touch.</h2>
          <div className="manifesto-copy">
            <p>
              Mechanical engineering taught me to think in forces, motion, signals, and failure. If a system looked good on paper but failed on the bench, the bench won.
            </p>
            <p>
              When I moved into computer vision and deep learning, I kept that instinct. I still build controlled experiments, compare honest baselines, trace failure modes, and ask one simple question: does the result hold up?
            </p>
            <div className="principles">
              <span>Build it</span><i>→</i><span>Measure it</span><i>→</i><span>Explain it</span>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section" id="work" data-chapter="work" aria-labelledby="work-title">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-label light"><span>02</span> THE WORK</div>
              <h2 id="work-title">Then I started teaching machines to see.</h2>
            </div>
            <p>Three projects explain my approach better than a list of skills. Open the field notes to see what I tried, what worked, and what did not.</p>
          </div>

          <div className="featured-projects">
            {featuredProjects.map((project) => (
              <article className="featured-project" key={project.index} data-reveal>
                <div className="project-copy">
                  <div className="project-meta"><span>{project.index}</span><span>{project.kind}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <strong className="project-proof">{project.proof}</strong>
                  <button
                    className="field-note-toggle"
                    type="button"
                    aria-expanded={openFieldNote === project.index}
                    onClick={() => setOpenFieldNote(openFieldNote === project.index ? null : project.index)}
                  >
                    <span>{openFieldNote === project.index ? "Close field note" : "Open field note"}</span>
                    <b aria-hidden="true">{openFieldNote === project.index ? "−" : "+"}</b>
                  </button>
                  <div className={`project-detail-wrap ${openFieldNote === project.index ? "open" : ""}`}>
                    <div><p className="project-detail">{project.detail}</p></div>
                  </div>
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
              <article className="compact-project" key={project.number} data-reveal>
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

      <section className="experience-section section-shell" id="experience" data-chapter="experience" aria-labelledby="experience-title">
        <div className="section-heading dark-heading" data-reveal>
          <div>
            <div className="section-label"><span>03</span> IN PRACTICE</div>
            <h2 id="experience-title">The work changed. My method didn’t.</h2>
          </div>
          <p>From physical automation to A100 GPU experiments, I keep returning to the same discipline: make it measurable, repeatable, and clear enough for someone else to trust.</p>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item" key={item.role} data-reveal>
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
            <article data-reveal>
              <span className="education-year">2022 — PRESENT</span>
              <p className="degree-type">MASTER OF SCIENCE</p>
              <h3>E-Mobility (ACES)</h3>
              <p>Friedrich-Alexander-Universität Erlangen-Nürnberg</p>
              <div className="degree-note">Computer vision · Deep learning · physical systems</div>
            </article>
            <article data-reveal>
              <span className="education-year">2017 — 2021</span>
              <p className="degree-type">BACHELOR OF TECHNOLOGY</p>
              <h3>Mechanical Engineering</h3>
              <p>APJ Abdul Kalam Technological University</p>
              <div className="degree-note">Differential equations · Fourier analysis · fluid dynamics</div>
            </article>
          </div>
        </div>
      </section>

      <section className="toolkit-section section-shell" id="toolkit" data-chapter="toolkit" aria-labelledby="toolkit-title">
        <div className="section-heading dark-heading" data-reveal>
          <div>
            <div className="section-label"><span>04</span> THE METHOD</div>
            <h2 id="toolkit-title">Here’s how I work when the answer isn’t obvious.</h2>
          </div>
          <p>I choose tools around the question, then make the comparison reproducible enough to defend.</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <article key={skill.title} data-reveal>
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

      <section className="contact-section" id="contact" data-chapter="contact" aria-labelledby="contact-title">
        <div className="contact-noise" aria-hidden="true" />
        <div className="section-shell contact-inner" data-reveal>
          <p className="eyebrow contact-eyebrow"><span className="signal-dot" /> AVAILABLE IMMEDIATELY OR BY AGREEMENT</p>
          <h2 id="contact-title">That’s the story so far. <em>What should we build next?</em></h2>
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
        <span>Research · Engineering · Reproducibility</span>
      </footer>
    </main>
  );
}
