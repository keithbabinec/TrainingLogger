import React from 'react';
import './NewActivity.css';

class NewActivity extends React.Component {
  render() {
    return (
      <div className="New-Activity-Component-Root">
        <h1 className="display-4 text-left">New Activity</h1>
        <form className="New-Activity-Submission-Form">
          <div className="form-group row">
            <label htmlFor="dateSelection" className="col-sm-2 col-form-label col-form-label-sm">Date</label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-sm" id="dateSelection" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="activitySelectField" className="col-sm-2 col-form-label col-form-label-sm">Activity</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="activitySelectField">
                <option>Run</option>
                <option>Hike</option>
                <option>Cycle</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="purposeSelectField" className="col-sm-2 col-form-label col-form-label-sm">Purpose</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="purposeSelectField">
                <option>Training</option>
                <option>Race</option>
                <option>Leasure</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="surfaceSelectField" className="col-sm-2 col-form-label col-form-label-sm">Surface</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="surfaceSelectField">
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
              <input type="text" className="form-control form-control-sm" id="durationSelection" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="distanceSelection" className="col-sm-2 col-form-label col-form-label-sm">Distance</label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-sm" id="distanceSelection" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="averageIntensityField" className="col-sm-2 col-form-label col-form-label-sm">Intensity</label>
            <div className="col-sm-10">
              <select className="form-control form-control-sm" id="averageIntensityField">
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
              <input type="text" className="form-control form-control-sm" id="elevationGainSelection" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="elevationLossSelection" className="col-sm-2 col-form-label col-form-label-sm">Loss</label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-sm" id="elevationLossSelection" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="notesSelection" className="col-sm-2 col-form-label col-form-label-sm">Notes</label>
            <div className="col-sm-10">
              <textarea className="form-control form-control-sm" id="notesSelection" rows="3"></textarea>
            </div>
          </div>
          <button className="btn btn-primary New-Activity-Submit-Button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default NewActivity;