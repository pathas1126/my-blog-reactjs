import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";

const View = props => {
  const [data, setData] = useState({});
  const board_id = props.match.params.data;

  // board_id에 맞는 게시글 가져오기
  useEffect(() => {
    const _getData = async () => {
      const getData = await axios("/get/board_data", {
        method: "POST",
        headers: new Headers(),
        data: { id: board_id }
      });
      console.log(getData);

      setData(getData.data.data[0]);
    };
    _getData();
  }, [board_id]);

  // board_id 게시글 조회수 증가 함수
  useEffect(() => {
    const _addViewCnt = async board_id => {
      // 반환 값이 필요 없는 경우 요청만 하고, 데이터는 저장하지 않아도 됨
      await axios("/update/view_cnt", {
        method: "POST",
        header: new Headers(),
        data: { id: board_id }
      });
    };
    _addViewCnt(board_id);
  }, [board_id]);

  // 날짜 구하기
  let { date } = data;
  date = String(date);

  return (
    <div className="Write">
      {data && (
        <div>
          <div className="top_title">
            <input
              type="text"
              className="title_txt"
              name="title"
              defaultValue={data.title}
              readOnly
            />
            <div className="date_div">{date.slice(0, 10)}</div>
          </div>

          <div>
            <textarea
              name="contents"
              className="content_txt"
              defaultValue={data.contents}
              readOnly
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
