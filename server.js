const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});


const app = require('./app');

const database = `mongodb+srv://dhanabaltd:Dhanabal4321@cluster0.zkgc109.mongodb.net/?retryWrites=true&w=majority`;

// Connect the database
mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connection Successfully!');
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});