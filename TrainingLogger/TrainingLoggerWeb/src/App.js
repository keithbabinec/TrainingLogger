import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import NewActivity from './Components/NewActivity/NewActivity';
import Reporting from './Components/Reporting/Reporting';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/new-activity">
              <NewActivity />
            </Route>
            <Route path="/reporting">
              <Reporting />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
