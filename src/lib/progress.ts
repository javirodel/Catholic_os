export const STORAGE_PREFIX = 'catholic-os:rosario:';

export const INITIAL_STEPS = [
  'inicio-senal',
  'inicio-credo',
  'inicio-padrenuestro',
  'inicio-avemarias',
  'inicio-gloria',
] as const;

export const MYSTERY_STEPS = [
  'misterio-1',
  'misterio-2',
  'misterio-3',
  'misterio-4',
  'misterio-5',
] as const;

export const FINAL_STEP = 'final';

export const ALL_STEPS: readonly string[] = [...INITIAL_STEPS, ...MYSTERY_STEPS, FINAL_STEP];

export function storageKey(dayKey: string): string {
  return `${STORAGE_PREFIX}${dayKey}`;
}

/** Elimina cualquier progreso de otros días (no se guarda historial). */
export function purgeOtherDays(dayKey: string): void {
  try {
    const keep = storageKey(dayKey);
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX) && k !== keep) toRemove.push(k);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignorar
  }
}
