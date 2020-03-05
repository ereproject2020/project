import React, { Component } from 'react';
import axios from "axios";
import "../css/Songinfo.css"
import { useConsumer } from '../context/context';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


class Songinfo extends Component {
    state = {
        loading: true,
        difficulty: 0
    }

    componentDidUpdate(prevProps) {
        if (this.props.difficulty !== prevProps.difficulty) {
            this.setState({
                difficulty: this.props.difficulty
            })
        }
    }

    setDifficulty = async () => {
        const config = {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }
        await axios.get("http://woojinger.pythonanywhere.com/api/comment/", {
            params: {
                song: this.props.song.id
            }
        }).then(function (res) {
            if (res.data.length === 0) {
                this.setState({ difficulty: "Not Rated" })
            } else {
                var rating = 0
                for (var i in res.data) {
                    rating = rating + res.data[i].starsIdx + res.data[i].starsRating
                }
                this.setState({ difficulty: (rating / res.data.length).toFixed(2) })
            }

        }.bind(this)
        ).then(
            this.setState({ loading: false })
        ).catch(e => console.log(e))
        return true
    }

    render() {
        const { song } = this.props
        if ((this.state.loading === false)) {
            return (
                <div className="container3" >
                    <div className='label1'>Title</div>
                    <div className='label2'>Singer</div>
                    <div className="title"> {song.title}</div>
                    <div className="singer"> {song.singer}</div>
                    <div className="difficulty"> 
                    <div style={{ "position": "relative", "text-align":"center" }}
                    >Difficulty</div>
                    <h2 style={{ "margin": "auto", "text-align":"center"}}
                    >{this.state.difficulty}</h2></div>
                    <div className="ratenumber">{this.props.comment.length} users have rated</div>
                </div>
            );
        } else {
            this.setDifficulty()
            return (
                <div>
                    loading..
                </div>
            )
        }
    }
}

export default useConsumer(Songinfo);