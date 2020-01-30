import React from 'react';
import IHomeProps from './IHomeProps';
import IHomeState from './IHomeState';
import './Home.css';

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      recentActivities: [],
      queryInProgress: false
    }
  }
  componentDidMount() {
    this.setState({ 'queryInProgress': true });

    // capture a reference to the current 'this' context.
    // use it to call setState() because after the callback
    // 'this' will be null.
    let self = this;

    // call the api
    this.props.apiService.GetActivitiesByUser()
      .then(function (response: any) {
        self.setState({
          'queryInProgress': false,
          'recentActivities': response.data
        });
      })
      .catch(function (error: any) {
        alert(error);
        self.setState({ 'queryInProgress': false });
      })
  }
  render() {
    if (this.state.queryInProgress) {
      return (
        <div className="Home">
          <h1>Loading recent activities...</h1>
        </div>
      );
    }
    else {
      return (
        <div className="Home">
        </div>
      );
    }
  }
}

export default Home;