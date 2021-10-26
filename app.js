var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    app = express(),
    mongoose = require('mongoose'),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");


seedDB();
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:/yelp_camp", { useNewUrlParser: true });
mongoose.createConnection("mongodb://localhost/yelp_camp", { useNewUrlParser: true });


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('landing')
});


app.get('/campgrounds',(req,res)=>{
    Campground.find({},(error,allCampgrounds)=>{
        if(error){
            console.log(error)
        }else{
            res.render('index',{campgrounds:allCampgrounds})  
        }
    })  
});

app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newcampground = {name: name,image:image,description:description}
    Campground.create(newcampground,(err,newlyCreated)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds")
        }
    })
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("newcamp");
});

app.get("/campgrounds/:id",(req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err){
            console.log(err)
        }else{
            console.log(foundCampground)
            res.render("show",{campground:foundCampground})
        }
    })
});



app.listen(8000,()=>{
    console.log("Yelp Camp Started at port 8000");
});