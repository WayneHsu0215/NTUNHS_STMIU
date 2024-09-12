import { Router } from 'express';
import sqlite3 from 'sqlite3';

const router = Router();

const db = new sqlite3.Database('./interactive_student.db');

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
router.get('/questions2', (req, res) => {
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

export default router;
