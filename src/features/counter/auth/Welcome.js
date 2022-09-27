import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AccountContext } from "./Account";
import {
  selectCurrentEmail,
  selectIsLogin,
  selectInviteeEmail,
  setInviteeEmail,
} from "./authSlice";
import { useNavigate } from "react-router-dom";
import { onMessageListener } from "../../../firebaseInit";
import ReactNotificationComponent from "../../../components/ReactNotification";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Welcome = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const [load, setLoad] = useState(false);
  const { logOutFun } = useContext(AccountContext);
  const userId = "6578242522";
  const meetingPassword = "e7bface8da34e0222c91c2c4870d7fcdeb7f52c3";
  const email = useSelector(selectCurrentEmail);
  const isLogin = useSelector(selectIsLogin);
  const inviteeEmail = useSelector(selectInviteeEmail);
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [show, setShow] = useState(true);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [emailError, setEmailError] = useState(null);
  const [localEmail, setLocalEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };
  let query = useQuery();

  useEffect(() => {
    if (isLogin) {
      navigate("/welcome");
    } else {
      navigate("/");
    }
    const link = query.get("meetingUrl");
    if (link != null || link !== "") {
      setInviteLink(link);
    }
    // console.log("Another meeting url", query.get("meetingUrl"));
    // console.log("Sender Mail id", query.get("senderEmailId"));
    // console.log("Invitee Mail id", query.get("inviteeEmail"));
  }, []);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const onClickJoin = () => {
    setLoad(true);
    setUrl(
      `https://meet.dolphinvc.com/conf/` + userId + `?pwd=` + meetingPassword
    );
  };

  const getEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError(null);
    }
    setLocalEmail(event.target.value);
  };

  const onSubmitInviteeEmail = (event) => {
    event.preventDefault();
    dispatch(setInviteeEmail({ inviteeEmail: localEmail }));

    const sendingBody = {
      topic: "Dolphin",
      title: "DVC meeting",
      body: `http://localhost:3000/welcome?senderEmailId=${email}&inviteeEmail=${inviteeEmail}&meetingUrl=https://meet.dolphinvc.com/conf/2742614252?pwd=19581b66252d69495565b9f51e25b56dbd55f91e`,
      data: {
        inviteeEmail,
        senderEmailId: email,
        meetingUrl:
          "http://localhost:3000/welcome?meetingUrl=https://meet.dolphinvc.com/conf/2742614252?pwd=19581b66252d69495565b9f51e25b56dbd55f91e",
      },
    };
    axios({
      method: "post",
      url: "http://localhost:3001/fcm1",
      data: JSON.stringify(sendingBody),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const content = (
    <section className="videoSection">
      {!load ? (
        <section className="welcome">
          <button
            onClick={onClickJoin}
            className="amplify-button amplify-field-group__control amplify-button--primary"
            data-fullwidth="true"
            data-loading="false"
            data-variation="primary"
          >
            Click here to join meeting {email}
          </button>{" "}
          <button
            onClick={logOutFun}
            className="amplify-button amplify-field-group__control amplify-button--link amplify-button--small"
            data-fullwidth="false"
            data-size="small"
            data-variation="link"
            type="button"
          >
            Logout
          </button>
        </section>
      ) : (
        <>
          <form onSubmit={onSubmitInviteeEmail}>
            <h4>Enter the invitee Email id</h4>
            <input
              name="inviteeEmail"
              id="inviteeEmail"
              value={localEmail || ""}
              placeholder="Email"
              onChange={getEmail}
            />
            {emailError && <h2>{emailError}</h2>}
            <button type="submit">Call</button>
          </form>
          <div className="iframeContainer">
            <iframe
              className="iframeClass"
              src={inviteLink ? inviteLink : url}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              width="80%"
              height="900"
              title="video"
              ref={iframeRef}
            />
          </div>
        </>
      )}
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
          senderEmailId={email}
        />
      ) : (
        <></>
      )}
    </section>
  );

  return content;
};

export default Welcome;
