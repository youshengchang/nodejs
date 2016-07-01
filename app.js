var express = require("express");
var http = require("http");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
var skierterms = [
    {
        term: "Rip",
        defined: "To move at a high rate of speed"
    },
    {
        term: "Hunk",
        defined: "To throw your body off of something, usually a natural featrue like a cliff"
    },
    {
        term: "Study",
        defined: "Learning something which you don't know before."
    }
    ];
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var server = http.createServer(app);
app.use(function(req, res, next){
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.use(express.static("./public"));
app.use(cors());

app.get("/dictionary-api", function(req, res){
   res.json(skierterms); 
});

app.post("/dictionary-api", function(req, res){
   skierterms.push(req.body);
   res.json(skierterms);
});

app.delete("/dictionary-api/:term", function(req, res){
    skierterms = skierterms.filter(function(definition){
       return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    res.json(skierterms);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Express server listening at", addr.address + ":" + addr.port);
});

module.exports = app;
