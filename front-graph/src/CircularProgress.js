import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class CircularProgress extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          complete : false,
          percentage : 0.0
        }   
             
      }

      componentDidMount(){
          this.progresson();
      }

      progresson = () => {
          this.setState({
              percentage : this.state.percentage + 0.1
          })

          if(this.state.percentage >= 1){
            setTimeout(this.progressComplete, 500);   
          }

          else{
            setTimeout(this.progresson, 100);
          }

      }


      progressComplete = () => {
        this.setState({
            percentage : 1,
            complete : true
        }) 
      }


      render(){

        const {modelComplete, onclick} = this.props;
        let button = null;
        if(this.state.complete && modelComplete){
          button = <img src = 'start.png' style = {{width: 250, height: 250, marginLeft: 1}} onClick = {onclick}></img>
        }

        else{
          button = <img src = 'loading.png' style = {{width: 250, height: 250, marginLeft: 1}} onClick = {onclick}></img>
        }

        return(
            <div>
                <CircularProgressbarWithChildren value = {this.state.percentage} maxValue = {1}>
                    {button}
                </CircularProgressbarWithChildren>
            </div>               
        ) 

      }

}

export default CircularProgress;