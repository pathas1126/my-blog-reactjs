import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";

const View = props => {
  const [data, setData] = useState({});
  useEffect(() => {
    // board_id에 맞는 게시글 가져오기
    const _getData = async () => {
      const board_id = props.match.params.data;
      const getData = await axios("/get/board_data", {
        method: "POST",
        headers: new Headers(),
        data: { id: board_id }
      });
      console.log(getData);

      setData(getData.data.data[0]);
    };
    _getData();
  }, []);

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
