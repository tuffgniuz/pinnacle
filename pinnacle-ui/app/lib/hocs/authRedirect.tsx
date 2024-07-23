import { ComponentType, FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../stores/store";

const authRedirect = (WrappedComponent: ComponentType) => {
  const AuthRedirect: FC = (props) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (token) {
        router.push("/me");
      } else {
        setLoading(false);
      }
    }, [token, router]);

    if (loading) {
      return null;
    }

    if (token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthRedirect;
};

export default authRedirect;
