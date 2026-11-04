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
    note: 'Se reza tres veces',
  },
  { step: 'inicio-gloria', prayer: PRAYERS.gloria, note: undefined },
] as const;

export function Opening({ doneSet, onToggle }: Props) {
  return (
    <section aria-labelledby="inicio" className="mt-10">
      <h2 id="inicio" className="font-sans text-xs uppercase tracking-[0.25em] text-muted">
        Inicio del Rosario
      </h2>
      <div className="mt-4 space-y-4">
        {ITEMS.map(({ step, prayer, note }) => (
          <article key={step} className="rounded-lg border border-line bg-surface p-5">
            <PrayerText
              prayer={prayer}
              note={note}
              action={
                <CheckButton
                  checked={doneSet.has(step)}
                  onToggle={() => onToggle(step)}
                  label={`Marcar como rezado: ${prayer.title}`}
                />
              }
            />
          </article>
        ))}
      </div>
    </section>
  );
}
