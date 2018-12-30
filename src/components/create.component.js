import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_name: '',
      comment: ''
    }
  }
  onChangeUserName(e) {
    this.setState({
      user_name: e.target.value
    });
  }
  onChangeComment(e) {
    this.setState({
      comment: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      user_name: this.state.user_name,
      comment: this.state.comment
    };

    console.log(obj)
    axios.post('http://localhost:4000/comments/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      user_name: '',
      comment: ''
    })

    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Comment</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.user_name}
                      onChange={this.onChangeUserName}
                      />
                </div>
                <div className="form-group">
                    <label>Comment: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.comment}
                      onChange={this.onChangeComment}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" value="Post comment" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}