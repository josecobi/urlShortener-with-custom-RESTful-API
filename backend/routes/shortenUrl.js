const express = require("express");
const apiKeysData = require('../data/apiKeys');
const links = require('../data/links');
const {nanoid} = require("nanoid");
const error = require("../utilities/error");
const findLinkByPropertyValue = require("./backend/utilities/findLinkByPropertyValue");
const findLinkIndexById = require("./backend/utilities/findLinkIndexById");
const Link = require("./backend/utilities/Link");
const router = express.Router();

router
.route("/")
.post((req, res) => {
    
    const apiKey = req.headers['x-api-key'];
    const longUrl = req.body.url;
    if(!longUrl){
        next(error(400, "Insufficient Data"));
    }

    //find an element from the list of links per apikey that matches the apikey provided in the request
    const element = links.find((element) => element.apiKey === apiKey);
    // if it doesn't exist, create a new element
    if(!element){
        let link = new Link(1, longUrl)
        const apiKeyLinks = {
            apiKey: apiKey,
            linksData : [], 
        }
        // Add the link to the new element
        apiKeyLinks.linksData.push(link);

        links.push(apiKeyLinks);
        res.send({ shortUrl : link.shortUrl});
    }
    // If it exists, push the link to the element
    else{
        let link = new Link(element.linksData.length + 1, longUrl)
        element.apiKey = apiKey;
        element.linksData.push(link);
        res.json({ shortUrl: link.shortUrl });
    }
    
});

module.exports = router;