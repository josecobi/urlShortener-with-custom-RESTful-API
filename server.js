const express = require("express");
const app = express();
const nanoid = require("nanoid");
const apiKeysRoute = require("./backend/routes/createApiKey");
const apiKeysData = require('./backend/data/apiKeys');
const shortenUrl = require("./backend/routes/shortenUrl");
const bodyParser = require("body-parser");
const getLinks = require("./backend/routes/getLinks");
const links = require('./backend/data/links');
const error = require("./backend/utilities/error");
const findLinkByPropertyValue = require("./backend/utilities/findLinkByPropertyValue")




const port = 3000;
// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//set EJS engine
app.set("view engine", "ejs");
app.set("views", "./backend/views");

//serve static files
app.use(express.static("frontend"));
//middleware to check for API keys!
app.use("/api", function (req, res, next) {
    var key = req.headers["x-api-key"];
    console.log("key: ", key);
    console.log("apikeys data:", apiKeysData);
    // Check for the absence of a key.
    if (!key) next(error(400, "API Key Required"));
    
    // Check for key validity.
    if (apiKeysData.indexOf(key) === -1) next(error(401, "Invalid API Key"));
  
    // Valid key! Store it in req.key for route access.
    req.key = key;
    next();
});

// Use routes
app.use("/apikey", apiKeysRoute);
app.use("/api/shortenUrl", shortenUrl);
app.use("/api/getLinks", getLinks);

// Render home
app.get("/", (req, res) => {
    res.render('index');
})


// Render view for the shortenning links page
app.get("/shortenlinks", (req, res) => {
    res.render('shortenlinks.ejs');
})

app.get('/:shortUrl', (req, res) => {
    const shortUrlParam = req.params.shortUrl;
    //find link that matches the param provided in the request
    let foundLink = findLinkByPropertyValue(links, "shortUrl", shortUrlParam);
   

    if (foundLink) {
        //redirect to the longUrl
        res.redirect(foundLink.longUrl);
    } else {
        //handle error
        res.status(404).send('Short URL not found');
    }
});
// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

//Error-handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});


//Start server
app.listen(port, () =>{
    console.log(`App listening on port ${port}`);
})
