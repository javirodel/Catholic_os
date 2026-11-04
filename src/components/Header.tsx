import { TOTAL_STEPS } from '../lib/progress';

interface Props {
  dayLabel: string;
  setTitle: string;
  completed: number;
}

export function Header({ dayLabel, setTitle, completed }: Props) {
  return (
    <header className="text-center">
      <p className="font-sans text-xs uppercase tracking-[0.35em] text-accent">Mi Rosario</p>
      <p className="mt-6 text-lg text-muted">{dayLabel}</p>
      <h1 className="mt-1 text-[2rem] leading-tight text-ink">{setTitle}</h1>
      <p className="mt-4 font-sans text-sm text-muted">
        Progreso: {completed} de {TOTAL_STEPS} pasos
      </p>
      {/* Segmentos en lugar de estilos inline: compatible con una CSP estricta. */}
      <div
        role="progressbar"
        aria-label="Progreso del Rosario"
        aria-valuemin={0}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={completed}
        className="mx-auto mt-3 flex w-44 gap-1"
      >
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span key={i} className={`h-px flex-1 ${i < completed ? 'bg-accent' : 'bg-line'}`} />
        ))}
      </div>
    </header>
  );
}
