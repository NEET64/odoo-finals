import { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isLoggedInAtom,
  isUserLoadingAtom,
  userIdAtom,
  userRoleAtom,
} from "@/atoms/userData";

const useUserData = () => {
  const setUserRole = useSetRecoilState(userRoleAtom);
  const setUserId = useSetRecoilState(userIdAtom);
  const setIsUserLoading = useSetRecoilState(isUserLoadingAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  const fetchUser = async () => {
    setIsUserLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserRole(response.data.user.role);
        setUserId(response.data.user._id);
        setIsLoggedIn(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsUserLoading(false));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setUserRole("");
      setUserId("");
      return;
    }
    fetchUser();
  }, [isLoggedIn]);
};

export default useUserData;
