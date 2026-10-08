"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { useFormSubmit } from "./use-form-submit";

// Submissions are stored by /api/contact; set to "false" to fall back to a mailto draft.
const formEnabled = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED !== "false";

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone.replace("+91", "+91 ");
}

type ContactFormProps = {
  heading?: string;
};

export function ContactForm({ heading }: ContactFormProps) {
  const { state, onSubmit } = useFormSubmit("/api/contact", "Thank you. We have received your message and will get back to you shortly.");
  const phoneDisplay = formatPhone(site.phones[0]);

  if (!formEnabled) {
    return (
      <div className="enquiry-panel">
        {heading ? <h3 className="form-heading">{heading}</h3> : null}
        <p className="form-note">
          Online submission is not yet configured. Please email{" "}
          <a href={`mailto:${site.emails[1]}`}>{site.emails[1]}</a> or call{" "}
          <a href={`tel:${site.phones[0]}`}>{phoneDisplay}</a>.
        </p>
        <form action={`mailto:${site.emails[1]}`} method="post" encType="text/plain">
          <label>
            <span>Your Name</span>
            <input name="name" type="text" autoComplete="name" placeholder="Your full name" required />
          </label>
          <label>
            <span>Email Address</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </label>
          <label>
            <span>Phone Number</span>
            <input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" />
          </label>
          <label>
            <span>What Do You Need Help With?</span>
            <textarea name="message" rows={3} placeholder="Briefly describe your question or requirement." required />
          </label>
          <button className="submit-button" type="submit">
            Open email draft <ArrowRight size={16} />
          </button>
        </form>
        <DirectContactLinks phoneDisplay={phoneDisplay} />
      </div>
    );
  }

  return (
    <div className="enquiry-panel">
      {heading ? <h3 className="form-heading">{heading}</h3> : null}
      <form onSubmit={onSubmit}>
        <label>
          <span>Your Name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Your full name" required />
        </label>
        <label>
          <span>Email Address</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </label>
        <label>
          <span>Phone Number</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" />
        </label>
        <label>
          <span>What Do You Need Help With?</span>
          <textarea name="message" rows={3} placeholder="Briefly describe your question or requirement." required />
        </label>
        <div className="visually-hidden" aria-hidden="true">
          <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {state.message ? (
          <p className={`form-status ${state.phase === "success" ? "is-success" : "is-error"}`} role="status">
            {state.message}
          </p>
        ) : null}
        <button className="submit-button" type="submit" disabled={state.phase === "sending"}>
          {state.phase === "sending" ? "Sending…" : <>Send Your Enquiry <ArrowRight size={16} /></>}
        </button>
      </form>
      <DirectContactLinks phoneDisplay={phoneDisplay} />
    </div>
  );
}

function DirectContactLinks({ phoneDisplay }: { phoneDisplay: string }) {
  return (
    <div className="direct-contact">
      <span>Would you prefer to speak with us directly?</span>
      <a href={`tel:${site.phones[0]}`}>{phoneDisplay}</a>
      <a href={`mailto:${site.emails[1]}`}>{site.emails[1]}</a>
      <Link href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={15} /> Message Us on WhatsApp
      </Link>
    </div>
  );
}
