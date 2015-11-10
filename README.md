<h1>js-inflector</h1>
<i>Word magic.</i>

<h2>Quick Start</h2>
```node
var inflector = require('js-inflector');
```

```node    
var inflect = inflector.start();
```

<h2>Examples:</h2>
```node
var someValue = 'tree';
```
Modify word state:
```node
var plural = inflect(someValue, 'plural');  
//--> trees
```

```node
var capital = inflect(someValue, 'capital');  
//--> Tree
```

Modify multiple word states at once:
```node
var pluralAndCapital = inflect(someValue, ['capital', 'plural']);  
//--> Trees
```
Set a group state:

```node
inflector.group({
  'properPlural': ['capital', 'plural']
});
```

With a group state:
```node
var pluralAndCapital = inflect(someValue, 'properPlural');  
//--> Trees
```

##Word States
- ###camelCase (camelcase | camel)
- ###capitalize (cap)
- ###deCapitalize (decapitalize | decap)
- ###lowerCase (lowercase | lower)
- ###pluralize (plural | many)
- ###singularize (singular | single)
- ###upperCase (uppercase | upper)
