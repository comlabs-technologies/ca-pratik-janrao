"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { homepageServices } from "@/content/homepage-services";
import { homepageTeamPreview } from "@/content/team";
import { TeamCard } from "@/components/team/team-card";
import { ContactForm } from "@/components/forms/contact-form";
import { ReviewTestimonialScroll } from "@/components/home/scroll-reveal-quote";
import { LocationsSection } from "@/components/home/locations-section";

const faqs = [
  {
    q: "What type of clients do you work with?",
    a: "We work with individuals, professionals, founders, startups, family businesses and small to mid-sized companies across different industries.",
  },
  {
    q: "Can you manage accounting, audit, tax and company filings together?",
    a: "Yes. Our team covers accounting, audit, income tax, GST, company filings and related legal matters. This gives you one place to manage different financial and business requirements.",
  },
  {
    q: "Do you support clients outside Pune?",
    a: "Yes. We work with clients across India and also support businesses with requirements in Dubai. Many discussions and document processes can be completed online.",
  },
  {
    q: "What information should I share during the first conversation?",
    a: "A short description of your requirement is enough to begin. If documents are needed, our team will tell you exactly what to provide.",
  },
  {
    q: "What happens after the first call?",
    a: "We will understand your requirement, explain the recommended next steps and share the expected work, timeline and professional fees before beginning.",
  },
];

export function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <>
      <section className="hero" id="top">
        <Image src="/images/hero-office.png" alt="A contemporary professional office" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <p className="eyebrow light">Chartered accountants · Pune</p>
          <h1>Accounting, tax and business advice you can understand.</h1>
          <p className="hero-copy">
            We help individuals, professionals, startups and established businesses with audits, tax, GST, company filings and
            everyday financial matters in India and Dubai.
          </p>
          <div className="hero-actions">
            <Link className="pill pill-light" href="/contact-us">
              Talk to Our Team <ArrowRight size={15} />
            </Link>
            <Link className="plain-link" href="/about-us">
              Learn About Us
            </Link>
          </div>
        </div>
        <div className="hero-proof">
          <div className="client-faces">
            <Image src="/images/pratik-janrao.jpeg" alt="" width={34} height={34} />
            <Image src="/images/anita-swami.png" alt="" width={34} height={34} />
          </div>
          <span>
            <b>Established in 2014</b>
            <small>Experienced professionals involved throughout your work</small>
          </span>
        </div>
        <div className="hero-feature">
          <div className="feature-thumb">
            <Image src="/images/pratik-janrao.jpeg" alt="CA Pratik Janrao" fill sizes="110px" />
          </div>
          <p>Get clear answers from a team that understands accounting, tax, company law and legal matters.</p>
        </div>
      </section>

      <section className="credential-strip" aria-label="Firm credentials">
        <span>Chartered Accountants</span>
        <span>Cost Accountants</span>
        <span>Company Secretaries</span>
        <span>Legal Professionals</span>
        <span>India and Dubai</span>
      </section>

      <section className="approach section" id="about">
        <div className="section-intro reveal">
          <p className="eyebrow">How we work</p>
          <h2>
            Clear advice. Reliable support.
            <br />
            One responsible team.
          </h2>
          <p className="section-heading-copy">We explain what needs to be done, why it matters and what happens next.</p>
        </div>
        <div className="approach-grid reveal">
          <article className="value-card">
            <h3>Simple explanations</h3>
            <p>We explain financial and legal matters in clear language, so you always understand where things stand.</p>
          </article>
          <article className="value-card">
            <h3>Experienced people stay involved</h3>
            <p>Your work is handled with attention from experienced professionals, from the first discussion to completion.</p>
          </article>
          <article className="story-card">
            <Image src="/images/approach-consultation.png" alt="Professionals reviewing financial documents together" fill sizes="(max-width: 800px) 100vw, 34vw" />
            <div>
              <h3>Professional support, without the confusion.</h3>
              <p>Careful with every detail. Clear in every conversation.</p>
            </div>
          </article>
          <article className="value-card">
            <h3>Advice that fits your business</h3>
            <p>We look beyond forms and deadlines to understand the effect on your business, finances and future plans.</p>
          </article>
          <article className="value-card">
            <h3>One team for different needs</h3>
            <p>Accounting, tax, company law and legal support are handled together, saving you from coordinating with multiple professionals.</p>
          </article>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="services-head reveal">
          <div>
            <p className="eyebrow">Our services</p>
            <h2>
              Support for your accounts,
              <br />
              taxes and business.
            </h2>
            <p className="section-heading-copy">
              Whether you need regular accounting support or help with a specific financial matter, our team can guide you through it.
            </p>
          </div>
          <Link className="pill pill-dark" href="/contact-us">
            Discuss Your Requirements
          </Link>
        </div>
        <div className="services-layout reveal">
          <div className="accordion-list">
            {homepageServices.map((service, index) => {
              const open = activeService === index;
              return (
                <article className={open ? "accordion-item open" : "accordion-item"} key={service.title}>
                  <button type="button" aria-expanded={open} onClick={() => setActiveService(open ? -1 : index)}>
                    <span>{service.title}</span>
                    {open ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  <div className="accordion-answer" aria-hidden={!open}>
                    <p>
                      {service.text}{" "}
                      <Link href={service.href} className="inline-link">
                        View Service
                      </Link>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="services-image">
            <Image src="/images/services-desk.jpg" alt="Professional desk with business registration, tax compliance, and financial accounting documents" fill sizes="(max-width: 800px) 100vw, 44vw" />
            <span>Clear answers before complicated processes.</span>
          </div>
        </div>
      </section>

      <LocationsSection />

      <section className="dark-band" id="reviews">
        <div className="review-section-intro reveal">
          <p className="eyebrow dark-label">Client feedback</p>
          <h2>Trusted for clear answers and dependable support.</h2>
        </div>
        <ReviewTestimonialScroll />
        <div className="team-wrap" id="team">
          <div className="team-heading reveal">
            <div>
              <p className="eyebrow dark-label">Our team</p>
              <h2>Meet the professionals handling your work.</h2>
              <p className="team-heading-copy">
                Our team brings together accounting, tax, company law, cost management and legal experience to provide complete
                support under one roof.
              </p>
            </div>
            <Link className="pill pill-light small" href="/our-team">
              Meet the Team
            </Link>
          </div>
          <div className="team-grid reveal">
            {homepageTeamPreview.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section">
        <div className="cta-card reveal">
          <Image src="/images/hero-office.png" alt="A private advisory conversation" fill sizes="(max-width: 800px) 100vw, 80vw" />
          <div className="cta-shade" />
          <div>
            <p className="eyebrow light">Let&apos;s talk</p>
            <h2>Have a question? Start with a conversation.</h2>
            <p className="cta-card-copy">
              Tell us what you need help with. We will understand the matter, explain the next steps and let you know how we can
              support you.
            </p>
            <Link className="pill pill-light" href="/contact-us">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-intro reveal">
          <p className="eyebrow">Common questions</p>
          <h2>Questions clients often ask before contacting us.</h2>
        </div>
        <div className="contact-layout reveal">
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <article className={open ? "faq-item open" : "faq-item"} key={faq.q}>
                  <button type="button" aria-expanded={open} onClick={() => setActiveFaq(open ? -1 : index)}>
                    <span>{faq.q}</span>
                    {open ? <Minus size={15} /> : <Plus size={15} />}
                  </button>
                  <div className="faq-answer" aria-hidden={!open}>
                    <p>{faq.a}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <ContactForm heading="Tell us how we can help." />
        </div>
      </section>
    </>
  );
}
