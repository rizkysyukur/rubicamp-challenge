import React, { Component } from 'react';
import './css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ListProduct from './component/listProduct/ListPage';
import AddForm from './component/addForm/FormBox';

class App extends Component {
  render() {
    return (
      <AddForm />
    );
  }
}

export default App;
