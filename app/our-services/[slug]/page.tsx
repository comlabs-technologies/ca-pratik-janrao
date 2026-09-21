import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { ContactDetails } from "@/components/shared/contact-details";
import { RelatedServices } from "@/components/services/related-services";
import { getRelatedServices, getServiceBySlug, services } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/our-services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/our-services" },
    { label: service.shortTitle },
  ];
  const related = getRelatedServices(service.relatedServiceSlugs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero eyebrow="Service" title={service.title} description={service.excerpt} breadcrumbs={breadcrumbs} />

      <section className="section service-detail-layout">
        <article className="service-detail reveal">
          <h2>Introduction</h2>
          <p>{service.introduction}</p>

          <h2>Scope of service</h2>
          <ul>
            {service.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Objectives</h2>
          <ul>
            {service.objectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Our approach</h2>
          <p>{service.approach}</p>

          <RelatedServices services={related} />
        </article>

        <aside className="service-sidebar reveal">
          <div className="sidebar-card">
            <p className="eyebrow">Consultation</p>
            <h3>Discuss this service with the firm.</h3>
            <p>Share a brief description of your matter and the relevant entity to begin.</p>
            <Link className="pill pill-dark" href="/contact-us">
              Book a consultation <ArrowRight size={15} />
            </Link>
            <ContactDetails />
          </div>
        </aside>
      </section>

      <ConsultationCta dark />
    </>
  );
}
