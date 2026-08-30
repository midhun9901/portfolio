"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const external = {
  github: "https://github.com/midhun9901",
  linkedin: "https://www.linkedin.com/in/midhun-somanunnithan",
  email: "mailto:midhunnrd812@gmail.com",
};

const sceneNames = ["Start", "Foundation", "Automation", "Vision", "Builds", "Next"];

const spraySteps = [
  {
    label: "Move",
    title: "A repeatable physical process",
    copy: "GRBL motion, pneumatic actuation, and programmable spray trajectories replaced manual variation.",
  },
  {
    label: "Measure",
    title: "Quality became data",
    copy: "A Python and OpenCV pipeline measured coated area, width, symmetry, edge quality, and uniformity.",
  },
  {
    label: "Learn",
    title: "Images met process parameters",
    copy: "CNN and Vision Transformer grading, segmentation experiments, and a multimodal quality model connected appearance to settings.",
  },
  {
    label: "Optimize",
    title: "Towards a closed loop",
    copy: "Bayesian optimization selected spray parameters efficiently and laid the groundwork for parameter recommendations.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [scene, setScene] = useState(0);
  const [carX, setCarX] = useState(12);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [isDriving, setIsDriving] = useState(false);
  const [sprayStep, setSprayStep] = useState(0);
  const sceneRef = useRef(0);
  const carXRef = useRef(12);
  const driveTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const nudgeCar = useCallback((direction: 1 | -1) => {
    setFacing(direction);
    let next = carXRef.current + direction * 2.2;

    if (next >= 88) {
      if (sceneRef.current < sceneNames.length - 1) {
        sceneRef.current += 1;
        setScene(sceneRef.current);
        next = 12;
      } else {
        next = 88;
      }
    }

    if (next <= 10) {
      if (sceneRef.current > 0) {
        sceneRef.current -= 1;
        setScene(sceneRef.current);
        next = 86;
      } else {
        next = 10;
      }
    }

    carXRef.current = next;
    setCarX(next);
  }, []);

  const stopDriving = useCallback(() => {
    if (driveTimer.current) clearInterval(driveTimer.current);
    driveTimer.current = null;
    setIsDriving(false);
  }, []);

  const startDriving = useCallback((direction: 1 | -1) => {
    stopDriving();
    setIsDriving(true);
    nudgeCar(direction);
    driveTimer.current = setInterval(() => nudgeCar(direction), 48);
  }, [nudgeCar, stopDriving]);

  const jumpTo = useCallback((index: number) => {
    stopDriving();
    sceneRef.current = index;
    carXRef.current = 12;
    setCarX(12);
    setFacing(1);
    setScene(index);
  }, [stopDriving]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        setIsDriving(true);
        nudgeCar(1);
      }
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        setIsDriving(true);
        nudgeCar(-1);
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowLeft", "a", "d", "A", "D"].includes(event.key)) {
        setIsDriving(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", stopDriving);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", stopDriving);
      stopDriving();
    };
  }, [nudgeCar, stopDriving]);

  return (
    <main className="drive-site">
      <header className="topbar">
        <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); jumpTo(0); }}>
          <span>MS</span>
          <b>Midhun Somanunnithan</b>
        </a>

        <nav className="route-nav" aria-label="Portfolio route">
          {sceneNames.map((name, index) => (
            <button
              key={name}
              type="button"
              className={scene === index ? "active" : ""}
              aria-label={`Go to ${name}`}
              aria-current={scene === index ? "step" : undefined}
              onClick={() => jumpTo(index)}
            >
              <i />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <a className="top-contact" href={external.email}>Contact <Arrow /></a>
      </header>

      <div className="scene-viewport">
        <div className="scene-track" style={{ transform: `translateX(-${scene * 100}vw)` }}>
          <section className="scene scene-start" aria-hidden={scene !== 0}>
            <div className="scene-number">00</div>
            <div className="scene-content hero-content">
              <p className="route-label">Nuremberg → Erlangen · Germany</p>
              <h1>Hey, I’m Midhun.</h1>
              <p className="hero-statement">I build learning systems that survive contact with reality.</p>
              <p className="scene-copy">My route started in mechanical engineering. It now runs through automation, computer vision, and deep learning research.</p>
              <div className="start-instruction">
                <kbd>→</kbd>
                <span>Hold to drive the story</span>
              </div>
            </div>
            <div className="horizon city-horizon" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          </section>

          <section className="scene scene-foundation" aria-hidden={scene !== 1}>
            <div className="scene-number">01</div>
            <div className="scene-content split-content">
              <div>
                <p className="route-label">Foundation · 2017—present</p>
                <h2>I learned engineering from the physical world.</h2>
                <p className="scene-copy">Motion, control, signals, and hardware taught me that a result has to work beyond the page.</p>
              </div>
              <div className="fact-stack">
                <article>
                  <span>2017—2021</span>
                  <h3>B.Tech Mechanical Engineering</h3>
                  <p>APJ Abdul Kalam Technological University</p>
                </article>
                <article>
                  <span>2022—present</span>
                  <h3>M.Sc. E-Mobility (ACES)</h3>
                  <p>FAU Erlangen-Nürnberg</p>
                </article>
                <article className="accent-card">
                  <span>Bachelor thesis</span>
                  <h3>TinyML on real hardware</h3>
                  <p>Random Forest speed-reduction model deployed on a microcontroller prototype.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="scene scene-automation" aria-hidden={scene !== 2}>
            <div className="scene-number">02</div>
            <div className="scene-content automation-content">
              <div className="automation-intro">
                <p className="route-label">Automation · FAU LFT</p>
                <h2>I built a spray system that could measure its own work.</h2>
                <p className="scene-copy">A physical process became a data pipeline—and then an optimization problem.</p>
              </div>
              <div className="process-console">
                <div className="process-tabs" role="tablist" aria-label="Automated spray workflow">
                  {spraySteps.map((step, index) => (
                    <button
                      key={step.label}
                      type="button"
                      role="tab"
                      aria-selected={sprayStep === index}
                      className={sprayStep === index ? "active" : ""}
                      onClick={() => setSprayStep(index)}
                    >
                      <span>0{index + 1}</span>{step.label}
                    </button>
                  ))}
                </div>
                <div className="process-detail" role="tabpanel">
                  <span>{spraySteps[sprayStep].label}</span>
                  <h3>{spraySteps[sprayStep].title}</h3>
                  <p>{spraySteps[sprayStep].copy}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="scene scene-vision" aria-hidden={scene !== 3}>
            <div className="scene-number">03</div>
            <div className="scene-content vision-content">
              <div>
                <p className="route-label">Computer vision · FAU · 2026</p>
                <h2>I took the same method into deep learning.</h2>
                <p className="scene-copy">Seven controlled retrieval pipelines. One held-out split. Every improvement had to earn its place.</p>
                <a className="inline-link" href="https://github.com/midhun9901/vase-urn-project" target="_blank" rel="noreferrer">View the research repository <Arrow /></a>
              </div>
              <div className="metric-panel">
                <div><span>Best model</span><b>DINOv2</b><small>ViT-S/14 + Triplet Loss</small></div>
                <div><span>mAP</span><b>83.4%</b><small>held-out retrieval</small></div>
                <div><span>Recall@10</span><b>100%</b><small>FAISS evaluation</small></div>
                <div className="pipeline-line"><span>image</span><i>→</i><span>embedding</span><i>→</i><span>retrieval</span></div>
              </div>
            </div>
          </section>

          <section className="scene scene-builds" aria-hidden={scene !== 4}>
            <div className="scene-number">04</div>
            <div className="scene-content builds-content">
              <div>
                <p className="route-label">Independent work</p>
                <h2>I build to understand.</h2>
              </div>
              <div className="build-grid">
                <a href="https://github.com/midhun9901/deep-learning-from-scratch" target="_blank" rel="noreferrer">
                  <span>01 · Learning systems</span>
                  <h3>Deep learning from scratch</h3>
                  <p>Autograd, language models, a 47,024-parameter BatchNorm network, and honest training diagnostics.</p>
                  <Arrow />
                </a>
                <a href="https://github.com/midhun9901/jarvis" target="_blank" rel="noreferrer">
                  <span>02 · Product system</span>
                  <h3>JARVIS</h3>
                  <p>A local voice-agent system with tools, screen vision, memory, Gmail, and Calendar integration.</p>
                  <Arrow />
                </a>
                <a href="https://github.com/midhun9901/MIDFLOW" target="_blank" rel="noreferrer">
                  <span>03 · Windows utility</span>
                  <h3>MIDFLOW</h3>
                  <p>Hold-to-talk voice typing with a native, audio-reactive interface.</p>
                  <Arrow />
                </a>
              </div>
            </div>
          </section>

          <section className="scene scene-next" aria-hidden={scene !== 5}>
            <div className="scene-number">05</div>
            <div className="scene-content next-content">
              <p className="route-label">Next stop · open</p>
              <h2>Now I’m looking for the next hard problem.</h2>
              <p className="scene-copy">Research, master’s thesis, or working-student work in computer vision, machine learning, scientific ML, and intelligent systems.</p>
              <div className="contact-links">
                <a className="primary-contact" href={external.email}>midhunnrd812@gmail.com <Arrow /></a>
                <a href={external.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
                <a href={external.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              </div>
              <p className="language-note">English C1 · German B2 working proficiency · Nuremberg / Erlangen</p>
            </div>
          </section>
        </div>
      </div>

      <div className="road-interface" aria-label="Drive controls">
        <div className="road-progress" aria-hidden="true">
          {sceneNames.map((name, index) => <i key={name} className={index <= scene ? "passed" : ""} />)}
        </div>

        <div
          className={`car ${isDriving ? "driving" : ""} ${facing === -1 ? "reverse" : ""}`}
          style={{ left: `${carX}%` }}
          role="img"
          aria-label="A car moving along the portfolio route"
        >
          <div className="car-roof"><span /><span /></div>
          <div className="car-body"><i className="headlight" /><i className="taillight" /></div>
          <div className="wheel wheel-front" />
          <div className="wheel wheel-back" />
        </div>

        <div className="road-line" aria-hidden="true" />
        <div className="road-status">
          <span>0{scene + 1} / 06</span>
          <b>{sceneNames[scene]}</b>
        </div>
        <div className="drive-controls">
          <button
            type="button"
            aria-label="Drive backward"
            onPointerDown={() => startDriving(-1)}
            onPointerUp={stopDriving}
            onPointerLeave={stopDriving}
            onPointerCancel={stopDriving}
          >
            ← <span>Reverse</span>
          </button>
          <button
            className="drive-forward"
            type="button"
            aria-label="Drive forward"
            onPointerDown={() => startDriving(1)}
            onPointerUp={stopDriving}
            onPointerLeave={stopDriving}
            onPointerCancel={stopDriving}
          >
            <span>Hold to drive</span> →
          </button>
        </div>
      </div>
    </main>
  );
}
