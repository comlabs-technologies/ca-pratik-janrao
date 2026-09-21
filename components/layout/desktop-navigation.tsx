"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { knowledgeBankMegaMenu, primaryNav, serviceMegaMenu } from "@/content/navigation";

export function DesktopNavigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {primaryNav.map((item) => {
        if (item.megaMenu === "services") {
          return (
            <div
              key={item.label}
              className="nav-dropdown"
              onMouseEnter={() => setOpenMenu("services")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link href={item.href} className="nav-dropdown-trigger">
                {item.label} <ChevronDown size={14} />
              </Link>
              {openMenu === "services" ? (
                <div className="mega-menu">
                  {serviceMegaMenu.map((group) => (
                    <div key={group.id}>
                      <p>{group.title}</p>
                      <ul>
                        {group.items.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link href="/our-services" className="mega-menu-footer">
                    View all services
                  </Link>
                </div>
              ) : null}
            </div>
          );
        }

        if (item.megaMenu === "knowledge-bank") {
          return (
            <div
              key={item.label}
              className="nav-dropdown"
              onMouseEnter={() => setOpenMenu("knowledge-bank")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link href={item.href} className="nav-dropdown-trigger">
                {item.label} <ChevronDown size={14} />
              </Link>
              {openMenu === "knowledge-bank" ? (
                <div className="mega-menu mega-menu-knowledge">
                  {knowledgeBankMegaMenu.map((group) => (
                    <div key={group.id}>
                      <Link href={group.href}>{group.label}</Link>
                      <ul>
                        {group.items.map((link) => (
                          <li key={link.href}>
                            {link.external ? (
                              <a href={link.href} target="_blank" rel="noopener noreferrer">
                                {link.label}
                              </a>
                            ) : (
                              <Link href={link.href}>{link.label}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link href="/knowledge-bank" className="mega-menu-footer">
                    View Knowledge Bank
                  </Link>
                </div>
              ) : null}
            </div>
          );
        }

        if (item.children) {
          return (
            <div
              key={item.label}
              className="nav-dropdown"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link href={item.href} className="nav-dropdown-trigger">
                {item.label} <ChevronDown size={14} />
              </Link>
              {openMenu === item.label ? (
                <div className="dropdown-panel">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        );
      })}
      <Link className="nav-cta" href="/contact-us">
        Book a consultation
      </Link>
    </nav>
  );
}
