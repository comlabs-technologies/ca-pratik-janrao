"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { knowledgeBankMegaMenu, primaryNav, serviceMegaMenu } from "@/content/navigation";

export function DesktopNavigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {primaryNav.map((item) => {
        if (item.megaMenu === "services") {
          return (
            <div
              key={item.label}
              className="nav-dropdown nav-dropdown-mega"
              onMouseEnter={() => open("services")}
              onMouseLeave={close}
            >
              <Link href={item.href} className="nav-dropdown-trigger">
                {item.label} <ChevronDown size={14} />
              </Link>
              <div className={`mega-menu ${openMenu === "services" ? "is-open" : ""}`} onMouseEnter={cancelClose}>
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
            </div>
          );
        }

        if (item.megaMenu === "knowledge-bank") {
          return (
            <div
              key={item.label}
              className="nav-dropdown nav-dropdown-mega"
              onMouseEnter={() => open("knowledge-bank")}
              onMouseLeave={close}
            >
              <Link href={item.href} className="nav-dropdown-trigger">
                {item.label} <ChevronDown size={14} />
              </Link>
              <div className={`mega-menu mega-menu-knowledge ${openMenu === "knowledge-bank" ? "is-open" : ""}`} onMouseEnter={cancelClose}>
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
            </div>
          );
        }

        if (item.children) {
          return (
            <div
              key={item.label}
              className="nav-dropdown"
              onMouseEnter={() => open(item.label)}
              onMouseLeave={close}
            >
              <Link href={item.href} className="nav-dropdown-trigger">
                {item.label} <ChevronDown size={14} />
              </Link>
              <div className={`dropdown-panel ${openMenu === item.label ? "is-open" : ""}`} onMouseEnter={cancelClose}>
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href}>
                    {child.label}
                  </Link>
                ))}
              </div>
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
