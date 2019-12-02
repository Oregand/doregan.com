---
title: A React, NodeJS && MYSQL CRUD Tutorial
date: "2019-11-29T22:12:03.284Z"
path: /blog/react-node-mysql
description: "A React, NodeJS && MYSQL CRUD Tutorial"
---

## Intro

So, this week I had a interview for a remote first company [Clevertech](https://www.clevertech.biz/). For the role in question, I was told the technical interview would consist of a real world application, created via React, Node && MYSQL. 

Given it has been a few weeks since I had last dived into Node and a few months since SQL, I decided to put together a basic CRUD application using this tech stack.

What we're going to cover is:

- Create a SQL database
- Create a BE server using Node to get data from the database 
- Create a FE using React to render the data

### Project Structure

```
.
├── README
├── server        
│   ├── lib  
│   ├── bin  
│   ├── public 
│   ├── routes
│   ├── app.js
│   └── package.json     
├── client        
│   ├── src
│   ├── public
│   └── package.json     
```

### MYSQL

So, first things first. We need a SQL database.

For this you have two options: 

- Docker 
- Localhost

If you want to use a docker container you can check out a implementation of that [here](https://dev.mysql.com/doc/mysql-installation-excerpt/5.5/en/docker-mysql-getting-started.html), for this article however, ill be rocking a localhost set up. 

So fire up your mysql, create a database called `test` and a table called `customers`:


```
$ mysql -u root -p

MariaDB [mysql]> CREATE DATABASE test;
MariaDB [mysql]> use test;
MariaDB [mysql]> CREATE TABLE customers ( id smallint auto_increment, Name varchar(20) not null, Email varchar(20) not null, constraint pk_example primary key (id) );
MariaDB [mysql]> INSERT INTO customers ( id, name ) VALUES ( null, 'Your Name', 'Your Email' );
```

Bam, just like that you've got a SQL database with a basic table to hold some `customer` data. Give yourself a pat on the back and get geared up to create our server using node!

### Node

We're now going to create our BE using node. This will take the following steps to achieve:

- Create SQL DB connection 
- Create app.js file -> server 
- Create customer routes file(handles API calls)

To start, we need to connect our application to this database. We do this via a `lib/db.js` file which creates a connection like so:

#### Our Database Connection

```
var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'test'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 
```

#### Our Server 

We are going to create the most simple express based node server possible:

```
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/api/customers')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

And thats it! All we do here is create the base node server and lean on express to handle our engine. Not the worst eh?

#### Our Customer Routes Setup

Finally, we need to set up our API handlers so that our BE knows what to do with our data from the MYSQL database.

Below is the file stripped down to only show the Read aspect of our CRUD application. When the FE makes a API call to `/api/customers`, our node BE knows to open the connection to the DB and make a query. Our query is very simple, we just select all customers from the customers table and return the list as JSON.

```
var connection  = require('../../lib/db');
 
module.exports = (app) => {
  app.get(`/api/customers`, async (req, res) => {
    connection.query('SELECT * FROM customers ORDER BY id desc',function(err,rows)     {
        if(err){
         console.error(err);
        }else{
          return res.status(200).send(rows);
        }                    
    });
  });
}
```

Nice and simple right? Let's see some examples of how CRUD works:


```
// Create

app.post(`/api/customers`, async (req, res) => {
    var user = { id: req.body }
    connection.query('INSERT INTO customers SET ?', user, function(err, result) {
        if (err) {
            console.error(err);
        } else {                
            console.log(res)
        }
    })
  })
```

```
// Edit

app.put(`/api/customers/:id`, async (req, res) => {
    connection.query('SELECT * FROM customers WHERE id = ' + req.params.id, function(err, rows, fields) {
        if (err) {
            console.error(err);
        } else {                
            console.log(res)
        }
    })
  });
```

```
// Delete

app.delete(`/api/customers/:id`, async (req, res) => {
    var user = { id: req.params.id }
     
    connection.query('DELETE FROM customers WHERE id = ' + req.params.id, user, function(err, result) {
        if (err) {
        console.error(err);
        } else {                
            console.log(res)
        }
    })
  })
```

### React


We have 2/3 of our needs met:

- We have a running MYSQL database with data 
- We have a running BE via Node with a API to connect and return data

Now, we need to add a FE or client component to actually render the data and for the sake of this tutorial we're going with react! To do that, we will make use of the [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app), a very simple service using [axois](https://github.com/axios/axios) and a simple view in the `App.js` file.


#### Service => API Handling 

So lets make a very basic API service: `client/services/customerService.js`

```
import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/customers`);
    return res.data || [];
  },
  addUser: async (data) => {
    let res = axios.post('/api/customers', data);
    return res.data || [];
  }
}
```

Here we define two methods: 

- GET
- POST

These routes talk directly to the node BE routes we defined before:

```
app.get(`/api/customers`, async (req, res) => {}
```

#### Rendering Data 

Last but not least, we want to render some of the data we gotten from our API. For this example, we've kept it simple and added the base method inside the `App.js` which comes packaged with the create react app:

```
import React, { useState, useEffect } from "react";
import customerService from './services/customerService';

function App() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    if(!customers) {
      getCustomers();
    }
  })

  const getCustomers = async () => {
    let res = await customerService.getAll();
    console.log(res);
    setCustomers(res);
  }

  const renderCustomer = customer => {
    return (
      <li key={customer.ID} className="list__item customer">
        <h3 className="customer__name">{customer.Name}</h3>
        <p className="customer__description">{customer.Email}</p>
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(customers && customers.length > 0) ? (
          customers.map(customer => renderCustomer(customer))
        ) : (
          <p>No customers found</p>
        )}
      </ul>
    </div>
  );
}

export default App;
```

Given we are using React 18, we can make use of the Hooks to set the state of our component to display our customers that we get from the SQL DB. 

## Conclusion

TLDR;

- We created a SQL server and added some data 
- We set up a basic Node server and a handful of CRUD endpoints to manage the data in the database 
- We created a very simple client using react to render the data!

Check out the full repo [here](https://github.com/Oregand/clevertech) if you want to see the code! 
