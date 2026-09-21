import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories, type Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  const categoryLabel = serviceCategories.find((category) => category.id === service.category)?.title ?? service.category;

  return (
    <article className="service-card reveal">
      <p className="eyebrow">{categoryLabel}</p>
      <h3>{service.shortTitle}</h3>
      <p>{service.excerpt}</p>
      <Link href={`/our-services/${service.slug}`} className="text-link">
        View service <ArrowRight size={14} />
      </Link>
    </article>
  );
}
