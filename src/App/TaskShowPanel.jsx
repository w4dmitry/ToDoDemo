import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';

import TextBoxButton from './TextBoxButton';
import MessagePanel from './MessagePanel';
import TaskItem from './TaskItem';

export default class TaskShowPanel extends Component {

    constructor(props) {
        super(props);

        this.constants = {
            // Hint
            hintAutoHideDuration: 2000,
            hintErrorStyle: { color: '#C62828', fontWeight: 'bold' },
            hintMsgDuplicateTask: 'Task name alredy exists!',
            hintMsgTaskEmptyName: 'Task name is empty!',
        };

        this.state = {
            data: props.data,
            categoryId: props.categoryId,
            taskId: props.taskId,
            hintPopup: {
                open: false,
                message: '',
                style: {}
            }
        };
    }

    addTask(name) {


        if (!this.checkTaskName(name))
            return;

        let newData = this.state.data;

        let newId = ++this.state.taskId;


        let newTask = { name: name, id: newId, done: false, description:"" };

        newData.unshift(newTask);

        this.setState({ data: newData });

        if (this.props.addTask)
            this.props.addTask(this.state.categoryId, newTask);
    }

    getTaskId(tasks) {

        let id = -1;

        for (let index = 0; index < tasks.length; index++) {

            if (tasks[index].id > id)
                id = tasks[index].id;
        }

        return id === -1 ? 0 : id;
    }

    checkTaskName(name) {

        // Should not be empty
        if (!name) {
            this.setState({
                hintPopup: {
                    open: true,
                    message: this.constants.hintMsgTaskEmptyName,
                    style: this.constants.hintErrorStyle
                }
            })

            return false;
        }

        return true;
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            data: nextProps.data,
            categoryId: nextProps.categoryId,
            taskId: nextProps.taskId
        });
    }

    render() {
        return (

            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TextBoxButton name="Add" hint="Add new task" onAdd={name => this.addTask(name)}></TextBoxButton>
                </div>

                <div style={{ alignSelf: 'center', paddingRight: 15, paddingLeft: 15, marginTop: 30 }}>

                    {this.state.data.length === 0 ?
                        <MessagePanel value="Add task" />
                        :
                        <List>
                            {this.state.data.map(task =>
                                <TaskItem key={task.id} data={task} editTask={this.props.editTask} />)}
                        </List>
                    }
                </div>

                <Snackbar open={this.state.hintPopup.open} message={this.state.hintPopup.message} autoHideDuration={this.constants.hintAutoHideDuration} contentStyle={this.state.hintPopup.style} />
            </div>

        );
    }
}