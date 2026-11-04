import { PRAYERS } from '../data/prayers';
import { PrayerText } from './PrayerText';

interface Props {
  done: boolean;
  current: boolean;
  onToggle: () => void;
}

export function Closing({ done, current, onToggle }: Props) {
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

      <article
        aria-current={current ? 'step' : undefined}
        className={`mt-6 divide-y divide-line/60 rounded-xl border px-5 transition-colors sm:px-7 ${
          current ? 'border-accent/65 bg-elevated' : 'border-line/75 bg-surface'
        }`}
      >
        <div className="py-6">
          <PrayerText
            prayer={PRAYERS.salve}
            dimmed={done && !current}
            badge={current ? 'Actual' : done ? 'Completado' : undefined}
          />
        </div>
        <div className="py-6">
          <PrayerText prayer={PRAYERS.oracionFinal} dimmed={done && !current} />
        </div>
        <div className="py-6">
          <PrayerText prayer={PRAYERS.senal} dimmed={done && !current} />
        </div>
        <div className="py-6">
          <button
            type="button"
            onClick={onToggle}
            className={`flex min-h-12 w-full items-center justify-center rounded-lg border px-4 font-sans text-sm tracking-wide transition-colors ${
              done
                ? 'border-line text-muted hover:border-accent/40 hover:text-ink'
                : 'border-accent/55 bg-accent/10 text-accent hover:bg-accent/15'
            }`}
          >
            {done ? 'Rosario terminado' : 'Completar el Rosario'}
          </button>
        </div>
      </article>
    </section>
  );
}
