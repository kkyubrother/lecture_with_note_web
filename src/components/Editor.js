import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { create_url } from "../utils/lecture";
import {
  createLecture,
  createNote,
  fetchLecture,
  fetchNote,
  fetchYoutubeVideoTitle,
  updateNote,
} from "../api";

const ConfigToolbar = {
  items: [
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "link",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
    "insertTable",
    "undo",
    "redo",
    "removeFormat",
    "-",
    "style",
    "|",
    "alignment",
    "fontBackgroundColor",
    "fontColor",
    "fontFamily",
    "fontSize",
    "|",
    "subscript",
    "superscript",
    "highlight",
    "|",
    "horizontalLine",
    "pageBreak",
    "specialCharacters",
    "code",
  ],
  shouldNotGroupWhenFull: true,
  // shouldNotGroupWhenFull: false
};

// const fetchSave

const Editor = ({ videoId, videoPlatform }) => {
  const [lectureId, setLectureId] = useState();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    setInitialData(null);
    (async () => {
      const url = create_url(videoPlatform, videoId);
      console.debug("url", url);
      let title = url;
      if (videoPlatform === "youtube") {
        title = await fetchYoutubeVideoTitle(videoId);
      }

      await createLecture(url, title);
      const lecture_id = (await fetchLecture(url)).id;

      await createNote(lecture_id, "");
      const note_data = (await fetchNote(lecture_id)).data;

      setLectureId(lecture_id);
      setInitialData(note_data);
    })();
  }, [videoId, videoPlatform]);

  return initialData !== null ? (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: ConfigToolbar,
        placeholder: "내용을 입력하세요.",
        language: "ko",
        autosave: {
          save(editor) {
            console.log(editor.getData());
            const data = editor.getData();
            updateNote(lectureId, data);
          },
        },
        fontFamily: {
          supportAllValues: true,
        },
      }}
      data={initialData}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
        console.log(Array.from(editor.ui.componentFactory.names()));
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  ) : null;
};

export default Editor;
