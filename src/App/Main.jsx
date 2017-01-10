import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LinearProgress from 'material-ui/LinearProgress';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import Tree from './Tree';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';

const styles = {
  container: {
    padding: 10,
    paddingTop: 30,
    minWidth:700
  },
};

var data = {
  "id": 1,
  "name": "",
  "children": [
    {
      "id": 2,
      "name": "Category 01",
      "children": [
        {
          "id": 3,
          "name": "Category 01-01"
        },
        {
          "id": 4,
          "name": "Category 01-02"
        },
        {
          "id": 5,
          "name": "Category 01-03"
        }
      ]
    },
    {
      "id": 6,
      "name": "Category 02",
      "children": [
        {
          "id": 7,
          "name": "Category 02-01"
        },
        {
          "id": 8,
          "name": "Category 02-02"
        },
        {
          "id": 9,
          "name": "Category 02-03"
        }
      ]
    },
    {
      "id": 10,
      "name": "Category 03",
      "children": [
        {
          "id": 11,
          "name": "Category 03-01"
        },
        {
          "id": 12,
          "name": "Category 03-02"
        }
      ]
    }
  ]
};


const rightEditButton = (
  <IconButton tooltip="Edit task" style={{display:'inline-block', verticalAlign:'middle'}}>
      <FontIcon className="material-icons" style={{fontSize: '12px'}}>edit</FontIcon>
  </IconButton>
);


export class Main extends Component {
  constructor(props, context) {
    super(props, context);
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
                <div style={{width:200, display:'inline-block', verticalAlign:'middle'}}><Toggle label="Show done" labelPosition="right" defaultToggled={true} style={{fontSize: '18px'}}/></div>
                <div style={{width:200, display:'inline-block', verticalAlign:'middle'}}><TextField style={{width:200, fontSize: '18px'}} hintText="Category filter"/></div>
                <div style={{marginLeft:20, display:'inline-block', verticalAlign:'middle'}}> <FloatingActionButton mini={true} style={{ fontSize: '3px' }} ><ContentClear /></FloatingActionButton></div>
              </div>

            </div>

            <LinearProgress mode="determinate" value={60} style={{height:10}}/>
          </Paper>
          

          <Paper zDepth={1} style={{marginTop:20}}>

            <div style={{padding:20, height:90, display: 'flex', justifyContent: 'space-between'}} >

              <div style={{alignSelf: 'center'}}>
                <div style={{width:200, display:'inline-block', verticalAlign:'middle'}}><TextField style={{width:200, fontSize: '18px'}} hintText="Add new category"/></div>
                <div style={{marginLeft:20, display:'inline-block', verticalAlign:'middle'}}><RaisedButton label="Add" primary={true} /></div>
              </div>

              <div style={{alignSelf: 'center'}}>
                <div style={{width:200, display:'inline-block', verticalAlign:'middle'}}><TextField style={{width:200, fontSize: '18px'}} hintText="Add new task"/></div>
                <div style={{marginLeft:20, display:'inline-block', verticalAlign:'middle'}}><RaisedButton label="Add" primary={true} /></div>
              </div>

            </div>
    

            <div style={{padding:20, display: 'flex', justifyContent: 'space-between', minHeight:'200px'}}>
              <div style={{alignSelf: 'top', width:'50%', borderRight:'1px solid gray', paddingRight:'15px'}}>
                <div><Tree data={data}/></div>
              </div>
              <div style={{alignSelf: 'top', width:'50%', paddingLeft:'25px'}}>
                <List>
                  <ListItem style={{borderBottom:'1px solid lightgray'}}
                    leftCheckbox={<Checkbox />}
                    rightIconButton={rightEditButton}
                    primaryText="(650) 555 - 1234"
                  />
                  <ListItem style={{borderBottom:'1px solid lightgray'}}
                    leftCheckbox={<Checkbox defaultChecked={true} />}
                    rightIconButton={rightEditButton}
                    primaryText="(323) 555 - 6789"
                  />
                </List>
              </div>
            </div>
            
          </Paper>




         

        </div>

        
      </MuiThemeProvider>
    );
  }
}
