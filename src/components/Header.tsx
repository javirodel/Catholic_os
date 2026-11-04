import { TOTAL_STEPS } from '../lib/progress';

interface Props {
  dayLabel: string;
  setTitle: string;
  completed: number;
}

export function Header({ dayLabel, setTitle, completed }: Props) {
  return (
    <header className="pb-10 pt-2 text-center border-b border-line/70">
      <div className="mx-auto mb-5 flex flex-col items-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-accent/85"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M12 3v18M6.5 8.5h11" />
        </svg>
        <p className="mt-3 font-sans text-[0.6875rem] uppercase tracking-[0.38em] text-accent">
          Mi Rosario
        </p>
      </div>

      <p className="font-serif text-base italic text-muted">{dayLabel}</p>
      <h1 className="mt-1.5 font-serif text-[2.125rem] font-normal tracking-tight leading-tight text-ink sm:text-[2.375rem]">
        {setTitle}
      </h1>

      <div className="mt-7 flex flex-col items-center">
        <div
          role="progressbar"
          aria-label="Progreso del Rosario"
          aria-valuemin={0}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={completed}
          className="flex items-center gap-2"
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const isMystery = i >= 5 && i <= 9;
            const isDone = i < completed;
            return (
              <span
                key={i}
                className={`rounded-full transition-colors ${
                  isMystery ? 'h-2 w-2' : 'h-1.5 w-1.5'
                } ${isDone ? 'bg-accent' : 'border border-line bg-surface'}`}
              />
            );
          })}
        </div>
        <p className="mt-2.5 font-sans text-xs tracking-wider text-muted">
          Progreso: {completed} de {TOTAL_STEPS} pasos
        </p>
      </div>
    </header>
  );
}
