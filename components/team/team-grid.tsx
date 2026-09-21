import { TeamCard } from "./team-card";
import type { TeamMember } from "@/content/team";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="team-grid reveal">
      {members.map((member) => (
        <TeamCard key={member.name} member={member} />
      ))}
    </div>
  );
}
