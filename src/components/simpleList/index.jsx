import React from 'react'
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:31
 * @Component  : SimpleList
 * @Props      : list:  [...Component]
 * @Description: A simple list which cna contains basically any component.
*/

function SimpleList(props) {
    return (
        <div className='simple-list-container'>
            {props.children.map((l, i) => {
                return (
                    <div key={i}>
                        <div className='simple-list-item'>
                            {l}
                        </div>
                        <div className='horizon-split'/>
                    </div>
                )
            })}
        </div>
    )
}

export default SimpleList;
