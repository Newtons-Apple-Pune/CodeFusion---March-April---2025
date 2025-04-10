const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express()
const port = 5000


/*app.get('/', (req, res) => {
  res.send('Server is running!');
});*/

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/auth', require('./routes/auth'))
app.use('/api/file', require('./routes/file'))
app.use('/api/notes',require('./routes/notes'))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });
const User = require('./models/User'); // Adjust the path as needed

// Assuming you've already set up express app
app.get('/users', async (req, res) => {
  try {
    const records = await User.find({});
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
