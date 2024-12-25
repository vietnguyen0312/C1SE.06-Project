import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ header: [4, 5, 6, false] }], 
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],
  ['clean']
];

const QuillEditor = ({ value, onChange, placeholder }) => (
  <ReactQuill
    value={value}
    onChange={onChange}
    modules={{ toolbar: toolbarOptions }}
    placeholder={placeholder}
  />
);

export default QuillEditor; 