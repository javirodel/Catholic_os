import { TOTAL_STEPS } from '../lib/progress';

interface Props {
  dayLabel: string;
  setTitle: string;
  completed: number;
}

export function Header({ dayLabel, setTitle, completed }: Props) {
  return (
    <header className="border-b border-line/70 pb-8 pt-2 text-center">
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
          Catholic OS
        </p>
      </div>

      <p className="font-serif text-base italic text-muted">{dayLabel}</p>
      <h1 className="mt-1.5 font-serif text-[2.125rem] font-normal leading-tight tracking-tight text-ink sm:text-[2.375rem]">
        {setTitle}
      </h1>

      <p className="mt-4 font-sans text-xs tracking-wider text-muted">
        Progreso: {completed} de {TOTAL_STEPS} pasos
      </p>
    </header>
  );
}
