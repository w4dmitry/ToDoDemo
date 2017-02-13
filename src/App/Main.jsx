import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

import TaskShowPanel from './TaskShowPanel';
import TaskShowPanel2 from './TaskShowPanel2';
import TaskEditPanel from './TaskEditPanel';

import CategoryPanel from './CategoryPanel';
import ModalDialogOkCancel from './ModalDialogOkCancel';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

import {TREE_MODE} from './Consts';

const styles = {
  container: {
    padding: 10,
    paddingTop: 30,
    minWidth: 700
  },
};

export class Main extends Component {

  constructor(props, context) {

    super(props, context);

    this.constants = {
      // Hint
      hintAutoHideDuration: 2000,
      hintErrorStyle: { color: '#C62828', fontWeight: 'bold' },
      hintMsgDuplicateCategory: 'Category name alredy exists!',
      hintMsgCategoryEmptyName: 'Category name is empty!',
      // Modal Dialog
      modalDialogTitleNewCategory: 'New category',
      modalDialogMessageCategoryName: 'Enter new category name',
      modalDialogTitleEditCategory: 'Edit category',
      modalDialogMessageEditCategoryName: 'Edit category name'
    };

    this.ModalDialogMode = {
      ADD: 1,
      EDIT: 2
    };

    this.names = [];
    this.id = 0;
    this.taskId = 0;

    this.state = {
      data: [],
      selectedCategory: null,
      mode: TREE_MODE.NODE_BUILD,
      
      task: null,
      newTaskCategoryId: null,

      hintPopup: {
        open: false,
        message: '',
        style: {}
      },
      modalDialog: {
        open: false,
        mode: this.ModalDialogMode.ADD,
        title: '',
        message: '',
        names: [],
        id: 0
      }
    };

  }

  enumerateTasks(categories) {

    for (var index1 = 0; index1 < categories.length; index1++) {

      var category = categories[index1];

      for (var index2 = 0; index2 < category.tasks.length; index2++) {
        let task  = category.tasks[index2];
        
        if(task.id > this.taskId)
          this.taskId = task.id;
      }

      if (category.children.length > 0)
        this.enumerateCategories(category.children);
    }
  }

  findTask(id, categories) {

    for (let index = 0; index < categories.length; index++) {

      let category = categories[index];

      for (let index2 = 0; index2 < category.tasks.length; index2++) {

        let task  = category.tasks[index2];
        
        if(task.id === id)
          return task;
      }

      if (category.children.length > 0) {

        var result = this.findTask(id, category.children);

        if (result !== null)
          return result;
      }

    }

    return null;
  }

  enumerateCategories(categories) {

    for (var index = 0; index < categories.length; index++) {

      var category = categories[index];

      this.names.unshift(category.name);

      if (category.id > this.id)
        this.id = category.id;

      if (category.children.length > 0)
        this.enumerateCategories(category.children);
    }
  }

  findCategory(id, categories) {

    for (var index = 0; index < categories.length; index++) {
      var category = categories[index];

      if (category.id === id)
        return category;

      if (category.children.length > 0) {

        var result = this.findCategory(id, category.children);

        if (result !== null)
          return result;
      }
    }

    return null;
  }

  removeCategory(id, categories) {

    let removeCategoryIndex = -1;

    for (let index = 0; index < categories.length; index++) {

      if (categories[index].id === id) {
        removeCategoryIndex = index;
        break;
      }

      if (categories[index].children.length > 0)
        if (this.removeCategory(id, categories[index].children) === true)
          return true;
    }

    if (removeCategoryIndex === -1)
      return false;

    categories.splice(removeCategoryIndex, 1);
    return true;
  }

