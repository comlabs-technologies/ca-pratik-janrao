import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blogs";
import { getAllKnowledgeResources, knowledgeBankSections } from "@/content/knowledge-bank";
import { services } from "@/content/services";
import { getTeamMembersWithProfiles } from "@/content/team";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about-us",
    "/our-team",
    "/our-services",
    "/blogs",
    "/knowledge-bank",
    "/careers",
    "/contact-us",
    "/disclaimer",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${site.url}/our-services/${service.slug}`,
    lastModified: new Date(),
  }));

  const teamRoutes = getTeamMembersWithProfiles().map((member) => ({
    url: `${site.url}/our-team/${member.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const knowledgeSectionRoutes = knowledgeBankSections.map((section) => ({
    url: `${site.url}/knowledge-bank/${section.slug}`,
    lastModified: new Date(),
  }));

  const knowledgeDetailRoutes = getAllKnowledgeResources()
    .filter(({ resource }) => !resource.external)
    .map(({ section, resource }) => ({
      url: `${site.url}/knowledge-bank/${section.slug}/${resource.slug}`,
      lastModified: new Date(),
    }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...teamRoutes,
    ...blogRoutes,
    ...knowledgeSectionRoutes,
    ...knowledgeDetailRoutes,
  ];
}
