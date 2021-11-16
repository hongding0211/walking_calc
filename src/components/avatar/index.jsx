import React, { Component } from 'react'
import './index.css'
import defaultAvatar from './blank_user.png'

class Avatar extends Component {

    static defaultProps = {
        size: '48px',
        alt: 'avatar'
    }

    render() {
        const { img, size, alt } = this.props
        return (
            <div>
                <img
                    src={img ? img : defaultAvatar}
                    style={{ width: size, height: size }}
                    className='avatar'
                    alt={alt}
                ></img>
            </div >
        )
    }
}

export default Avatar;