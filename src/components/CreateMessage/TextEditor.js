import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ placeholder, onChange }) {
  const toolbarOptions = [
    ["link"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "indent",
    "background",
    "color",
    "link",
    "width",
  ];
  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  // NOTE - content, delta, source 사용하지 않아도 지우면 작동하지 않습니다.
  const handleEditorChange = (content, delta, source, editor) => {
    onChange(editor.getHTML()); // 부모 컴포넌트에 HTML 콘텐츠 전달
  };

  return (
    <>
      <ReactQuill
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        onChange={handleEditorChange}
      />
    </>
  );
}
