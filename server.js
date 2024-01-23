const express = require("express");
const app = express();
const path = require("path");

const port = 3000;


app.set("view engine", "ejs");
app.set("views", "./backend/views");
app.use(express.static("frontend"));
// app.use(express.static("frontend/css"));
// app.use(express.static("frontend/helpers"));



app.get("/", (req, res) => {
    res.render('index');
})

app.get("/shortenlinks", (req, res) => {
    res.render('shortenlinks.ejs');
})


app.listen(port, () =>{
console.log(`App listening on port ${port}`);
})
