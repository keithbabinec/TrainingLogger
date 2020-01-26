import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../../Components/Home/Home';
import NewActivity from '../../Components/NewActivity/NewActivity';
import NewActivitySubmitted from '../../Components/NewActivitySubmitted/NewActivitySubmitted';
import Reporting from '../../Components/Reporting/Reporting';
import IAppProps from './IAppProps';
import './App.css';

class App extends React.Component<IAppProps, {}> {
  render() {
    let username = this.props.user;

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
              <ul className="navbar-nav ml-auto">
                <li className="nav-item Nav-Text-Only">
                  Logged In: {username}
                </li>
              </ul>
            </div>
          </nav>
          <div>
            <Switch>
              <Route path="/new-activity">
                <NewActivity apiService={this.props.apiService} settings={this.props.settings} />
              </Route>
              <Route path="/new-activity-submitted">
                <NewActivitySubmitted apiService={this.props.apiService} settings={this.props.settings} />
              </Route>
              <Route path="/reporting">
                <Reporting apiService={this.props.apiService} settings={this.props.settings} />
              </Route>
              <Route path="/">
                <Home apiService={this.props.apiService} settings={this.props.settings} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
