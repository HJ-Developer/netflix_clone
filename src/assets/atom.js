import { atom } from "recoil";

export const videoState = atom({
  key: "videoState",
  default: false,
});
export const movieState = atom({
  key: "movieState",
  default: null,
});
