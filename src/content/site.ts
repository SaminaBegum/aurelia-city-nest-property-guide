import dubaiImage from "@/assets/aurelia-dubai.webp";
import puneImage from "@/assets/aurelia-pune.webp";

export type MarketId = "dubai" | "pune";

export type PropertyType =
  | "Residential"
  | "Commercial"
  | "Apartments"
  | "Luxury Villas"
  | "Townhouses";

export type PropertyClassification =
  | "New Launch"
  | "Under Construction"
  | "Ready";

export interface MarketContent {
  id: MarketId;
  name: string;
  city: string;
  country: string;
  flag: string;
  currency: "AED" | "INR";
  route: "/locations/dubai" | "/locations/pune";
  image: string;
  imageAlt: string;
  theme: "dark" | "light";
  intro: string;
  description: string;
}

export const brand = {
  name: "Aurelia Real Estate",
  wordmark: "AURELIA",
  tagline: "Beyond Spaces. Beyond Expectations.",
  markets: ["Dubai, UAE", "Pune, Maharashtra, India"],
} as const;

export const markets: Record<MarketId, MarketContent> = {
  dubai: {
    id: "dubai",
    name: "Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    route: "/locations/dubai",
    image: dubaiImage,
    imageAlt: "Illustrative Dubai waterfront architecture",
    theme: "dark",
    intro: "A city shaped by possibility.",
    description:
      "A global address for exceptional architecture, considered living, and an ever-evolving cityscape.",
  },
  pune: {
    id: "pune",
    name: "Pune",
    city: "Pune",
    country: "Maharashtra, India",
    flag: "🇮🇳",
    currency: "INR",
    route: "/locations/pune",
    image: puneImage,
    imageAlt: "Illustrative contemporary residence with landscaped gardens",
    theme: "light",
    intro: "A more considered way to live.",
    description:
      "A distinctive blend of contemporary design, green surroundings, and the energy of a growing city.",
  },
};

export const navigation = [
  { label: "Exclusive Projects", to: "/exclusive-projects" },
  { label: "Properties", to: "/properties" },
  { label: "Services", to: "/property-management" },
  { label: "About Us", to: "/about" },
] as const;

export const homeContent = {
  eyebrow: "AURELIA REAL ESTATE · DUBAI & PUNE",
  headline: "Beyond Spaces. Beyond Expectations.",
  support:
    "A considered collection of homes and commercial spaces in two extraordinary markets.",
  destinations: {
    eyebrow: "OUR MARKETS",
    title: "Two cities. Distinct perspectives.",
    support: "Explore considered property collections in Dubai and Pune.",
  },
  featured: {
    eyebrow: "A FIRST LOOK",
    title: "Selected for a closer look.",
    support: "Illustrative listings only. Property details and pricing have not been supplied.",
  },
  discovery: {
    title: "Find your perspective.",
  },
  approach: {
    eyebrow: "THE AURELIA DIFFERENCE",
    title: "A thoughtful view of every detail.",
  },
  enquiry: {
    eyebrow: "BEGIN A CONVERSATION",
    title: "Tell us what matters to you.",
    support: "Share your interests and choose a market to begin. Enquiries are not connected yet.",
  },
  introduction: {
    eyebrow: "A DIFFERENT PERSPECTIVE",
    title: "The right place changes everything.",
    body: "Aurelia brings an international perspective to exceptional property. We look beyond an address to the architecture, the atmosphere, and the way a place makes you feel.",
  },
  strengths: [
    { number: "01", title: "A considered point of view", detail: "Every detail begins with a deeper understanding of place." },
    { number: "02", title: "Two distinct markets", detail: "One connected perspective across Dubai and Pune." },
    { number: "03", title: "Personal by design", detail: "A thoughtful experience, shaped around what matters to you." },
  ],
  story: {
    eyebrow: "THE AURELIA PERSPECTIVE",
    title: "A place is more than the walls around it.",
    body: "It is the light at the end of the day. The texture of a surface. The quiet confidence of design that feels right. Our perspective starts there — and stays with you through every decision.",
  },
};

export const aboutContent = {
  eyebrow: "OUR APPROACH",
  title: "A more thoughtful view of real estate.",
  body: "Aurelia Real Estate is an international property brand with a presence in Dubai and Pune. We bring a considered perspective to residential and commercial property, placing architecture, setting, and the individual experience at the centre of every conversation.",
  principles: [
    { number: "01", title: "Considered selection", detail: "A clear point of view on place, design, and how spaces are experienced." },
    { number: "02", title: "Local perspective", detail: "Distinct market experiences in Dubai and Pune, connected by one standard of care." },
    { number: "03", title: "A personal relationship", detail: "Space for meaningful questions and informed decisions at every step." },
  ],
};

export const seo = {
  home: { title: "Aurelia Real Estate | Beyond Spaces. Beyond Expectations.", description: "Discover a considered collection of demonstration properties in Dubai and Pune with Aurelia Real Estate." },
  properties: { title: "Properties in Dubai & Pune | Aurelia Real Estate", description: "Explore demonstration residential and commercial property listings across Dubai and Pune." },
  dubai: { title: "Dubai Property | Aurelia Real Estate", description: "Explore Aurelia's Dubai destination experience and illustrative property listings." },
  pune: { title: "Pune Property | Aurelia Real Estate", description: "Explore Aurelia's Pune destination experience and illustrative property listings." },
  about: { title: "About Aurelia Real Estate | Our Perspective", description: "Learn about Aurelia Real Estate's considered approach across Dubai and Pune." },
  contact: { title: "Contact Aurelia Real Estate | Dubai & Pune", description: "Get in touch with Aurelia Real Estate about the Dubai and Pune markets." },
  privacy: { title: "Privacy Policy | Aurelia Real Estate", description: "Read the Aurelia Real Estate privacy policy." },
  terms: { title: "Terms & Conditions | Aurelia Real Estate", description: "Read the terms and conditions for the Aurelia Real Estate website." },
  property: (name: string) => ({ title: `${name} | Aurelia Real Estate`, description: `View illustrative demonstration listing details for ${name}.` }),
} as const;

export const footerContent = {
  note: "A considered perspective on property across Dubai and Pune.",
  disclosure: "Demonstration content only. Property information, pricing, and availability have not been supplied.",
  legal: [
    { label: "Privacy policy", to: "/privacy-policy" },
    { label: "Terms & conditions", to: "/terms" },
  ] as const,
};