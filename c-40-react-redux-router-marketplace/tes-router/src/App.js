import React, { Component } from 'react';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      btn: {color: 'white'}
    }
  }

  render(){
    return(
      <div>

      <nav>
      <ul>
      <li><NavLink to='/' >Home</NavLink></li>
      <li><NavLink to='/about' >About</NavLink></li>
      <li><NavLink to='/contact' >Contact</NavLink></li>
      </ul>
      </nav>
      


      <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/About' component={About}></Route>
      <Route exact path='/contact' component={Contact}></Route>
      </Switch>

      </div>
    );
  }
}

export default App;
