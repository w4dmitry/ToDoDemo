import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Tree from './Tree';
import TextBoxButton from './TextBoxButton';
import MessagePanel from './MessagePanel';

export default class CategoryPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.data, mode: props.mode};
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            mode: nextProps.mode
        });
    }
    
    render() {
        
        return (
              <div>
                
                <TextBoxButton name="Add" hint="Add new category" onAdd={this.props.onAdd}></TextBoxButton>

                <div style={{alignSelf: 'top', borderRight:'1px solid lightgray', paddingRight:'15px', marginTop:30, minHeight:200}}>
                    {this.state.data.length === 0 ?
                         <MessagePanel value="Add category"/>
                         :
                         <Tree
                            mode={this.state.mode}
                            data={this.state.data}
                            onAdd={this.props.onAddSubCategory}
                            onRemove={this.props.onRemove}
                            onEdit={this.props.onEdit}
                            onCategorySelect={this.props.onCategorySelect}
                            onMove={this.props.onMove}/>
                    }
                </div>

              </div>
        );
    }
}