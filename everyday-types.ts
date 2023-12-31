// Type annotation specify which type the variable holds
let a: string = "ashok";

let b = "peeta"; // b will be typed to string
// b = 5 // will not be allowed as type of b is inferred as string

// TypeScript allows you to specify the types of both the input and output values of functions.
// parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
greet("Ashok"); // works
// greet(42); parameters will be type checked and shown an error

// return type annotation : can also be inferred if not provided
function getFavoriteNumber(): number {
  return 26;
}

/*
    Contextual Typing: when a function appears in a place where typescript can determine how it's going to be called, the parameters of that function are automatically given types
*/
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

/*
    any type: The any type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.

    When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to any

    You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag noImplicitAny to flag any implicit any as an error.
*/

let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

/*
    Object type
*/
// The parameter's type annotation is an object type
// You can use , or ; to separate the properties, and the last separator is optional either way
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// Optional properties : Object types can also specify that some or all of their properties are optional. To do this, add a ? after the property name:
function printName1(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName1({ first: "Bob" });
printName1({ first: "Alice", last: "Alisson" });

function printName2(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  // console.log(obj.last.toUpperCase());
  // 'obj.last' is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

/*
    Union Types: TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. 

    A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.
*/
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");

// Error
// printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.

//TypeScript will only allow an operation if it is valid for every member of the union. For example, if you have the union string | number, you can’t use methods that are only available on string:
function printId2(id: number | string) {
  // console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
}

// The solution is to narrow the union with code, the same as you would in JavaScript without type annotations. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

// For example, TypeScript knows that only a string value will have a typeof value "string":

function printId3(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

/*
    Type aliases: a name for any type. 
    
    The syntax for a type alias is:
*/
type Point = {
  x: number;
  y: number;
};
// Exactly the same as the earlier example
function printCoord2(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

// a type alias can name a union type:
type ID = number | string;

/*
    Interface: is another way to name an object type
*/
interface Point2 {
  x: number;
  y: number;
}

function printCoord3(pt: Point2) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

/*
    Type Alias vs Interface: both are similar and can be chosen between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
*/

// Extending interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// Extending type
type Animal2 = {
  name: string;
};

type Bear2 = Animal2 & {
  honey: boolean;
};

// Adding new fields to an existing interface
interface Window {
  title: string;
}

interface Window {
  subtitle: string;
}

// Type cannot be changed after being created
type Window2 = {
  title: string;
};

// type Window2 = {
//   subtitle: string;
// };
// Error: Duplicate identifier 'Window'.

/* 
    Type assertions:

    Sometimes you will have information about the type of a value that TypeScript can’t know about.

*/

// For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.

// In this situation, you can use a type assertion to specify a more specific type:
const myCanvas1 = document.getElementById("main_canvas") as HTMLCanvasElement;

// You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// Typescript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:

// const x = "hello" as number;
//Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

// Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions, first to any (or unknown), then to the desired type:
// const a3 = expr as any as T;

/*
    Literal types: In addition to the general types string and number, we can refer to specific strings and numbers in type positions.

    consider how JavaScript comes with different ways to declare a variable. Both var and let allow for changing what is held inside the variable, and const does not. This is reflected in how TypeScript creates types for literals.
*/
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;

// literal types aren’t very valuable
let x: "hello" = "hello";
// OK
x = "hello";

// x = "howdy"; Type '"howdy"' is not assignable to type '"hello"'.

// But by combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values:

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

// Numeric literal types work the same way
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// you can combine these with non-literal types
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic"); Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.

// There’s one more kind of literal type: boolean literals. There are only two boolean literal types, and as you might guess, they are the types true and false. The type boolean itself is actually just an alias for the union true | false.

/*
    Literal inference: When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later.
*/

const objs = { counter: 0 };
if (true) {
  objs.counter = 1;
}

// TypeScript doesn’t assume the assignment of 1 to a field which previously had 0 is an error. Another way of saying this is that obj.counter must have the type number, not 0, because types are used to determine both reading and writing behavior.

// The same applies to strings:
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

/*
    In the above example req.method is inferred to be string, not "GET". Because code can be evaluated between the creation of req and the call of handleRequest which could assign a new string like "GUESS" to req.method, TypeScript considers this code to have an error.
*/

// There are two ways to work around this.
// You can change the inference by adding a type assertion in either location:
// Change 1:
const reqs = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(reqs.url, reqs.method as "GET");

// You can use as const to convert the entire object to be type literals:
const req1 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req1.method);

// The as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like string or number.

/*
    null and undefined: JavaScript has two primitive values used to signal absent or uninitialized value: null and undefined.

    With strictNullChecks off, values that might be null or undefined can still be accessed normally,

    With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value.
*/

function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

/*
    Non-null Assertion Operator (Postfix !)

    TypeScript also has a special syntax for removing null and undefined from a type without doing any explicit checking. Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined:
*/
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

// Just like other type assertions, this doesn’t change the runtime behavior of your code, so it’s important to only use ! when you know that the value can’t be null or undefined.
