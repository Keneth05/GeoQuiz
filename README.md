# Welcome to GeoTrivia Game

This is a Trivia game where you can see a completely list of world wide countrys with aditional information like the name, the region and the capital.
The app count with a authentication page where you can Login.
You also can play two kind of games, the first one you´re gonna have a country flag and four different options with countries name where you have to guess which option is correct, and the second type of game, you need to guess the capital name of the country, you´ll have a flag too

## Environment Configuration

The app is available on Android sistems as an APK and if you have iOS you´ll need to install Expo Go app.
To start the APP is necessary to install NPM modules with npm install command, then use npm start on command line, after that you must scan the QR Code to start using the app, other option is uae the Andriod Studio Emulator .

## Development Decisions

Tanstack Query:
Tanstack Query was a great choice for handling API requests, providing automatic caching, background refetching, and easy management of loading and error states. This simplified the project’s logic and improved the user experience. In my case, I integrated the REST Countries API, which made fetching and updating country data efficient and seamless

Zustand:
Zustand was a great choice for managing user authentication, offering a simple and lightweight state management solution without the boilerplate of other libraries. It made handling login state, and access to user data much easier, keeping the code clean and easy to maintain

React-Native-Paper:
React Native Paper was a great choice for building the UI, since it provides ready to use, components that ensure a consistent look and feel across iOS and Android. It allowed me to save development time, maintain visual consistency, and focus more on the app’s logic rather than styling everything from scratch

