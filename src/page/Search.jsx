import React, { useRef } from "react";
import "./Main.css";

const Search = props => {
  const inputRef = useRef();
  const { search } = props;

  // search 값이 있는 경우 input 값에 search 유지
  if (search) {
    inputRef.current.value = search;
  }

  return (
    <div>
      <form>
        <input
          ref={inputRef}
          type="text"
          maxLengt="20"
          className="search_input"
          name="search"
          placeholder="검색어를 입력하세요"
        />
        <input type="submit" value="검색" className="search_submit" />
      </form>
    </div>
  );
};

export default Search;
