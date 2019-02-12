import React from "react";
import ReactDOM from "react-dom";

import Test from "./Test";
import Store from "./lib/store";
import withGlobalState from "./lib/withGlobalState";

const store = new Store({ users: [], time: "" });

// store.applyMiddleware((value, next) => {
//   const result = next(value);
//   if (typeof result === "function") {
//     // console.log("function", result(dispatchEvent.actionArgs));
//   } else {
//     return result;
//   }
// });
const push = ({ key, value }, nextValue) => {
  return [...value, nextValue];
};
const set = ({ key, value }, nextValue) => {
  return nextValue;
};

const pushToUsers = store.createAction("users", push);
const setTime = store.createAction("time", setTime);

const fetchTime = (timezone = "US") => disatch => {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(new Date().toLocaleString(timezone));
    });
  });
};

const fetchTimeToTime = store.createAction("time", fetchTime);

const Users = withGlobalState(Test, store, ["users"]);

const Time = withGlobalState(Test, store, ["time"]);

class Router extends React.Component {
  state = { v: 0 };
  render() {
    if (!this.props.children) return null;
    return (
      <div>
        <input
          type="number"
          value={this.state.v}
          onChange={e => this.setState({ v: +e.currentTarget.value })}
        />
        {this.props.children[this.state.v]}
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Users action={() => pushToUsers("name")} />
      <Time action={() => fetchTimeToTime()} />
      <Router />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
