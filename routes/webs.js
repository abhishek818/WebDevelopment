var express=require("express");
var app=express();

app.get("/",function(req,res)
{
    res.send("hi there, welcome to my assignment");
});

app.get("/speak/:animal",function(req,res)
{
    var sounds={
        pig:"oink",
        cow:"moo",
        dog:"woof-woof"
    }
    var animal=req.params.animal;
    var sound=sounds[animal];
    res.send("the "+animal+" says "+sound);
});

app.get("/:word/:num",function(req,res)
{
    var names=req.params.words;
    var num=Number(req.params.num);
    for(var i=0;i<=num;i++){
      res.send(names);   
    }
   
});

app.get("*",function(req,res)
{
    res.send("sorry page not found!!!");
});

app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("server has started");
});