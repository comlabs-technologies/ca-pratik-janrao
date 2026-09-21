import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page could not be found."
        description="The page may have moved or the address may be incorrect."
      />
      <section className="section page-copy">
        <Link className="pill pill-dark" href="/">
          Return home
        </Link>
      </section>
    </>
  );
}
