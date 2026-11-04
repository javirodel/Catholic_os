interface Props {
  dayLabel: string;
  setTitle: string;
}

export function Header({ dayLabel, setTitle }: Props) {
  return (
    <header className="border-b border-line/60 pb-6 pt-1 text-center">
      <div className="mx-auto mb-3 flex flex-col items-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 text-accent/80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M12 3v18M6.5 8.5h11" />
        </svg>
        <p className="mt-2 font-sans text-[0.625rem] uppercase tracking-[0.38em] text-accent">
          Catholic OS
        </p>
      </div>

      <p className="font-serif text-[0.95rem] italic text-muted">{dayLabel}</p>
      <h1 className="mt-1 font-serif text-[1.15rem] font-normal tracking-wide text-ink">
        {setTitle}
      </h1>
    </header>
  );
}
