const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

//environment variable
const port = process.env.PORT || 3000;

//set the view engine for template files
app.set('view engine', 'hbs');

//To show the static html page
const staticPath = path.join(__dirname,"../public");
app.use(express.static(staticPath));
//
const templatePath = path.join(__dirname,'../templates/views');
//show the actual views path
app.set('views',templatePath);
//to access the partials
const partials_path = path.join(__dirname,"../templates/partials");
hbs.registerPartials(partials_path);

//Routing in express
app.get("/", (req,res) => {
  res.render('index');
});

app.get("/about", (req,res) => {
  res.render('about');
});

app.get("/weather" ,(req,res) => {
  res.render('weather');
});

app.get("*",(req,res) => {
  res.render('404error', {
    errorMsg : "OOPS..! Page not found.."
  });
});

app.listen(port, () => {
  console.log(`Listening to the port : ${port}`);
});

module.exports = app;