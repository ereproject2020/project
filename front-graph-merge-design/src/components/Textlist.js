import React, { Component } from 'react';
import Songinfo from './Songinfo';
import Text from './Text';
import "../css/textlist.css";
import '../css/textresult.css';
import { useConsumer} from '../context/context';
class Textlist extends Component {
    state = { index: 0 }
    difficulty = 0
    past = true
    more = true
    moreReview = () => {
        this.setState({ index: this.state.index + 5 })
    }
    pastReview = () => {
        this.setState({ index: this.state.index-5})
    }
    

    render() {
        const { comment } = this.props
        
        if(this.state.index===0){
            this.past = false
        }else{
            this.past = true
        }
        if(this.state.index>comment.length-6){
            this.more = false
        }else{
            this.more=true
        }
        this.difficulty = 0.00
        const list = comment.map(
            function (info, index, array) {
                this.difficulty = this.difficulty + info.starsIdx + info.starsRating
                if ((index > array.length - this.state.index - 6)
                &&(index<array.length-this.state.index)) {
                    return (
                        <div className={"textlist"} key={index}>
                            <Text info={info} onMode={this.props.onMode} setCommentUpdate = {this.props.setCommentUpdate}></Text>
                        </div>
                    )
                }
            }.bind(this)
            // 같은 song 내 comment 별 id가 필요할 수도 있음. 
        )
        const avgDifficulty= (this.difficulty/comment.length).toFixed(2)
        const{songInfo}=this.props
        return (
            <div>
                <div>
                    {/* 노래제목: {songInfo[0].title}   가수: {songInfo[0].singer}  난이도:{(this.difficulty/comment.length).toFixed(2)} */}
                <Songinfo song={songInfo[0]} difficulty={avgDifficulty}></Songinfo>
                { !this.props.comment[0] ?
                            <div><h3>Please write the first comment of this Song!</h3></div>
                        :
                            <div> {list}</div>
                        }
                    </div>
                <div id={"buttons"}>
                    {this.past ?
                    <button id={"past"} type="submit" onClick={this.pastReview}
                    >◁</button>
                    :
                    <div></div>
                    }
                    {this.more ?
                    <button id={"more"} type="submit" onClick={this.moreReview}
                    >▷</button>
                    :
                    <div></div>
                    }
                </div>
            </div>
        );
    }
}

export default useConsumer(Textlist);