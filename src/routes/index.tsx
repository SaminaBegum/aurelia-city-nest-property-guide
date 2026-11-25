

import { createFileRoute } from "@tanstack/react-router";

import { seo } from "@/content/site";

import { MarketProvider } from "@/hooks/use-market";
import { SiteFrame } from "@/components/aurelia/site-frame";

import { HomeHero } from "@/components/aurelia/home/HomeHero";
import { HomeIntroduction } from "@/components/aurelia/home/HomeIntroduction";
import { HomeDestinations } from "@/components/aurelia/home/HomeDestinations";
import { HomeFeatured } from "@/components/aurelia/home/HomeFeatured";
import { HomeDiscovery } from "@/components/aurelia/home/HomeDiscovery";
import { HomeApproach } from "@/components/aurelia/home/HomeApproach";
import { HomeStory } from "@/components/aurelia/home/HomeStory";
import { HomeContact } from "@/components/aurelia/home/HomeContact";
import { HomeWhatWeDo } from "@/components/aurelia/home/HomeWhatWeDo";
import { HomeTestimonials } from "@/components/aurelia/home/HomeTestimonials";
import { HomeSignatureProperties } from "@/components/aurelia/home/HomeSignatureProperties";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.home.title },
      {
        name: "description",
        content: seo.home.description,
      },
      {
        property: "og:title",
        content: seo.home.title,
      },
      {
        property: "og:description",
        content: seo.home.description,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: Index,
});

function Index() {
  return (
    <MarketProvider>
      <SiteFrame>
        <HomePage />
      </SiteFrame>
    </MarketProvider>
  );
}

function HomePage() {
  return (
    <>
      {/* 01. Hero Section */}
      <HomeHero />

      {/* 02. Introduction Section */}
      <HomeIntroduction />
<HomeWhatWeDo />
      {/* 03. Destinations Section */}
      <HomeDestinations />

      {/* 04. Featured Properties */}
      {/* <HomeFeatured /> */}
<HomeSignatureProperties />
      {/* 05. Property Discovery */}
     {/* <HomeDiscovery />  */}

      {/* 06. Our Approach */}
      <HomeApproach />

      {/* 07. Market Story */}
      <HomeStory />
<HomeTestimonials />
      {/* 08. Contact & Enquiry */}
      <HomeContact />
    </>
  );
}
