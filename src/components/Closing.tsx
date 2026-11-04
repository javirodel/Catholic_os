import { Check } from 'lucide-react';
import { PRAYERS } from '../data/prayers';
import { PrayerText } from './PrayerText';

interface Props {
  done: boolean;
  onToggle: () => void;
}

export function Closing({ done, onToggle }: Props) {
  return (
    <section aria-labelledby="final" className="mt-14">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line/70" />
        <h2
          id="final"
          className="font-sans text-[0.6875rem] uppercase tracking-[0.32em] text-accent"
        >
          Oraciones finales
        </h2>
        <span className="h-px flex-1 bg-line/70" />
      </div>

      <article className="mt-6 divide-y divide-line/60 rounded-xl border border-line/80 bg-surface px-5 sm:px-7">
        <div className="py-6">
          <PrayerText prayer={PRAYERS.salve} dimmed={done} />
        </div>
        <div className="py-6">
          <PrayerText prayer={PRAYERS.oracionFinal} dimmed={done} />
        </div>
        <div className="py-6">
          <PrayerText prayer={PRAYERS.senal} dimmed={done} />
        </div>
        <div className="py-6">
          <button
            type="button"
            role="checkbox"
            aria-checked={done}
            onClick={onToggle}
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border px-4 font-sans text-sm tracking-wide transition-colors ${
              done
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-accent/55 text-accent hover:bg-accent/10'
            }`}
          >
            <Check size={16} strokeWidth={2} aria-hidden="true" />
            {done ? 'Rosario terminado' : 'Marcar Rosario como terminado'}
          </button>
        </div>
      </article>
    </section>
  );
}
