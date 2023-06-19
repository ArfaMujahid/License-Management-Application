const express = require("express");
const router = express.Router();
const Tests = require("../services/Tests");
router.get('/', async (req, res, next) => {
  try {
    const tests = await Tests.getAllTests();
    res.status(200).json(tests);
  } catch (err) {
    next(err);
  }
});
router.get('/pending', async (req, res) => {
    try {
      const tests = await Tests.getPendingTests();
      res.json(tests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }); 
  router.get('/approved', async (req, res) => {
    try {
      const tests = await Tests.getApprovedTests();
      res.json(tests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/date', async (req, res) => {
    try {
      const date = req.query.date;
      const tests = await Tests.getTestsByDate(date);
      res.json(tests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;