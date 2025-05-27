const db = require('../db');

// GET semua mahasiswa
exports.getAll = (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// GET satu mahasiswa
exports.getOne = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM mahasiswa WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Mahasiswa tidak ditemukan.');
    res.json(result[0]);
  });
};

// POST mahasiswa baru
exports.create = (req, res) => {
  const { nama, nim, jurusan } = req.body;
  db.query('INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)', [nama, nim, jurusan], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, nama, nim, jurusan });
  });
};

// PUT update mahasiswa
exports.update = (req, res) => {
  const { id } = req.params;
  const { nama, nim, jurusan } = req.body;
  db.query('UPDATE mahasiswa SET nama = ?, nim = ?, jurusan = ? WHERE id = ?', [nama, nim, jurusan, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Mahasiswa berhasil diupdate.');
  });
};

// DELETE mahasiswa
exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Mahasiswa berhasil dihapus.');
  });
};
