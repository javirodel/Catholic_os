import type { Mystery } from '../data/mysteries';
import { PRAYERS } from '../data/prayers';
import { CheckButton } from './CheckButton';
import { PrayerText } from './PrayerText';

interface Props {
  number: number;
  mystery: Mystery;
  done: boolean;
  current: boolean;
  onToggle: () => void;
}

export function MysteryCard({ number, mystery, done, current, onToggle }: Props) {
  return (
    <article
      aria-current={current ? 'step' : undefined}
      data-current={current}
      className={`rounded-lg border p-5 ${
        current ? 'border-accent/60 bg-elevated' : 'border-line bg-surface'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent">
            {number}.º misterio
          </p>
          <h3 className="mt-2 text-[1.375rem] leading-snug text-ink">{mystery.name}</h3>
          {mystery.reference && (
            <p className="mt-1 font-sans text-sm text-muted">{mystery.reference}</p>
          )}
        </div>
        <CheckButton
          checked={done}
          onToggle={onToggle}
          label={`Marcar como completado: ${number}.º misterio`}
        />
      </div>

      <p className="mt-4 text-[1.1875rem] italic leading-[1.8] text-muted">{mystery.reflection}</p>
      <p className="mt-3 text-base leading-relaxed text-muted">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent">Para mi vida </span>
        <br />
        {mystery.question}
      </p>

      <div className="mt-6 space-y-6 border-t border-line pt-6">
        <PrayerText prayer={PRAYERS.padrenuestro} compact />
        <PrayerText prayer={PRAYERS.avemaria} note="Se reza diez veces" compact />
        <PrayerText prayer={PRAYERS.gloria} compact />
        <PrayerText prayer={PRAYERS.fatima} note="Opcional" compact />
      </div>
    </article>
  );
}
