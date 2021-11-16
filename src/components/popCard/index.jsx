import React, { Component } from 'react'
import CardButton from './cardButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:18
 * @Component  : PopCard
 * @Props      : title:          String
 *               btnType:        String { normal, warning, none }
 *               loadingIcon:    Boolean
 *               closeCallback:  Function() -> To close the card itself.
 *               children:       Component -> Content in the card
 * @Description: A blank and basic pop-out card with an optional button.
*/

class PopCard extends Component {

    static defaultProps = {
        btnType: 'normal',
        loadingIcon: false,
        closeCallback: () => {
            console.error('Popcard does not have a close callback.')
        }
    }

    render() {
        const { title, btnType, loadingIcon, closeCallback, children } = this.props

        return (
            <div className='pop-card'>

                <div className='pop-card-header'>
                    <div>{title}</div>
                    <div onClick={closeCallback}>
                        <FontAwesomeIcon icon={faTimes} transform="shrink-6" />
                    </div>
                </div>

                <div className='pop-card-content'>
                    {children}
                </div>

                {btnType !== 'none' &&
                    <div onClick={this.props.onCardbtnClick} style={{ width: '100%' }}>
                        <CardButton type={btnType} loadingIcon={loadingIcon} />
                    </div>
                }

            </div>
        )
    }
}

export default PopCard
