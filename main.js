const express = require('express')
const mongoose = require('mongoose');
const port = 3000
var path = require('path');
var bodyParser = require('body-parser');
const { json } = require('body-parser');

const dbuRI = "mongodb+srv://netninda:1234test@cluster0.svjrl.mongodb.net/note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbuRI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) =>
  console.log('connected to db')).catch((error) => console.log(error))
const db = mongoose.connection;
/*const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true })
const Blog = mongoose.model('Blog', blogSchema);*/
const HospitalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  HospitalInfo: {
    type: Array,
    required: true
  }
}, { timestamps: true })
const HospitalS = mongoose.model('Blog', HospitalSchema);
var app = require("express")();
app.set("view engine", "ejs");
var user = "asdsadasd";
app.use(require("body-parser").json());
app.get('/', (req, res) => {
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
  HospitalS.findOne({ title: 'HospitalList' }, function (err, doc) {
    HopsitalList=doc.HospitalInfo
    HopsitalListLength=HopsitalList.length;
    res.render(path.join(__dirname + '/index.ejs'), { ListHospital: (HopsitalList) ,HopsitalListLength:HopsitalListLength});
  })
})
app.post("/", function (req, res) {
  var answer = req.body;
  console.log(answer);
  res.render(path.join(__dirname + '/index.ejs'), { username: user });

});
app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname + '/map.ejs'));
})
app.get('/hello', (req, res) => {
  res.send('Hello Worasasasld!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// AIzaSyDYHtxBgcRBh1ZPuGe4MigNQax30a5b6OM