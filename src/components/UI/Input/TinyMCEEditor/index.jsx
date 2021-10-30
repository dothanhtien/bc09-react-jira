import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = ({ name, value, onEditorChange }) => {
  return (
    <Editor
      apiKey="gof6u0hypfiazxgjtu3s1sr4rzde9h8k4ooeqc7q2h3t7dpn"
      init={{
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "formatselect | " +
          "bold italic underline forecolor strikethrough superscript subscript | alignleft aligncenter | " +
          "link | " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'; font-size:14px }",
      }}
      name={name}
      value={value}
      onEditorChange={onEditorChange}
    />
  );
};

export default TinyMCEEditor;
