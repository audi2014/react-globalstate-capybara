// export class DispatchEvent {
//   constructor({ key, action, actionArgs, store }) {
//     this.key = key;
//     this.action = action;
//     this.actionArgs = actionArgs;
//     this.store = store;
//   }
//   emit(emitEvent) {
//     const { key, next, prev } = emitEvent;
//     const nextState = { ...this.store._state, [key]: next };
//     this.store._subscriptions.forEach(function([emit, keys]) {
//       if (keys.includes(key)) {
//         emit(emitEvent);
//       }
//     });
//     this.store._state = nextState;

//     delete this.key;
//     delete this.action;
//     delete this.actionArgs;
//     delete this.store;
//   }
// }
export class ActionEvent {
  constructor({ key, value, args }) {
    this.key = key;
    this.value = value;
    this.args = args;
  }
}
export class EmitEvent {
  constructor({ key, next, prev }) {
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}
