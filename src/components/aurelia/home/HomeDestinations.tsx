

import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import "@/styles/home-destinations.css";
import { Button } from "@/components/ui/button";
import { homeContent, markets } from "@/content/site";
import { useMarket } from "@/hooks/use-market";
import { propertyRepository } from "@/services/property-repository";

export function HomeDestinations() {
  const { setMarket } = useMarket();

  return (
    <section
      className="home-destinations"
      id="destinations"
      aria-labelledby="destinations-title"
    >
      <div className="section-wrap">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">
              {homeContent.destinations.eyebrow}
            </p>

            <h2 id="destinations-title">
              {homeContent.destinations.title}
            </h2>
          </div>

          <p>{homeContent.destinations.support}</p>
        </div>

        <div className="destination-grid">
          {Object.values(markets).map((destination) => {
            const propertiesRoute =
              destination.id === "pune"
                ? "/locations/pune/properties"
                : "/locations/dubai/properties";

            return (
              <article
                className="destination-panel"
                key={destination.id}
              >
                <img
                  src={destination.image}
                  alt={destination.imageAlt}
                  loading="lazy"
                />

                <div
                  className="destination-panel__shade"
                  aria-hidden="true"
                />

                <div className="destination-panel__content">
                  <p className="eyebrow">
                    {destination.country}
                  </p>

                  <h3>{destination.name}</h3>

                  <p>{destination.description}</p>

                  <div className="destination-panel__bottom">
                    <span>
                      {propertyRepository.listByMarket(destination.id).length}
                      {" "}demonstration listings
                    </span>

                    <Button
                      asChild
                      variant="outline"
                      className="destination-panel__button"
                    >
                      <Link
                        to={propertiesRoute}
                        aria-label={`Explore ${destination.name} properties`}
                        onClick={() => setMarket(destination.id)}
                      >
                        Explore
                        <ArrowUpRight aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
