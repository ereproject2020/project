import React, {Component} from 'react';
import Opinionlist from './Opinionlist';
import Songinfo from './Songinfo';

class SearchOpinionResult extends Component{
  
  state={
          }
  handleUpdate=(id,data)=>{
    const{information}=this.state
    this.setState({
      information:information.map(
        info=>{
         return info.id===id ?  {...data,id}: info ;
        }
      )
    })
  }
  handleRemove=(id)=>{
    const{information}=this.state
    this.setState({
      information:information.filter(object=>object.id!==id)
    })
  }

  handleCreate=(data)=>{
    const{information}=this.state
    this.setState({
       information: information.concat({...data,id:this.id++})
    })
  }
  modeUpdate1=()=>{
    const{onUpdate}=this.props
    onUpdate('comment')
  }
  modeUpdate2=()=>{
    const{onUpdate}=this.props
    onUpdate('search')
  }
 

  render(){
  return (
    <div className="App">
      <Songinfo songInfo={this.props.songInfo}
      ></Songinfo>
      <Opinionlist 
      data={this.props.commentInfo} 
      onRemove={this.props.handleRemove} 
      onUpdate={this.props.handleUpdate}  
      ></Opinionlist>
     
      <button type="submit" onClick={this.modeUpdate1}>글쓰기</button>
      <button type="submit" onClick={this.modeUpdate2}>검색</button>
     </div>
  );
}
}

export default SearchOpinionResult;
