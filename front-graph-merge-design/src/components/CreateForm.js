import React, { Component } from 'react';
import axios from "axios";
import "../css/CreateForm.css";
import '../css/button.css'
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
class CreateForm extends Component {
    state = {
        mode: 'default',
        title: '',
        singer: ''
    }
    handleMode = () => {
        this.props.onMode('search')
    }
    createSong = () => {
        this.setState({
            mode: 'create'
        })
    }
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        let text = e.target.value;
        this.setState({
            [name]: text
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://woojinger.pythonanywhere.com/api/song/", {
            title: this.state.title.toLowerCase().replace(/(\s*)/g, ""),
            singer: this.state.singer
        })
        this.props.onMode(this.state.title)

    }

    render() {
        if (this.state.mode === 'default') {
            return (
                <div className="default">
                    <div style={{"margin-top":"4vh"}}
                    ><h4> Is your song not on the list?</h4></div>
                    <div style={{"margin-top":"1vh" ,"margin-bottom":"2vh"}}><h4> Submit the song's title and singer for other users</h4></div>
                    <button id={"submitsong"}className={"blue"} onClick={this.createSong}
                    >Add your song</button>
                    <button id={"backsonglist"} className={"blue"} type="button" onClick={this.props.handleshowSrch}>Return</button>
                </div>
            );
        }
        if (this.state.mode === 'create') {
            return (
                <div className="create">
                    <form onSubmit={this.handleSubmit}>
                        <div className="title">
                        <input
                            name="title"
                            type="text"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={this.state.title}
                        ></input>
                        </div>
                        <div className="singer">
                        <input
                            name="singer"
                            type="text"
                            placeholder="Singer"
                            onChange={this.handleChange}
                            value={this.state.singer}
                        ></input>
                        </div>
                        <button className={"blue"} type="submit"
                        >Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default CreateForm;