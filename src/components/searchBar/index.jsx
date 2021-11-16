import React, { Component } from 'react';
import SimpleList from '../simpleList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './index.css'
import AvatarTag from '../avatarTag';

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:23
 * @Component  : SearchBar
 * @Props      : searchCandidateUpdate: Function(text)  -> A call back fn for invoking a request for updating the searching candidates.
 *               searchCandidates:      [...Components] -> A list of components who can be put into a SimpleList component.
 *               
 * @Description: A gernal search bar.
*/

class SearchBar extends Component {

    inputRef = React.createRef()

    state = {
        showCandidates: false,
    }

    updateCandidates = (text) => {
        if (text === '') {
            this.setState({ showCandidates: false })
            return
        } else {
            this.setState({ showCandidates: true })
            this.props.searchCandidateUpdate(text)
        }
    }

    render() {
        return (
            <div style={{ width: '100%', position: 'relative' }}>
                <div className='searcbar-container'>
                    <span className='search-icon'>
                        <FontAwesomeIcon icon={faSearch} transform="shrink-5" />
                    </span>
                    <input
                        alt={this.props.alt}
                        onChange={(e) => {
                            this.updateCandidates(e.target.value)
                        }}
                        ref={this.inputRef}
                    />
                </div>

                {
                    this.state.showCandidates && this.props.searchCandidates.length > 0 &&
                    <SimpleList
                        {/* TODO 继续解耦 */}
                        list={
                            this.props.searchCandidates.map(c => {
                                return (
                                    <div onClick={() => {
                                        // After an item is clicked
                                        this.props.itemSelectedCallback(c)
                                        this.setState({
                                            showCandidates: false
                                        })
                                        this.inputRef.current.value = ''
                                    }}>
                                        <AvatarTag size='18px' text={`${c.uid} (${c.name})`} img={c.img} uid={c.uid} />
                                    </div>
                                )
                            })
                        }
                    />
                }
            </div>
        );
    }

}

export default SearchBar;
