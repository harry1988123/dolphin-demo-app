var express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
var FCM = require("fcm-node");
var cors = require("cors");
app.use(cors());

const SERVER_KEY =
  "AAAAuQNSAW0:APA91bGXe9e0Ftlh_EFMc8kaN1aCemW9ujW1xjkLMOcyIhJzEYfUjx9JGaxRlakR3xkxM7JRXFTzSauaftREQovN6q_XfymI8XC6JuspfIFtSg21wTmE-XYTwki7mevJK_NRdJ2twecD";

var port = process.env.port || 3001;

const message1 = (req) => {
  console.log(req.body);
  const { title, body } = req.body;
  const { inviteeEmail, senderEmailId, meetingUrl } = req.body.data;
  return {
    to: "d3awyG6Q1f1FiTJmppRbS4:APA91bFhKZwdQDvoCcxp0m6_iZcwaofSh4F0noXfmYvYAv6WYqOYxbBo3LKqOZFV9eUf2ibeqpWRH1B8O00qnWLUDrRfzaQhJlszTFcjUxgp8jLrzfzglWYhtaBM-LGKy9YX9KT58cLe",
    collapseKey: "campaign_collapse_key_689081027370584250",
    notification: {
      title,
      body,
      sound: "default",
      click_action: "FCM_PLUGIN_ACTIVITY",
      icon: "fcm_push_icon",
    },
    data: {
      title: "ok",
      inviteeEmail,
      senderEmailId,
      meetingUrl,
    },
  };
};

app.listen(port, () => {
  console.log("App listening  on port 3001");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/fcm1", async (req, res, next) => {
  try {
    let fcm = new FCM(SERVER_KEY);
    fcm.send(message1(req), (err, response) => {
      if (err) {
        console.log("Something has gone wrong!" + err);
        console.log("Response:! " + response);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        console.log("Successfully sent with response: ", response);
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api", (req, res) => {
  console.log(req);
  res.json({
    text: "my api",
  });
});

app.post("api/login", (req, res) => {
  const user = { id: 3 };
  console.log(req);
  const token = jwt.sign({ user }, "my_secret_key");
  res.json({
    token,
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.header["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.spilt(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.get("api/protected", ensureToken, (req, res) => {
  jwt.verify(req.token, "my_secret_key", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        text: "this is protected",
        data,
      });
    }
  });
});
