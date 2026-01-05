const db = require('../config/db');

exports.getAllStock = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.id,
        a.name AS article,
        l.name AS location,
        s.quantity
      FROM stock s
      JOIN articles a ON s.article_id = a.id
      JOIN locations l ON s.location_id = l.id
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { article_id, location_id, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

    const [result] = await db.query(
      `UPDATE stock 
       SET quantity = ? 
       WHERE article_id = ? AND location_id = ?`,
      [quantity, article_id, location_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Stock record not found' });
    }

    res.json({ message: 'Stock updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};