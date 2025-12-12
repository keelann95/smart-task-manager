 const express = require('express');
 const connectDB = require('./models/db');
 const app = express();

 require('dotenv').config();
 const PORT = process.env.PORT || 3000




 //middleware
app.use(express.json());

connectDB()


 app.get('/', (req, res) => {
     res.send('Hello from home');
    console.log('Hello from home');
 });

 app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
 })