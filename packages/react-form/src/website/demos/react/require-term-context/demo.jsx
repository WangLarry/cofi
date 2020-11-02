/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import { createForm, FormContext, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';

class Form extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <React.Fragment>
        <Styled.MainElement>
          <Button className="switch-user" color="secondary" variant="contained" 
            onClick={this.props.onSwitchUser}>Switch User</Button>
          <h4 className="logged-in-user">Current User: {this.props.userType}</h4>
          <Field id="mergeReason" />
          <Styled.FormFooter>
            <Button disabled={!this.context.model.dirty || this.context.model.invalid
              || this.context.model.processing} onClick={this.save}
            aria-label="Save" color="primary" variant="contained">Save</Button>
          </Styled.FormFooter>
        </Styled.MainElement>
        <Styled.MainElement>
          <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
        </Styled.MainElement>
      </React.Fragment>);
  }

  save = () => {
    this.context.actions.changeData({});
  }
}

const MyForm = createForm(form)(Form);

class App extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);
    this.state = { 
      appData: {
        userType: 'NORMAL',
      },
    };
  }

  render() {
    return (<MyForm onSwitchUser={this.switchUser} userType={this.state.appData.userType} context={this.state.appData} />);
  }

  switchUser = () => {
    // update the form's context reference, to trigger "changeContext" inside the form
    // note - from inside the form (in a child component) you can use context.actions.changeState
    this.setState({ 
      appData: { 
        userType: this.state.appData.userType === 'ADMIN' ? 'NORMAL' : 'ADMIN',
      },
    });
  }
}

export default App;
