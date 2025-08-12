import {
  getHeadingClass,
  getParagraphClass,
  getTextClass,
  getSectionClass,
  getPageAllowanceClass,
  getAllowanceClass,
} from "@/utils/typography";
import Link from "next/link";

export default function CatalogPage() {
  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: true,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Here are some of the things I’ve built and collected over the years.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: false })}>
        Chromatic Silence
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: false })}>
        Brutalist Monoliths
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: false })}>
        Threaded Statements
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
    </section>
  );
}
