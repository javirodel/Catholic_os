import { PRAYERS } from '../data/prayers';
import { PrayerText } from './PrayerText';

interface Props {
  step: string;
  active: boolean;
  onSelect: () => void;
}

export function Closing({ step, active, onSelect }: Props) {
  return (
    <section aria-labelledby="final" className="mt-12">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line/70" />
        <h2
          id="final"
          className="font-sans text-[0.65rem] uppercase tracking-[0.32em] text-accent"
        >
          Oraciones finales
        </h2>
        <span className="h-px flex-1 bg-line/70" />
      </div>

      <article
        data-step={step}
        data-active={active}
        onClick={onSelect}
        className={`mt-5 divide-y divide-line/60 rounded-xl border px-5 transition-colors duration-300 sm:px-7 ${
          active ? 'border-accent/65 bg-elevated' : 'border-line/70 bg-surface'
        }`}
      >
        <div className="py-5">
          <PrayerText prayer={PRAYERS.salve} />
        </div>
        <div className="py-5">
          <PrayerText prayer={PRAYERS.oracionFinal} />
        </div>
        <div className="py-5">
          <PrayerText prayer={PRAYERS.senal} />
        </div>
      </article>
    </section>
  );
}
