const db = require('../db');

// GET semua users
exports.getAll = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// GET satu users
exports.getOne = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Users tidak ditemukan.');
    res.json(result[0]);
  });
};

// POST users baru
exports.create = (req, res) => {
  const { name, email, nip } = req.body;
  db.query('INSERT INTO users (name, email, nip) VALUES (?, ?, ?)', [name, email, nip], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, nama, nim, jurusan });
  });
};

// PUT update users
exports.update = (req, res) => {
  const { id } = req.params;
  const { email, nip } = req.body;
  db.query('UPDATE users SET name = NULL, email = ?, nip = ? WHERE id = ?', [email, nip, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Users berhasil diupdate.');
  });
};

// DELETE users
exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Users berhasil dihapus.');
  });
};
