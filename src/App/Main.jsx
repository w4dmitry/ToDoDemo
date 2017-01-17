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

import TaskPanel from './TaskPanel';
import CategoryPanel from './CategoryPanel';
import ModalDialogOkCancel from './ModalDialogOkCancel';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

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
      modalDialogMessageCategoryName: 'Enter new category name'
    };

    this.names = [];
    this.id = 0;

    this.state = {
      data: [],
      hintPopup: {
        open: false,
        message: '',
        style: {}
      },
      modalDialog: {
        open: false,
        title: '',
        message: '',
        names: [],
        id: 0
      }
    };

  }

  enumerateCategories(categories) {

    for(var index=0; index < categories.length; index++) {

      var category = categories[index];

      this.names.unshift(category.name);

      if (category.id > this.id)
        this.id = category.id;

      if (category.children.length > 0)
        this.enumerateCategories(category.children);
    }
  }

  findCategory(id, categories) {

    for(var index=0; index < categories.length; index++) {
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

    for(let index=0; index < categories.length; index++) {

      console.log(index);
      if (categories[index].id === id) {
        removeCategoryIndex = index;
        break;
      }

      if (categories[index].children.length > 0)
        if(this.removeCategory(id, categories[index].children) === true)
          return true;
    }

    if(removeCategoryIndex === -1)
      return false;

    categories.splice(removeCategoryIndex, 1);
    return true;
  }

  addCategory(id, name) {

    if (!this.checkCategoryName(name))
      return;

    var newId = ++this.id;
    var newCategory = { name: name, id: newId, children: [] };
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


  onAdd(categoryName) {

    this.addCategory(0, categoryName);
  }

  onAddSubCategory(id) {

    this.setState({
      modalDialog: {
        open: true,
        title: this.constants.modalDialogTitleNewCategory,
        message: this.constants.modalDialogMessageCategoryName,
        names: this.names,
        id: id
      }
    })
  }

  onRemove(id) {

    console.log("TOP LEVEL: " + id);
      
    var newData = this.state.data;

    var result = this.removeCategory(id, newData);

    if(result === true) {
      this.names = [];
      this.id = 0;
      this.enumerateCategories(newData);
    }

      

    console.log(newData);
    console.log(this.names);
    console.log(this.id);

    this.setState({ data: newData });
  }

  dialogResultCallback(result) {

    if(result.Confirmed === true)
      this.addCategory(this.state.modalDialog.id, result.Result);

    this.setState({
      modalDialog: {
        open: false
      }
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
                  <Toggle label="Show done" labelPosition="right" defaultToggled={true} style={{ fontSize: '18px' }} />
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
                  data={this.state.data}
                  onAdd={msg => this.onAdd(msg)}
                  onAddSubCategory={id => this.onAddSubCategory(id)}
                  onRemove={id => this.onRemove(id)}/>
              </div>

              <div style={{ alignSelf: 'top', width: '50%' }}>
                <TaskPanel></TaskPanel>
              </div>

            </div>

          </Paper>

          <Snackbar open={this.state.hintPopup.open} message={this.state.hintPopup.message} autoHideDuration={this.constants.hintAutoHideDuration} contentStyle={this.state.hintPopup.style} />

          <ModalDialogOkCancel
            ref="modalDialog"
            open={this.state.modalDialog.open}
            title={this.state.modalDialog.title}
            message={this.state.modalDialog.message}
            asyncDialogResultCallback={(result) => this.dialogResultCallback(result)} />

        </div>


      </MuiThemeProvider>
    );
  }
}
