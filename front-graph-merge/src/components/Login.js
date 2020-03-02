import React from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { useConsumer } from "../context/context";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name:'',
      image:'',
      login: false,
      }
  }

  onSuccess = () => {
    this.setState({
      login: true
    })
  }

  componentDidMount() {
    document.cookie = 'cross-site-cookie=http://apis.google.com/; SameSite=None; Secure';

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      window.gapi.load('auth2', () => {
        this.auth2 = window.gapi.auth2.init({
          client_id: '759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com',
        })
        window.gapi.load('signin2', function() {
          // render a sign in button
          // using this method will show Signed In if the user is already signed in
          var opts = {
            width: 200,
            height: 50,
            onSuccess: this.onSuccess.bind(this),
          }
          window.gapi.signin2.render('loginButton', opts)
        })
      })
    }

   
  }

  responseComment = async (res)=>{
    const {userInfo,setUserInfo}=this.props
    setUserInfo({
      userId:res.googleId,
      name:res.profileObj.name,
      image:res.profileObj.imageUrl
    })
    if (userInfo.userId!==0){
      this.props.onModeComment()
    }
  }
  responseLogin = async (res)=>{
    const {setUserInfo}=this.props
    setUserInfo({
      userId:res.googleId,
      name:res.profileObj.name,
      image:res.profileObj.imageUrl
    })
  }

  responseFail =(err)=>{
    console.error(err);
  }
  responseLogout=()=>{
    const {setUserInfo}=this.props
    alert('로그아웃 되었습니다.')
    setUserInfo({
      userId:'',
      name:'',
      image:'',
    })
    console.log('logout')
  }

  showButton=()=>{
    if(!this.props.userInfo.userId){
      return(
      <div>
          {this.state.login ? 'yes' : 'no'}
          <button id="loginButton">Login with Google</button>
          <GoogleLogin
            clientId="759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com"
            buttonText="댓글 쓰기"
            onSuccess={this.responseComment} 
            onFailure={this.responseFail}
            cookiePolicy={'single_host_origin'}
          />
          <GoogleLogin
            clientId="759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com"
            buttonText="로그인"
            onSuccess={this.responseLogin} 
            onFailure={this.responseFail}
            cookiePolicy={'single_host_origin'}
            />
      </div>
      )
    }else{
      return(
      <div>
        <GoogleLogout
        clientId="759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={this.responseLogout}
        ></GoogleLogout>
       
      </div>
      )
    }
  }


  render() {
    console.log(this.props.userInfo)
    return (
        <div>
        {this.showButton()}
        </div>
      );
  }
}

export default useConsumer(Login);
