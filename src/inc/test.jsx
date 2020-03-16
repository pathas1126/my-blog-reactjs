import React from "react";
import queryString from "query-string";

const test = props => {
  const qry = queryString.parse(props.location.search);
  console.log(qry);

  return (
    <div>
      <h3>TEST PAGE</h3>
      <h4>My nams is {qry.name}</h4>
      <h2>And {qry.age} Year.</h2>
    </div>
  );
};

export default test;
