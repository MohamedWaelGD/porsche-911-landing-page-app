import { ArrowUpRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_SEQUENCES = [
  { path: "/frames/intro-car", count: 241 },
  { path: "/frames/intro-car-2", count: 181 },
  { path: "/frames/intro-car-3", count: 181 },
];

type HeroStat = {
  label: string;
  value: string;
  unit: string;
  count: number;
  decimals?: number;
};

type DetailStat = {
  title: string;
  value: string;
  subtitle: string;
  count?: number;
  decimals?: number;
  suffix?: string;
};

const heroStats: HeroStat[] = [
  { label: "Power (up to)", value: "640", unit: "PS", count: 640 },
  { label: "0-100 KM/H", value: "2.7", unit: "S", count: 2.7, decimals: 1 },
  { label: "Top speed", value: "330", unit: "KM/H", count: 330 },
];

const engineeringStats: DetailStat[] = [
  {
    title: "PARTS",
    value: "1,428",
    subtitle: "PRECISION COMPONENTS",
    count: 1428,
  },
  {
    title: "PRECISION",
    value: "0.01 mm",
    subtitle: "MANUFACTURING TOLERANCE",
    count: 0.01,
    decimals: 2,
    suffix: " mm",
  },
  {
    title: "DEVELOPMENT",
    value: "7 YRS",
    subtitle: "OF ENGINEERING",
    count: 7,
    suffix: " YRS",
  },
  {
    title: "TESTING",
    value: "1.6M KM",
    subtitle: "REAL WORLD TESTING",
    count: 1.6,
    decimals: 1,
    suffix: "M KM",
  },
];

const performanceStats: DetailStat[] = [
  {
    title: "640 PS",
    value: "",
    subtitle: "MAX POWER",
    count: 640,
    suffix: " PS",
  },
  {
    title: "2.7 s",
    value: "",
    subtitle: "0-100 KM/H",
    count: 2.7,
    decimals: 1,
    suffix: " s",
  },
  {
    title: "330 KM/H",
    value: "",
    subtitle: "TOP SPEED",
    count: 330,
    suffix: " KM/H",
  },
  { title: "AWD", value: "", subtitle: "INTELLIGENT SYSTEM" },
];

const performanceFeatures = [
  ["TWIN-TURBO POWER", "Unleashing 640 PS of pure performance."],
  ["PRECISE HANDLING", "Engineered for ultimate control."],
  ["POWERFUL BRAKING", "Confidence in every situation."],
  ["DRIVER FOCUSED", "Everything you need. Nothing you don't."],
];

const navItems = [
  { label: "Models", step: 1 },
  { label: "Design", step: 2 },
  { label: "Performance", step: 3 },
  { label: "Experience", step: 4 },
];

function frameSrc(path: string, index: number) {
  return `${path}/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

function drawCover(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const canvasRatio = canvas.width / canvas.height;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let drawWidth: number;
  let drawHeight: number;
  let x = 0;
  let y = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = canvas.height;
    drawWidth = drawHeight * imageRatio;
    x = (canvas.width - drawWidth) / 2;
  } else {
    drawWidth = canvas.width;
    drawHeight = drawWidth / imageRatio;
    y = (canvas.height - drawHeight) / 2;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function formatCounter(value: number, decimals = 0, suffix = "") {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${formatted}${suffix}`;
}

function LoadingScreen({ progress, hidden }: { progress: number; hidden: boolean }) {
  return (
    <div className={`loading-screen ${hidden ? "is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="loading-orbit" aria-label={`Loading ${progress}%`}>
        <div className="loading-spinner" />
        <span>{progress}%</span>
      </div>
    </div>
  );
}

function PorscheLogo() {
  return (
    <a className="brand-wordmark" href="#hero" aria-label="Porsche home">
      PORSCHE
    </a>
  );
}

function Header({ onNavigate }: { onNavigate: (step: number) => void }) {
  return (
    <header className="site-header hero-reveal">
      <PorscheLogo />
      <span className="nav-divider" aria-hidden="true" />
      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            href={`#${item.label.toLowerCase()}`}
            key={item.label}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.step);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <button className="menu-button" type="button" aria-label="Open menu">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} />
        ))}
      </button>
    </header>
  );
}

