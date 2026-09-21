import { PageHero } from "@/components/shared/page-hero";
import { CareerForm } from "@/components/forms/career-form";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Careers",
  description: "Articleship, internship, employee and professional opportunities at Pratik Janrao & Associates.",
  path: "/careers",
});

export default function CareersPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Careers" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Careers"
        title="Join a multidisciplinary team focused on clarity and dependable work."
        description="We welcome applications for articleship, internship, employee and professional roles."
        breadcrumbs={breadcrumbs}
      />

      <section className="section page-copy">
        <div className="split-copy reveal">
          <div>
            <p>
              The firm brings together chartered accountancy, cost accountancy, company secretarial and legal expertise in one accountable team. Learning happens close to the work, with senior attention on matters that matter.
            </p>
            <p>
              If you are interested in articleship, internship, employment or a professional role, share your background and the role you are applying for.
            </p>
          </div>
          <CareerForm />
        </div>
      </section>
    </>
  );
}
