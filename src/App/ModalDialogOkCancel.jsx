import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class ModalDialogOkCancel extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false, message:'', hasNoText:true};
    }

  openDialog = () => {
    this.setState({open: true});
  };

  closeDialog = (isOK) => {
      console.log(isOK);
    this.setState({open: false});
  };

    onChange(ev) {

        console.log(ev.target.value.length);

        var hasNoText = !(ev.target.value.length > 0);

        this.setState({message: ev.target.value, hasNoText:hasNoText});

        
    }

  render() {

    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={() => this.closeDialog(false)}/>,
      <FlatButton label="Ok"     primary={true} onTouchTap={() => this.closeDialog(true)} disabled={this.state.hasNoText}/>
    ];

    return (
      <div>
        <Dialog title={this.props.title} actions={actions} modal={true} open={this.state.open}>
            <TextField style={{fontSize: '18px'}} hintText={this.props.message} value={this.state.message} onChange={this.onChange.bind(this)}/>          
        </Dialog>
      </div>
    );
  }
}