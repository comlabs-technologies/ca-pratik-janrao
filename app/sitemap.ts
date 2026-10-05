import type { MetadataRoute } from "next";
import { getAllBlogPosts, getPublishedCaseStudies } from "@/lib/cms/public";
import { getAllKnowledgeResources, knowledgeBankSections } from "@/content/knowledge-bank";
import { services } from "@/content/services";
import { getTeamMembersWithProfiles } from "@/content/team";
import { site } from "@/content/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, caseStudies] = await Promise.all([getAllBlogPosts(), getPublishedCaseStudies()]);
  const staticRoutes = [
    "",
    "/about-us",
    "/our-team",
    "/our-services",
    "/blogs",
    "/case-studies",
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

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${site.url}/case-studies/${study.slug}`,
    lastModified: new Date(study.updatedAt),
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
    ...caseStudyRoutes,
    ...knowledgeSectionRoutes,
    ...knowledgeDetailRoutes,
  ];
}
