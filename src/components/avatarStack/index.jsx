import React from 'react';
import Avatar from '../avatar';
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:10
 * @Component  : AvatarStack
 * @Props      : users: []
 *               allowDelete: Boolean
 *               onAvatarDelete: Function(users)
 * @Description: A horizon avatar stack
*/


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
