/* AJAX fetch() calls 
AJAX: Techniques that allow us to asynchronously make HTTP requests without having to reload the page.
*/
const log = console.log

log('Loaded front-end javascript.')

// A function to send a POST request with a new video.
export function addVideoToDB(video) {
    // the URL for the request
    const url = `/api/catalogue/`;
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(video),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {

        // // Handle response we get from the API.
        // // Usually check the error codes to see what happened.
        // const message = document.querySelector('#message')
        // if (res.status === 200) {
        //     // If student was added successfully, tell the user.
        //     console.log('Added student')
        //     message.innerText = 'Success: Added a student.'
        //     message.setAttribute("style", "color: green")
           
        // } else {
        //     // If server couldn't add the student, tell the user.
        //     // Here we are adding a generic message, but you could be more specific in your app.
        //     message.innerText = 'Could not add student'
        //     message.setAttribute("style", "color: red")
     
        // }
        if (res.status === 200) {
            log('Added a video')
        } else {
            log('Could not add video')
        }
        log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        log(error)
    })
}

export function getVideosFromDB(videoList) {
    const url = `/api/catalogue/`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json();
        } else {
            console.log("Could not get videos");
        }
    })
    .then(json => {
        // // the resolved promise with the JSON body
        // studentList.setState({ studentList: json.students });
        console.log('json', json);
        const setVideos = videoList[1];
        setVideos(json.videos);
    })
    .catch(error => {
        console.log(error);
    });
}

export function removeVideoFromDB(id) {
    const url = `/api/catalogue/${id}`;
    const request = new Request(url, {
        method: 'delete', 
        headers: {
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
    .then(function(res) {

        if (res.status === 200) {
            log('Successfully deleted video')
        } else {
            log('Could not delete video')
        }
        log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        log(error)
    })
}