import React, { forwardRef, useEffect } from "react";
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";

const RTE = forwardRef(function RTE(
  { label, value = "", onChange },
  ref
) {
  useEffect(() => {
    if (ref && ref.current && value) {
      ref.current.getEditor().setContents(
        ref.current.getEditor().clipboard.convert(value)
      );
    }
  }, []);

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}

      <ReactQuill
        ref={ref}
        theme="snow"
        value={value}
        onChange={onChange}
        className="bg-white"
      />
    </div>
  );
});

export default RTE;