import React, {Component} from 'react';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class TreeNode extends Component {

    constructor(props) {
        super(props);
        this.state = {children: []};
    }

    onCategorySelect(ev) {

        if (this.props.onCategorySelect) {
            this.props.onCategorySelect(this);
        }

        ev.preventDefault();
        ev.stopPropagation();
    }

    onChildDisplayToggle(ev) {

        if (this.props.data.children) {
            if (this.state.children && this.state.children.length) {
                this.setState({children: null});
            } else {
                this.setState({children: this.props.data.children});
            }
        }
        ev.preventDefault();
        ev.stopPropagation();
    }

    render() {
        
        if (!this.state.children)
            this.state.children = [];

        const classes = classNames({
            'has-children': (this.props.data.children ? true : false),
            'open':         (this.state.children.length ? true : false),
            'closed':       (this.state.children ? false : true),
            'selected':     (this.state.selected ? true : false)
        });

       const divClasses = classNames({
            'selected':     (this.state.selected ? true : false)
        });


        if(!this.props.data.name)
        {
                return (
                <div>
                    {this.props.data.children.map(child => <TreeNode key={child.id} data={child} onCategorySelect={this.props.onCategorySelect}/>)}
                </div>
            )

        } else {

            return (

                <li onClick={this.onChildDisplayToggle.bind(this)} className={classes} ref="node">

                    <div style={{height:'40px', display: 'flex', justifyContent: 'space-between'}}  onClick={this.onCategorySelect.bind(this)} data-id={this.props.data.id}>
                        <div style={{alignSelf: 'center'}}>
                        <div className={divClasses} style={{display:'inline-block', verticalAlign:'middle', fontSize: '18px', padding:'10px'}}>{this.props.data.name}</div>
                        <IconButton tooltip="Edit task" style={{display:'inline-block', verticalAlign:'middle'}}>
                                <FontIcon className="material-icons" style={{fontSize: '12px'}}>edit</FontIcon>
                            </IconButton>
                        </div>
                        <div style={{alignSelf: 'center' }}>
                        <IconButton tooltip="Delete task" style={{display:'inline-block', verticalAlign:'middle'}}>
                                <FontIcon className="material-icons" style={{fontSize: '12px'}}>delete</FontIcon>
                            </IconButton>
                        <IconButton tooltip="Add task" style={{display:'inline-block', verticalAlign:'middle'}}>
                                <FontIcon className="material-icons" style={{fontSize: '12px'}}>add</FontIcon>
                            </IconButton>
                        </div>
                    </div>

                    <ul>
                        {this.state.children.map(child => <TreeNode key={child.id} data={child} onCategorySelect={this.props.onCategorySelect}/>)}
                    </ul>
                </li>
            )

        }





    }
}