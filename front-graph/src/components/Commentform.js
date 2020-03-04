import React, { Component } from 'react';
import Difficulty from './Difficulty';
import Songinfo from './Songinfo';
class Commentform extends Component {
    state = { 
        opinion:'',
        starsIdx:'',
        starsRating:''
     }

    handleStarUpdate=(data)=>{
        
        this.setState({
            starsIdx: data.cacheIdx,
            starsRating:data.cacheRating
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        const{onUpdate}=this.props
        e.preventDefault();
        this.props.onCreate({
            opinion:this.state.opinion,
            starsIdx:this.state.starsIdx,
            starsRating:this.state.starsRating
        })
        this.setState({
            opinion:''
        })
        onUpdate('result')
    
    }
    render() { 
                
        return ( 
            <div>
            <Songinfo songInfo={this.props.songInfo}></Songinfo>
            <form onSubmit={this.handleSubmit} >
                <input  
                name="opinion" 
                placeholder="write your comment" 
                onChange={this.handleChange}
                value={this.state.opinion}
                style={{height:50,width:400}}
                /><Difficulty 
                onStarUpdate={this.handleStarUpdate}                
                ></Difficulty>
                <button type='submit'>submit</button>
            </form>
            <div>{this.state.opinion}</div>
            </div>
         );
    }
}
 
export default Commentform;