# [react-globalstate-capybara](https://reactjs.org/) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/audi2014/react-globalstate-capybara/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-globalstate-capybara.svg?style=flat)](https://www.npmjs.com/package/react-globalstate-capybara) 
[![npm](https://img.shields.io/npm/dw/react-globalstate-capybara.svg)](https://www.npmjs.com/package/react-globalstate-capybara)
[![npm](https://img.shields.io/npm/v/react-globalstate-capybara.svg)](https://www.npmjs.com/package/react-globalstate-capybara)
![](https://img.shields.io/github/languages/code-size/audi2014/react-globalstate-capybara.svg?style=flat)
![](https://img.shields.io/bundlephobia/min/react-globalstate-capybara.svg?style=flat)

# Global state manager for react

### Example: 
[![example react-globalstate-capybara](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/3wk4z1kw6)

### Edit package: 
[![edit package react-globalstate-capybara](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j35x6p09ww)

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { View, Router } from "./components";
import Store, {
  mutations,
  middlewares,
  withGlobalState
} from "react-globalstate-capybara";

/** INIT */
const { set, push, clear, sort, filter } = mutations.array;
const store = new Store({ users: ["a", "z", "u"], time: "", session: "token" });

store.applyDispatchMiddleware(middlewares.promise);
/** create actions */

// const pushUser = store.createAction("users", push);
// const clearUsers = store.createAction("users", clear);
// const sortUsers = store.createAction("users", sort);
// const filterUsers = store.createAction("users", filter);
// const setUsers = store.createAction("users", set);

// const [
//   pushUser,
//   clearUsers,
//   sortUsers,
//   filterUsers,
//   setUsers
// ] = store.createAction("users", [push, clear, sort, filter, set]);

const {
  pushUser,
  clearUsers,
  sortUsers,
  filterUsers,
  setUsers
} = store.createAction("users", {
  pushUser: push,
  clearUsers: clear,
  sortUsers: sort,
  filterUsers: filter,
  setUsers: set
});
const [setTime, fetchTime] = store.createAction("time", [
  // 0 -> as setTime
  (e, v) => v,
  // 1 -> as fetchTime
  (e, arg1) => {
    //setTime("loading");
    // const token = store.getState("session");
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        const d = new Date();
        resolve(d[arg1]());
      }, 700);
    });
  }
]);

/** bind componet with store props */
const Users = withGlobalState(View, store, ["users"]);
const Time = withGlobalState(View, store, ["time"]);
const All = withGlobalState(View, store, ["time", "users"]);

/** just test */
function App() {
  return (
    <div>
      <p>
        Users
        <Users
          actions={{
            push: () => pushUser(prompt("name is:")),
            clear: () => clearUsers(),
            set: () => setUsers(["a", "u", "d"]),
            sort: () => sortUsers((a, b) => a.localeCompare(b)),
            sortDesc: () => sortUsers((a, b) => b.localeCompare(a)),
            filter: () =>
              filterUsers(prompt("name is:"), (value, u) => u === value)
          }}
        />
      </p>
      <p>
        Time
        <Time
          actions={{
            fetchMilliseconds: () => fetchTime("getMilliseconds"),
            fetchLocaleString: () => fetchTime("toLocaleString"),
            setTime: ({ v = new Date() }) => setTime(v)
          }}
        />
      </p>
      <p>to test unsubscribe:</p>
      <Router>
        <p>
          All
          <All />
        </p>
        <p>
          Time
          <Time />
        </p>
        <p>
          Users
          <Users />
        </p>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
