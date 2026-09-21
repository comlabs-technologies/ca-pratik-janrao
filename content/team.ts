export type TeamCategory = "core" | "associates" | "execution";

export type TeamMember = {
  name: string;
  qualification?: string;
  role: string;
  category: TeamCategory;
  slug?: string;
  image?: string;
  initials: string;
  biography?: string;
  specializations?: string[];
  credentials?: string[];
  linkedIn?: string;
  relatedServiceSlugs?: string[];
};

export const teamCategoryLabels: Record<TeamCategory, string> = {
  core: "Core team",
  associates: "Associates",
  execution: "Execution team",
};

export const teamMembers: TeamMember[] = [
  {
    name: "CA Pratik Janrao",
    qualification: "Chartered Accountant",
    role: "Founder",
    category: "core",
    slug: "ca-pratik-janrao-member",
    image: "/images/pratik-janrao.jpeg",
    initials: "PJ",
    biography:
      "CA Pratik Janrao is a member of the Institute of Chartered Accountants of India with experience in financial consultancy, internal control system setup, accounts writing, taxation, project consultancy, business model canvassing, business consultancy and audits. His expertise includes statutory audits, taxation, management consultancy, internal audits and systems study, designing and implementing internal control, tax audits and project financing. His experience in tax and regulatory services includes representation for clients with tax authorities. His result-oriented approach ensures that the client benefits in terms of the most efficient solution.",
    specializations: [
      "Statutory and tax audits",
      "Internal controls and systems study",
      "Taxation and regulatory representation",
      "Management consultancy and project financing",
    ],
    relatedServiceSlugs: [
      "auditing-and-assurance-services",
      "representation-services",
      "business-model-canvassing-services",
    ],
  },
  {
    name: "CMA Anita Swami",
    qualification: "Cost and Management Accountant",
    role: "Core team",
    category: "core",
    slug: "cma-anita-swami-member",
    image: "/images/anita-swami.png",
    initials: "AS",
    biography:
      "CMA Anita V Swami is a member of the Institute of Cost and Management Accountants of India with experience in indirect tax, cost audit, GST compliances, import-export policies and schemes, client representation with GST authorities and management consultancy. She has experience in GST and customs which supports clients in managing compliance efficiently.",
    specializations: [
      "GST and indirect tax compliance",
      "Cost audit",
      "Import-export policies and schemes",
      "Representation before GST authorities",
    ],
    relatedServiceSlugs: [
      "gst-consultancy-and-compliances-services",
      "importexport-consultancy-services",
      "representation-services",
    ],
  },
  {
    name: "CMA Keshav Nilkanth",
    qualification: "Cost and Management Accountant",
    role: "Associate",
    category: "associates",
    initials: "KN",
  },
  {
    name: "CS Prakash Ithape",
    qualification: "Company Secretary",
    role: "Associate",
    category: "associates",
    initials: "PI",
  },
  {
    name: "Adv. Vivek Kyadal",
    qualification: "Advocate",
    role: "Associate",
    category: "associates",
    image: "/images/vivek-kyadal.png",
    initials: "VK",
  },
  {
    name: "Mr. Prasanna Pathak",
    role: "Associate",
    category: "associates",
    image: "/images/prasanna-pathak.png",
    initials: "PP",
  },
  {
    name: "Mr. Ismail Jamadar",
    role: "Associate",
    category: "associates",
    initials: "IJ",
  },
  {
    name: "Miss. Samiksha Sadaphule",
    role: "Execution team",
    category: "execution",
    initials: "SS",
  },
  {
    name: "Miss. Akshada Shinde",
    role: "Execution team",
    category: "execution",
    initials: "AS",
  },
  {
    name: "Miss. Pratiksha Gaikwad",
    role: "Execution team",
    category: "execution",
    initials: "PG",
  },
  {
    name: "Mr. Akshay Sapkpal",
    role: "Execution team",
    category: "execution",
    initials: "AS",
  },
  {
    name: "Mr. Deepak Dabkare",
    role: "Execution team",
    category: "execution",
    initials: "DD",
  },
  {
    name: "Miss. Pratiksha Uttekar",
    role: "Execution team",
    category: "execution",
    initials: "PU",
  },
  {
    name: "Mr. Sudhir Padalkar",
    role: "Execution team",
    category: "execution",
    initials: "SP",
  },
  {
    name: "Miss. Ashwini Deore",
    role: "Execution team",
    category: "execution",
    initials: "AD",
  },
];

export const homepageTeamPreview: TeamMember[] = [
  teamMembers[0],
  teamMembers[1],
  teamMembers[4],
  teamMembers[5],
  teamMembers[2],
];

export function getTeamMemberBySlug(slug: string) {
  return teamMembers.find((member) => member.slug === slug);
}

export function getTeamByCategory(category: TeamCategory) {
  return teamMembers.filter((member) => member.category === category);
}

export function getTeamMembersWithProfiles() {
  return teamMembers.filter((member) => member.slug && member.biography);
}
