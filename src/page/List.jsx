import React, { useState, useEffect } from "react";
import "./Main.css";
import { Search } from "./index";
import { Link } from "react-router-dom";

import queryString from "query-string";

import axios from "axios";

const List = props => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [all_page, setAll_page] = useState([]);
  const [search, setSearch] = useState("");
  const PAGE_LIMIT = 10;

  useEffect(() => {
    const _getListData = async () => {
      let { category } = props;
      if (sessionStorage.getItem("category")) {
        category = sessionStorage.getItem("category");
      }

      setPage(_setPage());

      // 검색 submit으로 전송된 쿼리스트링 파싱, 저장
      let search = queryString.parse(props.location.search);
      if (search) search = search.search;

      // DB에 저장된 게시글 수 가져오기
      const total_cnt = await axios("get/board_cnt", {
        method: "POST",
        header: new Headers(),
        data: { search, category }
      });

      // DB 게시글 목록 가져오기
      const total_list = await axios("/get/board", {
        method: "POST",
        data: { limit: PAGE_LIMIT, page, search, category },
        headers: new Headers()
      });

      // 전체 페이지 수 구하기
      let page_arr = [];

      for (let i = 1; i <= Math.ceil(total_cnt.data.cnt / PAGE_LIMIT); i++) {
        page_arr.push(i);
      }

      setData(total_list);
      setAll_page(page_arr);
      setSearch(search);
    };
    _getListData();
    _setPage();
  }, [page]);

  // 클릭하는 페이지로 현재 페이지 바꾸기
  const _changePage = el => {
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
  const list = data.data;

  return (
    <div className="List">
      <div className="list_grid list_tit">
        <div>제목</div>
        <div>조회수</div>
        <div className="acenter">날짜</div>
      </div>

      {list && list.length > 0 ? (
        list.map((el, key) => {
          const view_url = "/view/" + el.board_id;
          return (
            <div className="list_grid list_data" key={key}>
              <div>
                <Link to={view_url}>{el.title}</Link>
              </div>
              <div></div>
              <div className="acenter">{el.date.slice(0, 10)}</div>
            </div>
          );
        })
      ) : (
        <div className="not_data acenter">
          {search !== "" ? (
            <div>검색된 결과가 없습니다.</div>
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      )}

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
          <Search search={search} />
        </div>
      </div>
    </div>
  );
};

export default List;
