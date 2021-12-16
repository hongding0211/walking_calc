import React, {useRef} from 'react';
import Input from '../../../../components/input';
import PopCard from '../../../../components/popCard';
import {joinGroup} from "../../../../api/client";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../../../features/users/usersSlice";
import {fetchGroups} from "../../../../features/group/groupSlice";

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/12/03 00:57
 * @Component  : JoinGroup
 * @Props      : n/a
 * @Description: Card for creating a new group.
*/

const JoinGroupCard = () => {

    const groupIDRef = useRef()

    const dispatch = useDispatch()

    const {uid} = useSelector(selectUserData)

    async function submit() {
        let res = await joinGroup(uid, groupIDRef.current.value)
        if (res?.code === 200) {
            dispatch(fetchGroups(uid))
            return new Promise(resolve => resolve('加入成功'))
        }
        return new Promise((_, reject) => reject('操作失败，检查群组 ID'))
    }

    return (
        <div>
            <PopCard
                title='加入一个群组'
                onSubmit={submit}
            >
                <Input title='群组 ID' inputRef={groupIDRef}/>
            </PopCard>
        </div>
    )
}

export default JoinGroupCard;
