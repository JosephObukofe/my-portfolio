export type RecapModule = {
  metadata: {
    slug: string;
    weekNumber: number;
    title: string;
    date: string;
    description: string;
    focusAreas: ("ML" | "Rust" | "Math")[];
    status: "Completed" | "Ongoing";
    timeInvested: string;
    tags?: string[];
    thumbnail?: string;
    resources?: {
      label: string;
      type: "Video" | "Paper" | "Blog";
      url: string;
    }[];
    featured?: boolean;
  };
  content: React.ReactNode;
};

const recapMap: Record<string, () => Promise<{ default: RecapModule }>> = {
  "week-1": () => import("@/content/recaps/week-1"),
  "week-2": () => import("@/content/recaps/week-2"),
  "week-3": () => import("@/content/recaps/week-3"),
  "week-4": () => import("@/content/recaps/week-4"),
  "week-5": () => import("@/content/recaps/week-5"),
  "week-6": () => import("@/content/recaps/week-6"),
  "week-7": () => import("@/content/recaps/week-7"),
  "week-8": () => import("@/content/recaps/week-8"),
  "week-9": () => import("@/content/recaps/week-9"),
  "week-10": () => import("@/content/recaps/week-10"),
  "week-11": () => import("@/content/recaps/week-11"),
  "week-12": () => import("@/content/recaps/week-12"),
  "week-13": () => import("@/content/recaps/week-13"),
  "week-14": () => import("@/content/recaps/week-14"),
  "week-15": () => import("@/content/recaps/week-15"),
  "week-16": () => import("@/content/recaps/week-16"),
  "week-17": () => import("@/content/recaps/week-17"),
  "week-18": () => import("@/content/recaps/week-18"),
  "week-19": () => import("@/content/recaps/week-19"),
  "week-20": () => import("@/content/recaps/week-20"),
  "week-21": () => import("@/content/recaps/week-21"),
  "week-22": () => import("@/content/recaps/week-22"),
};

export async function getRecap(slug: string): Promise<RecapModule | null> {
  const loader = recapMap[slug];
  if (!loader) return null;

  const mod = await loader();
  return mod.default as RecapModule;
}
