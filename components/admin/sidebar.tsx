"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ExternalLink, FileText, Inbox, LayoutDashboard, LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/case-studies", label: "Case studies", icon: BookOpen },
];

export function AdminSidebar({ unread }: { unread: number }) {
  const pathname = usePathname();
  return (
    <aside className="adm-sidebar">
      <div className="adm-brand">
        <span className="adm-brand-mark">PJA</span>
        <span>Admin</span>
      </div>
      <nav aria-label="Admin">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined}>
              <Icon size={17} />
              <span>{label}</span>
              {href === "/admin/submissions" && unread > 0 ? <em className="adm-count">{unread}</em> : null}
            </Link>
          );
        })}
      </nav>
      <div className="adm-sidebar-foot">
        <Link href="/" target="_blank">
          <ExternalLink size={16} /> View website
        </Link>
        <form action={logout}>
          <button type="submit">
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
