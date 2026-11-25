
import { ArrowUpRight, Check } from "lucide-react";
import { homeContent } from "@/content/site";
import interiorImage from "@/assets/aurelia-residential.webp";
import "@/styles/home-introduction.css";
const services = [
  "Architecture Design",
  "Residential Design",
  "Interior Design",
  "Urban Codes Design",
];

export function HomeIntroduction() {
  return (
    <section
      className="home-introduction"
      id="introduction"
      aria-labelledby="introduction-title"
    >
      <div className="home-introduction__container">

        {/* Section Heading */}
        <div className="home-introduction__heading">
          <p className="home-introduction__eyebrow">
            {homeContent.introduction.eyebrow || "ABOUT US"}
          </p>

          <h2 id="introduction-title">
            {homeContent.introduction.title}
          </h2>
        </div>

        {/* Main Content */}
        <div className="home-introduction__content">

          {/* Left Content */}
          <div className="home-introduction__copy">

            <p className="home-introduction__lead">
              {homeContent.introduction.body}
            </p>

            <p className="home-introduction__description">
              We believe every space should tell a story. Our approach
              combines thoughtful architecture, refined interiors and
              attention to detail to create spaces that reflect your
              lifestyle and vision.
            </p>

            {/* Services */}
            <div className="home-introduction__services">
              {services.map((service) => (
                <div
                  className="home-introduction__service"
                  key={service}
                >
                  <span className="home-introduction__check">
                    <Check size={19} strokeWidth={2} />
                  </span>

                  <span>{service}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a className="home-introduction__button" href="#about">
              EXPLORE US
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* Right Image */}
          <div className="home-introduction__visual">

            <div className="home-introduction__image-wrap">
              <img
                src={interiorImage}
                alt="Contemporary residential architecture and interior design"
                loading="lazy"
              />
            </div>

            {/* Experience Badge */}
            <div className="home-introduction__experience">
              <strong>15<span>+</span></strong>
              <p>Professional<br />Experienced</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
