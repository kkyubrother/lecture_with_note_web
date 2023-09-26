import YouTube from "react-youtube";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "../../components/Editor";
import { BsPencilSquare } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { useState } from "react";
import LectureList from "../../components/LectureList";
import { isLogin } from "../../api";

const YOUTUBE_STYLE = {
  width: "calc(100vw - (480px + 70px))",
  height: "calc(1vh * 70 - 56px)",
  aspectRatio: "16 / 9",
};
const YOUTUBE_OPT = { height: "100%", width: "100%" };
const EDITOR_STYLE = {
  width: "480px",
  height: "calc(100vh - 56px)",
  position: "fixed",
  top: "56px",
  right: "70px",
};

const YoutubeLecturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginCheck, setIsLoginCheck] = useState(false);

  isLogin().then((result) => (result ? setIsLoginCheck(true) : navigate("/")));

  if (location.state === undefined) {
    navigate("/");
  }
  const videoId = location.state.video_id;

  const [showEditor, setShowEditor] = useState(false);
  const [showLectures, setShowLectures] = useState(false);

  if (!isLoginCheck) return <div></div>;

  const showFullWidth = !(showEditor || showLectures);

  const handleShowEditor = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditor(!showEditor);
    setShowLectures(false);
  };
  const handleShowLectures = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLectures(!showLectures);
    setShowEditor(false);
  };

  const handleNavBrandClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate("/url-input");
  };

  return (
    <>
      <main
        className="container-fluid"
        style={{
          height: "calc(100vh - 56px)",
          marginRight: "70px",
          margin: 0,
          padding: 0,
          marginTop: "56px",
          overflow: "hidden",
        }}
      >
        <header>
          <nav
            className="navbar fixed-top bg-light"
            style={{ marginRight: "70px" }}
          >
            <div className="container-fluid">
              <a
                className="navbar-brand"
                href="/url-input"
                onClick={handleNavBrandClick}
              >
                Lecture & Note
              </a>
            </div>
          </nav>
        </header>
        <div
          style={{
            width: showFullWidth
              ? "calc(100vw - (0px + 70px))"
              : "calc(100vw - (480px + 70px))",
            height: "calc(100vh - 56px)",
            backgroundColor: "gray",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <YouTube
            videoId={videoId}
            style={{
              ...YOUTUBE_STYLE,
              width: showFullWidth
                ? "calc(100vw - (0px + 70px))"
                : "calc(100vw - (480px + 70px))",
            }}
            opts={YOUTUBE_OPT}
          />
          <div
            style={{
              flex: "1 1 auto",
              width: "100%",
              backgroundColor: "white",
            }}
          ></div>
        </div>
      </main>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "70px",
          zIndex: 100,
          backgroundColor: "var(--bs-gray-400)",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, paddingTop: "14px" }}>
          <li style={{ paddingBottom: "14px" }}>
            <button
              style={{ height: "56px", width: "70px", fontSize: "24px" }}
              className="btn"
              onClick={handleShowEditor}
              title="노트"
            >
              <BsPencilSquare />
            </button>
          </li>
          <li style={{ paddingBottom: "14px" }}>
            <button
              style={{ height: "56px", width: "70px", fontSize: "24px" }}
              className="btn"
              onClick={handleShowLectures}
              title="목록"
            >
              <BsListUl />
            </button>
          </li>
        </ul>
      </div>
      <aside
        style={{
          ...EDITOR_STYLE,
          transition: "transform 0.2s ease 0s",
          transform: showEditor ? "translate(0)" : "translate(480px)",
        }}
      >
        <Editor videoId={videoId} videoPlatform="youtube" />
      </aside>
      <aside
        style={{
          ...EDITOR_STYLE,
          transition: "transform 0.2s ease 0s",
          transform: showLectures ? "translate(0)" : "translate(480px)",
        }}
      >
        <LectureList
          videoId={videoId}
          style={{
            width: "480px",
            height: "calc(100vh - (56px))",
            backgroundColor: "white",
          }}
        />
      </aside>
    </>
  );
};

export default YoutubeLecturePage;
