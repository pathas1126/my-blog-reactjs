import React, { useEffect, useState } from "react";
import "../Main.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = props => {
  const [category, setCategory] = useState([]);
  const { _changeCategory } = props;

  useEffect(() => {
    const _getCategoryData = async () => {
      const getData = await axios("/get/category");
      console.log(getData);
      setCategory(getData.data);
    };
    _getCategoryData();
  }, []);

  let pre_cat = "";
  if (sessionStorage.getItem("category")) {
    pre_cat = Number(sessionStorage.getItem("category"));
  }

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
          <hr />
        </li>
        {category.length > 0 &&
          category.map((el, key) => {
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
          })}
      </ul>
    </div>
  );
};

export default Category;
