import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import ActivityType from '../../Models/ActivityType';
import PurposeType from '../../Models/PurposeType';
import SurfaceType from '../../Models/SurfaceType';
import HrZoneType from '../../Models/HrZoneType';
import ModelTranslatorService from '../../Services/ModelTranslatorService';
import INewActivityProps from './INewActivityProps';
import INewActivityState from './INewActivityState';
import './NewActivity.css';

class NewActivity extends React.Component<INewActivityProps, INewActivityState> {
  constructor(props: INewActivityProps) {
    super(props);

    // provide default values
    this.state = {
      'dateSelectionField': moment().format('YYYY-MM-DD'),
      'durationSelection': '00:00:00',
      'distanceSelection': '0.0',
      'elevationGainSelection': 0,
      'elevationLossSelection': 0,
      'notesSelectionField': '',
      'activitySelectField': ActivityType[ActivityType.Run],
      'surfaceSelectField': SurfaceType[SurfaceType.Road],
      'averageIntensityField': HrZoneType[HrZoneType.Zone1],
      'purposeSelectField': PurposeType[PurposeType.Training],
      'submissionCompleted': false,
      'submissionInProgress': false
    }
  }
  onFormFieldChanged = (e: any) => {
    this.setState(
      { 
        [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
      } as Pick<INewActivityState, keyof INewActivityState>
    );
  }
  onSubmitClicked = (e: any) => {
    e.preventDefault();

    this.setState({ 'submissionInProgress': true });

    // prepare and send new activity payload
    // convert the form model (state) into a request model object.
    let modelTranslator = new ModelTranslatorService(); 
    let newActivity = modelTranslator.INewActivityStateToIActivity(this.state);

    // capture a reference to the current 'this' context.
    // use it to call setState() because after the callback
    // 'this' will be null.
    let self = this;

    // call the api
    this.props.apiService.AddActivity(newActivity)
      .then(function (response: any) {
        self.setState({
          'submissionCompleted': true,
          'submissionInProgress': false
        });
      })
      .catch(function (error: any) {
        alert(error);
        self.setState({ 'submissionInProgress': false });
      })
  }
  render() {
    if (this.state.submissionCompleted === true) {
      return <Redirect to='/new-activity-submitted' />
    }

    return (
      <div className="New-Activity-Component-Root">
        <h1 className="display-4 text-left">New Activity</h1>
        <form className="New-Activity-Submission-Form" onSubmit={this.onSubmitClicked}>
          <div className="form-group row">
            <label htmlFor="dateSelectionField" className="col-sm-4 col-form-label col-form-label-sm">Date</label>
            <div className="col-sm-8">
              <input type="date" className="form-control form-control-sm" id="dateSelectionField" name="dateSelectionField" value={this.state.dateSelectionField} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="activitySelectField" className="col-sm-4 col-form-label col-form-label-sm">Activity</label>
            <div className="col-sm-8">
              <select className="form-control form-control-sm" id="activitySelectField" name="activitySelectField" value={this.state.activitySelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>{ActivityType[ActivityType.Run]}</option>
                <option>{ActivityType[ActivityType.Hike]}</option>
                <option>{ActivityType[ActivityType.Cycle]}</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="purposeSelectField" className="col-sm-4 col-form-label col-form-label-sm">Purpose</label>
            <div className="col-sm-8">
              <select className="form-control form-control-sm" id="purposeSelectField" name="purposeSelectField" value={this.state.purposeSelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>{PurposeType[PurposeType.Training]}</option>
                <option>{PurposeType[PurposeType.Race]}</option>
                <option>{PurposeType[PurposeType.Leasure]}</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="surfaceSelectField" className="col-sm-4 col-form-label col-form-label-sm">Surface</label>
            <div className="col-sm-8">
              <select className="form-control form-control-sm" id="surfaceSelectField" name="surfaceSelectField" value={this.state.surfaceSelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>{SurfaceType[SurfaceType.Road]}</option>
                <option>{SurfaceType[SurfaceType.Trail]}</option>
                <option>{SurfaceType[SurfaceType.Track]}</option>
                <option>{SurfaceType[SurfaceType.Treadmill]}</option>
                <option>{SurfaceType[SurfaceType.Stepper]}</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="durationSelection" className="col-sm-4 col-form-label col-form-label-sm">Duration <i>(HH:MM:SS)</i></label>
            <div className="col-sm-8">
              <input type="text" className="form-control form-control-sm" id="durationSelection" name="durationSelection" value={this.state.durationSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="distanceSelection" className="col-sm-4 col-form-label col-form-label-sm">Distance <i>(Miles)</i></label>
            <div className="col-sm-8">
              <input type="text" className="form-control form-control-sm" id="distanceSelection" name="distanceSelection" value={this.state.distanceSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="averageIntensityField" className="col-sm-4 col-form-label col-form-label-sm">Average Intensity</label>
            <div className="col-sm-8">
              <select className="form-control form-control-sm" id="averageIntensityField" name="averageIntensityField" value={this.state.averageIntensityField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>{HrZoneType[HrZoneType.Zone1]}</option>
                <option>{HrZoneType[HrZoneType.Zone2]}</option>
                <option>{HrZoneType[HrZoneType.Zone3]}</option>
                <option>{HrZoneType[HrZoneType.Zone4]}</option>
                <option>{HrZoneType[HrZoneType.Zone5]}</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="elevationGainSelection" className="col-sm-4 col-form-label col-form-label-sm">Elevation Gain <i>(Ft)</i></label>
            <div className="col-sm-8">
              <input type="number" className="form-control form-control-sm" id="elevationGainSelection" name="elevationGainSelection" value={this.state.elevationGainSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="elevationLossSelection" className="col-sm-4 col-form-label col-form-label-sm">Elevation Loss <i>(Ft)</i></label>
            <div className="col-sm-8">
              <input type="number" className="form-control form-control-sm" id="elevationLossSelection" name="elevationLossSelection" value={this.state.elevationLossSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="notesSelectionField" className="col-sm-4 col-form-label col-form-label-sm">Optional Notes</label>
            <div className="col-sm-8">
              <textarea className="form-control form-control-sm" id="notesSelectionField" name="notesSelectionField" rows={3} value={this.state.notesSelectionField} onChange={(value) => this.onFormFieldChanged(value)} ></textarea>
            </div>
          </div>
          <button className="btn btn-primary New-Activity-Submit-Button" type="submit" disabled={this.state.submissionInProgress}>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewActivity;