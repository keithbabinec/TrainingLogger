import React from 'react';
import IHomeProps from './IHomeProps';
import './Home.css';

class Home extends React.Component<IHomeProps, {}> {
  render() {
    return (
      <div className="Home">
          Home view
      </div>
    );
  }
}

export default Home;