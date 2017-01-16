import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
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
    minWidth:700
  },
};

export class Main extends Component {
  constructor(props, context) {
    super(props, context);

     this.state = {
       data: [],
       id:0,
       hintOpen:false,
       hintMessage:'',
       hintAutoHideDuration: 2000,
       hintStyle:{},
       modalDialogOpen:false
      };

  }

  onAddSubCategory(id) {
    console.log(id);
    this.refs.dialog.openDialog();
  }

  onSubCategoryNamed(id, categoryName) {
    console.log(id);
    this.refs.dialog.openDialog();
  }

  onAdd(categoryName) {

    if(!categoryName)
    {
      // Empty
      this.setState( {
        hintOpen:true,
        hintStyle:{color: '#C62828', fontWeight:'bold'},
        hintMessage:'Category name is empty!'
      })

      return;
    }

    var doesCategoryExist = false;

    this.state.data.forEach((category) => { 
      if(category.name === categoryName)
        doesCategoryExist = true;
    });

    if(doesCategoryExist){
      // Already Exist
      this.setState( {
        hintOpen:true,
        hintStyle:{color: '#C62828', fontWeight:'bold'},
        hintMessage:'Category alredy exists!'
      })

      return;
    }
    
    // Add new toplevel category
    var newId = ++this.state.id;
    var newCategory = {name:categoryName, id:newId, children:[]};
    var newData = this.state.data;
    newData.splice(0, 0, newCategory);

    this.setState({data: newData, id: newId});

  }

  render() {

    return (
      <MuiThemeProvider>

        <div style={styles.container}>
        
          <Paper zDepth={1}>

            <div style={{padding:20, height:90, display: 'flex', justifyContent: 'space-between'}} >

              <div style={{alignSelf: 'center',  verticalAlign:'middle', fontSize: '38px'}}>
                  <h5>To-Do List</h5>
              </div>

              <div style={{alignSelf: 'center'}}>
                <div style={{width:200, display:'inline-block', verticalAlign:'middle'}}>
                  <Toggle label="Show done" labelPosition="right" defaultToggled={true} style={{fontSize: '18px'}}/>
                </div>
                <div style={{width:200, display:'inline-block', verticalAlign:'middle'}}>
                  <TextField style={{width:200, fontSize: '18px'}} hintText="Task filter"/>
                </div>
                <div style={{marginLeft:20, display:'inline-block', verticalAlign:'middle'}}>
                  <FloatingActionButton mini={true} style={{ fontSize: '3px' }} ><ContentClear /></FloatingActionButton>
                </div>
              </div>

            </div>

            <LinearProgress mode="determinate" value={60} style={{height:10}}/>

          </Paper>

          <Paper zDepth={1} style={{marginTop:20}}>

            <div style={{padding:20, minHeight:'200px', display: 'flex', justifyContent: 'space-between'}} >

              <div style={{alignSelf: 'top', width:'50%'}}>
                <CategoryPanel data={this.state.data} onAdd={this.onAdd.bind(this)} onAddSubCategory={this.onAddSubCategory.bind(this)} ></CategoryPanel>
              </div>

              <div style={{alignSelf: 'top', width:'50%'}}>
                <TaskPanel></TaskPanel>
              </div>

            </div>
            
          </Paper>

        <Snackbar open={this.state.hintOpen} message={this.state.hintMessage} autoHideDuration={this.state.hintAutoHideDuration} contentStyle={this.state.hintStyle}/>

        <ModalDialogOkCancel ref="dialog" title='New Category' message='Enter  category name' autoDetectWindowHeight={false} autoScrollBodyContent={false}/>

        </div>

        
      </MuiThemeProvider>
    );
  }
}
