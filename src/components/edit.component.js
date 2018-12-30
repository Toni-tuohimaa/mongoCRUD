import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_name: '',
      comment: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/comments/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                user_name: response.data.user_name, 
                comment: response.data.comment
               });
          })
          .catch(function (error) {
              console.log(error);
          })
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
    axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
    console.log(this.props)
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update comment</h3>
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
                    <input type="submit" 
                      value="Update comment" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}