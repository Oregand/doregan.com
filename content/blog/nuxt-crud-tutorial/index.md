---
title: Nuxt.JS && Vue CRUD Tutorial
date: "2019-12-25T22:12:03.284Z"
path: /blog/nuxt-crud-tutorial
description: "Nuxt.JS && Vue CRUD Tutorial"
---

## Intro

Hey Kids! Today, were going to build a small CRUD application using [NuxtJS](https://nuxtjs.org/). 

Nuxt is a server side rendering framework that uses [Vue.JS](https://vuejs.org/) at its core. 

> Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.

### The API

Lets kick this show off with creating a Mock API. To do this we're going to use [mockapi](https://www.mockapi.io).

Head over, login and create a basic API called `users`. The base `user` object looks like this: 

```
  {
    "id": "1",
    "createdAt": "2019-12-23T02:04:23.903Z",
    "name": "First1 Last1111",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/michaelcolenso/128.jpg",
    "email": "first1@mail.com",
    "imageUrl": "https://unsplash.it/50?image=1"
  },
```

And after you generate the base API, you can use the "Generate Data" button to create 50 new users.

You should have a set of endpoints now like this:

- `http(s)://5e01296a685ac80014515256.mockapi.io/api/:endpoint`
- `http(s)://5e01296a685ac80014515256.mockapi.io/api/users` => GET
- `http(s)://5e01296a685ac80014515256.mockapi.io/api/user` => POST
- `http(s)://5e01296a685ac80014515256.mockapi.io/api/user/1` => DEL && PUT

### The Base App 

To start our application we can bootstrap our Nuxt app using npx:

```
$ npx create-nuxt-app <project-name>

or

$ yarn create nuxt-app <project-name>
```

When prompted add the following modules:

- Tailwind CSS
- Axois

### Pages

We're going to create a new pages now in our application:

```
pages/
--| user/
-----| index.vue
-----| _id.vue
--| index.vue
```

The pages to note here are:

- `pages/index.vue` => The main entry into our application
- `pages/users/index.vue` => The main entry into our user list
- `pages/users/_id.vue` => The page for a single user based on a routing ID, here we handle updates and deletions
- `pages/users/new.vue` => The page for a single user creation

Creating these pages will automatically generate the following routing config:

```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users',
      path: '/users',
      component: 'pages/users/index.vue'
    },
    {
      name: 'new',
      path: '/users/new',
      component: 'pages/users/new.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
  ]
}
```

We need to now layout pur pages to render our CRUD application:

#### Our user list page

```
<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        User List
      </h1>
      <div class="flex flex-wrap">
        <div class="w-full">
          <table class="table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Avatar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users">
                <td class="border px-4 py-2">{{ user.id }}</td>
                <td class="border px-4 py-2">{{ user.name }}</td>
                <td class="border px-4 py-2">{{ user.email }}</td>
                <td class="border px-4 py-2">
                  <img :src="user.avatar" alt="avatar" />
                </td>
                <td class="border px-4 py-2">
                  <nuxt-link
                    :to="userLink(user.id)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </nuxt-link>
                  <button
                    @click="deleteUser(user.id)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data: () => {
    return {
      response: VueTypes.object.def()
    }
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get(
      'https://5e01296a685ac80014515256.mockapi.io/api/users'
    )
    return { users }
  },
  methods: {
    userLink: (userId) => {
      return `/users/${userId}`
    },
    async deleteUser(userId) {
      const response = await this.$axios.$delete(`
        https://5e01296a685ac80014515256.mockapi.io/api/users/${userId}
      `)
      this.response = response
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.w-full {
  height: 50vh;
  overflow-y: scroll;
}
</style>
```

#### Our single use page

```
<template>
  <div class="container">
    <div>
      <div class="flex flex-wrap">
        <div class="w-full">
          <button
            @click="flags.isEdit = !flags.isEdit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit User
          </button>
        </div>
        <div class="w-full">
          <div
            v-if="flags.isEdit"
            class="max-w-sm w-full lg:max-w-full lg:flex"
          >
            <div
              class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style="background-image: url('/img/card-left.jpg')"
              title="Woman holding a mug"
            />
            <div
              class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
            >
              <div class="mb-8">
                <p class="text-sm text-gray-600 flex items-center">
                  <svg
                    class="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                    />
                  </svg>
                </p>
                <div class="text-gray-900 font-bold text-xl mb-2">
                  {{ user.ID }}
                </div>
                <p class="text-gray-700 text-base">
                  {{ user.email }}
                </p>
              </div>
              <div class="flex items-center">
                <img
                  :src="user.avatar"
                  class="w-10 h-10 rounded-full mr-4"
                  alt="Avatar of Jonathan Reinink"
                />
                <div class="text-sm">
                  <p class="text-gray-900 leading-none">{{ user.name }}</p>
                  <p class="text-gray-600">{{ user.createdAt }}</p>
                </div>
              </div>
            </div>
          </div>
          <EditUserForm :user="{ user }" v-if="!flags.isEdit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

import EditUserForm from '~/components/EditUserForm/index.vue'

export default {
  components: {
    EditUserForm
  },
  data: () => {
    return {
      flags: {
        isEdit: VueTypes.bool.def(false)
      }
    }
  },
  async asyncData({ $axios, params }) {
    const user = await $axios.$get(
      `https://5e01296a685ac80014515256.mockapi.io/api/users/${params.id}`
    )
    return { user }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
```

#### Our user creation page

```
<template>
  <div class="container">
    <div>
      <logo />
      <CreateUserForm />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import CreateUserForm from '~/components/CreateUserForm/index.vue'

export default {
  components: {
    Logo,
    CreateUserForm
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
```

### Components

#### Create User Form

```
<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Name
        </label>
        <input
          id="Name"
          v-model="payload.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Name"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
          Email
        </label>
        <input
          id="Email"
          v-model="payload.email"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
        />
      </div>
      <div class="flex items-center justify-between">
        <p v-if="response" class="text-red-500 text-xs italic">
          {{ response }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="payload.name && payload.email"
          @click="createNewUser()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Create New User
        </button>
        <nuxt-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/"
        >
          Cancel Creation
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  data: () => {
    return {
      payload: {
        name: '',
        email: '',
        imageUrl: 'https://unsplash.it/50?image={{i}}'
      },
      response: VueTypes.object
    }
  },
  methods: {
    async createNewUser() {
      const response = await this.$axios.$post(
        'https://5e01296a685ac80014515256.mockapi.io/api/users',
        this.payload
      )

      this.response = response
    }
  }
}
</script>
<style>
.w-full {
  font-size: 1rem;
}
</style>    
```

#### Edit User Form

```
<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Name
        </label>
        <input
          id="Name"
          v-model="user.user.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Name"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
          Email
        </label>
        <input
          id="Email"
          v-model="user.user.email"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
        />
      </div>
      <div class="flex items-center justify-between">
        <p v-if="response" class="text-red-500 text-xs italic">
          {{ response }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="user.user.name && user.user.email"
          @click="editUser()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Edit User
        </button>
        <nuxt-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/"
        >
          Cancel Edit
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  props: {
    user: {
      type: Object,
      default: Function
    }
  },
  data: () => {
    return {
      response: VueTypes.object
    }
  },
  methods: {
    async editUser() {
      const response = await this.$axios.$put(
        `https://5e01296a685ac80014515256.mockapi.io/api/users/${this.user.user.id}`,
        this.user.user
      )

      this.response = response
    }
  }
}
</script>
<style>
.w-full {
  font-size: 1rem;
}
</style>
```

## Conclusion

Boom! All done and dusted.

TLDR;

- We created a mock API
- We created a Nuxt CRUD app
- We set up the a handful of CRUD endpoints to manage the data in the app

Check out the full repo [here](https://github.com/Oregand/vue-node-firebase) if you want to see the code! 
