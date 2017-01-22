import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';

const rightEditButton = (
    <IconButton tooltip="Edit task" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <FontIcon className="material-icons" style={{ fontSize: '12px' }}>edit</FontIcon>
    </IconButton>
);

export default class TaskItem extends Component {

    constructor(props) {
        super(props);

        this.state = { data: props.data };

    }


        render() {
        return (
            <ListItem style={{borderBottom:'1px solid lightgray'}}
                            leftCheckbox={<Checkbox defaultChecked={this.state.data.done} />}
                            rightIconButton={rightEditButton}
                            primaryText={this.state.data.name} />
       );
    }

}


 