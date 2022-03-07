# team18

Team 18 Phase 1 Readme

To run the application, do ‘npm install’ then ‘npm run dev’. You can access the webapp at ‘http://localhost:3000/’. The homepage redirects you to the catalogue, where videos will appear as soon as you are signed in. The sign in credentials are ‘user’, ‘user’ and ‘admin’, ‘admin’, for a demo user and demo admin respectively. To sign in, use the navbar.



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
Deleting a video when filtering can cause videos to randomly appear.
