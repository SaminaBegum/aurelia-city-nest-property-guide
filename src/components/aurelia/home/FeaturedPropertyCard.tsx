
import {
  ArrowUpRight,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { PropertyRecord } from "@/content/properties";

interface FeaturedPropertyCardProps {
  property: PropertyRecord;
}

export function FeaturedPropertyCard({
  property,
}: FeaturedPropertyCardProps) {
  const propertyUrl =
    property.market === "pune"
      ? "/locations/pune/properties/$slug"
      : "/locations/dubai/properties/$slug";

  const formattedPrice =
    typeof property.price === "number"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: property.currency,
          maximumFractionDigits: 0,
        }).format(property.price)
      : "Price on request";

  return (
    <article className="featured-property-card">
      <Link
        to={propertyUrl}
        params={{ slug: property.slug }}
        className="featured-property-card__link"
      >
        <div className="featured-property-card__image">
          <img
            src={property.images[0]?.src}
            alt={
              property.images[0]?.alt ??
              property.name
            }
            loading="lazy"
          />

          <span className="featured-property-card__badge">
            Featured Residence
          </span>

          <span className="featured-property-card__arrow">
            <ArrowUpRight size={19} />
          </span>
        </div>

        <div className="featured-property-card__content">
          <div className="featured-property-card__type">
            <span>{property.propertyType}</span>
            <span>{property.classifications[0]}</span>
          </div>

          <h3>{property.name}</h3>

          <p className="featured-property-card__location">
            <MapPin size={15} />
            {property.city}, {property.country}
          </p>

          <div className="featured-property-card__specs">
            {property.bedrooms != null && (
              <span>
                <BedDouble size={15} />
                {property.bedrooms} Beds
              </span>
            )}

            {property.bathrooms != null && (
              <span>
                <Bath size={15} />
                {property.bathrooms} Baths
              </span>
            )}

            {property.areaSize != null && (
              <span>
                <Ruler size={15} />
                {property.areaSize} {property.areaUnit}
              </span>
            )}
          </div>

          <div className="featured-property-card__footer">
            <div>
              <span className="featured-property-card__price-label">
                Property Price
              </span>
              <strong>{formattedPrice}</strong>
            </div>

            <span className="featured-property-card__view">
              Explore Property
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
