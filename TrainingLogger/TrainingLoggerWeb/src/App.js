import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        Logged in as {this.props.user}
      </div>
    );
  }
}

export default App;
