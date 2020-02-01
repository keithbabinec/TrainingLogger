import React from 'react';
import IReportingProps from './IReportingProps';
import './Reporting.css';

class Reporting extends React.Component<IReportingProps, {}> {
  render() {
    return (
      <div className="Reporting-Root">
        <h1 className="display-4 text-left">Reporting</h1>
      </div>
    );
  }
}

export default Reporting;