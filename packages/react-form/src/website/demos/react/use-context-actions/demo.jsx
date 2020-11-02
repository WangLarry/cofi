/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReactJson from 'react-json-view';
import { FormContext, createForm, Field } from '../../../../lib';
import Styled from '../../../components/StyledComponents';
import form from './form';

class App extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    this.currentTiming = 'init';

    this.duration = {
      init: [],
      changeValue: [],
      changeState: [],
      changeUi: [],
      changeData: [],
      changeContext: [],
      submit: [],
      reset: [],
    };
  }

  render() {
    if (this.currentTiming) {
      this.duration[this.currentTiming].push(Date.now());
    }

    const headerStyle = {
      fontWeight: 'bold',
      marginBottom: '20px',
      borderBottom: '1px solid black',
      paddingBottom: '20px',
    };

    const actions = {
      init: 'Init form',
      changeValue: 'Name = "Ross"',
      changeState: 'Hobbies search = "ball"',
      changeUi: 'Name component = "Label"',
      changeData: 'New data',
      changeContext: 'Exclude / Include Id',
      submit: 'Submit form',
      reset: 'Reset form',
    };

    const blockerStyle = {
      width: '320px',
      height: '510px',
      zIndex: 2,
      position: 'absolute',
      top: 0,
      left: 0,
      cursor: 'not-allowed',
    };

    const rows = Object.keys(actions).map(actionName => (
      <Grid key={actionName} action={actionName} container={true} item={true} xs={12}
        style={{ marginBottom: '20px', lineHeight: '30px' }}>
        <Grid item={true} xs={3}>{actionName}</Grid>
        <Grid item={true} xs={4}>{actions[actionName]}</Grid>
        <Grid item={true} xs={2} >{
          actionName !== 'init' && <Button color="primary" variant="contained" onClick={this[actionName]}>Call</Button>}</Grid>
        <Grid item={true} xs={2}><span>{this.getDebounce(actionName)}</span></Grid>
        <Grid item={true} xs={1}><span>{this.getTiming(actionName)}</span></Grid>
      </Grid>));

    return (
      <React.Fragment>
        <Styled.MainElement>
          <div style={blockerStyle} title="Change data from the below actions" />
          <Field id="id" />
          <Field id="name" />
          <Field id="hobbies" />
        </Styled.MainElement>
        <Styled.MainElement>
          <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
        </Styled.MainElement>
        <Styled.MainElementLarge>
          <Grid container={true}>
            <Grid container={true} item={true} xs={12} style={headerStyle}>
              <Grid item={true} xs={3}>Action</Grid>
              <Grid item={true} xs={4}>Description</Grid>
              <Grid item={true} xs={2}>Call</Grid>
              <Grid item={true} xs={2}>Debounce</Grid>
              <Grid item={true} xs={1}>Duration</Grid>
            </Grid>
            {rows}
          </Grid>
        </Styled.MainElementLarge>
      </React.Fragment>);
  }

  changeValue = async () => {
    this.timeAction('changeValue');
    this.duration[this.currentTiming] = [];
    await this.context.actions.changeValue('name', 'Ross');
    this.timeAction();
  }

  changeState = async () => {
    this.timeAction('changeState');
    const state = { ...this.context.model.fields.hobbies.component.state };
    state.search = { value: 'ball' };
    await this.context.actions.changeState('hobbies', state);
    this.timeAction();
  }

  changeUi = async () => {
    this.timeAction('changeUi');
    const component = { name: 'label' };
    await this.context.actions.changeUi('name', { component });
    this.timeAction();
  }

  changeData = async () => {
    this.timeAction('changeData');
    await this.context.actions.changeData({
      id: '7777777',
      name: 'Monica',
      hobbies: ['COOK'],
    });
    this.timeAction();
  }

  changeContext = async () => {
    this.timeAction('changeContext');
    await this.context.actions.changeContext({
      excludeId: !this.context.model.context.excludeId,
    });
    this.timeAction();
  }

  submit = async () => {
    this.timeAction('submit');
    const success = await this.context.actions.submit();
    if (success) {
      console.log('submit done!'); // eslint-disable-line
    }
    this.timeAction();
  }

  reset = async () => {
    this.timeAction('reset');
    await this.context.actions.reset();
    this.timeAction();
  }

  timeAction = (action) => {
    this.currentTiming = action;
    this.duration[action] = [];
  }

  hasDebounce = (action) => action === 'changeValue' || action === 'changeState';

  getDebounce = (action) => this.hasDebounce(action) ? '250 ms' : '';

  getTiming = (action) => {
    const timings = this.duration[action];
    if (timings.length >= 2) {
      const debounce = this.hasDebounce(action) ? 250 : 0;
      let time = timings[timings.length - 1] - timings[0] - debounce;
      return `${time} ms`;
    }
    return '';
  }
}

export default createForm(form)(App);
