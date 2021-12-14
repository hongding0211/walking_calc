import React, {useState} from 'react';
import './index.css'
import Radio from "./radio";

function RadioGroup({items = [], defaultIdx = -1, onItemSelected}) {
    const [selectedIndex, setSelectedIndex] = useState(defaultIdx)

    function itemSelectedHandler(index) {
        setSelectedIndex(index)
        if(onItemSelected)
            onItemSelected(index)
    }

    return (
        <div className='radio-group'>
            {items.map((item, index) => {
                return <Radio
                    key={index}
                    index={index}
                    tag={item}
                    selected={selectedIndex === index}
                    onItemSelected={itemSelectedHandler}
                />
            })}
        </div>
    );
}

export default RadioGroup;