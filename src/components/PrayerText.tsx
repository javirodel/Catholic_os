import type { ReactNode } from 'react';
import type { Prayer } from '../data/prayers';

interface Props {
  prayer: Prayer;
  /** Línea secundaria bajo el título (p. ej. «Se repite diez veces»). */
  note?: string;
  /** Control a la derecha del título (p. ej. marca de completado). */
  action?: ReactNode;
  compact?: boolean;
}

export function PrayerText({ prayer, note, action, compact = false }: Props) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className={`font-serif tracking-wide text-accent ${compact ? 'text-base' : 'text-lg'}`}>
            {prayer.title}
          </h4>
          {note && <p className="mt-0.5 font-sans text-sm text-muted">{note}</p>}
        </div>
        {action}
      </div>
      <div className="mt-3 space-y-4 text-[1.1875rem] leading-[1.85] text-ink">
        {prayer.paragraphs.map((p) => (
          <p key={p} className="[overflow-wrap:anywhere]">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
