import commercialImage from "@/assets/aurelia-commercial.webp";
import dubaiImage from "@/assets/aurelia-dubai.webp";
import puneImage from "@/assets/aurelia-pune.webp";
import residentialImage from "@/assets/aurelia-residential.webp";
import type { MarketId, PropertyClassification, PropertyType } from "./site";




export interface PropertyRecord {
  id: string;
  slug: string;
  name: string;
  market: MarketId;
  city: string;
  country: string;
  area: string | null;
  propertyType: PropertyType;
  classifications: PropertyClassification[];
  description: string;
  images: { src: string; alt: string }[];
  price: number | null;
  currency: "AED" | "INR";
  bedrooms: number | null;
  bathrooms: number | null;
  areaSize: number | null;
  areaUnit: string | null;
  amenities: string[];
  featured: boolean;
  status: string;
  completionStatus: PropertyClassification;
}

// Legacy demonstration records are no longer used by the listing repository.
// The live listing records are converted into PropertyRecord format there.



const markets = [
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", currency: "AED", cityImage: dubaiImage },
  { id: "pune", city: "Pune", country: "Maharashtra, India", currency: "INR", cityImage: puneImage },
] as const;

function createMarketProperties(market: (typeof markets)[number]): PropertyRecord[] {
  return (["Residential", "Commercial"] as const).flatMap((propertyType) =>
    Array.from({ length: 10 }, (_, index): PropertyRecord => {
      const number = String(index + 1).padStart(2, "0");
      const listingKind = propertyType === "Residential" ? "Residence" : "Commercial space";
      const classification: PropertyClassification = index % 2 === 0 ? "New Launch" : "Under Construction";
      const image = propertyType === "Residential" ? residentialImage : commercialImage;
      const slug = `${market.id}-demonstration-${propertyType.toLowerCase()}-${number}`;

      return {
        id: slug,
        slug,
        name: `${market.city} Demonstration ${listingKind} ${number}`,
        market: market.id,
        city: market.city,
        country: market.country,
        area: null,
        propertyType,
        classifications: [classification],
        description:
          "Illustrative demonstration entry only. Property details, pricing, and availability have not been supplied.",
        images: [
          { src: image, alt: "Illustrative architecture image; not a photograph of a specific property" },
          { src: market.cityImage, alt: "Illustrative market architecture; not a photograph of a specific property" },
        ],
        price: null,
        currency: market.currency,
        bedrooms: null,
        bathrooms: null,
        areaSize: null,
        areaUnit: null,
        amenities: [],
        featured: index < 2,
        status: "Demonstration",
        completionStatus: classification,
      };
    }),
  );
}

export const demoProperties: PropertyRecord[] = markets.flatMap(createMarketProperties);