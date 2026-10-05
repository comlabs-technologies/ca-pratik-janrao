"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Renders the public header/footer everywhere except the admin area. */
export function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const isAdmin = usePathname().startsWith("/admin");
  return (
    <>
      {isAdmin ? null : (
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
      )}
      {isAdmin ? null : header}
      <main id="main-content">{children}</main>
      {isAdmin ? null : footer}
    </>
  );
}
