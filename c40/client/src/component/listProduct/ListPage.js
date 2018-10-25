import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/listProduct.css';
import DataList from './DataList';
import * as redux from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../action';

class ListPage extends Component {
  componentDidMount(){
    this.props.actions.loadData();
  }

  render() {
    const { data, actions } = this.props;
    return (
      <div className="container">
      <br />
      <NavLink className="btn btn-primary" to='/addForm'> Add Ads </NavLink>
      <br /><br />

      <DataList data={data} />

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

function mapStateToProps(state){
  return{
    data: state.AllProduct
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: redux.bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage)
