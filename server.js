const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/user-service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to User-Service DB'))
  .catch(err => console.error('Could not connect to DB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  password: String
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.post('/users', async (req, res) => {
  const { name, role, password } = req.body;
  const user = new User({ name, role, password });
  await user.save();
  res.send(user);
});

// Authentication Route (example)
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
  res.send({ token });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`User-Service running on port ${PORT}`));
