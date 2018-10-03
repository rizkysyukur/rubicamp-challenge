import React from 'react';
import './style.css';

export default class Chat extends React.Component{
  render(){
    return(
      <li>
      <a href="#">{this.props.name}</a>
      <p>{this.props.content}</p>
      </li>
    )
  }
}
