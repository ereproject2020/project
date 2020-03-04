import React, { Component } from 'react';
import { useConsumer } from '../context/context';
import Starshow from './Starshow';
import '../css/text.css';
import '../css/button.css';
import axios from "axios";
import Popup from "reactjs-popup";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


class Text extends Component {
    state = {
        userId: "",
        userPassword: "",
        mode: "default",
        update: false,
        text: '',
        starsIdx: this.props.info.starsIdx,
        starsRating: this.props.info.starsRating
    }
    authorized = false
    modeUpdate = (e) => {
        if ((this.state.userId === this.props.info.userId) && (this.state.userPassword === this.props.info.userPassword)
            && (e.target.name == "update")) {
            this.handleUpdate()
        } else {
            this.setState({ mode: e.target.name })
        }
    }
    handleUpdate = async () => {
        const { update, text, starsIdx, starsRating } = this.state;
        const { info, comment, setComment } = this.props;
        if (update) {
            setComment(
                comment.map(item => (info.id === item.id ?
                    {
                        id: this.props.info.id,
                        text: text,
                        starsIdx: starsIdx,
                        starsRating: starsRating,
                        userId: info.userId,
                        userPassword: info.userPassword,
                        song: this.props.songInfo[0].id
                    } : item))
            )
            await axios.put(`http://woojinger.pythonanywhere.com/api/comment/${this.props.info.id}/`, {
                id: this.props.info.id,
                text: text,
                starsIdx: starsIdx,
                starsRating: starsRating,
                userId: info.userId,
                userPassword: info.userPassword,
                song: this.props.songInfo[0].id
            }).catch(e => console.log(e.message))
            this.setState({
                userId: '',
                userPassword: ''
            })
        } else {
            this.setState({ text: info.text })
        }
        this.setState({
            update: !update
        })
    }
    handleRemove = async () => {
        const { setComment, comment } = this.props
        await axios.delete(`http://woojinger.pythonanywhere.com/api/comment/${this.props.info.id}`);
        setComment(comment.filter(object => object.id !== this.props.info.id))
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
    UpdateSubmit = () => {
        if ((this.state.userPassword === this.props.info.userPassword)) {
            if (this.state.mode === "update") {
                this.setState({ mode: "default" })
                this.handleUpdate()
            }
            if (this.state.mode === "delete") {
                this.setState({ mode: "default" })
                this.handleRemove()
                this.setState({
                    userPassword: ''
                })
            }
        } else {
            this.setState({ mode: "fail" })
            this.setState({
                userPassword: ''
            })
        }

    }
    render() {
        const { update } = this.state
        if (this.state.mode === "fail") {
            return (
                <div className={"text"}>
                    <h4 id={"warning"}>Invalid Password</h4>
                    <button id={"submit"} className={"blue"} name="default" type="submit" onClick={this.modeUpdate}
                    >Confirm</button>

                </div>
            )
        }
        if ((this.state.mode === "update") || (this.state.mode === "delete")) {
            return (
                <div className={"text"}>
                    <input id={"password"} type="text" placeholder="Type Your Password" onChange={this.handleChange}
                        value={this.state .userPassword} name="userPassword" /><br />
                    <Popup modal trigger={<button id={"passwordsubmit"} className={"updatebutton goldenrod"}>Submit</button>}>
                    
                        <div className={"popuptext"}>This Process is Permanent</div>
                        <div className={"popuptext"}>Continue?</div>
                        <button id={"continue"} className={"blue"} type="button" onClick={this.UpdateSubmit}>
                        Yes. Continue</button>
                        <button id={"notcontinue"} className={"blue"} name="default" type="button" onClick={this.modeUpdate}>
                        No. Back to List</button>
                    
                    </Popup>
                    <button id={"passwordback"} className={"updatebutton goldenrod"} name="default" type="button" onClick={this.modeUpdate}
                    >Back</button>
                </div>
            );
        }
        if (this.state.mode === "default") {
            return (
                <div className={"text"} >
                    <div id={"nickname"}>{this.props.info.userId}</div>
                    {
                        update ?
                            <div className={"opinion"}>
                                <textarea
                                    name="text"
                                    onChange={this.handleChange}
                                    value={this.state.text}
                                ></textarea>
                            </div>
                            :
                            <div className={"opinion"}>
                                {this.props.info.text}
                            </div>
                    }
                    <div id={"star"}>
                    <Starshow
                        starsIdx={this.state.starsIdx}
                        starsRating={this.state.starsRating}
                        update={this.state.update}
                        starUpdate={this.handleUpdateStar}
                    ></Starshow>
                    </div>
                    <span className={"rating"}>{this.state.starsIdx + this.state.starsRating}/10</span>
                    {
                        <div className={"updatebutton"}>
                            <button id={"updatesubmit"}
                                className="goldenrod"
                                type="submit"
                                name="update"
                                onClick={this.modeUpdate}
                            >{update ? "submit" : "update"}</button>

                            <button id={"delete"}
                                className="goldenrod"
                                type="submit"
                                name="delete"
                                onClick={this.modeUpdate}
                            >delete</button>
                        </div>
                    }
                </div>
            );
        }
    }
}

export default useConsumer(Text);