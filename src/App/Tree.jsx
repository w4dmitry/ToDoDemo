import React, {Component} from 'react';
import TreeNode from './TreeNode';
import {TREE_MODE} from './Consts';

export default class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.data, mode: props.mode};
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            mode: nextProps.mode
        });
    }

    onSelect(node) {

        if (this.state.selected ) {
            this.state.selected.setState({selected: false});
        }
        this.setState({selected: node});
        node.setState({selected: true});
        if (this.props.onCategorySelect) {
            //this.props.onCategorySelect(node);
            this.props.onCategorySelect(node.props.data.id);
        }
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <ul className="category-tree">
                        {this.state.data.map(child =>
                            <TreeNode
                                mode={this.state.mode}
                                key={child.id}
                                data={child}
                                onCategorySelect={this.onSelect.bind(this)}
                                onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                onEdit={this.props.onEdit} />)}
                    </ul>
                </div>
            </div>
        );
    }
}