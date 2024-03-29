import React, {Component } from 'react';
import Textlist from './Textlist';
import { useConsumer } from '../context/context';
import '../css/textresult.css';

class Textresult extends Component {
    state = {difficultyUpdate : 0}

    onModeComment=()=>{
        this.props.onMode('comment')
    }
    onModeSearch=()=>{
        this.props.onMode('search')
    }
    setDifficultyUpdate=(data)=>{
        this.setState({difficultyUpdate : data})
    }
    showButton=()=>{
        return(<button id={"writecomment"} className={"blue"} onClick={this.onModeComment}> comment</button>)
    }
    render() {
        
        return ( 
        <div >
            <Textlist onMode = {this.props.onMode}></Textlist>
            <div id={"textresult"}>
            <button id={"before"} className={"blue"} type="button" onClick={this.onModeSearch}> Return </button>
            {this.showButton()}
            </div>
        </div>
         );
    }
}
 
export default useConsumer(Textresult);