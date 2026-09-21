export type KnowledgeResource = {
  title: string;
  slug: string;
  excerpt?: string;
  href: string;
  external: boolean;
  migrated?: boolean;
};

export type KnowledgeSection = {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredItems: KnowledgeResource[];
  groups?: { title: string; items: KnowledgeResource[] }[];
};

const external = (title: string, slug: string, href: string, excerpt?: string): KnowledgeResource => ({
  title,
  slug,
  href,
  external: true,
  excerpt,
});

const internal = (title: string, slug: string, section: string, excerpt?: string): KnowledgeResource => ({
  title,
  slug,
  href: `/knowledge-bank/${section}/${slug}`,
  external: false,
  excerpt,
  migrated: false,
});

export const knowledgeBankSections: KnowledgeSection[] = [
  {
    id: "acts",
    title: "Acts",
    slug: "acts",
    description: "Reference links to major Acts governing direct tax, indirect tax, corporate law and related statutes.",
    featuredItems: [
      external("Income Tax Act, 1961", "income-tax-act", "https://incometaxindia.gov.in/pages/acts/income-tax-act.aspx"),
      external("CGST Act, 2017", "cgst-act", "https://cbic-gst.gov.in/cgst-act.html"),
      external("Companies Act, 2013", "companies-act", "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html"),
    ],
    groups: [
      {
        title: "Direct Tax",
        items: [
          external("Income Tax Act, 1961", "direct-tax-income-tax-act", "https://incometaxindia.gov.in/pages/acts/income-tax-act.aspx"),
        ],
      },
      {
        title: "Indirect Tax",
        items: [
          external("CGST Act, 2017", "indirect-tax-cgst-act", "https://cbic-gst.gov.in/cgst-act.html"),
          external("IGST Act, 2017", "indirect-tax-igst-act", "https://cbic-gst.gov.in/igst-act.html"),
        ],
      },
      {
        title: "GST Laws",
        items: [
          external("GST Acts and Rules", "gst-laws", "https://cbic-gst.gov.in/gst-acts-rules.html"),
        ],
      },
      {
        title: "Corporate Laws",
        items: [
          external("Companies Act, 2013", "corporate-laws-companies-act", "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html"),
        ],
      },
      {
        title: "Other Statutes",
        items: [
          internal("Additional statutes", "other-statutes", "acts", "Resource catalogue being migrated."),
        ],
      },
    ],
  },
  {
    id: "rules",
    title: "Rules",
    slug: "rules",
    description: "Rules and procedural frameworks under direct tax, GST, corporate and related laws.",
    featuredItems: [
      external("Income Tax Rules", "income-tax-rules", "https://incometaxindia.gov.in/pages/acts/income-tax-rules-1962.aspx"),
      external("CGST Rules", "cgst-rules", "https://cbic-gst.gov.in/cgst-rules.html"),
      external("Companies Rules", "companies-rules", "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/rules.html"),
    ],
    groups: [
      {
        title: "Direct Tax",
        items: [external("Income Tax Rules, 1962", "rules-direct-tax", "https://incometaxindia.gov.in/pages/acts/income-tax-rules-1962.aspx")],
      },
      {
        title: "GST Laws",
        items: [external("GST Rules", "rules-gst", "https://cbic-gst.gov.in/gst-acts-rules.html")],
      },
      {
        title: "Corporate Laws",
        items: [external("Companies Rules", "rules-corporate", "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/rules.html")],
      },
    ],
  },
  {
    id: "bulletins",
    title: "Bulletins",
    slug: "bulletins",
    description: "Circulars, notifications and official updates from tax and regulatory authorities.",
    featuredItems: [
      external("Income Tax Circulars", "income-tax-circulars", "https://incometaxindia.gov.in/pages/communications/circulars.aspx"),
      external("CBIC Notifications", "cbic-notifications", "https://cbic-gst.gov.in/notifications.html"),
    ],
    groups: [
      {
        title: "Circulars and Notifications",
        items: [
          external("Income Tax Circulars", "circulars-income-tax", "https://incometaxindia.gov.in/pages/communications/circulars.aspx"),
          external("CBIC Notifications", "circulars-cbic", "https://cbic-gst.gov.in/notifications.html"),
        ],
      },
    ],
  },
  {
    id: "utilities",
    title: "Utilities",
    slug: "utilities",
    description: "Quick-reference tools, rates, indices and calculators for tax and compliance planning.",
    featuredItems: [
      internal("TDS rates", "tds-rates", "utilities", "Reference summary being migrated."),
      internal("Income-tax rates", "income-tax-rates", "utilities", "Reference summary being migrated."),
      internal("Depreciation rates", "depreciation-rates", "utilities", "Reference summary being migrated."),
      internal("Cost Inflation Index", "cost-inflation-index", "utilities", "Reference summary being migrated."),
    ],
    groups: [
      {
        title: "Rates and indices",
        items: [
          internal("Income Tax Bill 2025 resources", "income-tax-bill-2025", "utilities"),
          internal("TDS rates", "tds-rates", "utilities"),
          internal("Income-tax rates", "income-tax-rates", "utilities"),
          internal("Depreciation rates", "depreciation-rates", "utilities"),
          internal("ROC fees", "roc-fees", "utilities"),
          internal("Cost Inflation Index", "cost-inflation-index", "utilities"),
          internal("NSC interest rates", "nsc-interest-rates", "utilities"),
          internal("Gold and silver rates", "gold-silver-rates", "utilities"),
          internal("Stamp duty", "stamp-duty", "utilities"),
          internal("LLP fees", "llp-fees", "utilities"),
          internal("80TTA vs 80TTB", "80tta-vs-80ttb", "utilities"),
          internal("IFSC and MICR resources", "ifsc-micr", "utilities"),
        ],
      },
    ],
  },
  {
    id: "important-links",
    title: "Important Links",
    slug: "important-links",
    description: "Authoritative government portals and professional bodies.",
    featuredItems: [
      external("Income Tax Portal", "income-tax", "https://www.incometax.gov.in"),
      external("CBIC GST Portal", "cbic", "https://www.cbic.gov.in"),
      external("MCA Portal", "mca", "https://www.mca.gov.in"),
      external("ICAI", "icai", "https://www.icai.org"),
    ],
    groups: [
      {
        title: "Government portals",
        items: [
          external("PAN services", "pan", "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"),
          external("TAN services", "tan", "https://www.tin-nsdl.com/services/tan/tan-index.html"),
          external("Income Tax", "link-income-tax", "https://www.incometax.gov.in"),
          external("CBIC", "link-cbic", "https://www.cbic.gov.in"),
          external("PF and ESI", "pf-esi", "https://www.epfindia.gov.in"),
          external("MCA", "link-mca", "https://www.mca.gov.in"),
          external("Supreme Court", "supreme-court", "https://main.sci.gov.in"),
        ],
      },
      {
        title: "Professional bodies",
        items: [
          external("ICAI", "link-icai", "https://www.icai.org"),
          external("ICSI", "link-icsi", "https://www.icsi.edu"),
        ],
      },
    ],
  },
];

export function getKnowledgeSection(slug: string) {
  return knowledgeBankSections.find((section) => section.slug === slug);
}

export function getKnowledgeResource(sectionSlug: string, resourceSlug: string) {
  const section = getKnowledgeSection(sectionSlug);
  if (!section) return null;

  for (const group of section.groups ?? []) {
    const match = group.items.find((item) => item.slug === resourceSlug);
    if (match) return { section, resource: match };
  }

  const featured = section.featuredItems.find((item) => item.slug === resourceSlug);
  if (featured) return { section, resource: featured };

  return null;
}

export function getAllKnowledgeResources() {
  return knowledgeBankSections.flatMap((section) => [
    ...section.featuredItems.map((resource) => ({ section, resource })),
    ...(section.groups?.flatMap((group) => group.items.map((resource) => ({ section, resource }))) ?? []),
  ]);
}
