type StatusType = "Completed" | "Ongoing" | "Draft" | "Skipped" | "Planned";

type WeekRecap = {
  week: number;
  dates: string;
  slug: string;
  status: StatusType;
  description: string;
};

// Get status and description from individual week page metadata, or defaults
async function getWeekMetadata(
  weekNumber: number
): Promise<{ status: StatusType; description: string }> {
  try {
    // Try to dynamically import the week page
    const pageModule = await import(
      `@/app/learning/recap/week-${weekNumber}/page`
    );

    // Access the exported recapMetadata
    if (pageModule.recapMetadata) {
      return {
        status: pageModule.recapMetadata.status || "Planned",
        description:
          pageModule.recapMetadata.description || "No description available",
      };
    }

    // If no metadata found, return defaults
    return {
      status: "Planned",
      description: "No description available",
    };
  } catch (error) {
    // Week page doesn't exist or can't be imported - return defaults
    return {
      status: "Planned",
      description: "No description available",
    };
  }
}

export async function getWeekRecapsData(): Promise<WeekRecap[]> {
  // Generate all 52 weeks and get their actual status and description
  const weekPromises = Array.from({ length: 52 }, async (_, i) => {
    const weekNum = i + 1;
    const metadata = await getWeekMetadata(weekNum);

    return {
      week: weekNum,
      dates: getWeekDateRange(weekNum),
      slug: `week-${weekNum}`,
      status: metadata.status,
      description: metadata.description,
    };
  });

  const weekRecaps = await Promise.all(weekPromises);

  // Return in ascending order (week 1 first)
  return weekRecaps;
}

// Helper function to get date range for a week number
function getWeekDateRange(weekNumber: number): string {
  const weekDates: Record<number, string> = {
    1: "Dec 30 – Jan 5",
    2: "Jan 6 – Jan 12",
    3: "Jan 13 – Jan 19",
    4: "Jan 20 – Jan 26",
    5: "Jan 27 – Feb 2",
    6: "Feb 3 – Feb 9",
    7: "Feb 10 – Feb 16",
    8: "Feb 17 – Feb 23",
    9: "Feb 24 – Mar 2",
    10: "Mar 3 – Mar 9",
    11: "Mar 10 – Mar 16",
    12: "Mar 17 – Mar 23",
    13: "Mar 24 – Mar 30",
    14: "Mar 31 – Apr 6",
    15: "Apr 7 – Apr 13",
    16: "Apr 14 – Apr 20",
    17: "Apr 21 – Apr 27",
    18: "Apr 28 – May 4",
    19: "May 5 – May 11",
    20: "May 12 – May 18",
    21: "May 19 – May 25",
    22: "May 26 – Jun 1",
    23: "Jun 2 – Jun 8",
    24: "Jun 9 – Jun 15",
    25: "Jun 16 – Jun 22",
    26: "Jun 23 – Jun 29",
    27: "Jun 30 – Jul 6",
    28: "Jul 7 – Jul 13",
    29: "Jul 14 – Jul 20",
    30: "Jul 21 – Jul 27",
    31: "Jul 28 – Aug 3",
    32: "Aug 4 – Aug 10",
    33: "Aug 11 – Aug 17",
    34: "Aug 18 – Aug 24",
    35: "Aug 25 – Aug 31",
    36: "Sep 1 – Sep 7",
    37: "Sep 8 – Sep 14",
    38: "Sep 15 – Sep 21",
    39: "Sep 22 – Sep 28",
    40: "Sep 29 – Oct 5",
    41: "Oct 6 – Oct 12",
    42: "Oct 13 – Oct 19",
    43: "Oct 20 – Oct 26",
    44: "Oct 27 – Nov 2",
    45: "Nov 3 – Nov 9",
    46: "Nov 10 – Nov 16",
    47: "Nov 17 – Nov 23",
    48: "Nov 24 – Nov 30",
    49: "Dec 1 – Dec 7",
    50: "Dec 8 – Dec 14",
    51: "Dec 15 – Dec 21",
    52: "Dec 22 – Dec 28",
  };

  return weekDates[weekNumber] || `Week ${weekNumber}`;
}
