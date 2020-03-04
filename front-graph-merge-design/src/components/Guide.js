import React, { Component } from 'react';
class Guide extends Component {
    state = {  }
    render() {
        console.log('Guide')
        const style={
            border: '1px solid black',
            padding: '8px',
            margin: '8px',
        
        }
        return (
            <div style={style}>
                <li>Calibrate vocal difficulty of your song for every second.</li>
                <li>Use it while you are listening to song in the web! </li>
                <li>"Current" represents the difficulty of that moment. </li>
                <li>"Highest" represents the difficulty of the hardest 5-second-long part.</li>
                <li>Please refer to "Song Difficulty" for more information about ratings.</li>

            </div>
         );
    }
}
 
export default Guide;