
import { ArrowUpRight, MapPin } from "lucide-react";

import { homeContent, markets } from "@/content/site";
import { useMarket } from "@/hooks/use-market";
import { EnquiryForm } from "@/components/aurelia/enquiry-form";
import "./home-contact.css";
export function HomeContact() {
  const { market } = useMarket();

  return (
    <section
      className="home-contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="home-contact__container">

        {/* Intro */}
        <div className="home-contact__intro">
          <span className="home-contact__eyebrow">
            {homeContent.enquiry.eyebrow}
          </span>

          <h2 id="contact-title">
            {homeContent.enquiry.title}
          </h2>

          <p className="home-contact__description">
            {homeContent.enquiry.support}
          </p>

          <div className="home-contact__market">
            <MapPin size={17} />
            <span>Currently exploring</span>
            <strong>{markets[market].name}</strong>
          </div>

          <div className="home-contact__statement">
            <span className="home-contact__statement-line" />
            <p>
              Every great space begins with a conversation.
              Let's make yours meaningful.
            </p>
          </div>

          <a
            href="#home"
            className="home-contact__back-link"
          >
            DISCOVER AURELIA
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Enquiry Form */}
        <div className="home-contact__form">
          <div className="home-contact__form-heading">
            <span>LET'S GET STARTED</span>
            <h3>Tell us what you're looking for.</h3>
            <p>
              Share a few details and our team will be in touch
              to help you find the right opportunity.
            </p>
          </div>

          <EnquiryForm
            key={market}
            defaultMarket={market}
          />
        </div>

      </div>
    </section>
  );
}
