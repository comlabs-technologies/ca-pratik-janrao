import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  const card = (
    <>
      <div>
        {member.image ? (
          <Image src={member.image} alt={member.name} fill sizes="(max-width: 700px) 100vw, 30vw" />
        ) : (
          <span className="person-placeholder" aria-hidden="true">
            {member.initials}
          </span>
        )}
      </div>
      <h3>{member.name}</h3>
      <p>
        {member.role}
        {member.qualification ? ` · ${member.qualification}` : ""}
      </p>
    </>
  );

  if (member.slug && member.biography) {
    return (
      <Link href={`/our-team/${member.slug}`} className="person-card person-card-link">
        {card}
      </Link>
    );
  }

  return <article className="person-card">{card}</article>;
}
