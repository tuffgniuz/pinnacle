import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const useToken = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return { token };
};

export default useToken;
