const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// MongoDB Connection
mongoose.connect('mongodb+srv://sharpshooter6399:DbHMRmDUQerlZDyN@cluster0.dh7yf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));





// Routes
app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit', async (req, res) => {
  const { name, age, gender, mobile } = req.body;

  try {
    const newUser = new User({ name, age, gender, mobile });
    await newUser.save();

    res.send(`
      <div style="font-family: 'Roboto', sans-serif; text-align: center; padding: 20px; background: #dff0d8; color: #3c763d; border-radius: 10px; margin: 50px auto; max-width: 400px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">
        <h2>Thank You! 🎉</h2>
        <p>Your data has been saved successfully.</p>
        <a href="/" style="text-decoration: none; color: #fff; background: #4caf50; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px;">Go Back</a>
      </div>
    `);
  } catch (error) {
    res.status(500).send(`
      <div style="font-family: 'Roboto', sans-serif; text-align: center; padding: 20px; background: #f8d7da; color: #a94442; border-radius: 10px; margin: 50px auto; max-width: 400px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">
        <h2>Oops! 😞</h2>
        <p>Something went wrong. Please try again later.</p>
        <a href="/" style="text-decoration: none; color: #fff; background: #dc3545; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px;">Go Back</a>
      </div>
    `);
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
