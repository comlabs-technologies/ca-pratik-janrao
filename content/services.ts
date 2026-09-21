export type ServiceCategoryId =
  | "audit-assurance"
  | "tax-gst"
  | "advisory-controls"
  | "registrations-compliance";

export type Service = {
  title: string;
  shortTitle: string;
  slug: string;
  category: ServiceCategoryId;
  excerpt: string;
  introduction: string;
  scope: string[];
  objectives: string[];
  approach: string;
  relatedServiceSlugs: string[];
  seoTitle: string;
  seoDescription: string;
};

export const serviceCategories: { id: ServiceCategoryId; title: string; description: string }[] = [
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    description: "Statutory, internal, management and information system audits that strengthen financial reliability.",
  },
  {
    id: "tax-gst",
    title: "Tax & GST",
    description: "Direct tax, GST, TDS and representation support explained clearly and handled with close attention to deadlines.",
  },
  {
    id: "advisory-controls",
    title: "Advisory & Controls",
    description: "Practical guidance on business models, internal controls, due diligence and financial operations.",
  },
  {
    id: "registrations-compliance",
    title: "Registrations & Compliance",
    description: "Registrations, certifications and statutory compliance managed from application to completion.",
  },
];

export const services: Service[] = [
  {
    title: "Auditing and Assurance",
    shortTitle: "Auditing and Assurance",
    slug: "auditing-and-assurance-services",
    category: "audit-assurance",
    excerpt:
      "Comprehensive audit and assurance services to ensure financial accuracy, compliance, and effective internal controls.",
    introduction:
      "Pratik Janrao & Associates provides auditing and assurance services to support the reliability of financial information and compliance with applicable laws. These services focus on examining financial records, evaluating internal systems, and assessing risk management processes to provide stakeholders with a fair and accurate representation of an organisation's financial position.",
    scope: [
      "Statutory audit — examination of financial statements as required under statutory provisions.",
      "Tax audit — review of accounts to confirm compliance with Income Tax regulations.",
      "Internal audit — independent evaluation of internal processes, systems, and controls.",
      "Management audit — assessment of management practices, efficiency, and decision-making.",
      "Special purpose audit — audits for due diligence, funding assessments, or regulatory reviews.",
    ],
    objectives: [
      "Strengthen the credibility of financial statements.",
      "Identify weaknesses in internal control systems.",
      "Ensure compliance with statutory and regulatory requirements.",
      "Provide insights for risk management and operational efficiency.",
    ],
    approach:
      "Audits are conducted using a structured methodology. This begins with an understanding of the client's business environment, followed by risk assessment, testing of controls, and verification of financial data. Reports are prepared with clarity and objectivity, offering not just compliance assurance but also insights for better decision-making.",
    relatedServiceSlugs: [
      "management-audit-legal-compliance-certification--fraud-detection-services",
      "information-system-audit-and-compliances-services",
      "tax-due-diligence-services",
    ],
    seoTitle: "Auditing and Assurance Services | Pratik Janrao & Associates",
    seoDescription:
      "Statutory, tax, internal, management and special purpose audit services for organisations in Pune and beyond.",
  },
  {
    title: "TDS Compliances of Income Tax and GST",
    shortTitle: "TDS Compliances",
    slug: "tds-compliances-of-income-tax-and-gst-services",
    category: "tax-gst",
    excerpt:
      "End-to-end support in deduction, deposit, and reporting of TDS/TCS under Income Tax and GST provisions.",
    introduction:
      "Timely and accurate TDS and TCS compliance is essential for businesses operating across multiple payment streams. We assist clients in understanding applicable provisions, deducting tax correctly, depositing amounts within prescribed timelines, and filing returns without administrative gaps.",
    scope: [
      "Advisory on TDS/TCS applicability across payments and transactions.",
      "Computation, deduction, and deposit of tax at source.",
      "Preparation and filing of quarterly TDS/TCS returns.",
      "Reconciliation of Form 26AS and challan records.",
      "Support during notices, assessments, and rectification requests.",
    ],
    objectives: [
      "Ensure timely deduction, deposit, and reporting of TDS/TCS.",
      "Reduce mismatch risks between books, returns, and Form 26AS.",
      "Provide clarity on cross-provisions involving Income Tax and GST.",
    ],
    approach:
      "We begin by mapping payment flows and identifying deductor obligations. Monthly and quarterly calendars are maintained for deposits and return filings, with reconciliations performed before each submission to minimise downstream notices.",
    relatedServiceSlugs: [
      "gst-consultancy-and-compliances-services",
      "representation-services",
      "financial-accounting-support-services",
    ],
    seoTitle: "TDS Compliance Services | Pratik Janrao & Associates",
    seoDescription:
      "TDS and TCS compliance support covering deduction, deposit, return filing and reconciliation for businesses.",
  },
  {
    title: "GST Consultancy and Compliances",
    shortTitle: "GST Consultancy",
    slug: "gst-consultancy-and-compliances-services",
    category: "tax-gst",
    excerpt:
      "Comprehensive support in GST registration, returns, compliance management, and advisory on indirect taxation.",
    introduction:
      "The Goods and Services Tax framework in India requires businesses to maintain proper records, file timely returns, and comply with various regulatory provisions. Pratik Janrao & Associates provides GST consultancy and compliance services to assist organisations in navigating these requirements with accuracy and efficiency.",
    scope: [
      "GST registration and amendments to existing registrations.",
      "Preparation and filing of GSTR-1, GSTR-3B, GSTR-9 and other applicable forms.",
      "Advisory on classification, rates, and input tax credit management.",
      "Reconciliation support for audits and departmental assessments.",
      "Guidance on e-invoicing, e-way bills, reverse charge, and sector-specific provisions.",
    ],
    objectives: [
      "Ensure compliance with GST provisions in an accurate and timely manner.",
      "Assist businesses in optimising input tax credit and managing cash flow.",
      "Provide clarity on GST-related issues to avoid disputes or non-compliance.",
    ],
    approach:
      "We follow a structured approach that begins with understanding the nature of business operations and identifying relevant GST obligations. With systematic monitoring, reconciliation, and advisory, clients remain compliant while also being prepared for audits and assessments.",
    relatedServiceSlugs: [
      "tds-compliances-of-income-tax-and-gst-services",
      "representation-services",
      "importexport-consultancy-services",
    ],
    seoTitle: "GST Consultancy and Compliance | Pratik Janrao & Associates",
    seoDescription:
      "GST registration, return filing, advisory, reconciliation and assessment support for Indian businesses.",
  },
  {
    title: "Business Model Canvassing",
    shortTitle: "Business Model Canvassing",
    slug: "business-model-canvassing-services",
    category: "advisory-controls",
    excerpt:
      "Structured development of business models to align strategy, resources, and financial outcomes.",
    introduction:
      "A clear business model helps founders and leadership teams connect revenue streams, cost structures, compliance obligations, and growth plans. We work with clients to articulate how the business creates and delivers value, and how financial and regulatory considerations fit into that structure.",
    scope: [
      "Review of existing business model and revenue architecture.",
      "Mapping of key resources, partners, and cost drivers.",
      "Identification of compliance and tax implications within the model.",
      "Scenario planning for expansion, restructuring, or new offerings.",
      "Documentation support for internal decision-making and external discussions.",
    ],
    objectives: [
      "Align commercial strategy with financial and regulatory realities.",
      "Improve clarity for founders, investors, and internal teams.",
      "Support informed decisions before capital or compliance commitments are made.",
    ],
    approach:
      "Engagements begin with structured conversations to understand the business context, followed by financial modelling inputs and compliance mapping. Recommendations are presented in plain language with practical next steps.",
    relatedServiceSlugs: [
      "internal-control-management-consultancy-services",
      "tax-due-diligence-services",
      "financial-accounting-support-services",
    ],
    seoTitle: "Business Model Canvassing | Pratik Janrao & Associates",
    seoDescription:
      "Structured business model development aligning strategy, resources, compliance and financial outcomes.",
  },
  {
    title: "Representation Services",
    shortTitle: "Representation Services",
    slug: "representation-services",
    category: "tax-gst",
    excerpt:
      "Assistance in representing clients before tax, regulatory, and government authorities.",
    introduction:
      "When clients need to engage with tax or regulatory authorities, clear documentation and disciplined representation matter. We support clients through inquiries, assessments, and procedural matters with a focus on accuracy, responsiveness, and professional conduct.",
    scope: [
      "Representation before Income Tax authorities.",
      "Support during GST departmental proceedings.",
      "Assistance with responses to notices and information requests.",
      "Coordination for hearings, submissions, and follow-up documentation.",
      "Liaison support involving multidisciplinary firm expertise where required.",
    ],
    objectives: [
      "Present client matters clearly and completely before authorities.",
      "Reduce procedural delays through organised documentation.",
      "Provide clients with a dependable point of accountability during proceedings.",
    ],
    approach:
      "Each matter is reviewed for facts, timelines, and supporting records before a response strategy is prepared. Clients receive clear guidance on required documents and expected next steps throughout the process.",
    relatedServiceSlugs: [
      "gst-consultancy-and-compliances-services",
      "tds-compliances-of-income-tax-and-gst-services",
      "tax-due-diligence-services",
    ],
    seoTitle: "Tax Representation Services | Pratik Janrao & Associates",
    seoDescription:
      "Professional representation before tax and regulatory authorities for Income Tax and GST matters.",
  },
  {
    title: "MSME and Start-up Registrations",
    shortTitle: "MSME & Start-up Registrations",
    slug: "msme-and-startup-registrations-services",
    category: "registrations-compliance",
    excerpt:
      "Advisory and assistance in obtaining registrations and benefits available to MSMEs and startups.",
    introduction:
      "Appropriate registrations can unlock benefits, improve credibility, and simplify compliance for early-stage and growing businesses. We guide clients through eligibility, documentation, and application processes for MSME and startup registrations.",
    scope: [
      "Advisory on MSME/Udyam registration requirements.",
      "Startup India registration and related documentation support.",
      "Guidance on benefits, exemptions, and compliance linked to registrations.",
      "Coordination for amendments and status updates where applicable.",
    ],
    objectives: [
      "Help eligible businesses obtain relevant registrations efficiently.",
      "Clarify the compliance implications of each registration route.",
      "Support founders in focusing on operations while registrations are managed properly.",
    ],
    approach:
      "We review entity details and business activity first, then prepare documentation checklists and complete filings with follow-up until registration confirmation is received.",
    relatedServiceSlugs: [
      "mca-compliances-services",
      "iso-certification-trademark-and-copyright-registration-services",
      "gst-consultancy-and-compliances-services",
    ],
    seoTitle: "MSME and Startup Registration | Pratik Janrao & Associates",
    seoDescription:
      "MSME, Udyam and Startup India registration advisory and application support for growing businesses.",
  },
  {
    title: "ISO Certification, Trademark, and Copyright Registration",
    shortTitle: "ISO, Trademark & Copyright",
    slug: "iso-certification-trademark-and-copyright-registration-services",
    category: "registrations-compliance",
    excerpt:
      "Guidance and support in obtaining ISO certifications and protecting intellectual property.",
    introduction:
      "Certifications and intellectual property registrations strengthen credibility and protect business assets. We assist clients in understanding requirements, preparing documentation, and coordinating applications for ISO, trademark, and copyright registrations.",
    scope: [
      "Advisory on applicable ISO standards and certification pathways.",
      "Trademark search, application, and follow-up support.",
      "Copyright registration assistance for eligible works.",
      "Documentation and coordination with relevant authorities or agencies.",
    ],
    objectives: [
      "Support clients in securing certifications and IP registrations correctly.",
      "Reduce delays caused by incomplete or inconsistent applications.",
      "Provide clarity on ongoing compliance linked to certifications.",
    ],
    approach:
      "Each engagement starts with scope confirmation and a documentation checklist. Applications are prepared carefully and tracked through to acknowledgement or registration outcomes.",
    relatedServiceSlugs: [
      "msme-and-startup-registrations-services",
      "mca-compliances-services",
      "business-model-canvassing-services",
    ],
    seoTitle: "ISO, Trademark & Copyright Registration | Pratik Janrao & Associates",
    seoDescription:
      "ISO certification, trademark and copyright registration support for businesses and professionals.",
  },
  {
    title: "Management Audit, Legal Compliance Certification & Fraud Detection",
    shortTitle: "Management Audit & Fraud Detection",
    slug: "management-audit-legal-compliance-certification--fraud-detection-services",
    category: "audit-assurance",
    excerpt:
      "Independent review of management practices, legal compliance certification, and fraud detection support.",
    introduction:
      "Management audits and compliance certification reviews help leadership understand whether operations, controls, and legal obligations are being met reliably. We provide structured assessments that highlight gaps, risks, and practical improvements.",
    scope: [
      "Management audit covering processes, efficiency, and governance practices.",
      "Legal compliance certification and verification support.",
      "Fraud detection reviews and red-flag assessments.",
      "Reporting with actionable recommendations for management.",
    ],
    objectives: [
      "Improve visibility over management and compliance performance.",
      "Identify control weaknesses before they become regulatory issues.",
      "Support boards and leadership with objective review findings.",
    ],
    approach:
      "Reviews are scoped against the client's operating environment and regulatory obligations. Fieldwork, documentation testing, and management discussions inform a clear report with prioritised recommendations.",
    relatedServiceSlugs: [
      "auditing-and-assurance-services",
      "internal-control-management-consultancy-services",
      "information-system-audit-and-compliances-services",
    ],
    seoTitle: "Management Audit & Fraud Detection | Pratik Janrao & Associates",
    seoDescription:
      "Management audit, legal compliance certification and fraud detection services for organisations.",
  },
  {
    title: "Information System Audit and Compliances",
    shortTitle: "Information System Audit",
    slug: "information-system-audit-and-compliances-services",
    category: "audit-assurance",
    excerpt:
      "Evaluation of IT systems, controls, and security measures to ensure reliable information processing.",
    introduction:
      "As businesses depend more on digital systems, the reliability of IT controls becomes central to financial and regulatory confidence. We evaluate information systems, access controls, and compliance processes to identify risks and improvement areas.",
    scope: [
      "Review of IT general controls and application controls.",
      "Assessment of data integrity, access management, and backup processes.",
      "Compliance evaluation for relevant statutory or industry requirements.",
      "Reporting on control gaps and remediation priorities.",
    ],
    objectives: [
      "Strengthen confidence in systems supporting financial reporting.",
      "Identify IT control weaknesses that could affect compliance or operations.",
      "Support management in prioritising remediation efforts.",
    ],
    approach:
      "Engagements combine process walkthroughs, control testing, and discussions with IT and finance teams. Findings are documented with practical recommendations suited to the client's scale and systems.",
    relatedServiceSlugs: [
      "auditing-and-assurance-services",
      "internal-control-management-consultancy-services",
      "management-audit-legal-compliance-certification--fraud-detection-services",
    ],
    seoTitle: "Information System Audit | Pratik Janrao & Associates",
    seoDescription:
      "IT systems audit and compliance evaluation for controls, security and information reliability.",
  },
  {
    title: "Import-Export Consultancy",
    shortTitle: "Import-Export Consultancy",
    slug: "importexport-consultancy-services",
    category: "advisory-controls",
    excerpt:
      "Advisory and compliance support for businesses engaged in import and export operations.",
    introduction:
      "Cross-border trade involves customs, GST, documentation, and policy considerations that must be handled carefully. We advise clients on import-export compliance, registrations, and procedural requirements relevant to their trade activity.",
    scope: [
      "Advisory on import-export registrations and documentation.",
      "Guidance on customs and GST implications for trade transactions.",
      "Support with policy schemes and procedural compliance.",
      "Coordination for queries involving indirect tax and regulatory aspects.",
    ],
    objectives: [
      "Help trade businesses maintain compliant import-export operations.",
      "Clarify documentation and tax treatment for cross-border transactions.",
      "Reduce procedural delays through organised compliance support.",
    ],
    approach:
      "We begin by understanding the client's trade profile, product categories, and current documentation. Advisory and compliance support are then aligned to the specific routes and authorities involved.",
    relatedServiceSlugs: [
      "gst-consultancy-and-compliances-services",
      "representation-services",
      "financial-accounting-support-services",
    ],
    seoTitle: "Import-Export Consultancy | Pratik Janrao & Associates",
    seoDescription:
      "Import-export advisory and compliance support for customs, GST and trade documentation.",
  },
  {
    title: "Internal Control Management Consultancy",
    shortTitle: "Internal Control Consultancy",
    slug: "internal-control-management-consultancy-services",
    category: "advisory-controls",
    excerpt:
      "Development and implementation of internal control systems that support reliable operations and reporting.",
    introduction:
      "Strong internal controls reduce errors, improve accountability, and support audit readiness. We help organisations design, document, and implement control frameworks suited to their size, complexity, and regulatory environment.",
    scope: [
      "Assessment of existing control environment and process gaps.",
      "Design of internal control policies and procedures.",
      "Implementation support and staff orientation.",
      "Periodic review and improvement recommendations.",
    ],
    objectives: [
      "Create controls that are practical rather than purely theoretical.",
      "Improve reliability of financial and operational reporting.",
      "Support audit readiness and regulatory confidence.",
    ],
    approach:
      "Control design begins with process mapping and risk identification. Recommendations are phased so clients can implement improvements without disrupting day-to-day operations.",
    relatedServiceSlugs: [
      "auditing-and-assurance-services",
      "management-audit-legal-compliance-certification--fraud-detection-services",
      "financial-accounting-support-services",
    ],
    seoTitle: "Internal Control Consultancy | Pratik Janrao & Associates",
    seoDescription:
      "Internal control design, implementation and review services for growing organisations.",
  },
  {
    title: "Tax Due Diligence",
    shortTitle: "Tax Due Diligence",
    slug: "tax-due-diligence-services",
    category: "audit-assurance",
    excerpt:
      "Comprehensive review of tax records and compliance history to identify risks before transactions or investments.",
    introduction:
      "Tax due diligence provides buyers, investors, and leadership teams with a clear view of tax exposures, compliance history, and potential liabilities. We conduct structured reviews that support informed commercial decisions.",
    scope: [
      "Review of direct and indirect tax compliance history.",
      "Assessment of pending notices, assessments, and disputes.",
      "Evaluation of transfer pricing and related tax positions where applicable.",
      "Reporting of key risks, exposures, and remediation considerations.",
    ],
    objectives: [
      "Surface tax risks before transactions close.",
      "Support negotiation and structuring with reliable information.",
      "Provide clarity on post-transaction compliance obligations.",
    ],
    approach:
      "Due diligence begins with a data request tailored to the transaction type. Records are reviewed against returns, challans, and correspondence to produce a concise risk summary for decision-makers.",
    relatedServiceSlugs: [
      "auditing-and-assurance-services",
      "representation-services",
      "business-model-canvassing-services",
    ],
    seoTitle: "Tax Due Diligence | Pratik Janrao & Associates",
    seoDescription:
      "Tax due diligence reviews for transactions, investments and restructuring decisions.",
  },
  {
    title: "Financial Accounting Support",
    shortTitle: "Financial Accounting Support",
    slug: "financial-accounting-support-services",
    category: "advisory-controls",
    excerpt:
      "End-to-end assistance in maintaining accurate books of accounts and financial records.",
    introduction:
      "Dependable accounting records are the foundation of compliance, reporting, and management decisions. We support clients in maintaining accurate books, preparing financial statements, and establishing reporting routines that leadership can rely on.",
    scope: [
      "Bookkeeping and accounts maintenance support.",
      "Financial statement preparation and review.",
      "Reconciliation of bank, GST, and TDS records.",
      "Support for year-end closing and audit readiness.",
    ],
    objectives: [
      "Maintain records that are accurate, complete, and audit-ready.",
      "Provide management with timely financial visibility.",
      "Reduce compliance friction through organised accounting processes.",
    ],
    approach:
      "Accounting support is structured around the client's transaction volume and reporting needs. Regular reconciliations and review checkpoints keep records dependable throughout the year.",
    relatedServiceSlugs: [
      "auditing-and-assurance-services",
      "tds-compliances-of-income-tax-and-gst-services",
      "internal-control-management-consultancy-services",
    ],
    seoTitle: "Financial Accounting Support | Pratik Janrao & Associates",
    seoDescription:
      "Bookkeeping, accounts maintenance and financial reporting support for businesses.",
  },
  {
    title: "MCA Compliances",
    shortTitle: "MCA Compliances",
    slug: "mca-compliances-services",
    category: "registrations-compliance",
    excerpt:
      "Company law compliance, filings, and secretarial support for companies, LLPs, and growing enterprises.",
    introduction:
      "Corporate entities must meet ongoing MCA filing and governance requirements. We provide secretarial and compliance support to help clients stay current with company law obligations and filing calendars.",
    scope: [
      "Annual filing and event-based MCA form preparation.",
      "Board and shareholder documentation support.",
      "Compliance calendar management for companies and LLPs.",
      "Advisory on company law matters and structural changes.",
    ],
    objectives: [
      "Keep MCA filings current and accurately prepared.",
      "Reduce the risk of penalties from missed or incorrect submissions.",
      "Provide clients with a clear view of upcoming compliance obligations.",
    ],
    approach:
      "Compliance calendars are maintained at the start of each engagement. Documentation is prepared in advance of due dates, with review checkpoints before submission on MCA portals.",
    relatedServiceSlugs: [
      "msme-and-startup-registrations-services",
      "management-audit-legal-compliance-certification--fraud-detection-services",
      "financial-accounting-support-services",
    ],
    seoTitle: "MCA Compliances | Pratik Janrao & Associates",
    seoDescription:
      "MCA filing, company law compliance and secretarial support for companies and LLPs.",
  },
];

export const homepageServices = [
  services[0],
  services[2],
  services[3],
  services[13],
  services[5],
  services[12],
].map((service) => ({
  title: service.shortTitle,
  text: service.excerpt,
  href: `/our-services/${service.slug}`,
}));

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]) {
  return slugs.map((slug) => getServiceBySlug(slug)).filter(Boolean) as Service[];
}
