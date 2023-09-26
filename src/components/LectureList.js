import { useEffect, useState } from "react";
import { deleteLecture, fetchLectures } from "../api";
import { url_navigate } from "../utils/lecture";
import { useNavigate } from "react-router-dom";
import { BsYoutube, BsTrashFill } from "react-icons/bs";

const LectureList = ({ style, videoId }) => {
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(async () => {
      try {
        const lectures = await fetchLectures();
        setLectures(lectures);
      } catch (e) {
        console.error(e);
        window.alert("서버에서 정보를 불러오지 못했습니다.");
      }
    }, 0);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [videoId]);

  const handleOnClick = (e, lecture) => {
    url_navigate(navigate, lecture.url);
  };
  const handleOnDelete = (e, lecture) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDeleteConfirm = (e, lecture) => {
    e.preventDefault();
    e.stopPropagation();

    deleteLecture(lecture.url)
      .then((result) => console.log(result))
      .then(() => navigate("/url-input"));
  };

  return (
    <div style={style}>
      <ul className="list-group list-group-flush">
        {lectures.map((lecture) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={(e) => handleOnClick(e, lecture)}
          >
            <div className="ms-2 me-auto">
              {lecture.url.includes("youtube.com") && (
                <BsYoutube style={{ color: "#FF0000" }} />
              )}
              <div className="fw-bold">{lecture.title}</div>
              <div className="collapse" id={`collapseLecture-${lecture.id}`}>
                <div className="card card-body">
                  노트까지 같이 삭제되며, 해당 동작은 되돌릴 수 없습니다.
                  <br />
                  정말로 삭제하시겠습니까?
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDeleteConfirm(e, lecture)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start">
              <a
                className="badge bg-primary rounded-pill"
                onClick={(e) => handleOnDelete(e, lecture)}
                data-bs-toggle="collapse"
                href={`#collapseLecture-${lecture.id}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseLecture-${lecture.id}`}
              >
                <BsTrashFill />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LectureList;
