import React, { useContext, useEffect } from "react";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setToken,
  setLogin,
  selectCurrentEmail,
  selectIsLogin,
  setEmail,
} from "./authSlice";
import { loadState } from "../../../app/localStorage";
import { useSelector } from "react-redux";

const Status = () => {
  const { getSession, logOut } = useContext(AccountContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const currentEmail = useSelector(selectCurrentEmail);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    getSession()
      .then((session) => {
        console.log("Session ", session);
        const tokens = {
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        };
        loadState();
        dispatch(setToken(tokens));
        dispatch(setLogin(true));
        if (!currentEmail) {
          dispatch(setEmail(session.idToken.payload.email));
        }
        console.log(tokens);
      })
      .catch((e) => {
        console.log(e);
        dispatch(setLogin(false));
      });
  };

  return (
    <div>
      {isLogin ? (
        <p>
          You are already logged in {currentEmail}{" "}
          <button onClick={logOut}>Log Out</button>
        </p>
      ) : (
        <p>
          Please <button onClick={(e) => navigate("/login")}>login</button>{" "}
        </p>
      )}
    </div>
  );
};
export default Status;
