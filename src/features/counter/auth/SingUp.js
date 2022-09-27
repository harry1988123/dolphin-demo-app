import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPool from "./UserPool";
import Status from "./Status";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export const SingUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setErrMessage("Password not matching, Please re enter the password");
      resetAll();
    }
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: username,
      }),
    ];
    UserPool.signUp(username, password, attributeList, null, callback);
  };

  const callback = (err, data) => {
    if (err) {
      setErrMessage(err?.message);
      resetAll();
    } else {
      console.log(data);
      window.alert("Successfully signed up");
      navigate("/welcome");
      setErrMessage("");
    }
  };

  const resetAll = () => {
    setUsername("");
    setPassword("");
    setRePassword("");
  };

  const handleUser = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRePassword = (e) => setRePassword(e.target.value);

  return (
    <section className="singUp">
      <Status />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter the username: </label>
        <input
          type="email"
          id="username"
          placeholder="Email id"
          value={username}
          autoComplete="off"
          onChange={handleUser}
          required
        />
        <br />
        <label htmlFor="password">Enter the Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          autoComplete="off"
          onChange={handlePassword}
          required
        />
        <br />
        <label htmlFor="rePassword">Re-enter the password: </label>
        <input
          type="password"
          id="rePassword"
          placeholder="Re enter the Password"
          value={rePassword}
          autoComplete="off"
          onChange={handleRePassword}
          required
        />
        <br />
        <button>Sing Up</button>
        <p>{errMessage}</p>
      </form>
    </section>
  );
};
