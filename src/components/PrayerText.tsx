import type { Prayer } from '../data/prayers';

interface Props {
  prayer: Prayer;
  /** Rubrica / indicación junto al título (p. ej. «Se repite diez veces»). */
  note?: string;
  compact?: boolean;
}

export function PrayerText({ prayer, note, compact = false }: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <h4
          className={`font-serif font-normal tracking-wide text-accent ${
            compact ? 'text-[1.05rem]' : 'text-[1.15rem]'
          }`}
        >
          {prayer.title}
        </h4>
        {note && <span className="font-serif text-sm italic text-muted">· {note}</span>}
      </div>
      <div className="mt-2.5 space-y-3.5 text-[1.125rem] leading-[1.82] text-ink">
        {prayer.paragraphs.map((p) => (
          <p key={p} className="[overflow-wrap:anywhere]">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
