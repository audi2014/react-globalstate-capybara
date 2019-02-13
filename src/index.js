import React from "react";
import ReactDOM from "react-dom";
import { View, Router } from "./components";
import Store from "./lib/store";
import promiseMiddleware from "./lib/store/middlewares/promise";
import { set, push, clear, sort, filter } from "./lib/store/mutations/array";
import withGlobalState from "./lib/withGlobalState";
/** INIT */
const store = new Store({ users: ["a", "z", "u"], time: "" });
store.applyDispatchMiddleware(promiseMiddleware);
/** create actions */
const pushUser = store.createAction("users", push);
const clearUsers = store.createAction("users", clear);
const sortUsers = store.createAction("users", sort);
const filterUsers = store.createAction("users", filter);
const setUsers = store.createAction("users", set);

const fetchTime = store.createAction("time", (e, arg1) => {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      const d = new Date();
      resolve(d[arg1]());
    }, 200);
  });
});

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
            fetchLocaleString: () => fetchTime("toLocaleString")
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
