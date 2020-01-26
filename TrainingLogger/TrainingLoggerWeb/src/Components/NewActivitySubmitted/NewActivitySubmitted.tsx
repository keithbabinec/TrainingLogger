import React from 'react';
import INewActivitySubmittedProps from './INewActivitySubmittedProps';
import './NewActivitySubmitted.css';

class NewActivitySubmitted extends React.Component<INewActivitySubmittedProps, {}> {
  render() {
    return (
      <div className="NewActivitySubmitted">
          Activity submitted!
      </div>
    );
  }
}

export default NewActivitySubmitted;