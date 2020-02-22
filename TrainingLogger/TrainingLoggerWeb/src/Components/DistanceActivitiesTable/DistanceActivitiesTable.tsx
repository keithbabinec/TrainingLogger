import React from 'react';
import moment from 'moment';
import convert from 'convert-units';
import DistanceActivityType from '../../Models/DistanceActivityType';
import DistancePurposeType from '../../Models/DistancePurposeType';
import SurfaceType from '../../Models/SurfaceType';
import HrZoneType from '../../Models/HrZoneType';
import IDistanceActivitiesTableProps from './IDistanceActivitiesTableProps';
import './DistanceActivitiesTable.css';

class DistanceActivitiesTable extends React.Component<IDistanceActivitiesTableProps, any> {
  render() {

    let distanceRows = [];
      
    if (this.props.activities && this.props.activities.length) {
        for (let i = 0; i < this.props.activities.length; i++) {
            let item = this.props.activities[i] as any;

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
                    <td><button className="btn btn-secondary Remove-Activity-Submit-Button" onClick={() => this.props.onRemoved(item.id)}>Delete</button></td>
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
                <th scope="col">Surface</th>
                <th scope="col">Duration</th>
                <th scope="col">Distance <i>(Miles)</i></th>
                <th scope="col">Intensity</th>
                <th scope="col">Gain <i>(Ft)</i></th>
                <th scope="col">Loss <i>(Ft)</i></th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {distanceRows}
            </tbody>
        </table>
    );
  }
}

export default DistanceActivitiesTable;