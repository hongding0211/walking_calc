import React, {useState} from 'react';
import './index.css'
import Select from "./select";

function SelectGroup({items = [], defaultIdx = [], onItemsSelected}) {
    const [selectedIndex, setSelectedIndex] = useState(defaultIdx)

    function itemSelectedHandler(index) {
        const findIdx = selectedIndex.indexOf(index)
        let newSelectedIndex = [...selectedIndex]
        if (findIdx < 0)
            newSelectedIndex.push(index)
        else
            newSelectedIndex.splice(findIdx, 1)
        setSelectedIndex(newSelectedIndex)
        if (onItemsSelected)
            onItemsSelected(newSelectedIndex)
    }

    return (
        <div className='select-group'>
            {items.map((item, index) => {
                return <Select
                    key={index}
                    index={index}
                    tag={item}
                    selected={selectedIndex.includes(index)}
                    onItemSelected={itemSelectedHandler}
                />
            })}
        </div>
    );
}

export default SelectGroup;