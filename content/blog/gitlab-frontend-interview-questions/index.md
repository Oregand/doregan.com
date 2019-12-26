---
title: Gitlab Frontend Technical Interview Questions
date: "2019-12-26T22:12:03.284Z"
path: /blog/gitlab-frontend-interview-questions
description: "Gitlab Frontend Technical Interview Questions"
---

## Questions 

### JavaScript

1. `.map` vs `.forEach`

The forEach() iterates through the elements in the array. It calls a provided callback function once for each element in the array in ascending order.

```
let temp = [1, 4, 9];
temp.forEach((item, index) => {
 return temp[index] = item * 3;
});

// temp is now [3, 12, 27]
```

The map() method creates a new array with the results of calling a provided function on every element in the calling array

```
let temp = [1, 4, 9];
const new = temp.map((el) => (
    el * 2
))

// new = [2, 8, 18]
```

2. What is garbage colection in JS?

In all programming languages, memory allocation happens in three steps:

- Allocate memory 
- Use memory 
- Release memeory


As JS is a higher level lanaguge, we don't programatically allocate memory release as its handled via a system called garbage collection.

Most common form in JS: `reference form memory allocation` i.e. a object is said to be garbage if no other objects reference it. 

3. JS Closure

A closure is a function inside a function which has access to its parents scope. 

```
function one() {
    var name = 'test';

    function two() {
        console.log(name); // test
    }
}
```

4. Explain `this`

- Inside a object, this refers to the object
- Inside a function, this refers to the global object 
- `this` can be used with `call`, `apply` and `bind` to reference any object

5. `call`, `apply` and `bind`

All three bind context for `this` to a function.

- Use `.bind()` when you want to call a function at a later date with a certain context i.e. think of Reacts component binding 
- Use `.call()` or `.apply()` when you want to attach context to a function and call it right away

`apply` is similar to `call` except that it takes an array-like object instead of listing the arguments out one at a time.

6. Primitive vs Reference value

In JavaScript there are two types of memory:

- stack => Stores primitive vales
- heap => Stores complex values(object/arrays)

A variable can hold one of two value types: primitive values or reference values.

`Primitive` values are stores on the stack where they are directly accessed. 

`Reference values` are objects stored on the head. Reference value stored in the variable location is a pointer to a location in memory where the object is stored. 

Example

```
var name = 'david'

var secondName = name 

name = 'test'

console.log(secondName) // 'david' => because primitive values are copied by value 
```

7. Prototype && Prototype Chain

`prototype` is an attribute of all functions, and points to a map where attributes can be assigned that should be able to be accessed from all objects with that function as a constructor.

```
Object.prototype.a = 5;

var v = {};
console.log(v.a); //5
```

The prototype of an object is a way to store common attributes across all instances of a class, but in a way that is overwritable. If an object doesn't have a reference to an attribute, that object's prototype will be checked for the attribute.

```
LivingEntity.prototype.makeSound = function(){
	console.log('meow');
}

//dog uses its prototype because it doesn't have makeSound as an attribute
dog.makeSound(); //meow

dog.makeSound = function(){
	console.log('woof');
}

//now dog has makeSound as an attribute, it will use that instead of it's prototype
dog.makeSound(); //woof
```

#### The chain

Every object has a prototype, including the prototype object. The "chain" goes all the way back up until it reaches a object until it hits a object with no prototype. 

```
var Dragon = function(location){  
    /*
     * <Function>.call is a method that executes the defined function,
     * but with the "this" variable pointing to the first argument,
     * and the rest of the arguments being arguments of the function
     * that is being "called". This essentially performs all of
     * LivingEntity's constructor logic on Dragon's "this".
     */
    LivingEntity.call(this, location);
    //canFly is an attribute of the constructed object and not Dragon's prototype
    this.canFly = true;
};

/*
 * Object.create(object) creates an object with a prototype of the
 * passed in object. This example will return an object
 * with a prototype that has the "moveWest" and "makeSound" functions,
 * but not x, y, or z attributes.
 */
Dragon.prototype = Object.create(LivingEntity.prototype);

/*
 * If we didn't reset the prototype's constructor
 * attribute, it would look like any Dragon objects
 * were constructed with a LivingEntity constructor
 */
Dragon.prototype.constructor = Dragon;

/*
 * Now we can assign prototype attributes to Dragon without affecting
 * the prototype of LivingEntity.
 */
Dragon.prototype.fly = function(y){  
    this.y += y;
}

var sparky = new Dragon({  
    x: 0,
    y: 0,
    z: 0
});  
```

### CSS 

1. Explain flexbox && CSS Grid

Flexbox is a very useful layout tool, especially for smaller areas within the site. Its main features are to align items in horizontal or vertical axes, space them out automatically, invert the order in which they’re displayed, along with a few other layout options.

CSS Grid is more of a layout tool for the entire page. While Flexbox excels in laying out items along a single axis, Grid is better for layouts with both horizontal and vertical axes, i.e. grids!

2. `block` vs `inline-block`

- `block` => A block-level element is an HTML element that begins a new line on a web page and extends the full width of the available horizontal space of its parent element. 
- `inline` => In contrast to a block-level element, an inline element:

    It can begin within a line.
    It does not start a new line.
    Its width only extends as far as it is defined by its tags. 

3. How do margin, border and padding fit together in the box model?

Padding adds bulk to your element, in between the border and the element. This means that if your element has a background color, that color will also fill the padding.

Margin adds empty space around your element. That means that the aforementioned background color will not fill the margin.

### Vue 

1. How to create a new Vue Instance?

```
var Vue = new Vue({
    // config
})
```

2. Explain the differences between one-way data flow and two-way data binding?

- A one way data flow means the UI is not tied to the JS layer and so updating values on the UI do not reflect updates in the JS and vise versa.

- Two way data binding means value updates are kept in sync between the UI and JS layer.

3. How to create Two-Way Bindings in Vue.js?

Use `v-bind`, or `v-model`

```
<div id="app">
  {{message}}
  <input v-model="message">
</div>
<script type="text/javascript">
  var message = 'Vue.js is rad';
  new Vue({ el: '#app', data: { message } });
</script>
```

4. What are components props?

Every component instance has its own isolated scope. This means you cannot (and should not) directly reference parent data in a child component’s template. Data can be passed down to child components using props. Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance.

```
Vue.component('blog-post', {
  // camelCase in JavaScript
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

5. What are Components in Vue.js?

Components are one of most powerful features of Vue js.In Vue components are custom elements that help extend basic HTML elements to encapsulate reusable code.

```
export default {
  el: '#your-element'
  components: {
      'your-component'
  }
}
```

6. What is filters in Vue.js?

Vue.js allows you to define filters that can be used to apply common text formatting. 

7. Computed Properties Vs Methods 

Computed properties are cached depending on their reactive deps, methods are not.

8. List some features of Vue.js

- Components 
- Transitions 
- Templates 
- Routing 
- Reactivity

9. What is Vuex?

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

### Rest(representational state transfer) API 

API (application programming interface) is a set of rules and mechanisms by which one application or component interacts with the others.

1. GET

Requests a set of data from a API.

2. POST

Posts a request to create data via the API

3. PUT

Posts a request to update data via the API

4. DELETE

Posts a request to delete data via the API

5. PACTH

Unlike PUT, PATCH applies a partial update to the resource. This means that you are only required to send the data that you want to update, and it won’t affect or change anything else. So if you want to update the first name on a database, you will only be required to send the first parameter; the first name.
