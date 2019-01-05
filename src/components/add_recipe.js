import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css'

export default class Add_Recipe extends Component {
  constructor(props) {
    super(props);
    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      recipe_name: '',
      ingredients: [""],
      method: [{step: ""}]
    }
  }
  onChangeRecipeName(e) {
    this.setState({
      recipe_name: e.target.value
    });
  }
  onChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value
    })  
  }

  onChangeMethod(e) {
      this.setState({
          method: e.target.value
      })
  }

  handleIngredientsChange = (idx) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
     /*  return { ...ingredient, name: evt.target.value }; */
      return evt.target.value;
    });

    this.setState({ ingredients: newIngredients });
  }

  handleMethodsChange = (idx) => (evt) => {
    const newMethod = this.state.method.map((method, sidx) => {
      if (idx !== sidx) return method;
      return { ...method, step: evt.target.value }; 
    });

    this.setState({ method: newMethod });
  }
  
  add_ingredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat("")
    });
  }
  add_step = () => {
    this.setState({
      method: this.state.method.concat({step: ""})
    });
  }

  remove_ingredient = (idx) => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  }

  remove_method = (idx) => () => {
    this.setState({
      method: this.state.method.filter((s, sidx) => idx !== sidx)
    });
  }

  onSubmit(e) {
    console.log(this.state)

    /* e.preventDefault();
    const obj = {
      recipe_name: this.state.recipe_name,
      ingredients: this.state.ingredients
    };

    console.log(obj)
    axios.post('http://localhost:4000/recipes/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      recipe_name: '',
      ingredients: [" "]
    })

    this.props.history.push('/recipes'); */
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Recipe</h3>
            {/* <form onSubmit={this.onSubmit}> */}
            {/* <form> */}
                <div className="form-group">
                    <label>Recipe name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.recipe_name}
                      onChange={this.onChangeRecipeName}
                      placeholder="Ridiculously delicious recipe name"
                      />
                </div>
                <div className="form-group">
                    <label>Ingredients: </label><br/>
                    {this.state.ingredients.map((ingredient, idx) => (
                        <div className="input-group mb-3">
                            <input
                            type="text"
                            placeholder={`Ingredient #${idx + 1}`}
                            value={ingredient}
                            onChange={this.handleIngredientsChange(idx)}
                            className="form-control"
                            />
                            <div class="input-group-append">
                            <button type="button" onClick={this.remove_ingredient(idx)} className="btn btn-danger">-</button>
                            </div>
                        </div>
                        ))}
                        <button onClick={this.add_ingredient} className="btn btn-primary">Add ingredient</button>
                </div>
                <div className="form-group">
                    <label>Method: </label><br/>
                    {this.state.method.map((method, idx) => (
                        <div className="input-group mb-3">
                            <input
                            type="text"
                            placeholder={`Step #${idx + 1}`}
                            value={method.step}
                            onChange={this.handleMethodsChange(idx)}
                            className="form-control"
                            />
                            <div class="input-group-append">
                            <button type="button" onClick={this.remove_method(idx)} className="btn btn-danger">-</button>
                            </div>
                        </div>
                        ))}
                        <button onClick={this.add_step} className="btn btn-primary">Add step</button>
                </div>

                <div className="form-group">
                    {/* <input type="submit" value="Save recipe" className="btn btn-primary"/> */}
                    <button className="btn btn-dark" onClick={this.onSubmit}>Save Recipe</button>
                </div>
           {/*  </form> */}
        </div>
    )
  }



}