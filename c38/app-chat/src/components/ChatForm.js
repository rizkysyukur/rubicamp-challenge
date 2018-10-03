import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default class ChatForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { name: '', content: '' };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeContent(e) {
    this.setState({ content: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name.length && !this.state.content.length) {
      return;
    }
    const newItem = {
      id: Date.now(),
      name: this.state.name,
      content: this.state.content
    };
    this.props.addChat(newItem);
    this.setState({ name: '', content: '' })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>

      <div className="form-group">
      <input type="text" className="form-control" id="name" onChange={this.handleChangeName} value={this.state.name} placeholder="Your name"></input>
      </div>

      <div className="form-group">
      <textarea className="form-control" id="contet" onChange={this.handleChangeContent} value={this.state.content} rows="3"  placeholder="Content..."></textarea>
      </div>

      <button className="btn btn-primary" type="submit">Send</button>

      </form>
    );
  }
}
