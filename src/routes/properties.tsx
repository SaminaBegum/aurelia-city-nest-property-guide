
import { createFileRoute } from "@tanstack/react-router";
import { PropertyListingPage } from "@/components/properties/PropertyListingPage";

export const Route = createFileRoute("/properties")({
  component: PropertiesRoute,
});

function PropertiesRoute() {
  return <PropertyListingPage />;
}
