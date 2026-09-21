import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { ServiceCard } from "@/components/services/service-card";
import { serviceCategories, services } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Our Services",
  description: "End-to-end legal, accounting, compliance and advisory services for modern businesses, startups, and SMEs.",
  path: "/our-services",
});

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Our Services" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="What we do"
        title="All the support your business needs. None of the noise."
        description="We provide end-to-end legal, accounting, compliance and advisory services for modern businesses, startups, and SMEs."
        breadcrumbs={breadcrumbs}
      />

      {serviceCategories.map((category) => (
        <section className="section" key={category.id}>
          <SectionHeading eyebrow={category.title} title={category.title} description={category.description} />
          <div className="service-grid reveal">
            {services
              .filter((service) => service.category === category.id)
              .map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
          </div>
        </section>
      ))}

      <ConsultationCta />
    </>
  );
}
