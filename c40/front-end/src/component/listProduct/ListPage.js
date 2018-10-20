import React, { Component } from 'react';
import '../../css/listProduct.css';
import DataList from './DataList';

class ListPage extends Component {
  render() {
    return (


      <div className="container">
      <br />
      <button className="btn btn-primary"> Add Ads </button>
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
