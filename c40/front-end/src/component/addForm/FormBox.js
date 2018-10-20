import React, { Component } from 'react';
import AddForm from './Form';

class FormBox extends Component{
  render() {
    return (
      <div className="container"><br />
      <div className="panel panel-primary">
      <div className="panel-heading">Add Ads</div>
      <div className="panel-body">
      <AddForm />
      </div>
      </div>
      </div>
    );
  }
}

export default FormBox;
