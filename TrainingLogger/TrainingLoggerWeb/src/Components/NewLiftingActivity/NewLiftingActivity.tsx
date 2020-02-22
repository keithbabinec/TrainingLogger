import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import LiftingActivityType from '../../Models/LiftingActivityType';
import LiftingPurposeType from '../../Models/LiftingPurposeType';
import LiftingFocusArea from '../../Models/LiftingFocusArea';
import HrZoneType from '../../Models/HrZoneType';
import ModelTranslatorService from '../../Services/ModelTranslatorService';
import INewLiftingActivityProps from './INewLiftingActivityProps';
import INewLiftingActivityState from './INewLiftingActivityState';
import './NewLiftingActivity.css';

class NewLiftingActivity extends React.Component<INewLiftingActivityProps, INewLiftingActivityState> {
  constructor(props: INewLiftingActivityProps) {
    super(props);

    // provide default values
    this.state = {
      'dateSelectionField': moment().format('YYYY-MM-DD'),
      'durationSelection': '00:00:00',
      'notesSelectionField': '',
      'activitySelectField': LiftingActivityType[LiftingActivityType.Powerlifting],
      'focusSelectField': LiftingFocusArea[LiftingFocusArea.FullBody],
      'averageIntensityField': HrZoneType[HrZoneType.Zone1],
      'purposeSelectField': LiftingPurposeType[LiftingPurposeType.Training],
      'submissionCompleted': false,
      'submissionInProgress': false
    }
  }
  onFormFieldChanged = (e: any) => {
    this.setState(
      { 
        [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
      } as Pick<INewLiftingActivityState, keyof INewLiftingActivityState>
    );
  }
  onSubmitClicked = (e: any) => {
    e.preventDefault();

    this.setState({ 'submissionInProgress': true });

    // prepare and send new activity payload
    // convert the form model (state) into a request model object.
    let modelTranslator = new ModelTranslatorService(); 
    let newActivity = modelTranslator.INewLiftingActivityStateToILiftingActivity(this.state);

    // capture a reference to the current 'this' context.
    // use it to call setState() because after the callback
    // 'this' will be null.
    let self = this;

    // call the api
    this.props.apiService.AddLiftingActivity(newActivity)
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
        <h1 className="display-4 text-left">New Lifting Activity</h1>
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
                <option>{LiftingActivityType[LiftingActivityType.Powerlifting]}</option>
                <option>{LiftingActivityType[LiftingActivityType.Olympic]}</option>
                <option>{LiftingActivityType[LiftingActivityType.Strongman]}</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="purposeSelectField" className="col-sm-4 col-form-label col-form-label-sm">Purpose</label>
            <div className="col-sm-8">
              <select className="form-control form-control-sm" id="purposeSelectField" name="purposeSelectField" value={this.state.purposeSelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>{LiftingPurposeType[LiftingPurposeType.Training]}</option>
                <option>{LiftingPurposeType[LiftingPurposeType.Event]}</option>
                <option>{LiftingPurposeType[LiftingPurposeType.Leisure]}</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="focusSelectField" className="col-sm-4 col-form-label col-form-label-sm">Focus Area</label>
            <div className="col-sm-8">
              <select className="form-control form-control-sm" id="focusSelectField" name="focusSelectField" value={this.state.focusSelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>{LiftingFocusArea[LiftingFocusArea.FullBody]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Push]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Pull]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Legs]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Arms]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Chest]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Back]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Shoulders]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Core]}</option>
                <option>{LiftingFocusArea[LiftingFocusArea.Other]}</option>
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

export default NewLiftingActivity;