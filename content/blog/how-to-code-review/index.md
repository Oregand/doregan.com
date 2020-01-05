---
title: How To Code Review
date: "2019-12-31T22:12:03.284Z"
path: /blog/how-to-code-review
description: "How To Code Review"
---

## Intro

Today, we're going to talk about how to give a code review. The review itself is based on a small merge implmeneted for a feature requirement in Gitlab. 

### The Feature / Issue

# Features
- Remove the auto-generation of new buddy on page load
- Add ability to select the new team members department
- Add ability to generate new buddy after clicking on the `Generate buddy` button
- Load the new buddy's avatar
  - `https://gitlab.com/gitlab-com/www-gitlab-com/raw/master/source/images/team/` should prefix the value in the picture property of team.yml
- Clicking on the new buddy's name should open up the person's gitlab profile URL
- Page should be responsive and match design specs
- Assume that the first department of each user is the user's primary department (that is used for the buddy generation)
- Randomly select a buddy that does not belong in the same department as the one selected in the dropdown

# Design Specs
https://gitlab-frontend.surge.sh

# Team.yml structure

```
- slug: dz
  type: person
  name: Dmitriy 'DZ' Zaporozhets
  start_date: 2013-01-24
  location_factor: 0.5122
  locality: Kharkiv
  country: Ukraine
  role: Co-founder, <a href="/job-families/engineering/backend-engineer/#engineering-fellow">Engineering Fellow</a>
  reports_to: sid
  twitter: dzaporozhets
  gitlab: dzaporozhets
  picture: picture_dmitriy.png
  departments:
    - Engineering Function
    - Core Team Alum
  projects:
    gitlab-ce: maintainer backend
    gitlab-ee: maintainer backend
  story:  |
          Dmitriy started GitLab in September 2011 and has released it every month on the 22nd since then.
          He wanted to make a great and free project management system that he could use every day.
          He loved to work on GitLab so much that in January of 2013 he began to work on GitLab fulltime.
          When he has time he loves to code a major new GitLab feature in two days.
          He loves a good chocolate and a merge request that can be accepted without comments.
          He is the lead author of GitLab CE and CI.
```


### The Merge 

#### `app/assets/stylesheets/application.css`

```
- html {
-  text-align: center;
- }
-
- h1 {
-  background-color: orange;
- }
```


#### `app/assets/stylesheets/application.scss`

```
body {
  font-family: roboto;
  margin: 0;
}

.header-bar {
  height: 40px;
  background-color: #292962;
  width: 100%;
}

.title {
  display: block;
  font-size: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
}

.sub-title {
  display: block;
  padding-bottom: 16px;
}

span:not(#warning-container) {
  display: block;
  border-color: #E5E5E5;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  padding: 16px;
}

.container {
  left: 80px;
  position: relative;
  width: calc(100% - 160px);
}

select {
  height: 32px;
  width: 320px;
  font-size: 16px;
  margin-bottom: 16px;
}

.generate-btn {
  display: block;
  margin-top: 16px;
  background: #1AAA55;
  border: 1px solid #168F48;
  border-radius: 5px;
  color: white;
  height: 32px;
  font-size: 16px;
}

.selected-buddy {
  margin-top: 16px;

  .image-container {
    display: inline-block;
    position: relative;
    width: 32px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      position: absolute;
      top: -22px;
    }
  }
}
```

#### `app/javascript/buddy_generator_app.vue`

```
      selected: null,
    }
  },
+  mounted() {
+    document.querySelector('.generate-btn').addEventListener('click', this.generate);
+  },
  methods: {
    async getTeamData() {
      const { data } = await axios.get(
    async generate() {
      this.teamData = await this.getTeamData();
      this.selected = this.selectRandomPerson();

+      while(this.teamData[this.selected].departments[0] === document.querySelector('select').value) {
+        this.selected = this.selectRandomPerson();
+      }
    },
  }
}
</script>

<template>
  <div>
-    <div v-if="selected">
-      <h1>Your randomly selected onboarding buddy is</h1>
-      <p>
-        {{ teamData[selected].name }}
-      </p>
+  <span v-if="selected" class="selected-buddy">
+    <b>Your onboarding buddy is</b>
+    <div class="image-container">
+      <img :src="`https://gitlab.com/gitlab-com/www-gitlab-com/raw/master/source/images/team/${this.teamData[this.selected].picture}`" />
    </div>
