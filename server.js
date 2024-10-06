// import the necessary packages
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// initialize the express app
const app = express();

// Load environment variables from .env
dotenv.config();

// connection to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });
// GET endpoint to retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving patients');
      }
      res.json(results);
    });
  });
  
  // GET endpoint to retrieve all providers
  app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving providers');
      }
      res.json(results);
    });
  });
  // GET endpoint to retrieve patients by first name
app.get('/patients/:firstName', (req, res) => {
    const firstName = req.params.firstName;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [firstName], (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving patients by first name');
      }
      res.json(results);
    });
  });
  
  // GET endpoint to retrieve providers by specialty
  app.get('/providers/specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving providers by specialty');
      }
      res.json(results);
    });
  });

// listen to the server
const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//   console.log(`server is runnig on http://localhost:${PORT}`)
// })
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);});

// Send a message to the browser
    console.log('Sending message to the browser...')
app.get('/', (req,res) => {
    res.send('Server started successfully!')
});
