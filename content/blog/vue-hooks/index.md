---
title: Vue Hooks
date: "2020-01-08T22:12:03.284Z"
path: /blog/vue-hooks
description: "Vue Hooks"
---

## Intro

This article introduces an experimental Vue feature called Hooks!

### What Are Hooks?

Hooks are a concept that were developed by Facebook for the React framework. They were developed as a way to introduce state into functional components without the need for a `class` component. This made writing functional components in React an extremely powerful pattern.

### Whats Wrong With Classes?

There is nothing wrong with classes, to begin with, but the React team found out that [understanding how classes work](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines) has been a drawback to React adoption. It can be difficult to understand and can become ambiguous as your project increases in size and complexity.

### But...I write Vue, I dont use classes?

If you are a Vue developer, you might wonder why classes are being discussed as you do not use classes by default in your Vue projects. While this is true, Vue JS lets you use functional components that are stateless with mixins. With Vue mixins you can define logic or a functionality in a particular file and use and even re-use it in a functional component.

[See the mixing docs here](https://vuejs.org/v2/guide/mixins.html)


### Why You Shouldnt Be Using Vue Mixins

In a blog post, some months back, Sarah Drasner a very popular Vue core team member wrote about her conversation with Evan You the creator of Vue JS. Sarah revealed that a mixin cannot consume or use state from another mixin, which makes chaining of encapsulated logic difficult to achieve. This is the mixin limitation that the Vue Hooks solves for.

[Read her post here](https://css-tricks.com/what-hooks-mean-for-vue/)


### Using Hooks

First of all, you have to install the vue-Hooks package with the node package manager. Open a new terminal in VS Code and run:

`npm install vue-Hooks`

And make sure you pass it into your Vue app to consume:

`Vue.use(Hooks);`

Open the components folder and create a new file inside it, call it `Modal.vue` then navigate back to the root directory and create a new folder called Hooks. Inside the Hooks folder create a new file called Hooks.js and copy this code block below into it:

```
import { useData, useMounted, useEffect, useComputed, useUpdated} from 'vue-Hooks'

export default function clickedHook(){
    const data = useData({ count:1 })
    const double = useComputed(() => data.count * 2)
    useMounted(()=> {console.log('mounted')});
    useUpdated(()=> {console.log('updated')});
    useEffect(()=> {
        console.log('DOM re-renders....')
    });
    return {
        data, double
    }
}
```

Just like in React, Vue Hooks borrows the use-prefix syntax and uses it in the Vue way. You also notice that the lifecycle Hooks available for every Vue instance is accessible inside Vue Hooks, some of them are:


- `useData`: handles initialization of data inside your Hook, so the count is initialized inside it
- `useComputed`: this is more like computed properties inside your Hook, so the double computation is done inside it
- `useMounted`: acts exactly like the mounted lifecycle Hook in your Vue instance but for Hooks
- `useUpdated`: acts exactly like the updated lifecycle Hook in your Vue instance but for Hooks
- `useEffect`: this handles logic on DOM re-render

There are other properties you can import, the whole list can be found [here on GitHub](https://github.com/yyx990803/vue-hooks). You will notice it is exported as a function, open the `Modal.vue` file you created earlier and copy this code block below inside it:

```
<template>
  <div> 
    <button @click="data.count++">Button</button>
    <h2>{{data.count}}</h2>
    <h2>{{double}}</h2>
  </div>
</template>

<script>
import clickedHook from '../Hooks/Hooks'

export default {
  name: 'Modal',
  Hooks(){
    return clickedHook();
  }
}
</script>
```

## Conclusion

TLDR;

- Hooks are just as awesome in Vue as they are in React 
- They let you write clean, composable code
- Using them over mixins will make you a better Vue developer

