import React from "react";
import RangeCounter from "./RangeCounter";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", displayRangeCounter: false };
    this.toggleRangeCounterDisplay = this.toggleRangeCounterDisplay.bind(this);
  }

  fetchUserInfo = () => {
    return Promise.resolve({
      firstName: "Nithyalakshmi",
      lastName: "Kamalakkannan"
    })
  };

  componentDidMount() {
    this.fetchUserInfo().then((res) => {
      this.setState({
        name: `${res.firstName} ${res.lastName}`
      });
    });
  }

  toggleRangeCounterDisplay = () => {
    this.setState({
      displayRangeCounter: !this.state.displayRangeCounter
    })
    console.log(this.state.displayRangeCounter);
  }
  
  render() {
    return (
      <div className="App">
        <h1>Welcome to RTL</h1>
        <h4>Signed in as <em className="user-name">{this.state.name}</em></h4> 
        <button onClick={this.toggleRangeCounterDisplay}>{this.state.displayRangeCounter ? 'Close' : 'Open'} Range counter</button>
        {this.state.displayRangeCounter &&
        <RangeCounter
          min={4}
          max={10}
        />
        }
      </div>
    );
  }
}

export default App;
