import React from 'react';

function Tag(props) {
    return (
        <div
            style={{
                'color': '#fff',
                'fontSize': '12px',
                'backgroundColor': '#316FE2',
                'borderRadius': '6px',
                'padding': '2px 6px 2px 6px',
                'marginRight': '5px',
                'marginBottom': '4px',
                'fontWeight': '500'
            }}
        >{props.children}</div>
    );
}

export default Tag;