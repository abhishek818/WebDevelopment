var express=require("express");
var app=express();

app.get("/",function(req,res)
{
    res.send("hi there");
});

app.get("/dog",function(req,res)
{
    res.send("MEOW");
});

app.get("/bye",function(req,res)
{
    res.send("Goodbye People!");
});

app.get("/r/:anything",function(req,res)
{
    var names=req.params.anything;
    res.send("YOU ARE WELCOME!!! "+" "+names);
});

app.get("*",function(req,res)
{
    res.send("YOU ARE A STAR!!!");
});

app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("server has started");
});