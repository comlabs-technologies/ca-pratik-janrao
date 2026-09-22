import Image from "next/image";
import { firmLocations } from "@/content/locations";

export function LocationsSection() {
  return (
    <section className="locations section" id="locations">
      <div className="section-intro reveal">
        <p className="eyebrow">Our locations</p>
        <h2>
          Advisory across the cities
          <br />
          our clients call home.
        </h2>
      </div>
      <div className="locations-grid reveal-group">
        {firmLocations.map((location) => (
          <article className="location-card" key={location.city}>
            <Image
              src={location.image}
              alt={location.imageAlt}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
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
