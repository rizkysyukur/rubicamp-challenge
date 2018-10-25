timport React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class DataList extends Component{
  render(){
    let

    return(
      <div id="products" className="row view-group">


        <div className="item col-xs-4 col-lg-4">
        <div className="thumbnail card">

        <div className="img-event">
        <img className="group list-group-image img-fluid" src={require('../../img/productImage.png')} alt="" />
        </div>

        <div className="caption card-body">
        <h4 className="group card-title inner list-group-item-heading"><b>Product Title</b></h4>
        <p className="group inner list-group-item-text">
        Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.</p>
        <div>
        <span className="fa fa-star fa-lg"></span>
        <span className="fa fa-star fa-lg"></span>
        <span className="fa fa-https://www.google.co.id/star fa-lg"></span>
        <span className="fa fa-star fa-lg"></span>
        <span className="fa fa-star-o fa-lg"></span>
        </div>

        <div className="row">

        <div className="col-xs-12 col-md-6">
        <h3 className="group card-title inner list-group-item-heading">Rp.3.990.000</h3>
        </div>

        </div>

        <div className="row text-right">

        <div className="col-xs-12 col-md-12">
        <NavLink className="btn btn-success" to='/productDetail'>Add to cart</NavLink>
        </div>

        </div>

        </div>

        </div>
        </div>





      </div>

    );
  }
}

export default DataList;
