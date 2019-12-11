---
title: A Node, Mongo && CRUD Tutorial
date: "2019-12-11T22:12:03.284Z"
path: /blog/node-mongo-crud
description: "A Node, Mongo && CRUD Tutorial"
---

## Intro

So, here we are again. Another day, another Node tutorial. But why I hear? Why are you doing so many Node tutorials? Because. It's what the market needs right now from FE developers. 

In the last few weeks, Ive been job hunting for a remote first role as a Frontend Developer. My search has shown me a few notes of interest but one in particular has caught my eye:

> Lots of compnaies want/need Node.JS full stack developers. 

Given the market demand, it makes sense for me to flesh out my life as a true full stack developer through Node as my gateway drug.

Today then children; we CRUD

### Create The App

First, get into your terminal, create a fresh dir and init a node app:

```
$ mkdir node-mongo-crud
$ cd node-mongo-crud
$ npm init
```

The above commands results in creating a package.json file. The package.json file is used to manage the locally installed npm packages. It also includes the meta data about the project such as name and version number.

Now, we need a few libaries or node deps to get rocking:

`npm install --save express body-parser mongoose nodemon`

The packages are:
- ExpressJS: It’s a flexible Node.JS web appplication that has many features for web and mobile applications
- mongoose: the mongoDB ODM for Node.JS.
- body-parser: package that can be used to handle JSON requests.
- nodemon - server hot reload tool

Next, create a server file:

`$ touch app.js`


And add the base code:

```

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const product = require('./routes/Product'); 

const dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
```

Now, I know some of the code looks scary but thats okay! We're laying out foundations for our app here so we need a few more files. This will act as our main Node entry point.


### Setup Mongo

Our database will be hosted remotely on mLab. mLab offers a nice free tier that we can use to test our application. Let’s set it up quickly…

- Head to [mLab’s website](mlab.com).
- Sign Up 
- Click Create New DB
- Select the Sandbox Plan Type and click on ‘Continue’.
- Type in the database name. I am using ‘productstutorial’ as the database name for this example.
- Once everything is ready, just click on ‘Submit Order’
- Next step would be creating a user to be able to access the database. Simply click on ‘Add database user’
- Last step would be entering the data from the database user you are creating. In this tutorial, for the username I will be using ‘someuser’ and for the password I will be using ‘abcd1234’.

Now we have a database in the cloud that is ready to be accessed.

Since we already set up our DB connection in our app file we dont need to do anything extra!

### MVC

Now we want to flesh out our apps structure:

We will be working with a design pattern called MVC. Its a neat way of separating parts of our app and grouping them based on their functionality and role. M stands for models, this will include all the code for our database models (which in this case will be Products). Then comes the V which stands for the views or the layout. We will not cover the views in this tutorial as we are designing an API. The remaining part now is the C, which stands for controllers which is the logic of how the app handles the incoming requests and outgoing responses. There will be one more thing, called Routes, Routes are our guide, they tell the client (browser/mobile app) to go to which Controller once a specific url/path is requested.


```
$ mkdir routes models controllers
$ mkdir routes/Product models/Product controllers/Product
$ touch routes/Product/index.js models/Product/index.js controllers/Product/index.js
```

#### Model 

First, we create a product model like so:

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);
```

### CRUD

#### Create

The first task in our CRUD task is to create a new product. Let’s start by defining our route first. Head to routes and start designing the expected path that the browser would hit and the controller that would be responsible for handling that request.

```
// Routes
router.post('/create', product_controller.product_create);

// controller
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
```

#### Read

The second task in our CRUD app is to read an existing product. Let’s do the route and our controller. What the function does is it simply reads an existing product from the product id being sent in the request.

```
// Routes
router.get('/:id', product_controller.product_details);

//controller
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};
```


#### Update

The third task in our CRUD app is to update an existing product. Let’s do the route and controller. What the function does is it simply finds an existing product using its id that was sent in the request.

```
// Routes
router.put('/:id/update', product_controller.product_update);

//controller 

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};
```

#### Delete

The last task in our CRUD app is to delete an existing product. Let’s do the route and controller. What the function does is it simply deletes an existing product.

```
// Routes
router.delete('/:id/delete', product_controller.product_delete);

// controller
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
```

## Conclusion

Boom! All done and dusted.

TLDR;

- We created a mongo database to hold our data
- We created a Node server 
- We set up the a handful of CRUD endpoints to manage the data in the app 

Check out the full repo [here](https://github.com/Oregand/node-mongo-crud) if you want to see the code! 


