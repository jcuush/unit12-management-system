var express = require("express");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

require("./routes/index")(app)


app.listen(PORT, function() {
    console.log("Listening on http://localhost:"+PORT);
})