const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = 'mongodb://localhost:27017';
const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoClient = new MongoClient(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect(async (err, client) => {
  if (err) {
    return console.log(err);
  }
  const database = client.db('myapp');
  const cityCollection = await database.createCollection("cities",
    {
      city: String,
      state: String,
      latitudes: Number,
      longitudes: Number,
    }
  )
  require('./backend/note_routes')(app, cityCollection);
  app.listen(port, () => {
    console.log('Live on ' + port);
  });
});
