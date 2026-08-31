"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";

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

type SnakePoint = { x: number; y: number };
type SnakeDirection = { x: number; y: number };

const SNAKE_COLUMNS = 18;
const SNAKE_ROWS = 9;
const INITIAL_SNAKE: SnakePoint[] = [{ x: 5, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 4 }];
const FOOD_SEQUENCE: SnakePoint[] = [
  { x: 11, y: 4 }, { x: 15, y: 2 }, { x: 8, y: 7 },
  { x: 2, y: 1 }, { x: 16, y: 6 }, { x: 10, y: 2 },
];
const SNAKE_PHASES = ["MECHANICS", "AUTOMATION", "VISION", "LEARNING"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [snake, setSnake] = useState<SnakePoint[]>(INITIAL_SNAKE);
  const [snakeFood, setSnakeFood] = useState<SnakePoint>(FOOD_SEQUENCE[0]);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeStatus, setSnakeStatus] = useState<"idle" | "running" | "over">("idle");
  const glowRef = useRef<HTMLDivElement>(null);
  const snakeDirectionRef = useRef<SnakeDirection>({ x: 1, y: 0 });
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const swipeHandledRef = useRef(false);

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
    const moveGlow = (event: PointerEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      glowRef.current.dataset.visible = "true";
    };
    const hideGlow = () => {
      if (glowRef.current) glowRef.current.dataset.visible = "false";
    };
    sections.forEach((section) => sectionObserver.observe(section));
    reveals.forEach((item) => {
      item.classList.add("reveal-ready");
      revealObserver.observe(item);
    });

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("pointermove", moveGlow, { passive: true });
    document.documentElement.addEventListener("mouseleave", hideGlow);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", moveGlow);
      document.documentElement.removeEventListener("mouseleave", hideGlow);
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (snakeStatus !== "running") return;

    const timer = window.setTimeout(() => {
      const head = snake[0];
      const direction = snakeDirectionRef.current;
      const next = { x: head.x + direction.x, y: head.y + direction.y };
      const hitWall = next.x < 0 || next.x >= SNAKE_COLUMNS || next.y < 0 || next.y >= SNAKE_ROWS;
      const ate = next.x === snakeFood.x && next.y === snakeFood.y;
      const collisionBody = ate ? snake : snake.slice(0, -1);
      const hitSelf = collisionBody.some((point) => point.x === next.x && point.y === next.y);

      if (hitWall || hitSelf) {
        setSnakeStatus("over");
        return;
      }

      const nextSnake = ate ? [next, ...snake] : [next, ...snake.slice(0, -1)];
      setSnake(nextSnake);
      if (ate) {
        const nextScore = snakeScore + 1;
        const nextFood = FOOD_SEQUENCE
          .map((_, offset) => FOOD_SEQUENCE[(nextScore + offset) % FOOD_SEQUENCE.length])
          .find((candidate) => !nextSnake.some((point) => point.x === candidate.x && point.y === candidate.y));
        setSnakeScore(nextScore);
        if (nextFood) setSnakeFood(nextFood);
      }
    }, Math.max(82, 150 - snakeScore * 7));

    return () => window.clearTimeout(timer);
  }, [snake, snakeFood, snakeScore, snakeStatus]);

  const resetSnakeGame = (direction: SnakeDirection = { x: 1, y: 0 }) => {
    snakeDirectionRef.current = direction;
    setSnake(INITIAL_SNAKE.map((point) => ({ ...point })));
    setSnakeFood(FOOD_SEQUENCE[0]);
    setSnakeScore(0);
    setSnakeStatus("running");
  };

  const steerSnake = (direction: SnakeDirection) => {
    if (snakeStatus === "over") {
      resetSnakeGame(direction);
      return;
    }

    const current = snakeDirectionRef.current;
    if (current.x + direction.x === 0 && current.y + direction.y === 0) return;
    snakeDirectionRef.current = direction;
    setSnakeStatus("running");
  };

  const handleSnakeKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const directions: Record<string, SnakeDirection> = {
      ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    steerSnake(direction);
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 14) return;
    swipeHandledRef.current = true;
    steerSnake(Math.abs(deltaX) > Math.abs(deltaY)
      ? { x: deltaX > 0 ? 1 : -1, y: 0 }
      : { x: 0, y: deltaY > 0 ? 1 : -1 });
  };

  const snakePhase = SNAKE_PHASES[Math.min(snakeScore, SNAKE_PHASES.length - 1)];
  const snakeMessage = snakeStatus === "over"
    ? "Signal lost · tap to retry"
    : snakeStatus === "running"
      ? "Collect the signal nodes"
      : "Tap, swipe, or use WASD";

  const updateCardTilt = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--card-rotate-x", `${(0.5 - y) * 5}deg`);
    card.style.setProperty("--card-rotate-y", `${(x - 0.5) * 6}deg`);
    card.style.setProperty("--card-light-x", `${x * 100}%`);
    card.style.setProperty("--card-light-y", `${y * 100}%`);
  };

  const resetCardTilt = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.removeProperty("--card-rotate-x");
    card.style.removeProperty("--card-rotate-y");
    card.style.removeProperty("--card-light-x");
    card.style.removeProperty("--card-light-y");
  };

  return (
    <main className="portfolio-shell">
      <div className="opening-frame" aria-hidden="true"><span>MS</span><i /></div>
      <div className="film-grain" aria-hidden="true" />
      <div className="cursor-light" ref={glowRef} data-visible="false" aria-hidden="true" />
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

        {/* The game surface is a single composite keyboard and pointer widget. */}
        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
        <div
          className={`depth-stage snake-stage is-${snakeStatus}`}
          role="application"
          tabIndex={0}
          aria-label="Playable Snake game. Use arrow keys or WASD to collect signal nodes."
          onKeyDown={handleSnakeKey}
          onPointerDown={(event) => {
            swipeStartRef.current = { x: event.clientX, y: event.clientY };
            swipeHandledRef.current = false;
            event.currentTarget.setPointerCapture(event.pointerId);
            if (snakeStatus === "idle") setSnakeStatus("running");
          }}
          onPointerUp={finishSwipe}
          onClick={() => {
            if (swipeHandledRef.current) {
              swipeHandledRef.current = false;
              return;
            }
            if (snakeStatus === "over") resetSnakeGame();
            else if (snakeStatus === "idle") setSnakeStatus("running");
          }}
        >
          <div className="snake-console">
            <div className="snake-hud"><span>MS // SYSTEM PATH</span><b>NODE {String(snakeScore).padStart(2, "0")}</b></div>
            <div className="snake-board" aria-hidden="true">
              {Array.from({ length: SNAKE_COLUMNS * SNAKE_ROWS }, (_, index) => {
                const x = index % SNAKE_COLUMNS;
                const y = Math.floor(index / SNAKE_COLUMNS);
                const snakeIndex = snake.findIndex((point) => point.x === x && point.y === y);
                const isFood = snakeFood.x === x && snakeFood.y === y;
                return <i key={index} className={`${snakeIndex === 0 ? "snake-head" : snakeIndex > 0 ? "snake-body" : ""}${isFood ? " snake-food" : ""}`} />;
              })}
            </div>
            <div className="snake-storyline"><span>{String(Math.min(snakeScore + 1, 4)).padStart(2, "0")}</span><b>{snakePhase}</b></div>
            <div className="snake-footer">
              <p aria-live="polite">{snakeMessage}</p>
              <div className="snake-controls" aria-label="Snake direction controls">
                {[
                  { label: "Left", symbol: "←", direction: { x: -1, y: 0 } },
                  { label: "Up", symbol: "↑", direction: { x: 0, y: -1 } },
                  { label: "Down", symbol: "↓", direction: { x: 0, y: 1 } },
                  { label: "Right", symbol: "→", direction: { x: 1, y: 0 } },
                ].map((control) => (
                  <button
                    type="button"
                    key={control.label}
                    aria-label={control.label}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      steerSnake(control.direction);
                    }}
                  >{control.symbol}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}

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
                  <div className={`project-repository${project.href ? "" : " unavailable"}`}>
                    <span>{project.href ? "View on GitHub" : "Research code not public"}</span>
                    {project.href && <Arrow />}
                  </div>
                </>
              );

              return project.href ? (
                <a
                  className="project-card"
                  key={project.number}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} repository on GitHub`}
                  data-reveal
                  onPointerMove={updateCardTilt}
                  onPointerLeave={resetCardTilt}
                >
                  {content}
                </a>
              ) : (
                <article
                  className="project-card"
                  key={project.number}
                  data-reveal
                  onPointerMove={updateCardTilt}
                  onPointerLeave={resetCardTilt}
                >
                  {content}
                </article>
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
