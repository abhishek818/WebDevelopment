var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


//POST

    var postSchema=new mongoose.Schema({
       title:String,
       content:String
    });
    
    var Post=mongoose.model("Post",postSchema);


//USER
    
    var userSchema=new mongoose.Schema({
       email:String,
       name:String,
       posts:[postSchema]
    });
    
    var User=mongoose.model("User",userSchema);
    

    
    // var newUser=new User({
    //     email:"harry@hogwarts.edu",
    //     name:"harry potter"
    // });
    
    // newUser.posts.push({
    //     title:"how to use your magic wand",
    //     content:"just kidding. go to your classes to learn it."
    // });
    
    // newUser.save(function(err,user)
    // {
    //   if(err)
    //   {
    //       console.log(err);
    //   } else
    //   {
    //       console.log(user);
    //   }
    // });
    
    
    // var newPost=new Post({
    //     title:"Reflections on apple",
    //     content:"they are delicious"
    // });
    
    
    
    // newPost.save(function(err,post)
    // {
    //   if(err)
    //   {
    //       console.log(err);
    //   }
    //   else
    //   {
    //       console.log(post);
    //   }
    // });
    
    
    User.findOne({name:"harry potter"},function(err,user)
    {
       if(err)
       {
           console.log(err);
       }
       else{
          user.posts.push({
              title:"3 things i hate",
              content:"voldemort, voldemort and voldemort"
          });
          user.save(function(err,user)
          {
             if(err)
             {
                 console.log(err);
             }
             else
             {
                 console.log(user);
             }
          });
       }
    });
    
    
    
    
    