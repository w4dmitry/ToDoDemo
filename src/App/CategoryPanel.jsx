import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Tree from './Tree';
import TextBoxButton from './TextBoxButton';

export default class CategoryPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.data};
    }

    render() {
        
        return (
              <div>
                
                <TextBoxButton name="Add" hint="Add new category" onAdd={this.props.onAdd}></TextBoxButton>

                <div style={{alignSelf: 'top', borderRight:'1px solid gray', paddingRight:'15px', marginTop:30}}>
                    <Tree data={this.state.data} onAdd={this.props.onAddSubCategory}/>
                </div>

              </div>
        );
    }
}