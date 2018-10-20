import React, { Component } from 'react';
import '../../css/productDetail.css';
import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';
import DetailNav from './DetailNav';

class DetailContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      style1 : {border:'0px solid gray'}
    }
  }

  render(){
    return(
      <div className="container">
      <div className="row">

      <div className="col-xs-4 item-photo">
      <DetailImage />
      </div>

      <div className="col-xs-5" style={this.state.style1}>
      <DetailInfo />
      </div>

      <div className="col-xs-9">
      <DetailNav />
      </div>

      </div>
      </div>
    );
  }
}

export default DetailContainer;
