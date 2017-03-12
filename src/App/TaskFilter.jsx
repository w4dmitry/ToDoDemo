import React, {Component} from 'react';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

export default class TaskFilter extends Component {

    constructor(props) {
        super(props);
        this.state = props.filter;
    }

    onDoneToggle(event, state) {
        if(this.props.onDoneToggle)
            this.props.onDoneToggle(state);
    }

    onTextChange(event) {
        this.updateText(event.target.value);
    }

    onClear() {
        this.updateText('');
    }

    updateText(text) {
        this.setState({text: text});

        if(this.props.onTextChanged)
            this.props.onTextChanged(text);
    }

    render() {
        let text = this.state.text;
        let done = this.state.done;

        return (
             <div>
                <div style={{ width: 200, display: 'inline-block', verticalAlign: 'middle' }}>
                  <Toggle label="Show done" labelPosition="right" defaultToggled={done} style={{ fontSize: '18px' }} onToggle={(event, state) => this.onDoneToggle(event, state)} />
                </div>
                <div style={{ width: 200, display: 'inline-block', verticalAlign: 'middle' }}>
                  <TextField style={{ width: 200, fontSize: '18px' }} hintText="Task filter" value={text}  onChange={event => this.onTextChange(event)}/>
                </div>
                <div style={{ marginLeft: 20, display: 'inline-block', verticalAlign: 'middle' }}>
                  <FloatingActionButton mini={true} style={{ fontSize: '3px' }} onClick={() => this.onClear()}>
                      <ContentClear />
                  </FloatingActionButton>
                </div>
              </div>
        );
    }
}