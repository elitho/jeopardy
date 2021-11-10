import { atom } from 'recoil';

export const turn = atom({
  key: 'turn',
  default: 1,
});

// number of teams needs to be dynamic at some point
export const score = atom({
  key: 'score',
  default: [0,0,0,0] as Array<number>,
});