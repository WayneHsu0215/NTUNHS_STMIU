import { Router } from 'express';
import sqlite3 from 'sqlite3';

const router = Router();

const db = new sqlite3.Database('./predict1.db');
const db1 = new sqlite3.Database('./predict1.db');

router.get('/tables', (req, res) => {
    const query = "SELECT name FROM sqlite_master WHERE type='table'";
  
    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      // 返回所有表的名称
      res.json({
        tables: rows
      });
    });
  });

router.get('/questions', (req, res) => {
  const query = 'SELECT * FROM Teacher_Question';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      data: rows
    });
  });
});

router.get('/questions/:prefix', (req, res) => {
  const prefix = req.params.prefix.toUpperCase(); // 確保前綴是大寫

  // 驗證前綴是否為 A, B 或 C
  if (!['A', 'B', 'C'].includes(prefix)) {
    return res.status(400).json({ error: 'Invalid prefix. Use A, B, or C.' });
  }

  const query = 'SELECT * FROM Teacher_Question WHERE Identity LIKE ?';
  const params = [`${prefix}%`];

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json({
      data: rows
    });
  });
});

router.post('/add_question', (req, res) => {
  const { Date, Time, Question, Type, category, Answer_Correct, Identity } = req.body;
  const query = `
        INSERT INTO Teacher_Question (Date, Time, Question, Type, category, Answer_Correct, Identity)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const params = [Date, Time, Question, Type, category, Answer_Correct, Identity];

  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'New question added successfully',
      id: this.lastID
    });
  });
});

router.delete('/delete_questions/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Teacher_Question WHERE ID = ?';

  db.run(query, id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: `Record with ID ${id} deleted successfully`,
      changes: this.changes
    });
  });
});

router.get('/student_answer', (req, res) => {
  const query = 'SELECT * FROM student_answer';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      data: rows
    });
  });
});

router.get('/student_answer_date', (req, res) => {
  const { startDate, endDate } = req.query;

  const query = 'SELECT * FROM student_answer WHERE DATE(date) BETWEEN ? AND ?';
  const params = [startDate, endDate];

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      data: rows
    });
  });
});



router.get('/student_stats', (req, res) => {
  const { uuid, question_type, category } = req.query;
  let query = 'SELECT Question_type, Category, Correct, COUNT(*) as count FROM student_answer WHERE 1=1';

  const params = [];
  if (uuid) {
    query += ' AND UUID = ?';
    params.push(uuid);
  }
  if (question_type) {
    query += ' AND Question_type = ?';
    params.push(question_type);
  }
  if (category) {
    query += ' AND Category = ?';
    params.push(category);
  }

  query += ' GROUP BY Question_type, Category, Correct';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const stats = rows.reduce((acc, row) => {
      if (!acc[row.Question_type]) acc[row.Question_type] = {};
      if (!acc[row.Question_type][row.Category]) acc[row.Question_type][row.Category] = { correct: 0, incorrect: 0 };
      if (row.Correct === '正確') {
        acc[row.Question_type][row.Category].correct += row.count;
      } else {
        acc[row.Question_type][row.Category].incorrect += row.count;
      }
      return acc;
    }, {});

    res.json({
      data: stats
    });
  });
});

router.get('/Arduino', (req, res) => {
  const query = 'SELECT * FROM Normalized_data';

  db1.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      data: rows
    });
  });
});

router.get('/predict', (req, res) => {
  const query = 'SELECT * FROM predict';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      data: rows
    });
  });
});

router.get('/brainwaves', (req, res) => {
  const query = 'SELECT * FROM Brainwaves';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      data: rows
    });
  });
});

router.post('/addStudentDetails', (req, res) => {
    const { UUID, Name, gender,grade,department } = req.body;
    console.log('UUID', UUID);
    console.log('Name', Name);
    console.log('gender',gender);
    console.log('grade',grade);
    console.log('department',department);
    const query = `INSERT INTO UUID (UUID, Name, gender,grade,department) VALUES (?, ?, ?, ?, ?)`;
    const params = [UUID, Name, gender,grade,department];
    console.log(params);
    db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'New question added successfully',
      id: this.lastID
    });
  });
});

router.get('/student_details', (req, res) => {
  const query = 'SELECT * FROM UUID';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      data: rows
    });
  });
});

export default router;
