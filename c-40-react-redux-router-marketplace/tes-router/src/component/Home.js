import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      btn: {color: 'white'}
    }
  }

  render(){
    return(
      <div className="Home">
        <h1>Welcome to my portofolio website</h1>
        <p> Feel free to bowse around and learn more about me.</p>
        <NavLink className="btn btn-primary" to='/contact' style={this.state.btn}>Contact</NavLink>
      </div>
    );
  }
}

export default Home
