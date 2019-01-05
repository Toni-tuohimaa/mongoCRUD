import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Recipes from './components/recipes';
import Add_Recipe from './components/add_recipe'
import Recipe_Details from './components/recipe_details';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Food recipes</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Post a comment</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Comments</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/recipes'} className="nav-link">Recipes</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/add'} className="nav-link">Add recipe</Link>
                </li>
              </ul>
            </div>
          </nav> <br/> 

          <Switch>
               <Route exact path='/create' component={ Create } /> 
              <Route path='/edit/:id' component={ Edit } />
               <Route path='/index' component={ Index } /> 
               <Route path='/recipes' component={ Recipes } />
               <Route path='/add' component={ Add_Recipe } />
               <Route path='/details' component={ Recipe_Details } />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;