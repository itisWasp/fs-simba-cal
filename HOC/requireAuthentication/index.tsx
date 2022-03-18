import { useRouter } from "next/router";

type Props = {};

const requireAuthentication = (WrappedComponent: any) => {
  return (props: Props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default requireAuthentication;
