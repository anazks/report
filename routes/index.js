var express = require('express');
var router = express.Router();
var publisherModel = require('../model/publisherMOdel')
var reportModel = require('../model/reportModel')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});
router.get('/home', async function (req, res, next) {
  try {
   
    totalHours = await reportModel.find();
    totalPublisher=await publisherModel.find();
    totalPhours = await publisherModel.find({category:'RP'})
    Phours = await reportModel.find({category:'RP'})
    // total pioneers
    console.log(totalPhours,"rp:::::")
    let pioneers = totalPhours.length;
    console.log(pioneers)
    //total publishers
    console.log(totalPublisher.length)
      let publishers = totalPublisher.length;
      let totalH =0;
      totalHours.forEach(obj => {
        totalH = totalH + parseInt(obj.hours) ;
      });
      let phtotal =0;
      Phours.forEach(obj=>{
        phtotal =phtotal + parseInt(obj.hours)
      })
    let admin = req.session.admin;
    admin.totalh = totalH;
    admin.publishers=publishers;
    admin.phtotal=phtotal;
    admin.pioneers=pioneers;
    res.render('admin/home',{admin});
  } catch (error) {
      console.log(error)
  }
});
router.get('/viewPublisher',async function(req, res, next) {
  try {
   Publisher=await publisherModel.find();
   console.log(Publisher)
   let admin = req.session.admin;
    res.render('admin/viewPublisher',{Publisher,admin});
  } catch (error) {
    
  }

});
router.get('/addReport/:id/:name/:category', function(req, res, next) {
  let admin = req.session.admin;
  let id = req.params.id;
  let name = req.params.name;
  let category = req.params.category;
  let data = {
    category,
    id,
    name
  }
  res.render('admin/addReport',{admin,data});
});
router.get('/profile', function(req, res, next) {
  let admin = req.session.admin;
  res.render('admin/profile',{admin});
});
router.post('/login', function(req, res, next) {
  console.log(req.body)
  let userName ="admin";
  let password = "admin";
  let admin ={
    userName,
    password
  }
  if(req.body.name =='admin' & req.body.password=='admin'){
    req.session.admin=admin;
    res.redirect('/home')
  }else{
    res.redirect('/login')
  }
});
router.post('/addPublisher',async (req,res)=>{
  console.log(req.body)
  try {
    publisherModel=await publisherModel.create(req.body);
     await console.log(req.body)
    res.redirect('/viewPublisher');
  } catch (error) {
      console.log(error)
  }
})
router.get('/viewProfile/:id', async(req,res)=>{
    console.log(req.params.id)
    try {
      let publisher = await publisherModel.find({ _id: req.params.id });
      console.log(publisher)
      let id = req.params.id;
      let admin = req.session.admin;
      let pubData = publisher[0];
      pubData.id =id;
      res.render('admin/profile',{pubData})
    } catch (error) {
      
    }
})
router.post('/addReport', async(req,res)=>{
  try {
    reportModel=await reportModel.create(req.body);
    console.log("inserted")
    res.redirect('/viewPublisher');
  } catch (error) {
      console.log(error)
  }
})
router.get('/reportHistory/:id',async(req,res)=>{
    console.log(req.params.id)
    reportHistory = await reportModel.find({reportID :req.params.id})
    console.log(reportHistory,"reportHistory")
    let admin = req.session.admin;
    res.render('admin/reporthistory',{reportHistory,admin})
})
router.get('/generateTotalHR/:hours',async (req,res)=>{
  console.log(req.params.hours);
    try {
          HoursReport = await reportModel.find();
          let admin = req.session.admin;
          res.render('admin/hoursReport',{HoursReport,admin})
    } catch (error) {
      console.log(error)
    }
})
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
module.exports = router;
