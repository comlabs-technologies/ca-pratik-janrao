import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { TeamGrid } from "@/components/team/team-grid";
import { getTeamByCategory } from "@/content/team";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Pune-based Chartered Accountants, Cost Accountants, Company Secretaries and legal professionals serving clients since 2014.",
  path: "/about-us",
});

const values = [
  { title: "Quality first", text: "Dependable, timely work that brings measurable value to clients." },
  { title: "Plain language", text: "Complex regulation explained clearly so business owners can focus on operations." },
  { title: "Multi-disciplinary support", text: "Accounting, taxation, audit, secretarial and legal expertise in one accountable team." },
  { title: "Proactive guidance", text: "Anticipating compliance challenges rather than reacting after deadlines pass." },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Our firm"
        title="One accountable team for compliance, finance and legal matters."
        description="Pratik Janrao & Associates is a Pune-based proprietorship firm of Chartered Accountant, Cost Accountant, Company Secretary and Advocate since 2014."
        breadcrumbs={breadcrumbs}
      />

      <section className="section page-copy">
        <div className="split-copy reveal">
          <div>
            <p>
              We intend to be a one-stop firm for compliance and financial needs so that a business owner can remain miles away from the jargons of complicated Indian tax systems and can focus on core operations.
            </p>
            <p>
              The firm provides accounting, financial and legal consulting, tax management, auditing, and knowledge process outsourcing services across government organisations, corporate houses, charitable trusts, banks, individuals, LLPs, HUFs and partnership firms.
            </p>
            <p>{site.empanelment}</p>
          </div>
          <div className="about-highlight">
            <p className="eyebrow">Motto</p>
            <blockquote>{site.motto}</blockquote>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Direction" title="Vision, mission and purpose" />
        <div className="value-grid reveal">
          <article className="value-card">
            <p className="eyebrow">Vision</p>
            <h3>Dependable professional services across industries.</h3>
            <p>To deliver dependable, timely, and high-quality professional services by evolving dynamic strategies, initiating change, and creating measurable value for clients across industries.</p>
          </article>
          <article className="value-card">
            <p className="eyebrow">Mission</p>
            <h3>A one-stop firm for accounting, tax and legal consulting.</h3>
            <p>To be a one-stop firm for accounting, taxation, financial, and legal consulting by combining multi-disciplinary expertise, innovative thinking, and client-focused solutions for sustainable business growth.</p>
          </article>
          <article className="value-card">
            <p className="eyebrow">Purpose</p>
            <h3>Simplify compliance. Empower businesses.</h3>
            <p>To simplify compliance and empower businesses to focus on their core operations while we provide comprehensive, cost-effective, and reliable professional support.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Principles" title="How we work with clients" description="Our approach begins with understanding each client's requirements, industry environment, and compliance challenges." />
        <div className="value-grid reveal">
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <p className="eyebrow">{value.title}</p>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Leadership"
          title="Core team"
          action={
            <Link className="pill pill-dark" href="/our-team">
              View full team <ArrowRight size={15} />
            </Link>
          }
        />
        <TeamGrid members={getTeamByCategory("core")} />
      </section>

      <section className="section">
        <div className="story-card about-story reveal">
          <Image src="/images/hero-office.png" alt="Professional office environment" fill sizes="(max-width: 900px) 100vw, 60vw" />
          <div>
            <h3>Relevant services for growing organisations.</h3>
            <p>From audit and GST to MCA compliance and business advisory, explore the services most relevant to your stage of growth.</p>
            <Link className="pill pill-light" href="/our-services">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
