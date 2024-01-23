import {form, inputBox, shortenedLink, API_KEY} from '../app.js';

// Declare a function that gets the link the user submitted
export function shortenUrl(){
    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        // Store the value of the input box into a variable to be used in the API requests
        const linkSubmittedByUser = inputBox.value;
        // Get short link
        fetchShortUrl(linkSubmittedByUser);
    });
}

// Declare an async function that takes an url and gets a shorter one from the API
async function fetchShortUrl(longUrl){
    // Try fetching the data
    try{
        // Create variables to be used in the post request to the API
        // In this case, the API requires to stringify the data that will be sent in the body of the request
        const inputBody = JSON.stringify({
            "url": longUrl,
            "expiry": "30m"
        });
        // Pass the API_KEY to the headers and store the object into the variable `headers`
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-api-key': API_KEY
        };

        // Call function to fetch data and wait for response
        await fetch('https://api.manyapis.com/v1-create-short-url/',
        // define options per APIs documentation https://docs.manyapis.com/?javascript#v1createshorturl
        {
            method: 'POST',
            body: inputBody,
            headers: headers
        })
        // Call then to manage the response
        .then(function(res) {
            // Read and parse the response to json, then return the promise generated by json()
            return res.json();
        // When the Promise returned is resolved, get the short URL from the body
        // The body is actually the data that has been parsed with json() in the previous .then callback    
        }).then(function(body) {
            console.log(body);
            const shortenedUrl = body.shortUrl;
            shortenedLink.value = shortenedUrl;
            return shortenedUrl;
        });
    }
    catch(error){
        console.log('Error: ', error);
    }
      
      
}