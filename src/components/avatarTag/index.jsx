import React from 'react';
import Avatar from '../avatar';
import './index.css'

const AvatarTag = props => {
    return (
        <div className='avatar-tag'>
            <Avatar img={props.img} alt={props.text} size={props.size}/>
            <span>{props.text}</span>
        </div>
    )
}

export default AvatarTag
