
const express = require("express");
const links = require('../data/links');
const {nanoid} = require("nanoid");
const error = require("../utilities/error");

const router = express.Router();


router
    .route("/")
    .post((req, res) => {
        const apiKey = req.headers['x-api-key'];
        const longUrl = req.body.url;

        if (!longUrl) {
            next(error(400, "Insufficient Data"));
        }

        // Find an element from the list of links per apiKey that matches the apiKey provided in the request
        const element = links.find((element) => element.apiKey === apiKey);

        
        // If it doesn't exist, create a new element
        if (!element) {
             // Pass apiKey
             const apiKeyLinks = {
                apiKey: apiKey,
                linksData: []
            }
            const link = {
                id : 1,
                longUrl : longUrl,
                shortUrl : nanoid(5),
                createdAt : new Date(),
            }
            
            // Add the link to the new element
            apiKeyLinks.linksData.push(link);

            links.push(apiKeyLinks);
            res.send({ shortUrl: link.shortUrl });
        }
        // If it exists, push the link to the element
        else {
            const link = {
                id : element.linksData.length + 1,
                longUrl : longUrl,
                shortUrl : nanoid(5),
                createdAt : new Date(),
            }
            element.linksData.push(link);
            res.json({ shortUrl: link.shortUrl });
        }
    });

module.exports = router;