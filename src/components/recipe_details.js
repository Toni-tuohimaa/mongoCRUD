import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import '../styles.css'

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
   // console.log(this.props)

     if (this.props.collapse === "true" && this.state.collapse === false) {
      this.toggle();
    } 

     // console.log(this.props.obj)
    return (
      <React.Fragment>

        {this.props.collapse === "true" ? "" : <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.props.obj.recipe_name}</Button>}

        {/* <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.props.obj.recipe_name}</Button> */}
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
                 <div className="details"><span style={{ fontWeight: 'bold' }}>Ingredients:</span> {this.props.obj.ingredients}</div>
                 {this.props.obj.method.map((m, idx) => <div className="details" key={idx}><span style={{ fontWeight: 'bold' }}>Step #{idx+1}:</span> {m.step}</div>)}
                {/* <button onClick={this.delete} className="btn btn-danger">Delete</button> */}
            </CardBody>
          </Card>
        </Collapse><br/>
      </React.Fragment>
    );
  }
}

export default Recipe_Details;