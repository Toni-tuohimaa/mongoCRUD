import React, { Component } from 'react';
import axios from 'axios'
import Recipe_Details from './recipe_details';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, recipes: []};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
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

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.recipes.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.recipes.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    /* const slides = items.map((item) => { */
      const slides = this.state.recipes.map((item) => {
      return (
        
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item._id}
          onExiting={this.onExiting}
          onExited={this.onExited}
          autoPlay="true"
        >
       {/*  <Recipe_Details obj={item} key={item._id} collapse="true"/> */}
       <CarouselCaption className="custom-tag" captionText={<Recipe_Details obj={item} key={item._id} collapse="true"/>} captionHeader={item.recipe_name} /> 
      {/* <CarouselCaption className="custom-tag" captionText={"asd"} captionHeader={item.recipe_name} /> */}
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 500px;
                background: grey;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={this.state.recipes} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default Slideshow;