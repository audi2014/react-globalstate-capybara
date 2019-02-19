import React from "react";

export const mapValue = function(key, nextValue, prevValue) {
  return nextValue;
};
export const mapStateToProps = function(state) {
  return state;
};

export default function(
  Component,
  { subscribe, unsubscribe },
  storeprops = [],
  builder = {}
) {
  const _mapValue = builder.mapValue || mapValue;
  const _mapStateToProps = builder.mapStateToProps || mapStateToProps;

  return class withStoreSubscribtion extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      this.subsHandle = subscribe(this.handleChange, storeprops);
    }

    componentWillUnmount() {
      unsubscribe(this.subsHandle);
    }

    handleChange({ key, next, prev }) {
      this.setState({
        [key]: _mapValue(key, next, prev)
      });
    }

    render() {
      return React.createElement(Component, {
        ...this.props,
        ..._mapStateToProps(this.state)
      });
    }
  };
}
