const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const tracksRouter = require('./routes/tracks');
const authRouter = require('./routes/auth');
const app = express();
const path = require('path');

app.use(body_parser.json());
app.use(cors());


const uri = process.env.ATLAS_URI;

mongoose.connect(process.env.MONGODB_URI || uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


app.get("/", (req, res) => {
  res.json({ message: "You are in the root route" });
});
app.use('/tracks', tracksRouter);
app.use('/account', authRouter);


//Serve Static assets
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;



app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