-    <button type="button" @click="generate">Generate Buddy</button>
-  </div>
+    <a :href="`https://gitlab.com/${this.teamData[this.selected].gitlab}`" target="_blank">{{ teamData[selected].name }}</a>
+  </span>
</template>
```

#### `app/views/main/index.html.haml`

```
- #app
+ .header-bar
+ .container
+   %b.title Onboarding Buddy Generator
+   %span
+     %div
+       %b.sub-title New team member's department
+       %select
+         %option Engineering Function
+         %option Executive
+         %option Sales
+         %option Product Management
+         %option Finance
+         %option Marketing
+     We want to help you select a buddy from a different department so that your new team member can get to know other people in the company.
+     %button.generate-btn Generate buddy
+   #app
```

### What Was Done Correctly

| Task  | Done  | Not Done  |
|---|---|---|
| Remove the auto-generation of new buddy on page load  | Yes  |   |
| Add ability to select the new team members department  | Yes  |   |
| Add ability to generate new buddy after clicking on the `Generate buddy` button  | Yes  |   |
|  Load the new buddy's avatar | Yes  |   |
|  `https://gitlab.com/gitlab-com/www-gitlab-com/raw/master/source/images/team/` should prefix the value in the picture property of team.yml | yes  |   |
| Clicking on the new buddy's name should open up the person's gitlab profile URL  | Yes  |   |
| Assume that the first department of each user is the user's primary department (that is used for the buddy generation)  | Yes  |   |
| Randomly select a buddy that does not belong in the same department as the one selected in the dropdown  | Yes  |   |

We can see the above tasks were all completed successfully via the merge and so our comments will be around code preferences. Specfically we need to address the logic for:

- Assume that the first department of each user is the user's primary department (that is used for the buddy generation)
- Randomly select a buddy that does not belong in the same department as the one selected in the dropdown

### What Was Done Wrongly

| Task  | Done  | Not Done  |
|---|---|---|
| Page should be responsive and match design specs  |   | No  |
| Tests Should Green  |   | No  |


We can see the above tasks were not all completed successfully via the merge and so our comments will be around how to fix/imporve these. 

- Page does match design specs but is *not* responsive, specifically the select has a hardcoded width
- Tests fail

#### Solutions for incorrect code

1. Page does match design specs but is *not* responsive, specifically the select has a hardcoded width

We can suggest the use of a `%` width to scale with the parent container.

```
select {
  height: 32px;
-  width: 320px;
+  width: 100%;
  font-size: 16px;
  margin-bottom: 16px;
}
```

Or we could use media queries along with predefined breakpoints if our design calls for them.

```
@media screen and (max-width: $break-small) {
  select {
    width: 140px;
  }
}
```

2. Tests fail

Why do the tests fail?

Our tests fail because the test framework i.e. jest does not create a DOM via `mount` that allows us to select Node elements. For this we need to create them in Vue. 

Our origional tests run because the majority of the template is found in the `vue` file, but after the merge the majority of the file is in HAML.

Our Solution is to refractor the file to use Vue, not HAML.



### Best Practices / Personal Preferences

- HAML vs Vue

Unless we need to use HAML, I would recommend keeping the feature to a single Vue component, which allows us to follow the best practice for rendering a single file component.

- Use Vuex Store

In keeping with Gitlabs base data flow we want to establish a store following the flue pattern and centeralize our data there. To do that, we follow the [Github guide](https://docs.gitlab.com/ee/development/fe_guide/vuex.html)


```
└── store
  ├── index.js          # where we assemble modules and export the store
  ├── actions.js        # actions
  ├── mutations.js      # mutations
  ├── getters.js        # getters
  ├── state.js          # state
  └── mutation_types.js # mutation types
```

We need to register our store for the module. 


```
import Vue from 'vue'
import App from '../buddy_generator_app.vue'
import { createStore } from '../store'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: document.querySelector('#app'),
    store: createStore,
    components: {
      App,
    },
    render: createElement =>
        createElement('app', {
          props: { },
        }),
  })
})
```


Our store init file looks like this following the gitlab pattern:

```
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export const createStore = () => new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
});
```

Now then, we first define our base state:

```
export default () => ({
    teamData: [],
    pending: false,
    error: null,
    selectedPerson: null,
    selected: null
  });
```

And then our actions:

```
import axios from 'axios';
import * as types from './mutation_types';
import jsyaml from 'js-yaml';


export const requestTeamData = ({ commit }) => commit(types.REQUEST_TEAM_DATA);
export const receiveTeamDataSuccess = ({ commit }, data) => commit(types.RECEIVE_TEAM_DATA_SUCCESS, data);
export const receiveTeamDataError = ({ commit }, error) => commit(types.RECEIVE_TEAM_DATA_ERROR, error);

export const fetchTeamData = ({ state, dispatch }) => {
    dispatch('requestTeamData');

    axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://gitlab-frontend.surge.sh/team.yml`, {
            crossdomain: true,
            headers: {
            'X-Requested-With': 'XMLHttpRequest',
            },
        })
        .then(({ data }) => dispatch('receiveTeamDataSuccess', jsyaml.load(data)))
        .catch((error) => {
        dispatch('receiveTeamDataError', error)
        console.error(error);
        });
}

