import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import TextBoxButton from './TextBoxButton';

const rightEditButton = (
  <IconButton tooltip="Edit task" style={{display:'inline-block', verticalAlign:'middle'}}>
      <FontIcon className="material-icons" style={{fontSize: '12px'}}>edit</FontIcon>
  </IconButton>
);

export default class TaskPanel extends Component {

    render() {
        return (
              <div>
                
                <div style={{float:'right'}}>
                    <TextBoxButton name="Add" hint="Add new task" onAdd={function(){}}></TextBoxButton>
                </div>

                <div style={{clear:'right'}}/>

                <div style={{alignSelf: 'top',  paddingLeft:25, marginTop:30}}>
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
        );
    }
}