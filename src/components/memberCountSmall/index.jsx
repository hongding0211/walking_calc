import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import './index.css'

function MemberCountSmall(props) {
    return (
        <div className='member-count-small'>
            <FontAwesomeIcon icon={faUser} transform='shrink-6' />
            <div className='member-count-small-number'>{props.count}</div>
        </div>
    );
}

export default MemberCountSmall;