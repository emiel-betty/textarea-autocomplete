import React from "react";
import styled from "styled-components";

const colors = {
  argument: "blue",
  expression: "green",
};

const List = styled.ul`
  list-style: none;
  padding: 0px;
  width: 50%;
  background: white;
  border: 1px solid black;
`;

const ListItem = styled.li`
  border-top: 1px solid lightgray;
  padding: 5px;
  cursor: pointer;
  :hover {
    background: lightblue;
  }
`;

const toExpressionText = (type, value) => {
  return `<span style="color:${colors[type]};">${value}</span>`;
};

function ExpressionList({ onExpressionInsert, searchList }) {
  const createArguments = (args) => {
    const wrapped = args.map((v) => `${v}`);
    const newWrapped = wrapped.map((v) => toExpressionText("argument", v));
    return `(${newWrapped.join(", ")})`;
  };

  const insert = (expression) => {
    const args = createArguments(expression.args);
    const exp = toExpressionText("expression", expression.name);
    return exp.concat(args);
  };

  return (
    <List>
      {searchList.map((expression) => (
        <ListItem
          onClick={() => {
            const result = insert(expression);
            onExpressionInsert(result);
          }}
        >
          {expression.name}
        </ListItem>
      ))}
    </List>
  );
}

export default ExpressionList;
