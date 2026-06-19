import { Globe, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";

const footerColumns = [
  {
    title: "Models",
    links: ["911 Carrera", "911 Turbo", "911 GT3", "911 Targa", "Compare Models"],
  },
  {
    title: "Explore",
    links: ["Design", "Performance", "Technology", "Porsche Experience", "Motorsport"],
  },
  {
    title: "Owners",
    links: ["Porsche Services", "Warranty & Care", "Porsche Approved", "Accessories", "Owner's Manual"],
  },
  {
    title: "About",
    links: ["Our Heritage", "Sustainability", "Company", "Careers", "Newsroom"],
  },
  {
    title: "Support",
    links: ["Contact Us", "FAQ", "Find a Dealer", "Test Drive", "Brochures"],
  },
];

const socialLinks = [
  { label: "Instagram", icon: InstagramLogo },
  { label: "YouTube", icon: YoutubeLogo },
  { label: "LinkedIn", icon: LinkedinLogo },
];

const legalLinks = ["Privacy Policy", "Legal Notice", "Cookie Policy", "Accessibility"];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-logo" href="#hero" aria-label="Porsche home">
            PORSCHE<sup>®</sup>
          </a>
          <p>
            Timeless design. Relentless performance.
            <br />
            The 911 is more than a car, it&apos;s an icon of driving perfection.
          </p>
          <div className="footer-socials" aria-label="Social links">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a href="#hero" key={social.label} aria-label={social.label}>
                  <Icon size={24} weight="fill" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {footerColumns.map((column) => (
          <nav className="footer-column" key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
            {column.links.map((link) => (
              <a href="#hero" key={link}>
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© 2024 Dr. Ing. h.c. F. Porsche AG. All rights reserved.</p>
        <div className="footer-legal">
          {legalLinks.map((link) => (
            <a href="#hero" key={link}>
              {link}
            </a>
          ))}
          <a className="country-link" href="#hero">
            <Globe size={22} weight="light" aria-hidden="true" />
            Change Country
          </a>
        </div>
      </div>
    </footer>
  );
}
