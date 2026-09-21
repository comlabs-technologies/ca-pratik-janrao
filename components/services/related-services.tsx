import Link from "next/link";
import type { Service } from "@/content/services";

export function RelatedServices({ services }: { services: Service[] }) {
  if (!services.length) return null;

  return (
    <aside className="related-panel">
      <span>Related services</span>
      <ul>
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/our-services/${service.slug}`}>{service.shortTitle}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
