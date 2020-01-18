import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">

            </Route>
            <Route exact path="/new-activity">

            </Route>
            <Route exact path="/reporting">

            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
