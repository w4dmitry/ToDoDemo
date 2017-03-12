import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';

import TextBoxButton from './TextBoxButton';
import MessagePanel from './MessagePanel';
import TaskItem from './TaskItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';

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
            filter: props.filter,
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


        let newTask = { name: name, id: newId, done: false, description:"", categoryId: this.state.categoryId };

        newData.unshift(newTask);

        this.setState({ data: newData });

        if (this.props.addTask)
            this.props.addTask(newTask.categoryId, newTask);
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
            filter: nextProps.filter,
            data: nextProps.data,
            categoryId: nextProps.categoryId,
            taskId: nextProps.taskId
        });
    }

    onEdit(id) {

        if (this.props.editTask)
            this.props.editTask(id);
    }

    isTaskVisible(task) {

        if(this.state.filter.done === true && task.done === false)
            return false;
        
        if(!this.state.filter.text)
            return true;

        if(task.name.includes(this.state.filter.text) || task.description.includes(this.state.filter.text))
            return true;

        return false;
    }

    render() {

        let data = [];
        this.state.data.forEach(task => this.isTaskVisible(task) ? data.push(task) : null );

        return (

            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TextBoxButton name="Add" hint="Add new task" onAdd={name => this.addTask(name)}></TextBoxButton>
                </div>

                <div style={{ alignSelf: 'strech', paddingLeft: 15, marginTop: 30 }}>

                    {data.length === 0 ?
                        <MessagePanel value="Add task" />
                        :
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {data.map(task =>
                                    <TableRow key={task.id}>
                                        <TableRowColumn style={{width: '50px', padding:0}}>
                                            <Checkbox style={{marginRight: "auto", marginLeft: "10px"}} checked={task.done} />
                                        </TableRowColumn>
                                        <TableRowColumn >
                                            <p style={{ fontSize: '18px'}}> {task.name} </p>
                                        </TableRowColumn>
                                        <TableRowColumn style={{width: '60px', padding:0}}>
                                            <IconButton tooltip="Edit task" style={{ marginLeft: "auto" }}  onClick={() => this.onEdit(task.id)}>
                                                <FontIcon className="material-icons" style={{ fontSize: '12px' }}>edit</FontIcon>
                                            </IconButton>
                                        </TableRowColumn>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    }
                </div>

                <Snackbar open={this.state.hintPopup.open} message={this.state.hintPopup.message} autoHideDuration={this.constants.hintAutoHideDuration} contentStyle={this.state.hintPopup.style} />
            </div>

        );
    }
}
