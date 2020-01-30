import React from 'react';
import IHomeProps from './IHomeProps';
import IHomeState from './IHomeState';
import './Home.css';

class Home extends React.Component<IHomeProps, IHomeState> {
  render() {
    return (
      <div className="Home">
          Home view
      </div>
    );
  }
}

export default Home;