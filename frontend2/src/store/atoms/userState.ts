import { atom } from "recoil";

export const Userstate = atom({
  key: "userState",
  default: {
    email: "",
    isLogin: false,
  },
});
