
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
  ArrowDown,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Search,
  MapPin,
  Home,
  IndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/site";

import heroImage from "@/assets/hero-bg.jpg";
import interiorImage from "@/assets/aurelia-residential.webp";

const slides = [
  {
    image: heroImage,
    eyebrow: homeContent.eyebrow,
    headline: homeContent.headline,
    support: homeContent.support,
    alt: "Luxury residential property architecture",
  },
  {
    image: interiorImage,
    eyebrow: "EXCLUSIVE DEVELOPMENTS",
    headline: "Discover Spaces Designed for Living",
    support:
      "Explore thoughtfully designed properties that bring comfort, elegance and lasting value.",
    alt: "Contemporary residential interior design",
  },
];

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Property Search States
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  // Next Slide
  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  // Automatic Slider
  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  // Property Search Handler
  const handlePropertySearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (propertyType) {
      params.set("type", propertyType);
    }

    if (budget) {
      params.set("budget", budget);
    }

    const query = params.toString();

    const targetUrl = query
      ? `${window.location.pathname}?${query}#discovery`
      : `${window.location.pathname}#discovery`;

    window.location.assign(targetUrl);
  };

  const slide = slides[activeSlide];

  return (
    <section
      className="home-hero"
      id="home"
      aria-label="Featured luxury properties"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
    >
      {/* Background Slider */}
      <div className="home-hero__slides">
        {slides.map((item, index) => (
          <div
            key={index}
            className={`home-hero__slide ${
              activeSlide === index ? "is-active" : ""
            }`}
            aria-hidden={activeSlide !== index}
          >
            <img
              src={item.image}
              alt={item.alt}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>

      {/* Image Overlays */}
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="home-hero__grain" aria-hidden="true" />

      {/* Main Content */}
      <div className="home-hero__container">
        <div className="home-hero__content" key={activeSlide}>
          <div className="home-hero__eyebrow-wrap">
            <span className="home-hero__eyebrow-line" />

            <p className="eyebrow home-hero__eyebrow">
              {slide.eyebrow}
            </p>
          </div>

          <h1 id="home-title">{slide.headline}</h1>

        

          {/* Hero Actions */}
          <div className="home-hero__actions">
            <Button asChild className="button-light home-hero__primary">
              <a href="#discovery">
                Explore properties
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Button>

            <a className="home-hero__text-link" href="#contact">
              <span>Enquire now</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          {/* Property Search Bar */}
          <form
            className="property-search"
            onSubmit={handlePropertySearch}
          >
            {/* Location */}
            <div className="property-search__field">
              <MapPin size={20} aria-hidden="true" />

              <div className="property-search__input-wrap">
                <label htmlFor="property-location">
                  LOCATION
                </label>

                <input
                  id="property-location"
                  type="text"
                  placeholder="Enter city or location"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="property-search__field">
              <Home size={20} aria-hidden="true" />

              <div className="property-search__input-wrap">
                <label htmlFor="property-type">
                  PROPERTY TYPE
                </label>

                <select
                  id="property-type"
                  value={propertyType}
                  onChange={(event) =>
                    setPropertyType(event.target.value)
                  }
                >
                  <option value="">All Properties</option>
                  <option value="residential">Residential</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="property-search__field">
              <IndianRupee size={20} aria-hidden="true" />

              <div className="property-search__input-wrap">
                <label htmlFor="property-budget">
                  YOUR BUDGET
                </label>

                <select
                  id="property-budget"
                  value={budget}
                  onChange={(event) =>
                    setBudget(event.target.value)
                  }
                >
                  <option value="">Any Budget</option>
                  <option value="0-5000000">Under ₹50 Lakh</option>
                  <option value="5000000-10000000">
                    ₹50 Lakh - ₹1 Crore
                  </option>
                  <option value="10000000-20000000">
                    ₹1 - ₹2 Crore
                  </option>
                  <option value="20000000-50000000">
                    ₹2 - ₹5 Crore
                  </option>
                  <option value="50000000+">Above ₹5 Crore</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="property-search__button"
            >
              <Search size={19} aria-hidden="true" />
              <span>SEARCH</span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="home-hero__bottom">
        <a className="home-hero__scroll" href="#introduction">
          <span className="home-hero__scroll-icon">
            <ArrowDown size={15} aria-hidden="true" />
          </span>

          <span>Scroll to discover</span>
        </a>

        {/* Slider Controls */}
        <div className="home-hero__slider-controls">
          <span className="home-hero__counter" aria-live="polite">
            <strong>0{activeSlide + 1}</strong>
            <span className="home-hero__counter-divider">/</span>
            0{slides.length}
          </span>

          <div className="home-hero__progress">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`home-hero__progress-item ${
                  activeSlide === index ? "is-active" : ""
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  activeSlide === index ? "true" : undefined
                }
              />
            ))}
          </div>

          <button
            type="button"
            className="home-hero__arrow"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            className="home-hero__arrow"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}


// import { useEffect, useState } from "react";
// import type { FormEvent } from "react";

// import {
//   ArrowDown,
//   ArrowUpRight,
//   ArrowLeft,
//   ArrowRight,
//   Search,
//   MapPin,
//   Home,
//   IndianRupee,
// } from "lucide-react";

// import heroImage from "@/assets/hero-bg.jpg";
// import interiorImage from "@/assets/aurelia-residential.webp";
// import "@/styles/home-hero.css";
// const slides = [
//   {
//     image: heroImage,
//     headline: "HOMES SHAPED BY LIGHT.",
//     description:
//       "EXCEPTIONAL RESIDENCES FOR A MORE HUMAN TOMORROW.",
//     alt: "Luxury contemporary residence with swimming pool",
//   },
//   {
//     image: interiorImage,
//     headline: "SPACES MADE FOR LIVING.",
//     description:
//       "DISCOVER THOUGHTFULLY DESIGNED HOMES WITH LASTING VALUE.",
//     alt: "Elegant contemporary residential interior",
//   },
// ];

// export function HomeHero() {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const [location, setLocation] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [budget, setBudget] = useState("");

//   const slide = slides[activeSlide];

//   const nextSlide = () => {
//     setActiveSlide((current) => (current + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setActiveSlide(
//       (current) => (current - 1 + slides.length) % slides.length
//     );
//   };

//   useEffect(() => {
//     if (isPaused) return;

//     const interval = window.setInterval(() => {
//       setActiveSlide((current) => (current + 1) % slides.length);
//     }, 6500);

//     return () => window.clearInterval(interval);
//   }, [isPaused]);

//   const handlePropertySearch = (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     const params = new URLSearchParams();

//     if (location.trim()) {
//       params.set("location", location.trim());
//     }

//     if (propertyType) {
//       params.set("type", propertyType);
//     }

//     if (budget) {
//       params.set("budget", budget);
//     }

//     const query = params.toString();

//     const targetUrl = query
//       ? `${window.location.pathname}?${query}#discovery`
//       : `${window.location.pathname}#discovery`;

//     window.location.assign(targetUrl);
//   };

//   return (
//     <section
//       className="luxury-hero"
//       id="home"
//       aria-label="Featured luxury residences"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onFocus={() => setIsPaused(true)}
//       onBlur={(event) => {
//         if (
//           !event.currentTarget.contains(
//             event.relatedTarget as Node
//           )
//         ) {
//           setIsPaused(false);
//         }
//       }}
//     >
//       <div className="luxury-hero__container">

//         {/* MAIN HERO */}

//         <div className="luxury-hero__main">

//           {/* LEFT CONTENT */}

//           <div
//             className="luxury-hero__content"
//             key={activeSlide}
//           >
//             <span className="luxury-hero__gold-line" />

//             <h1>
//               {slide.headline}
//             </h1>

//             <p className="luxury-hero__description">
//               {slide.description}
//             </p>

//             <a
//               href="#discovery"
//               className="luxury-hero__primary-btn"
//             >
//               EXPLORE PROPERTIES
//               <ArrowRight size={19} />
//             </a>

//             <a
//               href="#contact"
//               className="luxury-hero__secondary-link"
//             >
//               Enquire about a property
//               <ArrowRight size={16} />
//             </a>
//           </div>

//           {/* RIGHT HERO IMAGE */}

//           <div className="luxury-hero__visual">

//             {slides.map((item, index) => (
//               <img
//                 key={index}
//                 src={item.image}
//                 alt={item.alt}
//                 className={
//                   activeSlide === index
//                     ? "luxury-hero__slide active"
//                     : "luxury-hero__slide"
//                 }
//                 fetchPriority={
//                   index === 0 ? "high" : "auto"
//                 }
//               />
//             ))}

//             <div className="luxury-hero__visual-top">
//               <span>PLACES</span>
//               <span>PEOPLE</span>
//               <span>BELONG</span>
//             </div>

//             <div className="luxury-hero__visual-caption">
//               THOUGHTFULLY
//               <br />
//               DESIGNED SPACES
//             </div>

//           </div>
//         </div>

//         {/* LOWER EDITORIAL SECTION */}

//         <div className="luxury-hero__editorial">

//           {/* INTERIOR IMAGE */}

//           <div className="luxury-hero__interior">

//             <img
//               src={interiorImage}
//               alt="Beautiful luxury living room"
//             />

//             <div className="luxury-hero__interior-label">
//               <span>ELEVATED</span>
//               <span>LIVING</span>
//               <span>NATURALLY</span>
//             </div>

//             <span className="luxury-hero__interior-line" />

//           </div>

//           {/* STATISTICS */}

//           <div className="luxury-hero__statistics">

//             <div className="luxury-hero__stat">
//               <strong>01</strong>
//               <span>DISCOVER</span>
//               <span>HOMES</span>
//             </div>

//             <div className="luxury-hero__stat">
//               <strong>02</strong>
//               <span>EXPLORE</span>
//               <span>SPACES</span>
//             </div>

//           </div>

//           {/* ARCHITECTURAL DETAIL */}

//           <div className="luxury-hero__detail">

//             <img
//               src={heroImage}
//               alt="Natural architectural textures"
//             />

//             <div className="luxury-hero__detail-text">
//               <span>LIGHT</span>
//               <span>SPACE</span>
//               <span>PEOPLE</span>
//               <span>PLACE</span>
//               <i />
//             </div>

//           </div>

//         </div>

//         {/* PROPERTY SEARCH */}

//         <form
//           className="luxury-search"
//           onSubmit={handlePropertySearch}
//         >

//           {/* LOCATION */}

//           <div className="luxury-search__field">
//             <MapPin size={21} />

//             <div className="luxury-search__input">
//               <label htmlFor="property-location">
//                 LOCATION
//               </label>

//               <input
//                 id="property-location"
//                 type="text"
//                 placeholder="Enter city or location"
//                 value={location}
//                 onChange={(event) =>
//                   setLocation(event.target.value)
//                 }
//               />
//             </div>
//           </div>

//           {/* PROPERTY TYPE */}

//           <div className="luxury-search__field">
//             <Home size={21} />

//             <div className="luxury-search__input">
//               <label htmlFor="property-type">
//                 PROPERTY TYPE
//               </label>

//               <select
//                 id="property-type"
//                 value={propertyType}
//                 onChange={(event) =>
//                   setPropertyType(event.target.value)
//                 }
//               >
//                 <option value="">All Properties</option>
//                 <option value="residential">Residential</option>
//                 <option value="apartment">Apartment</option>
//                 <option value="villa">Villa</option>
//                 <option value="penthouse">Penthouse</option>
//                 <option value="commercial">Commercial</option>
//               </select>
//             </div>
//           </div>

//           {/* BUDGET */}

//           <div className="luxury-search__field">
//             <IndianRupee size={21} />

//             <div className="luxury-search__input">
//               <label htmlFor="property-budget">
//                 YOUR BUDGET
//               </label>

//               <select
//                 id="property-budget"
//                 value={budget}
//                 onChange={(event) =>
//                   setBudget(event.target.value)
//                 }
//               >
//                 <option value="">Any Budget</option>
//                 <option value="0-5000000">
//                   Under ₹50 Lakh
//                 </option>
//                 <option value="5000000-10000000">
//                   ₹50 Lakh - ₹1 Crore
//                 </option>
//                 <option value="10000000-20000000">
//                   ₹1 - ₹2 Crore
//                 </option>
//                 <option value="20000000-50000000">
//                   ₹2 - ₹5 Crore
//                 </option>
//                 <option value="50000000+">
//                   Above ₹5 Crore
//                 </option>
//               </select>
//             </div>
//           </div>

//           {/* SEARCH BUTTON */}

//           <button
//             type="submit"
//             className="luxury-search__button"
//           >
//             <Search size={20} />
//             SEARCH
//           </button>

//         </form>

//         {/* BOTTOM FOOTER */}

//         <div className="luxury-hero__footer">

//           <a
//             href="#introduction"
//             className="luxury-hero__scroll"
//           >
//             <ArrowDown size={19} />
//             SCROLL TO DISCOVER
//           </a>

//           <div className="luxury-hero__controls">

//             <span className="luxury-hero__counter">
//               0{activeSlide + 1}
//               <span>/</span>
//               0{slides.length}
//             </span>

//             <div className="luxury-hero__progress">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   className={
//                     activeSlide === index ? "active" : ""
//                   }
//                   onClick={() => setActiveSlide(index)}
//                   aria-label={`Go to slide ${index + 1}`}
//                   aria-current={
//                     activeSlide === index ? "true" : undefined
//                   }
//                 />
//               ))}
//             </div>

//             <button
//               type="button"
//               aria-label="Previous slide"
//               onClick={prevSlide}
//             >
//               <ArrowLeft size={19} />
//             </button>

//             <button
//               type="button"
//               aria-label="Next slide"
//               onClick={nextSlide}
//             >
//               <ArrowRight size={19} />
//             </button>

//           </div>

//           <div className="luxury-hero__copyright">
//             <span />
//             © ALL RIGHTS RESERVED.
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }
