import { describe, expect, it } from 'vitest';
import { getMadridDay, getMysterySet } from '../lib/date';
import { MYSTERY_SETS } from '../data/mysteries';
import { PRAYERS } from '../data/prayers';

// 2026-11-02 es lunes.
const week = [
  ['2026-11-02T12:00:00+01:00', 'Lunes', 'gozosos'],
  ['2026-11-03T12:00:00+01:00', 'Martes', 'dolorosos'],
  ['2026-11-04T12:00:00+01:00', 'Miércoles', 'gloriosos'],
  ['2026-11-05T12:00:00+01:00', 'Jueves', 'luminosos'],
  ['2026-11-06T12:00:00+01:00', 'Viernes', 'dolorosos'],
  ['2026-11-07T12:00:00+01:00', 'Sábado', 'gozosos'],
  ['2026-11-08T12:00:00+01:00', 'Domingo', 'gloriosos'],
] as const;

describe('misterios por día', () => {
  it.each(week)('%s (%s) → %s', (iso, dayName, setId) => {
    const day = getMadridDay(new Date(iso));
    expect(day.label.startsWith(dayName)).toBe(true);
    expect(getMysterySet(day.weekday).id).toBe(setId);
  });

  it('formatea la fecha como «Miércoles, 4 de noviembre»', () => {
    expect(getMadridDay(new Date('2026-11-04T12:00:00+01:00')).label).toBe(
      'Miércoles, 4 de noviembre',
    );
  });

  it('usa la zona Europe/Madrid, no la del dispositivo', () => {
    // 23:30 UTC del 4 nov = 00:30 del 5 nov en Madrid (jueves).
    const d = getMadridDay(new Date('2026-11-04T23:30:00Z'));
    expect(d.key).toBe('2026-11-05');
    expect(getMysterySet(d.weekday).id).toBe('luminosos');
    // Verano (CEST): 22:30 UTC = 00:30 del día siguiente.
    expect(getMadridDay(new Date('2026-07-14T22:30:00Z')).key).toBe('2026-07-15');
  });
});

describe('contenido', () => {
  it('hay 4 series de 5 misterios con reflexión y pregunta únicas', () => {
    const all = Object.values(MYSTERY_SETS).flatMap((s) => s.mysteries);
    expect(Object.keys(MYSTERY_SETS)).toHaveLength(4);
    Object.values(MYSTERY_SETS).forEach((s) => expect(s.mysteries).toHaveLength(5));
    expect(new Set(all.map((m) => m.reflection)).size).toBe(20);
    expect(new Set(all.map((m) => m.question)).size).toBe(20);
    all.forEach((m) => {
      const sentences = m.reflection.split(/(?<=[.!?»])\s+/).length;
      expect(sentences).toBeLessThanOrEqual(3);
    });
  });

  it('los nombres de los misterios coinciden con el enunciado', () => {
    const names = (id: keyof typeof MYSTERY_SETS) => MYSTERY_SETS[id].mysteries.map((m) => m.name);
    expect(names('gozosos')).toEqual([
      'La Anunciación del ángel a María',
      'La Visitación de María a Isabel',
      'El nacimiento de Jesús',
      'La presentación de Jesús en el templo',
      'El Niño Jesús perdido y hallado en el templo',
    ]);
    expect(names('dolorosos')).toEqual([
      'La oración de Jesús en el huerto de Getsemaní',
      'La flagelación de Jesús',
      'La coronación de espinas',
      'Jesús con la cruz a cuestas',
      'La crucifixión y muerte de Jesús',
    ]);
    expect(names('gloriosos')).toEqual([
      'La Resurrección de Jesús',
      'La Ascensión de Jesús al cielo',
      'La venida del Espíritu Santo',
      'La Asunción de María',
      'La Coronación de María',
    ]);
    expect(names('luminosos')).toEqual([
      'El Bautismo de Jesús en el Jordán',
      'Las bodas de Caná',
      'El anuncio del Reino de Dios y la invitación a la conversión',
      'La Transfiguración',
      'La institución de la Eucaristía',
    ]);
  });

  it('las oraciones tienen los párrafos esperados y terminan bien', () => {
    const counts = { senal: 2, credo: 4, padrenuestro: 2, avemaria: 3, gloria: 2, fatima: 1, salve: 5, oracionFinal: 1 };
    for (const [id, n] of Object.entries(counts)) {
      expect(PRAYERS[id as keyof typeof PRAYERS].paragraphs).toHaveLength(n);
    }
    expect(PRAYERS.credo.paragraphs[3]).toMatch(/vida eterna\. Amén\.$/);
    expect(PRAYERS.avemaria.paragraphs[0]).toBe('Dios te salve, María, llena eres de gracia, el Señor es contigo.');
    expect(PRAYERS.salve.paragraphs[3]).toBe('¡Oh clementísima, oh piadosa, oh dulce siempre Virgen María!');
  });
});
