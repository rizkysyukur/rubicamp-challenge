import React, {Component} from 'react';

class AppTextInput extends Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      adding: false,
      name: this.props.name || '',
      phone: this.props.phone || ''
    }
  }

  handleAddClick(){
    this.setState({adding: true})
  }

  handleCancelClick(){
    this.setState({adding: false})
  }

  handleNameChange(e){
    this.setState({name: e.target.value})
  }

  handlePhoneChange(e){
    this.setState({phone: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    var name = this.state.name.trim();
    var phone = this.state.phone.trim();
    if(!name || !phone){
      return;
    }
    this.props.onSave(name, phone);
    this.setState({name: '', phone: '', adding: false});
  }

  render(){
    if(this.state.adding){
      return(
        <div className="panel panel-default">
        <div className="panel-heading">Adding Form</div>
        <div className="panel-body">
        <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        </div>
        <div className="form-group">
        <label>Phone</label>
        <input type="text" className="form-control" placeholder="phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-success"><span className="glyphicon glyphicon-ok-circle"> save</span></button>
        <button type="button" className="btn btn-info" onClick={this.handleCancelClick.bind(this)} ><span className="glyphicon glyphicon-ban-circle"> cancel</span></button>
        </form>
        </div>
        </div>
      )
    }else{
      let addBtnStyle = {
        'marginTop': '15px',
        'marginBottom': '25px'
      }
      return(
        <button type="button" className="btn btn-primary" style={addBtnStyle} onClick={this.handleAddClick.bind(this)}><span className="glyphicon glyphicon-plus"></span> add</button>
      );
    }
  }
}

export default AppTextInput
