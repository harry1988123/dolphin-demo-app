import "firebase/database";
import "firebase/messaging";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDOei214UbALTb37Da0uGpoohVxsTpf6T0",
  authDomain: "dolphin-app-79d7d.firebaseapp.com",
  projectId: "dolphin-app-79d7d",
  storageBucket: "dolphin-app-79d7d.appspot.com",
  messagingSenderId: "794624655725",
  appId: "1:794624655725:web:480bd8ac57926475639a64",
  measurementId: "G-9ZC60N122B",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const REACT_APP_VAPID_KEY =
  "BIHDMQbyeg8j21TgaE2tbPXBKXY3ukeMKzEYwz0mcptIlv5vj939Nk5b06MMJFKp9Iq9lWkhab0qMOZGcST4DBA";

const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