export const receiveSelectedSuccess = ({ commit }, data) => commit(types.RECEIVE_SELECTED_SUCCESS, data);

export const setSelected = ({state, dispatch }, selected) => {
    dispatch('receiveSelectedSuccess', selected);
}
```

Our mutation types:

```
export const REQUEST_TEAM_DATA = 'REQUEST_TEAM_DATA';
export const RECEIVE_TEAM_DATA_SUCCESS = 'RECEIVE_TEAM_DATA_SUCCESS';
export const RECEIVE_TEAM_DATA_ERROR = 'RECEIVE_TEAM_DATA_ERROR';
export const RECEIVE_SELECTED_SUCCESS = 'RECEIVE_SELECTED_SUCCESS'
```

Our mutations:

```
import * as types from './mutation_types';

export default {
    [types.REQUEST_TEAM_DATA](state) {
      state.pending = true;
    },
    [types.RECEIVE_TEAM_DATA_SUCCESS](state, data) {
      state.teamData = data;
      const items = data.filter(({ departments }) => departments[0] !== state.selected);
      state.selectedPerson = items[Math.floor(Math.random()*items.length)];
      state.pending = false;
    },
    [types.RECEIVE_TEAM_DATA_ERROR](state, error) {
      state.pending = false;
    },
    [types.RECEIVE_SELECTED_SUCCESS](state, data) {
      state.selected = data;
    }
  };
```

And finally our getters:

```
export const getUserImage = (state, getters) => {
    return `https://gitlab.com/gitlab-com/www-gitlab-com/raw/master/source/images/team/${state.selectedPerson.picture}`;
};

export const getUserLink = (state, getters) => {
    return `https://gitlab.com/${state.selectedPerson.slug}`;
};
```


Finally, our component looks much cleaner:

```
<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState([
      'pending',
      'teamData',
      'error',
      'selectedPerson',
      'selected'
    ]),
    ...mapGetters([
      'getUserImage',
      'getUserLink'
    ]),
  },
  methods: {
    ...mapActions([
      'fetchTeamData',
      'setSelected'
    ]),
    selectDep(e) {
      this.setSelected(e.target.value);
    },
    generate() {
      this.fetchTeamData()
    },
  }
}
</script>

<template v-slot:default="{ pending, error, selectedPerson }">
  <div>
    <div class="header-bar" />
    <div class="container">
      <b class="title">Onboarding Buddy Generator</b>
      <span>
        <div>
          <b class="sub-title">New team member's department</b>
          <select :value="selected" @change="selectDep">
            <option value="Engineering Function">Engineering Function</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
        We want to help you select a buddy from a different department so that your new team member can get to know other people in the company.
      </span>
      <button class="generate-btn" @click="generate">Generate buddy</button>
      <div v-if="pending">Loading ...</div>
      <div v-else-if="error">{{ error }}</div>
      <span v-else-if="selectedPerson" class="selected-buddy">
          <b>Your onboarding buddy is</b>
          <div class="image-container">
            <img :src="getUserImage" alt="Selected Buddy" />
          </div>
          <a :href="getUserLink" target="_blank">{{ selectedPerson.name }}</a>
      </span>
    </div>
  </div>
</template>
```


- Responsive Layout

In our app, most of the styles are perfectly suitable however our select is not mobile responsive due to a locked width:

```
select {
  width: 320px;
}
```

To fix this, we can simply set the width to a responsive variable:

```
select {
  width: 100%;
}
```

- Grid Layout / Flex

We can achieve a fully responsive layout using the CSS grid setup instead of hardcoding positions and adding adjusted content.

```
body {
  font-family: roboto;
  margin: 0;
  display: grid;
}

.header-bar {
  height: 40px;
  background-color: #292962;
  grid-column: 1 / 13;
  grid-row: 1;
}

.container {
  grid-column: 1 / 13;
  grid-row: 2;
  padding: 1rem;
}
```

Using flex:

```

```

- Axois - Catch failed state

Our `axois` call has *no* catch for any errors we might get from the server such as a 500, 504, etc. 

To fix this, we add a simple `try/catch` block around the `async` request.

```
try {
    const { data } = await axois.get(`uri`)
    return jsyaml.load(data);
} catch(error) {
    console.log(error)
}
```

- Async Load/Failure State/Axois

For our component, we want to ensure we can handle the three main states of data rendering:

1. Pending
2. Failed
3. Successful 

To do this we can use `v-if/v-else-if` with either a more tradtional layout or scoped slots.


```
// Non Scoped

