import { EmitEvent, ActionEvent } from "./events";

const dispatch = function(dispatchEvent) {
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
