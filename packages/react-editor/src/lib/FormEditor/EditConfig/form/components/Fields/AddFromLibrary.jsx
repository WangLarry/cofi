/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React from 'react';
import RadioGroup from '@cofi/react-components/edit/RadioGroup';
import MultiSelect from '@cofi/react-components/edit/MultiSelect';
import { ComponentWrapper } from './Styled';

const radioState = {
  inline: true,
  items: [{
    value: 'reference',
    label: 'Reference',
  }, {
    value: 'clone',
    label: 'Clone',
  }],
};

const multiSelectState = {
  searchable: true,
  items:[],
};

const initialValue = {
  type: 'reference',
  fields: [],
};

export default ({ value = initialValue, onValueChange, fields }) => {
  const onChangeType = (type) => { onValueChange({ ...value, type }); };
  const onChangeFields = (fields) => { onValueChange({ ...value, fields }); };

  multiSelectState.items = fields.map(field => ({ value: field, label: field.label }));

  return (<>
    <ComponentWrapper>
      <MultiSelect value={value.fields} state={multiSelectState} onValueChange={onChangeFields} />
      <RadioGroup value={value.type} state={radioState} onValueChange={onChangeType} />
    </ComponentWrapper>
  </>);
};
