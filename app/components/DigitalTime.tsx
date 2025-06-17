"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDigitalClockClass } from "@/utils/typography";

const timeZones = [
  { label: "CAT", zone: "Africa/Maputo" },
  { label: "GMT", zone: "Etc/GMT" },
  { label: "PST", zone: "America/Los_Angeles" },
  { label: "EST", zone: "America/New_York" },
  { label: "CET", zone: "Europe/Berlin" },
  { label: "IST", zone: "Asia/Kolkata" },
  { label: "JST", zone: "Asia/Tokyo" },
  { label: "AEST", zone: "Australia/Sydney" },
  { label: "MSK", zone: "Europe/Moscow" },
  { label: "BRT", zone: "America/Sao_Paulo" },
  { label: "AKST", zone: "America/Anchorage" },
  { label: "HST", zone: "Pacific/Honolulu" },
];

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function DigitalTime() {
  const [zoneIndex, setZoneIndex] = useState(0);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timeZones[zoneIndex].zone,
      };
      const t = now.toLocaleTimeString([], options).slice(0, 5);
      setTime(`${t} ${timeZones[zoneIndex].label}`);

      const month = now.toLocaleDateString([], {
        month: "long",
        timeZone: timeZones[zoneIndex].zone,
      });
      const day = now.toLocaleDateString([], {
        day: "numeric",
        timeZone: timeZones[zoneIndex].zone,
      });
      const year = now.toLocaleDateString([], {
        year: "numeric",
        timeZone: timeZones[zoneIndex].zone,
      });
      const dayWithOrdinal = getOrdinal(Number(day));

      setDate(`${month} ${dayWithOrdinal}, ${year}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [zoneIndex]);

  const handleToggle = () => {
    setZoneIndex((i) => (i + 1) % timeZones.length);
  };

  return (
    <motion.div
      onClick={handleToggle}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col gap-1.5 select-none cursor-pointer w-full items-end"
      aria-label="Toggle time zone"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`time-${zoneIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut", type: "tween" }}
        >
          <span className={getDigitalClockClass({ responsive: true })}>
            {time}
          </span>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`date-${zoneIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut", type: "tween" }}
        >
          <span
            className={getDigitalClockClass({ responsive: true, muted: true })}
          >
            {date}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
