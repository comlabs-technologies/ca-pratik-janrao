import { PageHero } from "@/components/shared/page-hero";
import { ContactDetails } from "@/components/shared/contact-details";
import { ContactForm } from "@/components/forms/contact-form";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Contact Pratik Janrao & Associates in Pune for audit, tax, GST and compliance advisory.",
  path: "/contact-us",
});

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Contact"
        title="Start with the question, not the paperwork."
        description="Reach the firm by phone, email, WhatsApp or the form below."
        breadcrumbs={breadcrumbs}
      />

      <section className="section contact-layout">
        <ContactForm />
        <div className="reveal">
          <ContactDetails />
          <div className="map-fallback">
            <iframe
              title="Office location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address.full)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
              Open map in a new tab
            </a>
          </div>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
