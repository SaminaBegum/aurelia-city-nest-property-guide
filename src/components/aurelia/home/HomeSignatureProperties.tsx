
import { ArrowUpRight, MapPin, MoveUpRight } from "lucide-react";
import "./home-signature-properties.css";

const signatureProperties = [
  {
    id: "01",
    name: "The Aurelia Residence",
    location: "Mumbai, India",
    type: "PRIVATE RESIDENCE",
    description:
      "A considered expression of contemporary architecture, generous spaces and refined living.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Contemporary luxury residence with elegant architectural details",
    featured: true,
  },
  {
    id: "02",
    name: "The Skyline Estate",
    location: "Pune, India",
    type: "MODERN LIVING",
    description:
      "A sophisticated home designed around light, openness and everyday comfort.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Modern luxury home with a warm and refined interior",
    featured: false,
  },
  {
    id: "03",
    name: "The Garden Retreat",
    location: "Bengaluru, India",
    type: "PRIVATE COLLECTION",
    description:
      "A peaceful architectural escape where natural surroundings meet modern design.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Luxury residence surrounded by greenery",
    featured: false,
  },
];

export function HomeSignatureProperties() {
  const featuredProperty = signatureProperties[0];
  const secondaryProperties = signatureProperties.slice(1);

  return (
    <section
      className="home-signature"
      id="signature-properties"
      aria-labelledby="home-signature-title"
    >
      <div className="home-signature__container">

        <div className="home-signature__header">
          <div>
            <span className="home-signature__eyebrow">
              THE AURELIA COLLECTION
            </span>

            <h2 id="home-signature-title">
              Exceptional Spaces.
              <br />
              <span>Distinctive Living.</span>
            </h2>
          </div>

          <p className="home-signature__intro">
            A curated selection of remarkable properties,
            chosen for their character, architecture and
            sense of place.
          </p>
        </div>

        <div className="home-signature__layout">

          {/* Featured Property */}

          <article className="signature-featured">
            <a
              href="#contact"
              className="signature-featured__image-link"
              aria-label={`Enquire about ${featuredProperty.name}`}
            >
              <img
                src={featuredProperty.image}
                alt={featuredProperty.imageAlt}
                loading="lazy"
              />

              <span className="signature-featured__tag">
                SIGNATURE PROPERTY
              </span>

              <span className="signature-featured__image-arrow">
                <ArrowUpRight size={22} />
              </span>
            </a>

            <div className="signature-featured__details">
              <div className="signature-featured__info">
                <span>{featuredProperty.type}</span>
                <h3>{featuredProperty.name}</h3>
                <p>
                  <MapPin size={14} />
                  {featuredProperty.location}
                </p>
                <p className="signature-featured__description">
                  {featuredProperty.description}
                </p>
              </div>

              <a
                href="#contact"
                className="signature-property__link"
              >
                ENQUIRE
                <MoveUpRight size={16} />
              </a>
            </div>
          </article>

          {/* Secondary Properties */}

          <div className="home-signature__side">
            {secondaryProperties.map((property) => (
              <article
                className="signature-secondary"
                key={property.id}
              >
                <a
                  href="#contact"
                  className="signature-secondary__image-link"
                  aria-label={`Enquire about ${property.name}`}
                >
                  <img
                    src={property.image}
                    alt={property.imageAlt}
                    loading="lazy"
                  />

                  <span className="signature-secondary__number">
                    {property.id}
                  </span>

                  <span className="signature-secondary__arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </a>

                <div className="signature-secondary__details">
                  <div>
                    <span>{property.type}</span>
                    <h3>{property.name}</h3>
                    <p>
                      <MapPin size={13} />
                      {property.location}
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="signature-secondary__enquire"
                    aria-label={`Enquire about ${property.name}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>

        <div className="home-signature__footer">
          <span>THOUGHTFULLY CURATED. DISTINCTIVELY AURELIA.</span>

          <a href="#contact">
            DISCOVER YOUR PROPERTY
            <ArrowUpRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
