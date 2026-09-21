"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

const formEnabled = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";

export function ContactForm() {
  if (!formEnabled) {
    return (
      <div className="enquiry-panel">
        <p className="form-note">
          Online submission is not yet configured. Please email{" "}
          <a href={`mailto:${site.emails[1]}`}>{site.emails[1]}</a> or call{" "}
          <a href={`tel:${site.phones[0]}`}>{site.phones[0].replace("+91", "+91 ")}</a>.
        </p>
        <form action={`mailto:${site.emails[1]}`} method="post" encType="text/plain">
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" placeholder="Your full name" required />
          </label>
          <label>
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" />
          </label>
          <label>
            <span>How can we help?</span>
            <textarea name="message" rows={3} placeholder="Tell us briefly about the matter" required />
          </label>
          <button className="submit-button" type="submit">
            Open email draft <ArrowRight size={16} />
          </button>
        </form>
        <DirectContactLinks />
      </div>
    );
  }

  return (
    <div className="enquiry-panel">
      <form action="/api/contact" method="post">
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Your full name" required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" />
        </label>
        <label>
          <span>How can we help?</span>
          <textarea name="message" rows={3} placeholder="Tell us briefly about the matter" required />
        </label>
        <button className="submit-button" type="submit">
          Let&apos;s work together <ArrowRight size={16} />
        </button>
      </form>
      <DirectContactLinks />
    </div>
  );
}

function DirectContactLinks() {
  return (
    <div className="direct-contact">
      <span>Prefer a direct conversation?</span>
      <a href={`tel:${site.phones[0]}`}>{site.phones[0].replace("+91", "+91 ")}</a>
      <a href={`mailto:${site.emails[1]}`}>{site.emails[1]}</a>
      <Link href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={15} /> WhatsApp
      </Link>
    </div>
  );
}
