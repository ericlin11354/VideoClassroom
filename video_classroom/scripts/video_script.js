/* AJAX fetch() calls 
AJAX: Techniques that allow us to asynchronously make HTTP requests without having to reload the page.
*/
const log = console.log

log('Loaded front-end javascript.')

// A function to send a POST request with a new video.
export function addVideoToDB() {
    // the URL for the request
    const url = '/api/catalogue';

    // The data we are going to send in our request
    let data = { // TEMPORARY MOCK DATA
        title: "Formal definition of a limit",
        description: "By the end of this lesson, you will absolutely love epsilons and deltas",
        num_comments: 69,
        num_likes: 42,
        date: new Date('2021-04-20'),
        video_len: '42:00',
        status: {
            professor_answered: true,
            student_answered: true,
            unresolved_answers: true,
        },
        thumbnail: 'https://external-preview.redd.it/W-uPL4Yr42_zNV_FFtpOZ0pRwxjZup6_aM90LdCis6k.jpg?auto=webp&s=26f5d20887104f3b8202ed5e1747d7da51135f05',
        src: 'cat.mp4',
        visibility: 'Everyone',
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
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
        log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        log(error)
    })
}