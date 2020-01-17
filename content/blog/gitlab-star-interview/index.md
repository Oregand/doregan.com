---
title: Gitlab Star Interview
date: "2020-01-08T22:12:03.284Z"
path: /blog/gitlab-star-interview
description: "Gitlab Star Interview"
---

## Intro

With round 3 of the interview process fast approaching, lets do some joint study on what can come up during round 3!

### Gitlab Values

The [gitlab handbook](https://about.gitlab.com/handbook/values/#permission-to-play) outlines the values of the company. 


They spell CREDIT - Collaberation, Results, Efficiancy, Diversity, Iteration, Transparency

- Collaboration

Helping others is always a priority(even when not directly related to your goals), as is asking for help. 

Ways to show kindness:

1. Say thank you
2. Give negative feedback in small settings, squash issues fast
3. Share everything, overcommunicate. Use an empathy first approach.
4. Assume the best in one another 
5. Dont pull rank 
6. Use video calls
7. Give useful feedback:  When providing feedback, always make it about the work itself; focus on the business impact and not the person
8. Address behaviour but dont label people
9. Say sorry
10. Let go of the ego
11. Help others succeed
12. People are not their work 
13. Do it yourself
14. Problem solve, dont blame 
15. Dont be afraid to step on toes 
16. Its okay not to know everything 
17. Collaboration is not consensus: You don't need to ask people for their input, and they shouldn't ask you "Why didn't you ask me?" You don't have to wait for people to provide input, if you did ask them.

- Results

1. Dogfooding - Use the product, use the handbook, fix things as soon as they are broken
2. Measure results, not hours 
3. Give agency 
4. Write promises down
5. Growth Mindset 
6. Global optimazation
7. Tenacity
8. Ownership
9. Urgency
10. Ambitious
11. Perseverance
12. Action first 
13. Accepting Uncertainty
14. Customer results

- Efficiency

1. Write things down 
2. Develop the simplest soltuions - boring solutions 
3. Self search - get your own answers first 
4. Do more with less 
5. Accept mistakes 
6. Move fast by shipping the minimum viable change

- Diversity & Inclusion

1. Be diverse, be inclusive

- Iteration

1. MVC - minimum viable change
2. Always reduce cycle time 
3. Low level of shame
4. Do things that don't scale - Start with fast and stable, then scale 


- Transparency

1. Always be transparent

### Who is interviwing? 

1. https://gitlab.com/ClemMakesApps

```
Clement Ho is the Frontend Engineering Manager for Monitor Health department. 
```

2. An example of a open issue, Clement has commented on: https://gitlab.com/gitlab-org/gitlab/issues/118503

3. Confirm order component for paid signup flow merge: https://gitlab.com/gitlab-org/gitlab/merge_requests/21653#note_270941988

4. https://about.gitlab.com/stages-devops-lifecycle/configure/

- Auto DevOps
- ChatOps
- Runbooks 
- Serverless 
- Choas Enginerring
- Cluster Cost
- Infra As Code
- Kubernetes Management

### Basic Kubernetes

Kubernetes coordinates a highly available cluster of computers that are connected to work as a single unit. 

Cluster => 1 master, multiple nodes 
Node => Each node has 1 to multiple PODs
Pod => contains app and volumes for data

- Each cluster has a `master` and a set of nodes.
- Your containerised app runs inside a node.

### Five Cores

#### Does this person have a "good head on their shoulders"?

What this means is you make good decisions, but it's much more than that. People who have a good head on their shoulders make sound decisions.

Lets create a senario to test that:

```
Go into CodePen and create a static blog homepage. We'll need a navigation menu, and we'll need a place for the title and article, and then at the bottom let's have some comments and a footer.
```

#### Is this person technically where they need to be for this role?

##### What is garbage colection in JS?

All programming languages have a memeory lifecycle:

1. Allocate memeory 
2. Use memory
3. Deallocate memory 

Javascript will release when the memory is not needed anymore. JavaScript, utilize a form of automatic memory management known as garbage collection (GC).

- Reference-counting garbage collection

This is the most naive garbage collection algorithm. This algorithm reduces the problem from determining whether or not an object is still needed to determining if an object still has any other objects referencing it. An object is said to be "garbage", or collectible if there are zero references pointing to it.

##### JS Closure

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

```
function init() {
    var name = "Mozilla"; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        alert (name); // displayName() uses variable declared in the parent function    
    }
    displayName();    
}
init();
```

##### Explain this

In most cases `this` is determined by *how* a function is called(runtime binding). 

```
const test = {
    prop: 42,
    func: function() {
        return this.prop
    }
}

console.log(test.func())
```

##### Explain call, apply and bind

`call`, `apply` and `bind` are all ways of setting the context of `this` during function execution.

- `bind` => bind attaches `this` into function and it needs to be invoked separately at a later date.
- `call` => call attaches `this` to a function and calls the function immediatly
- `apply` => apply is similar to `call` except it takes an array like object instead of listing the arguments one at a time

##### Clone A Object

```
// Old
const circle = { radius: 1, draw() { console.log('draw) } }

const another = {};

for(let key in circle) {
    another[key] = circle[key]
}

another['radius'] = circle['radius']

console.log(another) // { radius: 1, draw() { console.log('draw) } }


// Object.assign

const another = Object.assign({}, circle) // { radius: 1, draw() { console.log('draw) } }

const anotherBonus = Object.assign({
    color: 'yellow'
}, circle) // { radius: 1, draw() { console.log('draw) }, color: 'yellow' }

// Spead 
const another = { ...circle };
```

##### Getters/Setters

```
const person = {
    first: 'David',
    last: 'OR'
    get fullName() {
        return `${person.first} ${person.last}`
    }
    set fullName(value) {
        const parts = value.split(' ');
        this.firstName = value[0]
        this.lastName value[1]
    }
}

person.fullName(); // David OR

person.fullName = 'Some Name'
person.fullName(); // Some Name
```

##### Factory Functions

```
// Factory Functions Produce Objects

function createCircle({ radius, location }) {
    return {
        radius: radius,
        location,
        draw() {
            console.log('draw)
        }
    }
}

const circle1 = createCircle({  })
const circle2 = createCircle({  })
```

##### Constructor Functions

```
// Use Pascal Case => OneTwoThree

function Circle({ radius, location }) {
    this.radius = radius;
    this.location = location;

    this.draw = function() {
        console.log('draw)
    }
}

const circle = new Circle({  })
```

##### Scope => Local Vs Global

`var` = is functionally scoped because the variable is hoisted to the top of the function.
`let` = block scoped but re-assignable
`const` = block scoped but not re-assignable

```
function start() {
    const message = 'hi'

    if(true) {
        const again = 'bye'
        let again1 = 'bye'
        var again2 = 'bye
        again1 = 'no'
    }

    console.log(again) // ReferenceError: hoist is not defined
    console.log(again2) // again2: undefined
}
```

What happens to the `var`?

```
// This
console.log(hoist); // Output: undefined
var hoist = 'The variable has been hoisted.';


// Becomes
var hoist;
console.log(hoist); // Output: undefined
hoist = 'The variable has been hoisted.';
```

##### let, var, const

- `var` = is functionally scoped because the variable is hoisted to the top of the function.
- `let` = block scoped but re-assignable
- `const` = block scoped but not re-assignable

##### Primitive vs Reference value

In JS we have two value types: `primitive` and `reference`.

Primitive values are stored on the `stack`, reference values on the `heap`

- Primitive
    - String
    - Boolean
    - String 
    - null
    - undefined
    - Symbol

- Reference 
    - Objects
    - functions 
    - Arrays 

*Arrays and functions are also objects*

```
// Copy primitive by value 

let x = 10;
let y = x;

x = 20

console.log(x, y) // 20, 10
```

```
// Copy object by reference 
let x = { value: 10 }
let y = x;

x.value = 20;

console.log(x, y) // { value: 20 }, { value: 20 }
```

Why? Because both `x` and `y` are pointing to a object stored on the heap.

Primitive are copied by value, objects are copied by reference

Last example:

```
let number = 10;

function increase(num) {
    num++
}

increase(number)

console.log(number) // 10
```

Why? Because the param `num` inside the function is copied by value and cannot be used outside the function i.e. it is copied from `number` by value.

However:

```
let number = { value: 10 };

function increase(num) {
    num.value++
}

increase(number)

console.log(number) // 11
```

Why? Because we are using a reference and not coping the value into the funciton.

##### Compare Objects

```
const obj1 = {
    value: 1
}

const obj2 = {
    value: 1
}

const obj3 = obj1

console.log(obj1 === obj2) // false => Objects have equal properties but difference reference values

console.log(obj1 === obj3) // true => Objects point to same reference
```

##### Prototype && Prototype Chain

Every object in Javascript has a *prototype*.

###### Prototype chains (aka prototype inheritance)

When a message reaches a object, JavaScript will attempt to find a property in that object first, if it cannot find it then, the message will be sent to the objects prototype and so on. 

```

```

##### Create optomized list

```
const list = [{ name: 'name1', departments: ['1', '2'] }, { name: 'name2', departments: ['3', '4'] }, { name: 'name2', departments: ['1', '5'] }, { name: 'name2', departments: ['6', '7'] }, { name: 'name2', departments: ['8', '9'] }];

const list1 = list.map(el => el.departments).flat().reduce((unique, item) => unique.includes(item) ? unique : [...unique, item]);

document.querySelector('.result').innerHTML = list1;
```

Whats happening here?

First, we map over the array to reduce it to just `departments`, which gives us a nested array of arrays:

`[['1', '2'], ['3', '4'], ['1', '5']]`

Which we then call `flat()` on to make it a flattened array: 

`['1', '2', '3', '4', '1', '5']`

And finally we reduce the array to remove the duplicates using `includes` to check:

`reduce((unique, item) => unique.includes(item) ? unique : [...unique, item])`

If the current array `unique` includes the current `item`, only return the array itself, otherwise return a new array with the item appended to it: `[...unique, item]`


#### Is this person going to be self sufficient in this role?

- Overcommunicate 
- MVC
- Results 
- Iteration 
- Self learning 
- Ask for help when needed 
- GET. SHIT. DONE.

#### Does this person communicate well and will they communicate well with the team?

- Always overcommunicate 
- Less slack 
- More video calls
- Assume empathy 
- Record calls 
- Clear langugae
- Concise explanations 

#### Does this person handle positive and negative feedback well?

- Positive feedback? => Great, keep it in mind for next time and use it to reduce cycle time.

- Negative Feedback? => Better, take it and learn.

Giving feedback? 

Give effective feedback. Limit negative comments in favour of a shared growing epxerience. 

#### An exmaple set of questions

It’s helpful if you can tell me about something that you built for another company where I can see your code, or you can explain it sufficiently enough. What were the challenges? How did you deal with 10,000 comments? How did you deal with mobile? What were some challenges? 

I'll give you an example: You built the comment system for GitLab. For the comment system, an interesting challenge was dealing with loading users for the @ drop-down to mentioning other users. It turns out that the JSON payload for that drop-down can get quite large and loading it on page load makes the page load significantly slower. But loading that data on the first @ keypress is also slow because the payload can be more than 10 MB. We want the user to have a seamless experience and not realize the data needs time to load.

- You can use a async action to load this data in the background after page load 
- Load the data when the comment box scrolls into view
- Load the data when the user `mouseover`s the `textarea`

#### Big O

Big O notation is used in computer science to describe the performance or complexity of an algorithm.

1. O(1) - Constant Runtime 

O(1) always run at the same time despite the input:

```
function returnFirst(els) {
    return els[0]
}
```

The runtime is constant no matter the size of the input given.

2. O(n) - Linear Runtime 

Linear runtime occuers when the runtime is in exact preportion to the amount of input elements.

A good example of this is searching for a particular value in a data set using an iteration like in the example below.

```
function constainsValue(elements, value) {
  for (let element in elements) {
    if (element === value) return true;
  }
  return false
}
```

We see that the time taken to loop through all elements in the array grows with an increase in the size of the array. 

Remember that the Big O notation considers the worst-case scenario. In this instance, it's the case where the loops run through all elements in the array. So that is what determines the runtime complexity of the algorithm.

3. O(n2 ) - Quadratic Runtime

O(n2 ) denotes an algorithm whose runtime is directly proportional to the square of the size of the input data set. 

An example of this is a nested iteration or loop to check if the data set contains duplicates.

```
function constainsDuplicate(elements) {
  for (let element in elements) {
     for (let item in elements){
       if (element === item) return true;
     }
  }
  return false
}
```

Deeper nested iterations will produce runtime complexities of O(n3 ), O(n4 ) etc

4. O(log n) - Logarithmic runtime 

In this case, the runtime it takes for the algorithm to run will plateau no matter the size of the input data set. 

A common example of this is a search algorithm like the binary search. The idea of a binary search is not to work with the entire data. Rather, reduce the amount of work done by half with each iteration. The number of operations required to arrive at the desired result will be log base 2 of the input size.

5. O(n log n) - Linearithmic runtime 

Here, the runtime of the algorithm depends on running a logarithm operation n times.

Most sorting algorithms have a runtime complexity of O(n log n)

6. O(2n ) - Exponential runtime 

This occurs in algorithms where for each increase in the size of the data set, the runtime is doubled. 

```
function fibonacci(num) {
    if (num <= 1) return 1;
    return fibonacci(num - 2) + fibonacci(num - 1)
}
```

7. O(n!) - Factorial runtime 

In this case, the algorithm runs in factorial time. The factorial of a non-negative integer (n!) is the product of all positive integers less than or equal to n. This is a pretty terrible runtime.

Any algorithm that performs permutation on a given data set is an example of O(n!)


### Bonus Questions

#### What can we change in GitLab as an organization to make it better, for example the hiring process or the handbook?  

To make Gitlab better, you could cultivate a better reputation on Glassdoor. I have been using it to study for this interview and I dont feel the reputation shown there is a fair representation of how the compnay operates. 

#### What do you expect to achieve in your first month at GitLab?  

Be part of something awesome: 

https://docs.gitlab.com/ee/user/discussions/#suggest-changes
https://gitlab.com/gitlab-org/gitlab/issues/33813

I would like to:

- Intergrate with the company culture 
- Become familiar with the compnay values 
- Engage with my team
- Contribute to a feature!

#### What were you most satisfied with in your recent/current position?   

The introduction of a fluid code review process for our external component libary / delivery of two mobile applications in a very short time span.

#### Explain to me a complex piece of code you worked on?

When building the app `Zambezii`, I re-wrote the filters to use a server side query style over a client side approach:

```
handleFilterChange = action => {
    const {
      router,
      router: { query }
    } = this.props
    const key = action.name
    router.push(
      {
        pathname: "/products",
        query: {
          ...query,
          [key]: action.value
        }
      },
      {
        pathname: "/products",
        query: {
          ...query,
          [key]: action.value
        }
      },
      { shallow: true }
    )
  }

  <CategoryFilter
    filterChange={this.handleFilterChange}
    options={childCategories}
    currentCategory={currentCategory}
  />

{options.map(({ name, id }) => (
    <li
        key={id}
        onClick={() =>
        setAction({
            name: 'categoryId',
            value: id
        })
        }
    >
        <Button color="link">{name}</Button>
    </li>
))}

useEffect(() => {
    if (action !== undefined) filterChange(action)
  }, [action, filterChange])

componentDidUpdate(prevProps) {
    const {
        router: { query },
        requestProductFilterUpdate
    } = this.props
    if (query !== prevProps.router.query) {
        requestProductFilterUpdate(query)
    }
}
```


#### What is a linked list and can you show me how to implement one with and without an array in JavaScript?

A linked list is an ordered collection of data elements. A data element can be represented as a node in a linked list. Each node consists of two parts: data & pointer to the next node.

Unlike arrays, data elements are not stored at contiguous locations. The data elements or nodes are linked using pointers, hence called a linked list.

Pros:

- You can insert and remove nodes without re-organizing entire list unlike with Arrays 

Cons:

- You cannot access nodes by index/randomly. They must searched and accessed sequentially.
- They use more memeory than arrays because they store pointers

Types of Linked lists: There are a few different types of linked lists. But the most popular ones are: singly, doubly and circular.

Singly linked list example:

```
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
}
```


Insert item at beginning of list:

```
LinkedList.prototype.insertAtBeginning = function(data){
    // A newNode object is created with property data and next = null    
    let newNode = new Node(data);// The pointer next is assigned head pointer so that both pointers now point at the same node.    newNode.next = this.head;// As we are inserting at the beginning the head pointer needs to now point at the newNode. 
    this.head = newNode;    
    return this.head;
}
```

Insert Item at end of the list:

```
LinkedList.prototype.insertAtEnd = function(data){
    // A newNode object is created with property data and next=null
    
    let newNode = new Node(data); 
    // When head = null i.e. the list is empty, then head itself will point to the newNode.   
     if(!this.head){
        this.head = newNode;
        return this.head;
    }
    
   // Else, traverse the list to find the tail (the tail node will initially be pointing at null), and update the tail's next pointer.   let tail = this.head;
   while(tail.next !== null){
        tail = tail.next;
   }
   tail.next = newNode;   
   return this.head;
}
```

Delete item from list:

```
LinkedList.prototype.deleteFirstNode = function(){
    if(!this.head){
        return;
    }
    this.head = this.head.next;
    return this.head;
}
```


#### What is the difference between BFS and DFS and can you implement one of them?

The depth-first method believes in going as far down the tree as possible until it reaches a dead end. Once it hits a null value, it starts back up at the top and follows the same process.

The breadth-first method tries its best to stay as close to the top as possible. It traverses the tree one row at a time and looks at all of its the sibling nodes. It continues this until it reaches the last row.

If you know the value that you are looking for is closer to the top, a BFS approach might be a superior choice, but if a tree is very wide and not too deep, a DFS approach might be faster and more efficien


```
class Node {
 constructor(data) {
     this.data = data;
     this.children = []
 }

 add(data) {
     this.children.push(new Node(data))
 }

 remove(data) {
     this.children = this.children.filter(el => el.data !== data)
 }
}
```

```
class Tree {
    constructor() {
        this.root = null;
    }
}
```

```
class Tree {
    constructor() {
        this.root = null;
    }

    traverseDf(value) {
        let collection = [this.root]

        while(collection.length) {
            let node = collection.shift()

            if(node.data === value) {
                return true
            } else {
                collection.unshift(...node.children)
            }
        }
        return false;
    }
}
```

The DFS uses a Stack to traverse down the tree of nodes. We will declare the current node by shifting off the first value of the array. With this node, we will check to see if its data is equal to the value we are searching for. If its equal, we will return True and exit out of the function. If the node’s value does not match, we will push the children of that node to the front of the array if they exists. We unshift the children to the front because the DFS approach wants us to go all the way to the bottom of the tree before checking any sibling element. If no value matches after searching the whole tree, we return false at the end of our function.

```
class Tree {
    constructor() {
        this.root = null;
    }

    traverseDf(value) {
        let collection = [this.root]

        while(collection.length) {
            let node = collection.shift()

            if(node.data === value) {
                return true
            } else {
                collection.unshift(...node.children)
            }
        }
        return false;
    }

    traverseBf(value) {
        let collection = [this.root]

        while(collection.length) {
            let node = collection.shift()

            if(node.data === value) {
                return true
            } else {
                collection.push(...node.children)
            }
        }

        return false;
    }
}
```

When we use the BFS approach, we want to check all sibling elements before going to the next row of the tree. We will accomplish this by using a Queue. The Queue requires us to use the push method instead of the unshift method when handling the children of the node. Instead of taking the children of a node and setting them into the front of the collections array, we will instead push them to the end. This makes sure that we will check all sibling elements before going to the next row of the tree.

### STAR Questions 

#### Tell me about how you worked effectively under pressure.

When I was working in VSWare, during my second year we were put against a very difficult delivery of a timetable package. It required a 6 week turn around time just before the Christmas break, when initally we had been told we had 16 weeks. I worked very closely with my CTO at the time implementing key features to ensure a minimal viable delivery. I believe my ability to determine the correct tasks helped us with a successful delivery.

#### How do you handle a challenge? Give an example.

While I was away on vacation, a merge was made into our external component libary that included what should have been a major bump to a common component but was versioned incorrectly. I was called to deal with the issue, and handled it by reverting the change to the common component and allowing that major bump to come in later at the correct time.

####  Have you ever made a mistake? How did you handle it?

I once offered a solution for the graceful deprecation of components that wasnt totally sound. After more time study, I came to understand my error in judgement and proceeded by creating a set of alternative solutions.

####  Give an example of how you set goals.

When I was in VSWare we wanted to create a external set of components for our application. A internal toolset that would keep the application style constiant and reduce code bloat. I created the repo, set up the migration process and myself tackled the process one component at a time with the help of team members that were free. We completed a full migration in just under 12 weeks. 

#### Give an example of a goal you reached and tell me how you achieved it.

When I was in VSWare we wanted to create a external set of components for our application. A internal toolset that would keep the application style constiant and reduce code bloat. I created the repo, set up the migration process and myself tackled the process one component at a time with the help of team members that were free. We completed a full migration in just under 12 weeks. 

#### Describe a decision you made that wasn't popular, and explain how you handled implementing it.

After we had a code review peocess set up in VSWAre, I made a choice to introduce two rules; 1. No features could be submitted without tests, 2. All new components needed to be accompanied by a story book component to serve as a living style guide. Though initally not a popular choice as it introduced more work, after a period of time developers started to see the benifit when less issues came back from QA.

#### Give an example of how you worked on a team.

When I was in VSWare, I worked as parts of various teams accross the years from a memeber of a feature team. This ranged from being a junior frontend developer building screens to a manager of all the technical aspects of the frontend team.

#### What do you do if you disagree with someone at work? 

Drop constants for mutations but pattern was already there and it largely was a preference choice. I disagreeded.

#### Share an example of how you were able to motivate employees or co-workers. 

Vue Amsterdam.

#### Have you handled a difficult situation? How?

I was tasked to manage a employee who had difficulty with the larger scope of the team. I assigned him to a siloed project which he would be able to complete independantly and set up a junior mentorship program for him to champion. Between these two tasks, we were able to foster a good sense of team spirit between him and the rest of the team.

## Conclusion

TLDR;
