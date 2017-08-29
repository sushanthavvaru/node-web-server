const express = require("express");
const hbs = require("hbs");
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log("Unable to append to server.log")
        }
    } );
    next();
});
// app.use((req, res, next) =>{
//    res.render('maintainance.hbs');
// });

app.use(express.static( __dirname + '/public')); //app.use toregister middleware

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get("/", (request, response) => {
    // response.send("<h1>Hello Express!</h1>");
    response.render('home.hbs', {
        pageTitle : "Home Page",
        welcomeMessage: "Welcome to ExpressJS!"
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle : "About Page",
    });
});

app.get("/bad", (req, res)=>{
    res.send({
        errorMessage: "Unable to full fill request"
    });
});
app.listen(3000, () => {
    console.log("Sever is up in port 3000");
});