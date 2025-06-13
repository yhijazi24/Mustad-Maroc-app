import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-north-1_XXXXXXXXX', // <-- replace with your real value
  ClientId: 'XXXXXXXXXXXXXXXXXXXX',   // <-- replace with your real value
};

const userPool = new CognitoUserPool(poolData);

export const signIn = (Username, Password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username, Password });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        resolve(accessToken); // You can store this in localStorage or Redux
      },
      onFailure: (err) => {
        reject(err.message || JSON.stringify(err));
      },
    });
  });
};

export const registerUser = (Username, Password, Email) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(
      Username,
      Password,
      [{ Name: 'email', Value: Email }],
      null,
      (err, result) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else {
          resolve(result);
        }
      }
    );
  });
};
