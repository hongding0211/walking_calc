import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import './index.css'

class CardButton extends Component {

    static defaultProps = {
        text: '确认',
        type: 'normal',
        width: '100%',
        height: '35px',
        pending: false,
        loadingIcon: false
    }

    render() {
        let { text, type, pending, width, height, loadingIcon } = this.props
        if (type === 'delete')
            text = '删除'
        return (
            <button
                className={`card-button ${type === 'delete' ? 'card-button-delete' : ''} ${pending ? 'card-button-pending' : ''} ${type === 'delete' && pending ? 'card-button-delete-pending' : ''}`}
                style={{ text, type, width, height }}
            >
                {pending && loadingIcon && <FontAwesomeIcon className='loading-icon' icon={faCircleNotch} spin />}
                {text}
            </button>
        );
    }

}

export default CardButton;
