import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import NewActivity from './Components/NewActivity/NewActivity';
import Reporting from './Components/Reporting/Reporting';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/new-activity" className="nav-link">New Activity</Link>
                </li>
                <li className="nav-item">
                  <Link to="/reporting" className="nav-link">Reporting</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div>
            <Switch>
              <Route path="/new-activity">
                <NewActivity />
              </Route>
              <Route path="/reporting">
                <Reporting />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
