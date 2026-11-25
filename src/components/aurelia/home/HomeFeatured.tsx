
// import { homeContent } from "@/content/site";
// import { useMarket } from "@/hooks/use-market";
// import { propertyRepository } from "@/services/property-repository";
// import { PropertyCard } from "@/components/aurelia/property-card";

// export function HomeFeatured() {
//   const { market } = useMarket();

//   const featured = propertyRepository
//     .listFeatured(market)
//     .slice(0, 3);

//   return (
//     <section
//       className="home-featured section-wrap"
//       aria-labelledby="featured-title"
//     >
//       <div className="section-heading section-heading--split">
//         <div>
//           <p className="eyebrow">
//             {homeContent.featured.eyebrow}
//           </p>

//           <h2 id="featured-title">
//             {homeContent.featured.title}
//           </h2>
//         </div>

//         <p>{homeContent.featured.support}</p>
//       </div>

//       <div className="property-grid property-grid--home">
//         {featured.map((property, index) => (
//           <PropertyCard
//             key={property.id}
//             property={property}
//             featured={index === 0}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

import { homeContent } from "@/content/site";
import { useMarket } from "@/hooks/use-market";
import { propertyRepository } from "@/services/property-repository";
import { FeaturedPropertyCard } from "./FeaturedPropertyCard";

import "./home-featured.css";

export function HomeFeatured() {
  const { market } = useMarket();

  const featured = propertyRepository
    .listFeatured(market)
    .slice(0, 3);

  return (
    <section
      className="home-featured section-wrap"
      aria-labelledby="featured-title"
    >
      <div className="featured-property-heading">
        <div>
          <span className="featured-property-eyebrow">
            {homeContent.featured.eyebrow}
          </span>

          <h2 id="featured-title">
            {homeContent.featured.title}
          </h2>
        </div>

        <p>{homeContent.featured.support}</p>
      </div>

      <div className="featured-property-grid">
        {featured.map((property) => (
          <FeaturedPropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}
