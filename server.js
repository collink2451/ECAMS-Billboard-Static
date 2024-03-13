console.log('Starting server.js');
require('dotenv').config();
console.log('DB_URL: ', process.env.DB_URL);

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const uri = process.env.DB_URL;

app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

let db;

// Connects to MongoDB
async function connect() {
  try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
      // Start the server
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
      console.error(error);
  }
}

connect();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Moved inside the MongoDB connect callback to ensure db is defined
app.get('/add-data', (req, res) => {
  if (!db) {
    return res.status(500).send('Database not initialized');
  }

  const collection = db.collection('Metrics');
  const document = { name: "New Entry", value: "This is a value" };

  collection.insertOne(document, (err, result) => {
    if (err) {
      console.error('Error inserting data', err);
      return res.status(500).send('Error inserting data');
    }
    res.send('Data added successfully');
  });
});



