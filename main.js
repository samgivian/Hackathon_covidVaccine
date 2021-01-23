const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = 3000
var path = require('path');

const dbuRI = "mongodb+srv://netninda:1234test@cluster0.svjrl.mongodb.net/note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbuRI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) =>
  console.log('connected to db')).catch((error) => console.log(error))
const db = mongoose.connection;

const blogSchema = new mongoose.Schema({
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
const Blog = mongoose.model('Blog', blogSchema);




app.get('/', (req, res) => {
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
  res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname + '/map.html'));
})
app.get('/hello', (req, res) => {
  res.send('Hello Worasasasld!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// AIzaSyDYHtxBgcRBh1ZPuGe4MigNQax30a5b6OM