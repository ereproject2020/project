import React, { Component } from 'react';
import Starshow from './Starshow';
import { useConsumer } from '../context/context';
import Songinfo from './Songinfo';
import '../css/Comment.css'
import axios from "axios";
import Popup from "reactjs-popup";

 
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Commentform extends Component {
    state = {
        userId: '',
        userPassword: '',
        // userId와 UserName을 백에서 추가, user 프로필 사진도 받을 수 있는데 나중에 디자인할 때 고려해봐야할듯
        song: this.props.songInfo[0].title,
        text: '',
        starsIdx: '',
        starsRating: ''
    }
    handleMode = () => {
        this.props.onMode('result')
    }
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        })
    }
    handleUpdateStar = (data) => {
        this.setState({
            starsIdx: data.starsIdx,
            starsRating: data.starsRating
        })
    }

    handleSubmit = async (e) => {
        const { setComment, comment } = this.props
        e.preventDefault();
        await axios.post("http://woojinger.pythonanywhere.com/api/comment/", {
            song: this.props.songInfo[0].id,
            text: this.state.text,
            starsIdx: this.state.starsIdx,
            starsRating: this.state.starsRating,
            userId: this.state.userId,
            userPassword : this.state.userPassword
        }).then(res => {
            setComment(comment.concat({
                id: res.data.id,
                song: this.props.songInfo[0].id,
                text: this.state.text,
                starsIdx: this.state.starsIdx,
                starsRating: this.state.starsRating,
                userId: this.state.userId,
                userPassword : this.state.userPassword
            }))
            console.log(res.data)
        }
        )
        this.handleMode()
        //새로운 comment 작성 후 장고로 post하는 기능 만들기
    }


    render() {
        return (
            <div>
                <Songinfo song={this.props.songInfo[0]}></Songinfo>

                <div id={"comment"}>
                    <input type="text" placeholder="Insert ID" onChange={this.handleChange}
                        value={this.state.userId} name="userId"/><br/>
                    <input type="text" placeholder="Insert PassWord" onChange={this.handleChange}
                        value={this.state.userPassword} name="userPassword"/><br/>
                    <textarea
                        name="text"
                        placeholder="이곳에 의견을 남겨주세요"
                        onChange={this.handleChange}
                        value={this.state.text}
                    ></textarea>
                    <Popup modal trigger={<button>Submit Comment</button>}>
                        Only You can remove or modify your comment<br />
                        when type your id and password<br />
                        Leave a comment for other users?<br />
                        <button id={"submit"} className={"blue"} type="button" onClick={this.handleSubmit}>
                            Yes. Continue</button>
                    <button id={"back"} className={"blue"} type="button" onClick={this.handleMode}>
                        No. Back to Comment List</button>
                    </Popup>
                    <span id={"words"}><h3>당신이 평가한 난이도는?</h3></span>
                    <Starshow id={"commentstar"} update={true} starUpdate={this.handleUpdateStar} ></Starshow>
                    <span id={"commentrating"}>{this.state.starsIdx + this.state.starsRating}/10</span>
                    
                        <button id={"back"} className={"blue"} type="button" onClick={this.handleMode}>뒤로</button>
                </div>
                
            </div>
        );
    }
}

export default useConsumer(Commentform);