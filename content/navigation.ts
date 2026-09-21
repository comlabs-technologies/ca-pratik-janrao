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
  explore: [
    { label: "Our firm", href: "/about-us" },
    { label: "Our team", href: "/our-team" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/contact-us" },
  ],
  services: [
    { label: "Audit & assurance", href: "/our-services/auditing-and-assurance-services" },
    { label: "Tax & GST", href: "/our-services/gst-consultancy-and-compliances-services" },
    { label: "Business advisory", href: "/our-services/business-model-canvassing-services" },
    { label: "All services", href: "/our-services" },
  ],
  resources: [
    { label: "Knowledge Bank", href: "/knowledge-bank" },
    { label: "Insights", href: "/blogs" },
    { label: "Careers", href: "/careers" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
