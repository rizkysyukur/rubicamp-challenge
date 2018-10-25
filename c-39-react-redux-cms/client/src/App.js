import React, {Component} from 'react';
import * as redux from 'redux';
import {connect} from 'react-redux';
import AppTextInput from './components/AppTextInput';
import ListItem from './components/ListItem';
import * as AppActions from './action';
import './css/bootstrap.min.css';


class App extends Component {
  componentDidMount(){
    this.props.actions.loadPhoneBooks();
  }

  render() {
    const {data, actions} = this.props
    return (
      <div className="container">
      <div className="row">
      <div className="well text-center"><h1>Phone Book Apps</h1></div>
      </div>
      <div className="row">
      <AppTextInput name="" phone="" onSave={actions.addPhoneBook} />
      </div>
      <ListItem data={data} actions={actions} />
      </div>
    )}
  }

  function mapStateToProps(state){
    return{
      data: state.data
    }
  }

  function mapDispatchToProps(dispatch){
    return{
      actions: redux.bindActionCreators(AppActions, dispatch)
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
