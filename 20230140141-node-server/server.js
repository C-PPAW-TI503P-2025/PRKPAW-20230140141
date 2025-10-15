const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); 
app.use(express.json()); 

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Home Page for API');
});

const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});