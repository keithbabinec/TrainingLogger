import React from 'react';
import './NewActivity.css';

class NewActivity extends React.Component {
  render() {
    return (
      <div className="NewActivity">
        <form>
          <div class="form-group">
            <label for="dateSelection">Date</label>
            <input type="text" class="form-control" id="dateSelection" />
          </div>
          <div class="form-group">
            <label for="activitySelectField">Activity</label>
            <select class="form-control" id="activitySelectField">
              <option>Run</option>
              <option>Hike</option>
              <option>Cycle</option>
            </select>
          </div>
          <div class="form-group">
            <label for="purposeSelectField">Purpose</label>
            <select class="form-control" id="purposeSelectField">
              <option>Training</option>
              <option>Race</option>
              <option>Leasure</option>
            </select>
          </div>
          <div class="form-group">
            <label for="surfaceSelectField">Surface Type</label>
            <select class="form-control" id="surfaceSelectField">
              <option>Road</option>
              <option>Trail</option>
              <option>Track</option>
              <option>Treadmill</option>
              <option>Stepper</option>
            </select>
          </div>
          <div class="form-group">
            <label for="durationSelection">Duration</label>
            <input type="text" class="form-control" id="durationSelection" />
          </div>
          <div class="form-group">
            <label for="distanceSelection">Distance</label>
            <input type="text" class="form-control" id="distanceSelection" />
          </div>
          <div class="form-group">
            <label for="averageIntensityField">Intensity (Average)</label>
            <select class="form-control" id="averageIntensityField">
              <option>Zone1</option>
              <option>Zone2</option>
              <option>Zone3</option>
              <option>Zone4</option>
              <option>Zone5</option>
            </select>
          </div>
          <div class="form-group">
            <label for="elevationGainSelection">Elevation Gain</label>
            <input type="text" class="form-control" id="elevationGainSelection" />
          </div>
          <div class="form-group">
            <label for="elevationLossSelection">Elevation Loss</label>
            <input type="text" class="form-control" id="elevationLossSelection" />
          </div>
          <div class="form-group">
            <label for="notesSelection">Optional Notes</label>
            <textarea class="form-control" id="notesSelection" rows="3"></textarea>
          </div>
        </form>
      </div>
    );
  }
}

export default NewActivity;