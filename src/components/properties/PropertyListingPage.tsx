

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowUpRight,
  X,
  RotateCcw,
} from "lucide-react";

import { Link } from "@tanstack/react-router";
import { useMarket } from "@/hooks/use-market";
import listingHero from "../../assets/listing-page.jpeg";
import {
  dubaiProperties,
  puneProperties,
} from "@/content/listing-properties";

import "./PropertyListingPage.css";

const propertyTypes = [
  "Luxury Villas",
  "Apartments",
  "Townhouses",
];

const amenityOptions = [
  "Swimming Pool",
  "Parking",
  "Gym",
  "Garden",
  "Balcony",
];

export function PropertyListingPage() {
  const { market } = useMarket();
  const isDubai = market === "dubai";

  const properties = isDubai ? dubaiProperties : puneProperties;

  const locations = isDubai
    ? [
        "Dubai Marina",
        "Downtown Dubai",
        "Palm Jumeirah",
        "Jumeirah Village Circle",
      ]
    : [
        "Baner",
        "Koregaon Park",
        "Hinjawadi",
        "Wakad",
        "Kalyani Nagar",
      ];

  const currency = isDubai ? "AED" : "INR";

  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(isDubai ? "en-AE" : "en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);

  const toggleValue = (
    value: string,
    selected: string[],
    setter: (values: string[]) => void,
  ) => {
    setter(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedAmenities([]);
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setSortBy("featured");
  };

  const filteredProperties = useMemo(() => {
    const result = properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(property.type);

      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(property.location);

      const matchesAmenities = selectedAmenities.every((amenity) =>
        property.amenities.includes(amenity),
      );

      const matchesMinPrice =
        minPrice === "" || property.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || property.price <= Number(maxPrice);

      const matchesMinArea =
        minArea === "" || property.area >= Number(minArea);

      const matchesMaxArea =
        maxArea === "" || property.area <= Number(maxArea);

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesAmenities &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinArea &&
        matchesMaxArea
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === "featured") {
      result.sort(
        (a, b) => Number(b.featured) - Number(a.featured),
      );
    }

    return result;
  }, [
    properties,
    search,
    selectedTypes,
    selectedLocations,
    selectedAmenities,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    sortBy,
  ]);

  return (
    <main className="property-listing">
      {/* <section className="property-listing__hero">
        <span className="property-listing__eyebrow">
          AURELIA REAL ESTATE
        </span>

        <h1>
          Discover Exceptional
          <br />
          <em>Properties.</em>
        </h1>

        <p>
          Explore handpicked residences and investment opportunities
          across {isDubai ? "Dubai" : "Pune"}.
        </p>

        <div className="property-listing__search">
          <Search size={19} />

          <input
            type="search"
            placeholder="Search property or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </div>
      </section> */}


<section
  className="property-listing__hero"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(15, 19, 20, 0.58),
        rgba(15, 19, 20, 0.65)
      ),
      url(${listingHero})
    `,
  }}
>
  <div className="property-listing__hero-content">
    <span className="property-listing__eyebrow">
      AURELIA REAL ESTATE
    </span>

    <h1>
      Discover Exceptional
      <br />
      <em>Properties.</em>
    </h1>

    <p>
      Explore handpicked residences and investment opportunities
      across {isDubai ? "Dubai" : "Pune"}.
    </p>

    <div className="property-listing__search">
      <Search size={19} />

      <input
        type="search"
        placeholder="Search property or location..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
    </div>
  </div>
</section>


      <section className="property-listing__layout">
        <button
          className="property-listing__mobile-filter"
          type="button"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <SlidersHorizontal size={17} />
          Filters
          <span>
            {selectedTypes.length +
              selectedLocations.length +
              selectedAmenities.length}
          </span>
        </button>

        <aside
          className={`property-filters ${
            filterOpen ? "property-filters--open" : ""
          }`}
        >
          <div className="property-filters__heading">
            <h3>FILTERS</h3>

            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>

          <div className="property-filter">
            <h4>Property Type</h4>

            {propertyTypes.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() =>
                    toggleValue(type, selectedTypes, setSelectedTypes)
                  }
                />
                {type}
              </label>
            ))}
          </div>

          <div className="property-filter">
            <h4>Location</h4>

            {locations.map((location) => (
              <label key={location}>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() =>
                    toggleValue(
                      location,
                      selectedLocations,
                      setSelectedLocations,
                    )
                  }
                />
                {location}
              </label>
            ))}
          </div>

          <div className="property-filter">
            <h4>Area Size (sq. ft.)</h4>

            <div className="property-filter__range">
              <input
                type="number"
                placeholder="Min area"
                value={minArea}
                onChange={(event) => setMinArea(event.target.value)}
              />

              <input
                type="number"
                placeholder="Max area"
                value={maxArea}
                onChange={(event) => setMaxArea(event.target.value)}
              />
            </div>
          </div>

          <div className="property-filter">
            <h4>Price Range ({currency})</h4>

            <div className="property-filter__range">
              <input
                type="number"
                placeholder="Minimum"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />

              <input
                type="number"
                placeholder="Maximum"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>
          </div>

          <div className="property-filter">
            <h4>Features & Amenities</h4>

            {amenityOptions.map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() =>
                    toggleValue(
                      amenity,
                      selectedAmenities,
                      setSelectedAmenities,
                    )
                  }
                />
                {amenity}
              </label>
            ))}
          </div>

          <div className="property-filters__actions">
            <button
              type="button"
              className="property-filters__clear"
              onClick={clearFilters}
            >
              <RotateCcw size={14} />
              Clear All
            </button>

            <button
              type="button"
              className="property-filters__apply"
              onClick={() => setFilterOpen(false)}
            >
              Show {filteredProperties.length} Results
            </button>
          </div>
        </aside>

        <div className="property-results">
          <div className="property-results__top">
            <div>
              <span className="property-results__eyebrow">
                EXPLORE {isDubai ? "DUBAI" : "PUNE"}
              </span>

              <h2>Properties in {isDubai ? "Dubai" : "Pune"}</h2>

              <p>
                Discover properties selected for exceptional living
                and investment.
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort properties"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {(selectedTypes.length > 0 ||
            selectedLocations.length > 0 ||
            selectedAmenities.length > 0) && (
            <div className="property-results__chips">
              {[
                ...selectedTypes,
                ...selectedLocations,
                ...selectedAmenities,
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}

              <button type="button" onClick={clearFilters}>
                Clear All
              </button>
            </div>
          )}

          <div className="property-results__count">
            Showing {filteredProperties.length} properties
          </div>

          {filteredProperties.length > 0 ? (
            <div className="property-grid">
              {filteredProperties.map((property) => {
                const propertySlug = property.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");

                const propertyUrl = isDubai
                  ? "/locations/dubai/properties/$slug"
                  : "/locations/pune/properties/$slug";

                const propertyParams = { slug: propertySlug };

                return (
                  <article className="property-card" key={property.id}>
                    <Link
                      to={propertyUrl}
                      params={propertyParams}
                      className="property-card__image"
                    >
                      <img
                        src={property.image}
                        alt={property.name}
                        loading="lazy"
                      />

                      <span className="property-card__location">
                        <MapPin size={13} />
                        {property.location}
                      </span>

                      <span className="property-card__status">
                        {property.status}
                      </span>

                      {property.featured && (
                        <span className="property-card__featured">
                          FEATURED
                        </span>
                      )}

                      <span className="property-card__view">
                        <ArrowUpRight size={20} />
                      </span>
                    </Link>

                    <div className="property-card__content">
                      <span className="property-card__type">
                        {property.type}
                      </span>

                      <h3>{property.name}</h3>

                      <div className="property-card__specs">
                        <span>
                          <BedDouble size={15} />
                          {property.bedrooms} Beds
                        </span>

                        <span>
                          <Bath size={15} />
                          {property.bathrooms} Baths
                        </span>

                        <span>
                          <Maximize size={15} />
                          {property.area.toLocaleString()} sq. ft.
                        </span>
                      </div>

                      <div className="property-card__price">
                        <span>Starting from</span>
                        <strong>{formatPrice(property.price)}</strong>
                      </div>

                      <Link
                        to={propertyUrl}
                        params={propertyParams}
                        className="property-card__details"
                      >
                        VIEW PROPERTY
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="property-results__empty">
              <Search size={32} />
              <h3>No properties found</h3>
              <p>
                Try adjusting your filters or searching another location.
              </p>
              <button type="button" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
