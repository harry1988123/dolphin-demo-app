import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setToken,
  setEmail,
  logOut,
  selectIsLogin,
  setLogin,
} from "./authSlice.js";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import awsExports from "./aws-exports.js";
import { useEffect } from "react";
Amplify.configure(awsExports);

export default function App() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Status isLogin", isLogin);
    if (user && !isLogin) {
      const tokens = {
        accessToken: user?.signInUserSession.getAccessToken().getJwtToken(),
        idToken: user?.signInUserSession.getIdToken().getJwtToken(),
        refreshToken: user?.signInUserSession.getRefreshToken().getToken(),
      };
      dispatch(setToken(tokens));
      dispatch(setLogin(true));
      dispatch(setEmail(user?.attributes?.email));
    }
  }, [user]);

  const logOutSession = () => {
    dispatch(logOut());
    signOut();
    navigate("/");
    window.location.reload(false);
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          {isLogin ? (
            <h1>
              <Navigate to="/welcome" replace={true} />
            </h1>
          ) : (
            <h1>
              <Navigate to="/" replace={true} />
            </h1>
          )}
          <button onClick={logOutSession}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
