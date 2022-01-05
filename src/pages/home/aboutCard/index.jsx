import React, {Fragment} from 'react';
import PopCard from "../../../components/popCard";
import './index.css'
import logo from './logo192.png'
import buildInfo from '../../../buildInfo.json'

function About() {
    return (
        <Fragment>
            <PopCard title='About' btnType='none'>
                <div className='about-container'>
                    <img src={logo} alt='logo' style={{'height': '70px', 'width': '70px'}}/>
                    <div className='about-text-container'>
                        <span className='about-text-main margin-bottom-5'>Walking Calculator</span>
                        <span className='about-text-2 margin-bottom-15'>Build with React</span>
                        <span className='about-text-3 margin-bottom-5'>Commit: {buildInfo.commit}</span>
                        <span className='about-text-3 margin-bottom-15'>Build: {buildInfo.build}</span>
                        <span
                            className='about-text-3 about-text-sub margin-bottom-5'>© {new Date(Date.now()).getFullYear()} Hong</span>
                        <span className='about-text-3 margin-bottom-5 about-text-sub'>
                            <a href='https://github.com/HongDing97/walking_calc' target='_blank' rel="noreferrer">Github Repo</a>
                        </span>
                    </div>
                </div>
            </PopCard>
        </Fragment>
    );
}

export default About;