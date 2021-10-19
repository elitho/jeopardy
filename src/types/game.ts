export enum Entity {
  SLURKER = 'Slurker',
  SLURK = 'Slurk',
  POENG = 'Poeng'
}

export type Points = Entity.SLURKER | Entity.SLURK | Entity.POENG

export type Question = {
  value: number,
  entity: Points,
  question: string,
  answer: string
}

export type Category = {
  name: string,
  questions: Question[]
}