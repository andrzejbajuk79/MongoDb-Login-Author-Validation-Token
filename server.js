const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();
//connect to DB
// 'mongodb+srv://rhino11:rhino11@cluster0-xsha6.mongodb.net/test?retryWrites=true&w=majority',
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () =>
 console.log('Połaczono z bazą danych')
);

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
