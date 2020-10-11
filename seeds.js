var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name : 'First Camp',
        image: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80',
        description:"This is a huge description about the images"
    },
    {
        name : 'First Camp',
        image: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80',
        description:"This is a huge description about the images"
    },
    {
        name : 'First Camp',
        image: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80',
        description:"This is a huge description about the images"
    },
    
]


const seedDB = () =>{
    // Remove all campgrounds
    Campground.deleteMany({},(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("remove campgrounds!")//add a few campgrounds
            data.forEach((seed)=>{
                Campground.create(seed,(err,campground)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("added a campground")
                        Comment.create(
                            {
                                text:"This place is beautiful",
                                author : "Homer"
                            },(err,comment)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Create new comment ")
                                }
                            });
                    }
                })
            })
        }
    });
}
module.exports = seedDB;
