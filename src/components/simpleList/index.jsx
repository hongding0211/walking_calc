import React, { Component } from 'react'
import './index.css'

class SimpleList extends Component {

    render() {
        const { list } = this.props

        return (
            <div className='simple-list-container'>
                {list.map((l, i) => {
                    return (
                        <div key={i}>
                            <div className='simple-list-item'>
                                {l}
                            </div>
                            <div className='split' />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default SimpleList;
