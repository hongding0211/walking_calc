import React, {Fragment, useRef, useState} from 'react';
import './index.css'
import CardButton from "../../components/popCard/cardButton";
import {toast} from "react-hot-toast";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {login} from "../../api/client";
import {fetchUserData} from "../../features/users/usersSlice";
import {fetchGroups} from "../../features/group/groupSlice";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";


function Login() {

    const [uidValid, setUidValid] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)

    const [, setCookie,] = useCookies(['authentication'])

    const inputRef = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    function isValidPhoneNumber(number) {
        return /^\d{11}$/.test(number)
    }

    function inputChangedHandler(e) {
        const inputValue = inputRef.current.value
        if (inputValue.length > 0)
            setUidValid(isValidPhoneNumber(inputValue))

    }

    function inputKeyDownHandler(e) {
        if (e.key === 'Enter')
            submit()
    }

    async function submit() {
        if (!uidValid) {
            toast.error('手机号不合法')
        } else {
            const uid = inputRef.current.value
            const res = await login(uid)
            if (res?.code === 200) {
                // login ok
                toast.success('登录成功')
                setCookie('uid', uid, {expires: new Date(Date.now() + 30 * 24 * 3600 * 1000)})
                dispatch(fetchUserData(uid))
                dispatch(fetchGroups(uid))
                navigate('/home', {replace: true})
            } else {
                // failed to login
                toast('请先创建用户', {
                    icon: '😋'
                })
                navigate(`${location.pathname}/register?uid=${uid}`)
            }
        }
    }

    return (
        <Fragment>
            <Outlet/>
            <div className='login-container'>
                <div className='login-1 ver'>
                    <svg
                        width={32}
                        height={46}
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <defs>
                            <path
                                d="M15.027 0C12.108 0 9.503 1.762 8.51 4.407l-8.3 22.12C-.608 28.702 1.065 31 3.467 31h9.505c2.919 0 5.525-1.762 6.517-4.407l8.3-22.12c.144-.38.21-.765.21-1.14v-.007C27.995 1.56 26.511 0 24.532 0h-9.505z"
                                id="a"
                            />
                            <linearGradient
                                x1="42.364%"
                                y1="14.848%"
                                x2="63.852%"
                                y2="113.766%"
                                id="b"
                            >
                                <stop stopColor="#1C59BA" offset="0%"/>
                                <stop stopColor="#316EE2" offset="100%"/>
                            </linearGradient>
                            <path
                                d="M24.532 0c2.402 0 4.075 2.297 3.259 4.473l-8.3 22.12C18.496 29.238 15.89 31 12.972 31H3.468C1.066 31-.607 28.703.21 26.527l8.3-22.12C9.503 1.762 12.11 0 15.028 0"
                                id="d"
                            />
                            <linearGradient x1="40.534%" y1="105%" x2="55.919%" y2="15.609%" id="e">
                                <stop stopColor="#0067FF" offset="0%"/>
                                <stop stopColor="#2B77FF" offset="100%"/>
                            </linearGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                            <g transform="translate(4 15)">
                                <mask id="c" fill="#fff">
                                    <use xlinkHref="#a"/>
                                </mask>
                                <path
                                    d="M15.027 0C12.108 0 9.503 1.762 8.51 4.407l-8.3 22.12C-.608 28.702 1.065 31 3.467 31h9.505c2.919 0 5.525-1.762 6.517-4.407l8.3-22.12c.144-.38.21-.765.21-1.14v-.007C27.995 1.56 26.511 0 24.532 0h-9.505z"
                                    fill="url(#b)"
                                    mask="url(#c)"
                                />
                            </g>
                            <g opacity={0.83}>
                                <mask id="f" fill="#fff">
                                    <use xlinkHref="#d"/>
                                </mask>
                                <path
                                    d="M12.973 31H3.468C1.066 31-.607 28.703.21 26.527l8.3-22.12C9.503 1.762 12.11 0 15.028 0h9.505c2.402 0 4.075 2.297 3.259 4.473l-8.3 22.12C18.496 29.238 15.89 31 12.972 31"
                                    fill="url(#e)"
                                    mask="url(#f)"
                                />
                            </g>
                        </g>
                    </svg>
                    <div className='login-1-1'>Walking Calculator</div>
                    <div className='login-1-2'>使用手机号注册或登录</div>
                </div>

                <div className='login-2'>
                    <div className='login-2-0'>
                        <div
                            className={`login-input-container ${inputFocus ? (uidValid ? 'login-input-container-valid' : 'login-input-container-invalid') : ''}`}>
                            <span className='login-2-1'>🇨🇳</span>
                            <span className='login-2-2'>(+86)</span>
                            <input
                                ref={inputRef}
                                type='tel'
                                className='login-input'
                                onChange={inputChangedHandler}
                                onKeyDown={inputKeyDownHandler}
                                onFocus={() => setInputFocus(true)}
                                onBlur={() => setInputFocus(false)}
                            />
                        </div>
                    </div>
                    <div onClick={submit} style={{'width': '100%'}}><CardButton text='注册登录'/></div>
                    <a href='https://github.com/HongDing97/walking_calc' target='_blank' className='login-footer'
                       rel="noreferrer">by Hong</a>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;