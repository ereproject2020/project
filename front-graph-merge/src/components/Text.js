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
        if ((this.state.userId === this.props.info.userId) && (this.state.userPassword === this.props.info.userPassword)) {
            if (this.state.mode === "update") {
                this.setState({ mode: "default" })
                this.handleUpdate()
            }
            if (this.state.mode === "delete") {
                this.setState({ mode: "default" })
                this.handleRemove()
                this.setState({
                    userId: '',
                    userPassword: ''
                })
            }
        } else {
            this.setState({ mode: "fail" })
            this.setState({
                userId: '',
                userPassword: ''
            })
        }

    }
    render() {
        const { update } = this.state
        if (this.state.mode === "fail") {
            return (
                <div>
                    <h4>Invalid ID or PassWord</h4>
                    <button id={"submit"} className={"blue"} name="default" type="submit" onClick={this.modeUpdate}
                    >Confirm</button>

                </div>
            )
        }
        if ((this.state.mode === "update") || (this.state.mode === "delete")) {
            return (
                <div>
                    <input type="text" placeholder="Type ID" onChange={this.handleChange}
                        value={this.state.userId} name="userId" /><br />
                    <input type="text" placeholder="Type PassWord" onChange={this.handleChange}
                        value={this.state.userPassword} name="userPassword" /><br />
                    <Popup modal trigger={<button>Submit ID and PassWord</button>}>
                        This Process is Permanent<br />
                        Continue?<br />
                        <button id={"submit"} className={"blue"} type="button" onClick={this.UpdateSubmit}
                    >Yes. Continue</button>
                    <button id={"submit"} className={"blue"} name="default" type="button" onClick={this.modeUpdate}
                    >No. Back to Comment List</button>
                    </Popup>
                    <button id={"submit"} className={"blue"} name="default" type="button" onClick={this.modeUpdate}
                    >Back</button>
                </div>
            );
        }
        if (this.state.mode === "default") {
            return (
                <div className={"text"} >
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
                    <Starshow
                        starsIdx={this.state.starsIdx}
                        starsRating={this.state.starsRating}
                        update={this.state.update}
                        starUpdate={this.handleUpdateStar}
                    ></Starshow>
                    <span className={"rating"}>{this.state.starsIdx + this.state.starsRating}/10</span>
                    {
                        <div className={"updatebutton"}>
                            <button id={"updatesubmit"}
                                className="goldenrod"
                                type="submit"
                                name="update"
                                onClick={this.modeUpdate}
                            >{update ? "입력" : "수정"}</button>

                            <button id={"delete"}
                                className="goldenrod"
                                type="submit"
                                name="delete"
                                onClick={this.modeUpdate}
                            >삭제</button>
                        </div>
                    }
                </div>
            );
        }
    }
}

export default useConsumer(Text);