// import { ArrowUpRight, MapPin } from "lucide-react";
// import type { PropertyRecord } from "@/content/properties";
// import { markets } from "@/content/site";

// export function PropertyCard({ property, featured = false }: { property: PropertyRecord; featured?: boolean }) {
//   const market = markets[property.market];

//   return (
//     <article className={`property-card${featured ? " property-card--featured" : ""}`}>
//       <div className="property-card__link">
//         <div className="property-card__image-wrap">
//           <img src={property.images[0]?.src} alt={property.images[0]?.alt ?? "Illustrative architecture"} loading="lazy" />
//           <span className="property-card__demo">Demonstration</span>
//           <span className="property-card__arrow" aria-hidden="true"><ArrowUpRight /></span>
//         </div>
//         <div className="property-card__body">
//           <div className="property-card__meta-row">
//             <span>{property.propertyType}</span>
//             <span>{property.classifications[0]}</span>
//           </div>
//           <h3>{property.name}</h3>
//           <p className="property-card__location"><MapPin aria-hidden="true" />{market.name}, {market.country}</p>
//           <div className="property-card__bottom">
//             <span className="property-card__price">Price not supplied</span>
//             <span className="property-card__currency">{market.currency}</span>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }


import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { PropertyRecord } from "@/content/properties";
import { markets } from "@/content/site";

export function PropertyCard({
  property,
  featured = false,
}: {
  property: PropertyRecord;
  featured?: boolean;
}) {
  const market = markets[property.market];

  const propertyUrl =
    property.market === "pune"
      ? "/locations/pune/properties/$slug"
      : "/locations/dubai/properties/$slug";

  return (
    <article
      className={`property-card${featured ? " property-card--featured" : ""}`}
    >
      <Link
        to={propertyUrl}
        params={{ slug: property.slug }}
        className="property-card__link"
      >
        <div className="property-card__image-wrap">
          <img
            src={property.images[0]?.src}
            alt={property.images[0]?.alt ?? "Illustrative architecture"}
            loading="lazy"
          />

          <span className="property-card__demo">
            Demonstration
          </span>

          <span className="property-card__arrow" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </div>

        <div className="property-card__body">
          <div className="property-card__meta-row">
            <span>{property.propertyType}</span>
            <span>{property.classifications[0]}</span>
          </div>

          <h3>{property.name}</h3>

          <p className="property-card__location">
            <MapPin aria-hidden="true" />
            {market.name}, {market.country}
          </p>

          <div className="property-card__bottom">
            <span className="property-card__price">
              Price not supplied
            </span>

            <span className="property-card__currency">
              {market.currency}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

