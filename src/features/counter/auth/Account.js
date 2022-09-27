import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "./UserPool";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useDispatch } from "react-redux";
import { logOut } from "./authSlice";

const AccountContext = createContext();

const Account = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signOut } = useAuthenticator((context) => [context.user]);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("On success", data);
          resolve(data);
          navigate("/welcome");
        },
        onFailure: (err) => {
          console.error("OnFailure :", err);
          reject(err?.message);
        },
        newPasswordRequired: (data) => {
          console.log("New Password required ", data);
          resolve(data);
        },
      });
    });
  };

  const logOutFun = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    signOut();
    dispatch(logOut());
    navigate("/");
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logOutFun }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
