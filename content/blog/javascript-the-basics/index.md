---
title: Javascript - The Basics
date: "2019-11-19T22:12:03.284Z"
path: /blog/javascript-the-basics
description: "Javascript - The Basics"
---

## Intro

> "Learn the basics. Learn them well." -  Blue Shinners

This advise was given to me by a former weight lifting coach about making progress within bodybuilding. 

> "Everyone wants the new, the cool, the hip. No one wants to spend time on the basics, because its hard but it works." - Blue Shinners


### Using 'use strict'

For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn’t change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript’s creators got stuck in the language forever.

This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: "use strict".
“use strict”

The directive looks like a string: "use strict" or 'use strict'. When it is located at the top of a script, the whole script works the “modern” way.

### Variables 

A variable is a “named storage” for data. We can use variables to store goodies, visitors, and other data.

To create a variable in JavaScript, use the let keyword.

The statement below creates (in other words: declares) a variable with the name “message”:

```javascript
let message;
message = 'Hello!';

alert(message); // shows the variable content
```

`var` instead of `let`

In older scripts, you may also find another keyword: var instead of let:

```javascript
var message = 'Hello';
```   

The var keyword is almost the same as let. It also declares a variable, but in a slightly different, “old-school” way.

There are subtle differences between let and var, but they do not matter for us yet.

#### Constants

To declare a constant (unchanging) variable, use `const` instead of `let`.

Variables declared using const are called “constants”. They cannot be reassigned. An attempt to do so would cause an error:

```javascript
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

#### Name things right!

Talking about variables, there’s one more extremely important thing.

A variable name should have a clean, obvious meaning, describing the data that it stores.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. 

When we return to some code after doing something else for a while, it’s much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.

Some good-to-follow rules are:

- Use human-readable names like userName or shoppingCart.
- Stay away from abbreviations or short names like a, b, c, unless you really know what you’re doing.
- Make names maximally descriptive and concise. Examples of bad names are data and value. Such names say nothing. It’s only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a “user” then we should name related variables currentUser or newUser instead of currentVisitor or newManInTown.


#### Summary

We can declare variables to store data by using the var, let, or const keywords.

    `let` – is a modern variable declaration.
    `var` – is an old-school variable declaration. Normally we don’t use it at all, but we’ll cover subtle differences from let in the chapter The old "var", just in case you need them.
    `const` – is like `let`, but the value of the variable can’t be changed.

Variables should be named in a way that allows us to easily understand what’s inside them.

### Data Types

A variable in JavaScript can contain any data. A variable can at one moment be a string and at another be a number.

There are seven basic data types in JavaScript.

`number` for numbers of any kind: integer or floating-point.
`string` for strings. A string may have one or more characters, there’s no separate single-character type.
`boolean` for true/false.
`null` for unknown values – a standalone type that has a single value null.
`undefined` for unassigned values – a standalone type that has a single value undefined.
`object` for more complex data structures.
`symbol` for unique identifiers.

The typeof operator allows us to see which type is stored in a variable.

- Two forms: typeof x or typeof(x).
- Returns a string with the name of the type, like "string".
- For null returns "object" – this is an error in the language, it’s not actually an object.


### Types

The three most widely used type conversions are to string, to number, and to boolean.

String Conversion – Occurs when we output something. Can be performed with String(value). The conversion to string is usually obvious for primitive values.

Numeric Conversion – Occurs in math operations. Can be performed with Number(value).

The conversion follows the rules:

```
Value 	Becomes…
undefined 	NaN
null 	0
true / false 	1 / 0
string 	The string is read “as is”, whitespaces from both sides are ignored. An empty string becomes 0. An error gives NaN.
```

Boolean Conversion – Occurs in logical operations. Can be performed with Boolean(value).

Follows the rules:
```
Value 	Becomes…
0, null, undefined, NaN, "" 	false
any other value 	true
```

Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

- `undefined` is NaN as a number, not 0.
- `0` and space-only strings like " " are true as a boolean.

Objects aren’t covered here. We’ll return to them later in the chapter Object to primitive conversion that is devoted exclusively to objects after we learn more basic things about JavaScript.

### Comparisons

Comparison operators return a boolean value.
Strings are compared letter-by-letter in the “dictionary” order.
When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
The values null and undefined equal == each other and do not equal any other value.
Be careful when using comparisons like > or < with variables that can occasionally be null/undefined. Checking for null/undefined separately is a good idea.


### Functions

A function declaration looks like this:

```javascript
function name(parameters, delimited, by, comma) {
  /* code */
}
```

    Values passed to a function as parameters are copied to its local variables.
    A function may access outer variables. But it works only from inside out. The code outside of the function doesn’t see its local variables.
    A function can return a value. If it doesn’t, then its result is undefined.

To make the code clean and easy to understand, it’s recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

    A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
    A function is an action, so function names are usually verbal.
    There exist many well-known function prefixes like create…, show…, get…, check… and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we’ve covered the basics, so we actually can start creating and using them. But that’s only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.


#### Arrow functions 

Arrow functions are handy for one-liners. They come in two flavors:

Without curly braces: (...args) => expression – the right side is an expression: the function evaluates it and returns the result.

With curly braces: (...args) => { body } – brackets allow us to write multiple statements inside the function, but we need an explicit return to return something.


## Conclusion

Code structure

Statements are delimited with a semicolon:

```javascript
alert('Hello'); alert('World');
```

Usually, a line-break is also treated as a delimiter, so that would also work:

```javascript
alert('Hello')
alert('World')
```

That’s called “automatic semicolon insertion”. Sometimes it doesn’t work, for instance:

```javascript
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

