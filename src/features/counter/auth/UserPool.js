import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_tJEW7wPA5",
  ClientId: "60okb8vpmidd8fder6c5q83kt6",
};

export default new CognitoUserPool(poolData);
