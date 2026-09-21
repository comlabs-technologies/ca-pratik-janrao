import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Disclaimer",
  description: "Terms and conditions for use of the Pratik Janrao & Associates website.",
  path: "/disclaimer",
});

const sections = [
  {
    title: "Agreement to terms",
    content:
      "Your access to this website constitutes your agreement to be bound by all terms and conditions listed herein below. If you do not agree to this, you may not access or otherwise use the website.",
  },
  {
    title: "Use of content",
    content:
      "The material displayed on this website may be downloaded for non-commercial, personal use only. Distribution, modification, transmission, use, or reuse of the content and various facilities available on this website without written permission is not permissible.",
  },
  {
    title: "Changes to the website",
    content:
      "The firm reserves the right, for any reason, in its sole discretion, to terminate, change, or suspend any aspect of this website, including, but not limited to, content or features.",
  },
  {
    title: "Accuracy of information",
    content:
      "All reasonable efforts shall be made to ensure that the information contained on this website is updated, accurate, and complete. However, no representations or warranties are made (express or implied) as to the reliability, accuracy, or completeness of such information.",
  },
  {
    title: "External links",
    content:
      "The site provides links to websites or resources operated by others over which we do not have any control. We do not undertake any responsibility for the availability of such external resources.",
  },
];

export default function DisclaimerPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Disclaimer" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero eyebrow="Legal" title="Disclaimer" breadcrumbs={breadcrumbs} />

      <section className="section narrow-copy legal-copy">
        <ol className="legal-list">
          {sections.map((section, index) => (
            <li key={section.title}>
              <h2>
                {index + 1}. {section.title}
              </h2>
              <p>{section.content}</p>
            </li>
          ))}
        </ol>
        <p>
          For questions about this disclaimer, contact{" "}
          <Link href="/contact-us">the firm</Link>.
        </p>
      </section>
    </>
  );
}
