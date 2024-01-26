const express = require('express');
const links = require('../data/links');
const {nanoid} = require("nanoid");
const error = require("../utilities/error");
const router = express.Router();

router
.route("/")
.get((req, res, next) => {
    
    console.log("getting links");
    const apiKey = req.headers['x-api-key'];
   
    const linksDataPerApiKey = links.find((element) => element.apiKey === apiKey);
    if(!linksDataPerApiKey){
        console.log("no data");
        next(error(404, "Could not find links"));
    }
    else{
        console.log("linksDataPerApiKey: ", linksDataPerApiKey.linksData);
        res.json({linksDataArray : linksDataPerApiKey.linksData});
    }
})

module.exports = router;