import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

// Sample data structure (replace with your actual data source later)
const recaps = [
  {
    year: 2025,
    month: "January",
    week: 1,
    dates: "Week 1 (Jan 1 - Jan 7)",
    slug: "week-1",
  },
  {
    year: 2025,
    month: "January",
    week: 2,
    dates: "Week 2 (Jan 8 - Jan 14)",
    slug: "week-2",
  },
  {
    year: 2025,
    month: "January",
    week: 3,
    dates: "Week 3 (Jan 15 - Jan 21)",
    slug: "week-3",
  },
  {
    year: 2025,
    month: "January",
    week: 4,
    dates: "Week 4 (Jan 22 - Jan 28)",
    slug: "week-4",
  },
  {
    year: 2025,
    month: "January",
    week: 5,
    dates: "Week 5 (Jan 29 - Feb 4)",
    slug: "week-5",
  },
  {
    year: 2025,
    month: "February",
    week: 6,
    dates: "Week 6 (Feb 5 - Feb 11)",
    slug: "week-6",
  },
  {
    year: 2025,
    month: "February",
    week: 7,
    dates: "Week 7 (Feb 12 - Feb 18)",
    slug: "week-7",
  },
  {
    year: 2025,
    month: "February",
    week: 8,
    dates: "Week 8 (Feb 19 - Feb 25)",
    slug: "week-8",
  },
  {
    year: 2025,
    month: "March",
    week: 9,
    dates: "Week 9 (Feb 26 - Mar 3)",
    slug: "week-9",
  },
  {
    year: 2025,
    month: "March",
    week: 10,
    dates: "Week 10 (Mar 4 - Mar 10)",
    slug: "week-10",
  },
  {
    year: 2025,
    month: "March",
    week: 11,
    dates: "Week 11 (Mar 11 - Mar 17)",
    slug: "week-11",
  },
  {
    year: 2025,
    month: "March",
    week: 12,
    dates: "Week 12 (Mar 18 - Mar 24)",
    slug: "week-12",
  },
  {
    year: 2025,
    month: "March",
    week: 13,
    dates: "Week 13 (Mar 25 - Mar 31)",
    slug: "week-13",
  },
  {
    year: 2025,
    month: "April",
    week: 14,
    dates: "Week 14 (Apr 1 - Apr 7)",
    slug: "week-14",
  },
  {
    year: 2025,
    month: "April",
    week: 15,
    dates: "Week 15 (Apr 8 - Apr 14)",
    slug: "week-15",
  },
  {
    year: 2025,
    month: "April",
    week: 16,
    dates: "Week 16 (Apr 15 - Apr 21)",
    slug: "week-16",
  },
  {
    year: 2025,
    month: "April",
    week: 17,
    dates: "Week 17 (Apr 22 - Apr 28)",
    slug: "week-17",
  },
  {
    year: 2025,
    month: "April",
    week: 18,
    dates: "Week 18 (Apr 29 - May 5)",
    slug: "week-18",
  },
  {
    year: 2025,
    month: "May",
    week: 19,
    dates: "Week 19 (May 6 - May 12)",
    slug: "week-19",
  },
  {
    year: 2025,
    month: "May",
    week: 20,
    dates: "Week 20 (May 13 - May 19)",
    slug: "week-20",
  },
  {
    year: 2025,
    month: "May",
    week: 21,
    dates: "Week 21 (May 20 - May 26)",
    slug: "week-21",
  },
  {
    year: 2025,
    month: "May",
    week: 22,
    dates: "Week 22 (May 27 - Jun 2)",
    slug: "week-22",
  },
  {
    year: 2025,
    month: "June",
    week: 23,
    dates: "Week 23 (Jun 3 - Jun 9)",
    slug: "week-23",
  },
  {
    year: 2025,
    month: "June",
    week: 24,
    dates: "Week 24 (Jun 10 - Jun 16)",
    slug: "week-24",
  },
  {
    year: 2025,
    month: "June",
    week: 25,
    dates: "Week 25 (Jun 17 - Jun 23)",
    slug: "week-25",
  },
  {
    year: 2025,
    month: "June",
    week: 26,
    dates: "Week 26 (Jun 24 - Jun 30)",
    slug: "week-26",
  },
  {
    year: 2025,
    month: "July",
    week: 27,
    dates: "Week 27 (Jul 1 - Jul 7)",
    slug: "week-27",
  },
  {
    year: 2025,
    month: "July",
    week: 28,
    dates: "Week 28 (Jul 8 - Jul 14)",
    slug: "week-28",
  },
  {
    year: 2025,
    month: "July",
    week: 29,
    dates: "Week 29 (Jul 15 - Jul 21)",
    slug: "week-29",
  },
  {
    year: 2025,
    month: "July",
    week: 30,
    dates: "Week 30 (Jul 22 - Jul 28)",
    slug: "week-30",
  },
  {
    year: 2025,
    month: "July",
    week: 31,
    dates: "Week 31 (Jul 29 - Aug 4)",
    slug: "week-31",
  },
  {
    year: 2025,
    month: "August",
    week: 32,
    dates: "Week 32 (Aug 5 - Aug 11)",
    slug: "week-32",
  },
  {
    year: 2025,
    month: "August",
    week: 33,
    dates: "Week 33 (Aug 12 - Aug 18)",
    slug: "week-33",
  },
  {
    year: 2025,
    month: "August",
    week: 34,
    dates: "Week 34 (Aug 19 - Aug 25)",
    slug: "week-34",
  },
  {
    year: 2025,
    month: "August",
    week: 35,
    dates: "Week 35 (Aug 26 - Sep 1)",
    slug: "week-35",
  },
  {
    year: 2025,
    month: "September",
    week: 36,
    dates: "Week 36 (Sep 2 - Sep 8)",
    slug: "week-36",
  },
  {
    year: 2025,
    month: "September",
    week: 37,
    dates: "Week 37 (Sep 9 - Sep 15)",
    slug: "week-37",
  },
  {
    year: 2025,
    month: "September",
    week: 38,
    dates: "Week 38 (Sep 16 - Sep 22)",
    slug: "week-38",
  },
  {
    year: 2025,
    month: "September",
    week: 39,
    dates: "Week 39 (Sep 23 - Sep 29)",
    slug: "week-39",
  },
  {
    year: 2025,
    month: "September",
    week: 40,
    dates: "Week 40 (Sep 30 - Oct 6)",
    slug: "week-40",
  },
  {
    year: 2025,
    month: "October",
    week: 41,
    dates: "Week 41 (Oct 7 - Oct 13)",
    slug: "week-41",
  },
  {
    year: 2025,
    month: "October",
    week: 42,
    dates: "Week 42 (Oct 14 - Oct 20)",
    slug: "week-42",
  },
  {
    year: 2025,
    month: "October",
    week: 43,
    dates: "Week 43 (Oct 21 - Oct 27)",
    slug: "week-43",
  },
  {
    year: 2025,
    month: "October",
    week: 44,
    dates: "Week 44 (Oct 28 - Nov 3)",
    slug: "week-44",
  },
  {
    year: 2025,
    month: "November",
    week: 45,
    dates: "Week 45 (Nov 4 - Nov 10)",
    slug: "week-45",
  },
  {
    year: 2025,
    month: "November",
    week: 46,
    dates: "Week 46 (Nov 11 - Nov 17)",
    slug: "week-46",
  },
  {
    year: 2025,
    month: "November",
    week: 47,
    dates: "Week 47 (Nov 18 - Nov 24)",
    slug: "week-47",
  },
  {
    year: 2025,
    month: "November",
    week: 48,
    dates: "Week 48 (Nov 25 - Dec 1)",
    slug: "week-48",
  },
  {
    year: 2025,
    month: "December",
    week: 49,
    dates: "Week 49 (Dec 2 - Dec 8)",
    slug: "week-49",
  },
  {
    year: 2025,
    month: "December",
    week: 50,
    dates: "Week 50 (Dec 9 - Dec 15)",
    slug: "week-50",
  },
  {
    year: 2025,
    month: "December",
    week: 51,
    dates: "Week 51 (Dec 16 - Dec 22)",
    slug: "week-51",
  },
  {
    year: 2025,
    month: "December",
    week: 52,
    dates: "Week 52 (Dec 23 - Dec 29)",
    slug: "week-52",
  },
  {
    year: 2025,
    month: "December",
    week: 53,
    dates: "Week 53 (Dec 30 - Jan 5)",
    slug: "week-53",
  },
  // Add more recap entries as needed
];

