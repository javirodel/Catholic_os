import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMadridDay, type MadridDay } from './date';
import { ALL_STEPS, loadProgress, purgeOtherDays, saveProgress } from './progress';

/**
 * Estado del Rosario del día. Se reinicia solo al cambiar la fecha (Europe/Madrid),
 * incluso si la app permanece abierta, y se guarda en localStorage.
 */
export function useRosary(getNow: () => Date) {
  const [day, setDay] = useState<MadridDay>(() => getMadridDay(getNow()));
  const [done, setDone] = useState<string[]>(() => {
    const d = getMadridDay(getNow());
    purgeOtherDays(d.key);
    return loadProgress(d.key);
  });

  // Detecta cambio de día: al volver a la app y cada minuto.
  useEffect(() => {
    const check = () => {
      const next = getMadridDay(getNow());
      setDay((prev) => {
        if (prev.key === next.key) return prev;
        purgeOtherDays(next.key);
        setDone(loadProgress(next.key));
        return next;
      });
    };
    const id = window.setInterval(check, 60_000);
    document.addEventListener('visibilitychange', check);
    window.addEventListener('focus', check);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', check);
      window.removeEventListener('focus', check);
    };
  }, [getNow]);

  const update = useCallback(
    (fn: (prev: string[]) => string[]) => {
      setDone((prev) => {
        const next = fn(prev);
        saveProgress(day.key, next);
        return next;
      });
    },
    [day.key],
  );

  const toggle = useCallback(
    (step: string) =>
      update((prev) => (prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step])),
    [update],
  );

  const reset = useCallback(() => update(() => []), [update]);

  const doneSet = useMemo(() => new Set(done.filter((s) => ALL_STEPS.includes(s))), [done]);

  return { day, doneSet, toggle, reset };
}
