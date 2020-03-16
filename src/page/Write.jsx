import React, { useRef } from "react";

const Write = props => {
  console.log(props);
  return (
    <div className="Write">
      <div>
        <input
          ref={props.titleRef}
          name="title"
          type="text"
          className="title_txt"
          placeholder="제목"
        />
      </div>
      <div>
        <textarea
          ref={props.contentsRef}
          name="contents"
          className="content_txt"
          placeholder="내용을 입력하세요~"
        ></textarea>
      </div>
    </div>
  );
};

export default Write;
