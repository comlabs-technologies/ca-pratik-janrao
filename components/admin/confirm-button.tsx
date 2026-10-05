"use client";

import type { ReactNode } from "react";

/** Submit button that asks for confirmation first. Place inside a <form action={...}>. */
export function ConfirmButton({ message, children, className = "adm-btn adm-btn-danger" }: { message: string; children: ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
