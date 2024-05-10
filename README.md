# HIIT up2136848
# HevyHIITer - A Customizable HIIT Workout Web App

HevyHIITer is a web application that allows users to create, edit, and delete customized High-Intensity Interval Training (HIIT) workouts. The app features a frontend built with HTML, CSS, and Vanilla JavaScript, while the backend is powered by Express.js and SQLite.

## Overview

The primary goal of this project was to create a user-friendly web application that enables users to design and execute their own HIIT workouts. The app provides an extensive database of exercises, each with detailed instructions and associated muscle groups. Users can create multiple profiles, and upon joining, they are granted access to sample workouts to get started.

## Core Features

### Create Workout

Users can create custom HIIT workouts by selecting exercises from the app's database. They can search for exercises by muscle group or name, and each exercise includes information about duration and associated rest periods. The app calculates the total workout duration based on the selected exercises.

### Edit Workout

Existing workouts can be edited by modifying the workout name, description, exercises, and durations. Users can add, remove, or rearrange exercises within a workout.

### Delete Workout

Users have the option to delete any unwanted workouts from their profiles.

### Workout Session

Once a workout is created or selected, users can initiate a workout session. The app guides them through each exercise, providing timers for the exercise and rest periods. Users can pause and resume the workout session as needed.

### User Profiles

The app supports multiple user profiles, allowing different users to create and manage their own workouts. User profiles and workouts are persistent thanks to the SQLite database.

### Exercise Database

The app includes a comprehensive database of exercises, each with a name, description, and associated muscle group(s). Exercises are also categorized by difficulty level based on their duration.

## Installation

1. Clone the repository: `git clone https://github.com/OluwatomisinAtamamen/hevyhiiter.git`
2. Navigate to the project directory: `cd hevyhiiter`
3. Install dependencies: `npm install`

## Usage

1. Start by installing necessary dependencies with `npm i`
2. Start the server: `npm start`
3. Open your web browser and navigate to `http://localhost:8080`
4. Create a new user profile or log in with an existing one.
5. Explore the app's features, such as creating, editing, and deleting workouts, as well as initiating workout sessions.
   

## Technologies Used

- HTML
- CSS
- Vanilla JavaScript
- Express.js
- Node.js
- SQLite

## Design Decisions

### Code-Based Routing

The app utilizes code-based routing to implement a single-page application (SPA) architecture. This approach hides and shows different sections of the app based on the current route, providing a seamless user experience.

### Global State Management

A global object variable is used to maintain the state of the application, including user profiles, workouts, and selected exercises. While this approach was suitable for this project, it may introduce potential side effects and challenges as the codebase grows.

### Functional Programming

The codebase favors a functional programming approach, utilizing functions extensively for building and manipulating DOM elements, rather than relying on classes or templates.

### Database Schema

The SQLite database schema is designed with future maintainability in mind, allowing for easy addition of new exercises and corrections to existing exercise descriptions. The schema includes tables for user profiles, workouts, exercises, muscle groups, and the relationships between them.

### Coding Conventions

The codebase follows camelCase naming conventions for variables, functions, classes, and IDs. Additionally, it adheres to best practices for readability and maintainability.

## Challenges and Solutions

One of the main challenges faced during development was modularizing the codebase properly. As the project progressed, the decision to postpone modularization resulted in a centralized global object variable, which can potentially lead to maintainability issues in the future.

Another challenge was implementing the timer functionality for workout sessions, particularly the pause and resume features. While the core timer functionality is in place, further improvements are planned to enhance the user experience.

## Future Enhancements

- Improve the pause and resume functionality for workout session timers.
- Restructure the database to enable logging individual user workout histories.
- Incorporate visual aids, such as GIFs or images, to enhance exercise demonstrations and improve usability.

## Credits and Acknowledgments

## AI
REMOVE ME: Detail your use of AI, listing of the prompts you used, and whether the results formed or inspired part of your final submission and where we can see this (and if not, why not?). You may wish to group prompts into headings/sections - use markdown in any way that it helps you communicate your use of AI. 

### Prompts to develop XYZ (exmaple)
A sequence of prompts helped me develop this feature:

>  this is an example prompt given to a chatbot
The response was proved useless because the prompt wasn't specific enough about XYZ, so:

>  this is an example prompt given to a chatbot detailing XYZ
The response was better so I could speifically ask about QRST

>  how can I integrate QRST here?
The suggestion worked with minor modification.

### Prompts to develop GHIJ (exmaple)
For the GHIJ feature I ...

>  this is an example prompt given to a chatbot
words words words etc.


REST - The duration of the rest period before moving on to the next exercise.


Users cannot create workouts without internet access
if a user logs out, they need internet access to log back in





please use my code which you already have to supplement my points. overview- we were asked to create an customisable HIIT workout app with vanilla js, html and css as the frontend, express.js and sqlite as the backend and database respectively. My design was an app where users, who get sample workouts once they join, can create, edit and delete their workouts. The workouts consisted of group of exercises plus rest times. The core features- create workout, edit workout, delete workout, the workouts come with exercises which have a databasee of instructions and muscle group in my database. A user can search my database of exercises in the create workout page, they can also search their list of workouts. users can create multiple profiles that persist because of the sqlite database. I decided to allow users have access to sample workouts upon log in so that they would be able to use the app, once they're logged in and offline for working out. The exercises come with time based difficulty too. 

Installation is just npm i which would install the sqlite, sqlite3 and express dependencies that I am using. You can check my package.json for that. For usage, claude, use my code to write up something. Technologies used; like I mentioned at the start, I used html and css for the structure of my app, and then vanilla javascript foor the functionality and manipulation of dom elements. I used express.js and nodejs to create a server and serve my client. I then sqlite for the database, I am directly quering the database and not using any ORMs. Design decisons; I decided to use code based routing as this was my first time building a single page app, it was easy for me to implement as I was hiding sections and changing the route which had always beemn my goal from tyhe start. I also decided to go for a global varible object in order to maintain the whole state of my app. that had side effects that I have now learnt from.

My coding convention was to use camelcase for naming my variables, functions, classses amd ids. I also favoured functional programming; this is eveident in my use of functions instead of classes or template to build sections of some of the pages. my database schema was designed with future maintainability in mind, more exercises can be added and descriptions corrected. i have two sample users in the databse but they do not have any workouts as they were extensively used for testing. Any new user automatically gets a sample workout though. 

I had challenges modularisng my code properly because I postponed all of it to the end and because I am using a centarlised global object variable. This project has been a really good learning experience for me in teaching me to think of how a favourable data structure might make it easier to manipulate DOM elements. I had challenges trying to implement the timer functionality (refer to my code claude) Future enhancements - I plan to work on the pause and resume functionality of the timers, restructure my database so I can add history logs of individual users, and visual gifs or images of the exercises to improve usabiilty.

I would include credits and acknowledgement myself

