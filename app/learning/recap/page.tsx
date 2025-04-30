import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

// Sample data structure (replace with your actual data source later)
const recaps = [
  { year: 2025, month: 'January', week: 1, dates: 'Jan 1 - Jan 7', slug: 'week-1' },
  { year: 2025, month: 'January', week: 2, dates: 'Jan 8 - Jan 14', slug: 'week-2' },
  { year: 2025, month: 'January', week: 3, dates: 'Jan 15 - Jan 21', slug: 'week-3' },
  { year: 2025, month: 'January', week: 4, dates: 'Jan 22 - Jan 28', slug: 'week-4' },
  { year: 2025, month: 'January', week: 5, dates: 'Jan 29 - Feb 4', slug: 'week-5' },
  { year: 2025, month: 'February', week: 6, dates: 'Feb 5 - Feb 11', slug: 'week-6' },
  { year: 2025, month: 'February', week: 7, dates: 'Feb 12 - Feb 18', slug: 'week-7' },
  { year: 2025, month: 'February', week: 8, dates: 'Feb 19 - Feb 25', slug: 'week-8' },
  { year: 2025, month: 'March', week: 9, dates: 'Feb 26 - Mar 3', slug: 'week-9' },
  { year: 2025, month: 'March', week: 10, dates: 'Mar 4 - Mar 10', slug: 'week-10' },
  { year: 2025, month: 'March', week: 11, dates: 'Mar 11 - Mar 17', slug: 'week-11' },
  { year: 2025, month: 'March', week: 12, dates: 'Mar 18 - Mar 24', slug: 'week-12' },
  { year: 2025, month: 'March', week: 13, dates: 'Mar 25 - Mar 31', slug: 'week-13' },
  { year: 2025, month: 'April', week: 14, dates: 'Apr 1 - Apr 7', slug: 'week-14' },
  { year: 2025, month: 'April', week: 15, dates: 'Apr 8 - Apr 14', slug: 'week-15' },
  { year: 2025, month: 'April', week: 16, dates: 'Apr 15 - Apr 21', slug: 'week-16' },
  { year: 2025, month: 'April', week: 17, dates: 'Apr 22 - Apr 28', slug: 'week-17' },
  // Add more recap entries as needed
];

// Helper function to group recaps by year and month
function groupRecaps(data) {
  const grouped = {};
  data.forEach(item => {
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
  const years = Object.keys(groupedData).sort((a, b) => parseInt(b) - parseInt(a)); // Sort years descending

  return (
    <section className="space-y-6">
      <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
        Weekly Recap
      </h1>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        My attempt at documenting, reflecting on, and being grateful for what I learned each week.
      </p>

      {/* Accordion for recaps */} 
      {years.map(year => (
        <div key={year} className="space-y-4">
          {/* Optionally add Year heading if multiple years exist */}
          {/* <h2 className="text-xl font-semibold font-borna">{year}</h2> */} 
          
          <Accordion type="multiple" className="w-full">
            {[...Object.keys(groupedData[year])].reverse().map((month, index) => (
              <AccordionItem key={`${year}-${month}`} value={`item-${year}-${index}`}>
              <AccordionTrigger className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400">
                  {month} {year}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-1 pl-2 mb-2">
                    {groupedData[year][month].map(recap => (
                      <li key={recap.slug} className="transition-transform duration-200 hover:scale-102">
                        <Link 
                          href={`/learning/recap/${recap.slug}`} 
                          className="font-satoshi text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                        >
                          Week {recap.week}, {recap.year} ({recap.dates})
                        </Link>
                      </li>
                    ))}
                  </ul> 
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

    </section>
  );
} 