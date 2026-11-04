import { Check } from 'lucide-react';

interface Props {
  checked: boolean;
  onToggle: () => void;
  /** Texto accesible, p. ej. «Credo». */
  label: string;
}

/** Marca de completado: círculo discreto de 44 px (área táctil cómoda). */
export function CheckButton({ checked, onToggle, label }: Props) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
        checked ? 'border-accent bg-accent text-bg' : 'border-line text-transparent'
      }`}
    >
      <Check size={20} strokeWidth={2.25} aria-hidden="true" />
    </button>
  );
}
