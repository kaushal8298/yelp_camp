var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not Found");
            res.redirect("back");
        } else{
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else{
                req.flash("error", "Permission Denied");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "Ypu need to be Logged In");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else{
                req.flash("error", "Permission Denied");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You need to be Logged In");
        res.redirect("back");
    }  
};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "You need to be Logged In");
        res.render("login");
    }  
};

module.exports = middlewareObj;