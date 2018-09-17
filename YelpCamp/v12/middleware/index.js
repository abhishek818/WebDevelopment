var Campground=require("../models/campground");
var Comment=require("../models/comment");

// all the middleware goes here
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err,foundCampground)
    {
       if(err)
       {
           req.flash("error","Campground Not Found!");
           res.redirect("back");
       }
       else
      {
            //does user own the campground?
         if(foundCampground.author.id.equals(req.user._id))
         {
           next();
          }else
          {
              req.flash("error","You don't have permissions to do that.");
              res.redirect("back");
          }
         }
    });    
    } else
    {
       req.flash("error","You need to be logged in to do that!!");
       res.redirect("back"); 
    }
};

middlewareObj.checkCommentOwnership=function checkCommentOwnership(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,foundComment)
    {
       if(err)
       {
           res.redirect("back");
       }
       else
      {
            //does user own the Comment?
         if(foundComment.author.id.equals(req.user._id))
         {
           next();
          }else
          {
              req.flash("error","You don't have permissions to do that.")
              res.redirect("back");
          }
         }
    });    
    } else
    {
       req.flash("error","You need to be logged in to do that!")
       res.redirect("back"); 
    }
};

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
      req.flash("error","You need to be Logged in to do that!");   
      res.redirect("/login");  
    }
};

module.exports=middlewareObj;