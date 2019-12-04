---
title: A React, NodeJS, Express && Mongo CRUD Tutorial
date: "2019-11-29T22:12:03.284Z"
path: /blog/react-node-mongo
description: "A React, NodeJS, Express && Mongo CRUD Tutorial"
---

## Intro

What's one of the worlds fastest growing stacks? 

> The MERN stack. 

The main thing you should know is that, with MERN Stack, you’ll work with Javascript, lots and lots of our good old friend, the JavaScripts.

Let's start with what each letter in our stack represents:

- Mongo DB: A document-based open source database, that provides you scalability and flexibility.
- Express JS: A structured base designed to develop web applications and APIs.
- React JS: A Javascript Front-end library for building user interfaces. Maintained by Facebook.
- Node JS: A javascript runtime built on Chrome’s V8 JS engine.

_Pop quiz time! Perhaps you've heard of the MERN's slightly less cool little sister: the [MEAN](http://meanjs.org/) stack? It's basically the same only we trade React for Angular!_

So, lets build us a CRUD application to outline how all these amazing pieces fit together into a single working app.

### The Database => Mongo

#### Install Mongo

For MacOS:

```
$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community
```

For anything outside Mac try [here](https://docs.mongodb.com/manual/administration/install-community/)

Now, start your mongo service:

```
$ brew services start mongodb
```

Then, create your database:

```
$ mongo
> use users
```

> And thats it, for now we just want the empty Database, we will create the data programatically later.


### The Backend => Node

Here, we’re going to create the server side of our application, where we’re going to create a RESTful following the steps.

Firstly, let’s create an empty directory that will be the root of our system.

```
$ mkdir mern
$ cd mern
```

Now, we create our server side of the application:

```
$ mkdir server
$ cd server
```

Let's start with our server base, we need a `package.json`.

To create a package.json you need a Package Manager, you can choose NPM (Node Package Manager) or YARN. Feel free to use what you prefer.

```
$ yarn init

or

$ npm init -y
```


The system will now create a base project after a selection of questions. After that we want to install a selection of dependancies:


```
$ yarn add express body-parser cors mongoose nodemon

or

$ npm install express body-parser cors mongoose nodemon
```

But! What do these libs mean and do!    

- Express: It’s the server framework (The E in MERN).
- Body Parser: Responsible to get the body off of network request.
- Nodemon: Restart the server when it sees changes (for a better dev experience).
- Cors: Package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- Mongoose: It's an elegant MongoDB object modeling for node.js

Now that we have all our needed libs, lets create our first NodeJS file `/server/index.js`:

```
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
```

Now to start out application we run: 

```
$ nodemon index.js
```

Now you can head to: `localhost:5000` and your server is running!

### Create DB Connection

Lets create the file that will handle the connection from our Node <=> Mongo Database 

```
$ mkdir db
$ touch index.js
```

```
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
```


And add the connection to your server file with these lines:

```
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
```

#### Create User Schema 

As we’ve said, we need to create an entity called users that should be composed of the users in our DB. 

For this, we just need to know the name and the email of our users.

```
$ mkdir models
$ cd models
$ mkdir user
$ cd user
$ touch index.js
```

```
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)
```

#### Create User Routes

Here, we’ll create all the CRUD operations and create our REST endpoints. Let’s create two more folders on the server: routes and controllers. 

In the route folder, let’s create the folder for users and in the controller folder we can do the same.

```
$ mkdir routes controllers
$ mkdir routes/user
$ mkdir controllers/user
$ touch routes/user/index.js
$ touch controllers/user/index.js
```

Now we define our controller:

```
const User = require('../../models/user')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.name = body.name
        user.time = body.time
        user.rating = body.rating
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}
```

And the routes file:

```
const express = require('express')

const UserCtrl = require('../../controllers/user')

const router = express.Router()

router.post('/user', UserCtrl.createUser)
router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/users', UserCtrl.getUsers)

module.exports = router
```

And last, we add the route file to our server:


```
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const userRouter = require('./routes/user')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
```

Bam! We now have a working BE! Lets get to work preparing the FE for rendering our data.


### The Frontend => React

So now that we have our super amazing BE all configured we need to create the FE or client to handle the rendering of data. We can do that via a handy tool called `npx`

#### Create Client Via Create-React-App

```
$ npx create-react-app client
$ cd client
$ yarn start
```

Boom! Yeah its that easy. But we need some deps: We’ll need Axios, Bootstrap, Styled Components and React Router Dom

- axios: It’s a promise-based the asynchronous code. It’s the most popular promise based HTTP.
- bootstrap: It’s is an open-source toolkit and the most popular front-end component library where allows you for developing with HTML, CSS, and JS.
- styled-components: It allows you to write actual CSS code to style your components.
- react-router-dom: DOM bindings for React Routers.

```
$ yarn add styled-components react-router-dom axios bootstrap

or

$ npm install styled-components react-router-dom axios bootstrap --save
```

In the src directory, we should create the new directories that will be the structure of our project. Create an index.js file inside each directory, except app folder.


```
$ cd src
$ mkdir api app components pages style
$ touch api/index.js components/index.js pages/index.js style/index.js
```

Move the App.js file to the app directory, but renaming to index.js.

```
$ mv App.js app/index.js
```

#### Create Components 

```
$ touch components/NavBar/index.js components/Logo/index.js components/Links/index.js
```

```
// Navbar

import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'

const Logo = lazy(() => import('../Logo'));
const Links = lazy(() => import('../Links'));

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

const NavBar = () => {
    return (
        <Container>
            <Nav>
                <Suspense>
                    <Logo />
                </Suspense>
                <Suspense>
                    <Links />
                </Suspense>
            </Nav>
        </Container>
    )
}

export default NavBar
```


```
// Logo

import React from 'react'
import styled from 'styled-components'

import logo from './logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

const Logo = () => {
    return (
        <Wrapper href="https://sambarros.com">
            <img src={logo} width="50" height="50" alt="sambarros.com" />
        </Wrapper>
    )
}

export default Logo
```

```
// Links

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const Links = () => {
    return (
        <React.Fragment>
            <Link to="/" className="navbar-brand">
                My first MERN Application
            </Link>
            <Collapse>
                <List>
                    <Item>
                        <Link to="/" className="nav-link">
                            Users
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/create" className="nav-link">
                            Create User
                        </Link>
                    </Item>
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default Links
```

#### Update Main App File

> Once we'ce fleshed out our components we now want to set up our main file to be able to route between pages and include our NvBar!

```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserInsert from '../pages/UserInsert'
import UserUpdate from '../pages/UserUpdate'
import UserList from '../pages/UserList'
import 'bootstrap/dist/css/bootstrap.min.css'
const Navbar = lazy(() => import('../components/Navbar'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Navbar />
      </Suspense>
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/create" exact component={UserInsert} />
        <Route
            path="/update/:id"
            exact
            component={UserUpdate}
        />
      </Switch>
    </Router>
  );
}

export default App;
```

#### Create API

Our API file lets us intergrate the FE and BE.


```
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = () => api.get(`/users`)
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

const API = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default API
```

#### Create Pages 

Last, we will create the pages that are going to support our application:

- UserInsert
- UserList
- UserUpdate


```
// Userlist 

import React, { useState, useEffect } from 'react'
import API from '../../api'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const UserList = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const result = await API.getAllUsers()
        return result;
    }   

    useEffect(() => {
        setUsers(getUsers())
    },  [])

    return (
        <Wrapper>
            {users.length === 0 && <p>No worries</p>}
            {users.length > 0 && 
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ name, email }) => (
                            <tr>
                                <td>{name}</td>
                                <td>{email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </Wrapper>
    )
}

export default UserList
```

```
// Userupdate 

import React from 'react'

const UserUpdate = () => {
    return (
        <div>
            <p>In this page you'll see the form to update the users</p>
        </div>
    )
}
export default UserUpdate
```

```
// UserInsert

import React, { useState } from 'react'
import api from '../../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const handleIncludeUser = async (payload) => {
    await api.insertUser(payload).then(res => {
        window.alert(`User inserted successfully`)
    })
}

const UserInsert = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    return (
        <Wrapper>
            <Title>Create User</Title>
            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Label>Email: </Label>
            <InputText
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleIncludeUser({name, email})}>Add User</Button>
            <CancelButton href={'/'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default UserInsert
```

## Conclusion


TLDR;

- We created a Mongo server and added some data 
- We set up a basic Node server and a handful of CRUD endpoints to manage the data in the database 
- We created a very simple client using react to render the data!

Check out the full repo [here](https://github.com/Oregand/mern) if you want to see the code! 

