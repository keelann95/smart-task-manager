 const express = require('express');
 const connectDB = require('./models/db');
 const app = express();
 
const Task = require("./models/Task");

 require('dotenv').config();
 const PORT = process.env.PORT || 3000
const taskRoutes = require('./routes/taskRoutes')
 require('body-parser')



const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true })); // For HTML form submissions
app.use(methodOverride("_method"));


 app.set('view engine', 'ejs');
app.set("views", "./views");

app.use('/tasks', taskRoutes)
app.use(express.static("public"));


 //middleware
app.use(express.json());

connectDB()


// Dashboard route
app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ urgencyScore: -1 });
    res.render('dashboard', { tasks });
  } catch (err) {
    console.error(err);
    res.render('error', { error: 'Unable to load tasks' });
  }
});


 app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
 })