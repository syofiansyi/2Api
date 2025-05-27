const api = require('../services/apiService');
const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const data = await api.get('/mahasiswa');
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await api.get(`/mahasiswa/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Data not found' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await api.post('/mahasiswa', req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create data' });
  }
};

exports.update = async (req, res) => {
  try {
    // 1. Panggil API eksternal
    const data = await api.put(`http://localhost:3000/api/mahasiswa/${req.params.id}`, req.body);
    
    const { nama, nama_log } = req.body;
    const { id } = req.params;


    // 2. Simpan ke database lokal (log)
    db.query(
      'INSERT INTO log (nilai_awal, nilai_akhir, id) VALUES (?, ?, ?)',
      [nama_log, nama, id],
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
    console.error('Gagal update mahasiswa:', err.message);
    res.status(400).json({ error: 'Gagal mengupdate data mahasiswa eksternal.', detail: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await api.delete(`/mahasiswa/${req.params.id}`);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete data' });
  }
};
