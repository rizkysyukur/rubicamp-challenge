import React, {Component} from 'react';
import DataItem from './DataItem';

export default class ListItem extends Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      name: '',
      phone: ''
    }
  }

  handleNameChange(e){
    this.setState({name: e.target.value})
  }

  handlePhoneChange(e){
    this.setState({phone: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
  }

  render(){
    const {data, actions} = this.props;

    let name = this.state.name.trim().toLowerCase();
    let phone = this.state.phone.trim().toLowerCase();

    let filterData = data;

    if(name !== '' && phone !== ''){
      filterData = data.filter(item => item.name.toLowerCase().startsWith(name) && item.phone.toLowerCase().startsWith(phone))
    }else if(name !== ''){
      filterData = data.filter(item => item.name.toLowerCase().startsWith(name))
    }else if(phone !== ''){
      filterData = data.filter(item => item.phone.toLowerCase().startsWith(phone))
    }

    let dataNodes = filterData.map(data => {
      return(
        <DataItem key={data.id} data={data} {...actions} />
      )
    });

    return(
      <div className="row">
      <div className="panel panel-default">
      <div className="panel-heading">Search For</div>
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
      </form>
      </div>
      </div>
      <table className="table table-striped">
      <thead>
      <tr>
      <th>#</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {dataNodes}
      </tbody>
      </table>
      </div>
    );
  }
}
