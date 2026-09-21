import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { getRelatedServices } from "@/content/services";
import { getTeamMemberBySlug, getTeamMembersWithProfiles } from "@/content/team";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd, personSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getTeamMembersWithProfiles().map((member) => ({ slug: member.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member?.biography) return {};

  return createMetadata({
    title: member.name,
    description: member.biography.slice(0, 155),
    path: `/our-team/${slug}`,
    image: member.image,
  });
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member?.biography || !member.slug) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Our Team", href: "/our-team" },
    { label: member.name },
  ];
  const relatedServices = getRelatedServices(member.relatedServiceSlugs ?? []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personSchema(member, `/our-team/${slug}`))} />
      <PageHero
        eyebrow={member.role}
        title={member.name}
        description={member.qualification}
        breadcrumbs={breadcrumbs}
      />

      <section className="section profile-layout">
        <div className="profile-portrait reveal">
          {member.image ? (
            <Image src={member.image} alt={member.name} fill sizes="(max-width: 900px) 100vw, 420px" />
          ) : (
            <span className="person-placeholder">{member.initials}</span>
          )}
        </div>
        <div className="profile-copy reveal">
          <p>{member.biography}</p>
          {member.specializations?.length ? (
            <>
              <h2>Areas of expertise</h2>
              <ul>
                {member.specializations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          {relatedServices.length ? (
            <>
              <h2>Relevant services</h2>
              <ul className="link-list">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/our-services/${service.slug}`}>{service.shortTitle}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <Link className="pill pill-dark" href="/contact-us">
            Contact the firm <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <ConsultationCta dark />
    </>
  );
}
