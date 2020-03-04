import React, { Component } from 'react';
import "../css/button.css"
class Criteria extends Component {
    state = {  }
    render() {
        console.log('Criteria') 
        // const style={
        //     border: '1px solid black',
        //     pfadding: '8px',
        //     margin: '8px'
        // }
        return (
            
            <div >
                <img id={"difficultychart"} src={require("../images/musical-range.png")} alt="range chart" ></img>
            </div>
         );
    }
}
 
export default Criteria;