import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKeditor = props => {
  const { contents, _getContents } = props;

  return (
    <div className="CKEditor">
      <CKEditor
        editor={ClassicEditor}
        data={contents}
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          const data = editor.getData();

          _getContents(data);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default CKeditor;
