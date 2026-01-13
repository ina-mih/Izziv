const db = require('../config/db');

exports.getArticles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM articles');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { name, description, ean, unit } = req.body;

    if (!name || !unit) {
      return res.status(400).json({ message: 'Name and unit are required' });
    }

    const [result] = await db.query(
      'INSERT INTO articles (name, description, ean, unit) VALUES (?, ?, ?, ?)',
      [name, description, ean, unit]
    );

    const articleId = result.insertId;

    // create stock rows for all locations
    await db.query(
      `INSERT INTO stock (article_id, location_id, quantity)
      SELECT ?, id, 0 FROM locations`,
      [articleId]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Article created'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, ean, unit, is_active } = req.body;

    const [result] = await db.query(
      `UPDATE articles 
       SET name=?, description=?, ean=?, unit=?, is_active=? 
       WHERE id=?`,
      [name, description, ean, unit, is_active, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM articles WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article and related stock deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};