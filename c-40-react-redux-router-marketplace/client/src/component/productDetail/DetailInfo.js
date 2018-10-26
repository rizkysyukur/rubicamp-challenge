import React, { Component } from 'react';

class DetailInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      style2 : {marginTop:'15px'},
      style3 : {width:'25px', background:'#5a5a5a'},
      style4 : {width:'25px', background:'white'},
      style5 : {paddingBottom:'5px'},
      style6 : {paddingBottom:'20px'},
      style7 : {marginRight:'20px'},
      style8 : {cursor: 'pointer'},
    }
  }

  render() {
    return(
      <div>
      <h3>Samsung Galaxy S4 I337 16GB 4G LTE Unlocked GSM Android Cell Phone</h3>
      <h5>Brand <u>Samsung</u> · <small>(5054 votes)</small></h5>
      <h6 className="title-price"><small>PRICE</small></h6>
      <h3>Rp.3.990.000,-</h3>

      <div className="section">
      <h6 className="title-attr" style={this.state.style2} ><small>COLOR</small></h6>
      <div>
      <div className="attr" style={this.state.style3}></div>
      <div className="attr" style={this.state.style4}></div>
      </div>
      </div>

      <div className="section" style={this.state.style5}>
      <h6 className="title-attr"><small>CAPACITY</small></h6>
      <div>
      <div className="attr2">16 GB</div>
      <div className="attr2">32 GB</div>
      </div>
      </div>

      <div className="section" style={this.state.style6}>
      <h6 className="title-attr"><small>CTY</small></h6>
      <div>
      <div className="btn-minus"><span className="glyphicon glyphicon-minus"></span></div>
      <input value="1" />
      <div className="btn-plus"><span className="glyphicon glyphicon-plus"></span></div>
      </div>
      </div>

      <div className="section" style={this.state.style7}>
      <button className="btn btn-success"><span style={this.state.style7} className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Buy</button>
      <h6><u><span className="glyphicon glyphicon-heart-empty" style={this.state.style8}></span> Like</u></h6>
      </div>

      </div>
    );
  }
}

export default DetailInfo;
