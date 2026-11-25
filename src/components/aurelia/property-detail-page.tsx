
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Building2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import type { PropertyRecord } from "@/content/properties";
import { markets, type MarketId } from "@/content/site";
import { propertyRepository } from "@/services/property-repository";
import { PropertyCard } from "@/components/aurelia/property-card";
import type { FormEvent } from "react";
interface PropertyDetailPageProps {
  property: PropertyRecord;
  market: MarketId;
}

export function PropertyDetailPage({
  property,
  market,
}: PropertyDetailPageProps) {
  const marketContent = markets[market];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const similarProperties = propertyRepository
    .listByMarket(market)
    .filter(
      (item) =>
        item.slug !== property.slug &&
        item.propertyType === property.propertyType,
    )
    .slice(0, 3);

  const specifications = [
    {
      icon: Building2,
      label: "Property type",
      value: property.propertyType,
    },
    {
      icon: BedDouble,
      label: "Bedrooms",
      value:
        property.bedrooms !== null
          ? String(property.bedrooms)
          : "Not specified",
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value:
        property.bathrooms !== null
          ? String(property.bathrooms)
          : "Not specified",
    },
    {
      icon: Ruler,
      label: "Property size",
      value:
        property.areaSize !== null
          ? `${property.areaSize} ${property.areaUnit ?? ""}`
          : "Not specified",
    },
  ];

  const images = property.images;

  const galleryMain = images[0];
  const gallerySecond = images[1] ?? images[0];
  const galleryThird = images[2] ?? images[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Frontend demo form only. No CRM or backend submission is configured yet.
    setSubmitted(true);
  }

  return (
    <div className="property-detail">
      {/* Breadcrumb */}
      <nav className="property-detail__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>

        <Link
          to={
            market === "pune"
              ? "/locations/pune/properties"
              : "/locations/dubai/properties"
          }
        >
          {marketContent.name}
        </Link>

        <span>/</span>

        <span aria-current="page">Property Details</span>
      </nav>

      {/* Property heading */}
      <header className="property-detail__header">
        <div className="property-detail__title-wrap">
          <p className="eyebrow">
            AURELIA SELECT · {marketContent.country}
          </p>

          <h1 className="property-detail__title">
            {property.name}
          </h1>

          <p className="property-detail__location">
            <MapPin size={16} />
            {property.area
              ? `${property.area}, ${property.city}`
              : `${property.city}, ${property.country}`}
          </p>
        </div>

        <div className="property-detail__price">
          <span className="property-detail__price-label">
            Investment Value
          </span>

          <span className="property-detail__price-value">
            Price on request
          </span>

          <span className="property-detail__currency">
            Currency · {marketContent.currency}
          </span>
        </div>
      </header>

      {/* Property gallery */}
      <section
        className="property-detail__gallery"
        aria-label="Property image gallery"
      >
        <div className="property-detail__gallery-main">
          {galleryMain && (
            <img
              src={galleryMain.src}
              alt={galleryMain.alt}
            />
          )}

          <span className="property-detail__demo-label">
            Illustrative imagery
          </span>
        </div>

        <div className="property-detail__gallery-secondary">
          <div>
            {gallerySecond && (
              <img
                src={gallerySecond.src}
                alt={gallerySecond.alt}
              />
            )}
          </div>

          <div>
            {galleryThird && (
              <img
                src={galleryThird.src}
                alt={galleryThird.alt}
              />
            )}
          </div>
        </div>
      </section>

      {/* Main detail content */}
      <div className="property-detail__content">
        <div className="property-detail__main">
          {/* Overview */}
          <section className="property-detail__section">
            <p className="eyebrow">PROPERTY OVERVIEW</p>

            <h2>A closer look</h2>

            <p className="property-detail__description">
              {property.description}
            </p>

            <p className="property-detail__description">
              This listing is part of the Aurelia property showcase.
              Contact our team for verified availability, pricing,
              location information, and further details about this
              property.
            </p>
          </section>

          {/* Specifications */}
          <section className="property-detail__section">
            <p className="eyebrow">DETAILS</p>

            <h2>Property specifications</h2>

            <div className="property-detail__spec-grid">
              {specifications.map((specification) => {
                const Icon = specification.icon;

                return (
                  <div
                    className="property-detail__spec"
                    key={specification.label}
                  >
                    <span className="property-detail__spec-icon">
                      <Icon size={18} />
                    </span>

                    <span className="property-detail__spec-label">
                      {specification.label}
                    </span>

                    <span className="property-detail__spec-value">
                      {specification.value}
                    </span>
                  </div>
                );
              })}

              <div className="property-detail__spec">
                <span className="property-detail__spec-label">
                  Project status
                </span>

                <span className="property-detail__spec-value">
                  {property.completionStatus}
                </span>
              </div>

              <div className="property-detail__spec">
                <span className="property-detail__spec-label">
                  Listing status
                </span>

                <span className="property-detail__spec-value">
                  {property.status}
                </span>
              </div>
            </div>
          </section>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <section className="property-detail__section">
              <p className="eyebrow">EXPERIENCE</p>

              <h2>Amenities & lifestyle</h2>

              <div className="property-detail__amenities">
                {property.amenities.map((amenity) => (
                  <div
                    className="property-detail__amenity"
                    key={amenity}
                  >
                    <Check size={16} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Property category */}
          <section className="property-detail__section">
            <p className="eyebrow">PROPERTY CLASSIFICATION</p>

            <h2>Property information</h2>

            <div className="property-detail__tags">
              <span>{property.propertyType}</span>

              {property.classifications.map((classification) => (
  <span key={classification}>
    {classification}
  </span>
))}
            </div>

            <p className="property-detail__description">
              Property specifications, final pricing, amenities,
              possession details, and availability are subject to
              confirmation.
            </p>
          </section>

          {/* Location */}
          <section className="property-detail__section">
            <p className="eyebrow">LOCATION</p>

            <h2>Discover the neighbourhood</h2>

            <p className="property-detail__description">
              {property.area
                ? `${property.area}, ${property.city}, ${property.country}`
                : `${property.city}, ${property.country}`}
            </p>

            <div className="property-detail__location-placeholder">
              <MapPin size={26} />

              <div>
                <strong>{property.city}</strong>

                <p>
                  Exact property location will be shared upon
                  confirmation.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Enquiry form */}
        <aside className="property-detail__sidebar">
          <div className="property-detail__enquiry-card">
            {submitted ? (
              <div className="property-detail__success">
                <div className="property-detail__success-icon">
                  <Check size={26} />
                </div>

                <h2>Thank you for your interest.</h2>

                <p>
                  Your enquiry form has been completed. Connect the
                  enquiry form to your CRM or backend to receive and
                  process enquiries.
                </p>

                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another enquiry
                </Button>
              </div>
            ) : (
              <>
                <p className="eyebrow">PRIVATE ENQUIRY</p>

                <h2>Make this property yours.</h2>

                <p>
                  Connect with our property advisory team for
                  availability, pricing and a personalised walkthrough.
                </p>

                <form onSubmit={handleSubmit}>
                  <label htmlFor="property-enquiry-name">
                    Full name
                  </label>

                  <input
                    id="property-enquiry-name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />

                  <label htmlFor="property-enquiry-email">
                    Email address
                  </label>

                  <input
                    id="property-enquiry-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />

                  <label htmlFor="property-enquiry-phone">
                    Phone number
                  </label>

                  <input
                    id="property-enquiry-phone"
                    type="tel"
                    placeholder="+91 / +971"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />

                  <label htmlFor="property-enquiry-message">
                    Message
                  </label>

                  <textarea
                    id="property-enquiry-message"
                    placeholder="I'm interested in this property..."
                    value={message}
                   onChange={(event) => setMessage(event.target.value)}
                    rows={4}
                  />

                  <Button type="submit" className="property-detail__submit">
                    Send enquiry
                    <Send size={16} />
                  </Button>
                </form>

                <div className="property-detail__privacy">
                  <ShieldCheck size={15} />
                  <span>Your details are treated with discretion.</span>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

  {/* Similar properties */}
  {similarProperties.length > 0 && (
    <section className="property-detail__similar">
      <div className="property-detail__similar-heading">
        <p className="eyebrow">CONTINUE EXPLORING</p>

        <h2>Similar properties in {marketContent.name}</h2>

        <p>
          Discover more {property.propertyType.toLowerCase()} opportunities
          within {marketContent.name}.
        </p>
      </div>

      <div className="property-grid">
        {similarProperties.map((similarProperty) => (
          <PropertyCard
            key={similarProperty.id}
            property={similarProperty}
          />
        ))}
      </div>
    </section>
  )}
</div>
);
}
