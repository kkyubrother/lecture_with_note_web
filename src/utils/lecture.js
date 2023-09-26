export function create_url(platform, video_id) {
  switch (platform) {
    case "youtube":
      return `https://www.youtube.com/watch?v=${video_id}`;
    default:
      return null;
  }
}

export function url_navigate(navigate, url) {
  if (typeof url !== "string") {
    alert("올바른 입력이 아닙니다.");
    return true;
  }

  const url_obj = new URL(url);
  if (url_obj.hostname === window.location.hostname) {
    alert("올바른 입력이 아닙니다.");
    return true;
  }

  console.log(url_obj);

  if (url_obj.hostname === "www.youtube.com") {
    const search_params = url_obj.searchParams;
    console.log(search_params.get("v"));
    if (!search_params.get("v")) {
      alert("Youtube.VideoId.NotExist");
    } else {
      const video_id = search_params.get("v");
      navigate("/lectures/youtube", { state: { video_id } });
      return true;
    }
    return;
  } else if (url_obj.hostname === "youtu.be") {
    const video_id = url_obj.pathname.replace("/", "");
    navigate("/lectures/youtube", { state: { video_id } });
    return true;
  } else {
    alert("지원하지 않는 웹사이트 입니다.\n현재 Youtube만 지원합니다.");
  }
  return false;
}
