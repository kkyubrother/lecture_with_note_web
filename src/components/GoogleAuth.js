import { Fragment } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fetchLogin, isLogin } from "../api";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const fetchGoogleLogin = (token) =>
  fetchLogin(token)
    .then((result) => console.log(result))
    .then(() => isLogin().then((result) => console.log(result)));

const GoogleAuth = ({ onSuccess }) => {
  return (
    <Fragment>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          buttonText="구글 로그인"
          onSuccess={(credentialResponse) => {
            fetchGoogleLogin(credentialResponse.credential).then(() =>
              onSuccess(),
            );
          }}
          onError={(e) => {
            console.log("Login Failed", e);
          }}
        />
      </GoogleOAuthProvider>
    </Fragment>
  );
};

export default GoogleAuth;
