const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ganti sesuai password MySQL Anda
  database: 'log_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Koneksi ke database berhasil.');
});

module.exports = db;
