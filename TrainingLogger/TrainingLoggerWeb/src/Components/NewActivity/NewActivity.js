import React from 'react';
import moment from 'moment';
import './NewActivity.css';

class NewActivity extends React.Component {
  constructor() {
    super();

    // provide default values
    this.state = {
      'dateSelectionField': moment().format('YYYY-MM-DD'),
      'durationSelection': '00:00:00',
      'distanceSelection': 0,
      'elevationGainSelection': 0,
      'elevationLossSelection': 0,
      'notesSelectionField': ''
    }
  }
  onFormFieldChanged = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="New-Activity-Component-Root">
        <h1 className="display-4 text-left">New Activity</h1>
        <form className="New-Activity-Submission-Form">
          <div className="form-group row">
            <label htmlFor="dateSelectionField" className="col-sm-2 col-form-label col-form-label-sm">Date</label>
            <div className="col-sm-10">
              <input type="date" className="form-control form-control-sm" id="dateSelectionField" name="dateSelectionField" value={this.state.dateSelectionField} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="activitySelectField" className="col-sm-2 col-form-label col-form-label-sm">Activity</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="activitySelectField" name="activitySelectField" value={this.state.activitySelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>Run</option>
                <option>Hike</option>
                <option>Cycle</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="purposeSelectField" className="col-sm-2 col-form-label col-form-label-sm">Purpose</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="purposeSelectField" name="purposeSelectField" value={this.state.purposeSelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>Training</option>
                <option>Race</option>
                <option>Leasure</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="surfaceSelectField" className="col-sm-2 col-form-label col-form-label-sm">Surface</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="surfaceSelectField" name="surfaceSelectField" value={this.state.surfaceSelectField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>Road</option>
                <option>Trail</option>
                <option>Track</option>
                <option>Treadmill</option>
                <option>Stepper</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="durationSelection" className="col-sm-2 col-form-label col-form-label-sm">Duration</label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-sm" id="durationSelection" name="durationSelection" value={this.state.durationSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="distanceSelection" className="col-sm-2 col-form-label col-form-label-sm">Distance</label>
            <div className="col-sm-10">
              <input type="number" className="form-control form-control-sm" id="distanceSelection" name="distanceSelection" value={this.state.distanceSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="averageIntensityField" className="col-sm-2 col-form-label col-form-label-sm">Intensity</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="averageIntensityField" name="averageIntensityField" value={this.state.averageIntensityField} onChange={(value) => this.onFormFieldChanged(value)} >
                <option>Zone1</option>
                <option>Zone2</option>
                <option>Zone3</option>
                <option>Zone4</option>
                <option>Zone5</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="elevationGainSelection" className="col-sm-2 col-form-label col-form-label-sm">Gain</label>
            <div className="col-sm-10">
              <input type="number" className="form-control form-control-sm" id="elevationGainSelection" name="elevationGainSelection" value={this.state.elevationGainSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="elevationLossSelection" className="col-sm-2 col-form-label col-form-label-sm">Loss</label>
            <div className="col-sm-10">
              <input type="number" className="form-control form-control-sm" id="elevationLossSelection" name="elevationLossSelection" value={this.state.elevationLossSelection} onChange={(value) => this.onFormFieldChanged(value)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="notesSelectionField" className="col-sm-2 col-form-label col-form-label-sm">Notes</label>
            <div className="col-sm-10">
              <textarea className="form-control form-control-sm" id="notesSelectionField" name="notesSelectionField" rows="3" value={this.state.notesSelectionField} onChange={(value) => this.onFormFieldChanged(value)} ></textarea>
            </div>
          </div>
          <button className="btn btn-primary New-Activity-Submit-Button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default NewActivity;