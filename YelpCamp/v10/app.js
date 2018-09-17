var express     =require("express"),
    app         =express(),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose"),
    seedDB      =require("./seeds"),
    passport    =require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    User        =require("./models/user"),
    Comment     =require("./models/comment"),
    Campground  =require("./models/campground");
    
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");
    
mongoose.connect("mongodb://localhost:/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

//seedDB();

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


app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP,function()
{
   console.log("YelpCamp server is listening and"); 
});
