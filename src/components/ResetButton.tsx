import { useState } from 'react';

interface Props {
  onConfirm: () => void;
}

/** Reinicio discreto con confirmación en línea (sin diálogos del navegador). */
export function ResetButton({ onConfirm }: Props) {
  const [asking, setAsking] = useState(false);

  if (!asking) {
    return (
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="min-h-11 px-4 font-sans text-sm text-muted underline decoration-line underline-offset-4"
      >
        Reiniciar el Rosario de hoy
      </button>
    );
  }

  return (
    <div role="alertdialog" aria-label="Confirmar reinicio" className="space-y-3">
      <p className="font-sans text-sm text-muted">¿Borrar las marcas de hoy?</p>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            onConfirm();
            setAsking(false);
          }}
          className="min-h-11 rounded-lg border border-accent/60 px-5 font-sans text-sm text-accent"
        >
          Sí, reiniciar
        </button>
        <button
          type="button"
          onClick={() => setAsking(false)}
          className="min-h-11 rounded-lg border border-line px-5 font-sans text-sm text-muted"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
