var express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
var json2csv = require('json2csv');

var app = express();
app.use(cors()); //this is required for cross URL request and responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require('pg').Pool
//postgresql login details goes here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'frisk_db',
  password: 'postgres',
  port: 5432,
});

// DB query to retrieve the messages
const getMessageEntries = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM message_entry ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      else
      {
      	console.log(results.rows);
      }
      resolve(results.rows);
    })
  }) 
}

// DB query to insert a new record of message
const createMessageEntry = (body) => {
  return new Promise(function(resolve, reject) {
    var time_created = new Date().toISOString(); //timestamp for the record created
    console.log(time_created);

    const { name, email, pin, message } = body
    console.log(name);
    console.log(email);
    console.log(pin);
    console.log(message);
    
    //insert query
    pool.query('INSERT INTO message_entry (time_created, name, email, pin, message) VALUES ($1, $2, $3, $4, $5) RETURNING *', [time_created, name, email, pin, message], (error, results) => {
      if (error) {
        console.log(error);
        reject(error)
      }
      else
      {
        console.log(results.rows[0]);
      }
      resolve(`A new message entry has been added added: ${results.rows[0]}`)
    })
  })
}

// API /getmessages
app.get('/getmessages', (req, res) => {
  getMessageEntries()
  .then(response => {
     //send the messages as JSON
     res.json(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// API for exporting CSV of unique emails
app.get('/exportcsv', (req, res) => {
  getMessageEntries()
  .then(response => {
    // select only the email field
    data = response.map((element)=>({email:element.email}));
    // select only the unique emails
    const unique = [...new Set(data.map(item => item.email))];
    // stringify the JSON object
    var emails = JSON.stringify(unique);
    // remove unwanted characters 
    emails = emails.replace(/"/g, '');
    emails = emails.replace("[", '');
    emails = emails.replace("]", '');
    
    var emailCount = (emails.match(/,/g) || []).length + 1;
    emails = emails.replace(",", '\n');
    //add count of emails
    var str = emailCount.toString().concat('\n').concat(emails);
    // CSV attachement
    res.set('Content-Type','application/octet-stream'); 
    res.attachment('email.csv');
    res.status(200).send(str);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// API /submitform, for creating new message entry
app.post('/submitform', function (req, res) {
    console.log(req.body);
    // create the message entry in db
    createMessageEntry(req.body);
    //getMessageEntries();
})

app.listen(3000, () => {
 console.log("Server running on port 3000");
});





