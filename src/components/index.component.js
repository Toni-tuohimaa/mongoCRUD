import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { throws } from 'assert';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {comments: []};
    }
    componentDidMount(){
      this.getData();
    }

    getData = () => {
        axios.get('http://localhost:4000/comments')
        .then(response => {
          this.setState({ comments: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    tabRow() {

      return this.state.comments.map((object, i) => {
      return <TableRow obj={object} key={i} action={this.getData}/>;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Comment List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Comment</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }