import React from "react";

export class View extends React.Component {
  count = 0;
  render() {
    const { actions = {}, ...props } = this.props;
    return (
      <fieldset>
        {JSON.stringify(props)} <br />
        {Object.keys(actions).map(k => (
          <button key={k} onClick={actions[k]}>
            {k}
          </button>
        ))}
        <p>rendered:{this.count++}</p>
      </fieldset>
    );
  }
}

export class Router extends React.Component {
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
