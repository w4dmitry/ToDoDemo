import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class TextBoxButton extends Component {

    constructor(props) {
        super(props);

        this.state = {hint: props.hint, name: props.name, message:''};
    }

    onAdd(){

        if(this.props.onAdd)
            this.props.onAdd(this.state.message);

        this.setState({message: ''});
    }


    onChange(ev) {
        this.setState({message: ev.target.value});
    }

    render() {
        var message = this.state.message;

        return (
            <div>
                <div style={{width:200, display:'inline-block', verticalAlign:'middle'}}>
                    <TextField style={{fontSize: '18px'}} hintText={this.state.hint} value={message} onChange={this.onChange.bind(this)}/>
                </div>
                
                <div style={{marginLeft:20, display:'inline-block', verticalAlign:'middle'}}>
                    <RaisedButton label={this.state.name} primary={true} onClick={this.onAdd.bind(this)} />
                </div>
            </div>
        );
    }
}