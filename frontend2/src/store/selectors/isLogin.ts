import { selector } from "recoil";
import { Userstate } from "../atoms/userState";

export const isLoginSelector = selector({
  key: "isLoginSelector",
  get: ({ get }) => {
    const { isLogin } = get(Userstate);
    return isLogin;
  },
});
