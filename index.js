const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port =8000;
const db = require('./config/mongoose');
const expressLayouts =require('express-ejs-layouts');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets')); 
app.use(expressLayouts);

//use express router
app.use('/', require('./routes'));  // we have told index.js to use these routes

//setup the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err){
   if (err) {
    console.log(`Error in running the server: ${err}`);
   }
   console.log(`Server is running on the Port: ${port}`);
});