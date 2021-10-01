import "./App.css";
import ExpressionBuilder from "./ExpressionBuilder";

const expressions = [
  {
    name: "split",
    args: ["string", "string"],
  },
  {
    name: "concat",
    args: ["array", "string"],
  },
];

function App() {
  return (
    <div className="App">
      <ExpressionBuilder trigger="@" searchList={expressions} />
    </div>
  );
}

export default App;
