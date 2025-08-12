// app/components/DigitalTime.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getDigitalClockClass } from "@/utils/typography";

// Helper function to get timezone abbreviation from timezone name
function getTimezoneAbbreviation(timezone: string): string {
  const abbreviations: Record<string, string> = {
    "Africa/Lagos": "WAT",
    "Africa/Maputo": "CAT",
    "Etc/GMT": "GMT",
    "America/Los_Angeles": "PST",
    "America/New_York": "EST",
    "Europe/Berlin": "CET",
    "Asia/Kolkata": "IST",
    "Asia/Tokyo": "JST",
    "Australia/Sydney": "AEST",
    "Europe/Moscow": "MSK",
    "America/Sao_Paulo": "BRT",
    "America/Anchorage": "AKST",
    "Pacific/Honolulu": "HST",
  };

  // Return known abbreviation or extract from timezone
  return (
    abbreviations[timezone] ||
    timezone.split("/").pop()?.slice(0, 3).toUpperCase() ||
    "UTC"
  );
}

// Detect user's timezone
function detectUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC"; // Fallback
  }
}

type DigitalTimeProps = {
  showSeconds?: boolean;
  format24Hour?: boolean;
};

export default function DigitalTime({
  showSeconds = false,
  format24Hour = true,
}: DigitalTimeProps) {
  const [userTimezone] = useState(() => detectUserTimezone());
  const [time, setTime] = useState(() => {
    // Initialize with current time immediately
    try {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        ...(showSeconds && { second: "2-digit" }),
        hour12: !format24Hour,
        timeZone: detectUserTimezone(),
      };
      const timeStr = now.toLocaleTimeString([], timeOptions);
      const formattedTime = showSeconds ? timeStr : timeStr.slice(0, 5);
      const tzAbbr = getTimezoneAbbreviation(detectUserTimezone());
      return `${formattedTime} ${tzAbbr}`;
    } catch {
      return "--:--";
    }
  });

  // Update time display
  const updateTime = useCallback(() => {
    try {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        ...(showSeconds && { second: "2-digit" }),
        hour12: !format24Hour,
        timeZone: userTimezone,
      };

      // Format time for display (12:22)
      const timeStr = now.toLocaleTimeString([], timeOptions);
      const formattedTime = showSeconds ? timeStr : timeStr.slice(0, 5);
      const tzAbbr = getTimezoneAbbreviation(userTimezone);

      setTime(`${formattedTime} ${tzAbbr}`);
    } catch (error) {
      console.warn("Failed to format time:", error);
      setTime("--:--");
    }
  }, [userTimezone, showSeconds, format24Hour]);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  return (
    <span className={getDigitalClockClass({ responsive: true })}>{time}</span>
  );
}
