<h3>Examples</h3>

<h4>Usage in cofi form</h4>

```javascript
const Form = require('@cofi/react-form/Form').default;
const Field = require('@cofi/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    firstName: {
      label: 'First Name',
      path: 'firstName',
      component: {
        name: 'Text',
      }
    },
  },
  data: {
      firstName: 'Rachel', 
  },
};

const resources = {
  components: { 
    Text: {
      renderer: Text,
    }, 
  }
};

<Form model={model} resources={resources}>
    <Field id='firstName' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: 'Rachel Green'
};

<Text value={state.value} />
```
