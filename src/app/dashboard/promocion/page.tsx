import PromotionPanel from "@/components/dashboard/PromotionPanel";
import materials from "@/content/promotion/guides.json";
import type { Block } from "@/content/blog";

export const metadata = { title: "Promoción | CodeConnect" };

export default function PromotionPage() {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());
  return <PromotionPanel today={today} guides={materials.guides.map((guide) => ({ ...guide, blocks: guide.blocks as Block[] }))} publications={materials.publications} />;
}
