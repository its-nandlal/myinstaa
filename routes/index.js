var express = require('express');
var router = express.Router();
const userModel = require("../utils/usermodel");
const postModel = require("../utils/postmodel");
const uploads = require("../utils/multer");
const postUploads = require("../utils/multer2")

const passport = require("passport")
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))


let nav1 = false
router.use(function(req, res, next){
  next(nav1 = false)
});

let nav2 = false
router.use(function(req, res, next){
  next(nav2 = false)
});

let footer = false
router.use(function(req, res, next){
  next(footer = false)
});

router.get('/', function(req, res, next) {
  res.render('index',{nav1, nav2, footer});
});


router.get("/register", function(req, res){
  res.render('register',{nav1, nav2, footer})
});

router.get("/feed", isLoggedIn, async function(req, res){
  const user = await userModel.findOne({username: req.session.passport.user})
  let post = await postModel.find().populate('userId');

  res.render('feed',{nav1:true, nav2, footer: true, post, user})
});

router.get("/profile", isLoggedIn, async function(req, res){

  const user = await userModel.findOne({username: req.session.passport.user}).populate("posts").exec()

  res.render("profile",{nav1, nav2: true, footer: true, user})
});

router.get("/edit", isLoggedIn, async function(req, res){

  const user = await userModel.findOne({username: req.session.passport.user})

  res.render("edit",{nav1: false, nav2: false, footer: true, user})
});

router.get("/post", isLoggedIn, async function(req, res){

  const user = await userModel.findOne({username: req.session.passport.user})

  res.render("post",{nav1: false, nav2: false, footer: true, user})
});

router.get("/username/:username", async function(req, res){

  const regexp = new RegExp(`^${req.params.username}`, 'i')

  const user = await userModel.find({username: regexp})

  res.json(user)

})

router.get("/likes/:postid", async function(req, res){

  const post = await postModel.findOne({_id: req.params.postid})
  const user = await userModel.findOne({username: req.session.passport.user})

  if(post.postLikes.indexOf(user._id) === -1){
    post.postLikes.push(user._id)
  }
  else{
    post.postLikes.splice(post.postLikes.indexOf(user._id),1)
  }

  await post.save();

  res.json(post)

})

router.get("/save/:saveid", async function(req, res){

  const user = await userModel.findOne({username: req.session.passport.user})

  if(user.savePost.indexOf(req.params.saveid) === -1){
    user.savePost.push(req.params.saveid)
  }
  else{
    user.savePost.splice(user.savePost.indexOf(req.params.saveid), 1)
  }

  await user.save()

  res.json(user)


})

router.get("/userSave/:dt", async function(req, res){

  const user = await userModel.findOne({_id: req.params.dt}).populate("savePost")
  res.json(user)

})

// POST ROUTS  


router.post("/edit", uploads.single("dpimage") ,async function(req, res){

  const user =  await userModel.findOne({username: req.session.passport.user})

  await user.updateOne({
    name: req.body.name,
    username: req.body.username,
    contact: req.body.contact,
    bio: req.body.bio,
  })

  if(req.file){
    user.dp = req.file.filename
  }
  else{
    user.dp = user.dp
  }


  await user.save()

  res.redirect("/profile")

})

router.post("/post", postUploads.single("postImg"), async function(req, res){

  const user = await userModel.findOne({username: req.session.passport.user})

  const post = await postModel.create({
    userId: user._id,
    postImage: req.file.filename,
    postCaption: req.body.postCaption
  })

  user.posts.push(post._id)

  await user.save()

  res.redirect("/feed")

})

router.post("/register", function(req, res){

  const {name, username, email} = req.body

  const userdata = new userModel({name, username, email})

  userModel.register(userdata,req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile")
    })

  })


})


router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res){});


router.get("/logout", function(req, res, next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect("/")
  })
})


function isLoggedIn (req, res, next){
  if(req.isAuthenticated()){
    return next()
  }

  res.redirect("/")
}


module.exports = router;
