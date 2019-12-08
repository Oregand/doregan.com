---
title: A React && Django Tutorial
date: "2019-12-07T22:12:03.284Z"
path: /blog/react-django-turtorial
description: "A React && Django Tutorial"
---

## Intro

So, since I took a bash at setting up a basic todo app using flask, I figured I would flesh out my skill base on Python with a follow up via django. 

In this post, we're gonna do basically the same thing as last time; build a Todo app with python on the BE and react on the FE! 

### What We Need To get Started


- Python.
- Pip.
- Pipenv.

```
$ pip install pipenv
$ pipenv shell
```

> Pipenv is a production-ready tool that aims to bring the best of all packaging worlds to the Python world. It harnesses Pipfile, pip, and virtualenv into one single command.

Once you have these, go ahead and create a empty directory to get started:

```
mkdir react-django-todo
```

### Set Up The Server => Django

So first, let’s install Django using Pipenv then create a new project called backend:

```
$ pipenv install django
$ django-admin startproject backend
```

Next, we will navigate into the newly created backend folder and start a new application called todo. We will also run migrations and start up the server:

```
$ cd backend
$ python manage.py startapp todo
$ python manage.py migrate
$ python manage.py runserver
```

At this point, if all the commands were entered correctly, we should see an instance of a Django application running on this address — `http://localhost:8000`

#### Registering the app

We are done with the basic setup for the backend, let’s start with the more advanced things like registering the todo application as an installed app so that Django can recognise it. 

Open the `backend/settings.py` file and update the `INSTALLED_APPS` section as so:

```
# backend/settings.py

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo' # Add your todo reference
    ]
```

#### Defining the model

Let's create a model to define how the Todo items should be stored in the database, open the `todo/models.py` file and update it with this snippet:

```
# todo/models.py

from django.db import models
# Create your models here.

# add this
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
    return self.title
```

The code snippet above describes three properties on the Todo model:

- Title
- Description
- Completed

The completed property is the status of a task; a task will either be completed or not completed at any time. Because we have created a Todo model, we need to create a migration file and apply the changes to the database, so let’s run these commands:

```
$ python manage.py makemigrations todo
$ python manage.py migrate todo
```

We can test to see that CRUD operations work on the Todo model we created using the admin interface that Django provides out of the box, but first, we will do a little configuration. 

Open the `todo/admin.py` file and update it accordingly:

```
# todo/admin.py

from django.contrib import admin
from .models import Todo # add this

class TodoAdmin(admin.ModelAdmin):  # add this
    list_display = ('title', 'description', 'completed') # add this

# Register your models here.
admin.site.register(Todo, TodoAdmin) # add this
```

We will create a superuser account to access the admin interface with this command:

```
$ python manage.py createsuperuser
```

> You will be prompted to enter a username, email and password for the superuser. Be sure to enter details that you can remember because you will need them to log in to the admin dashboard shortly. 

Let’s start the server once more and log in on the address — `http://localhost:8000/admin:`

```
$ python manage.py runserver
```

We can create, edit and delete Todo items using this interface. Create some and pat yourself on the back!

#### Setting Up The API

Now we install the `djangorestframework` and `django-cors-headers` using Pipenv:

```
$ pipenv install djangorestframework django-cors-headers
```

We need to add `rest_framework` and corsheaders to the list of installed applications, so open the `backend/settings.py` file and update the `INSTALLED_APPS` and `MIDDLEWARE` sections accordingly:

```
# backend/settings.py

# Application definition
INSTALLED_APPS = [
'corsheaders',            # Add
'rest_framework',         # Add 
'todo',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Add
]
```

Add this code snippet to the bottom of the `backend/settings.py` file:


```
# we whitelist localhost:3000 because that's where frontend will be served
CORS_ORIGIN_WHITELIST = (
    'localhost:3000/'
)
```

Django-cors-headers is a python library that will help in preventing the errors that we would normally get due to CORS. rules. In the `CORS_ORIGIN_WHITELIST` snippet, we whitelisted `localhost:3000` because we want the frontend (which will be served on that port) of the application to interact with the API.

#### Creating serializers for the model

We need serializers to convert model instances to JSON so that the frontend can work with the received data easily. We will create a `todo/serializers.py` file:

```
$ touch todo/serializers.py
```

Open the `serializers.py` file and update it with the following code.

```
# todo/serializers.py

from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')
```

In the code snippet above, we specified the model to work with and the fields we want to be converted to JSON.

