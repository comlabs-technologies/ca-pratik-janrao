import Image from "next/image";
import { firmLocations } from "@/content/locations";

export function LocationsSection() {
  return (
    <section className="locations section" id="locations">
      <div className="section-intro reveal">
        <p className="eyebrow">Our locations</p>
        <h2>
          Professional support wherever
          <br />
          your business operates.
        </h2>
        <p className="section-heading-copy">
          Our team supports clients across India and businesses with requirements in Dubai.
        </p>
      </div>
      <div className="locations-grid reveal-group">
        {firmLocations.map((location) => (
          <article className="location-card" key={location.city}>
            <Image
              src={location.image}
              alt={location.imageAlt}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 980px) 50vw, 25vw"
              className="location-card-image"
            />
            <div>
              <h3>{location.title}</h3>
              <p>{location.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
