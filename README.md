# team18



Deployed at: ~~[https://csc309-team18.herokuapp.com/](https://csc309-team18.herokuapp.com/)~~ Deprecated


# Instructions to run locally:



1. In the root directory, run in Terminal 

```
$ mkdir mongo-data
$ mongod --dbpath mongo-data
```

This will set up the local database.

2. In the root directory, run in Terminal

```
$ npm run build
$ npm start
```



This will start the production web app. You can then interact with the app at [http://localhost:5000/](http://localhost:5000/)

3. Since the website uses Cloudinary, the cloud_name, api_key, and api_secret must be provided in server.js and its routes.


# General Instructions:



* Visiting the website’s homepage (‘/’), you are redirected to the catalogue page.
* Here you see the Navbar and Filters. A person cannot view videos until they’ve logged in.
* Clicking the top-right “Login/Signup” button raises the login panel. A person can choose to Login or Sign-up here. Username and password credentials are mandatory for login.
* Clicking “Sign up here”, the person can create an account by creating a username + password and selecting account type.
* Pressing the “Log in here” button allows the person to input their credentials and view videos.
* Pressing the website logo redirects the person to the catalogue page. Here they can see videos they have access to. Furthermore, they can filter and order videos via the search bar and dropdowns.
* Pressing the top-right “View Profile” button redirects a person to their profile page. There, a person can view their comment history and their profile information. 
* Pressing the “Edit Profile” button, a person can change their Name, Title, About Me, Birthdate, and profile picture. Pressing “Submit Changes” updates their profile accordingly.
* On the catalogue page, pressing a video thumbnail brings up the video page. Here, a person can access the video player to play/pause the corresponding video, adjust the volume, fullscreen, etc. 
* Pressing the “Comment” Button, a person can write up a comment. Pressing “Submit” will post the comment, allowing other people to see it.
* An Admin will have more features in the Navbar than a User. We further discuss this below.


# User Functionality



* Given a lot of videos, a user may search for the video they want. Additionally, they may use filters + search to find their desired video. Otherwise they can scroll through the videos.
* A user might look at video duration, number of likes, and number of comments in order to determine if a video is worth watching.
* A user might change their profile to correct false information or express themselves.
* A user might adjust the volume of a video if it’s too loud. They might maximize the video for preference. They may pause a video to write notes or organize their thoughts.
* A person might make sign-up for an account if they don’t have one. 
* A user might post a comment if they have ideas or opinions they wish to share.
* A user might like a post if they agree with said person’s opinion.
* A user may use the navbar to redirect themselves to different pages. 


# Admin Functionality



* An admin might do everything a user does
* An admin might use the “Upload a Video” button to upload a video. There they provide the video’s title, description, privacy setting, and video file. New videos have 0 comments and 0 likes.
* An admin might use the  “Manage Users” button to manage which users have access to their course. 
* On the users page **(can list users and admins)**, an admin might press the “View Profile” button of a specific user to learn more about them. An admin might press the “Delete User” button to revoke said user from accessing their video.
* In order to add a user to the users page, they must be signed up as a new account. Pressing the “Add User” button allows the admin to create a new account with access to their videos.


# New Features



* User page has been added to manage, delete, and add users.
* Video functionality works now. Thumbnails are generated based on video files.
* Catalogue and profile page now interact with the server database and no longer require mock data.
* Navbar only shows Login button when a person is not logged in.


# Edited Features

Due to a member dropping the course, we have cut a lot of functionality previously promised in Phase 1.



* Videos no longer track whether a user, TA, or professor replied to a comment.
* Videos no longer track the total number of likes.
* Course structure has been removed. People can no longer enroll in a specific course. All videos on the web app are treated to be in one course.
* Videos are scrollable so as to not go off the page.
* Videos upload only requires user input for the title, description, privacy, and video file.


# Libraries Used:



* React – Used in rendering Front-end view and allowing interaction between clients and the page.
* Styled – Used in Front-end to aid component styling and remove the need for CSS selectors.
* Styled-Icons – Used in Front-end to provide visual icons for buttons.
* Next – Framework used with React to aid server rendering and route-fetching.
* Express – Used in Backend to create REST API methods.
* Cloudinary – Used in Backend for video and image uploading.
* Connect-Multiparty – Used in Backend with Cloudinary for FormData parsing.
* Moment – Used in Frontend to provide time data for components.


# Routes:

All the backend’s routes are in /api.



* /users
    * /
        * POST: for signing up a new user
        * DELETE: for deleting a user
        * GET: for getting all users’ info
    * /login
        * POST: for logging in as a user. Your username will be saved in the session storage.
    * /edit
        * POST: for editing a user’s info
    * /:username
        * GET: for getting the info of one user
* /comments
    * /:id
        * POST: post a comment as a user
        * GET: get a comment with the specified id
        * DELETE: delete a comment
    * /videoComments/:id
        * Get comments of a video
    * /userComments/:username
        * Get comments of a user
    * /like/:id
        * Like a comment
    * /mark/:id
        * Mark a comment as correct
* /catalogue	
    * POST: adds videos to database. Middleware reads FormData
    * GET: gets all videos from database
    * GET(id): gets a specific video from database given image_id
    * DELETE: deletes a specific video given image_id
    * PUT: replaces a video on the database given title, description, visibility. Implemented similarly to PATCH (we don’t use PATCH due to Express failing to process PATCH requests)



The Navbar:
The navbar is on every page, situated across on the top. Here, in order from left to right,
- The logo
- A selector for the course
- Upon expanding the selector and clicking on an option, the video page will display the relevant videos.
- The record button, whose functionality is not yet implemented.
- A field for the class you want to join and the button to confirm the join. The new class will appear in the selector once joined.
- On the right side, an upload button for videos, which triggers a popup.
- A view profile button that redirects you to the profile page.
- A sign in / sign up button that triggers a popup. You can swap between sign in and sign up by clicking on the blue text in the popup.



Video Page:
The video page has 3 main segments, the video pane, the chat pane, and the description.

Video Pane:
Mouse over the bottom of this pane to bring up the video bar. You can pause/resume the video with the play button, and hovering over the sound button will bring up a volume slider. Dragging the volume slider will change the volume of the video. On the top of the video bar is the video progress slider, which can also be dragged to change the position of the video. The video page may take some time to load due to the video.

Chat Pane:
Comments appear here based on the current position of the video. After the position of a comment’s timestamp has been passed by the video, they appear. Your comments are also assigned a time stamp by the current time in the video. The chat button fixed on the bottom-left corner of this pane allows the user to create a new question regarding the current time of the video. For existing comments, logged in users can give likes or add replies. Replies are automatically hidden to reduce clutter, and can be expanded by pressing the eye icon, which becomes visible if replies exist. The administrators of the site can also see a delete button and mark button. The delete button will erase that comment and all of its children, and the mark button marks a reply to be the answer of the root question, giving it a star. Only one reply per question can be marked.

Description Pane:
This area will display the title of the video, the poster’s username, the date the video was posted, and a short description.



Catalogue Page:
The catalogue page has two segments: a list of filters and list of videos.

Filter Options:
Inputting text into the search bar filters the videos by name. For example, given the mock data, inputting “fo” in the search bar leaves videos “Formal definition of a limit” and “Fourier series”. 
In the select menu titled “Sort Videos”, selecting an option sorts the order that videos are displayed. For example, selecting “Upload date” sorts videos in descending order from latest to earliest date. Selecting “Sort Videos” resets the display to show all videos, regardless of other filters.
In the select menu titled “All Videos”, selecting an option filters the visibility of videos. For example, selecting “TAProfs” displays only videos visible to TAs and instructors. Users are only allowed to view public videos, where as Admins can view private videos.

Video List:
Each row displays the information pertaining to a video. All users can see information about the video thumbnail, title, video length, description, status (e.g. if a professor answered a comment), visibility, views, comments, and date posted. Only Admins can choose to edit the video or delete a video. 
Profile Page:



The profile page has two segments: profile information and comment history.

Profile Information:
Users can view their account information. Information includes name, title, ‘About Me’ section, birthdate, reviews and past courses. Upon clicking the ‘Edit Profile’ button, users can choose to edit their information except for their reviews. The comment history will take information from the server about each user’s past comments and displays their action, comment data, and their comment.



Bugs and Notes:
Deleting a video when filtering can cause videos to randomly appear. This may due to an unreliable storage of mock data.
Selecting a class has not been implemented as its issues tie heavily with the issue above.
Adding a class may be unsuccessful in loading the correct information due a lack of server data forcing us to receive data through multiple nested components (e.g. catalogue page -> navbar -> upload video panel).

