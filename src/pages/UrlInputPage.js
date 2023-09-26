import LoginImg from "../static/img/login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url_navigate } from "../utils/lecture";
import LectureList from "../components/LectureList";

const UrlInputPage = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    return url_navigate(navigate, url);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="text-center form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
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

          <h1 className="h3 mb-3 fw-normal">URL을 입력하세요</h1>

          <div className="row mb-3">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
              URL
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="colFormLabel"
                placeholder="URL을 입력하세요."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              제출
            </button>
          </div>
          <div className="text-start">
            <LectureList
              videoId={new Date().getUTCSeconds()}
              style={{ width: "480px", backgroundColor: "white" }}
            />
          </div>
          <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
        </form>
      </div>
    </div>
  );
};

export default UrlInputPage;
