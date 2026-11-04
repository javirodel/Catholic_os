import { Check } from 'lucide-react';

interface Props {
  checked: boolean;
  onToggle: () => void;
  /** Texto accesible, p. ej. «Credo». */
  label: string;
}

/** Marca de completado elegante, táctil (44 px) y discreta. */
export function CheckButton({ checked, onToggle, label }: Props) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className="group -mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
          checked
            ? 'border-accent bg-accent/15 text-accent'
            : 'border-line bg-surface text-transparent group-hover:border-muted/60'
        }`}
      >
        <Check size={13} strokeWidth={2.2} aria-hidden="true" />
      </span>
    </button>
  );
}
