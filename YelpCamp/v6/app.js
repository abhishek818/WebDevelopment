var express     =require("express"),
    app         =express(),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose"),
    seedDB      =require("./seeds"),
    passport    =require("passport"),
    LocalStrategy=require("passport-local"),
    User        =require("./models/user"),
    Comment     =require("./models/comment"),
    Campground  =require("./models/campground");


mongoose.connect("mongodb://localhost:/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

seedDB();

app.use(require("express-session")(
{
    secret:"lets see whether this thing works or not",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
   res.locals.currentUser=req.user;
   next();
});


// Campground.create({
//   name:"Laky Lake",
//   image:"https://www.lakegeorgeescape.com/wp-content/uploads/2013/09/enter_sign1.jpg",
//   description:"lakes everywhere."
// }, function(err,campground)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("newly created campground:");
//         console.log(campground);
//     }
// });

//   var campgrounds=[
//      {name:"Salmon Creek",image:"https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656"},
//      {name:"Granite Hill",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9DFdRV0QcDOJ8uuEMSCh5ndA1XIoBPBGPRJfDgVVmeTBMUeb"},
//      {name:"Mountain Goat's Rest",image:"https://www.lakegeorgeescape.com/wp-content/uploads/2013/09/enter_sign1.jpg"}
//       ];

app.get("/",function(req,res)
{
    res.render("landing");
});

app.get("/campgrounds",function(req,res)
{
    
    Campground.find({},function(err,allCampgrounds)
    {
       if(err)
       {
           console.log(err);
       }
       else
       {
               res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
    
});

app.post("/campgrounds",function(req,res)
{
  var name=req.body.name;
  var image=req.body.image;
    var desc = req.body.description;
var newCampground = {name: name, image: image, description: desc};
  
  Campground.create(newCampground,function(err,newlyCreated)
  {
     if(err)
     {
         console.log("something went wrong");
     }
     else{
          res.redirect("/campgrounds");
        
     }
  });

//   campgrounds.push(newCampground);
});


app.get("/campgrounds/new",function(req,res)
{
   res.render("new"); 
});

app.get("/campgrounds/:id",function(req,res)
{
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground)
    {
        if(err)
      {
          console.log(err);
      }
      else
      {
           res.render("campgrounds/show",{campground:foundCampground}); 
      }
    });
  
});


//=======================*****
//COMMENT ROUTES
//=======================*****

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res)
{
    Campground.findById(req.params.id,function(err,campground)
    {
       if(err)
       {
           console.log(err);
       }
       else
       {
            res.render("comments/new",{campground:campground});  
       }
    });
   
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res)
{
    Campground.findById(req.params.id,function(err,campground)
    {
       if(err)
       {
           console.log(err);
           res.redirect("/campgrounds");
       }
       else
       {
           Comment.create(req.body.comment,function(err,comment)
           {
              if(err)
              {
                  console.log(err);
              }else
              {
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/"+campground._id);
              }
           });
       }
    });
});

//*****************
//AUTH Routes
//*****************

app.get("/register",function(req,res)
{
    res.render("register");
});

app.post("/register",function(req,res)
{
    var newUser=new User({username:req.body.username});
    User.register(newUser, req.body.password,function(err,user)
    {
        if(err)
        {
            console.log(err);
           return res.render("register");
        }
        else
        {
            passport.authenticate("local")(req,res,function()
            {
                 res.redirect("/campgrounds");     
            });
        }
    });
});

app.get("/login",function(req,res)
{
   res.render("login"); 
});

//app.post("/login",middleware,callback)
app.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),
function(req,res)
{
    
});

app.get("/logout",function(req,res)
{
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
      res.redirect("/login");  
    }
}


app.listen(process.env.PORT, process.env.IP,function()
{
   console.log("YelpCamp server is listening and"); 
});
