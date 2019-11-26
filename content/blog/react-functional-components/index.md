---
title: React Functional Components
date: "2019-11-26T22:12:03.284Z"
path: /blog/react-functional-components
description: "React Functional Components"
---

## Intro

There are two main types of components in React. Class Components and Functional Components. The difference is pretty obvious. Class components are ES6 classes and Functional Components are functions. The only constraint for a functional component is to accept props as an argument and return valid JSX.

So, first things first, let's refresh what a class component looks like:

```
class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Now, what does a functional component look like? 

```
const Item = ({text}) => (
    <li>{text}</li>
)
```

Annnnndddd bam, just like that, we're functional. Cool right?

So whats the difference? 

_A functional component lacks state and lifecycle methods, its only job is to render_

This leads us to a fantasic rule of thumb with React components: 

>  If you ever have a class component with only a render method – you should always make it a functional component.

### When Not To Use A Functional Component 

So doing a better job outlining why not to use them then I ever would is [this artcile here](https://brainhub.eu/blog/10-famous-apps-using-reactjs-nowadays/)

_If functional components are a hammer, you need to be careful not to treat everything as a nail_

So, the basic rule you can rock with it: "Start with a functional component and go from there". 

### Why Use A Functional Component 

#### Easy To Reason About

Lets go back to our example from before:

```
const Item = ({text}) => (
    <li>{text}</li>
)
```

Since this component only renders, holds no intrnal state and is absent of lifecycle methods, its fairly easy to understand by reading it. 

Functional Components are easier to read in large part because you already know all of the things they can’t do, such as have hidden inputs or modify a hidden state. Especially with the use of prop destructuring, it’s very clear what’s going in and coming out of a functional component.

#### Easy To Test

A functional component is exceptionally easy to test given the fact is creates no side effects., nor does it contain hidden state. 

Given certain props, you can assert exactly what the HTML output will be. This means you don’t have to rely on any mocking, state manipulation.

####  Better Performance

Functional components result is less code, thus better performance. Simple.

#### Easy To Debug

Functional components depend only on the props they are given to produce an output which in turn makes debugging easier. There is no need to continuously log the state of the component to understand what is going on.

#### Reuseable

This one might be a bit controversial. But by removing function level state, we often make our components easier to use and more widely applicable.

#### Reduce Coupling

If you know the props being passed in, it’s easy to trace the path of your code and figure out what is taking place.One of the core concepts used to describe clean code is coupling. Coupling describes the degree of dependency between one entity to another. If our code has low coupling, it means that we can change one area of our code without impacting another. This, in turn, makes our code more maintainable.


## Conclusion

- A Functional component is a function that takes props and returns JSX
- They do not have state or lifecycle methods.
- Functional components are easier to read, debug, and test. They offer performance benefits, decreased coupling, and greater reusability.
- They with a few downsides … but I think the benefits strongly outweigh these. Use them whenever you can.
- Functional components are built into React.  You can get started adding them (and refactoring unnecessary class components) to your existing projects right away!


