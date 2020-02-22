import React from 'react';
import moment from 'moment';
import convert from 'convert-units';
import DistanceActivityType from '../../Models/DistanceActivityType';
import DistancePurposeType from '../../Models/DistancePurposeType';
import LiftingActivityType from '../../Models/LiftingActivityType';
import LiftingPurposeType from '../../Models/LiftingPurposeType';
import LiftingFocusArea from '../../Models/LiftingFocusArea';
import SurfaceType from '../../Models/SurfaceType';
import HrZoneType from '../../Models/HrZoneType';
import IHomeProps from './IHomeProps';
import IHomeState from './IHomeState';
import './Home.css';

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

      let distanceRows = [];
      
      if (this.state.recentDistanceActivities && this.state.recentDistanceActivities.length) {
        for (let i = 0; i < this.state.recentDistanceActivities.length; i++) {
          let item = this.state.recentDistanceActivities[i] as any;
  
          distanceRows.push(
            <tr>
              <td>{moment(item.date).format('YYYY-MM-DD')}</td>
              <td>{DistanceActivityType[item.type]}</td>
              <td>{DistancePurposeType[item.purpose]}</td>
              <td>{SurfaceType[item.surface]}</td>
              <td>{item.duration}</td>
              <td>{(convert(parseInt(item.distanceInMeters)).from('m').to('mi')).toFixed(2)}</td>
              <td>{HrZoneType[item.averageIntensity]}</td>
              <td>{item.elevationGain}</td>
              <td>{item.elevationLoss}</td>
            </tr>
          );
        }
      }

      if (distanceRows.length === 0) {
        // push an empty row to indicate we have no activities yet.
        distanceRows.push(
          <tr>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
          </tr>
        );
      }

      let liftingRows = [];
      
      if (this.state.recentLiftingActivities && this.state.recentLiftingActivities.length) {
        for (let i = 0; i < this.state.recentLiftingActivities.length; i++) {
          let item = this.state.recentLiftingActivities[i] as any;
  
          liftingRows.push(
            <tr>
              <td>{moment(item.date).format('YYYY-MM-DD')}</td>
              <td>{LiftingActivityType[item.type]}</td>
              <td>{LiftingPurposeType[item.purpose]}</td>
              <td>{LiftingFocusArea[item.focusArea]}</td>
              <td>{item.duration}</td>
              <td>{HrZoneType[item.averageIntensity]}</td>
            </tr>
          );
        }
      }

      if (liftingRows.length === 0) {
        // push an empty row to indicate we have no activities yet.
        liftingRows.push(
          <tr>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
          </tr>
        );
      }

      return (
        <div className="Home-Component-Root">
          <h1 className="display-4 text-left">Recent Distance Activities</h1>
          <table className="table table-sm table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Surface</th>
                <th scope="col">Duration</th>
                <th scope="col">Distance <i>(Miles)</i></th>
                <th scope="col">Intensity</th>
                <th scope="col">Gain <i>(Ft)</i></th>
                <th scope="col">Loss <i>(Ft)</i></th>
              </tr>
            </thead>
            <tbody>
              {distanceRows}
            </tbody>
          </table>
          <h1 className="display-4 text-left">Recent Lifting Activities</h1>
          <table className="table table-sm table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Focus Area</th>
                <th scope="col">Duration</th>
                <th scope="col">Intensity</th>
              </tr>
            </thead>
            <tbody>
              {liftingRows}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Home;