import React from 'react'
import './index.css'
import defaultAvatar from './blank_user.png'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:08
 * @Component  : Avatar
 * @Props      : size, alt
 * @Description: A simple avatar
*/

function Avatar({ img = null, size = '48px', alt = 'avatar' }) {
    return(
        <div>
            <img
                src={img ? img : defaultAvatar}
                style={{ width: size, height: size }}
                className='avatar'
                alt={alt}
            />
        </div >
    )
}

export default Avatar;