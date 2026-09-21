"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { knowledgeBankMegaMenu, primaryNav, serviceMegaMenu } from "@/content/navigation";
import { site } from "@/content/site";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) => setExpanded((current) => (current === key ? null : key));

  return (
    <nav id="mobile-navigation" className={open ? "nav-links open mobile-nav-panel" : "nav-links mobile-nav-panel"} aria-label="Mobile navigation">
      {primaryNav.map((item) => {
        if (item.megaMenu === "services") {
          const isOpen = expanded === "services";
          return (
            <div key={item.label} className="mobile-nav-group">
              <button type="button" className="mobile-nav-group-trigger" aria-expanded={isOpen} onClick={() => toggle("services")}>
                <span>{item.label}</span>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              <div className={`mobile-nav-submenu ${isOpen ? "open" : ""}`} hidden={!isOpen}>
                {serviceMegaMenu.map((group) => (
                  <div key={group.id} className="mobile-nav-subgroup">
                    <p>{group.title}</p>
                    {group.items.map((link) => (
                      <Link key={link.href} href={link.href} onClick={onClose}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href="/our-services" onClick={onClose}>
                  View all services
                </Link>
              </div>
            </div>
          );
        }

        if (item.megaMenu === "knowledge-bank") {
          const isOpen = expanded === "knowledge-bank";
          return (
            <div key={item.label} className="mobile-nav-group">
              <button type="button" className="mobile-nav-group-trigger" aria-expanded={isOpen} onClick={() => toggle("knowledge-bank")}>
                <span>{item.label}</span>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              <div className={`mobile-nav-submenu ${isOpen ? "open" : ""}`} hidden={!isOpen}>
                {knowledgeBankMegaMenu.map((group) => (
                  <div key={group.id} className="mobile-nav-subgroup">
                    <Link href={group.href} onClick={onClose}>
                      {group.label}
                    </Link>
                    {group.items.slice(0, 3).map((link) =>
                      link.external ? (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <Link key={link.href} href={link.href} onClick={onClose}>
                          {link.label}
                        </Link>
                      ),
                    )}
                  </div>
                ))}
                <Link href="/knowledge-bank" onClick={onClose}>
                  View Knowledge Bank
                </Link>
              </div>
            </div>
          );
        }

        if (item.children) {
          const isOpen = expanded === item.label;
          return (
            <div key={item.label} className="mobile-nav-group">
              <button type="button" className="mobile-nav-group-trigger" aria-expanded={isOpen} onClick={() => toggle(item.label)}>
                <span>{item.label}</span>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              <div className={`mobile-nav-submenu ${isOpen ? "open" : ""}`} hidden={!isOpen}>
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href} onClick={onClose}>
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return (
          <Link key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </Link>
        );
      })}
      <Link className="nav-cta" href="/contact-us" onClick={onClose}>
        Book a consultation
      </Link>
      <div className="mobile-nav-footer">
        <span>Pune · India &amp; Dubai</span>
        <a href={`tel:${site.phones[0]}`}>{site.phones[0].replace("+91", "+91 ")}</a>
      </div>
    </nav>
  );
}
