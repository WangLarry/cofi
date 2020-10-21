import checkboxCollection from '@cofi/react-components/edit/CheckboxCollection';
import inputText from '@cofi/react-components/edit/Text';
import label from '@cofi/react-components/view/Text';
import mockService from './mocks/service';

export default {
  inputText,
  label,
  asyncCheckboxCollection: { 
    renderer: checkboxCollection,
    stateChange: (props) => {
      // if prevState isn't defined (i.e this is first call), or the search filter has changed,
      // then - return new filtered items
      if (!props.prevState || props.prevState.search.value !== props.state.search.value) {
        return {
          ...props.state,
          items: mockService.fetchItems(props.state.search.value),
        };
      }
  
      // no more changes needed
      return undefined;
    },
  },
};
