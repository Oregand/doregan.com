---
title: React Refs - WTF Are They?
date: "2019-12-07T22:12:03.284Z"
path: /blog/react-refs
description: "React Refs - WTF Are They?"
---

## Intro

During a job interview today I was asked to explain the concept of `refs` in React and I'll admit, it threw me for a bit of a loop. 

Had I heard of `refs` before? Sure! But did I have any idea what they actually did or what they were for? Not a breeze. 

So in a effort to fix that, I'm writing this small post to talk about what they are, and when to use them.

### What Are Refs

> Refs provide a way to access DOM nodes or React elements created in the render method.

In a react app, the data flow is set up so parents can `only` interact with children via `props`.

To modify a child, you re-render it via new props.

However, sometimes you might need to re-render / update the child compoenent outside of this dataflow.

Why?

- The component in question could be a instance of a React component 
- The component in question could be a DOM element

### When To Use Refs

> Before we start; Avoid using refs for anything that can be done declaratively.

For example, instead of exposing open() and close() methods on a Dialog component, pass an isOpen prop to it.

That said, you can use refs for;


- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

_Seriously though, this method is a escape hatch, not a standard. Avoid refs when possible_

### Create A Ref

Refs are created using React.createRef() and attached to React elements via the ref attribute. Refs are commonly assigned to an instance property when a component is constructed so they can be referenced throughout the component.


```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return <div ref={this.myRef} />;
  }

}
```

### Accessing Refs 

When a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of the ref.

```
const node = this.myRef.current;
```

The value of the ref differs depending on the type of the node:

- When the ref attribute is used on an HTML element, the ref created in the constructor with `React.createRef()` receives the underlying DOM element as its current property.
- When the ref attribute is used on a custom class component, the ref object receives the mounted instance of the component as its current.
- You may not use the ref attribute on function components because they don’t have instances.


## Conclusion

So this is the very basic idea behind refs, hopefully you've found this as useful as I did when learning about refs.

For more information checkout the API docs [here](https://reactjs.org/docs/refs-and-the-dom.html)