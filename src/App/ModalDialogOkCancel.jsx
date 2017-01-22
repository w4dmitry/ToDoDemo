import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class ModalDialogOkCancel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      message: props.message,
      title: props.title,
      value: 'value' in props ? props.value : '',
      hasNoText: 'value' in props ? (props.value ? false : true) : true
    };

  }

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = (isOK) => {

    this.setState({ open: false });

    if (this.props.asyncDialogResultCallback)
      this.props.asyncDialogResultCallback({ 'Confirmed': isOK, 'Result': this.state.value })

  };

  onChange(ev) {

    var hasNoText = !(ev.target.value.length > 0);

    this.setState({
      value: ev.target.value,
      hasNoText: hasNoText
    });


  }

  componentWillReceiveProps(nextProps) {

    // Update state only if dialog is closed
    if (this.state.open)
      return;

    this.setState({
      open: nextProps.open,
      message: nextProps.message,
      title: nextProps.title,
      value: 'value' in nextProps ? nextProps.value : '',
      hasNoText: 'value' in nextProps ? (nextProps.value ? false : true) : true
    });

  }

  render() {

    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={() => this.closeDialog(false)} />,
      <FlatButton label="Ok" primary={true} onTouchTap={() => this.closeDialog(true)} disabled={this.state.hasNoText} />
    ];

    return (
      <div>
        <Dialog title={this.state.title} actions={actions} modal={true} open={this.state.open}>
          <TextField ref="mainInput" autoFocus='true' style={{ fontSize: '18px' }} hintText={this.state.message} value={this.state.value} onChange={ev => this.onChange(ev)} />
        </Dialog>
      </div>
    );
  }
}