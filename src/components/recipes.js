import React, { Component } from 'react';
import axios from 'axios';
import Recipe_Details from './recipe_details';
import { throws } from 'assert';

export default class Recipes extends Component {

  constructor(props) {
      super(props);
      this.state = {recipes: []};
    }
    componentDidMount(){
      this.getData();
    }

    getData = () => {
        axios.get('http://localhost:4000/recipes/get_recipes')
        .then(response => {
          this.setState({ recipes: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    render_recipes() {
      return this.state.recipes.map((object, i) => {
        return <Recipe_Details obj={object} key={i} action={this.getData}/>;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Recipe List</h3>
          {/* <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Recipe name</th>
                <th>Ingredients</th>
                <th colSpan="2">Method</th>
              </tr>
            </thead>
            <tbody> */}
              { this.render_recipes() }
              
            {/* </tbody>
          </table> */}
        </div>
      );
    }
  }