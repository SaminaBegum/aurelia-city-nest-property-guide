

import { ArrowUpRight } from "lucide-react";

import architectureImage from "@/assets/1.jpeg";
import residentialImage from "@/assets/2.jpeg";
import interiorImage from "@/assets/3.jpeg";
import urbanImage from "@/assets/4.jpeg";
import "@/styles/home-what-we-do.css";
const services = [
  {
    number: "01",
    title: "Luxury Residential Properties",
    description:
      "Discover exceptional homes, premium apartments and exclusive residences designed for elevated living.",
    image: architectureImage,
  },
  {
    number: "02",
    title: "Commercial Real Estate",
    description:
      "Explore premium commercial spaces, offices and business properties in strategic locations.",
    image: residentialImage,
  },
  {
    number: "03",
    title: "Property Investment",
    description:
      "Unlock valuable real estate opportunities with expert market insights and personalised investment guidance.",
    image: interiorImage,
  },
  {
    number: "04",
    title: "Property Management",
    description:
      "Enjoy seamless property ownership with professional leasing, tenant coordination and property management solutions.",
    image: urbanImage,
  },
];

export function HomeWhatWeDo() {
  return (
    <section className="what-we-do">
      <div className="what-we-do__container">

        {/* Section Heading */}
        <div className="what-we-do__heading">
          <div className="what-we-do__heading-left">
            <span className="what-we-do__eyebrow">
              OUR REAL ESTATE SERVICES
            </span>

            <h2>
              What We <em>Offer.</em>
            </h2>
          </div>

          <p>
            From finding your dream property to making strategic
            real estate investments, we bring expertise, opportunities
            and personalised guidance together to make every property
            journey exceptional.
          </p>
        </div>

        {/* Services Grid */}
        <div className="what-we-do__grid">
          {services.map((service) => (
            <article
              className="what-we-do__card"
              key={service.number}
            >
              <div className="what-we-do__image">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />

                <div className="what-we-do__image-overlay" />

                <span className="what-we-do__number">
                  {service.number}
                </span>

                <a
                  href="/#/properties"
                  className="what-we-do__arrow"
                  aria-label={`Explore ${service.title}`}
                >
                  <ArrowUpRight size={21} />
                </a>
              </div>

              <div className="what-we-do__card-content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="what-we-do__footer">
          <span>
            YOUR PROPERTY JOURNEY. OUR EXPERTISE.
          </span>

          <a href="/#/contact">
            EXPLORE PROPERTIES
            <ArrowUpRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
