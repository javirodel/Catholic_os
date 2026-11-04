import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { storageKey } from '../lib/progress';

const WED = '2026-11-04T20:00:00+01:00';
const THU = '2026-11-05T09:00:00+01:00';

function setup(initial = WED) {
  let now = new Date(initial);
  const view = render(<App getNow={() => now} />);
  return {
    ...view,
    setNow(iso: string) {
      now = new Date(iso);
    },
  };
}

const progressText = () => screen.getByText(/^Progreso:/).textContent;

describe('App', () => {
  it('muestra cabecera, misterios del día y progreso 0 de 11', () => {
    setup();
    expect(screen.getByText('Mi Rosario')).toBeTruthy();
    expect(screen.getByText('Miércoles, 4 de noviembre')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Misterios gloriosos');
    expect(progressText()).toBe('Progreso: 0 de 11 pasos');
  });

  it('muestra el Rosario en orden: inicio → 5 misterios → final', () => {
    setup();
    const order = screen
      .getAllByRole('heading', { level: 2 })
      .concat(screen.getAllByRole('heading', { level: 3 }))
      .map((h) => h.textContent);
    expect(order[0]).toBe('Inicio del Rosario');
    const titles = screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent);
    expect(titles.slice(0, 5)).toEqual([
      'Señal de la cruz',
      'Credo de los Apóstoles',
      'Padrenuestro',
      'Tres Avemarías',
      'Gloria',
    ]);
    // 5 misterios × 4 oraciones, después Salve, Oración final y Señal de la cruz.
    expect(titles).toHaveLength(5 + 20 + 3);
    expect(titles.slice(-3)).toEqual(['Salve', 'Oración final', 'Señal de la cruz']);
    expect(screen.getAllByText('Se reza diez veces')).toHaveLength(5);
    expect(screen.getAllByText('Opcional')).toHaveLength(5);
  });

  it('marca pasos, destaca la decena actual y persiste tras reabrir', async () => {
    const user = userEvent.setup();
    const first = setup();
    await user.click(screen.getByRole('checkbox', { name: /Credo/ }));
    await user.click(screen.getByRole('checkbox', { name: /1\.º misterio/ }));
    expect(progressText()).toBe('Progreso: 2 de 11 pasos');

    const cards = screen.getAllByRole('article').filter((a) => a.hasAttribute('data-current'));
    expect(cards.map((c) => c.getAttribute('data-current'))).toEqual(['false', 'true', 'false', 'false', 'false']);

    expect(JSON.parse(localStorage.getItem(storageKey('2026-11-04'))!)).toEqual([
      'inicio-credo',
      'misterio-1',
    ]);

    first.unmount();
    setup();
    expect(progressText()).toBe('Progreso: 2 de 11 pasos');
  });

  it('un nuevo día empieza limpio y no conserva historial', async () => {
    const user = userEvent.setup();
    const app = setup();
    await user.click(screen.getByRole('checkbox', { name: /Credo/ }));
    app.unmount();

    setup(THU);
    expect(progressText()).toBe('Progreso: 0 de 11 pasos');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Misterios luminosos');
    expect(localStorage.getItem(storageKey('2026-11-04'))).toBeNull();
  });

  it('cambia de día con la app abierta (medianoche de Madrid)', async () => {
    const user = userEvent.setup();
    const app = setup('2026-11-04T23:55:00+01:00');
    await user.click(screen.getByRole('checkbox', { name: /Credo/ }));
    app.setNow('2026-11-05T00:05:00+01:00');
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(progressText()).toBe('Progreso: 0 de 11 pasos');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Misterios luminosos');
  });

  it('completa los 11 pasos y puede reiniciarse con confirmación', async () => {
    const user = userEvent.setup();
    setup();
    for (const box of screen.getAllByRole('checkbox')) await user.click(box);
    expect(progressText()).toBe('Progreso: 11 de 11 pasos');

    await user.click(screen.getByRole('button', { name: /Reiniciar el Rosario/ }));
    // Cancelar no borra.
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(progressText()).toBe('Progreso: 11 de 11 pasos');

    await user.click(screen.getByRole('button', { name: /Reiniciar el Rosario/ }));
    const dialog = screen.getByRole('alertdialog');
    await user.click(within(dialog).getByRole('button', { name: 'Sí, reiniciar' }));
    expect(progressText()).toBe('Progreso: 0 de 11 pasos');
    expect(localStorage.getItem(storageKey('2026-11-04'))).toBeNull();
  });

  it('ignora datos corruptos en localStorage', () => {
    localStorage.setItem(storageKey('2026-11-04'), '{no-json');
    setup();
    expect(progressText()).toBe('Progreso: 0 de 11 pasos');
  });

  it('no hace peticiones de red', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    setup();
    expect(fetchSpy).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
