const express = require("express");
const links = require('../data/links');
const {nanoid} = require("nanoid");
const error = require("../utilities/error");
const router = express.Router();

router
    .route("/:id")
        .delete((req, res, next) => {
            const apiKey = req.headers["x-api-key"];
            const id = Number(req.params.id);
            const linksDataPerApiKey = links.find((element) => element.apiKey === apiKey);
            const arrayOfLinks = linksDataPerApiKey.linksData;
            //find the index of the link which id matches the id of the current element
            const index = arrayOfLinks.findIndex((element) => element.id === id);
            //remove element from the array of links
            if (index !== -1) {
                arrayOfLinks.splice(index, 1);
                res.status(204).json({ message: `Deleted resource with ID ${id}` });
            }
            else{
                next(error(404, "Link not found"));
            }

        })
        .put((req, res, next) => {
            const apiKey = req.headers["x-api-key"];
            const id = Number(req.params.id);
            //find the element (apiKeyLinks) in the links array
            const linksDataPerApiKey = links.find((element) => element.apiKey === apiKey);            

            const arrayOfLinks = linksDataPerApiKey.linksData;
            //find the link within the apiKeyLinks
            const linkToUpdate = arrayOfLinks.find((el) => el.id === id);
     
            //update shortUrl if the link is found
            if (linkToUpdate) {
                linkToUpdate.shortUrl = nanoid(5);
                res.json({ message: `Updated resource with ID ${id}`, link: linkToUpdate });
            } else {
                next(error(404, "Link not found"));
            }
        });
        

module.exports = router;