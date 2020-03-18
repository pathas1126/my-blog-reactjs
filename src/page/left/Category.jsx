import React, { useEffect, useState } from "react";
import "../Main.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = props => {
  const [category, setCategory] = useState([]);
  const [edit, setEdit] = useState(false);
  const { _changeCategory, login } = props;

  // 카테고리 데이터 받아오기
  const _getCategoryData = async () => {
    const getData = await axios("/get/category");
    console.log(getData);
    setCategory(getData.data);
  };

  useEffect(() => {
    _getCategoryData();
  }, []);

  // 카테고리 데이터 추가
  const _addCategory = async () => {
    const add = await axios("/add/category", {
      method: "POST",
      data: { name: category_name },
      headers: new Headers()
    });

    alert(add.data.msg);
    _getCategoryData();
  };

  let category_name = "";

  // 카테고리 이름 받아오기
  const _getCatName = () => {
    category_name = window.prompt("추가할 카테고리 이름을 입력하세요.");
    if (category_name) {
      if (category_name !== "" && category_name.length > 0) {
        category_name = category_name.trim();
        _addCategory();
      } else {
        return alert("최소 1글자 이상 입력해야 합니다!!");
      }
    }
  };

  // category 정보 유지
  let pre_cat = "";
  if (sessionStorage.getItem("category")) {
    pre_cat = Number(sessionStorage.getItem("category"));
  }

  // 카테고리 제거
  const _removeCategory = async category => {
    if (window.confirm(category.name + "카테고리를 삭제하시겠습니까?")) {
      const remove = await axios("/delete/category", {
        method: "POST",
        data: category,
        headers: new Headers()
      });

      if (remove) {
        alert("카테고리가 삭제되었습니다.");
        _getCategoryData();
      }
    }
  };

  // 카테고리 이름 수정
  const _modifyCategory = async category => {
    let modify_name = document.getElementsByName("modify_" + category.id)[0]
      .value;
    modify_name = modify_name.trim();
    console.log(modify_name);

    if (modify_name !== "" && modify_name.length > 0) {
      if (category.name === modify_name) {
        return alert(
          "변경하려는 카테고리의 이름이 \n 기존의 카테로리 이름과 동일합니다."
        );
      }
      if (
        window.confirm(
          category.name +
            " 의 이름을 \n" +
            modify_name +
            " 으로 수정하시겠습니까?"
        )
      ) {
        const data = { id: category.id, name: modify_name };
        const modify = await axios("/modify/category", {
          method: "POST",
          data: data,
          headers: new Headers()
        });

        alert(modify.data.msg);
        _getCategoryData();
      }
    } else {
      return alert("변경할 카테고리의 이름을 최소 1글자 이상 입력해주세요!");
    }
  };

  return (
    <div className="Category">
      <ul>
        <li>
          <Link
            to="/"
            className={pre_cat === "" ? "pre_cat" : null}
            onClick={() => _changeCategory("")}
          >
            전체 보기
          </Link>
          {login && !edit ? (
            <input
              type="button"
              value="Edit"
              className="Edit"
              onClick={() => setEdit(!edit)}
            />
          ) : (
            <input
              type="button"
              value="Add"
              className="Edit"
              onClick={() => {
                _getCatName();
              }}
            />
          )}
          <hr />
        </li>
        {category.length > 0 &&
          category.map((el, key) => {
            if (!edit) {
              return (
                <li key={key}>
                  <Link
                    to="/"
                    className={pre_cat === el.id ? "pre_cat" : null}
                    onClick={() => _changeCategory(el.id)}
                  >
                    {el.name}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={key}>
                  <img
                    src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-x-mark-2.png&r=0&g=0&b=0"
                    alt="delete_icon"
                    className="remove_icon"
                    onClick={() => {
                      _removeCategory(el);
                    }}
                  />
                  <input
                    type="text"
                    maxLength="20"
                    className="edit_input"
                    defaultValue={el.name}
                    name={"modify_" + el.id}
                  />
                  <img
                    src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2017/png/iconmonstr-check-mark-17.png&r=0&g=0&b=0"
                    alt="modify_icon"
                    className="modify_icon"
                    onClick={() => _modifyCategory(el)}
                  />
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default Category;
