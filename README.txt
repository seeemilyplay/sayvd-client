This is a "proof of concept" prototype for the Sayvd client that is intended to evolve into the eventual client codebase.

This is a mobile client that uses PhoneGap. At the moment you can run in a browser or as an Android app, once these are good enough an iPhone app will follow.  (I need to buy a dev license, and borrow my boyfriends mac first!)

To run the Sayvd client on a browser:

1) Download and install node.js

2) Clone the repos from git, and cd into the sayvd-client directory

3) Install dependencies

$ npm install

4) Run server

$ node server.js

4) Open a browser and go to http://localhost:8888

To run the Sayvd client in an Android emulator in Eclipse:

1) Make sure you have Eclipse setup enough to run a HelloWorld Android app

2) Clone the repos from git, and cd into the sayvd-client directory

3) Run

$ mkdir sayvd/client/android/assets
$ cp -r sayvd/client/core/www sayvd/client/android/assets/www

4) Create an Eclipse android project based on sayvd/client/android

5) Run the emulator
