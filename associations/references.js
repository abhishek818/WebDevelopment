var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post=require("./models/post");
var User=require("./models/user");


    // User.create({
    //   email:"BobBuilders@constructions.com",
    //   name:"BobTheBuilder"
    // });
    
    Post.create({
        title:"build everything pt.4",
        content:"try this"
    },function(err,post){
      if(err)
      {
          console.log(err);
      }else
      {
          User.findOne({name:"BobTheBuilder"},function(err, foundUser)
          {
              if(err)
              {
                  console.log(err);
              }
              else
              {
                  foundUser.posts.push(post);
                  foundUser.save(function(err,data)
                  {
                     if(err)
                     {
                         console.log(err);
                     }
                     else{
                         console.log(data);
                     }
                  });
              }
          });
      }
    });
    
    //find user
    //find all posts for that user
    
    // User.findOne({email:"BobBuilders@constructions.com"}).populate("posts").exec(function(err,user)
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //     }else
    //     {
    //         console.log(user);
    //     }
    // })
