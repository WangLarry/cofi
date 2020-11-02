import components from './components';
import data from './data';
import fields from './fields';

const model = {
  id: 'custom-field-view',
  data,
  fields,
};

const resources = {
  components,
};

export default { model, resources };
