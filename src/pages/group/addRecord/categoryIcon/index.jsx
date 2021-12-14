import React from 'react';

function CategoryIcon(props) {
    const {icon,text} = props
    return (
        <div style={{'height':'45px'}} className='flex-align-center flex-vertical-split'>
            <span style={{'fontSize':'20px'}}>{icon}</span>
            <span style={{'fontSize':'10px', 'fontWeight':'600', 'color':'#A3A3A3'}}>{text}</span>
        </div>
    );
}

export default CategoryIcon;