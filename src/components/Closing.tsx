import { PRAYERS } from '../data/prayers';
import { PrayerText } from './PrayerText';

interface Props {
  done: boolean;
  onToggle: () => void;
}

export function Closing({ done, onToggle }: Props) {
  return (
    <section aria-labelledby="final" className="mt-10">
      <h2 id="final" className="font-sans text-xs uppercase tracking-[0.25em] text-muted">
        Final del Rosario
      </h2>
      <article className="mt-4 space-y-6 rounded-lg border border-line bg-surface p-5">
        <PrayerText prayer={PRAYERS.salve} />
        <div className="border-t border-line pt-6">
          <PrayerText prayer={PRAYERS.oracionFinal} />
        </div>
        <div className="border-t border-line pt-6">
          <PrayerText prayer={PRAYERS.senal} />
        </div>
        <button
          type="button"
          role="checkbox"
          aria-checked={done}
          onClick={onToggle}
          className={`flex min-h-12 w-full items-center justify-center rounded-lg border px-4 font-sans text-base transition-colors ${
            done ? 'border-accent bg-accent text-bg' : 'border-accent/60 text-accent'
          }`}
        >
          {done ? 'Rosario terminado ✓' : 'Marcar Rosario como terminado'}
        </button>
      </article>
    </section>
  );
}
