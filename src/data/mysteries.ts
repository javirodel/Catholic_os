export type MysterySetId = 'gozosos' | 'dolorosos' | 'gloriosos' | 'luminosos';

export interface Mystery {
  name: string;
  /** Referencia bíblica del episodio, cuando existe un pasaje directo. */
  reference?: string;
  /** Reflexión breve (1–3 frases). */
  reflection: string;
  /** Pregunta personal opcional. */
  question: string;
}

export interface MysterySet {
  id: MysterySetId;
  title: string;
  mysteries: Mystery[]; // siempre 5
}

export const MYSTERY_SETS: Record<MysterySetId, MysterySet> = {
  gozosos: {
    id: 'gozosos',
    title: 'Misterios gozosos',
    mysteries: [
      {
        name: 'La Anunciación del ángel a María',
        reference: 'Lc 1, 26-38',
        reflection:
          'María recibe una noticia que no entiende del todo, y responde con confianza. Su «sí» abre la puerta a Dios en la vida cotidiana.',
        question: '¿A qué me está invitando Dios hoy, y qué me cuesta responderle?',
      },
      {
        name: 'La Visitación de María a Isabel',
        reference: 'Lc 1, 39-56',
        reflection:
          'Apenas ha recibido la noticia, María sale deprisa a servir a su prima. Quien lleva a Jesús en el corazón no puede quedarse quieto: se pone en camino hacia los demás.',
        question: '¿A quién podría visitar o ayudar esta semana?',
      },
      {
        name: 'El nacimiento de Jesús',
        reference: 'Lc 2, 1-20',
        reflection:
          'Dios llega pequeño, pobre y sin ruido, en un establo. Los sencillos lo reconocen porque tienen el corazón abierto.',
        question: '¿Dónde busco a Dios con demasiado ruido y poca sencillez?',
      },
      {
        name: 'La presentación de Jesús en el templo',
        reference: 'Lc 2, 22-40',
        reflection:
          'María y José ofrecen a Dios lo más querido que tienen. Simeón y Ana, tras una larga espera, reconocen al Salvador en un niño.',
        question: '¿Qué puedo poner hoy en manos de Dios con confianza?',
      },
      {
        name: 'El Niño Jesús perdido y hallado en el templo',
        reference: 'Lc 2, 41-52',
        reflection:
          'María y José buscan con angustia a Jesús y lo encuentran en la casa del Padre. A veces Dios parece ausente y la búsqueda perseverante es ya una forma de oración.',
        question: '¿Qué lugar ocupa Jesús en mi día a día?',
      },
    ],
  },
  dolorosos: {
    id: 'dolorosos',
    title: 'Misterios dolorosos',
    mysteries: [
      {
        name: 'La oración de Jesús en el huerto de Getsemaní',
        reference: 'Mt 26, 36-46',
        reflection:
          'Jesús conoce la angustia y la soledad, y se abandona en la voluntad del Padre. Sus amigos duermen, pero Él no deja de orar.',
        question: '¿Qué carga necesito poner hoy ante Dios con total sinceridad?',
      },
      {
        name: 'La flagelación de Jesús',
        reference: 'Jn 19, 1',
        reflection:
          'El Inocente soporta el sufrimiento sin devolver violencia. Contemplarlo nos enseña a mirar con compasión a quienes sufren.',
        question: '¿Qué dolor ajeno estoy pasando por alto?',
      },
      {
        name: 'La coronación de espinas',
        reference: 'Mt 27, 27-31',
        reflection:
          'Se burlan de Jesús como rey, sin saber que lo es. Su reinado no se impone: se entrega con humildad y mansedumbre.',
        question: '¿Dónde me cuesta aceptar la humillación o la incomprensión?',
      },
      {
        name: 'Jesús con la cruz a cuestas',
        reference: 'Lc 23, 26-32',
        reflection:
          'Jesús carga con la cruz hacia el Calvario, y un desconocido, Simón de Cirene, le ayuda. Seguir a Cristo es llevar la propia cruz y también ayudar a llevar la de otros.',
        question: '¿Qué cruz me pesa hoy y quién puede ayudarme a llevarla?',
      },
      {
        name: 'La crucifixión y muerte de Jesús',
        reference: 'Lc 23, 33-46',
        reflection:
          'Desde la cruz Jesús perdona y se entrega al Padre. Su amor llega hasta el final y no deja fuera a nadie.',
        question: '¿A quién necesito perdonar, o de quién necesito pedir perdón?',
      },
    ],
  },
  gloriosos: {
    id: 'gloriosos',
    title: 'Misterios gloriosos',
    mysteries: [
      {
        name: 'La Resurrección de Jesús',
        reference: 'Jn 20, 1-18',
        reflection:
          'La tumba vacía cambia el llanto en alegría: la muerte no tiene la última palabra. Cristo vive y camina a nuestro lado.',
        question: '¿Qué situación mía necesita la luz de la esperanza pascual?',
      },
      {
        name: 'La Ascensión de Jesús al cielo',
        reference: 'Hch 1, 6-11',
        reflection:
          'Jesús vuelve al Padre y confía su misión a los discípulos. No nos deja solos: nos abre el camino al cielo y nos envía a vivir con los pies en la tierra.',
        question: '¿Cómo puedo ser hoy testigo suyo allí donde estoy?',
      },
      {
        name: 'La venida del Espíritu Santo',
        reference: 'Hch 2, 1-13',
        reflection:
          'Los discípulos, encerrados por el miedo, reciben el Espíritu y salen a anunciar. Él da valor, unidad y luz para lo que no sabemos hacer solos.',
        question: '¿Qué miedo me frena y qué necesito pedirle al Espíritu?',
      },
      {
        name: 'La Asunción de María',
        reflection:
          'La Iglesia cree que María, al terminar su vida, fue llevada en cuerpo y alma a la gloria de Dios. Es la primera en alcanzar lo que a todos nos espera.',
        question: '¿Vivo con la mirada puesta en el cielo al que estoy llamado?',
      },
      {
        name: 'La Coronación de María',
        reflection:
          'La Iglesia contempla a María junto a su Hijo, asociada a su gloria como Madre y Reina de misericordia. Quien se fio de Dios hasta la cruz participa de su alegría.',
        question: '¿Qué pido hoy a María para mí y para quienes quiero?',
      },
    ],
  },
  luminosos: {
    id: 'luminosos',
    title: 'Misterios luminosos',
    mysteries: [
      {
        name: 'El Bautismo de Jesús en el Jordán',
        reference: 'Mt 3, 13-17',
        reflection:
          'Jesús se mezcla con los pecadores y el Padre lo proclama su Hijo amado. Por el bautismo también yo soy hijo de Dios.',
        question: '¿Vivo como hijo amado del Padre o como quien tiene que ganarse su cariño?',
      },
      {
        name: 'Las bodas de Caná',
        reference: 'Jn 2, 1-12',
        reflection:
          'María advierte la necesidad de los novios y se la presenta a su Hijo. Su consejo sigue siendo el mismo: hacer lo que Él nos diga.',
        question: '¿Qué necesidad concreta puedo presentarle hoy a Jesús por medio de María?',
      },
      {
        name: 'El anuncio del Reino de Dios y la invitación a la conversión',
        reference: 'Mc 1, 14-15',
        reflection:
          'Jesús anuncia que Dios está cerca e invita a volver a Él y a creer en la Buena Noticia. La conversión empieza con un paso pequeño y sincero.',
        question: '¿Qué pequeño cambio me pide Dios en esta etapa de mi vida?',
      },
      {
        name: 'La Transfiguración',
        reference: 'Lc 9, 28-36',
        reflection:
          'En la montaña, los discípulos ven por un instante la gloria de Jesús. Esa luz les sostendrá cuando llegue la oscuridad de la cruz.',
        question: '¿Qué momentos de luz recuerdo para sostenerme en los días difíciles?',
      },
      {
        name: 'La institución de la Eucaristía',
        reference: 'Lc 22, 14-20',
        reflection:
          'En la última cena Jesús se queda con nosotros bajo el signo del pan y del vino. Se hace alimento para que aprendamos a entregarnos como Él.',
        question: '¿Cómo puedo vivir con más agradecimiento y atención la Eucaristía?',
      },
    ],
  },
};
