import React, { Component } from 'react'
import CardButton from './cardButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './index.css'

class PopCard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        btnType: 'normal'
    }

    render() {
        const { title, btnType } = this.props

        return (
            <div className='pop-card'>

                <div className='pop-card-header'>
                    <div>{title}</div>
                    <div>
                        <FontAwesomeIcon icon={faTimes} transform="shrink-6" />
                    </div>
                </div>

                <div className='pop-card-content'>

                </div>

                {btnType !== 'none' && <CardButton type={btnType} />}

            </div>
        )
    }
}

export default PopCard
