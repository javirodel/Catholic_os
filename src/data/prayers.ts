export type PrayerId =
  | 'senal'
  | 'credo'
  | 'padrenuestro'
  | 'avemaria'
  | 'gloria'
  | 'fatima'
  | 'salve'
  | 'oracionFinal';

export interface Prayer {
  id: PrayerId;
  title: string;
  /** Cada elemento es un párrafo. */
  paragraphs: string[];
}

export const PRAYERS: Record<PrayerId, Prayer> = {
  senal: {
    id: 'senal',
    title: 'Señal de la cruz',
    paragraphs: [
      'Por la señal de la Santa Cruz, de nuestros enemigos líbranos, Señor, Dios nuestro.',
      'En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.',
    ],
  },
  credo: {
    id: 'credo',
    title: 'Credo de los Apóstoles',
    paragraphs: [
      'Creo en Dios, Padre todopoderoso, creador del cielo y de la tierra.',
      'Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso.',
      'Desde allí ha de venir a juzgar a vivos y muertos.',
      'Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.',
    ],
  },
  padrenuestro: {
    id: 'padrenuestro',
    title: 'Padrenuestro',
    paragraphs: [
      'Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.',
      'Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación y líbranos del mal. Amén.',
    ],
  },
  avemaria: {
    id: 'avemaria',
    title: 'Avemaría',
    paragraphs: [
      'Dios te salve, María, llena eres de gracia, el Señor es contigo.',
      'Bendita tú eres entre todas las mujeres y bendito es el fruto de tu vientre, Jesús.',
      'Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.',
    ],
  },
  gloria: {
    id: 'gloria',
    title: 'Gloria',
    paragraphs: [
      'Gloria al Padre, y al Hijo, y al Espíritu Santo.',
      'Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.',
    ],
  },
  fatima: {
    id: 'fatima',
    title: 'Oración de Fátima',
    paragraphs: [
      'Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia. Amén.',
    ],
  },
  salve: {
    id: 'salve',
    title: 'Salve',
    paragraphs: [
      'Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve.',
      'A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas.',
      'Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre.',
      '¡Oh clementísima, oh piadosa, oh dulce siempre Virgen María!',
      'Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén.',
    ],
  },
  oracionFinal: {
    id: 'oracionFinal',
    title: 'Oración final',
    paragraphs: [
      'Oh Dios, cuyo Hijo unigénito, con su vida, muerte y resurrección, nos alcanzó los premios de la vida eterna, concédenos a los que meditamos los misterios del Santísimo Rosario de la bienaventurada Virgen María, imitar lo que contienen y alcanzar lo que prometen. Por Jesucristo nuestro Señor. Amén.',
    ],
  },
};
