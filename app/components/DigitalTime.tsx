'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeZones = [
  { label: 'CAT', zone: 'Africa/Maputo' }, // Central Africa Time
  { label: 'GMT', zone: 'Etc/GMT' },      // Greenwich Mean Time
  { label: 'PST', zone: 'America/Los_Angeles' }, // Pacific Standard Time
  { label: 'EST', zone: 'America/New_York' },    // Eastern Standard Time
  { label: 'CET', zone: 'Europe/Berlin' },       // Central European Time
  { label: 'IST', zone: 'Asia/Kolkata' },        // India Standard Time
  { label: 'JST', zone: 'Asia/Tokyo' },          // Japan Standard Time
  { label: 'AEST', zone: 'Australia/Sydney' },   // Australian Eastern Standard Time
  { label: 'MSK', zone: 'Europe/Moscow' },       // Moscow Time
  { label: 'BRT', zone: 'America/Sao_Paulo' },   // Brasilia Time
  { label: 'AKST', zone: 'America/Anchorage' },  // Alaska Standard Time
  { label: 'HST', zone: 'Pacific/Honolulu' },    // Hawaii Standard Time
];

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function DigitalTime() {
  const [zoneIndex, setZoneIndex] = useState(0);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timeZones[zoneIndex].zone,
      };
      let t = now.toLocaleTimeString([], timeOptions).slice(0, 5); // HH:MM
      setTime(`${t} ${timeZones[zoneIndex].label}`);

      const weekday = now.toLocaleDateString([], { weekday: 'long', timeZone: timeZones[zoneIndex].zone });
      const month = now.toLocaleDateString([], { month: 'long', timeZone: timeZones[zoneIndex].zone });
      const day = now.toLocaleDateString([], { day: 'numeric', timeZone: timeZones[zoneIndex].zone });
      const year = now.toLocaleDateString([], { year: 'numeric', timeZone: timeZones[zoneIndex].zone });
      const dayWithOrdinal = getOrdinal(Number(day));
      setDate(`${weekday}, ${month} ${dayWithOrdinal}, ${year}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [zoneIndex]);

  const handleToggle = () => setZoneIndex((i) => (i + 1) % timeZones.length);

  return (
    <motion.div
      onClick={handleToggle}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col gap-1 select-none cursor-pointer w-full items-end"
      aria-label="Toggle time zone"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={zoneIndex + time}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="font-satoshi text-sm tabular-nums text-right w-full"
        >
          {time}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={zoneIndex + date}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="font-satoshi text-sm text-neutral-500 dark:text-neutral-400 text-left w-full"
        >
          {date}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
} 