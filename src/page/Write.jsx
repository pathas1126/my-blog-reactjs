import React from "react";
import { CKEditor } from "../inc";

const Write = props => {
  const { contents, _getContents } = props;

  return (
    <div className="Write">
      <div className="Title">
        <input
          ref={props.titleRef}
          name="title"
          type="text"
          className="title_txt"
          placeholder="제목"
        />
      </div>
      <div>
        {/* <textarea
          ref={props.contentsRef}
          name="contents"
          className="content_txt"
          placeholder="내용을 입력하세요~"
        ></textarea> */}
        <CKEditor _getContents={_getContents} contents={contents} />
      </div>
    </div>
  );
};

export default Write;
