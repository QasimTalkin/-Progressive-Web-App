# PWA basic concepts

Simple guide to creating quick Progressive web apps.

## Normal website to Native mobile features

* install on homepage
* access app offline
* push notifications

## PWA vs Native

### Native

* Made with device specific SDK
* publish on store then installed
* runs on device and has access to device features
* used offline and has notifications 

### PWA

* uses Web tech
* accessed via web
* can be installed
* used offline and push notification

## Project 1 PWA Food App

* Basic project template set up 

### Step 1 L Web App manifest

* Json file with info for browser on how to display the app on phone
* Root of the project
* `manifest.json`
* Json file
  * short_name ->  used for icon name on device.
  * display:standalone -> not like browser
  * background_color -> when first loading app
  * orientation -> portrait-primary
  * inco-> add array of icon 
* Link json in all html files `<link rel="manifest" href="/manifest.json">`

### Android Emulator 
