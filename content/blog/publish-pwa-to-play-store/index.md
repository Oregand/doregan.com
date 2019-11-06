---
title: Publish A Progressive Web App To The google Play Store
date: "2019-11-06T22:12:03.284Z"
path: /publish-pwa-to-play-store
description: "Publish A Progressive Web App To The google Play Store"
---

## Intro

A progressive what now? And why should I care?

*What is a PWA*

Progressive web apps are websites that look and feel like an app. This means users can access all information and capabilities without downloading a mobile app. Instead, progressive web apps use modern web technology to deliver app-like experiences to users, right in their browsers

*Why should you care?*

``` 
Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
Engaging - Feel like a natural app on the device, with an immersive user experience.
```

This new level of quality allows Progressive Web Apps to earn a place on the user's home screen. 

But, dont take my word for how amazing PWAs are, check out what [google has to say](https://developers.google.com/web/progressive-web-apps)


So how do you turn your web application into a PWA? Well ill drop a link to a tutorial here but this article will focus on projects that already have a PWA setup but want to publish that into the google play store.

[How to PWA](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp)

Alright! Lets publish a PWA into the Google Play Store.

## The Steps

- Set up Android Studio
- Create a google developer account and pay the $25
- Clone the boilerplate repo for the publish
- Edit boilerplate project with your app data
- Create signed APK 
- Generate SHA256 statement 
- Add .well-known/assetlinks.json to your web application root
- Build signed APK....again
- Create new app in Google 
- Upload APK
- Fill out info/wait for review 


_Bonus Steps_

- Create app assets(Splash/Logo)
- Optimize Build 

### Set up Android Studio

Go [here](https://developer.android.com/studio/) and grab yourself a copy of Android studio. Install it with the default setup and get a cup of coffee. 

### Create a google developer account and pay the $25

Head over to [Google Play Console](https://play.google.com/apps/publish/signup/#EnterDetailsPlace), sign your ass up and pay the man $25 for the ability to publish apps.

### Clone the boilerplate repo for the publish

Clone down this repo: ` https://github.com/GoogleChromeLabs/svgomg-twa`.

This repo is the money maker here, it comes with everything we need prebuilt to let us ship a production ready application!

### Edit boilerplate project with your app data

1. Open your brand new shiny downloaded repo in Android Studio and locate this file: `app/src/build.gradle`

2. Edit the following bits based on your project:

```
def twaManifest = [
    applicationId: 'com.yourappid',
    hostName: 'yourhost.com', // The domain being opened in the TWA.
    launchUrl: '/', // The start path for the TWA. Must be relative to the domain.
    name: 'APPNAME', // The name shown on the Android Launcher.
    themeColor: '#1960a0', // The color used for the status bar.
    backgroundColor: '#ffffff', // The color used for the splash screen background.
    enableNotifications: false // Set to true to enable notification delegation
]
```

### Create signed APK

In Android Studio: 

1. Build 
2. Generate Signed APK

_The first time you generate a signed APK will have to create a new key store to go with the build(you only need to do this once!)._

3. When prompted to create the keystore, do so using meaningful values that *you will remember*.
4. Once you've created your keystore, you'll need to generate a loadable one for the APK by running this command in your terminal:

`keytool -list -v -keystore PATH_TO_YOUR_KEYSTORE -alias KEYSTORE_ALIAS -storepass YOUR_PASSWORD -keypass YOUR_PASSWORD`

If you did this correctly, you'll get a generated SHA256, which you will need to copy for the next step.

### Generate SHA256 statement

1. Head to [Google Digital Asset Links](https://developers.google.com/digital-asset-links/tools/generator)
2. Use their Statement List Generator and Tester tool.
3. Fill in the information. Paste in the SHA256, and hit Generate Statement.
4. Copy down the JSON output. 

### Add .well-known/assetlinks.json to your web application root

1. Create a file in your project root called `assetlinks.json`, and paste in the JSON you got from the previous step.

```
$ cd project
$ mkdir .well-known
$ cd .well-known
$ touch assetlinks.json
```

2. Deploy this file and make sure its available from your website:

`https://yourdomain.com/.well-known/assetlinks.json`

### Build signed APK....again

Build a signed APK from Android studio. Your new APK will be under: `app/release/app-release.apk`

### Create new app in Google

[Head over to Google and create a new app](https://play.google.com/apps/publish/)

### Upload APK

Inside your App Release, upload your new shiny APK.

### Fill out info/wait for review

Pretty straight forward! Head into all the empty sections of your app and fill out the needed information/questionares.

Once you've done this, it should take between 24 - 48 hours for your app to be published if you have successfully met all the guidelines.

### Create app assets(Splash/Logo) 

Use this amazing tool to generate your app Icon && Splash Screens:

https://apetools.webprofusion.com/#/tools/imagegorilla

When generated, replace the existing ones in: `app/src/main/res/*`

### Optimize Build

When you build your app, it wont be optimized, and so you'll get a error from google about it. To fix that, make a new build but select App Bundle instead of an APK. That will create an optimized package.

## Conclusion

Bam! You now have a brand spanking new app live on the Google Play store for users to download! Pretty neat :)
