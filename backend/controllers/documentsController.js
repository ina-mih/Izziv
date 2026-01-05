const db = require('../config/db');

exports.createDocument = async (req, res) => {
  const { code, items } = req.body;

  if (!code || !items || items.length === 0) {
    return res.status(400).json({ message: 'Invalid document data' });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [docResult] = await conn.query(
      'INSERT INTO documents (code, status) VALUES (?, "NOT CONFIRMED")',
      [code]
    );

    const documentId = docResult.insertId;

    for (const item of items) {
      await conn.query(
        `INSERT INTO document_items 
         (document_id, article_id, from_location_id, to_location_id, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [
          documentId,
          item.article_id,
          item.from_location_id,
          item.to_location_id,
          item.quantity
        ]
      );
    }

    await conn.commit();
    res.status(201).json({ message: 'Document created' });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};

exports.confirmDocument = async (req, res) => {
  const documentId = req.params.id;
  const userId = req.user.id;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [[doc]] = await conn.query(
      'SELECT * FROM documents WHERE id=?',
      [documentId]
    );

    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }
    if (doc.status === 'CONFIRMED') {
      return res.status(400).json({ message: 'Document is already confirmed' });
    }

    const [items] = await conn.query(
      'SELECT * FROM document_items WHERE document_id=?',
      [documentId]
    );

    for (const item of items) {
      const [[articleRow]] = await conn.query(
        'SELECT name FROM articles WHERE id=?',
        [item.article_id]
      );
      const articleName = articleRow ? articleRow.name : `ID ${item.article_id}`;

      const [[locationRow]] = await conn.query(
        'SELECT name FROM locations WHERE id=?',
        [item.from_location_id]
      );
      const locationName = locationRow ? locationRow.name : `ID ${item.from_location_id}`;

      const [[stockRow]] = await conn.query(
        'SELECT quantity FROM stock WHERE article_id=? AND location_id=?',
        [item.article_id, item.from_location_id]
      );

      const available = stockRow ? stockRow.quantity : 0;

      if (Number(available) < Number(item.quantity)) {
        await conn.rollback();
        return res.status(400).json({
          message: `Not enough stock for article ${articleName} at location ${locationName}. Available: ${available}, required: ${item.quantity}`
        });
      }
    }

    for (const item of items) {
      await conn.query(
        'UPDATE stock SET quantity = quantity - ? WHERE article_id=? AND location_id=?',
        [item.quantity, item.article_id, item.from_location_id]
      );

      await conn.query(
        'UPDATE stock SET quantity = quantity + ? WHERE article_id=? AND location_id=?',
        [item.quantity, item.article_id, item.to_location_id]
      );
    }

    await conn.query(
      `UPDATE documents 
       SET status='CONFIRMED', confirmed_by=?, confirmed_date=NOW()
       WHERE id=?`,
      [userId, documentId]
    );

    await conn.commit();
    res.json({ message: 'Document confirmed' });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.id, d.code, d.created_date, d.confirmed_date, d.status,
             u.email AS confirmed_by_email
      FROM documents d
      LEFT JOIN users u ON d.confirmed_by = u.id
      ORDER BY d.created_date DESC
    `);

    for (const doc of rows) {
      const [items] = await db.query(`
        SELECT di.*, a.name AS article_name, l_from.name AS from_location_name, l_to.name AS to_location_name
        FROM document_items di
        LEFT JOIN articles a ON di.article_id = a.id
        LEFT JOIN locations l_from ON di.from_location_id = l_from.id
        LEFT JOIN locations l_to ON di.to_location_id = l_to.id
        WHERE di.document_id=?
      `, [doc.id]);

      doc.items = items;
    }

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};