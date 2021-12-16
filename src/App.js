import './App.css'
import React, {useEffect} from 'react'
import {Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";
import {login} from "./api/client";
import {fetchUserData, request2JoinGroup} from "./features/users/usersSlice";
import {fetchGroups} from "./features/group/groupSlice";
import {useDispatch} from "react-redux";

export default function App() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [cookies, , removeCookies] = useCookies(['authentication']);

    const [searchParams] = useSearchParams()

    useEffect(() => {
            const requestJoinGroupId = searchParams.get('share')
            if (requestJoinGroupId) {
                dispatch(request2JoinGroup(requestJoinGroupId))
            }

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
