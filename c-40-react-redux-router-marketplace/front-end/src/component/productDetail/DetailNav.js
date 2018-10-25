import React, { Component } from 'react';
import DetailSpec from './DetailSpec';

class DetailNav extends Component {
  render(){
    return(
      <div>
      <ul className="menu-items">
      <li className="active">Product Detail</li>
      <li>Testimony</li>
      </ul>

      <DetailSpec />

      </div>
    );
  }
}

export default DetailNav;
