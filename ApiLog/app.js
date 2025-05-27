const express = require('express');
const cors = require('cors');
const mahasiswaRoutes = require('./routes/mahasiswa');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/mahasiswa', mahasiswaRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
