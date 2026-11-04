import { MYSTERY_SETS, type MysterySet, type MysterySetId } from '../data/mysteries';

export const TIME_ZONE = 'Europe/Madrid';

/** 0 = domingo … 6 = sábado */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface MadridDay {
  /** YYYY-MM-DD en hora de Madrid. */
  key: string;
  weekday: Weekday;
  /** Ej.: «Miércoles, 4 de noviembre». */
  label: string;
}

const WEEKDAY_INDEX: Record<string, Weekday> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: 'short',
});

const weekdayFormatter = new Intl.DateTimeFormat('es-ES', {
  timeZone: TIME_ZONE,
  weekday: 'long',
});

const dayMonthFormatter = new Intl.DateTimeFormat('es-ES', {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'long',
});

export function getMadridDay(now: Date = new Date()): MadridDay {
  const parts: Record<string, string> = {};
  for (const p of partsFormatter.formatToParts(now)) parts[p.type] = p.value;

  const weekday = WEEKDAY_INDEX[parts.weekday];
  const weekdayName = weekdayFormatter.format(now);
  const capitalized = weekdayName.charAt(0).toUpperCase() + weekdayName.slice(1);

  return {
    key: `${parts.year}-${parts.month}-${parts.day}`,
    weekday,
    label: `${capitalized}, ${dayMonthFormatter.format(now)}`,
  };
}

const SET_BY_WEEKDAY: Record<Weekday, MysterySetId> = {
  0: 'gloriosos',
  1: 'gozosos',
  2: 'dolorosos',
  3: 'gloriosos',
  4: 'luminosos',
  5: 'dolorosos',
  6: 'gozosos',
};

export function getMysterySet(weekday: Weekday): MysterySet {
  return MYSTERY_SETS[SET_BY_WEEKDAY[weekday]];
}
