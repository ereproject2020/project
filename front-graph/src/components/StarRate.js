
import React, { Component } from 'react';
import Reset from './images/reset.svg';
import './StarRate.css';

class StarRate extends Component {
    static defaultProps={
        update: true,
        // nowMode: true        
    }
    constructor(props){
        super(props);
        this.state={
            // nowMode: this.props.nowMode,
            // changeMode: true,
            update: this.props.update
        }
        this.modeSetting=this.modeSetting.bind(this)
        this._makeStars= this._makeStars.bind(this)
        this._resetRating = this._resetRating.bind(this);
    }
    // modeCheck=()=>{
    //     const{nowMode,changeMode,update}=this.state

    //     if(nowMode^changeMode){
    //         this.setState({
    //             update:!update,
    //             nowMode:changeMode
    //         })

    //     }
    // }
    componentDidUpdate(prevProps){
        if(this.props.update !==prevProps.update){
            this.setState({
                update:this.props.update
            })
        }
    }
    modeSetting=()=>{
        const{update}=this.state
        if(update){
            return(<div className="reset__btn">
                    <img src={Reset} alt="reset" onClick={(e)=>{this._resetRating(e)}} />
                </div>)
        }
    }
    _resetRating(e){
        if(e.type === "mouseleave" || e.type === "onTouchEnd"){        
            this.props.onChange(this.props.cacheIdx,this.props.cacheRating);
        }else if(e.type === "click"){
            this.props.onChange(0,0);
        }    
    }

    _makeStars(){
        let stars1 = [];
        let stars2 = [];       
        for(let i = 0; i < 10; i+=2){
            let starClass = "star__rate";
            
             if(this.props.rating !== 0){
                if (i <= this.props.idx) {               
                    if(this.props.idx === i && this.props.rating % 2 !== 0){
                        starClass += ' is-half-selected';
                    }else{
                        starClass += ' is-selected';
                    }
                }
            }else if(this.props.cacheRating !== 0){
                if (i <= this.props.cacheIdx) {            
                    if(this.props.cacheIdx === i && this.props.cacheRating % 2 !== 0){
                        starClass += ' is-half-selected';
                    }else{
                        starClass += ' is-selected';
                    }
                }
            }
        
            
            stars1.push(
                <label key={i} 
                    className={starClass} 
                    onClick={()=>{this.props.onChange(this.props.idx,this.props.rating)}}
                    onMouseOver={(e)=>{this.props._mouseOver(e,i)}}
                    onMouseMove={(e)=>{this.props._mouseOver(e,i)}}
                    onMouseLeave={(e)=>{this._resetRating(e)}}                    
                    onTouchMove={(e)=>{this.props._mouseOver(e,i)}}
                    onTouchStart={(e)=>{this.props._mouseOver(e,i)}}
                    onTouchEnd={(e)=>{this._resetRating(e)}}
                >
                </label>
            )
            stars2.push(
                <label key={i} className={starClass}></label>
            )
        }
            if (this.state.update){
                return stars1;
            }else{
                return stars2;
            }
    }
        

    render() {
        

       return (
            <div className="starRate__wrap">
                {this._makeStars()}{this.modeSetting()}
                <span style={{position: "relative", bottom : 30, left: 100}}>{this.props.cacheIdx+(this.props.cacheRating)}/10</span>
                
            </div>
        )
        

        }
    
}

export default StarRate;