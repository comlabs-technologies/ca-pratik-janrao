export const site = {
  name: "Pratik Janrao & Associates",
  shortName: "PJA",
  tagline: "Chartered Accountants · Pune",
  url: "https://ca-pratik-janrao.vercel.app",
  established: 2014,
  description:
    "Audit, taxation, GST, accounting and business advisory services for businesses in India and Dubai.",
  motto: "Well done is better than well said.",
  empanelment: "Empanelled with MAHA Sahakar (1014262).",
  address: {
    line1: "Ashoka Mall, G-20,",
    line2: "Bund Garden Road, Sangamvadi,",
    city: "Pune",
    state: "Maharashtra",
    pin: "411001",
    full: "Ashoka Mall, G-20, Bund Garden Road, Sangamvadi, Pune, Maharashtra 411001",
  },
  emails: ["capratikjanrao@gmail.com", "office@capratikjanrao.com"],
  phones: ["+918149618595", "+919922789822"],
  whatsapp: "918149618595",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ashoka+Mall+G-20+Bund+Garden+Road+Sangamvadi+Pune+411001",
} as const;

export type SiteConfig = typeof site;
