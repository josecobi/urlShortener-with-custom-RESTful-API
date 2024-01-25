const express = require('express');
const router = express.Router();
// Import api keys from data
const apiKeys = require('../data/apiKeys');


// Import module that allows us to create strings with random characters per https://www.npmjs.com/package/nanoid
const {nanoid} = require("nanoid");
// Declare a function to generate rand
function generateApiKey(){ 
    let newApikey;   
    do{
        newApikey = nanoid();     
    }
    while(apiKeys.includes(newApikey));

    apiKeys.push(newApikey);
    return newApikey;
}

router
.route("/")
.get((req, res) => {
    const apiKey = generateApiKey();
    res.send(apiKey);
})



module.exports = router;


