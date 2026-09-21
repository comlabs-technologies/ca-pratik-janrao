import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { TeamGrid } from "@/components/team/team-grid";
import { getTeamByCategory, teamCategoryLabels, type TeamCategory } from "@/content/team";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Our Team",
  description: "Meet the core team, associates and execution team at Pratik Janrao & Associates.",
  path: "/our-team",
});

const categories: TeamCategory[] = ["core", "associates", "execution"];

export default function TeamPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Our Team" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Our team"
        title="Professionals who lead with clarity, not complexity."
        description="A multidisciplinary team of chartered accountants, cost accountants, company secretaries, advocates and execution professionals."
        breadcrumbs={breadcrumbs}
      />

      {categories.map((category) => (
        <section className={`section ${category === "core" ? "" : "dark-band team-section-dark"}`} key={category}>
          <SectionHeading eyebrow={teamCategoryLabels[category]} title={teamCategoryLabels[category]} dark={category !== "core"} />
          <TeamGrid members={getTeamByCategory(category)} />
        </section>
      ))}

      <ConsultationCta dark />
    </>
  );
}
