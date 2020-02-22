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
  removeDistanceActivity(activityId: number) {
    let self = this;
    this.props.apiService.RemoveDistanceActivity(activityId)
      .then(function (response: any) {
        let existingActivities: any[] = [...self.state.recentDistanceActivities];
        let indexToRemove: number = 0;
        for (let i: number = 0; i < existingActivities.length; i++) {
          if (existingActivities[i].id === activityId) {
            indexToRemove = i;
            break;
          }
        }
        if (indexToRemove !== -1) {
          existingActivities.splice(indexToRemove, 1);
          self.setState({ 'recentDistanceActivities': existingActivities })
        }
      })
      .catch(function (error: any) {
        alert(error);
      })
  }
  removeLiftingActivity(activityId: number) {
    let self = this;
    this.props.apiService.RemoveLiftingActivity(activityId)
      .then(function (response: any) {
        let existingActivities: any[] = [...self.state.recentLiftingActivities];
        let indexToRemove: number = 0;
        for (let i: number = 0; i < existingActivities.length; i++) {
          if (existingActivities[i].id === activityId) {
            indexToRemove = i;
            break;
          }
        }
        if (indexToRemove !== -1) {
          existingActivities.splice(indexToRemove, 1);
          self.setState({ 'recentLiftingActivities': existingActivities })
        }
      })
      .catch(function (error: any) {
        alert(error);
      })
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
          <h1 className="display-4 text-left">Activities</h1>
          <p className="text-left">Loading...</p>
        </div>
      );
    }
    else {
      return (
        <div className="Home-Component-Root">
          <h1 className="display-4 text-left">Distance Activities</h1>
          <DistanceActivitiesTable activities={this.state.recentDistanceActivities} onRemoved={this.removeDistanceActivity.bind(this)} />

          <h1 className="display-4 text-left">Lifting Activities</h1>
          <LiftingActivitiesTable activities={this.state.recentLiftingActivities} onRemoved={this.removeLiftingActivity.bind(this)} />
        </div>
      );
    }
  }
}

export default Home;