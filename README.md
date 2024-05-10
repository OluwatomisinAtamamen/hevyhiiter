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

## API Design

The application follows a RESTful API design, implementing CRUD (Create, Read, Update, Delete) operations. The API endpoints are used to interact with the SQLite database, allowing data retrieval, creation, modification, and deletion.

### Endpoints

- `GET /data/profiles`: Retrieves all user profiles from the database.
- `POST /data/profiles`: Creates a new user profile.
- `GET /data/profiles/workouts/:id`: Retrieves all workouts for a specific user profile.
- `POST /data/profiles/workouts/:id`: Creates a new workout for a user profile or updates an existing workout.
- `DELETE /data/profiles/workouts/:userId/:workoutId`: Deletes a specific workout from a user profile.
- `GET /data/exercises/all`: Retrieves all exercises from the database.
- `GET /data/exercises/by-muscle/:muscleName`: Retrieves exercises for a specific muscle group.
- `GET /*`: Serves the client-side application for all other routes.

All API endpoints are prefixed with `/data`, following a consistent naming convention.

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

One of the core design principles behind this fitness app is to prioritize user safety and provide a seamless experience, especially for beginners. While the app allows for building custom HIIT workouts from scratch, users can only select exercises from a curated database maintained by fitness experts. The decision to restrict exercise creation by users themselves was made for two primary reasons:

### Mitigating Safety Risks

Allowing users to create arbitrary exercises from scratch could potentially lead to unsafe or ineffective workout routines, increasing the risk of injury. By curating a comprehensive database of exercises vetted by professionals, the app ensures that users are engaging in well-designed, low-risk activities.

### Enhancing Usability for Beginners

For users new to fitness or unfamiliar with exercise terminology and proper form, creating exercises from scratch could be a daunting and error-prone task. By providing a carefully curated selection of exercises with clear descriptions and instructions, the app ensures a user-friendly experience, especially for those just starting their fitness journey.

The exercise database is regularly updated and expanded to incorporate a wide variety of activities, catering to diverse fitness levels and preferences. This approach strikes a balance between offering flexibility in workout customization and maintaining a safe, accessible environment for all users.

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

AI played a significant role in the development of this project, specifically through the use of GitHub Copilot and ChatGPT. GitHub Copilot provided valuable assistance with auto-completions, writing SQL scripts, and generating comments, enhancing both efficiency and code quality. ChatGPT was particularly helpful in cleaning and refining SQL queries for database operations.

### AI Usage Examples

#### Identifying Bugs
>  Cannot read properties of null (reading 'classList')
One instance where AI was instrumental was in resolving a bug related to DOM loading. When encountering the error "Cannot read properties of null (reading 'classList')", GitHub Copilot assisted in diagnosing the issue by suggesting potential causes, leading to the realization that the DOM wasn't fully loaded. This enabled a quicker resolution of the bug.

#### Git Management
>  how to remove node_modules from github repo
After inadvertently committing the entire node_modules folder, AI, through GitHub Copilot, guided in using Git commands to rectify the situation. This experience not only resolved the immediate issue but also improved proficiency with Git commands for future repository management.

#### Troubleshooting DOM Manipulation
>  why is an element re appending to my page
In another scenario, ChatGPT aided in identifying why an element was reappending to the page repeatedly. Through the generated response, it became apparent that the section was not being cleared before appending a new element. This insight was crucial in optimizing the code to prevent unnecessary DOM manipulation.

Utilizing AI technologies like GitHub Copilot and ChatGPT significantly contributed to the development process, streamlining tasks, enhancing code quality, and fostering learning opportunities in various aspects of software development and troubleshooting.


Exercises Infomation - HIIT Workouts For Men | HIIT Workouts For Women | Free HIIT Workouts | HIIT Training Workouts. (2015, March 24). Hiitacademy.com. https://hiitacademy.com/hiit-workouts/

‌