  addCategory(id, name) {

    if (!this.checkCategoryName(name))
      return;

    var newId = ++this.id;
    var newCategory = { name: name, id: newId, tasks:[], children: [] };
    var newData = this.state.data;

    if (id === 0) {

      newData.unshift(newCategory);

    } else {

      var parentCategory = this.findCategory(id, newData);

      if (parentCategory === null)
        return;

      parentCategory.children.unshift(newCategory);
    }

    this.names.unshift(name);
    this.setState({ data: newData, id: newId });
  }

  editCategory(id, name) {

    if (!this.checkCategoryName(name))
      return;

    let newData = this.state.data;
    let category = this.findCategory(id, newData);

    if (category === null)
      return;

    category.name = name;
    this.enumerateCategories(newData);

    this.setState({ data: newData });
  }

  checkCategoryName(name) {

    // Should not be empty
    if (!name) {
      this.setState({
        hintPopup: {
          open: true,
          message: this.constants.hintMsgCategoryEmptyName,
          style: this.constants.hintErrorStyle
        }
      })

      return false;
    }

    if (this.names.indexOf(name) !== -1) {

      // Should not be a duplicate
      this.setState({
        hintPopup: {
          open: true,
          message: this.constants.hintMsgDuplicateCategory,
          style: this.constants.hintErrorStyle
        }
      })

      return false;
    }

    return true;
  }

  onEdit(id) {

    var category = this.findCategory(id, this.state.data);

    if (!category)
      return;

    this.setState({
      modalDialog: {
        open: true,
        mode: this.ModalDialogMode.EDIT,
        title: this.constants.modalDialogTitleEditCategory,
        message: this.constants.modalDialogMessageEditCategoryName,
        names: this.names,
        value: category.name,
        id: id
      }
    })
  }

  onAdd(categoryName) {

    this.addCategory(0, categoryName);
  }

  onAddSubCategory(id) {

    this.setState({
      modalDialog: {
        open: true,
        mode: this.ModalDialogMode.ADD,
        title: this.constants.modalDialogTitleNewCategory,
        message: this.constants.modalDialogMessageCategoryName,
        names: this.names,
        id: id
      }
    })
  }

  onRemove(id) {

    var newData = this.state.data;

    var result = this.removeCategory(id, newData);

    if (result === true) {
      this.names = [];
      this.id = 0;
      this.enumerateCategories(newData);
    }

    this.setState({ data: newData, selectedCategory: null });
  }

  onSelected(id) {

    var category = this.findCategory(id, this.state.data);

    if (!category)
      return;

    this.setState({ selectedCategory: category });

  }

  addTask(id, task) {
   this.enumerateTasks(this.state.data);
  }

  dialogResultCallback(result) {

    if (result.Confirmed === true) {

      switch (this.state.modalDialog.mode) {
        case this.ModalDialogMode.ADD:
          this.addCategory(this.state.modalDialog.id, result.Result);
          break;
        case this.ModalDialogMode.EDIT:
          this.editCategory(this.state.modalDialog.id, result.Result);
          break;
        default:
          break;
      }
    }

    this.setState({
      modalDialog: {
        open: false
      }
    })
  }

  onToggle(event, state)
  {
      let mode = TREE_MODE.NODE_BUILD;
      if(state === false)
        mode = TREE_MODE.NODE_SELECT;
      this.setState({
        mode: mode
      })        
  }

  editTask(id) {

      this.setState({
        mode: TREE_MODE.NODE_SELECT,
        task: this.findTask(id, this.state.data)
      })
  }

  saveTask(task) {
    
    let prevTask = this.findTask(task.id, this.state.data);

    prevTask.name = task.name;
    prevTask.description = task.description;
    prevTask.done = task.done;

    if(task.categoryId !== this.state.newTaskCategoryId) {
      
      prevTask.categoryId = this.state.newTaskCategoryId;
      
      let newCategory = this.findCategory(this.state.newTaskCategoryId, this.state.data);
      let oldCategory = this.findCategory(task.categoryId, this.state.data);

      // Move task
      let taskIndex = -1;
      for(var i = 0, length = oldCategory.tasks.length; i < length; i++) {
          if (oldCategory.tasks[i].id === task.id) {
            taskIndex = i;
            break;
          }
      }

      if(taskIndex > -1) {
        oldCategory.tasks.splice(taskIndex, 1);
        newCategory.tasks.unshift(prevTask);
      }

    }

     this.setState({
        mode: TREE_MODE.NODE_BUILD
      })
    
  }
  
