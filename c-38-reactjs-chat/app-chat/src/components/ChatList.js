import React from 'react';
import Chat from './Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ChatList extends React.Component{
  render(){
    return (
      <ul className="timeline">

      { this.props.data.map(item => (
        <Chat key={item.id} name={item.name} content={item.content} />
      )) }

      </ul>
    )
  }
}
