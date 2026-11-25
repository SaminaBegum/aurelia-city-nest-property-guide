import { describe, expect, it } from "vitest";
import { demoProperties } from "@/content/properties";
import { filterProperties } from "@/services/property-repository";

describe("Aurelia demonstration property catalogue", () => {
  it("contains exactly 40 clearly labelled demonstration records", () => {
    expect(demoProperties).toHaveLength(40);
    expect(demoProperties.every((property) => property.status === "Demonstration")).toBe(true);
  });

  it("contains 20 records per market and 10 per property type in each market", () => {
    for (const market of ["dubai", "pune"] as const) {
      const marketProperties = demoProperties.filter((property) => property.market === market);
      expect(marketProperties).toHaveLength(20);
      expect(marketProperties.filter((property) => property.propertyType === "Residential")).toHaveLength(10);
      expect(marketProperties.filter((property) => property.propertyType === "Commercial")).toHaveLength(10);
    }
  });

  it("shows only the selected market's 20 listings", () => {
    const dubaiResults = filterProperties(demoProperties, { market: "dubai" });
    const puneResults = filterProperties(demoProperties, { market: "pune" });

    expect(dubaiResults).toHaveLength(20);
    expect(dubaiResults.every((property) => property.market === "dubai" && property.city === "Dubai")).toBe(true);
    expect(puneResults).toHaveLength(20);
    expect(puneResults.every((property) => property.market === "pune" && property.city === "Pune")).toBe(true);
  });

  it("keeps market, type, classification, and search filters combined", () => {
    const results = filterProperties(demoProperties, {
      market: "pune",
      propertyType: "Residential",
      classifications: ["New Launch"],
      query: "Pune",
    });

    expect(results).toHaveLength(5);
    expect(results.every((property) => property.market === "pune" && property.propertyType === "Residential")).toBe(true);
    expect(results.every((property) => property.classifications.includes("New Launch"))).toBe(true);
  });
});