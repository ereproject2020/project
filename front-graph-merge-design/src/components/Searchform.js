import React, { Component } from 'react';
import Criteria from './Criteria'
import Guide from './Guide';
import Songlist from './Songlist';
import axios from "axios";
import CreateForm from './CreateForm';
import '../css/Searchform.css'
import '../css/button.css'


//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
class SearchForm extends Component {
    state = {
        songname: '',
        rawsongname: '',
        show: 'search',
        songList: [{}]
    }
    showContent = () => {
        const { show } = this.state;
        if (show === 'criteria') {
            return <Criteria></Criteria>
        } else if (show === 'guide') {
            return <Guide></Guide>
        } else if (show === 'list') {
            return (
                <div id={"contentlist"} style={{"margin-bottom": "4vh"}} >
                    <Songlist onMode={this.modeUpdate} songList={this.state.songList}></Songlist>
                    <CreateForm onMode={this.backToSearch} handleshowSrch={this.handleshowSrch}></CreateForm>
                </div>
            )
        } else if (show === 'create') {
            return <CreateForm id={"contentlist"} style={{"margin-bottom": "4vh"}}onMode={this.backToSearch} handleshowSrch={this.handleshowSrch}></CreateForm>
        }
        else if(show === 'search') {
            return <div style={{"margin-left":"5vh"}}>
                <img id="magnifier" src={require("../images/magnifier.png")} alt="돋보기"></img>
                <h3 id={"searchtext"}>Search your Song Title</h3>
            </div>
        }

    }
    backToSearch = async (title) =>{
        const config = {
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }
        await axios.get("http://woojinger.pythonanywhere.com/api/song/", {
            params: {
                title: title
            }
        }).then(res => this.setState({
            show : 'list',
            songList: res.data
        }))
    }
    modeUpdate = () => {
        this.props.onMode('result')
    }
    handleChange = (e) => {
        e.preventDefault();
        let rawtext = e.target.value
        let text = rawtext.toLowerCase().replace(/(\s*)/g, "");
        this.setState({
            rawsongname: rawtext,
            songname: text,
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }
        await axios.get("http://woojinger.pythonanywhere.com/api/song/", {
            params: {
                title: this.state.songname
            }
        }).then(res => this.setState({
            songList: res.data
        }))
        if (this.state.songList.length === 0) {
            this.setState({
                show: 'create'
            })
        } else {
            this.setState({
                show: 'list'
            })
        }
    }
    showButton = () =>{
        if (this.state.show ==="criteria"||this.state.show==="guide"){
            return(<button className='blue' id={"home"} type="button" onClick={this.handleshowSrch}>Return</button>)
        }else{
            return(<div></div>)
        }
    }
    handleshowCri = () => {
        this.setState({
            show: 'criteria'
        })
    }
    handleshowGui = () => {
        this.setState({
            show: 'guide'
        })
    }
    handleshowSrch = () => {
        this.setState({
            show: 'search'
        })
    }
    render() {
        return (
            <div id="border">
                <div>
                <form className='search' onSubmit={this.handleSubmit}>
                    <input className='input'
                        name='rawsongname'
                        placeholder='Submit your song title'
                        onChange={this.handleChange}
                        value={this.state.rawsongname}
                    ></input>
                    <button type='submit'>search</button>
                </form>
                </div>
                <div className="container1">
                    <button className='guide orange' type="submit" onClick={this.handleshowGui}> Guide</button>
                    <button className='rate pink' type="submit" onClick={this.handleshowCri}>Song Difficulty</button>
                    {this.showButton()}
                    <div className='content'>
                    {this.showContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;