function AnimatedTitle({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <span className="title-line" key={line}>
          {Array.from(line).map((letter, index) => (
            <span className="title-letter" key={`${line}-${index}`}>
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

function StatCard({ label, value, unit, count, decimals = 0 }: HeroStat) {
  return (
    <div className="hero-stat">
      <span>{label}</span>
      <strong className="count-up" data-count={count} data-decimals={decimals}>
        {value}
      </strong>
      <small>{unit}</small>
    </div>
  );
}

function DetailStatCard({
  title,
  value,
  subtitle,
  count,
  decimals = 0,
  suffix = "",
}: DetailStat) {
  const countAttributes =
    count === undefined
      ? {}
      : {
          className: "count-up",
          "data-count": count,
          "data-decimals": decimals,
          "data-suffix": suffix,
        };

  return (
    <div className="detail-stat">
      <span {...(!value ? countAttributes : {})}>{title}</span>
      {value ? <strong {...countAttributes}>{value}</strong> : null}
      <small>{subtitle}</small>
    </div>
  );
}

export function PorscheHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[][]>([]);
  const frameRefs = useRef(FRAME_SEQUENCES.map(() => ({ frame: 0 })));
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToStep = (step: number) => {
    if (step === 4) {
      document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (!sectionRef.current) return;

    const sectionTop = sectionRef.current.offsetTop;
    const scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
    const progressPoint = step === 1 ? 0 : step === 2 ? 0.36 : 0.68;

    window.scrollTo({
      top: sectionTop + scrollRange * progressPoint,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let loadedFrames = 0;
    let cancelled = false;
    const totalFrames = FRAME_SEQUENCES.reduce((total, sequence) => total + sequence.count, 0);
    const images = FRAME_SEQUENCES.map((sequence) =>
      Array.from({ length: sequence.count }, (_, index) => {
        const image = new Image();
        image.src = frameSrc(sequence.path, index + 1);
        image.onload = image.onerror = () => {
          if (cancelled) return;
          loadedFrames += 1;
          setProgress(Math.round((loadedFrames / totalFrames) * 100));
          if (loadedFrames === totalFrames) {
            setIsLoaded(true);
          }
        };
        return image;
      }),
    );

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvases = canvasRefs.current.filter(Boolean) as HTMLCanvasElement[];
    if (!isLoaded || !sectionRef.current || canvases.length !== 3) return;

    const images = imagesRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setCanvasSize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvases.forEach((canvas, index) => {
        canvas.width = Math.round(window.innerWidth * pixelRatio);
        canvas.height = Math.round(window.innerHeight * pixelRatio);
        drawCover(canvas, images[index][Math.round(frameRefs.current[index].frame)]);
      });
    };

    setCanvasSize();

    const ctx = gsap.context(() => {
      const animateCounters = (selector: string) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((counter) => {
          const target = Number(counter.dataset.count);
          if (Number.isNaN(target) || counter.dataset.counted === "true") return;

          counter.dataset.counted = "true";
          const decimals = Number(counter.dataset.decimals || 0);
          const suffix = counter.dataset.suffix || "";
          const state = { value: 0 };

          gsap.to(state, {
            value: target,
            duration: 1.2,
            ease: "power3.out",
            onUpdate: () => {
              counter.textContent = formatCounter(state.value, decimals, suffix);
            },
          });
        });
      };

      gsap.set(".hero-reveal", { autoAlpha: 0, y: 26 });
      gsap.set(".story-panel", { autoAlpha: 0, y: 26 });
      gsap.set(".story-panel[data-panel='1']", { autoAlpha: 1, y: 0 });
      gsap.set(".hero-stat, .detail-stat", { autoAlpha: 0, y: 22 });
      gsap.set(
        ".story-panel[data-panel='1'] .hero-kicker, .story-panel[data-panel='1'] .hero-copy, .story-panel[data-panel='1'] .hero-cta",
        { autoAlpha: 0, y: 18 },
      );
      gsap.set(".title-letter", { autoAlpha: 0, rotateX: -54, yPercent: 76 });
      gsap.set(".hero-canvas", { autoAlpha: 0 });
      gsap.set(".hero-canvas[data-sequence='1']", { autoAlpha: 1 });
      gsap.set(".progress-step[data-step='1']", { color: "#fff" });
      gsap.to(".hero-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2,
      });
      gsap.to(".hero-stat", {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.11,
        delay: 0.42,
      });
      gsap.delayedCall(0.48, () => animateCounters(".hero-stats .count-up"));
      gsap.to(".story-panel[data-panel='1'] .title-letter", {
        autoAlpha: 1,
        rotateX: 0,
        yPercent: 0,
        duration: 0.82,
        ease: "power3.out",
        stagger: 0.025,
        delay: 0.34,
      });
      gsap.to(
        ".story-panel[data-panel='1'] .hero-kicker, .story-panel[data-panel='1'] .hero-copy, .story-panel[data-panel='1'] .hero-cta",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.88,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2,
        },
      );

      if (!reduceMotion) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        FRAME_SEQUENCES.forEach((sequence, index) => {
          timeline.to(
            frameRefs.current[index],
            {
              frame: sequence.count - 1,
              duration: 1 / 3,
              ease: "none",
              onUpdate: () => {
                const image = images[index][Math.round(frameRefs.current[index].frame)];
                if (image?.complete) drawCover(canvases[index], image);
              },
            },
            index / 3,
          );
        });

        timeline
          .to(".progress-fill", { scaleY: 1, duration: 1, ease: "none" }, 0)
          .to(".story-panel[data-panel='1']", { autoAlpha: 0, y: -22, duration: 0.12 }, 0.22)
          .to(".hero-stats", { autoAlpha: 0, y: 22, duration: 0.12 }, 0.2)
          .to(".hero-canvas[data-sequence='1']", { autoAlpha: 0, duration: 0.12 }, 0.3)
          .to(".hero-canvas[data-sequence='2']", { autoAlpha: 1, duration: 0.12 }, 0.3)
          .to(".story-panel[data-panel='2']", { autoAlpha: 1, y: 0, duration: 0.14 }, 0.34)
          .to(
            ".story-panel[data-panel='2'] .title-letter",
            { autoAlpha: 1, rotateX: 0, yPercent: 0, duration: 0.16, stagger: 0.006 },
            0.36,
          )
          .to(".engineering-stats", { autoAlpha: 1, y: 0, duration: 0.14 }, 0.4)
          .to(
            ".engineering-stats .detail-stat",
            { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.025 },
            0.42,
          )
          .call(() => animateCounters(".engineering-stats .count-up"), undefined, 0.43)
          .to(".progress-step[data-step='2']", { color: "#fff", duration: 0.08 }, 0.34)
          .to(".story-panel[data-panel='2']", { autoAlpha: 0, y: -22, duration: 0.12 }, 0.62)
          .to(".engineering-stats", { autoAlpha: 0, y: 22, duration: 0.12 }, 0.62)
          .to(".hero-canvas[data-sequence='2']", { autoAlpha: 0, duration: 0.12 }, 0.64)
          .to(".hero-canvas[data-sequence='3']", { autoAlpha: 1, duration: 0.12 }, 0.64)
          .to(".story-panel[data-panel='3']", { autoAlpha: 1, y: 0, duration: 0.14 }, 0.68)
          .to(
            ".story-panel[data-panel='3'] .title-letter",
            { autoAlpha: 1, rotateX: 0, yPercent: 0, duration: 0.16, stagger: 0.006 },
            0.7,
          )
          .to(".performance-stats", { autoAlpha: 1, y: 0, duration: 0.14 }, 0.72)
          .to(
            ".performance-stats .detail-stat",
            { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.025 },
            0.74,
          )
          .call(() => animateCounters(".performance-stats .count-up"), undefined, 0.75)
          .to(".progress-step[data-step='3']", { color: "#fff", duration: 0.08 }, 0.68);
      }
    }, sectionRef);

    window.addEventListener("resize", setCanvasSize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ctx.revert();
    };
  }, [isLoaded]);

  return (
    <>
      <LoadingScreen progress={progress} hidden={isLoaded} />
      <section className="hero-scroll-section" id="hero" ref={sectionRef}>
        <div className="hero-sticky-stage">
          {FRAME_SEQUENCES.map((sequence, index) => (
            <canvas
              className="hero-canvas"
              data-sequence={index + 1}
              key={sequence.path}
              ref={(node) => {
                canvasRefs.current[index] = node;
              }}
              aria-hidden="true"
            />
          ))}
          <div className="hero-scrim" />
          <Header onNavigate={scrollToStep} />

          <main className="hero-content">
            <div className="story-panel hero-reveal" data-panel="1" id="models">
              <p className="hero-kicker">Engineered for legends</p>
              <h1 className="hero-title">
                <AnimatedTitle lines={["Built", "from", "obsession."]} />
              </h1>
              <p className="hero-copy">
                Every curve, every detail, every piece. We don&apos;t just build cars, we perfect relentless performance.
              </p>
              <a className="hero-cta" href="#models">
                Explore 911 Turbo
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>

            <div className="story-panel" data-panel="2" id="design">
              <p className="hero-kicker">PRECISION IN EVERY DETAIL</p>
              <h2 className="hero-title">
                <AnimatedTitle lines={["Engineered", "to", "perfection."]} />
              </h2>
              <p className="hero-copy">
                Every component. Every curve. Every millimeter.
                <br />
                <br />
                The 911 is more than a car. It&apos;s the result of relentless engineering and an obsession with perfection.
              </p>
              <a className="hero-cta" href="#engineering">
                Explore engineering
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>

            <div className="story-panel performance-panel" data-panel="3">
              <p className="hero-kicker">PERFORMANCE THAT DEFINES</p>
              <h2 className="hero-title">
                <AnimatedTitle lines={["Built for", "relentless", "drive."]} />
              </h2>
              <p className="hero-copy hidden sm:block">
                The 911 Turbo combines iconic design with cutting-edge engineering. Every drive is a masterclass in power, control, and emotion.
              </p>
              <div className="feature-grid" aria-label="Performance features">
                {performanceFeatures.map(([title, copy]) => (
                  <div className="feature-item" key={title}>
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </div>
                ))}
              </div>
              <a className="hero-cta" href="#performance">
                Discover performance
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </main>

          <aside className="slide-index hero-reveal" aria-label="Section progress">
            <button className="progress-step" data-step="1" type="button" onClick={() => scrollToStep(1)}>
              01
            </button>
            <i>
              <b className="progress-fill" />
            </i>
            <button className="progress-step" data-step="2" type="button" onClick={() => scrollToStep(2)}>
              02
            </button>
            <button className="progress-step" data-step="3" type="button" onClick={() => scrollToStep(3)}>
              03
            </button>
          </aside>

          <div className="scroll-cue hero-reveal" aria-hidden="true">
            <span />
            <p>Scroll to discover</p>
          </div>

          <div className="hero-stats hero-reveal" aria-label="911 Turbo performance statistics">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="detail-stats engineering-stats" id="engineering">
            {engineeringStats.map((stat) => (
              <DetailStatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="detail-stats performance-stats" id="performance">
            {performanceStats.map((stat) => (
              <DetailStatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