#### Create The View

We will create a TodoView class in the `todo/views.py` file, so update it with the following code:

```
# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets     
from .serializers import TodoSerializer 
from .models import Todo                

class TodoView(viewsets.ModelViewSet):  
    serializer_class = TodoSerializer     
    queryset = Todo.objects.all()         
```

The viewsets base class provides the implementation for CRUD operations by default, what we had to do was specify the serializer class and the query set.

Head over to the `backend/urls.py` file and completely replace it with the code below. This code specifies the URL path for the API:

```
# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from todo import views                            

router = routers.DefaultRouter()                      
router.register(r'todos', views.TodoView, 'todo')     

urlpatterns = [
    path('admin/', admin.site.urls),         path('api/', include(router.urls))                
]
```

This is the final step that completes the building of the API, we can now perform CRUD operations on the Todo model. The router class allows us to make the following queries:

- /todos/ - This returns a list of all the Todo items (Create and Read operations can be done here).

- /todos/id - this returns a single Todo item using the id primary key (Update and Delete operations can be done here).

Let’s restart the server and visit this address — http://localhost:8000/api/todos:


```
$ python manage.py runserver
```

That’s all for the backend of the application, now we can move on to fleshing out the frontend.

### Set Up the Client => React

We have our backend running as it should, now we will create our frontend and make it communicate with the backend over the interface that we created.

Lets get is set up using the `create-react-app`:

`$ npx create-react-app frontend`

```
$ cd frontend
$ yarn add bootstrap reactstrap axois
```

#### Add Some Styling

First, import BS styling into the base app file:

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Then, add the following reset to the `index.css`:

```
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #282c34;
}
.todo-title {
  cursor: pointer;
}
.completed-todo {
  text-decoration: line-through;
}
.tab-list > span {
  padding: 5px 8px;
  border: 1px solid #282c34;
  border-radius: 10px;
  margin-right: 5px;
  cursor: pointer;
}
.tab-list > span.active {
  background-color: #282c34;
  color: #ffffff;
}
```

#### Set Up Our CRUD Modal

So, first we need to create a basic Modal component to help us create, update and delete todo tasks.

```
$ cd src
$ mkdir components 
$ cd components 
$ mkdir Modal 
$ touch Modal/index.js
```

And now, we can leverage react 16.8 && hooks to build a functional component:

```
import React, { useState, useEffect } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const CustomModal = ({ activeItem, toggle, onSave }) => {
  const [activeItem, setActiveItem] = useState(activeItem);

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...activeItem, [name]: value };
    setActiveItem({ activeItem });
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={activeItem.title}
              onChange={e => handleChange(e)}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={activeItem.description}
              onChange={e => handleChange(e)}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup check>
            <Label for="completed">
              <Input
                type="checkbox"
                name="completed"
                checked={activeItem.completed}
                onChange={e => handleChange(e)}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
```

#### Set Up Our App

And last, but not least, we need to edit our `App.js` to render the todos, import the modal for CRUD and handle our app display:

```
import React, { useState, useEffect, Suspense, lazy } from "react";

const Modal = lazy(() => import("./components/Modal"));

const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => setTodoList(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button className="btn btn-primary">Add task</button>
            </div>
            <div className="my-5 tab-list">
              <span
                onClick={() => setViewCompleted(true)}
                className={viewCompleted ? "active" : ""}
              >
                complete
              </span>
              <span
                onClick={() => setViewCompleted(false)}
                className={viewCompleted ? "" : "active"}
              >
                Incomplete
              </span>
            </div>
            <ul className="list-group list-group-flush">
              {todoList.map(item => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    className={`todo-title mr-2 ${
                      viewCompleted ? "completed-todo" : ""
                    }`}
                    title={item.description}
                  >
                    {item.title}
                  </span>
                  <span>
                    <button className="btn btn-secondary mr-2"> Edit </button>
                    <button className="btn btn-danger">Delete </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <Suspense fallback={<div />}>
          <Modal
            activeItem={activeItem}
            toggle={toggle}
            onSave={handleSubmit}
          />
        </Suspense>
      )}
    </main>
  );
};

export default App;
```

## Conclusion

Boom! All done and dusted.

TLDR;

- We created a Django server and added some data 
- We set up the django server and a handful of CRUD endpoints to manage the data in the app 
- We created a very simple client using react to render the data!

Check out the full repo [here](https://github.com/Oregand/django-react-redux-todo) if you want to see the code! 


