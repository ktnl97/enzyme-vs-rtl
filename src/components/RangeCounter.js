import React, { Component } from "react";
import PropTypes from "prop-types";

class RangeCounter extends Component {
  constructor(props) {
    super(props);
    const { min, max } = props;
    this.state = {
      counter: Math.floor((min + max) / 2)
    };

    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  incrementCounter() {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  }

  decrementCounter() {
    const { counter } = this.state;
    this.setState({ counter: counter - 1 });
  }

  render() {
    const { max, min } = this.props;
    return (
      <div className="RangeCounter">
        <span className="RangeCounter__title">RangeCounter</span>
        <div className="RangeCounter__controls">
          <button
            disabled={this.state.counter === min}
            onClick={this.decrementCounter}
          >
            Decrement
          </button>
          <span data-testid="counter-value">{this.state.counter}</span>
          <button
            disabled={this.state.counter === max}
            onClick={this.incrementCounter}
          >
            Increment
          </button>
        </div>
        {(this.state.counter === max || this.state.counter === min) && (
            <span className="RangeCounter__alert">Range limit reached!</span>
          )}
      </div>
    );
  }
}

RangeCounter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};

RangeCounter.defaultProps = {
  min: 0,
  max: 10
};

export default RangeCounter;
