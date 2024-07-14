import { atom } from "recoil";

export const userRoleAtom = atom({
  key: "userRole",
  default: "",
});

export const userIdAtom = atom({
  key: "userId",
  default: "",
});

export const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: !!localStorage.getItem("token"),
});

export const isUserLoadingAtom = atom({
  key: "isUserLoading",
  default: false,
});
