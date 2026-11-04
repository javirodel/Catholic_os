import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Mystery } from '../data/mysteries';
import { PRAYERS } from '../data/prayers';
import { CheckButton } from './CheckButton';
import { PrayerText } from './PrayerText';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

interface Props {
  number: number;
  mystery: Mystery;
  done: boolean;
  current: boolean;
  onToggle: () => void;
}

export function MysteryCard({ number, mystery, done, current, onToggle }: Props) {
  const [showPrayers, setShowPrayers] = useState(false);
  const prayersExpanded = current || showPrayers;
  const roman = ROMAN[number - 1] ?? String(number);

  return (
    <article
      aria-current={current ? 'step' : undefined}
      data-current={current}
      className={`rounded-xl border transition-colors ${
        current
          ? 'border-accent/65 bg-elevated px-5 py-6 sm:px-7 sm:py-7'
          : 'border-line/80 bg-surface px-5 py-5 sm:px-7 sm:py-6'
      }`}
    >
      {/* Cabecera del misterio */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="font-sans text-[0.6875rem] uppercase tracking-[0.28em] text-accent">
              Misterio {roman}
            </span>
            {mystery.reference && (
              <span className="font-serif text-sm italic text-muted">· {mystery.reference}</span>
            )}
            {current && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                Actual
              </span>
            )}
          </div>
          <h3
            className={`mt-1.5 font-serif text-[1.4rem] font-normal leading-snug ${
              done ? 'text-muted' : 'text-ink'
            }`}
          >
            {mystery.name}
          </h3>
        </div>
        <CheckButton
          checked={done}
          onToggle={onToggle}
          label={`Marcar como completado: ${number}.º misterio`}
        />
      </div>

      {/* Meditación y pregunta personal */}
      <div className={`mt-5 border-l-2 border-accent/35 pl-4 ${done ? 'opacity-70' : ''}`}>
        <p className="font-serif text-[1.15rem] italic leading-[1.78] text-ink/90">
          {mystery.reflection}
        </p>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{mystery.question}</p>
      </div>

      {/* Oraciones de la decena */}
      {prayersExpanded ? (
        <div className="mt-6 divide-y divide-line/60 border-t border-line/80 pt-5">
          {!current && (
            <div className="pb-4">
              <button
                type="button"
                onClick={() => setShowPrayers(false)}
                className="inline-flex items-center gap-1.5 font-sans text-xs tracking-wider text-muted hover:text-ink"
              >
                <ChevronDown size={14} className="rotate-180" aria-hidden="true" />
                Ocultar oraciones de la decena
              </button>
            </div>
          )}
          <div className="py-4 first:pt-0">
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

          <div className="mt-6 pt-5">
            <button
              type="button"
              onClick={onToggle}
              className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 font-sans text-sm tracking-wide transition-colors ${
                done
                  ? 'border-accent/50 bg-accent/15 text-accent'
                  : 'border-accent/50 text-accent hover:bg-accent/10'
              }`}
            >
              <Check size={16} strokeWidth={2} aria-hidden="true" />
              {done ? 'Misterio completado' : `Completar ${number}.º misterio`}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line/60 pt-4">
          <p className="font-serif text-sm italic text-muted">
            Padrenuestro · 10 Avemarías · Gloria · Fátima
          </p>
          <button
            type="button"
            onClick={() => setShowPrayers(true)}
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