<template>
  <div>
    <div class="header-bar" />
    <div class="container">
      <b class="title">Onboarding Buddy Generator</b>
      <span>
        <div>
          <b class="sub-title">New team member's department</b>
          <select v-model="selected">
            <option value="Engineering Function">Engineering Function</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
        We want to help you select a buddy from a different department so that your new team member can get to know other people in the company.
      </span>
      <button class="generate-btn" @click="generate">Generate buddy</button>
      <span v-if="selectedPerson" class="selected-buddy">
        <b>Your onboarding buddy is</b>
        <div class="image-container">
          <img :src="userImage" alt="Selected Buddy" />
        </div>
        <a :href="userLink" target="_blank">{{ selectedPerson.name }}</a>
      </span>
      <span v-else-if="error">
        <b>Your onboarding buddy has failed to load!</b>
      </span>
      <span v-else-if="pending">
        <b>Your onboarding buddy is loading......</b>
      </span>
    </div>
  </div>
</template>
```

```
// Scoped


methods: {
    async getTeamData() {
        try {
            const { data } = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://gitlab-frontend.surge.sh/team.yml`, {
            crossdomain: true,
            headers: {
            'X-Requested-With': 'XMLHttpRequest',
            },
        });
        this.error = false;
        return jsyaml.load(data);
        } catch (e) {
        this.teamData = [];
        this.error = e;
        }
    },
    selectRandomPerson() {
        const items = this.teamData.filter(({ departments }) => departments[0] !== this.selected);
        return items[Math.floor(Math.random()*items.length)];
    },
    async generate() {
        this.pending = true;
        this.teamData = await this.getTeamData();
        this.selectedPerson = this.selectRandomPerson();
        this.pending = false;
    }
},

<template v-slot:default="{ pending, error, selectedPerson }">
  <div>
    <div class="header-bar" />
    <div class="container">
      <b class="title">Onboarding Buddy Generator</b>
      <span>
        <div>
          <b class="sub-title">New team member's department</b>
          <select v-model="selected">
            <option value="Engineering Function">Engineering Function</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
        We want to help you select a buddy from a different department so that your new team member can get to know other people in the company.
      </span>
      <button class="generate-btn" @click="generate">Generate buddy</button>
    </div>
    <div v-if="pending">Loading ...</div>
    <div v-else-if="error">{{ error }}</div>
    <span v-else-if="selectedPerson" class="selected-buddy">
        <b>Your onboarding buddy is</b>
        <div class="image-container">
          <img :src="userImage" alt="Selected Buddy" />
        </div>
        <a :href="userLink" target="_blank">{{ selectedPerson.name }}</a>
    </span>
  </div>
</template>
```

- Tests

Our tests all fail after the merge is made because we are using a HAML template which is not loaded into the DOM when the tests are run. 

The solution is to keep the feature to sinle file component in Vue.


- Accessability

We find that our `img` has no `alt` tag which we want to add according to [the accessibility-cheatsheet](https://moritzgiessmann.de/accessibility-cheatsheet/)

From:

`<img :src="userImage" />`

To:

`<img :src="userImage" alt="Selected Buddy" />`

- Computed Properties

Twice in our file we find complex use of string literals which can be replaced as computed values, this helps with readability:

From:

```
<img :src="https://gitlab.com/gitlab-com/www-gitlab-com/raw/master/source/images/team/${selectedPerson.picture}" />

<a :href="https://gitlab.com/${selectedPerson.gitlab}" target="_blank">{{ selectedPerson.name }}</a>
```

To:

```
computed: {
    userImage: function () {
        return `https://gitlab.com/gitlab-com/www-gitlab-com/raw/master/source/images/team/${this.selectedPerson.picture}`;
    },
    userLink: function() {
        return `https://gitlab.com/${this.selectedPerson.gitlab}`;
    }
},

<img :src="userImage" />
<a :href="userLink" target="_blank">{{ selectedPerson.name }}</a>
```

### Awesome Things Done

- Overall the submitter of the MR fully understood the E2E requirements and managed to deliver the majority of them.
- The merge was small enough to be effectivaly removed, submitted with a single feature change in mind. 
- The Merge author submitted before and after screen shots with their merge. 
- The Vue file followed the Gitlab style guide. 
- The code is written plainly and easy to reason about. 
- No deep abstractions.

## Conclusion

TLDR;

- We always start with the tests, we check the pipeline, see what fails / passes
- After that, we read the feature documentation and check again the tests 
- We follow the set guidelines for a [code review](https://docs.gitlab.com/ee/development/code_review.html#reviewing-code)
- We comment on whats wrong 
- We comment on whats right 
- We make suggests for long term imporvements 
- Nit picks
- We provide a summary

