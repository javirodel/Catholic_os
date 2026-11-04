import { PRAYERS } from '../data/prayers';
import { CheckButton } from './CheckButton';
import { PrayerText } from './PrayerText';

interface Props {
  doneSet: Set<string>;
  onToggle: (step: string) => void;
}

const ITEMS = [
  { step: 'inicio-senal', prayer: PRAYERS.senal, note: undefined },
  { step: 'inicio-credo', prayer: PRAYERS.credo, note: undefined },
  { step: 'inicio-padrenuestro', prayer: PRAYERS.padrenuestro, note: undefined },
  {
    step: 'inicio-avemarias',
    prayer: { ...PRAYERS.avemaria, title: 'Tres Avemarías' },
    note: 'Tres veces',
  },
  { step: 'inicio-gloria', prayer: PRAYERS.gloria, note: undefined },
] as const;

export function Opening({ doneSet, onToggle }: Props) {
  return (
    <section aria-labelledby="inicio" className="mt-12">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line/70" />
        <h2
          id="inicio"
          className="font-sans text-[0.6875rem] uppercase tracking-[0.32em] text-accent"
        >
          Oraciones iniciales
        </h2>
        <span className="h-px flex-1 bg-line/70" />
      </div>

      <div className="mt-6 divide-y divide-line/60 rounded-xl border border-line/80 bg-surface px-5 sm:px-7">
        {ITEMS.map(({ step, prayer, note }) => {
          const isDone = doneSet.has(step);
          return (
            <article key={step} className="py-6 first:pt-6 last:pb-6">
              <PrayerText
                prayer={prayer}
                note={note}
                dimmed={isDone}
                action={
                  <CheckButton
                    checked={isDone}
                    onToggle={() => onToggle(step)}
                    label={`Marcar como rezado: ${prayer.title}`}
                  />
                }
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
