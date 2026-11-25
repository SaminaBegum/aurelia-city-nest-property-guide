import { createFileRoute, Link } from "@tanstack/react-router";

import { MarketProvider } from "@/hooks/use-market";
import { SiteFrame } from "@/components/aurelia/site-frame";
import { PropertyDetailPage } from "@/components/aurelia/property-detail-page";
import { propertyRepository } from "@/services/property-repository";

export const Route = createFileRoute("/locations/pune/properties/$slug")({
  component: PunePropertyDetailRoute,
});

function PunePropertyDetailRoute() {
  const { slug } = Route.useParams();

  const property = propertyRepository.getBySlug("pune", slug);

  if (!property) {
    return (
      <MarketProvider>
        <SiteFrame>
          <div className="property-not-found">
            <p className="eyebrow">AURELIA · PUNE</p>
            <h1>Property not found</h1>
            <p>We couldn't find this Pune property.</p>

            <Link to="/locations/pune/properties">
              <span>← Back to Pune properties</span>
            </Link>
          </div>
        </SiteFrame>
      </MarketProvider>
    );
  }

  return (
    <MarketProvider>
      <SiteFrame>
        <PropertyDetailPage property={property} market="pune" />
      </SiteFrame>
    </MarketProvider>
  );
}
