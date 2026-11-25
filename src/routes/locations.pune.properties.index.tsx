
import { createFileRoute } from "@tanstack/react-router";

import { MarketProvider } from "@/hooks/use-market";
import { SiteFrame } from "@/components/aurelia/site-frame";
import { PropertyExplorer } from "@/components/aurelia/property-explorer";
import { seo } from "@/content/site";

export const Route = createFileRoute("/locations/pune/properties/")({
  head: () => ({
    meta: [
      { title: "Properties in Pune | Aurelia" },
      {
        name: "description",
        content: seo.pune.description,
      },
    ],
  }),
  component: PunePropertiesPage,
});

function PunePropertiesPage() {
  return (
    <MarketProvider>
      <SiteFrame>
        <section className="market-listing-page">
          <div className="market-listing-page__intro">
            <span className="eyebrow">AURELIA · INDIA</span>
            <h1>Discover Pune</h1>
            <p>
              Explore thoughtfully selected residential and commercial
              opportunities across Pune.
            </p>
          </div>

          <PropertyExplorer
            marketOverride="pune"
            heading="Explore Pune Properties"
          />
        </section>
      </SiteFrame>
    </MarketProvider>
  );
}
