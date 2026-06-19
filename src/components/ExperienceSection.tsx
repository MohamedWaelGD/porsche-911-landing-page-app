import {
  ArrowRight,
  CalendarBlank,
  CarProfile,
  Engine,
  FlagCheckered,
  Gauge,
  GlobeHemisphereWest,
  Leaf,
  Plus,
  Quotes,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  SteeringWheel,
  Trophy,
} from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experienceStats = [
  { icon: CalendarBlank, value: "75+", label: "Years", detail: "of passion" },
  { icon: Trophy, value: "30,000+", label: "Race wins", detail: "and counting" },
  { icon: GlobeHemisphereWest, value: "80+", label: "Markets", detail: "worldwide" },
];

const experienceCards = [
  {
    icon: Engine,
    title: "Iconic Engineering",
    copy: "Precision built engines that push the limits of performance and reliability.",
  },
  {
    icon: CarProfile,
    title: "Timeless Design",
    copy: "Every curve, every line, crafted with purpose. Form follows performance.",
  },
  {
    icon: FlagCheckered,
    title: "Race-Bred Technology",
    copy: "Born on the track. Perfected for the road. Engineered for winners.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromised Quality",
    copy: "The highest standards. The finest materials. Built to last.",
  },
  {
    icon: Leaf,
    title: "Sustainable Future",
    copy: "Driving innovation for a better tomorrow. Performance with purpose.",
  },
];

const experienceBenefits = [
  {
    icon: Gauge,
    title: "Pure Performance",
    copy: "Unmatched power meets everyday usability.",
  },
  {
    icon: SteeringWheel,
    title: "Emotional Connection",
    copy: "More than driving. It's a feeling that stays with you.",
  },
  {
    icon: Star,
    title: "Exclusive Experience",
    copy: "Designed for a select few. Delivered with exceptional care.",
  },
  {
    icon: SlidersHorizontal,
    title: "Personalized To You",
    copy: "Make it yours. Because no two drivers are the same.",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(".experience-kicker, .experience-title, .experience-copy", { autoAlpha: 0, y: 24 });
      gsap.set(".experience-stat, .experience-card, .benefit-item, .experience-quote, .experience-link", {
        autoAlpha: 0,
        y: 26,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .to(".experience-kicker", {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .to(
          ".experience-title, .experience-copy",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.35",
        )
        .to(
          ".experience-stat",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.45",
        )
        .to(
          ".experience-card",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.74,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.15",
        )
        .to(
          ".experience-quote, .benefit-item, .experience-link",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.25",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      <div className="experience-shell">
        <div className="experience-topline">
          <div className="experience-heading">
            <p className="experience-kicker">Crafted for those who demand more</p>
            <h2 className="experience-title">
              Driven by
              <br />
              Innovation<span>.</span>
            </h2>
          </div>
          <p className="experience-copy">
            At Porsche, innovation is never an option, it&apos;s our obsession. From the racetrack to the road, every breakthrough is engineered to deliver an unparalleled driving experience.
          </p>
          <div className="experience-stats" aria-label="Porsche experience stats">
            {experienceStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="experience-stat" key={stat.label}>
                  <Icon size={28} weight="light" aria-hidden="true" />
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.detail}</small>
                </div>
              );
            })}
          </div>
        </div>

        <div className="experience-card-grid">
          {experienceCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="experience-card" key={card.title}>
                <Icon size={38} weight="light" aria-hidden="true" />
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Plus size={20} weight="light" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <div className="experience-bottomline">
          <blockquote className="experience-quote">
            <Quotes size={30} weight="fill" aria-hidden="true" />
            <p>A Porsche is not just a car. It&apos;s a statement of who you are and how you drive the world.</p>
            <cite>- Ferry Porsche</cite>
          </blockquote>

          <div className="experience-benefits">
            {experienceBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div className="benefit-item" key={benefit.title}>
                  <span>
                    <Icon size={31} weight="light" aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{benefit.title}</strong>
                    <p>{benefit.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <a className="experience-link" href="#models">
          Begin your Porsche journey
          <span aria-hidden="true" />
          <ArrowRight size={20} weight="light" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
