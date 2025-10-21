import { atom } from "recoil";

export const videoState = atom({
  key: "videoState",
  default: false,
});
export const movieState = atom({
  key: "movieState",
  default: null,
});
export const subscriptionState = atom({
  key: "subscriptionState",
  default: "",
});
