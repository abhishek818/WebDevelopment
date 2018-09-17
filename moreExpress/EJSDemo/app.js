var express=require('express');
var app=express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res)
{
res.render("home");
});

app.get("/cars/:model",function(req,res){
   var model=req.params.model;
   res.render("cars",{model:model});
});


app.get("/posts",function(req,res)
{
  var posts=[
          {title:"post 1", author: "suzanne"},
          {title:"post 2", author: "zayn"},
          {title:"post 3", author: "nigam"},
           ];
           
           res.render("posts",{posts:posts});
});









app.listen(process.env.PORT, process.env.IP,function()
{
   console.log("server is listening"); 
});













