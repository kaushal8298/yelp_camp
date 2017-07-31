var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjK0tZBJHXOlqL1qkw0pqqek8Vtgh0s7RGCfm4IxA3nwNx3WDboQ",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, architecto maxime quo maiores minima nam sint! Velit, voluptatibus, distinctio tenetur fugiat earum optio odit quas repellat dolores eveniet molestiae assumenda."
    },
    {
        name: "Sky's Rest",
        image: "http://www.jqueryscript.net/images/Dynamic-Horizontal-Vertical-Image-Slider-Plugin-slideBox.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, architecto maxime quo maiores minima nam sint! Velit, voluptatibus, distinctio tenetur fugiat earum optio odit quas repellat dolores eveniet molestiae assumenda."
    },
    {
        name: "Air Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6tzngRBOs5_D0jB8AkO8_ZH2iBcaFcdXHAXORxTcyDT5mIMGN",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, architecto maxime quo maiores minima nam sint! Velit, voluptatibus, distinctio tenetur fugiat earum optio odit quas repellat dolores eveniet molestiae assumenda."
    }
];

function seedDB(){
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    } else{
        console.log("CampGrounds Removed");
    }
    
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Campground Added");
                //Create A Comment
                Comment.create({
                  text: "This place is Great",
                  author: "Hathaway"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Comment Added");
                    }
                });
            }
        })
    });
    
    }); 
}

module.exports = seedDB;