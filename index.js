 const express = require('express');
 const connectDB = require('./models/db');
 const app = express();

 require('dotenv').config();
 const PORT = process.env.PORT || 3000
const taskRoutes = require('./routes/taskRoutes')
 require('body-parser')



 //middleware
app.use(express.json());

connectDB()

app.use('/api', taskRoutes)

app.get('/', (req, res) => {
  res.send('Smart Task Manager API is running!');
});
 app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
 })