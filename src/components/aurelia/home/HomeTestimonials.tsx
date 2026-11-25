
import { ArrowUpRight, Quote, Star } from "lucide-react";
import "./home-testimonials.css";

const testimonials = [
  {
    quote:
      "The entire experience felt thoughtful and effortless. The team understood exactly what we were looking for and helped us discover a property that truly felt right.",
    name: "Aarav Mehta",
    role: "Property Buyer",
    location: "Mumbai",
    initials: "AM",
  },
  {
    quote:
      "What stood out was the attention to detail and the quality of guidance throughout the process. Every conversation felt personal, clear and professional.",
    name: "Ananya Kapoor",
    role: "Residential Investor",
    location: "Pune",
    initials: "AK",
  },
  {
    quote:
      "A refreshing approach to real estate. From the first interaction to exploring the right opportunities, everything felt carefully considered.",
    name: "Rohan Malhotra",
    role: "Homeowner",
    location: "Bengaluru",
    initials: "RM",
  },
];

export function HomeTestimonials() {
  return (
    <section
      className="home-testimonials"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="home-testimonials__container">

        <div className="home-testimonials__header">
          <div className="home-testimonials__heading">
            <span className="home-testimonials__eyebrow">
              CLIENT EXPERIENCES
            </span>

            <h2 id="testimonials-title">
              Stories That <span>Speak</span> for Themselves.
            </h2>
          </div>

          <p className="home-testimonials__intro">
            Every property journey is personal. Discover what our
            clients value about the Aurelia experience.
          </p>
        </div>

        <div className="home-testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <article
              className="testimonial-card"
              key={testimonial.name}
            >
              <div className="testimonial-card__top">
                <Quote
                  className="testimonial-card__quote-icon"
                  size={30}
                  strokeWidth={1.2}
                />

                <div
                  className="testimonial-card__stars"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  ))}
                </div>
              </div>

              <p className="testimonial-card__quote">
                “{testimonial.quote}”
              </p>

              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">
                  {testimonial.initials}
                </div>

                <div className="testimonial-card__person">
                  <h3>{testimonial.name}</h3>
                  <span>{testimonial.role}</span>
                  <small>{testimonial.location}</small>
                </div>

                <span className="testimonial-card__number">
                  0{index + 1}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="home-testimonials__bottom">
          <span>BUILT ON TRUST. DEFINED BY EXPERIENCE.</span>

          <a href="#contact">
            START YOUR JOURNEY
            <ArrowUpRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
