import { useEffect, useState } from 'react';
import { Closing } from './components/Closing';
import { Header } from './components/Header';
import { MysteryCard } from './components/MysteryCard';
import { Opening } from './components/Opening';
import { getMadridDay, getMysterySet } from './lib/date';
import { ALL_STEPS, FINAL_STEP, MYSTERY_STEPS, storageKey, purgeOtherDays } from './lib/progress';

const realNow = () => new Date();

interface Props {
  getNow?: () => Date;
}

export default function App({ getNow = realNow }: Props) {
  const [day, setDay] = useState(() => getMadridDay(getNow()));
  const [activeStep, setActiveStep] = useState<string>(() => {
    const d = getMadridDay(getNow());
    purgeOtherDays(d.key);
    try {
      const saved = localStorage.getItem(storageKey(d.key));
      if (saved && ALL_STEPS.includes(saved)) return saved;
    } catch {
      // ignorar
    }
    return ALL_STEPS[0];
  });

  // Cambio de día automático
  useEffect(() => {
    const check = () => {
      const next = getMadridDay(getNow());
      setDay((prev) => {
        if (prev.key === next.key) return prev;
        purgeOtherDays(next.key);
        setActiveStep(ALL_STEPS[0]);
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
  }, [getNow]);

  // Guarda el paso activo en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(day.key), activeStep);
    } catch {
      // ignorar
    }
  }, [day.key, activeStep]);

  // Al hacer scroll, ilumina automáticamente el bloque que está en la zona de lectura
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
        // Si la línea de enfoque cae dentro del bloque, es el activo
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

  const set = getMysterySet(day.weekday);

  return (
    <main className="mx-auto w-full max-w-[38rem] px-5 pb-24 pt-8 sm:px-6 sm:pt-12">
      <Header dayLabel={day.label} setTitle={set.title} />

      <Opening activeStep={activeStep} onSelect={setActiveStep} />

      <section aria-labelledby="misterios" className="mt-12">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-line/70" />
          <h2
            id="misterios"
            className="font-sans text-[0.65rem] uppercase tracking-[0.32em] text-accent"
          >
            Los cinco misterios
          </h2>
          <span className="h-px flex-1 bg-line/70" />
        </div>

        <div className="mt-5 space-y-4">
          {set.mysteries.map((m, i) => {
            const step = MYSTERY_STEPS[i];
            return (
              <MysteryCard
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

      <Closing
        step={FINAL_STEP}
        active={activeStep === FINAL_STEP}
        onSelect={() => setActiveStep(FINAL_STEP)}
      />
    </main>
  );
}
