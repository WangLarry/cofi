/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default ({ create }, headerActions = []) => [{
  label: 'Create',
  onClick: create,
},
...headerActions];
