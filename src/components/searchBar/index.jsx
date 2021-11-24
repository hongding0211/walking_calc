import React, {useState} from 'react';
import SimpleList from '../simpleList'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:23
 * @Component  : SearchBar
 * @Props      : onSearchContentUpdate: Function(text)  -> A callback fn invoked when search content changes.
 *               list:                  [...Components] -> A list of components who can be put into a SimpleList component.
 *               alt:                   String
 *               
 * @Description: A general search bar.
*/

function SearchBar(props) {
    const [showCandidates, setShowCandidates] = useState(false)

    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div className='searcbar-container'>
                    <span className='search-icon'>
                        <FontAwesomeIcon icon={faSearch} transform="shrink-5"/>
                    </span>
                <input
                    placeholder={props.placeHolder}
                    onChange={(e) => {
                        const text = e.target.value
                        if (text === '') {
                            setShowCandidates(false)
                        } else {
                            setShowCandidates(true)
                            props.onSearchContentUpdate(text)
                        }
                    }}
                />
            </div>

            {showCandidates && props.list.length > 0 && <SimpleList>{props.list}</SimpleList>}
        </div>
    )
}

export default SearchBar;
