
import image1 from "@/assets/1.jpeg";
import image2 from "@/assets/2.jpeg";
import image3 from "@/assets/3.jpeg";
import image4 from "@/assets/4.jpeg";

export type Property = {
  id: number;
  name: string;
  location: string;
  type: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  image: string;
  featured?: boolean;
  amenities: string[];
};

export const dubaiProperties: Property[] = [
  {
    id: 1,
    name: "Azure Heights Luxury Residences",
    location: "Dubai Marina",
    type: "Apartments",
    price: 160000,
    area: 1250,
    bedrooms: 2,
    bathrooms: 2,
    status: "Ready",
    image: image1,
    featured: true,
    amenities: ["Swimming Pool", "Parking", "Balcony"],
  },
  {
    id: 2,
    name: "Palm Signature Villas",
    location: "Palm Jumeirah",
    type: "Luxury Villas",
    price: 850000,
    area: 3200,
    bedrooms: 4,
    bathrooms: 4,
    status: "New Launch",
    image: image2,
    amenities: ["Swimming Pool", "Garden", "Parking"],
  },
  {
    id: 3,
    name: "The Grand Marina Residence",
    location: "Dubai Marina",
    type: "Apartments",
    price: 240000,
    area: 1650,
    bedrooms: 3,
    bathrooms: 3,
    status: "Ready",
    image: image3,
    amenities: ["Balcony", "Parking", "Gym"],
  },
  {
    id: 4,
    name: "Downtown Elite Living",
    location: "Downtown Dubai",
    type: "Apartments",
    price: 350000,
    area: 1800,
    bedrooms: 3,
    bathrooms: 2,
    status: "Under Construction",
    image: image4,
    amenities: ["Swimming Pool", "Gym", "Parking"],
  },
  {
    id: 5,
    name: "Garden View Residences",
    location: "Jumeirah Village Circle",
    type: "Townhouses",
    price: 190000,
    area: 1450,
    bedrooms: 3,
    bathrooms: 3,
    status: "Ready",
    image: image2,
    amenities: ["Garden", "Balcony", "Parking"],
  },
  {
    id: 6,
    name: "Skyline Premium Homes",
    location: "Downtown Dubai",
    type: "Luxury Villas",
    price: 650000,
    area: 2800,
    bedrooms: 4,
    bathrooms: 4,
    status: "New Launch",
    image: image1,
    amenities: ["Swimming Pool", "Gym", "Balcony"],
  },
];

export const puneProperties: Property[] = [
  {
    id: 7,
    name: "Aurelia Grand Residences",
    location: "Baner",
    type: "Apartments",
    price: 12500000,
    area: 1450,
    bedrooms: 3,
    bathrooms: 3,
    status: "Ready",
    image: image1,
    featured: true,
    amenities: ["Swimming Pool", "Parking", "Gym"],
  },
  {
    id: 8,
    name: "The Elite Villa Collection",
    location: "Koregaon Park",
    type: "Luxury Villas",
    price: 35000000,
    area: 3200,
    bedrooms: 4,
    bathrooms: 4,
    status: "New Launch",
    image: image2,
    amenities: ["Swimming Pool", "Garden", "Parking"],
  },
  {
    id: 9,
    name: "Skyline Premium Apartments",
    location: "Hinjawadi",
    type: "Apartments",
    price: 8500000,
    area: 1100,
    bedrooms: 2,
    bathrooms: 2,
    status: "Ready",
    image: image3,
    amenities: ["Gym", "Parking", "Balcony"],
  },
  {
    id: 10,
    name: "Green Valley Residences",
    location: "Wakad",
    type: "Townhouses",
    price: 16000000,
    area: 1900,
    bedrooms: 3,
    bathrooms: 3,
    status: "Under Construction",
    image: image4,
    amenities: ["Garden", "Swimming Pool", "Parking"],
  },
  {
    id: 11,
    name: "The Aurelia Penthouse",
    location: "Kalyani Nagar",
    type: "Luxury Villas",
    price: 42000000,
    area: 3500,
    bedrooms: 4,
    bathrooms: 4,
    status: "New Launch",
    image: image2,
    amenities: ["Swimming Pool", "Balcony", "Gym"],
  },
  {
    id: 12,
    name: "Urban Heights",
    location: "Baner",
    type: "Apartments",
    price: 10500000,
    area: 1300,
    bedrooms: 3,
    bathrooms: 2,
    status: "Ready",
    image: image1,
    amenities: ["Parking", "Gym", "Balcony"],
  },
];
