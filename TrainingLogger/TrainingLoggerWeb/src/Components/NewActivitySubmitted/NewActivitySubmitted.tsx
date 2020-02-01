import React from 'react';
import INewActivitySubmittedProps from './INewActivitySubmittedProps';
import './NewActivitySubmitted.css';

class NewActivitySubmitted extends React.Component<INewActivitySubmittedProps, {}> {
  render() {
    return (
      <div className="NewActivitySubmitted">
        <h1 className="display-4 text-left">New Activity</h1>
        <p className="text-left">Activity submitted!</p>
      </div>
    );
  }
}

export default NewActivitySubmitted;