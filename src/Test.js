import React from "react";
let count = 0;

export default class extends React.Component {
  count = 0;
  render() {
    return (
      <fieldset>
        {JSON.stringify(this.props)}{" "}
        <button onClick={this.props.action}>action</button>
        <p>{this.count++}</p>
      </fieldset>
    );
  }
}

// export default () => <p />;
