import components from './components';
import fields from './fields';
import dependenciesChanges from './dependencies-changes';

const model = {
  id: 'dependencies-changes-updates-value-and-state',
  fields,
};

const resources = {
  components,
  dependenciesChanges,
};

export default { model, resources };
