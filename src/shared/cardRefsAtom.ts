import { atom } from "recoil";

export const cardRefsArray = atom({
  key: 'cardRefsArray',
  default: [] as Array<HTMLDivElement | null>,
});