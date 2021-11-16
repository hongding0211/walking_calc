import React from 'react';
import Avatar from '../avatar';
import './index.css'


const AvatarStack = props => {
    return (
        <div className='avatar-stack-container'>
            {props.users.map(user => {
                return (
                    <span key={user.uid} className='avatar-stack-item' onClick={()=>{
                        if(props.allowDelete){
                            props.onAvatarDelete(user)
                        }
                    }}>
                        <Avatar
                            img={user.img}
                            size={props.size}
                            alt={user.name}
                        />
                    </span>
                )
            })}
        </div>
    )
}

export default AvatarStack
