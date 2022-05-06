import React, { Component } from 'react';
import '../../assets/css/spinner.css';

class Spinner extends Component<any, any> {
  render() {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}

export default Spinner;
