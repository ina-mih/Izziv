const db = require('../config/db');

exports.getLocations = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM locations');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM locations WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const { code, name } = req.body;

    if (!code || !name) {
      return res.status(400).json({ message: 'Code and name are required' });
    }

    const [result] = await db.query(
      'INSERT INTO locations (code, name) VALUES (?, ?)',
      [code, name]
    );

    const locationId = result.insertId;

    await db.query(
    `INSERT INTO stock (article_id, location_id, quantity)
    SELECT id, ?, 0 FROM articles`,
    [locationId]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Location created'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name } = req.body;

    const [result] = await db.query(
      'UPDATE locations SET code=?, name=? WHERE id=?',
      [code, name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLocation = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;

    conn = await db.getConnection();
    await conn.beginTransaction();

    await conn.query(
      'DELETE FROM stock WHERE location_id = ?',
      [id]
    );

    const [result] = await conn.query(
      'DELETE FROM locations WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ message: 'Location not found' });
    }

    await conn.commit();
    res.json({ message: 'Location and related stock deleted successfully' });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};