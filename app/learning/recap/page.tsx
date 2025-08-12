// app/learning/recap/page.tsx
import { WeeklyRecapList } from "@/app/components/ui/week-list";
import { getWeekRecapsData } from "@/utils/recapdata";
import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
} from "@/utils/typography";

export default async function RecapPage() {
  const weekRecaps = await getWeekRecapsData();

  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: false,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Weekly Recaps
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This is my personal ritual of reflecting, and making sense of the week's
        learning journey.
      </p>

      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This space helps me stay grounded in the process, celebrate small wins,
        and spot the bigger themes in my learning. It's also a way to crystalize
        ideas by writing them out, which is usually a long never-ending list of
        new concepts, lessons from failed experiments, or links I don't want to
        lose track of.
      </p>

      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Most of all, it keeps me honest and consistent — by learning in public,
        but at my own pace.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <WeeklyRecapList recaps={weekRecaps} />
    </section>
  );
}
