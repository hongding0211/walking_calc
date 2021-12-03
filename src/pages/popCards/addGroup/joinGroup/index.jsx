import React, {useRef} from 'react';
import Input from '../../../components/input';
import PopCard from '../../../components/popCard';
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/12/03 00:57
 * @Component  : JoinGroup
 * @Props      : n/a
 * @Description: Card for creating a new group.
*/

const JoinGroupCard = () => {

    const groupIDRef = useRef()

    function submit() {
        // TODO
        console.log('join group submit')
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
