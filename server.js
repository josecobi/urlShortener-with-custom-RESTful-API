const express = require("express");
const app = express();
const nanoid = require("nanoid");
const apiKeysRoute = require("./backend/routes/createApiKey");
const apiKeysData = require('./backend/data/apiKeys');


const port = 3000;


app.set("view engine", "ejs");
app.set("views", "./backend/views");
app.use(express.static("frontend"));


app.use("/apikey", apiKeysRoute);

app.get("/", (req, res) => {
    res.render('index');
})


app.get("/shortenlinks", (req, res) => {
    res.render('shortenlinks.ejs');
})


app.listen(port, () =>{
console.log(`App listening on port ${port}`);
})