Most codestyle guides agree that we should put a semicolon after each statement.

Semicolons are not required after code blocks {...} and syntax constructs with them like loops:

```javascript
function f() {
  // no semicolon needed after function declaration
}

for(;;) {
  // no semicolon needed after the loop
}
```

…But even if we can put an “extra” semicolon somewhere, that’s not an error. It will be ignored.

More in: Code structure.
Strict mode

To fully enable all features of modern JavaScript, we should start scripts with "use strict".

```javascript
'use strict';
```

The directive must be at the top of a script or at the beginning of a function body.

Without "use strict", everything still works, but some features behave in the old-fashion, “compatible” way. We’d generally prefer the modern behavior.

Some modern features of the language (like classes that we’ll study in the future) enable strict mode implicitly.

More in: The modern mode, "use strict".
Variables

Can be declared using:

    let
    const (constant, can’t be changed)
    var (old-style)

A variable name can include:

    Letters and digits, but the first character may not be a digit.
    Characters $ and _ are normal, on par with letters.
    Non-Latin alphabets and hieroglyphs are also allowed, but commonly not used.

Variables are dynamically typed. They can store any value:

let x = 5;
x = "John";

There are 7 data types:

    number for both floating-point and integer numbers,
    string for strings,
    boolean for logical values: true/false,
    null – a type with a single value null, meaning “empty” or “does not exist”,
    undefined – a type with a single value undefined, meaning “not assigned”,
    object and symbol – for complex data structures and unique identifiers, we haven’t learnt them yet.

The typeof operator returns the type for a value, with two exceptions:

```javascript
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially
```

We’re using a browser as a working environment, so basic UI functions will be:

prompt(question, [default])
    Ask a question, and return either what the visitor entered or null if they clicked “cancel”.
confirm(question)
    Ask a question and suggest to choose between Ok and Cancel. The choice is returned as true/false.
alert(message)
    Output a message.

All these functions are modal, they pause the code execution and prevent the visitor from interacting with the page until they answer.

For instance:

```javascript
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

Operators

JavaScript supports the following operators:

Arithmetical

    Regular: * + - /, also % for the remainder and ** for power of a number.

    The binary plus + concatenates strings. And if any of the operands is a string, the other one is converted to string too:

    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string

Assignments

    There is a simple assignment: a = b and combined ones like a *= 2.
Bitwise

    Bitwise operators work with 32-bit integers at the lowest, bit-level: see the docs when they are needed.
Conditional

    The only operator with three parameters: cond ? resultA : resultB. If cond is truthy, returns resultA, otherwise resultB.
Logical operators

    Logical AND && and OR || perform short-circuit evaluation and then return the value where it stopped (not necessary true/false). Logical NOT ! converts the operand to boolean type and returns the inverse value.
Comparisons

    Equality check == for values of different types converts them to a number (except null and undefined that equal each other and nothing else), so these are equal:

    alert( 0 == false ); // true
    alert( 0 == '' ); // true

    Other comparisons convert to a number as well.

    The strict equality operator === doesn’t do the conversion: different types always mean different values for it.

    Values null and undefined are special: they equal == each other and don’t equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.
Other operators

    There are few others, like a comma operator.

More in: Operators, Comparisons, Logical operators.
Loops

    We covered 3 types of loops:

```javascript
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
```

The variable declared in for(let...) loop is visible only inside the loop. But we can also omit let and reuse an existing variable.

Directives break/continue allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: Loops: while and for.

Later we’ll study more types of loops to deal with objects.
The “switch” construct

The “switch” construct can replace multiple if checks. It uses === (strict equality) for comparisons.

For instance:

```javascript
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details in: The "switch" statement.
Functions

We covered three ways to create a function in JavaScript:

Function Declaration: the function in the main code flow

```javascript
    function sum(a, b) {
      let result = a + b;

      return result;
    }
```

Function Expression: the function in the context of an expression

```javascript
let sum = function(a, b) {
  let result = a + b;

  return result;
};
```

Arrow functions:

```javascript
// expression at the right side
let sum = (a, b) => a + b;

// or multi-line syntax with { ... }, need return here:
let sum = (a, b) => {
  // ...
  return a + b;
}

// without arguments
let sayHi = () => alert("Hello");

// with a single argument
let double = n => n * 2;
```

    Functions may have local variables: those declared inside its body. Such variables are only visible inside the function.
    Parameters can have default values: function sum(a = 1, b = 2) {...}.
    Functions always return something. If there’s no return statement, then the result is undefined.

