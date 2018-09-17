var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/fire_app");

var catSchema=new mongoose.Schema({
    name:String,
    age:Number,
    temperament:String
});

var Cat=mongoose.model("Cat",catSchema);

var george=new Cat(
    {
        name:"shalu",
        age:11,
        temperament:"evil"
    });
    
    george.save(function(err,cat){
        if(err)
        {
            console.log("something went wrong!");
        }
        else
        {
            console.log("we just saved a cat to the db:");
            console.log(cat);
        }
    });
    
    Cat.find({},function(err,cats)
    {
        if(err)
        {
            console.log("oh no error");
            console.log(err);
        }
        else
        {
            console.log("all the cats...");
            console.log(cats);
        }
    });
    
    
    
    
    
    
    
    
    