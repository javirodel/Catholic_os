import { PRAYERS } from '../data/prayers';
import { PrayerText } from './PrayerText';

interface Props {
  activeStep: string;
  onSelect: (step: string) => void;
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

export function Opening({ activeStep, onSelect }: Props) {
  return (
    <section aria-labelledby="inicio" className="mt-10">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line/70" />
        <h2
          id="inicio"
          className="font-sans text-[0.65rem] uppercase tracking-[0.32em] text-accent"
        >
          Oraciones iniciales
        </h2>
        <span className="h-px flex-1 bg-line/70" />
      </div>

      <div className="mt-5 space-y-3.5">
        {ITEMS.map(({ step, prayer, note }) => {
          const isActive = activeStep === step;
          return (
            <article
              key={step}
              data-step={step}
              data-active={isActive}
              onClick={() => onSelect(step)}
              className={`rounded-xl border px-5 py-5 transition-colors duration-300 sm:px-7 sm:py-6 ${
                isActive ? 'border-accent/65 bg-elevated' : 'border-line/70 bg-surface'
              }`}
            >
              <PrayerText prayer={prayer} note={note} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
