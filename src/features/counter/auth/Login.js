import { useRef, useState, useEffect, React, useContext } from "react";
import { AccountContext } from "./Account";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentEmail,
  setToken,
  setEmail,
  selectIsLogin,
  setLogin,
} from "./authSlice";
import {} from "./authSlice";
import { Navigate } from "react-router-dom";
import Status from "./Status";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [localEmail, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authenticate } = useContext(AccountContext);
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    setErrorMessage("");
  }, [localEmail, password]);

  useEffect(() => {
    if (!isLogin) {
      userRef.current.focus();
    } else {
      dispatch(setLogin(false));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticate(localEmail, password)
      .then((data) => {
        console.log("Logged in success!", data);
        dispatch(setEmail(localEmail));
      })
      .catch((err) => {
        console.log("Failed to login", err);
        setErrorMessage(err);
      });
    e.target.reset();
  };

  const handleUserInput = (e) => setLocalEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = (
    <section className="login">
      <Status />
      <div>
        {isLogin ? (
          <Navigate to="/welcome" replace={true} />
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              value={localEmail}
              onChange={handleUserInput}
              autoComplete="off"
              required
              placeholder="Enter mail id"
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
              placeholder="Password"
            />
            <br />
            <button>Sign In</button>
          </form>
        )}
      </div>

      <p
        ref={errRef}
        className={errorMessage ? "errorMessage" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
    </section>
  );

  return content;
};

export default Login;
