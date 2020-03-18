import React from "react";
import "../Main.css";
import axios from "axios";

// 컴포넌트 이름은 PascalCase 또는 SCREAMING_SNAKE_CASE 로 작성
const RightWrite = props => {
  const _submitBoard = async () => {
    const title = props.titleRef.current.value;
    const contents = props.contents;

    console.log(title, contents);

    if (title === "") {
      return alert("제목을 입력해 주세요!");
    } else if (contents === "") {
      return alert("내용을 입력해 주세요!");
    }

    const data = { title, contents };
    const res = await axios("/add/board", {
      method: "POST",
      data,
      headers: new Headers()
    });

    if (res.data) {
      alert("글 등록이 완료되었습니다");
      return window.location.replace("/");
    }
  };

  return (
    <div>
      <div className="post_submit">
        <button onClick={() => _submitBoard()}>포스트 등록</button>
      </div>
    </div>
  );
};

export default RightWrite;
