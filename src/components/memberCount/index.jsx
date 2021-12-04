import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import './index.css'

function MemberCount(props) {
    return (
        <div className='member-count'>
            <FontAwesomeIcon icon={faUser} transform='shrink-4' />
            <div className='member-count-number'>{props.count}</div>
        </div>
    );
}

export default MemberCount;