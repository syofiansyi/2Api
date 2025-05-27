const express = require('express');
const bodyParser = require('body-parser');
const mahasiswaRoutes = require('./routes/mahasiswa');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/mahasiswa', mahasiswaRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
