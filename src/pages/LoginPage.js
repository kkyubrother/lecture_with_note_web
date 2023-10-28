import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchLogout, isLogin } from "../api";
import { BsGithub } from "react-icons/bs";

import GoogleLogin from "../components/GoogleAuth";

import LoginImg from "../static/img/login.png";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(async () => {
      if (await isLogin()) {
        navigate("/url-input");
      } else {
        await fetchLogout();
      }
    }, 0);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [navigate]);

  const handleOnLoginSuccess = () => navigate("/url-input");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="text-center form-signin w-100 m-auto">
        <form>
          <a
            href="https://www.flaticon.com/free-icons/university"
            title="university icons"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="mb-4"
              src={LoginImg}
              alt="University icons created by zero_wing - Flaticon"
              width="72"
              height="57"
            />
          </a>

          <h1 className="h3 mb-3 fw-normal">로그인이 필요합니다.</h1>
          <div>
            <GoogleLogin onSuccess={handleOnLoginSuccess} />
          </div>
          <p className="mt-5 mb-3 text-muted">
            &copy; 2023
            {"  "}
            <a href={"https://github.com/kkyubrother/lecture_with_note_web"}>
              Github
              <BsGithub />
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
