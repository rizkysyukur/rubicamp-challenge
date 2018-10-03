import React from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import './style.css';
import socketIOClient from "socket.io-client";


export default class ChatBox extends React.Component{
  constructor(props){
    super(props);
    this.state = { data: [] };
    this.addChat = this.addChat.bind(this);
    this.socket = socketIOClient("http://localhost:3000");
  }

  componentDidMount() {
    this.socket.on("messages", data => {
      console.log("data baru", data);
      this.setState({ data: data })
    });
  }

  addChat(item){
    this.setState(state => ({
      data: [...state.data, item]
    }));
    this.socket.emit("addData", item);
  }

  render(){
    return(
      <div className="container">

      <div className="row"><div className="col-md-8 offset-md-2">

      <div className="card">
      <div className="card-header text-center"><h2>React Chat</h2></div>
      <div className="card-body">

      <div className="card"><div className="card-body">
      <ChatList data={this.state.data} />
      </div></div>

      <br /><ChatForm addChat={this.addChat} />

      </div></div>

      </div></div>

      </div>
    );
  }
}
