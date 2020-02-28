import React, { Component } from 'react';
import Opinion from './Opinion';

class Opinionlist extends Component {
   
    render() { 
        const {data,onRemove,onUpdate}=this.props
        const list=data.map(
            info=>(
                <Opinion
                    info={info} 
                    key={info.id}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    starsIdx={info.starsIdx}
                    starsRating={info.starsRating}
                ></Opinion>
            )
        )
        return ( 
            <div>
                {list}
            </div>

         );
    }
}
 
export default Opinionlist;