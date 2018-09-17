var request=require("request");
var express=require("express");
var app=express();
app.set("view engine","ejs");

app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res)
{

    res.render("search");
    
});

app.get("/results",function(req,res)
{
    var value=req.query.search;
    var url='http://www.omdbapi.com/?s='+value+'&apikey=thewdb';
   request(url, function (error, response, body) {

 var data=JSON.parse(body); 
 res.render("results",{data:data}); 
});
  
});

app.listen(process.env.PORT, process.env.IP,function()
{
   console.log("Movie server is listening"); 
});
