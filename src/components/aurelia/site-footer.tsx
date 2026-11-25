
import { brand, footerContent, markets, navigation } from "@/content/site";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import aureliaLogo from "@/assets/logo.png";
const navigationAnchors = {
  "/": "#home",
  "/properties": "#discovery",
  "/about": "#about",
  "/contact": "#contact",
} as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">

        {/* Top CTA */}
        <div className="site-footer__cta">
          <div>
            <span className="site-footer__eyebrow">
              YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h2>
              Find a place <em>to belong.</em>
            </h2>
          </div>

          <a href="#contact" className="site-footer__cta-button">
            START A CONVERSATION
            <ArrowUpRight size={19} />
          </a>
        </div>

        {/* Main Footer */}
        <div className="site-footer__main">

          {/* Brand */}
          <div className="site-footer__brand">
         
<a
  className="brand-lockup brand-lockup--footer"
  href="/#/"
  aria-label={`${brand.name} home`}
>
  <img
    className="brand"
    src={aureliaLogo}
    alt="Aurelia Real Estate Logo"
  />


</a>


            <p className="site-footer__tagline">
              {brand.tagline}
            </p>

            <p className="site-footer__note">
              {footerContent.note}
            </p>

            <div className="site-footer__socials">
              <a href="#contact" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="#contact" aria-label="LinkedIn">
                <Linkedin size={17} />
              </a>
              <a href="#contact" aria-label="Facebook">
                <Facebook size={17} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="site-footer__column">
            <h3>EXPLORE</h3>
            {navigation.map((item) => (
              <a
                key={item.to}
                href={navigationAnchors[item.to]}
              >
                {item.label}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>

          {/* Markets */}
          <div className="site-footer__column">
            <h3>OUR MARKETS</h3>
            {Object.values(markets).map((market) => (
              <a key={market.id} href="#destinations">
                <span className="site-footer__market-flag">
                  {market.flag}
                </span>
                {market.name}, {market.country}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="site-footer__column site-footer__column--contact">
            <h3>LET'S CONNECT</h3>

            <p>
              Looking for a property or planning your next investment?
              We'd love to hear from you.
            </p>

            <a
              className="site-footer__contact-link"
              href="#contact"
            >
              Contact Aurelia
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="site-footer__bottom">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>

          <p>{footerContent.disclosure}</p>

          <div className="site-footer__legal">
            {footerContent.legal.map((item) => (
              <a key={item.to} href={item.to}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
