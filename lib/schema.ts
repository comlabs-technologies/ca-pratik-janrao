import { site } from "@/content/site";
import type { BlogPost } from "@/content/blogs";
import type { TeamMember } from "@/content/team";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phones[0],
    email: site.emails[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pin,
      addressCountry: "IN",
    },
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };
}

export function personSchema(member: TeamMember, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    image: member.image ? `${site.url}${member.image}` : undefined,
    worksFor: {
      "@type": "Organization",
      name: site.name,
    },
    url: `${site.url}${path}`,
  };
}

export function articleSchema(post: BlogPost, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/favicon-pja.svg`,
      },
    },
    mainEntityOfPage: `${site.url}${path}`,
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data) };
}
