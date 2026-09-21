import { HomePage } from "@/components/home/home-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pratik Janrao & Associates | Chartered Accountants, Pune",
  description: "Audit, taxation, GST, accounting and business advisory services for businesses in India and Dubai.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
