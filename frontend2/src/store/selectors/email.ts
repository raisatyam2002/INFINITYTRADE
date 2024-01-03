import { Userstate } from "../atoms/userState";
import { selector } from "recoil";

export const EmailSelector = selector({
  key: "emailSelector",
  get: ({ get }) => {
    const { email } = get(Userstate);
    return email;
  },
});
