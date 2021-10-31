import { atom } from "recoil";

export const cardRefsArray = atom({
  key: 'cardRefsArray',
  default: [] as Array<HTMLDivElement | null>,
});

export const anyQuestionActive = atom({
  key: 'anyQuestionActive',
  default: false,
});

export const closeAll = atom({
  key: 'closeAll',
  default: false,
});