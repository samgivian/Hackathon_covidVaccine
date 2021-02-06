const express = require('express')
const mongoose = require('mongoose');
const port = 3000
var path = require('path');
var bodyParser = require('body-parser');
const { json } = require('body-parser');
var nodemailer = require('nodemailer');


const dbuRI = "mongodb+srv://netninda:1234test@cluster0.svjrl.mongodb.net/note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbuRI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) =>
  console.log('connected to db')).catch((error) => console.log(error))
const db = mongoose.connection;
const HospitalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  HospitalInfo: {
    type: Array,
    required: true
  },
  Appointments: {
    type: Array,
    required: true,
  },
  Available_vaccines: {
    type: Array,
    required: true,
  }
}, { timestamps: true })
const HospitalS = mongoose.model('Blog', HospitalSchema);
var app = require("express")();
app.set("view engine", "ejs");
app.use(require("body-parser").json());
HopsitalList = [];
var HopsitalListLength;
HospitalS.findOne({ title: 'HospitalList' }, function (err, doc) {
  HopsitalList = doc.HospitalInfo
  HopsitalListLength = HopsitalList.length;
})
app.get('/', (req, res) => {
  res.render(path.join(__dirname + '/index.ejs'), { ListHospital: (HopsitalList), HopsitalListLength: HopsitalListLength });
})
app.post("/", function (req, res) {
  var answer = req.body;
  console.log(answer);
  // res.render(path.join(__dirname + '/index.ejs'), { username: user, });
})
app.get('/RegisterationSucess', (req, res) => {
  res.render(path.join(__dirname + '/RegisterationSucess.ejs'));
})
app.get('/Registeration', (req, res) => {
  res.render(path.join(__dirname + '/Registeration.ejs'), { ListHospital: (HopsitalList), HopsitalListLength: HopsitalListLength });
})
app.post("/Registeration", function (req, res) {
  var name = req.body.name
  var email = req.body.email
  var location_code = req.body.location_code
  var VaccinationLocations = req.body.VaccinationLocations;
  var Vaccinelocation_appointment = req.body.Vaccinelocation_appointment;
  HospitalS.findOne({ title: 'HospitalList' }, function (err, doc) {
    doc.Appointments.push([Vaccinelocation_appointment, name, email]);
    doc.HospitalInfo = VaccinationLocations;
    doc.save();
  })
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'covidhackathon47@gmail.com',
      pass: '1234sampranav'
    }
  });
  var mailOptions = {
    from: 'covidhackathon47@gmail.com',
    to: email,
    subject: 'Covid-19 Vaccine Appointment',
    text: Vaccinelocation_appointment
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
  res.redirect('/RegisterationSucess')
});
app.get('/CovidInfo', (req, res) => {
  res.render(path.join(__dirname + '/CovidInfo.ejs'));
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// AIzaSyDYHtxBgcRBh1ZPuGe4MigNQax30a5b6OM
// <h1> <%= ListHospital %>   </h1> -->
/*
 const blog = new Blog({
   title: 'new blog',
   snippet: 'about my new blog',
   body: 'more about my new blog',
 });
 blog.save();
 Blog.find({title:'new blog'}).then((results)=>{
   console.log(results);
 })
 Blog.findOne({ title: 'new blog' }, function (err, doc){
   doc.title = 'jason bourne';
   doc.save();
 });
 */
/*
app.post("/sendemail", function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'covidhackathon47@gmail.com',
      pass: '1234sampranav'
    }
  });
  var mailOptions = {
    from: 'covidhackathon47@gmail.com',
    to: 'covidhackathon47@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})
*/