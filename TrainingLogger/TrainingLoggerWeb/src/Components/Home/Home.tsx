import React from 'react';
import DistanceActivitiesTable from '../DistanceActivitiesTable/DistanceActivitiesTable';
import IHomeProps from './IHomeProps';
import IHomeState from './IHomeState';
import './Home.css';
import LiftingActivitiesTable from '../LiftingActivitiesTable/LiftingActivitiesTable';

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      recentDistanceActivities: [],
      recentLiftingActivities: [],
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
          'recentDistanceActivities': response.distanceActivities,
          'recentLiftingActivities': response.liftingActivities
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
        <div className="Home-Component-Root">
          <h1 className="display-4 text-left">Recent Activities</h1>
          <p className="text-left">Loading...</p>
        </div>
      );
    }
    else {
      return (
        <div className="Home-Component-Root">
          <h1 className="display-4 text-left">Recent Distance Activities</h1>
          <DistanceActivitiesTable activities={this.state.recentDistanceActivities} />

          <h1 className="display-4 text-left">Recent Lifting Activities</h1>
          <LiftingActivitiesTable activities={this.state.recentLiftingActivities} />
        </div>
      );
    }
  }
}

export default Home;