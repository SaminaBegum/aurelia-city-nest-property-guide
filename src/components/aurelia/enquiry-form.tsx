import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markets, type MarketId } from "@/content/site";
import { propertyRepository } from "@/services/property-repository";

interface EnquiryFormProps {
  defaultMarket: MarketId;
  propertyName?: string;
}

export function EnquiryForm({ defaultMarket, propertyName }: EnquiryFormProps) {
  const [selectedMarket, setSelectedMarket] = useState<MarketId>(defaultMarket);
  const properties = propertyRepository.listByMarket(selectedMarket);

  return (
    <form className="enquiry-form" aria-describedby="enquiry-availability">
      <div className="enquiry-form__availability" id="enquiry-availability" role="status">
        <span className="enquiry-form__status-mark" aria-hidden="true" />
        The enquiry service is not connected yet. No information entered here will be sent.
      </div>
      <div className="enquiry-form__grid">
        <label className="form-field">
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Name" />
        </label>
        <label className="form-field">
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="Email" />
        </label>
        <label className="form-field">
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Phone" />
        </label>
        <label className="form-field">
          <span>Market of interest</span>
          <select value={selectedMarket} onChange={(event) => setSelectedMarket(event.currentTarget.value as MarketId)}>
            {Object.values(markets).map((market) => <option key={market.id} value={market.id}>{market.name}, {market.country}</option>)}
          </select>
        </label>
        <label className="form-field form-field--wide">
          <span>Property of interest</span>
          <select defaultValue={propertyName ?? ""}>
            <option value="">No specific listing selected</option>
            {properties.map((property) => <option key={property.slug} value={property.name}>{property.name} · Demonstration</option>)}
          </select>
        </label>
        <label className="form-field form-field--wide">
          <span>Your message</span>
          <textarea name="message" rows={4} placeholder="How can we help?" />
        </label>
      </div>
      <div className="enquiry-form__submit">
        <Button type="button" disabled>Enquiries are not connected <ArrowUpRight aria-hidden="true" /></Button>
        <span>Submissions will be enabled once an enquiry service is provided.</span>
      </div>
    </form>
  );
}