import { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isLoggedInAtom,
  isUserLoadingAtom,
  userAtom,
  userIdAtom,
  userRoleAtom,
} from "@/atoms/userData";

const useUserData = () => {
  const setUserRole = useSetRecoilState(userRoleAtom);
  const setUserId = useSetRecoilState(userIdAtom);
  const setIsUserLoading = useSetRecoilState(isUserLoadingAtom);
  const setUser = useSetRecoilState(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  const fetchUser = async () => {
    setIsUserLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
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
      setUser({});
      return;
    }
    fetchUser();
  }, [isLoggedIn]);
};

export default useUserData;