  cancelTask() {
      this.setState({
        mode: TREE_MODE.NODE_BUILD
      })
  }

  onMoveTaskToCategory(id) {

      this.setState({
        newTaskCategoryId: id
      })
  }

  render() {

    return (
      <MuiThemeProvider>

        <div style={styles.container}>

          <Paper zDepth={1}>

            <div style={{ padding: 20, height: 90, display: 'flex', justifyContent: 'space-between' }} >

              <div style={{ alignSelf: 'center', verticalAlign: 'middle', fontSize: '38px' }}>
                <h5>To-Do List</h5>
              </div>

              <div style={{ alignSelf: 'center' }}>
                <div style={{ width: 200, display: 'inline-block', verticalAlign: 'middle' }}>
                  <Toggle label="Show done" labelPosition="right" defaultToggled={true} style={{ fontSize: '18px' }} onToggle={(event, state) => this.onToggle(event, state)} />
                </div>
                <div style={{ width: 200, display: 'inline-block', verticalAlign: 'middle' }}>
                  <TextField style={{ width: 200, fontSize: '18px' }} hintText="Task filter" />
                </div>
                <div style={{ marginLeft: 20, display: 'inline-block', verticalAlign: 'middle' }}>
                  <FloatingActionButton mini={true} style={{ fontSize: '3px' }} ><ContentClear /></FloatingActionButton>
                </div>
              </div>

            </div>

            <LinearProgress mode="determinate" value={60} style={{ height: 10 }} />

          </Paper>

          <Paper zDepth={1} style={{ marginTop: 20 }}>

            <div style={{ padding: 20, minHeight: '200px', display: 'flex', justifyContent: 'space-between' }} >

              <div style={{ alignSelf: 'top', width: '50%' }}>
                <CategoryPanel
                  mode={this.state.mode}
                  data={this.state.data}
                  onAdd={msg => this.onAdd(msg)}
                  onAddSubCategory={id => this.onAddSubCategory(id)}
                  onRemove={id => this.onRemove(id)}
                  onEdit={id => this.onEdit(id)}
                  onCategorySelect={id => this.onSelected(id)}
                  onMove={id => this.onMoveTaskToCategory(id)} />
              </div>

              <div style={{ alignSelf: 'top', width: '50%' }}>
                {this.state.selectedCategory !== null ?
                
                   (this.state.mode === TREE_MODE.NODE_BUILD ?
                      <TaskShowPanel2
                          data={this.state.selectedCategory.tasks}
                          categoryId={this.state.selectedCategory.id}
                          taskId={this.taskId}
                          addTask={(id,task) => this.addTask(id, task)}
                          editTask={(id) => this.editTask(id)}/>
                      :
                      <TaskEditPanel
                        task={this.state.task}
                        saveChanges={task => this.saveTask(task)}
                        cancleChanges={() => this.cancelTask()}/>
                   )
                  :
                  null
                }
              </div>

            </div>

          </Paper>

          <Snackbar
            open={this.state.hintPopup.open}
            message={this.state.hintPopup.message}
            autoHideDuration={this.constants.hintAutoHideDuration}
            contentStyle={this.state.hintPopup.style} />

          <ModalDialogOkCancel
            ref="modalDialog"
            open={this.state.modalDialog.open}
            title={this.state.modalDialog.title}
            message={this.state.modalDialog.message}
            value={this.state.modalDialog.value}
            asyncDialogResultCallback={(result) => this.dialogResultCallback(result)} />

        </div>


      </MuiThemeProvider>
    );
  }
}
