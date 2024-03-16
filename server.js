console.log('Starting server.js');
require('dotenv').config();
console.log('DB_URL: ', process.env.DB_URL);

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for your data.
const MetricsSchema = new Schema({
  location: String,
  timestamp: String,
});

const Metrics = mongoose.model('Metrics', MetricsSchema);

const app = express();
const port = 3000;
const uri = process.env.DB_URL;

app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

// Connects to MongoDB
mongoose.connect(uri, { dbName: 'Capstone' }).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}).catch(error => {
  console.error('Connection error:', error);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-interaction', async (req, res) => {
  try {
    const newMetric = new Metrics(req.body);
    const result = await newMetric.save();
    console.log('Metric Added', result);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving the interaction:', error);
    res.status(500).send('Error saving the interaction to the database');
  }
});