// Helper function to group recaps by year and month
function groupRecaps(data) {
  const grouped = {};
  data.forEach((item) => {
    const year = item.year;
    const month = item.month;
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(item);
    grouped[year][month].sort((a, b) => b.week - a.week);
  });
  return grouped;
}

export default function RecapPage() {
  const groupedData = groupRecaps(recaps);
  const years = Object.keys(groupedData).sort(
    (a, b) => parseInt(b) - parseInt(a)
  ); // Sort years descending

  return (
    <section className="space-y-6">
      <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
        Weekly Recap
      </h1>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        This is my personal ritual of reflecting, and making sense of the week’s
        learning journey.
      </p>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        This space helps me stay grounded in the process, celebrate small wins,
        and spot the bigger themes in my learning. It’s also a way to crystalize
        ideas by writing them out, which is usually a long never-ending list of
        new concepts, lessons from failed experiments, or links I don’t want to
        lose track of.
      </p>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        Most of all, it keeps me honest and consistent — by learning in public,
        but at my own pace.
      </p>

      {/* Accordion for recaps */}
      {years.map((year) => (
        <div key={year} className="space-y-4">
          <Accordion type="multiple" className="w-full border-none">
            <AccordionItem value={`year-${year}`} className="border-none">
              <AccordionTrigger className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400">
                {year}
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple" className="w-full pl-4 border-none">
                  {[...Object.keys(groupedData[year])]
                    .reverse()
                    .map((month, monthIndex) => (
                      <AccordionItem
                        key={`${year}-${month}`}
                        value={`month-${year}-${monthIndex}`}
                        className="border-none"
                      >
                        <AccordionTrigger className="text-[0.95rem] font-semibold font-borna text-neutral-700 dark:text-neutral-300 transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400">
                          {month}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-4 pt-1 pl-6 mb-2">
                            {groupedData[year][month].map((recap) => (
                              <li
                                key={recap.slug}
                                className="transition-transform duration-200 hover:scale-102"
                              >
                                <Link
                                  href={`/learning/recap/${recap.slug}`}
                                  className="font-satoshi text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                                >
                                  {recap.dates}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="py-5"></div>
        </div>
      ))}
      <div className="py-5"></div>
    </section>
  );
}
