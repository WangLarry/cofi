/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Select from '../../lib/edit/Select';
import { mapper } from '../../lib/edit/Select/Select';
  
describe('Select', () => {
  let componentProps;
  
  const cofiProps = {
    value: 'ocean',
    disabled: false,
    required: false,
    state: {
      searchable: true,
      searchQuery: 'oc',
      placeholder: 'Color...',
      items:[
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
      ],
    },
    onValueChange: jest.fn(),
    onStateChange: jest.fn(),
  };

  const expectedProps = {
    value: { value: 'ocean', label: 'Ocean' },
    options: cofiProps.state.items,
    placeholder: 'Color...',
    isDisabled: false,
    isClearable: true,
    isSearchable: true,
    inputValue: 'oc',
    styles: expect.any(Object),
    onChange: expect.any(Function),
    onInputChange: expect.any(Function),
  };
   
  beforeEach(() => {
    componentProps = mapper(cofiProps);
  });
  
  describe('mapper', () => {
    it('return correct props', () => {
      expect(componentProps).toEqual(expectedProps);
    });
    
    it('onChange - call onValueChange with correct value', () => {
      const selected = expectedProps.options[1];
      componentProps.onChange(selected);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith(cofiProps.state.items[1].value);
    });
 
    it('onChange - call onValueChange with undefined value', () => {
      componentProps.onChange(undefined);
      expect(cofiProps.onValueChange).toHaveBeenCalledWith(undefined);
    });
 
    it('onInputChange - call onStateChange with correct value', () => {
      componentProps.onInputChange('ra');
      expect(cofiProps.onStateChange).toHaveBeenCalledWith(expect.any(Function));
      const updater = cofiProps.onStateChange.mock.calls[0][0];
      expect(updater({ state: { items: [] } })).toEqual({ items: [], searchQuery: 'ra' });
    });
  });
  
  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<Select {...cofiProps} />);
      expect(component.props()).toMatchObject(expectedProps);
    });
  });
});
 
