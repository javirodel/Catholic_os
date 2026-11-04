import type { ReactNode } from 'react';
import type { Prayer } from '../data/prayers';

interface Props {
  prayer: Prayer;
  /** Rubrica / indicación bajo el título (p. ej. «Se repite diez veces»). */
  note?: string;
  /** Control a la derecha del título (p. ej. marca de completado). */
  action?: ReactNode;
  /** Atenúa ligeramente cuando el paso ya se ha completado. */
  dimmed?: boolean;
  compact?: boolean;
}

export function PrayerText({ prayer, note, action, dimmed = false, compact = false }: Props) {
  return (
    <div className={dimmed ? 'opacity-65 transition-opacity' : 'transition-opacity'}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <h4
              className={`font-serif font-normal tracking-wide text-accent ${
                compact ? 'text-[1.0625rem]' : 'text-[1.1875rem]'
              }`}
            >
              {prayer.title}
            </h4>
            {note && <span className="font-serif text-sm italic text-muted">· {note}</span>}
          </div>
        </div>
        {action}
      </div>
      <div
        className={`mt-2.5 space-y-3.5 text-[1.15rem] leading-[1.82] ${
          dimmed ? 'text-muted' : 'text-ink'
        }`}
      >
        {prayer.paragraphs.map((p) => (
          <p key={p} className="[overflow-wrap:anywhere]">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
