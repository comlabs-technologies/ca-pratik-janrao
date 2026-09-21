import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  wide?: boolean;
};

export function Container({ children, className = "", as: Tag = "div", wide = false }: ContainerProps) {
  return <Tag className={`container ${wide ? "container-wide" : ""} ${className}`.trim()}>{children}</Tag>;
}
