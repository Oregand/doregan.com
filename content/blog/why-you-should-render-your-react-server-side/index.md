---
title: Why You Should Render Your React Server Side With Examples In Now && NextJS
date: "2019-11-18T22:12:03.284Z"
path: /why-you-should-render-your-react-server-side
description: "Why You Should Render Your React Server Side With Examples In Now && NextJS"
---

## Intro

If you're a fan of React, you've probably heard of or used the [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).

And there's a good reason you've heard of it; it awesome. In a matter of hours you can have a fully up and running application, completely bootstrapped with an amazing toolchain.

That being said, the CRA is an example of a client side rendered application. Which while amazingly perfect for say Sass(software as a service), falls down very quickly for a performing web application(think e-commerce).

But why? Well lets break down the differences between a client side application and a server side application to demonstrate why.

### SSR VS CSR

The main difference is that for SSR your server’s response to the browser is the HTML of your page that is ready to be rendered, while for CSR the browser gets a pretty empty document with links to your javascript. That means your browser will start rendering the HTML from your server without having to wait for all the JavaScript to be downloaded and executed. In both cases, React will need to be downloaded and go through the same process of building a virtual dom and attaching events to make the page interactive — but for SSR, the user can start viewing the page while all of that is happening. 

For the CSR world, you need to wait for all of the above to happen and then have the virtual dom moved to the browser dom for the page to be viewable.

So given this, lets break down some of the main benefits you get from using a SSR approach to your react.

### Performance 

[Arunoda Susiripala](https://twitter.com/arunoda), an Engineer from [Zeit](https://zeit.co/), talks about performance being the main reason for moving to server-side rendering. 

_https://www.youtube.com/watch?v=ms2aOV06_qk&feature=youtu.be_

With SSR you;

- dont render a blank screen on app load 
- don't use loaders/spinners

Given these your end user gets a much better user experience. They don't perceive a slow load time of your pages, nor find themselves staring at loaders during page transitions.


### SEO

By now, you have probably heard that Google now crawls web apps built with JavaScript, you are better off having server-side rendered content ready for Google and other search engines to crawl your site.

Note that as of now, Google and Bing can index synchronous JavaScript applications — synchronous being the key word. If your app starts with a loading spinner, then fetches content via Ajax, the crawler will only wait a few seconds for loading to complete. This means if you have content fetched asynchronously on pages where SEO is important, SSR might be necessary.

(https://10up.github.io/Engineering-Best-Practices/react/)

The advantage with SSR is that you get the benefits of a traditional website’s SEO since the entire page can now be crawled by bots.

An awesome example of seeing SEO in action with a SSR React application is with [Next.js](https://nextjs.org/)

```javascript
import React from "react"
import NextHead from "next/head"
import { string } from "prop-types"

const defaultDescription = ""
const defaultOGURL = ""
const defaultOGImage = ""

const Index = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#436eee" />
    <link
      rel="icon"
      sizes="192x192"
      href="/static/img/favicons/android-icon-192x192.png"
    />
    <link rel="apple-touch-icon" href="/static/img/favicons/apple-icon.png" />
    <link
      rel="mask-icon"
      href="/static/img/favicons/favicon-32x32.png"
      color="#49B882"
    />
    <link rel="icon" href="/static/img/favicons/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ""} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
)

Index.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Index
```

```javascript
const Head = dynamic(() => import('../../../components/templates/Head'))

<Head title="Awesome SEO Title" description="Awesome SEO Description" url="https://awesomeurl.com" ogImage="" />
```

### Caching 

One of the biggest advantages of a SSR is if the pages are not built via dynamic content(even if they are Zeit has some great examples on handling this with cache invalidation), you can build once and then cache them using a man in the middle approach i.e. cloudfront or Zeit.

An example of this in action:

```
// now.json

 {
     "src": "/(.*)",
     "dest": "/$1",
     "headers": {
       "cache-control": "s-maxage=86400, stale-while-revalidate=86400"
     }
}
```

Here we are using the now caching system to create static files that are build once and then served to multiple users. You can leverage this for a lot of amazing use cases, especially for imagery heavy websites. 

To get familiar with the cloudfront caching [read more here](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html)

### Cost

Most modern web applications are build with a frontend, backend and database. 

Your frontend makes API calls to the backend, which fetches data from the database and then returns it to the frontend to draw. In a client side application this process takes place every single time a user loads a page or refreshes, which means all your API calls are made every single time.

This can become terrifically expensive if you have a reasonable amount of user traffic.  

In a SSR application(especially if you leverage some caching), the burden on the backend is reduced significantly given you no longer need to make X API calls for every page render. Rather you make a single call once, cache the page and ignore the backend until something changes in the data. 

## Conclusion

Now saying all this, you dont always need SSR. Does you application sit behind a login or is it a Saas? if so, you might be perfectly fine with a client side rendered application and honestly, every good React developer should understand how both work.

If you're looking to cut your teeth with some amazing SSR based React, I highly recommend [NextJS](https://nextjs.org/) and [Zeit Now](https://github.com/zeit). Get stuck in and build something amazing!  




