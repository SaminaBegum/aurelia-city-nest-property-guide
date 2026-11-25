import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarket } from "@/hooks/use-market";
import { markets, type MarketId, type PropertyClassification, type PropertyType } from "@/content/site";
import { propertyRepository } from "@/services/property-repository";
import { PropertyCard } from "./property-card";

const typeOptions: (PropertyType | "All")[] = ["All", "Residential", "Commercial"];
const classificationOptions: PropertyClassification[] = ["New Launch", "Under Construction"];

interface PropertyExplorerProps {
  marketOverride?: MarketId;
  maxItems?: number;
  heading?: string;
  compact?: boolean;
}

export function PropertyExplorer({ marketOverride, maxItems, heading, compact = false }: PropertyExplorerProps) {
  const { market: preferredMarket, setMarket } = useMarket();
  const market = marketOverride ?? preferredMarket;
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | "All">("All");
  const [classifications, setClassifications] = useState<PropertyClassification[]>([]);
  const results = useMemo(() => propertyRepository.search({ market, query, propertyType, classifications }), [market, query, propertyType, classifications]);
  const visibleResults = maxItems ? results.slice(0, maxItems) : results;
  const marketContent = markets[market];
  const hasFilters = query.trim().length > 0 || propertyType !== "All" || classifications.length > 0;

  const toggleClassification = (classification: PropertyClassification) => {
    setClassifications((current) =>
      current.includes(classification)
        ? current.filter((item) => item !== classification)
        : [...current, classification],
    );
  };

  const clearFilters = () => {
    setQuery("");
    setPropertyType("All");
    setClassifications([]);
  };

  return (
    <div className={`property-explorer${compact ? " property-explorer--compact" : ""}`}>
      {heading && <div className="property-explorer__heading"><p className="eyebrow">AURELIA PROPERTY COLLECTION</p><h2>{heading}</h2></div>}
      {!marketOverride && (
        <div className="property-market-picker">
          <span className="property-market-picker__label">Show properties in</span>
          <div className="property-market-picker__options" role="group" aria-label="Choose a property location">
            {Object.values(markets).map((item) => (
              <Button
                key={item.id}
                type="button"
                variant="outline"
                className={`property-market-picker__option${market === item.id ? " property-market-picker__option--active" : ""}`}
                aria-label={`Show ${item.name} properties`}
                aria-pressed={market === item.id}
                onClick={() => setMarket(item.id)}
              >
                <span aria-hidden="true">{item.flag}</span>
                <strong>{item.name}</strong>
                <small>{propertyRepository.listByMarket(item.id).length} listings</small>
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="property-explorer__controls">
        <label className="property-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Search property names or locations</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search a demonstration listing or city"
          />
        </label>
        <div className="filter-group" role="group" aria-label="Filter by property type">
          {typeOptions.map((option) => (
            <Button
              key={option}
              type="button"
              variant="outline"
              className={`filter-chip${propertyType === option ? " filter-chip--active" : ""}`}
              aria-pressed={propertyType === option}
              onClick={() => setPropertyType(option)}
            >
              {option === "All" ? "All types" : option}
            </Button>
          ))}
        </div>
        <div className="filter-group filter-group--classifications" role="group" aria-label="Filter by classification">
          {classificationOptions.map((option) => (
            <Button
              key={option}
              type="button"
              variant="outline"
              className={`filter-chip${classifications.includes(option) ? " filter-chip--active" : ""}`}
              aria-pressed={classifications.includes(option)}
              onClick={() => toggleClassification(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        {hasFilters && (
          <Button className="filter-reset" type="button" variant="ghost" onClick={clearFilters}>
            <RotateCcw aria-hidden="true" /> Clear filters
          </Button>
        )}
      </div>

      <div className="property-explorer__results-bar" aria-live="polite">
        <p><strong>{results.length}</strong> demonstration {results.length === 1 ? "listing" : "listings"} in {marketContent.name}</p>
        <span>{marketContent.currency} · Pricing not supplied</span>
      </div>

      {visibleResults.length > 0 ? (
        <div className="property-grid">
          {visibleResults.map((property) => (
  <PropertyCard
    key={property.id}
    property={property}
    featured={!marketOverride && !compact && property.market === market && results[0]?.id === property.id}
  />
))}
        </div>
      ) : (
        <div className="property-empty-state">
          <p className="eyebrow">NO MATCHING LISTINGS</p>
          <h3>Nothing found in this collection.</h3>
          <p>Try another search or clear the filters to see all {marketContent.name} demonstration listings.</p>
          <Button variant="outline" type="button" onClick={clearFilters}>Clear filters</Button>
        </div>
      )}

      {maxItems && results.length > visibleResults.length && (
        <div className="property-explorer__more">
          <a className="text-link" href="#discovery">View all {results.length} {marketContent.name} listings <span aria-hidden="true">↗</span></a>
        </div>
      )}
    </div>
  );
}