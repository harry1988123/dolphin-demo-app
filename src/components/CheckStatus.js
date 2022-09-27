import { useDispatch } from "react-redux";
import { loadState } from "../app/localStorage";
import { setLoading, setToken } from "../features/counter/auth/authSlice";
import { AccountContext } from "../features/counter/auth/Account";
import { useContext } from "react";

const CheckStatus = () => {
  const dispatch = useDispatch();
  const { getSession } = useContext(AccountContext);

  dispatch(setLoading(true));
  getSession()
    .then((session) => {
      console.log("Session ", session);
      const tokens = {
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      };
      loadState();
      //dispatch(setToken(tokens));
      console.log(tokens);
    })
    .catch((e) => {
      console.log(e);
    });
};

export { CheckStatus };
