import { useEffect, useState } from 'react';
import { getTodayRosary, PRAYERS, type Mystery, type Prayer } from './rosary';

const STORAGE_PREFIX = 'catholic-os:rosario:';
const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

const INITIAL_ITEMS = [
  { step: 'inicio-senal', prayer: PRAYERS.senal, note: undefined },
  { step: 'inicio-credo', prayer: PRAYERS.credo, note: undefined },
  { step: 'inicio-padrenuestro', prayer: PRAYERS.padrenuestro, note: undefined },
  {
    step: 'inicio-avemarias',
    prayer: { ...PRAYERS.avemaria, title: 'Tres Avemarías' },
    note: 'Tres veces',
  },
  { step: 'inicio-gloria', prayer: PRAYERS.gloria, note: undefined },
] as const;

function purgeOtherDays(dayKey: string): void {
  try {
    const keep = `${STORAGE_PREFIX}${dayKey}`;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX) && k !== keep) localStorage.removeItem(k);
    }
  } catch {
    // ignorar
  }
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-line/70" />
      <h2 id={id} className="font-sans text-[0.65rem] uppercase tracking-[0.32em] text-accent">
        {children}
      </h2>
      <span className="h-px flex-1 bg-line/70" />
    </div>
  );
}

function PrayerBlock({
  prayer,
  note,
  compact = false,
}: {
  prayer: Prayer;
  note?: string;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <h4
          className={`font-serif font-normal tracking-wide text-accent ${
            compact ? 'text-[1.05rem]' : 'text-[1.15rem]'
          }`}
        >
          {prayer.title}
        </h4>
        {note && <span className="font-serif text-sm italic text-muted">· {note}</span>}
      </div>
      <div className="mt-2.5 space-y-3.5 text-[1.125rem] leading-[1.82] text-ink">
        {prayer.paragraphs.map((p) => (
          <p key={p} className="[overflow-wrap:anywhere]">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function MysteryItem({
  step,
  number,
  mystery,
  active,
  onSelect,
}: {
  step: string;
  number: number;
  mystery: Mystery;
  active: boolean;
  onSelect: () => void;
}) {
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

      <div className="mt-4 border-l border-accent/40 pl-4">
        <p className="font-serif text-[1.1rem] italic leading-[1.78] text-ink/90">
          {mystery.reflection}
        </p>
        <p className="mt-2.5 text-[1rem] leading-relaxed text-muted">{mystery.question}</p>
      </div>

      {showPrayers ? (
        <div className="mt-5 divide-y divide-line/60 border-t border-line/75 pt-4">
          <div className="pb-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrayers(false);
              }}
              className="font-sans text-xs tracking-wider text-muted hover:text-ink"
            >
              Ocultar oraciones ↑
            </button>
          </div>
          <div className="py-4">
            <PrayerBlock prayer={PRAYERS.padrenuestro} compact />
          </div>
          <div className="py-4">
            <PrayerBlock prayer={PRAYERS.avemaria} note="Se repite diez veces" compact />
          </div>
          <div className="py-4">
            <PrayerBlock prayer={PRAYERS.gloria} compact />
          </div>
          <div className="pt-4">
            <PrayerBlock prayer={PRAYERS.fatima} note="Opcional" compact />
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
            className="shrink-0 font-sans text-xs tracking-wider text-accent hover:underline"
          >
            Ver oraciones ↓
          </button>
        </div>
      )}
    </article>
  );
}

export default function App() {
  const [today, setToday] = useState(() => getTodayRosary());
  const [activeStep, setActiveStep] = useState<string>(() => {
    const d = getTodayRosary();
    purgeOtherDays(d.key);
    try {
      return localStorage.getItem(`${STORAGE_PREFIX}${d.key}`) || 'inicio-senal';
    } catch {
      return 'inicio-senal';
    }
  });

  useEffect(() => {
    const check = () => {
      const next = getTodayRosary();
      setToday((prev) => {
        if (prev.key === next.key) return prev;
        purgeOtherDays(next.key);
        setActiveStep('inicio-senal');
        return next;
      });
    };
    const id = window.setInterval(check, 60_000);
    document.addEventListener('visibilitychange', check);
    window.addEventListener('focus', check);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', check);
      window.removeEventListener('focus', check);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${today.key}`, activeStep);
    } catch {
      // ignorar
    }
  }, [today.key, activeStep]);

  useEffect(() => {
    let ticking = false;
    const updateOnScroll = () => {
      ticking = false;
      const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-step]'));
      if (blocks.length === 0) return;

      const focusY = window.innerHeight * 0.36;
      let best = blocks[0];
      let bestDist = Infinity;

      for (const el of blocks) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= focusY && rect.bottom >= focusY) {
          best = el;
          break;
        }
        const dist = Math.min(Math.abs(rect.top - focusY), Math.abs(rect.bottom - focusY));
        if (dist < bestDist) {
          bestDist = dist;
          best = el;
        }
      }

      const step = best.dataset.step;
      if (step) setActiveStep(step);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="mx-auto w-full max-w-[38rem] px-5 pb-24 pt-8 sm:px-6 sm:pt-12">
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

        <p className="font-serif text-[0.95rem] italic text-muted">{today.label}</p>
        <h1 className="mt-1 font-serif text-[1.15rem] font-normal tracking-wide text-ink">
          {today.set.title}
        </h1>
      </header>

      <section aria-labelledby="inicio" className="mt-10">
        <SectionTitle id="inicio">Oraciones iniciales</SectionTitle>
        <div className="mt-5 space-y-3.5">
          {INITIAL_ITEMS.map(({ step, prayer, note }) => {
            const isActive = activeStep === step;
            return (
              <article
                key={step}
                data-step={step}
                data-active={isActive}
                onClick={() => setActiveStep(step)}
                className={`rounded-xl border px-5 py-5 transition-colors duration-300 sm:px-7 sm:py-6 ${
                  isActive ? 'border-accent/65 bg-elevated' : 'border-line/70 bg-surface'
                }`}
              >
                <PrayerBlock prayer={prayer} note={note} />
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="misterios" className="mt-12">
        <SectionTitle id="misterios">Los cinco misterios</SectionTitle>
        <div className="mt-5 space-y-4">
          {today.set.mysteries.map((m, i) => {
            const step = `misterio-${i + 1}`;
            return (
              <MysteryItem
                key={m.name}
                step={step}
                number={i + 1}
                mystery={m}
                active={activeStep === step}
                onSelect={() => setActiveStep(step)}
              />
            );
          })}
        </div>
      </section>

      <section aria-labelledby="final" className="mt-12">
        <SectionTitle id="final">Oraciones finales</SectionTitle>
        <article
          data-step="final"
          data-active={activeStep === 'final'}
          onClick={() => setActiveStep('final')}
          className={`mt-5 divide-y divide-line/60 rounded-xl border px-5 transition-colors duration-300 sm:px-7 ${
            activeStep === 'final' ? 'border-accent/65 bg-elevated' : 'border-line/70 bg-surface'
          }`}
        >
          <div className="py-5">
            <PrayerBlock prayer={PRAYERS.salve} />
          </div>
          <div className="py-5">
            <PrayerBlock prayer={PRAYERS.oracionFinal} />
          </div>
          <div className="py-5">
            <PrayerBlock prayer={PRAYERS.senal} />
          </div>
        </article>
      </section>
    </main>
  );
}
