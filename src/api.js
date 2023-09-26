// const HOST = "/api";
const HOST = "http://localhost:8000/api";
const INIT = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
const POST_INIT = {
  ...INIT,
  method: "POST",
};
const PUT_INIT = {
  ...INIT,
  method: "PUT",
};
const DEL_INIT = {
  ...INIT,
  method: "DELETE",
};

export async function fetchYoutubeVideoTitle(videoId) {
  const response = await fetch(`${HOST}/youtube?video_id=${videoId}`, INIT);
  const result = await response.json();
  return result.title;
}

export async function createLecture(url, title) {
  const body = JSON.stringify({ url, title });
  return await fetch(`${HOST}/lecture`, { ...POST_INIT, body });
}

export async function fetchLecture(url) {
  const response = await fetch(
    `${HOST}/lecture?url=${encodeURIComponent(url)}`,
    INIT,
  );
  return await response.json();
}

export async function deleteLecture(url) {
  const response = await fetch(
    `${HOST}/lecture?url=${encodeURIComponent(url)}`,
    DEL_INIT,
  );
  return await response.json();
}

export async function createNote(lectureId, data) {
  const body = JSON.stringify({ data });
  return await fetch(`${HOST}/lecture/${lectureId}/note`, {
    ...POST_INIT,
    body,
  });
}
export async function fetchNote(lectureId) {
  const response = await fetch(`${HOST}/lecture/${lectureId}/note`, INIT);
  return await response.json();
}
export async function updateNote(lectureId, data) {
  const body = JSON.stringify({ data });
  return await fetch(`${HOST}/lecture/${lectureId}/note`, {
    ...PUT_INIT,
    body,
  });
}

export async function fetchLectures() {
  const response = await fetch(`${HOST}/lecture/all`, INIT);
  return await response.json();
}

export async function isLogin() {
  const response = await fetch(`${HOST}/protected`, INIT);
  console.log(response);
  return response.status === 200;
}
export async function fetchLogout() {
  const response = await fetch(`${HOST}/login/logout`, POST_INIT);
  return await response.json();
}
export async function fetchLogin(token) {
  const body = JSON.stringify({ token });
  const response = await fetch(`${HOST}/login/google`, { ...POST_INIT, body });
  return await response.json();
}
