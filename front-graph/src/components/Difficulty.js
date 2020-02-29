import React, { Component } from 'react';
import StarRate from './StarRate';

class Difficulty extends Component {
  static defaultProps={
    starsIdx:0,
    starsRating:0
  }
  state = {
    idx:0,
    rating: 0,    
    cacheIdx: this.props.starsIdx,
    cacheRating: this.props.starsRating
  }

  _mouseOver = (e,i) => {
    e.persist()
    let offsetX = e.nativeEvent.offsetX; 
    let clientX = e.target.clientWidth;

    if(offsetX > clientX / 2){
      let value = 2;
      this.setState({
        idx:i,
        rating:value
      });
    }else{
      let value = 1;
      this.setState({
        idx:i,
        rating:value
      });
    }
  }
       
  handleChange = (i,v) => {
    const{cacheIdx,cacheRating}=this.state;
    const{onStarUpdate}=this.props;
    this.setState({
      idx:0,
      rating:0,
      cacheIdx:i,
      cacheRating:v
    });
    onStarUpdate({
      "cacheIdx":cacheIdx,
      "cacheRating":cacheRating
     })
  }

  render() {
    return (
      <StarRate 
        _mouseOver={this._mouseOver}
        onChange={this.handleChange} 
        idx={this.state.idx} 
        rating={this.state.rating}         
        cacheIdx={this.state.cacheIdx}         
        cacheRating={this.state.cacheRating}
        onUpdate={this.handleStarUpdate}
        nowMode={this.props.nowMode}
        update={this.props.update}
      />
    );
  }
}

export default Difficulty;