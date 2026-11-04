import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Mystery } from '../data/mysteries';
import { PRAYERS } from '../data/prayers';
import { PrayerText } from './PrayerText';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

interface Props {
  step: string;
  number: number;
  mystery: Mystery;
  active: boolean;
  onSelect: () => void;
}

export function MysteryCard({ step, number, mystery, active, onSelect }: Props) {
  const [showPrayers, setShowPrayers] = useState(false);
  const roman = ROMAN[number - 1] ?? String(number);

  return (
    <article
      data-step={step}
      data-active={active}
      onClick={onSelect}
      className={`rounded-xl border px-5 py-5 transition-colors duration-300 sm:px-7 sm:py-6 ${
        active ? 'border-accent/65 bg-elevated' : 'border-line/70 bg-surface'
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-accent">
          Misterio {roman}
        </span>
        {mystery.reference && (
          <span className="font-serif text-sm italic text-muted">· {mystery.reference}</span>
        )}
      </div>

      <h3 className="mt-1.5 font-serif text-[1.15rem] font-normal leading-snug text-ink">
        {mystery.name}
      </h3>

      {/* Meditación y pregunta personal */}
      <div className="mt-4 border-l border-accent/40 pl-4">
        <p className="font-serif text-[1.1rem] italic leading-[1.78] text-ink/90">
          {mystery.reflection}
        </p>
        <p className="mt-2.5 text-[1rem] leading-relaxed text-muted">{mystery.question}</p>
      </div>

      {/* Oraciones de la decena (desplegables opcionales) */}
      {showPrayers ? (
        <div className="mt-5 divide-y divide-line/60 border-t border-line/75 pt-4">
          <div className="pb-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrayers(false);
              }}
              className="inline-flex items-center gap-1.5 font-sans text-xs tracking-wider text-muted hover:text-ink"
            >
              <ChevronDown size={14} className="rotate-180" aria-hidden="true" />
              Ocultar oraciones de la decena
            </button>
          </div>
          <div className="py-4">
            <PrayerText prayer={PRAYERS.padrenuestro} compact />
          </div>
          <div className="py-4">
            <PrayerText prayer={PRAYERS.avemaria} note="Se repite diez veces" compact />
          </div>
          <div className="py-4">
            <PrayerText prayer={PRAYERS.gloria} compact />
          </div>
          <div className="pt-4">
            <PrayerText prayer={PRAYERS.fatima} note="Opcional" compact />
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/60 pt-3.5">
          <p className="font-serif text-sm italic text-muted">
            Padrenuestro · 10 Avemarías · Gloria · Fátima
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPrayers(true);
            }}
            className="inline-flex shrink-0 items-center gap-1 font-sans text-xs tracking-wider text-accent hover:underline"
          >
            Ver oraciones
            <ChevronDown size={14} aria-hidden="true" />
          </button>
        </div>
      )}
    </article>
  );
}
