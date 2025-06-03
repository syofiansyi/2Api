const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
