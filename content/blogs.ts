export type BlogSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string; level?: 2 | 3 }
  | { type: "list"; items: string[] };

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  heroImage?: string;
  sections: BlogSection[];
  relatedServiceSlug?: string;
  seoTitle: string;
  seoDescription: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "GST Overhauled: Council Slashes Rates, Scraps Slabs, and Exempts Insurance in Landmark Meeting",
    slug: "gst-overhauled-council-slashes-rates-scraps-slabs-and-exempts-insurance-in-landmark-meeting-details",
    excerpt:
      "The 56th GST Council meeting brings a historic overhaul with a simplified three-slab structure, rate cuts, key exemptions, and GST-free insurance to ease compliance and reduce costs.",
    date: "2025-09-04",
    author: "Pratik Janrao & Associates",
    category: "GST",
    sections: [
      {
        type: "paragraph",
        content:
          "On September 3, 2025, the 56th GST Council meeting concluded with a series of significant announcements. Chaired by Union Finance Minister Nirmala Sitharaman, the council approved a simplification of the GST structure, rate reductions on numerous goods, and relief on essential goods and services.",
      },
      {
        type: "heading",
        content: "A new three-slab structure",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "The previous four-tier structure of 5%, 12%, 18%, and 28% is being rationalised into a three-slab framework: 5% for essential goods, 18% as a broad standard rate, and 40% for luxury and sin goods.",
      },
      {
        type: "heading",
        content: "Relief for consumers and households",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Consumer durables such as televisions and appliances move from 28% to 18%.",
          "Small cars and two-wheelers become more affordable with a reduced GST rate.",
          "Cement is taxed at 18% instead of 28%, lowering construction costs.",
          "UHT milk, pre-packaged paneer, and Indian bread varieties are fully exempt.",
          "Insurance premiums for individual health and life policies are GST-free.",
        ],
      },
      {
        type: "paragraph",
        content:
          "These changes, effective from September 22, 2025, aim to boost consumption, ease the cost of living, and simplify tax compliance for businesses across India.",
      },
    ],
    relatedServiceSlug: "gst-consultancy-and-compliances-services",
    seoTitle: "GST Overhauled: 56th Council Meeting Summary | PJA",
    seoDescription:
      "Summary of the 56th GST Council meeting covering the new three-slab structure, rate cuts, exemptions and GST-free insurance.",
  },
  {
    title: "What Startups Need to Know About GST",
    slug: "what-startups-need-to-know-about-gst-details",
    excerpt:
      "An overview of GST essentials, registration thresholds, benefits, and compliance requirements for startups.",
    date: "2025-08-27",
    author: "Pratik Janrao & Associates",
    category: "GST",
    sections: [
      {
        type: "paragraph",
        content:
          "The Goods and Services Tax (GST), implemented in India on July 1, 2017, is a comprehensive, multi-stage, destination-based tax that replaced multiple indirect taxes. For startups, understanding GST is crucial to ensure compliance, optimise tax benefits, and streamline operations.",
      },
      {
        type: "heading",
        content: "When should startups register?",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Goods suppliers generally register once annual turnover exceeds ₹40 lakh (₹20 lakh in special category states).",
          "Service providers register once turnover exceeds ₹20 lakh (₹10 lakh in special category states).",
          "Inter-state supplies and e-commerce operations require registration regardless of turnover.",
        ],
      },
      {
        type: "heading",
        content: "Compliance essentials",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Registered startups must file returns such as GSTR-1 and GSTR-3B, maintain GST-compliant invoices, and pay tax monthly after adjusting eligible input tax credit. Non-compliance can lead to interest and penalties.",
      },
      {
        type: "paragraph",
        content:
          "Startups should assess registration needs early, maintain accurate records, and monitor GST Council updates to adapt to changes in rates, rules, or exemptions.",
      },
    ],
    relatedServiceSlug: "gst-consultancy-and-compliances-services",
    seoTitle: "What Startups Need to Know About GST | PJA",
    seoDescription:
      "GST registration thresholds, composition scheme, compliance requirements and practical guidance for startups.",
  },
  {
    title: "Tax and Regulatory Compliance for Growing Businesses",
    slug: "tax-and-regulatory-compliance-for-growing-businesses-details",
    excerpt:
      "A practical guide to choosing the right business structure, registrations, and ongoing compliance for growing ventures.",
    date: "2025-08-27",
    author: "Pratik Janrao & Associates",
    category: "Compliance",
    sections: [
      {
        type: "paragraph",
        content:
          "Starting and scaling a business in India requires careful planning, regulatory compliance, and structured execution. The legal and tax framework offers multiple entity options, each with distinct obligations.",
      },
      {
        type: "heading",
        content: "Choosing the right business structure",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Proprietorship for small single-owner businesses.",
          "Partnership firm for shared ownership and responsibilities.",
          "LLP for limited liability with operational flexibility.",
          "Private limited company for scalability, fundraising, and structured governance.",
        ],
      },
      {
        type: "heading",
        content: "Registration and ongoing compliance",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Beyond incorporation, businesses may require PAN, TAN, GST registration, professional tax, and sector-specific licences. Regular filings, accounting records, tax payments, and audits where applicable must be maintained to avoid penalties.",
      },
      {
        type: "paragraph",
        content:
          "Sound financial planning and early adoption of proper accounting practices help growing businesses stay compliant while focusing on operations.",
      },
    ],
    relatedServiceSlug: "mca-compliances-services",
    seoTitle: "Tax and Regulatory Compliance for Growing Businesses | PJA",
    seoDescription:
      "Practical guidance on business structures, registrations and compliance for growing businesses in India.",
  },
  {
    title: "Common Reasons for Receiving a Section 142 Income Tax Notice",
    slug: "common-reasons-for-receiving-a-section-142-income-tax-notice-details",
    excerpt:
      "Understanding why Section 142(1) notices are issued and how to respond promptly and accurately.",
    date: "2025-08-27",
    author: "Pratik Janrao & Associates",
    category: "Income Tax",
    sections: [
      {
        type: "paragraph",
        content:
          "Receiving a notice under Section 142(1) of the Income Tax Act can feel overwhelming, but it is often a routine inquiry to ensure accurate tax assessment rather than an accusation of wrongdoing.",
      },
      {
        type: "heading",
        content: "Common reasons for a Section 142(1) notice",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Non-filing of income tax return within the due date.",
          "Discrepancies between filed ITR and department records.",
          "High-value transactions not reflected in the return.",
          "Incomplete or inaccurate return details.",
          "Scrutiny requiring supporting documents.",
          "Foreign income or assets not disclosed.",
          "Information received from banks and third parties.",
        ],
      },
      {
        type: "heading",
        content: "How to respond",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Read the notice carefully, gather the requested documents, and respond through the e-Filing portal within the specified timeline. Prompt and accurate responses help avoid penalties and best-judgment assessments.",
      },
      {
        type: "paragraph",
        content:
          "If the notice is complex, consult a tax professional to ensure your response is complete and compliant.",
      },
    ],
    relatedServiceSlug: "representation-services",
    seoTitle: "Section 142 Income Tax Notice: Common Reasons | PJA",
    seoDescription:
      "Common reasons for receiving a Section 142(1) income tax notice and practical steps to respond.",
  },
];

export function getBlogBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3) {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
