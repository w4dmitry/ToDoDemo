import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import TextBoxButton from './TextBoxButton';
import MessagePanel from './MessagePanel';
import TaskItem from './TaskItem';

export default class TaskEditPanel extends Component {

    constructor(props) {
        super(props);

        this.state = { id: this.props.task.id, name: this.props.task.name, description: this.props.task.description, done: this.props.task.done };
    }

    onSaveChanges() {

        if (this.props.saveChanges)
            this.props.saveChanges(this.state);
    }

    
    onCancel() {

        if (this.props.cancleChanges)
            this.props.cancleChanges();
    }

    onNameChange(event) {

        this.setState({
            name: event.target.value,
        });
    }
    onDescriptionChange(event) {

        this.setState({
            description: event.target.value,
        });
    }

    onToggle(event, isInputChecked)
    {
        this.setState({
            done: isInputChecked
        })        
    }

    render() {
        return (

            <div style={{marginTop: 70, marginLeft:20, marginRight:10 }}>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <RaisedButton label="Save changes" primary={true} onClick={() => this.onSaveChanges()} />
                    <RaisedButton label="Cancel" primary={false} onClick={() => this.onCancel()} style={{marginLeft:10}} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30}}>
                    <div style={{ alignSelf: 'center' }}>
                        <TextField 
                            style={{fontSize: '18px'}}
                            hintText="Task name"
                            value={this.state.name}
                            onChange={ev => this.onNameChange(ev)}/>
                    </div>
                    <div style={{ alignSelf: 'center' }}>
                        <Checkbox  label="Done" style={{ fontSize: '18px' }} defaultChecked={this.state.done} onCheck={(event, isInputChecked) => this.onToggle(event, isInputChecked)} />
                    </div>
                </div>

                <TextField
                    hintText="Task description"
                    multiLine={true}
                    rows={1}
                    rowsMax={10}
                    fullWidth={true}
                    style={{fontSize: '18px'}}
                    value={this.state.description}
                    onChange={ev => this.onDescriptionChange(ev)}/>
            </div>
        );
    }
}