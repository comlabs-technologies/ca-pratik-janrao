"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { homepageServices } from "@/content/services";
import { homepageTeamPreview } from "@/content/team";
import { TeamCard } from "@/components/team/team-card";
import { ContactForm } from "@/components/forms/contact-form";
import { ReviewTestimonialScroll } from "@/components/home/scroll-reveal-quote";

const faqs = [
  { q: "What type of clients do you work with?", a: "We advise founders, professionals, family-run businesses, SMEs and growing companies across a broad range of sectors." },
  { q: "Can you manage audit, tax and compliance together?", a: "Yes. Our multidisciplinary structure brings Chartered Accountants, Cost Accountants, Company Secretaries and legal professionals into one coordinated team." },
  { q: "Do you support businesses outside Pune?", a: "Yes. The firm works with clients beyond Pune and brings an India and Dubai advisory perspective to suitable matters." },
  { q: "What information should I share initially?", a: "A short description of the matter, the relevant entity and any important deadline is enough for the first conversation." },
  { q: "What happens after the first call?", a: "We clarify the scope, identify the right specialists and outline the practical next steps before work begins." },
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
          <h1>
            Financial clarity
            <br />
            without the jargon.
          </h1>
          <p className="hero-copy">
            Senior-led audit, tax, GST, corporate compliance and business advisory for organisations operating in India and Dubai.
          </p>
          <div className="hero-actions">
            <Link className="pill pill-light" href="/contact-us">
              Get advice <ArrowRight size={15} />
            </Link>
            <Link className="plain-link" href="/about-us">
              Learn more
            </Link>
          </div>
        </div>
        <div className="hero-proof">
          <div className="client-faces">
            <Image src="/images/pratik-janrao.jpeg" alt="" width={34} height={34} />
            <Image src="/images/anita-swami.png" alt="" width={34} height={34} />
          </div>
          <span>
            <b>Established 2014</b>
            <small>Senior attention on every matter</small>
          </span>
        </div>
        <div className="hero-feature">
          <div className="feature-thumb">
            <Image src="/images/pratik-janrao.jpeg" alt="CA Pratik Janrao" fill sizes="110px" />
          </div>
          <p>Direct access to an accountable, multidisciplinary team.</p>
        </div>
      </section>

      <section className="credential-strip" aria-label="Firm credentials">
        <span>Chartered Accountants</span>
        <span>Cost Accountants</span>
        <span>Company Secretaries</span>
        <span>Legal professionals</span>
        <span>India &amp; Dubai</span>
      </section>

      <section className="approach section" id="about">
        <div className="section-intro reveal">
          <p className="eyebrow">Our approach</p>
          <h2>
            Making complex finance
            <br />
            feel like a conversation.
          </h2>
        </div>
        <div className="approach-grid reveal">
          <article className="value-card">
            <p className="eyebrow">Clear guidance</p>
            <h3>
              Plain language,
              <br />
              every time.
            </h3>
            <p>No jargon, no runaround. You always know where the matter stands.</p>
          </article>
          <article className="value-card">
            <p className="eyebrow">Senior attention</p>
            <h3>
              Close to the work.
              <br />
              Close to you.
            </h3>
            <p>Experienced professionals stay involved from the first question to resolution.</p>
          </article>
          <article className="story-card">
            <Image src="/images/approach-consultation.png" alt="Professionals reviewing financial documents together" fill sizes="(max-width: 800px) 100vw, 34vw" />
            <div>
              <h3>
                Your advisory team,
                <br />
                without the distance.
              </h3>
              <p>Rigorous in the detail. Direct in the conversation.</p>
            </div>
          </article>
          <article className="value-card">
            <p className="eyebrow">Commercial context</p>
            <h3>
              More than
              <br />
              compliance.
            </h3>
            <p>Advice considers the regulation, the risk and the real business outcome.</p>
          </article>
          <article className="value-card">
            <p className="eyebrow">One accountable team</p>
            <h3>
              One view across
              <br />
              every discipline.
            </h3>
            <p>Financial, secretarial and legal expertise work together rather than in silos.</p>
          </article>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="services-head reveal">
          <div>
            <p className="eyebrow">Our services</p>
            <h2>
              All the support your
              <br />
              business needs. None of the noise.
            </h2>
          </div>
          <Link className="pill pill-dark" href="/contact-us">
            Book a call with us
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
                        View service
                      </Link>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="services-image">
            <Image src="/images/services-desk.jpg" alt="Professional desk with business registration, tax compliance, and financial accounting documents" fill sizes="(max-width: 800px) 100vw, 44vw" />
            <span>Clarity before complexity.</span>
          </div>
        </div>
      </section>

      <section className="dark-band" id="reviews">
        <ReviewTestimonialScroll />
        <div className="team-wrap" id="team">
          <div className="team-heading reveal">
            <div>
              <p className="eyebrow dark-label">Our team</p>
              <h2>
                Professionals who lead
                <br />
                with clarity, not complexity.
              </h2>
            </div>
            <Link className="pill pill-light small" href="/careers">
              Join us
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
            <p className="eyebrow light">A conversation first</p>
            <h2>
              Start with the question,
              <br />
              not the paperwork.
            </h2>
            <Link className="pill pill-light" href="/contact-us">
              Schedule a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-intro reveal">
          <p className="eyebrow">Questions</p>
          <h2>
            Everything you were
            <br />
            about to email us.
          </h2>
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
