import React from 'react';
import {grey300} from 'material-ui/styles/colors';

export default function MessagePanel(props) {

    return (
        <div className='center-content'>
            <p style={{color:grey300, fontWeight: 'bold', fontSize: 24}}>{props.value}</p>
        </div>
    );
}