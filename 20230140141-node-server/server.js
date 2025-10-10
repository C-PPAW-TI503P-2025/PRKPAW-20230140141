const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint GET sesuai tugas
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Server!' });
});

// Endpoint tambahan untuk demonstrasi
app.get('/api/greet', (req, res) => {
  const { name } = req.query;
  if (name) {
    res.json({ message: `Hello, ${name}! from Server` });
  } else {
    res.json({ message: 'Hello from Server!' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});