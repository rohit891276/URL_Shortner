const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/route.js');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

// Connect to the database
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/assignment-LT-DB", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', router);

app.all('/**', (req, res) => {
    res.status(404).send({ status: false, message: 'Page Not Found!' });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000));
});



