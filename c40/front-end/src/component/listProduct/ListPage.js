import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/listProduct.css';
import DataList from './DataList';

class ListPage extends Component {
  render() {
    return (


      <div className="container">
      <br />
      <NavLink className="btn btn-primary" to='/addForm'> Add Ads </NavLink>
      <br /><br />

      <DataList />

      <nav aria-label="Page navigation example">
      <ul className="pagination">
      <li className="page-item"><a className="page-link" href="#">Previous</a></li>
      <li className="page-item"><a className="page-link" href="#">1</a></li>
      <li className="page-item"><a className="page-link" href="#">2</a></li>
      <li className="page-item"><a className="page-link" href="#">3</a></li>
      <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
      </nav>


      </div>


    );
  }
}

export default ListPage;
