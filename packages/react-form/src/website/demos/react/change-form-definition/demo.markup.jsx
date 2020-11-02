/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const demo = `import React from 'react';
import { Form, Field } from '@cofi/react-form';
import Button from '@material-ui/core/Button';
import DataViewer from './custom-form-components/DataViewer';
import formEdit from './edit-form';
import formView from './view-form';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.formEdit = formEdit;
    this.formView = formView;

    this.state = {
      form: this.formEdit,
      edit: true,
    };
  }

  change = () => {
    this.setState({
      edit: !this.state.edit,
      form: this.state.edit ? this.formView : this.formEdit,
    });
  }

  render() {
    return (<Form model={this.state.form.model} resources={this.state.form.resources}>
         <div>
          <Field id="id" />
          <Field id="firstName" />
          <Field id="lastName" />
          <Button onClick={this.change}>Change Form</Button>
        </div>
        <div>
          <DataViewer />
      </div>
    </Form>)
  }
}`;

export default {
  exampleName: 'change-form-definition',
  demos: [{
    title: 'Edit Form',
    data: true,
    formFolder: 'edit-form',
    hideHtml: true,
  }, {
    title: 'View Form',
    data: true,
    formFolder: 'view-form',
    demo,
    extraComponents: [
      'custom-form-components/DataViewer',
    ],
  }],
};

