import React, { Component } from 'react';
import Criteria from './Criteria';
import Guide from './Guide';
import SearchSongList from './SearchSongList';
class Searchform extends Component {
    state = {  
        rawsongname:'',
        songname:'',
        mode:'normal'
    }
    showContent=()=>{
        const{mode}=this.state
        if (mode==='criteria'){
            return <Criteria></Criteria>
        }else if(mode==='guide'){
            return <Guide></Guide>
        }else if(mode==='list'){
            return <SearchSongList onUpdate={this.props.onUpdate}></SearchSongList>
        }else{
            return <div></div>
        }
    }


    modeUpdate=()=>{
        const {onUpdate}=this.props
        onUpdate('result')
    }

    addPopup1=()=>{
        this.setState({
            mode: "criteria"
        })
    }
    addPopup2=()=>{
        this.setState({
            mode: "guide"
        })
    }
    handleChange=(e)=>{
        let rawtext=e.target.value;
        let text=rawtext.toLowerCase().replace(/(\s*)/g,"");
        this.setState({
            rawsongname: rawtext,
            songname: text,
            mode:'list'
        })

    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    render() { 
        console.log(this.state.mode)
        return (
            <div>
            <form onSubmit = {this.onSubmit}>
                <input 
                name="rawsongname" 
                placeholder="Type the name of your song"
                onChange={this.handleChange} 
                value={this.state.rawsongname}></input>
                <button type="submit" >search</button>
            </form>
            <button type="submit" onClick={this.addPopup1}>난이도 정보</button>
            <button type="submit" onClick={this.addPopup2}>도움말</button>
            {this.showContent()}
            </div>






         );
    }
}
 
export default Searchform;