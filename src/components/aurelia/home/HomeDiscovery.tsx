
import { homeContent } from "@/content/site";
import { PropertyExplorer } from "@/components/aurelia/property-explorer";

export function HomeDiscovery() {
  return (
    <section
      className="home-discovery"
      id="discovery"
      aria-label="Property discovery"
    >
      <div className="section-wrap">
        <PropertyExplorer
          heading={homeContent.discovery.title}
        />
      </div>
    </section>
  );
}
