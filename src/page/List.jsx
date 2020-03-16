import React, { useState, useEffect } from "react";
import "./Main.css";
import axios from "axios";

const List = props => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [all_page, setAll_page] = useState([]);
  const PAGE_LIMIT = 10;

  useEffect(() => {
    const _getListData = async () => {
      setPage(_setPage());

      // DB에 저장된 게시글 수 가져오기
      const total_cnt = await axios("get/board_cnt");
      console.log(total_cnt.data.cnt);

      // DB 게시글 목록 가져오기
      const total_list = await axios("/get/board", {
        method: "POST",
        data: { limit: PAGE_LIMIT, page },
        headers: new Headers()
      });

      // 전체 페이지 수 구하기
      let page_arr = [];

      for (let i = 1; i <= Math.ceil(total_cnt.data.cnt / PAGE_LIMIT); i++) {
        page_arr.push(i);
      }
      console.log(page_arr);

      setData(total_list);
      setAll_page(page_arr);
    };
    _getListData();
    _setPage();
  }, [page]);

  // 클릭하는 페이지로 현재 페이지 바꾸기
  const _changePage = el => {
    console.log(el);
    setPage(el);
    sessionStorage.setItem("page", el);
  };

  // 페이지 고정 함수, 새로고침해도 현재 페이지가 유지됨
  const _setPage = () => {
    if (sessionStorage.page) {
      setPage(Number(sessionStorage.page));
      return Number(sessionStorage.page);
    }
    setPage(1);
    return 1;
  };
  console.log(data);
  const list = data.data;

  return (
    <div classNmae="List">
      <div className="list_grid list_tit">
        <div>제목</div>
        <div>조회수</div>
        <div className="acenter">날짜</div>
      </div>
      {list &&
        list.map((el, key) => {
          return (
            <div className="list_grid list_data" key={key}>
              <div> {el.title}</div>
              <div></div>
              <div className="acenter">{el.date.slice(0, 10)}</div>
            </div>
          );
        })}
      <div className="paging_div">
        <div></div>
        <div>
          <ul>
            {all_page &&
              all_page.map((el, key) => {
                return el === page ? (
                  <li key={key} className="page_num">
                    <b>{el}</b>
                  </li>
                ) : (
                  <li
                    key={key}
                    className="page_num"
                    onClick={() => _changePage(el)}
                  >
                    {el}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;
