import React, { Component } from 'react';
import Difficulty from './Difficulty';

class Opinion extends Component {
    
    state = {
        update: false, 
        opinion:'',
        starsIdx:this.props.starsIdx,
        starsRating:this.props.starsRating
     }
     handleStarUpdate=(data)=>{
        
        this.setState({
            starsIdx: data.cacheIdx,
            starsRating:data.cacheRating
        })
    }
    handleRemove=()=>{
        const{info,onRemove}=this.props
        onRemove(info.id)
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    changeUpdate=()=>{
        const{update,opinion,starsIdx,starsRating}=this.state;
        const{info,onUpdate}=this.props;

        if (update){
            onUpdate(info.id,{"opinion":opinion, "starsIdx":starsIdx, "starsRating":starsRating})
        }else{
            this.setState({opinion:info.opinion});
        }
        this.setState({
            update:!this.state.update
        })
    }
    render() { 
        const{opinion,starsIdx,starsRating}=this.props.info;
        const{update}=this.state
        const style={
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }
        return ( 
            <div style={style}>
                {
                    update?
                    <div>
                        <input 
                        name="opinion" 
                        onChange={this.handleChange} 
                        value={this.state.opinion}/>
                     </div>
                    :
                    <div>
                        {opinion}
                        
                    </div>
                }
            <Difficulty 
                        onStarUpdate={this.handleStarUpdate}
                        starsIdx= {starsIdx}
                        starsRating={starsRating}
                        update= {this.state.update}
                        ></Difficulty>
            <div>
            <button type="submit" onClick={this.handleRemove}>delete</button>
            <button type="submit" onClick={this.changeUpdate}>
                {update? "submit":"update"}</button>
            </div>

            </div>
         );
    }
}
 
export default Opinion;