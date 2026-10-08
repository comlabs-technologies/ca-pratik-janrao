import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone.replace("+91", "+91 ");
}

export function SiteFooter() {
  const phoneDisplay = formatPhone(site.phones[0]);

  return (
    <footer>
      <div className="footer-intro">
        <p className="footer-brand">{site.name}</p>
        <p className="footer-tagline">
          Chartered Accountants providing accounting, tax, audit, company filing and business support in India and Dubai.
        </p>
      </div>
      <div className="footer-grid">
        <div>
          <span>Company</span>
          {footerNav.company.map((item) => (
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
          <span>Pune Office</span>
          <address>
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}, {site.address.state} {site.address.pin}
          </address>
          <a href={`tel:${site.phones[0]}`}>{phoneDisplay}</a>
          <a href={`mailto:${site.emails[1]}`}>{site.emails[1]}</a>
        </div>
      </div>
      <div className="footer-wordmark">
        Pratik Janrao <i>&amp;</i> Associates
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
