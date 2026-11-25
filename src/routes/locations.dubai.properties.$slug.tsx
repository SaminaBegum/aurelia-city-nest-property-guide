import { createFileRoute, Link } from "@tanstack/react-router";

import { MarketProvider } from "@/hooks/use-market";
import { SiteFrame } from "@/components/aurelia/site-frame";
import { PropertyDetailPage } from "@/components/aurelia/property-detail-page";
import { propertyRepository } from "@/services/property-repository";

export const Route = createFileRoute("/locations/dubai/properties/$slug")({
  component: DubaiPropertyDetailRoute,
});

function DubaiPropertyDetailRoute() {
  const { slug } = Route.useParams();

  const property = propertyRepository.getBySlug("dubai", slug);

  if (!property) {
    return (
      <MarketProvider>
        <SiteFrame>
          <div className="property-not-found">
            <p className="eyebrow">AURELIA · DUBAI</p>
            <h1>Property not found</h1>
            <p>We couldn't find this Dubai property.</p>

            <Link to="/locations/dubai/properties">
              <span>← Back to Dubai properties</span>
            </Link>
          </div>
        </SiteFrame>
      </MarketProvider>
    );
  }

  return (
    <MarketProvider>
      <SiteFrame>
        <PropertyDetailPage property={property} market="dubai" />
      </SiteFrame>
    </MarketProvider>
  );
}
