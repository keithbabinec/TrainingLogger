import React from 'react';
import moment from 'moment';
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
          'recentActivities': response
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

      let rows = [];
      
      if (this.state.recentActivities && this.state.recentActivities.length) {
        for (let i = 0; i < this.state.recentActivities.length; i++) {
          let item = this.state.recentActivities[i] as any;
  
          rows.push(
            <tr>
              <td>{moment(item.date).format('YYYY-MM-DD')}</td>
              <td>{item.type}</td>
              <td>{item.purpose}</td>
              <td>{item.surface}</td>
              <td>{item.duration}</td>
              <td>{item.distanceInMeters}</td>
              <td>{item.averageIntensity}</td>
              <td>{item.elevationGain}</td>
              <td>{item.elevationLoss}</td>
            </tr>
          );
        }
      }

      if (rows.length === 0) {
        // push an empty row to indicate we have no activities yet.
        rows.push(
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
          <h1 className="display-4 text-left">Recent Activities</h1>
          <table className="table table-sm table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Surface</th>
                <th scope="col">Duration</th>
                <th scope="col">Distance</th>
                <th scope="col">Intensity</th>
                <th scope="col">Gain</th>
                <th scope="col">Loss</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Home;