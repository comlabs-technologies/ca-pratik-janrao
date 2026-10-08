import { serviceCategories, services } from "./services";
import { knowledgeBankSections } from "./knowledge-bank";

export const primaryNav = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/about-us",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Team", href: "/our-team" },
    ],
  },
  {
    label: "Services",
    href: "/our-services",
    megaMenu: "services" as const,
  },
  {
    label: "Knowledge Bank",
    href: "/knowledge-bank",
    megaMenu: "knowledge-bank" as const,
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact-us" },
];

export const serviceMegaMenu = serviceCategories.map((category) => ({
  ...category,
  items: services
    .filter((service) => service.category === category.id)
    .map((service) => ({
      label: service.shortTitle,
      href: `/our-services/${service.slug}`,
    })),
}));

export const knowledgeBankMegaMenu = knowledgeBankSections.map((section) => ({
  id: section.id,
  label: section.title,
  href: `/knowledge-bank/${section.slug}`,
  items: section.featuredItems.slice(0, 4).map((item) => ({
    label: item.title,
    href: item.href,
    external: item.external,
  })),
}));

export const footerNav = {
  company: [
    { label: "About the Firm", href: "/about-us" },
    { label: "Our Team", href: "/our-team" },
    { label: "Client Feedback", href: "/#reviews" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact-us" },
  ],
  services: [
    { label: "Audit and Assurance", href: "/our-services/auditing-and-assurance-services" },
    { label: "Income Tax and TDS", href: "/our-services/tds-compliances-of-income-tax-and-gst-services" },
    { label: "GST Support", href: "/our-services/gst-consultancy-and-compliances-services" },
    { label: "Accounting Support", href: "/our-services/financial-accounting-support-services" },
    { label: "Business Registrations", href: "/our-services/msme-and-startup-registrations-services" },
    { label: "Company and LLP Filings", href: "/our-services/mca-compliances-services" },
    { label: "View All Services", href: "/our-services" },
  ],
  resources: [
    { label: "Knowledge Bank", href: "/knowledge-bank" },
    { label: "Blogs and Insights", href: "/blogs" },
    { label: "Important Updates", href: "/knowledge-bank/bulletins" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
