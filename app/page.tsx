"use client";

import { useEffect, useState } from "react";

const external = {
  github: "https://github.com/midhun9901",
  linkedin: "https://www.linkedin.com/in/midhun-somanunnithan",
  email: "mailto:midhunnrd812@gmail.com",
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
    copy: "Seven controlled retrieval pipelines for matching historical vase depictions across viewpoint, occlusion, and near-identical objects. DINOv2 with Triplet Loss delivered the strongest result.",
    proof: "83.4% mAP · 100% Recall@10",
    tags: ["PyTorch", "DINOv2", "Metric Learning", "FAISS"],
    href: "https://github.com/midhun9901/vase-urn-project",
  },
  {
    number: "02",
    title: "Automated spray intelligence",
    label: "Automation · Vision · Optimization",
    copy: "A GRBL and pneumatic spray system with programmable trajectories, OpenCV quality measurement, CNN and ViT grading, segmentation experiments, multimodal prediction, and Bayesian parameter optimization.",
    proof: "Motion → measurement → learning → optimization",
    tags: ["GRBL", "OpenCV", "PyTorch", "Bayesian Optimization"],
  },
  {
    number: "03",
    title: "Deep learning from scratch",
    label: "Independent study",
    copy: "A hand-built autograd engine and staged character-level language models, progressing from a bigram baseline to a six-layer BatchNorm network with explicit training diagnostics.",
    proof: "47,024 parameters · NLL 2.45 → 2.09",
    tags: ["Autograd", "Language Models", "BatchNorm", "PyTorch"],
    href: "https://github.com/midhun9901/deep-learning-from-scratch",
  },
  {
    number: "04",
    title: "JARVIS",
    label: "Local agent system",
    copy: "A daily-use Windows voice system with streaming interaction, tool execution, screen vision, Gmail and Calendar integrations, and persistent memory.",
    proof: "Voice → reason → act → remember",
    tags: ["FastAPI", "React", "WebSockets", "OAuth2"],
    href: "https://github.com/midhun9901/jarvis",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: -7, y: 9 });

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

  const updateTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x: y, y: x });
  };

  return (
    <main className="portfolio-shell">
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <div className="ambient-grid" aria-hidden="true" style={{ transform: `translateY(${-scrollProgress * 0.45}px)` }} />

      <aside className="intro-panel">
        <div className="intro-copy">
          <a className="monogram" href="#about">MS</a>
          <p className="availability"><i /> Based in Nuremberg / Erlangen</p>
          <h1><span>Midhun</span><span>Somanunnithan</span></h1>
          <h2>Machine Learning Researcher & Engineer</h2>
          <p className="intro-summary">I build and evaluate computer-vision systems, then connect them to real software and physical processes.</p>

          <nav className="section-nav" aria-label="Portfolio sections">
            {navigation.map((item) => (
              <a key={item.id} className={activeSection === item.id ? "active" : ""} href={`#${item.id}`}>
                <i /><span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div
          className="depth-stage"
          onPointerMove={updateTilt}
          onPointerLeave={() => setTilt({ x: -7, y: 9 })}
          aria-label="Interactive three-dimensional stack showing Midhun's engineering path"
        >
          <div
            className="depth-stack"
            style={{ transform: `rotateX(${tilt.x + scrollProgress * 0.025}deg) rotateY(${tilt.y + scrollProgress * 0.04}deg)` }}
          >
            <div className="depth-layer layer-one"><span>01</span><b>MECHANICS</b></div>
            <div className="depth-layer layer-two"><span>02</span><b>AUTOMATION</b></div>
            <div className="depth-layer layer-three"><span>03</span><b>VISION</b></div>
            <div className="depth-layer layer-four"><span>04</span><b>LEARNING</b></div>
          </div>
          <p>Move your cursor</p>
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
            <p>My background began in mechanical engineering and E-Mobility. That trained me to think in systems: inputs, constraints, measurements, failure modes, and repeatability.</p>
            <p>Today I apply the same discipline to deep learning—building controlled experiments, defending results with held-out evaluation, and documenting what failed as carefully as what worked.</p>
          </div>
          <div className="fact-row" data-reveal>
            <div><strong>7</strong><span>vision pipelines compared</span></div>
            <div><strong>83.4%</strong><span>best retrieval mAP</span></div>
            <div><strong>2×</strong><span>research roles at FAU</span></div>
          </div>
        </section>

        <section className="content-section" id="experience" data-section="experience" aria-labelledby="experience-title">
          <p className="section-kicker">Experience</p>
          <h2 className="section-title" id="experience-title" data-reveal>Research across models and machines.</h2>
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
          <h2 className="section-title" id="work-title" data-reveal>Four projects. Four ways of understanding a system.</h2>
          <div className="project-list">
            {projects.map((project) => {
              const content = (
                <>
                  <div className="project-topline"><span>{project.number}</span><small>{project.label}</small></div>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  <strong>{project.proof}</strong>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {project.href && <div className="project-arrow"><Arrow /></div>}
                </>
              );

              return project.href ? (
                <a className="project-card" key={project.number} href={project.href} target="_blank" rel="noreferrer" data-reveal>
                  {content}
                </a>
              ) : (
                <article className="project-card" key={project.number} data-reveal>{content}</article>
              );
            })}
          </div>
        </section>

        <section className="content-section contact-section" id="contact" data-section="contact" aria-labelledby="contact-title">
          <p className="section-kicker">Contact</p>
          <div data-reveal>
            <h2 id="contact-title">Let’s work on something that needs to be measured—not merely demonstrated.</h2>
            <p>I’m open to research, master’s thesis, and working-student opportunities in computer vision, machine learning, scientific ML, and intelligent systems.</p>
            <a className="email-link" href={external.email}>midhunnrd812@gmail.com <Arrow /></a>
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
