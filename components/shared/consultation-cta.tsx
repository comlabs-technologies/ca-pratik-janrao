import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type ConsultationCtaProps = {
  title?: string;
  eyebrow?: string;
  href?: string;
  dark?: boolean;
};

export function ConsultationCta({
  title = "Start with the question, not the paperwork.",
  eyebrow = "A conversation first",
  href = "/contact-us",
  dark = false,
}: ConsultationCtaProps) {
  if (dark) {
    return (
      <section className="consultation-band">
        <div className="consultation-band-inner reveal">
          <div>
            <p className="eyebrow dark-label">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          <Link className="pill pill-light" href={href}>
            Book a consultation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cta-section section">
      <div className="cta-card reveal">
        <Image src="/images/hero-office.png" alt="A private advisory conversation" fill sizes="(max-width: 800px) 100vw, 80vw" />
        <div className="cta-shade" />
        <div>
          <p className="eyebrow light">{eyebrow}</p>
          <h2>{title}</h2>
          <Link className="pill pill-light" href={href}>
            Schedule a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
