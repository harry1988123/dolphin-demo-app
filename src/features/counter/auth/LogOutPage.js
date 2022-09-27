import { useAuthenticator } from "@aws-amplify/ui-react";
import { createContext } from "react";
import { logOut } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogOutContext = createContext();

const LogOutPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signOut } = useAuthenticator((context) => [context.user]);

  const logOutFun = () => {
    dispatch(logOut());
    signOut();
    navigate("/");
  };

  return (
    <LogOutContext.Provider value={{ logOutFun }}>
      {props.children}
    </LogOutContext.Provider>
  );
};

export { LogOutPage, LogOutContext };
