const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const url = process.env.MONGO_URI;

mongoose.connect(url)
.then(() => {
  console.log('Database connected');
})
.catch(err => console.log(err.message));