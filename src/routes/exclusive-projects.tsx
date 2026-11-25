
import { createFileRoute } from "@tanstack/react-router";
import { PropertyListingPage } from "@/components/properties/PropertyListingPage";
import { MarketProvider } from "@/hooks/use-market";
import { SiteFrame } from "@/components/aurelia/site-frame";

export const Route = createFileRoute("/exclusive-projects")({
  component: ExclusiveProjectsRoute,
});

function ExclusiveProjectsRoute() {
  return (
    <MarketProvider>
      <SiteFrame>
        <PropertyListingPage />
      </SiteFrame>
    </MarketProvider>
  );
}
