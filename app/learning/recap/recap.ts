export type Resource = {
  label: string;
  type: "Blog" | "Video" | "Article" | "Book";
  url: string;
};

export type RecapMetadata = {
  weekNumber: number;
  title: string;
  date: string;
  description: string;
  focusAreas: ("ML" | "Rust" | "Math" | "General")[];
  status: "Completed" | "Ongoing" | "Draft" | "Skipped" | "Planned";
  thumbnail?: string;
  resources?: {
    label: string;
    type: "Video" | "Paper" | "Blog";
    url: string;
  }[];
};

export type RecapModule = {
  metadata: RecapMetadata;
  content: () => JSX.Element;
};
