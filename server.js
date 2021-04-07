require('dotenv/config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const app = express();
const PORT = process.env.PORT || 1111;
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.send('API is working');
});

app.get('/users', (req, res) => {
	var query = {};
	db.collection('users')
		.find(query)
		.toArray((err, result) => {
			if (err) throw err;
			res.status(200).send(result);
		});
});

MongoClient.connect(process.env.DATABASE_CONNECTION_URL, (err, client) => {
	if (err) throw err;
	db = client.db('mobillor');

	app.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server is running on port ${PORT}`);
	});
});
