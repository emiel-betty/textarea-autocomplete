import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ExpressionList from "./ExpressionList";
import { setEndOfContenteditable } from "./helpers";

const Expression = styled("div")`
  font-size: 20px;
  padding: 5px;
  border: 2px solid black;
  background: transparent;
  caret-color: black;
  width: 50%;
  padding: 1em;
  background: #fff;
  color: #000;
  height: 100px;
  margin: 2px;
  border: 1px solid black;
`;

const resetSearchKeys = [" "];

function ExpressionBuilder({ trigger, searchList }) {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (value && ref.current) {
      ref.current.innerHTML = value;
      setEndOfContenteditable(ref.current);
    }
  }, [ref, value]);

  const handleKeyDown = (e) => {
    const key = e.nativeEvent.data;
    console.log(key);

    if (key === trigger) {
      setShowList(true);
    } else {
      if (key === null || key.includes(resetSearchKeys)) {
        setSearchValue("");
        setShowList(false);
      } else {
        setSearchValue((prevState) => {
          return prevState + key;
        });
      }
    }

    setValue(e.target.innerHTML);
  };

  const dataList = searchList.filter((exp) => {
    return exp.name.includes(searchValue);
  });

  const onExpressionInsert = (expression) => {
    const toReplace = trigger + searchValue;
    const newValue = value.replace(toReplace, expression);
    setSearchValue("");
    setShowList(false);
    setValue(newValue);
  };

  console.log(dataList, showList);

  return (
    <>
      <Expression contentEditable onInput={handleKeyDown} ref={ref} />

      {dataList.length !== 0 && showList && (
        <ExpressionList
          onClick={() => setSearchValue("")}
          searchList={dataList}
          onExpressionInsert={onExpressionInsert}
          spellcheck={false}
        />
      )}
    </>
  );
}

export default ExpressionBuilder;
