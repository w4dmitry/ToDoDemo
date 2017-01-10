import React, {Component} from 'react';
import TreeNode from './TreeNode';

export default class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.data};
    }

    onSelect(node) {
        if (this.state.selected ) {
            this.state.selected.setState({selected: false});
        }
        this.setState({selected: node});
        node.setState({selected: true});
        if (this.props.onCategorySelect) {
            this.props.onCategorySelect(node);
        }
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <ul className="category-tree">
                        <TreeNode key={this.state.data.id} data={this.state.data} onCategorySelect={this.onSelect.bind(this)}/>
                    </ul>
                </div>
            </div>
        );
    }
}