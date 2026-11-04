import { Closing } from './components/Closing';
import { Header } from './components/Header';
import { MysteryCard } from './components/MysteryCard';
import { Opening } from './components/Opening';
import { ResetButton } from './components/ResetButton';
import { getMysterySet } from './lib/date';
import { MYSTERY_STEPS, FINAL_STEP } from './lib/progress';
import { useRosary } from './lib/useRosary';

const realNow = () => new Date();

interface Props {
  /** Inyectable para pruebas. */
  getNow?: () => Date;
}

export default function App({ getNow = realNow }: Props) {
  const { day, doneSet, toggle, reset } = useRosary(getNow);
  const set = getMysterySet(day.weekday);
  const currentIndex = MYSTERY_STEPS.findIndex((s) => !doneSet.has(s));

  return (
    <main className="mx-auto w-full max-w-[38rem] px-5 pb-20 pt-10 sm:px-6 sm:pt-14">
      <Header dayLabel={day.label} setTitle={set.title} completed={doneSet.size} />

      <Opening doneSet={doneSet} onToggle={toggle} />

      <section aria-labelledby="misterios" className="mt-14">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-line/70" />
          <h2
            id="misterios"
            className="font-sans text-[0.6875rem] uppercase tracking-[0.32em] text-accent"
          >
            Los cinco misterios
          </h2>
          <span className="h-px flex-1 bg-line/70" />
        </div>

        <div className="mt-6 space-y-5">
          {set.mysteries.map((m, i) => (
            <MysteryCard
              key={m.name}
              number={i + 1}
              mystery={m}
              done={doneSet.has(MYSTERY_STEPS[i])}
              current={i === currentIndex}
              onToggle={() => toggle(MYSTERY_STEPS[i])}
            />
          ))}
        </div>
      </section>

      <Closing done={doneSet.has(FINAL_STEP)} onToggle={() => toggle(FINAL_STEP)} />

      <footer className="mt-14 border-t border-line/60 pt-8 text-center">
        <ResetButton onConfirm={reset} />
      </footer>
    </main>
  );
}
