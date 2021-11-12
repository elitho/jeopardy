import { Category, Entity, Question } from 'types';

const gobQuestion1 = {
  value: 1,
  entity: Entity.SLURK,
  question: 'Hvilken type nøtter blir brukt i marsipan?',
  answer: 'Mandel'
}
const gobQuestion2 = {
  value: 2,
  entity: Entity.SLURKER,
  question: 'Hvilken farge er giraffens tunge?',
  answer: 'Svart'
}
const gobQuestion3 = {
  value: 3,
  entity: Entity.SLURKER,
  question: 'Hvilket dyr lager man roquefort ost av?',
  answer: 'Sau'
}
const gobQuestion4 = {
  value: 5,
  entity: Entity.SLURKER,
  question: 'Hva heter den største innsjøen i Nord Amerika?',
  answer: 'Lake Superior'
}
const gobQuestion5 = {
  value: 8,
  entity: Entity.SLURKER,
  question: 'Hvor mange guder er det i Buddhismen?',
  answer: 'Ingen'
}

const gobQuestionArray: Array<Question> = [gobQuestion5, gobQuestion4, gobQuestion3, gobQuestion2, gobQuestion1];

const musicQuestion1 = {
  value: 1,
  entity: Entity.SLURK,
  question: 'Fullfør teksten… “If you wanna be…”',
  answer: 'My lover'
}
const musicQuestion2 = {
  value: 2,
  entity: Entity.SLURKER,
  question: 'Hvem kom ut med sangene “In the End” og “Numb”?',
  answer: 'Linkin Park'
}
const musicQuestion3 = {
  value: 3,
  entity: Entity.SLURKER,
  question: 'Hvilken artist kom ut med The Fame i 2008?',
  answer: 'Lady Gaga'
}
const musicQuestion4 = {
  value: 5,
  entity: Entity.SLURKER,
  question: 'Hvilket år ble MC Hammers megahit “You Can’t Touch This” utgitt?',
  answer: '1990'
}
const musicQuestion5 = {
  value: 8,
  entity: Entity.SLURKER,
  question: 'Hvem ble skutt av Mark David Chapman?',
  answer: 'John Lennon'
}

const musicQuestionArray: Array<Question> = [musicQuestion5, musicQuestion4, musicQuestion3, musicQuestion2, musicQuestion1];

const geoQuestion1 = {
  value: 1,
  entity: Entity.SLURK,
  question: 'Hva het superkontinentet som vi hadde for 200 million år siden?',
  answer: 'Pangea'
}
const geoQuestion2 = {
  value: 2,
  entity: Entity.SLURKER,
  question: 'Hva er det minste landet i verden?',
  answer: 'Vatikanstaten'
}
const geoQuestion3 = {
  value: 3,
  entity: Entity.SLURKER,
  question: 'I hvilket land startet man å dyrke bananer?',
  answer: 'India'
}
const geoQuestion4 = {
  value: 5,
  entity: Entity.SLURKER,
  question: 'Hvor i verden regner det mest årlig?',
  answer: 'Hawaii, det regner i gjennomsnitt 1140 cm per år.'
}
const geoQuestion5 = {
  value: 8,
  entity: Entity.SLURKER,
  question: 'Hvilken hovedstad ligger høyest over havet i verden?',
  answer: 'La Paz i Bolivia som ligger 3600 meter over havet.'
}

const geoQuestionArray: Array<Question> = [geoQuestion5, geoQuestion4, geoQuestion3, geoQuestion2, geoQuestion1];

const sportQuestion1 = {
  value: 1,
  entity: Entity.SLURK,
  question: 'Hvilken sport hører Stanley Cup til?',
  answer: 'Ishockey'
}
const sportQuestion2 = {
  value: 2,
  entity: Entity.SLURKER,
  question: 'Hva kalles lagkapteinen på et curling-lag?',
  answer: 'Skip'
}
const sportQuestion3 = {
  value: 3,
  entity: Entity.SLURKER,
  question: 'Hvilken idrettsutøver var den første til å vinne fem Wimbledon titler på rad?',
  answer: 'Bjørn Borg'
}
const sportQuestion4 = {
  value: 5,
  entity: Entity.SLURKER,
  question: 'Hvilken sport er den eneste som har blitt spilt på månen?',
  answer: 'Golf, Astronaut Alan Shepherd slo to golfballer i 1971 for å se hvor langt de kunne fly.'
}
const sportQuestion5 = {
  value: 8,
  entity: Entity.SLURKER,
  question: 'Hva er den høyeste poengsummen du kan få i bowling?',
  answer: '300 poeng'
}

const sportQuestionArray: Array<Question> = [sportQuestion5, sportQuestion4, sportQuestion3, sportQuestion2, sportQuestion1];

const histQuestion1 = {
  value: 1,
  entity: Entity.SLURK,
  question: 'Hva kalte vikingene Istanbul/Konstantinopel?',
  answer: 'Miklagard'
}
const histQuestion2 = {
  value: 2,
  entity: Entity.SLURKER,
  question: 'Hvilken by kalles "Den evige stad"?',
  answer: 'Roma'
}
const histQuestion3 = {
  value: 3,
  entity: Entity.SLURKER,
  question: 'I hvilket land ble Rosekrigene utkjempet?',
  answer: 'England'
}
const histQuestion4 = {
  value: 5,
  entity: Entity.SLURKER,
  question: 'Hvem fant sjøveien til Kina?',
  answer: 'Vasco da Game'
}
const histQuestion5 = {
  value: 8,
  entity: Entity.SLURKER,
  question: 'Hvilken nordmann kalles "Grunnlovens far"?',
  answer: 'Christian Magnus Falsen'
}

const histQuestionArray: Array<Question> = [histQuestion5, histQuestion4, histQuestion3, histQuestion2, histQuestion1];

const category1 = {
  name: 'Godt og blandet',
  questions: gobQuestionArray
}
const category2 = {
  name: 'Musikk',
  questions: musicQuestionArray
}
const category3 = {
  name: 'Geografi',
  questions: geoQuestionArray
}
const category4 = {
  name: 'Sport',
  questions: sportQuestionArray
}
const category5 = {
  name: 'Historie',
  questions: histQuestionArray
}

export const testGameObject: Array<Category> = [category1, category2, category3, category4, category5];