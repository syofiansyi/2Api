const api = require('../services/apiService');
const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const data = await api.get('/users');
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await api.get(`/users/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Data not found' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await api.post('/users', req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create data' });
  }
};

exports.update = async (req, res) => {
  try {
    // 1. Panggil API eksternal
    const data = await api.put(`http://localhost:3000/api/users/${req.params.id}`, req.body);
    
    const { name_log, name } = req.body;
    const { id } = req.params;


    // 2. Simpan ke database lokal (log)
    db.query(
      'INSERT INTO log (nilai_awal, nilai_akhir, id) VALUES (?, ?, ?)',
      [name_log, name, id],
      (err, result) => {
        if (err) {
          console.error('Gagal menyimpan ke log:', err);
          return res.status(500).json({ message: 'Gagal menyimpan log.', error: err });
        }

        // 3. Kirim response jika semua sukses
        res.status(200).json({
          message: 'Data berhasil diupdate dan dicatat di log.',
          data: data.data,
          log_id: result.insertId
        });
      }
    );
  } catch (err) {
    console.error('Gagal update users:', err.message);
    res.status(400).json({ error: 'Gagal mengupdate data users eksternal.', detail: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await api.delete(`/users/${req.params.id}`);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete data' });
  }
};
