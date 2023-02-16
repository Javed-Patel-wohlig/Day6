const express = require('express');
const order = require('./routes/order');
const mongoose = require('mongoose');
const validator = require('./middleware/validator');
const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/Order')
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log(err))

app.use(express.json())
app.use('/api/order',validator,order)

    


app.listen(port, () => console.log(`Server is running on port ${port}`))

