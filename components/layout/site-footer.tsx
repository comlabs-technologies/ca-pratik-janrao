import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <span>Explore</span>
          {footerNav.explore.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span>Services</span>
          {footerNav.services.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span>Resources</span>
          {footerNav.resources.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span>Office</span>
          <address>
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city} {site.address.pin}
          </address>
        </div>
      </div>
      <div className="footer-wordmark">
        Pratik Janrao <i>&amp;</i> Associates
      </div>
      <div className="footer-bottom">
        <p>{site.tagline}</p>
        <p>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
