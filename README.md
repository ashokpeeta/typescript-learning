## Learning on typescript

### Typescript generics

- you can specify a data types for the parameters using the generic types and based on the received parameters typescript can deduce the type
- You can also specify a specific type when working with a broad range of types like in the case of querySelector which returns an Element or null but when working with an input we can specify an HTMLInputElement to later use it
- Array.map has a generic return type void which will be deduced based on the values return by the callbackfn
- You can generate generic types based on the values received while initializing them
- You can specify default types while designing the types and can override the default types when initialising the variable
- You can extend the types and also can override the types while initialising
