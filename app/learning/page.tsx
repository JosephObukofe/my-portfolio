import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UnderlineLink } from "@/app/components/ui/underline-link";
import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
} from "@/utils/typography";

export default function LearningPage() {
  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: false,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        <UnderlineLink href="/learning/materials">
          Learning Materials
        </UnderlineLink>
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I’ve always had this terrible habit of hoarding resource links that I
        feel would be important, all because I might need them someday. There’s
        this subtle anxiety behind it, that if I let it go, I’d miss out on
        something important. Instead of hoarding, I’m learning to intentionally
        curate based on what I want to learn at any given time and by how much
        (depth).
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I believe that focusing on depth, especially in the fundamentals of
        anything you want to learn, helps to clear out the noise and gives you a
        bit of added confidence. Painfully slower, yes, but it sticks. In my
        case, I use this section as a central repo for any resource that sticks
        around long enough to be useful more than once.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        If you’re a learner like me — obsessive and possibly chaotically
        unstructured — then maybe this section would help you too.
      </p>
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        <UnderlineLink href="/learning/recap">Weekly Recaps</UnderlineLink>
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        These are my mini blog-style retrospectives, and I use them to reflect
        on what I explored, and particularly where I got stuck. This section, in
        many ways, is more or less what this entire site really is, which is a
        weekly-logged reflection of my learning journey. It also helps me pause
        and track how far I’ve come.
      </p>
    </section>
  );
}
