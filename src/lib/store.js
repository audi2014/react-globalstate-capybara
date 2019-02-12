//copy-pasta https://github.com/TimBroddin/react-global-state/blob/master/index.js

const _dispatch = function(dispatchEvent) {
  const { key, action, actionArgs, store } = dispatchEvent;
  const prev = store._state[key];
  const next = store._middleware(
    action(
      new ActionEvent({ key, value: prev, args: actionArgs }),
      ...actionArgs
    ),
    dispatchEvent
  );

  if (next !== prev && next !== undefined) {
    dispatchEvent.emit(new EmitEvent({ key, next, prev }));
    return next;
  } else {
    return prev;
  }
};
class Store {
  constructor(initialState = {}) {
    this._state = { ...initialState };
    this._subscriptions = [];
    this._dispatch = _dispatch;
    this._middleware = value => value;

    this.getState = this.getState.bind(this);
    this.createAction = this.createAction.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.applyMiddleware = this.applyMiddleware.bind(this);
  }
  getState = function() {
    return { ...this._state };
  };

  applyMiddleware = function(m) {
    // const next = this._dispatch;
    // this._dispatch = function(dispatchEvent) {
    //   return m(dispatchEvent, next);
    // };
    // const next = this._middleware;
    // this._middleware = function(value) {
    //   return m(value, next);
    // };
  };
  createAction = function(key, action) {
    return function(...actionArgs) {
      if (dispatchEvent) {
        this._dispatch(
          new DispatchEvent({
            key,
            action,
            actionArgs,
            store: this
          })
        );
      }
    }.bind(this);
  };
  subscribe = function(emit, storeprops) {
    if (
      !this._subscriptions.find(function([cb, keys]) {
        return emit === cb;
      })
    ) {
      this._subscriptions.push([emit, storeprops]);
      //init values
      storeprops.forEach(
        function(key) {
          const next = this._state[key];
          const prev = next;
          emit(new EmitEvent({ key, next, prev }));
        }.bind(this)
      );

      return emit;
    } else {
      console.error("handler can't subscribe twice");
    }
  };
  unsubscribe = function(emit) {
    this._subscriptions = this._subscriptions.filter(function([cb, keys]) {
      return emit !== cb;
    });
    console.log("unsubscribe", this._subscriptions);
  };
}

class DispatchEvent {
  constructor({ key, action, actionArgs, store }) {
    this.key = key;
    this.action = action;
    this.actionArgs = actionArgs;
    this.store = store;
  }
  emit(emitEvent) {
    const { key, next, prev } = emitEvent;
    const nextState = { ...this.store._state, [key]: next };
    this.store._subscriptions.forEach(function([emit, keys]) {
      if (keys.includes(key)) {
        emit(emitEvent);
      }
    });
    this.store._state = nextState;

    delete this.key;
    delete this.action;
    delete this.actionArgs;
    delete this.store;
  }
}
class ActionEvent {
  constructor({ key, value, args }) {
    this.key = key;
    this.value = value;
    this.args = args;
  }
}
class EmitEvent {
  constructor({ key, next, prev }) {
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}

export default Store;
