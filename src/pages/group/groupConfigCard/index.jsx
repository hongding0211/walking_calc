import React, {Fragment, useEffect, useState} from 'react';
import PopCard from "../../../components/popCard";
import './index.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroupById} from "../../../features/group/groupSlice";
import {useNavigate, useParams} from "react-router-dom";
import {selectMembersByUids, selectUserData} from "../../../features/users/usersSlice";
import Avatar from "../../../components/avatar";
import {newFulfilledPromise, newRejectedPromise} from "../../../module/module";
import {dismissGroup} from "../../../api/client";
import {Map, MapvglLayer, MapvglView} from "react-bmapgl";

function GroupConfigCard() {

    const {groupId} = useParams()

    const group = useSelector(selectGroupById(groupId))

    const creator = useSelector(selectMembersByUids([group.creator]))[0]

    const uid = useSelector(selectUserData).uid

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const members = useSelector(selectMembersByUids(group.members.slice(1)))

    const [locations, setLocations] = useState([])

    const pointArr = group.records.filter(e => e.location?.long)

    let locationsList = []

    useEffect(() => {
        const convertor = new window.BMapGL.Convertor()

        for (let i = 0; i < Math.ceil(pointArr.length / 10); i++) {
            convertor.translate(pointArr.slice(i * 10, (i + 1) * 10).map(e => new window.BMapGL.Point(e.location.long, e.location.lat)), 1, 5, (data) => {
                for (const p of data.points) {
                    locationsList.push(setLocations(prevState => [...prevState, {
                        geometry: {
                            type: 'Point',
                            coordinates: [p.lng, p.lat]
                        },
                        properties: {
                            time: 1
                        }
                    }]))
                }
            })
        }
    }, [])

    async function submitHandler() {
        if (uid !== creator.uid)
            return newRejectedPromise('只有群主才可以解散')
        else {
            try {
                const res = await dismissGroup(uid, groupId)
                if (res?.code === 200) {
                    dispatch(fetchGroups(uid))
                    navigate(-2)
                    return newFulfilledPromise('解散成功')
                } else
                    return newRejectedPromise('出现错误，稍后再试')
            } catch (e) {
                return newRejectedPromise('出现错误，稍后再试')
            }
        }
    }

    return (
        <Fragment>
            <PopCard
                title='群组设置'
                btnType='delete'
                btnText='解散群组'
                onSubmit={submitHandler}
                autoPopout={false}
            >
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>群名</div>
                    <div className='group-config-text'>{group.groupName}</div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>群主</div>
                    <div className='group-config-avatar'>
                        <Avatar img={creator.img} size='20px'/>
                        <div className='group-config-avatar-name'>{creator.name}</div>
                    </div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>组员({members.length})</div>
                    <div className='group-config-member'>
                        {members.map(member => (
                            <div key={member.uid} className='group-config-avatar'>
                                <Avatar img={member.img} size='16px'/>
                                <div className='group-config-avatar-name'>{member.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>群组 ID</div>
                    <div className='group-config-text'>{group.groupID.toUpperCase()}</div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>记录条数</div>
                    <div className='group-config-text'>{group.records.length}</div>
                </div>
                <div className='horizon-split'/>
                {
                    pointArr.length > 0 && locations.length === 0 && <div className='group-config-map-skeleton'></div>
                }
                {
                    locations.length === pointArr.length &&
                    <Map
                        style={{
                            height: '150px'
                        }}
                        maxZoom='15'
                        className='group-config-map'
                        enableScrollWheelZoom={false}
                        enableDragging={false}
                        enableDoubleClickZoom={false}
                        enableRotate={false}
                        enableTilt={false}
                    >
                        <MapvglView>
                            <MapvglLayer
                                type="PointLayer"
                                autoViewport={true}
                                viewportOptions={{
                                    zoomFactor: -1
                                }}
                                data={locations}
                                options={{
                                    size: 7,
                                    color: 'rgba(71,120,255)',
                                    blender: 'lighter',
                                    shape: 'circle'
                                }}
                            />
                        </MapvglView>
                    </Map>
                }
            </PopCard>
        </Fragment>
    );
}

export default GroupConfigCard;