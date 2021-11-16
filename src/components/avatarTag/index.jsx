import React from 'react';
import Avatar from '../avatar';
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:13
 * @Component  : AvatarTag
 * @Props      : img, text, size
 * @Description: A simple avatar tag.
*/

const AvatarTag = props => {
    return (
        <div className='avatar-tag'>
            <Avatar img={props.img} alt={props.text} size={props.size}/>
            <span>{props.text}</span>
        </div>
    )
}

export default AvatarTag
