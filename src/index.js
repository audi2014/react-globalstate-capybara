import React from "react";
import ReactDOM from "react-dom";
import { View, Router } from "./components";
import createStore, * as helpers from "./lib/index";
const { global, middlewares, mutations, bind } = helpers;
const { set, push, clear, sort, filter } = mutations.array;

/** INIT by global */
// global.applyGlobalMiddleware((anyStore, state, info) => {
//   anyStore.applyMiddleware(middlewares.dispatch.promise, "dispatch");
//   anyStore.applyMiddleware(middlewares.dispatch.memo, "dispatch");
// });
// const createStoreWithRockNRoll = global.wrapStoreCreator(createStore);
// const store = createStoreWithRockNRoll({
//   users: ["a", "z", "u"],
//   time: "",
//   session: "token"
// });

/** INIT */
const store = createStore({
  users: ["a", "z", "u"],
  time: "",
  session: "token"
});
store.applyMiddleware(middlewares.dispatch.promise, "dispatch");
store.applyMiddleware(middlewares.dispatch.memo, "dispatch");
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
const Users = bind.withGlobalState(View, store, ["users"]);
const Time = bind.withGlobalState(View, store, ["time"]);
const All = bind.withGlobalState(View, store, ["time", "users"]);

/** just test */
function App() {
  return (
    <div>
      <div>
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
      </div>
      <div>
        Time
        <Time
          actions={{
            fetchMilliseconds: () => fetchTime("getMilliseconds"),
            fetchLocaleString: () => fetchTime("toLocaleString"),
            setTime: ({ v = new Date() }) => setTime(v)
          }}
        />
      </div>
      <p>to test unsubscribe:</p>
      <Router>
        <div>
          All
          <All />
        </div>
        <div>
          Time
          <Time />
        </div>
        <div>
          Users
          <Users />
        </div>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
