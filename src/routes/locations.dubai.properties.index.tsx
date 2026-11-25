
import { createFileRoute } from "@tanstack/react-router";

import { MarketProvider } from "@/hooks/use-market";
import { SiteFrame } from "@/components/aurelia/site-frame";
import { PropertyExplorer } from "@/components/aurelia/property-explorer";
import { seo } from "@/content/site";

export const Route = createFileRoute("/locations/dubai/properties/")({
  head: () => ({
    meta: [
      { title: "Properties in Dubai | Aurelia" },
      {
        name: "description",
        content: seo.dubai.description,
      },
    ],
  }),
  component: DubaiPropertiesPage,
});

function DubaiPropertiesPage() {
  return (
    <MarketProvider>
      <SiteFrame>
        <section className="market-listing-page">
          <div className="market-listing-page__intro">
            <span className="eyebrow">AURELIA · UAE</span>
            <h1>Discover Dubai</h1>
            <p>
              Discover exceptional real estate opportunities in a city
              defined by vision, architecture, and possibility.
            </p>
          </div>

          <PropertyExplorer
            marketOverride="dubai"
            heading="Explore Dubai Properties"
          />
        </section>
      </SiteFrame>
    </MarketProvider>
  );
}
