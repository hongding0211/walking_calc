/*
 * @Project    : walking_calc
 * @Created    : hong 2021/12/03 10:46
 * @Component  : MainCard
 * @Props      : debt: Number
 * @Description: MainCard
*/

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faCreditCard} from '@fortawesome/free-solid-svg-icons'
import './index.css'
import {formatDebt} from "../../../module/module";

const MainCard = (props) => {
    const {debt} = props

    return (
        <div className='main-card'>
            <div className={`main-card-top ${debt > -1e-2 ? 'color-p' : 'color-n'}`}>
                <span className="fa-layers fa-fw main-card-top-l">
                    <FontAwesomeIcon icon={faCircle}/>
                    <FontAwesomeIcon icon={faCreditCard} inverse transform="shrink-8"/>
                </span>
                <span className='main-card-top-r'>债务统计</span>
            </div>
            <div className='main-card-bottom'>
                <span>{formatDebt(debt)}</span>
            </div>
        </div>
    )
}

export default MainCard