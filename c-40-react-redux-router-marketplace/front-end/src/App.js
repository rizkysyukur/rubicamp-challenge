import React, { Component } from 'react';
import './css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import List from './component/listProduct/ListPage';
import Form from './component/addForm/FormBox';
import Detail from './component/productDetail/DetailContainer';


class App extends Component {
  render() {
    return (
      <div>
      <Switch>
      <Route exact path='/' component={List}></Route>
      <Route exact path='/addForm' component={Form}></Route>
      <Route exact path='/productDetail' component={Detail}></Route>
      </Switch>

      </div>
    );
  }
}


export default App;
