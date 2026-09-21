"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Menu, MessageCircle, Minus, Plus, X } from "lucide-react";

const services = [
  { title: "Audit & assurance", text: "Statutory, internal and management audits that give leadership a reliable view of performance, controls and risk." },
  { title: "Tax & GST advisory", text: "Direct tax, GST, TDS and representation support, explained clearly and handled with close attention to deadlines." },
  { title: "Business advisory", text: "Practical guidance on business models, due diligence, internal controls and the financial questions behind growth." },
  { title: "Corporate compliance", text: "MCA, legal compliance and certification support for companies, LLPs and growing enterprises." },
  { title: "Registrations & intellectual property", text: "MSME, startup, ISO, trademark, copyright and import-export registrations managed from application to completion." },
  { title: "Financial accounting", text: "Accurate accounting, reporting and control systems that keep records dependable and management informed." },
];

const faqs = [
  { q: "What type of clients do you work with?", a: "We advise founders, professionals, family-run businesses, SMEs and growing companies across a broad range of sectors." },
  { q: "Can you manage audit, tax and compliance together?", a: "Yes. Our multidisciplinary structure brings Chartered Accountants, Cost Accountants, Company Secretaries and legal professionals into one coordinated team." },
  { q: "Do you support businesses outside Pune?", a: "Yes. The firm works with clients beyond Pune and brings an India and Dubai advisory perspective to suitable matters." },
  { q: "What information should I share initially?", a: "A short description of the matter, the relevant entity and any important deadline is enough for the first conversation." },
  { q: "What happens after the first call?", a: "We clarify the scope, identify the right specialists and outline the practical next steps before work begins." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px 80px 0px" });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={scrolled || menuOpen ? "site-header scrolled" : "site-header"}>
        <a className="brand" href="#top" aria-label="Pratik Janrao and Associates home"><span className="brand-mark">PJA</span><span>Pratik Janrao &amp; Associates</span></a>
        <nav id="mobile-navigation" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
          <a href="#about" onClick={closeMenu}>About</a><a href="#services" onClick={closeMenu}>Services</a><a href="#reviews" onClick={closeMenu}>Reviews</a><a href="#team" onClick={closeMenu}>Team</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Contact</a>
          <div className="mobile-nav-footer"><span>Pune · India &amp; Dubai</span><a href="tel:+918149618595">+91 81496 18595</a></div>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <Image src="/images/hero-office.png" alt="A contemporary professional office" fill priority sizes="100vw" className="hero-image" /><div className="hero-overlay" />
        <div className="hero-inner"><p className="eyebrow light">Chartered accountants · Pune</p><h1>Financial clarity<br />without the jargon.</h1><p className="hero-copy">Senior-led audit, tax, GST, corporate compliance and business advisory for organisations operating in India and Dubai.</p><div className="hero-actions"><a className="pill pill-light" href="#contact">Get advice <ArrowRight size={15} /></a><a className="plain-link" href="#about">Learn more</a></div></div>
        <div className="hero-proof"><div className="client-faces"><Image src="/images/pratik-janrao.jpeg" alt="" width={34} height={34} /><Image src="/images/anita-swami.png" alt="" width={34} height={34} /></div><span><b>Established 2014</b><small>Senior attention on every matter</small></span></div>
        <div className="hero-feature"><div className="feature-thumb"><Image src="/images/pratik-janrao.jpeg" alt="CA Pratik Janrao" fill sizes="110px" /></div><p>Direct access to an accountable, multidisciplinary team.</p></div>
      </section>

      <section className="credential-strip" aria-label="Firm credentials"><span>Chartered Accountants</span><span>Cost Accountants</span><span>Company Secretaries</span><span>Legal professionals</span><span>India &amp; Dubai</span></section>

      <section className="approach section" id="about">
        <div className="section-intro reveal"><p className="eyebrow">Our approach</p><h2>Making complex finance<br />feel like a conversation.</h2></div>
        <div className="approach-grid reveal">
          <article className="value-card"><p className="eyebrow">Clear guidance</p><h3>Plain language,<br />every time.</h3><p>No jargon, no runaround. You always know where the matter stands.</p></article>
          <article className="value-card"><p className="eyebrow">Senior attention</p><h3>Close to the work.<br />Close to you.</h3><p>Experienced professionals stay involved from the first question to resolution.</p></article>
          <article className="story-card"><Image src="/images/pratik-janrao.jpeg" alt="CA Pratik Janrao, founder" fill sizes="(max-width: 800px) 100vw, 34vw" /><div><h3>Your advisory team,<br />without the distance.</h3><p>Rigorous in the detail. Direct in the conversation.</p></div></article>
          <article className="value-card"><p className="eyebrow">Commercial context</p><h3>More than<br />compliance.</h3><p>Advice considers the regulation, the risk and the real business outcome.</p></article>
          <article className="value-card"><p className="eyebrow">One accountable team</p><h3>One view across<br />every discipline.</h3><p>Financial, secretarial and legal expertise work together rather than in silos.</p></article>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="services-head reveal"><div><p className="eyebrow">Our services</p><h2>All the support your<br />business needs. None of the noise.</h2></div><a className="pill pill-dark" href="#contact">Book a call with us</a></div>
        <div className="services-layout reveal"><div className="accordion-list">
          {services.map((service, index) => { const open = activeService === index; return <article className={open ? "accordion-item open" : "accordion-item"} key={service.title}><button type="button" aria-expanded={open} onClick={() => setActiveService(open ? -1 : index)}><span>{service.title}</span>{open ? <Minus size={16} /> : <Plus size={16} />}</button><div className="accordion-answer" aria-hidden={!open}><p>{service.text}</p></div></article>; })}
        </div><div className="services-image"><Image src="/images/anita-swami.png" alt="CMA Anita Swami advising a client" fill sizes="(max-width: 800px) 100vw, 44vw" /><span>Clarity before complexity.</span></div></div>
      </section>

      <section className="dark-band" id="reviews">
        <div className="review-block reveal"><div className="review-portrait"><Image src="/images/pratik-janrao.jpeg" alt="CA Pratik Janrao" fill sizes="280px" /></div><div className="review-copy"><p className="stars">★★★★★</p><blockquote>“Every issue explained clearly. Every question answered with patience. Professional, helpful and consistently dependable.”</blockquote><span>Client feedback</span></div></div>
        <div className="team-wrap" id="team"><div className="team-heading reveal"><div><p className="eyebrow dark-label">Our team</p><h2>Professionals who lead<br />with clarity, not complexity.</h2></div><a className="pill pill-light small" href="#contact">Join us</a></div><div className="team-grid reveal"><article className="person-card"><div><Image src="/images/pratik-janrao.jpeg" alt="CA Pratik Janrao" fill sizes="(max-width: 700px) 100vw, 45vw" /></div><h3>CA Pratik Janrao</h3><p>Founder · Core team</p></article><article className="person-card"><div><Image src="/images/anita-swami.png" alt="CMA Anita Swami" fill sizes="(max-width: 700px) 100vw, 45vw" /></div><h3>CMA Anita Swami</h3><p>Core team</p></article></div></div>
      </section>

      <section className="cta-section section"><div className="cta-card reveal"><Image src="/images/hero-office.png" alt="A private advisory conversation" fill sizes="(max-width: 800px) 100vw, 80vw" /><div className="cta-shade" /><div><p className="eyebrow light">A conversation first</p><h2>Start with the question,<br />not the paperwork.</h2><a className="pill pill-light" href="#contact">Schedule a consultation</a></div></div></section>

      <section className="contact section" id="contact">
        <div className="section-intro reveal"><p className="eyebrow">Questions</p><h2>Everything you were<br />about to email us.</h2></div>
        <div className="contact-layout reveal"><div className="faq-list">{faqs.map((faq, index) => { const open = activeFaq === index; return <article className={open ? "faq-item open" : "faq-item"} key={faq.q}><button type="button" aria-expanded={open} onClick={() => setActiveFaq(open ? -1 : index)}><span>{faq.q}</span>{open ? <Minus size={15} /> : <Plus size={15} />}</button><div className="faq-answer" aria-hidden={!open}><p>{faq.a}</p></div></article>; })}</div>
          <div className="enquiry-panel"><form action="mailto:office@capratikjanrao.com" method="post" encType="text/plain"><label><span>Your name</span><input name="name" type="text" autoComplete="name" placeholder="Your full name" required /></label><label><span>Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label><label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" /></label><label><span>How can we help?</span><textarea name="message" rows={3} placeholder="Tell us briefly about the matter" required /></label><button className="submit-button" type="submit">Let&apos;s work together <ArrowRight size={16} /></button></form><div className="direct-contact"><span>Prefer a direct conversation?</span><a href="tel:+918149618595">+91 81496 18595</a><a href="mailto:office@capratikjanrao.com">office@capratikjanrao.com</a><a href="https://wa.me/918149618595" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a></div></div>
        </div>
      </section>

      <footer><div className="footer-grid"><div><span>Explore</span><a href="#about">Our firm</a><a href="#reviews">Reviews</a><a href="#team">Team</a></div><div><span>Services</span><a href="#services">Audit &amp; assurance</a><a href="#services">Tax &amp; GST</a><a href="#services">Business advisory</a></div><div><span>Resources</span><a href="https://capratikjanrao.com/blogs" target="_blank" rel="noreferrer">Insights</a><a href="#contact">Contact</a></div><div><span>Office</span><address>Ashoka Mall, G-20, Bund Garden Road,<br />Sangamvadi, Pune 411001</address></div></div><div className="footer-wordmark">Pratik Janrao <i>&amp;</i> Associates</div><div className="footer-bottom"><p>Chartered Accountants · Pune</p><p>© 2026 Pratik Janrao &amp; Associates</p></div></footer>
    </main>
  );
}
