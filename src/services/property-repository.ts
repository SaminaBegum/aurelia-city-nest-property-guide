// // import { demoProperties, type PropertyRecord } from "@/content/properties";
// // import type { MarketId, PropertyClassification, PropertyType } from "@/content/site";

// // export interface PropertySearchFilters {
// //   market: MarketId;
// //   query?: string;
// //   propertyType?: PropertyType | "All";
// //   classifications?: PropertyClassification[];
// //   featuredOnly?: boolean;
// // }

// // export interface PropertyRepository {
// //   listByMarket(market: MarketId): PropertyRecord[];
// //   listFeatured(market: MarketId): PropertyRecord[];
// //   getBySlug(slug: string): PropertyRecord | undefined;
// //   search(filters: PropertySearchFilters): PropertyRecord[];
// // }

// // export function filterProperties(
// //   records: PropertyRecord[],
// //   filters: PropertySearchFilters,
// // ): PropertyRecord[] {
// //   const query = filters.query?.trim().toLocaleLowerCase() ?? "";

// //   return records.filter((property) => {
// //     if (property.market !== filters.market) return false;
// //     if (filters.featuredOnly && !property.featured) return false;
// //     if (filters.propertyType && filters.propertyType !== "All" && property.propertyType !== filters.propertyType) {
// //       return false;
// //     }
// //     if (filters.classifications?.length && !filters.classifications.some((tag) => property.classifications.includes(tag))) {
// //       return false;
// //     }
// //     if (
// //       query &&
// //       !`${property.name} ${property.city} ${property.country} ${property.area ?? ""}`
// //         .toLocaleLowerCase()
// //         .includes(query)
// //     ) {
// //       return false;
// //     }
// //     return true;
// //   });
// // }

// // export const propertyRepository: PropertyRepository = {
// //   listByMarket: (market) => demoProperties.filter((property) => property.market === market),
// //   listFeatured: (market) => filterProperties(demoProperties, { market, featuredOnly: true }),
// //   getBySlug: (slug) => demoProperties.find((property) => property.slug === slug),
// //   search: (filters) => filterProperties(demoProperties, filters),
// // };

// import { demoProperties, type PropertyRecord } from "@/content/properties";
// import type {
//   MarketId,
//   PropertyClassification,
//   PropertyType,
// } from "@/content/site";

// export interface PropertySearchFilters {
//   market: MarketId;
//   query?: string;
//   propertyType?: PropertyType | "All";
//   classifications?: PropertyClassification[];
//   featuredOnly?: boolean;
// }

// export interface PropertyRepository {
//   listByMarket(market: MarketId): PropertyRecord[];
//   listFeatured(market: MarketId): PropertyRecord[];
//   getBySlug(market: MarketId, slug: string): PropertyRecord | undefined;
//   search(filters: PropertySearchFilters): PropertyRecord[];
// }

// export function filterProperties(
//   records: PropertyRecord[],
//   filters: PropertySearchFilters,
// ): PropertyRecord[] {
//   const query = filters.query?.trim().toLocaleLowerCase() ?? "";

//   return records.filter((property) => {
//     if (property.market !== filters.market) return false;

//     if (filters.featuredOnly && !property.featured) return false;

//     if (
//       filters.propertyType &&
//       filters.propertyType !== "All" &&
//       property.propertyType !== filters.propertyType
//     ) {
//       return false;
//     }

//     if (
//       filters.classifications?.length &&
//       !filters.classifications.some((tag) =>
//         property.classifications.includes(tag)
//       )
//     ) {
//       return false;
//     }

//     if (
//       query &&
//       !`${property.name} ${property.city} ${property.country} ${property.area ?? ""}`
//         .toLocaleLowerCase()
//         .includes(query)
//     ) {
//       return false;
//     }

//     return true;
//   });
// }

// export const propertyRepository: PropertyRepository = {
//   listByMarket: (market) =>
//     demoProperties.filter((property) => property.market === market),

//   listFeatured: (market) =>
//     filterProperties(demoProperties, {
//       market,
//       featuredOnly: true,
//     }),

//   getBySlug: (market, slug) =>
//     demoProperties.find(
//       (property) =>
//         property.market === market &&
//         property.slug === slug
//     ),

//   search: (filters) =>
//     filterProperties(demoProperties, filters),
// };

import {
  dubaiProperties,
  puneProperties,
  type Property as ListingProperty,
} from "@/content/listing-properties";

import type { PropertyRecord } from "@/content/properties";

import {
  markets,
  type MarketId,
  type PropertyClassification,
  type PropertyType,
} from "@/content/site";

export interface PropertySearchFilters {
  market: MarketId;
  query?: string;
  propertyType?: PropertyType | "All";
  classifications?: PropertyClassification[];
  featuredOnly?: boolean;
}

export interface PropertyRepository {
  listByMarket(market: MarketId): PropertyRecord[];
  listFeatured(market: MarketId): PropertyRecord[];
  getBySlug(market: MarketId, slug: string): PropertyRecord | undefined;
  search(filters: PropertySearchFilters): PropertyRecord[];
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function convertListing(
  property: ListingProperty,
  market: MarketId,
): PropertyRecord {
  const marketContent = markets[market];
  const classification =
    property.status as PropertyClassification;

  return {
    id: `${market}-${property.id}`,
    slug: createSlug(property.name),
    name: property.name,
    market,
    city: marketContent.city,
    country: marketContent.country,
    area: property.location,
    propertyType: property.type as PropertyType,
    classifications: [classification],
    description: `${property.name} is a ${property.type.toLowerCase()} property located in ${property.location}, ${marketContent.city}. It offers ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms and ${property.area} sq.ft. of space. Contact our team for further details and availability.`,
    images: [
      {
        src: property.image,
        alt: `${property.name} in ${property.location}`,
      },
    ],
    price: property.price,
    currency: marketContent.currency,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    areaSize: property.area,
    areaUnit: "sq.ft.",
    amenities: property.amenities,
    featured: Boolean(property.featured),
    status: property.status,
    completionStatus: classification,
  };
}

const allProperties: PropertyRecord[] = [
  ...dubaiProperties.map((property) =>
    convertListing(property, "dubai"),
  ),
  ...puneProperties.map((property) =>
    convertListing(property, "pune"),
  ),
];

export function filterProperties(
  records: PropertyRecord[],
  filters: PropertySearchFilters,
): PropertyRecord[] {
  const query = filters.query?.trim().toLowerCase();

  return records.filter((property) => {
    if (property.market !== filters.market) return false;

    if (
      filters.featuredOnly &&
      !property.featured
    ) {
      return false;
    }

    if (
      filters.propertyType &&
      filters.propertyType !== "All" &&
      property.propertyType !== filters.propertyType
    ) {
      return false;
    }

    if (
      filters.classifications?.length &&
      !filters.classifications.some((classification) =>
        property.classifications.includes(classification),
      )
    ) {
      return false;
    }

    if (
      query &&
      ![
        property.name,
        property.area ?? "",
        property.city,
        property.propertyType,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    ) {
      return false;
    }

    return true;
  });
}

export const propertyRepository: PropertyRepository = {
  listByMarket: (market) =>
    allProperties.filter((property) => property.market === market),

  listFeatured: (market) =>
    filterProperties(allProperties, {
      market,
      featuredOnly: true,
    }),

  getBySlug: (market, slug) =>
    allProperties.find(
      (property) =>
        property.market === market &&
        property.slug === slug,
    ),

  search: (filters) =>
    filterProperties(allProperties, filters),
};
