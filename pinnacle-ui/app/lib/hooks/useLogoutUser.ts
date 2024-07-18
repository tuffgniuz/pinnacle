import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../stores/store";
import { logout, selectToken } from "../stores/authSlice";
import { logoutUser } from "../actions";

const useLogoutUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => selectToken(state));

  console.log(token);

  const handleLogout = useCallback(async () => {
    if (!token) {
      console.error("No token found for logout");
      return;
    }
    try {
      await logoutUser(token);
      dispatch(logout());
    } catch (error) {
      console.error("Failed to logout: ", error);
    }
  }, [token, dispatch]);
  return { handleLogout };
};

export default useLogoutUser;
