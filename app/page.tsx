import { HomePage } from "@/components/home/home-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Chartered Accountants in Pune | Pratik Janrao & Associates",
  description:
    "Professional support for accounting, audits, income tax, GST, company filings and business matters. Serving individuals and businesses in India and Dubai.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
