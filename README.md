# Functional Object Array Merge
The most generic name I could come up with. This is a very small and very simple library. It really is just a simple composition of a few [Ramda](https://ramdajs.com/) functions.

The library will merge a list of objects from left to right; later objects overwriting properties from earlier objects, by grouping them be a specfic property.

This is functional as it is a function that accepts the prop name and returns a function that accepts the data last. Can be used in functional style composition (Point Free) as the functions are unary and the data is supplied last. 

## idMerge
Merging by the property `id` is very common so this is exported as `idMerge`. You can always create your own for any property.

```js
import { objectArrayMerge } from 'object-array-merge';

const nameMerge = objectArrayMerge('name');
nameMerge(nameArray);
```

## Examples
I will use two real life problems I was able to fix with this. 

### Forcing a Default
React Table is the best table library for React. We had a need where if there was no sort by then default a sort otherwise use the sort.

Sorting in React Table comes back as an array of objects `Array<Object<id: columnId, desc: Bool = true>>`

Here would be the code to enforce the default of `name` to be descending.
```js
import * as R from 'ramda';
import { idMerge } from 'object-array-merge';

//the table state is here as state
const defaultSort = {id: 'name', desc: true };
const newSort = idMerge(R.prepend(defaultSort, state.sortBy))
```

When there is an object with the id of `name` in the array it will use those values as it at the end of the array. Otherwise if there isn't an object then it will use the default sort values.

You can also default multiple objects here as it will go through the array.

### Building Objects in steps
You can build multiple objects over multiple steps and then combine everything into one array of objects.

Using React Table again we have can build the columns from metadata and use some sane defaults. Depending on the table though we want to display or filter the data differently. 

```js
import { idMerge } from 'object-array-merge';

// built from Metadata
const columns = [
    { Header: 'Name', id: 'name', accessor: 'name', Cell: DefaultStringCell, filter: 'text', Filter: DefaultStringFilter},
    { Header: 'Age', id: 'age', accessor: 'age', Cell: DefaultNumberCell, filter: 'number', Filter: DefaultNumberFilter},
]

const columnOverrides = [
    { Header: 'Student Name', id: 'name'},
    { Header: 'Student Age', id: 'age', Cell: HideUnder18},
]

const newColumns = idMerge(R.concat(columns, columnOverrides))
```

This is very arbitrary, but it demonstrates the power this has. You can add properties or update properties over multiple steps in multiple functions.