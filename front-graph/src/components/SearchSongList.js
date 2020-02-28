import React, { Component } from 'react';
import Songinfo from './Songinfo';
class SearchSongList extends Component {
    state = { 
        songInfo:[
        {   id:0,
            name: '애국가',
            singer:'안익태',
            score:'4'
        },
        {   id:1,
            name: '소주 한잔',
            singer:'임창정',
            score:'5'
        }    
    ]
     }
    
    chooseSong=(e)=>{
        const{onUpdate}=this.props
        console.log(e.target.id)
        const data=this.state.songInfo.filter(item=>item.id===parseInt(e.target.id))
        console.log(data)        
        onUpdate('result',data[0])
    }
    render() { 
        const style={
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }
        const {songInfo}=this.state
        let list=songInfo.map(info=>
        (
        <div style={style}>
        <Songinfo songInfo={info} ></Songinfo>
        <button id={info.id} onClick={this.chooseSong}> 다른 사용자 평가</button>
        </div>
        )
    )
        return (<div>{list} </div> );
    }
}
 
export default SearchSongList;