import React, { Component } from 'react';
class Songinfo extends Component {
    state = {  }
    render() { 
        const{songInfo}=this.props
        return ( <div>
            노래제목: {songInfo.name}   가수: {songInfo.singer} 난이도:{songInfo.score}
        </div> );
    }
}
 
export default Songinfo;