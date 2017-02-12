import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';

export default class TaskItem extends Component {

    constructor(props) {
        super(props);

        this.state = { data: props.data };

    }

    onEdit() {

        if (this.props.editTask)
            this.props.editTask(this.props.data.id);
    }

    render() {
        return (
            <ListItem style={{borderBottom:'1px solid lightgray'}}
                            leftCheckbox={<Checkbox checked={this.state.data.done} />}
                            rightIconButton={(
                                <IconButton tooltip="Edit task" style={{ display: 'inline-block', verticalAlign: 'middle' }}  onClick={() => this.onEdit()}>
                                    <FontIcon className="material-icons" style={{ fontSize: '12px' }}>edit</FontIcon>
                                </IconButton>
                            )}
                            primaryText={this.state.data.name} />
       );
    }

}


 