import './App.css'
import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";
import {login} from "./api/client";
import {fetchUserData} from "./features/users/usersSlice";
import {fetchGroups} from "./features/group/groupSlice";
import {useDispatch} from "react-redux";

export default function App() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [cookies, , removeCookies] = useCookies(['authentication']);

    useEffect(() => {
            const uid = cookies.uid
            if (!uid) {
                navigate('/login')
            }
            login(uid).then(v => {
                if (v?.code === 200) {
                    // cookie valid
                    dispatch(fetchUserData(uid))
                    dispatch(fetchGroups(uid))
                    navigate('/home')
                } else {
                    removeCookies('uid')
                    navigate('/login')
                }
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    return (
        <div>
            <Toaster/>
            <Outlet/>
        </div>
    )
}
