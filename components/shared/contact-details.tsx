import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function ContactDetails() {
  return (
    <div className="contact-details">
      <div>
        <span>Office</span>
        <address>
          {site.address.line1}
          <br />
          {site.address.line2}
          <br />
          {site.address.city}, {site.address.state} {site.address.pin}
        </address>
        <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
      </div>
      <div>
        <span>Phone</span>
        {site.phones.map((phone) => (
          <a key={phone} href={`tel:${phone}`}>
            {phone.replace("+91", "+91 ")}
          </a>
        ))}
      </div>
      <div>
        <span>Email</span>
        {site.emails.map((email) => (
          <a key={email} href={`mailto:${email}`}>
            {email}
          </a>
        ))}
        <Link href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
          <MessageCircle size={15} /> WhatsApp
        </Link>
      </div>
    </div>
  );
}
