---
title: A Python Flask Todo Application Tutorial
date: "2019-11-29T22:12:03.284Z"
path: /blog/flask-todo
description: "A Python Flask Todo Application Tutorial"
---

## Intro

Why Flask?

Just like how people get confused with which Python version to start with, Django vs Flask is another age-old debate. Though people say Flask is simple and easy to get started with while Django is heavy for building web applications, there is another important reason why you should choose Flask over Django.

We, as developers in the era of the cloud, are moving away from monolithic applications. With microservices architecture in place, running multiple Django servers is going to make your services heavy because of all the built-in apps it comes with.


### Hello World

Let's start small and build application using flask for printing "Hello World":

```
todo-flask
    |_ app.py
```

Start by creating an `app.py` file under your project. You can name it anything other than calling your file `flask.py` since it will create a conflict with the actual flask package we installed.

```
# app.pyfrom flask import Flask           # import flask
app = Flask(__name__)             # create an app instance

@app.route("/")                   # at the end point /
def hello():                      # call method hello
    return "Hello World!"         # which returns "hello world"if __name__ == "__main__":        # on running python app.py
    app.run()                     # run the flask app
```

### Running the Application

> Run the application by running the `app.py` file. By default, flask runs a local server at port 5000.

```
python app.py
```

### Let’s Build that ToDo list Application

What are the operations you expect your users to do?

- Create an item
- Delete an item
- Mark an item done
- Update an item

#### How does the data look?

Now that we have figured out the actions that need to be performed let’s look at how to data is going to look like pertaining to each action

1. Create an Item — Title, Description, CreatedOn, DueDate
2. Delete an Item — _is_deleted
3. Mark an Item Done — _is_done
4. Update an Item — We are not editing any info other than the ones we created. So no additional parameters here.

#### Designing the Schema

We need a table to store the ToDo list created by users, which makes our first table with columns.

```
ToDo_Items 
- Id                 Primary Key
— Title              Text
- Description        Text  
- CreatedOn          Date
- DueDate            Date
- _is_deleted        Boolean
- _is_done           Boolean
```

#### Structuring Our Code

One of the common mistakes that beginners do is dumping all the code into one file. While this is completely acceptable since you are a beginner, it is always good to have a sense of best practices and why we do them. This would give you a sense of building real software rather than building a quick hack.

```
todo-flask
    |_ app
        |_ __init__.py
        |_ app.py
        |_ models.py
        |_ service.py
```

- `app.py` — the entry & exit point to our application
- `service.py` — converts the request into a response.
- `models.py` — handles everything that involves a Database.

#### Model

Let’s keep aside Flask for now and look at the Pythonic way of creating these tables. To handle all the DB related operations we are going to create a separate file called `models.py`

```
import sqlite3

class Schema:
    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.create_user_table()
        self.create_to_do_table()

    del __del__(self):
        self.conn.commit()
        self.conn.close()

    def create_to_do_table(self):

        query = """
        CREATE TABLE IF NOT EXISTS "Todo" (
          id INTEGER PRIMARY KEY,
          Title TEXT,
          Description TEXT,
          _is_done boolean DEFAULT 0,
          _is_deleted boolean DEFAULT 0,
          CreatedOn Date DEFAULT CURRENT_DATE,
          DueDate Date,
          UserId INTEGER FOREIGNKEY REFERENCES User(_id)
        );
        """
        self.conn.execute(query)

    def create_user_table(self):
        query = """
        CREATE TABLE IF NOT EXISTS "User" (
        _id INTEGER PRIMARY KEY AUTOINCREMENT, 
        Name TEXT NOT NULL, 
        Email TEXT, 
        CreatedOn Date default CURRENT_DATE
        );
        """
        self.conn.execute(query)

class ToDoModel:
    TABLENAME = "Todo"

    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.conn.row_factory = sqlite3.Row

    def __del__(self):
        self.conn.commit()
        self.conn.close()

    def get_by_id(self, _id),:
        where_clause= f'AND id={id}'
        return self.list_items(where_clause)

    def create(self, params):
        print(params)
        query = f'insert into {self.TABLENAME} ' \
                f'(Title, Description, DueDate, UserId) ' \
                f'values ("{params.get("Title")}","{params.get("Description")}",' \
                f'"{params.get("DueDate")}","{params.get("UserId")}")'
        result = self.conn.execute(query)
        return self.get_by_id(result.lastrowid)

    def delete(self, item_id):
        query = f"UPDATE {self.TABLENAME} " \
                f"SET _is_deleted =  {1} " \
                f"WHERE id = {item_id}"
        print (query)
        self.conn.execute(query)
        return self.list_items()

    def update(self, item_id, update_dict):
        """
        column: value
        Title: new title
        """
        set_query = " ".join([f'{column} = {value}'
                     for column, value in update_dict.items()])

        query = f"UPDATE {self.TABLENAME} " \
                f"SET {set_query} " \
                f"WHERE id = {item_id}"
        self.conn.execute(query)
        return self.get_by_id(item_id)

    def list_items(self, where_clause=""):
        query = f"SELECT id, Title, Description, DueDate, _is_done " \
                f"from {self.TABLENAME} WHERE _is_deleted != {1} " + where_clause
        print (query)
        result_set = self.conn.execute(query).fetchall()
        result = [{column: row[i]
                  for i, column in enumerate(result_set[0].keys())}
                  for row in result_set]
        return result

class User:
    TABLENAME = "User"

    def create(self, name, email):
        query = f'insert into {self.TABLENAME} ' \
                f'(Name, Email) ' \
                f'values ({name},{email})'
        result = self.conn.execute(query)
        return result

```

#### Service

We are separating view methods from service method because it enables you to test these functions easily. Our service file simply makes reference to the methods we defined in the model file.

```
from models import ToDoModel

class ToDoService:
    def __init__(self):
        self.model = ToDoModel()
    
    def create(self, params):
        return self.model.create(params)

    def update(self, item_id, params):
        return self.model.update(item_id, params)

    def delete(self, item_id):
        return self.model.delete(item_id)

    def list(self):
        response = self.mode.list_items()
        return response
        
```

#### View

The view functions as I already mentioned is the entry and exit point of the system. The main file(`app.py`) will handle our main app functions:

- Type of input we expect from the user — JSON, File, free text etc.,
- Type of output we are providing the user — JSON, file, HTML page etc.,
- Authentication of the requests
- Logging the requests


```
from flask import Flask, request, jsonify
from service import ToDoService
from models import Schema

import json

app = Flask(__name__)

@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
    return response


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/<name>")
def hello_name(name):
    return "Hello " + name


@app.route("/todo", methods=["GET"])
def list_todo():
    return jsonify(ToDoService().list())


@app.route("/todo", methods=["POST"])
def create_todo():
    return jsonify(ToDoService().create(request.get_json()))


@app.route("/todo/<item_id>", methods=["PUT"])
def update_item(item_id):
    return jsonify(ToDoService().update(item_id, request.get_json()))


@app.route("/todo/<item_id>", methods=["DELETE"])
def delete_item(item_id):
    return jsonify(ToDoService().delete(item_id))


if __name__ == "__main__":
    Schema()
    app.run(debug=True, port=8888)
```

## Conclusion

TLDR;

- We created a flask web app via three files 
- We have a model file, a service file and a app file
- We created a very simple client using flask itself to render the data!

Check out the full repo [here](https://github.com/Oregand/flask-todo) if you want to see the code! 

