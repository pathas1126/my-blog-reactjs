import React from "react";

const Write = props => {
  return (
    <div className="Write">
      <div>
        <input type="text" className="title_txt" placeholder="제목" />
      </div>
      <div>
        <textarea
          className="content_txt"
          placeholder="내용을 입력하세요~"
        ></textarea>
      </div>
    </div>
  );
};

export default Write;
