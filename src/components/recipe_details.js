import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';

class Recipe_Details extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    delete() {
        axios.get('http://localhost:4000/recipes/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))

            this.props.action()
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
      }

  render() {
      console.log(this.props.obj)
    return (
      <div>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.props.obj.recipe_name}</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
                 <p><span style={{ fontWeight: 'bold' }}>Ingredients:</span> {this.props.obj.ingredients}</p>
                 {this.props.obj.method.map((m, idx) => <p key={m._id}><span style={{ fontWeight: 'bold' }}>Step #{idx+1}:</span> {m.step}</p>)}
                {/* <button onClick={this.delete} className="btn btn-danger">Delete</button> */}
            </CardBody>
          </Card>
        </Collapse><br/>
      </div>
    );
  }
}

export default Recipe_Details;