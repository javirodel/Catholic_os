import { PRAYERS } from '../data/prayers';
import { PrayerText } from './PrayerText';

interface Props {
  doneSet: Set<string>;
  currentStep?: string;
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

export function Opening({ doneSet, currentStep, onToggle }: Props) {
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

      <div className="mt-6 space-y-3.5">
        {ITEMS.map(({ step, prayer, note }) => {
          const isDone = doneSet.has(step);
          const isCurrent = currentStep === step;
          return (
            <article
              key={step}
              role="button"
              tabIndex={0}
              aria-pressed={isDone}
              aria-current={isCurrent ? 'step' : undefined}
              onClick={() => onToggle(step)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle(step);
                }
              }}
              className={`cursor-pointer select-none rounded-xl border px-5 py-5 transition-colors sm:px-7 sm:py-6 ${
                isCurrent
                  ? 'border-accent/65 bg-elevated'
                  : 'border-line/75 bg-surface hover:border-line'
              }`}
            >
              <PrayerText
                prayer={prayer}
                note={note}
                dimmed={isDone && !isCurrent}
                badge={isCurrent ? 'Actual' : isDone ? 'Completado' : undefined}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
