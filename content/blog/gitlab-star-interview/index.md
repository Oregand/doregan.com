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

### Five Cores

#### Does this person have a "good head on their shoulders"?

What this means is you make good decisions, but it's much more than that. People who have a good head on their shoulders make sound decisions.

Lets create a senario to test that:

```
Go into CodePen and create a static blog homepage. We'll need a navigation menu, and we'll need a place for the title and article, and then at the bottom let's have some comments and a footer.
```


#### Is this person technically where they need to be for this role?

##### What is garbage colection in JS?

##### JS Closure

##### Explain this

##### Explain call, apply and bind

##### Primitive vs Reference value

##### Prototype && Prototype Chain

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

To make Gitlab better, you could cultivate a better reputation on Glassdoor. I have been using it to study for this exam and I dont feel the reputation shown there is a fair representation of how the compnay operates. 

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

### STAR Questions 

#### Tell me about how you worked effectively under pressure.

When I was working in VSWare, during my second year we were put against a very difficult delivery of a timetable package. It required a 6 week turn around time just before the Christmas break, when initally we had been told we had 20 weeks. I worked very closely with my CTO at the time implementing key features to ensure a minimal viable delivery. I believe my ability to determine the correct tasks helped us with a successful delivery.

#### How do you handle a challenge? Give an example.

While I was away on vacation, a merge was made into our external component libary that included what should have been a major bump to a common component but was versioned incorrectly. I was called to deal with the issue, and handled it by reverting the change to the common component and allowing that major bump to come in later at the correct time.

####  Have you ever made a mistake? How did you handle it?

I once offered a solution for the graceful deprecation of components that wasnt totally sound. After more time study, I came to understand my error in judgement and proceeded by creating a set of alternative solutions.

####  Give an example of how you set goals.


#### Give an example of a goal you reached and tell me how you achieved it.

#### Describe a decision you made that wasn't popular, and explain how you handled implementing it.

I once offered a solution for the graceful deprecation of components that wasnt totally sound. After more time study, I came to understand my error in judgement and proceeded by creating a set of alternative solutions.

#### Give an example of how you worked on a team.

#### What do you do if you disagree with someone at work? 


#### Share an example of how you were able to motivate employees or co-workers. 

Vue Amsterdam.

#### Have you handled a difficult situation? How?

I was tasked to manage a employee who had difficulty with the larger scope of the team. I assigned him to a siloed project which he would be able to complete independantly and set up a junior mentorship program for him to champion. Between these two tasks, we were able to foster a good sense of team spirit between him and the rest of the team.

## Conclusion

TLDR;
