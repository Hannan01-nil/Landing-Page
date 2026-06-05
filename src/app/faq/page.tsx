import FAQ from "@/components/FAQ";
import { getFaqs } from "@/app/lib/queries";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs();
  return <FAQ faqs={faqs || []} />;
}
