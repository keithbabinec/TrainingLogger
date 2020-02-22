import React from 'react';
import moment from 'moment';
import LiftingActivityType from '../../Models/LiftingActivityType';
import LiftingPurposeType from '../../Models/LiftingPurposeType';
import LiftingFocusArea from '../../Models/LiftingFocusArea';
import HrZoneType from '../../Models/HrZoneType';
import ILiftingActivitiesTableProps from './ILiftingActivitiesTableProps';
import './LiftingActivitiesTable.css';

class LiftingActivitiesTable extends React.Component<ILiftingActivitiesTableProps, any> {
  render() {

    let liftingRows = [];
      
      if (this.props.activities && this.props.activities.length) {
        for (let i = 0; i < this.props.activities.length; i++) {
          let item = this.props.activities[i] as any;
  
          liftingRows.push(
            <tr>
              <td>{moment(item.date).format('YYYY-MM-DD')}</td>
              <td>{LiftingActivityType[item.type]}</td>
              <td>{LiftingPurposeType[item.purpose]}</td>
              <td>{LiftingFocusArea[item.focusArea]}</td>
              <td>{item.duration}</td>
              <td>{HrZoneType[item.averageIntensity]}</td>
              <td><button className="btn btn-secondary Remove-Activity-Submit-Button" onClick={() => this.props.onRemoved(item.id)}>Delete</button></td>
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
          </tr>
        );
      }
    
    return (
        <table className="table table-sm table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Focus Area</th>
                <th scope="col">Duration</th>
                <th scope="col">Intensity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
                {liftingRows}
            </tbody>
        </table>
    );
  }
}

export default LiftingActivitiesTable;