const express = require("express");
const router = express.Router();
const Audit = require("../services/Audit");

router.get('/:cnic', async (req, res) => {
    try {
      const auditData = await Audit.getAuditByCNIC(req.params.cnic);
      if (!auditData) {
        return res.status(404).json({ error: 'Audit data not found' });
      }
      res.json(auditData);
    } catch (error) {
      console.error(`Error retrieving audit data: ${error}`);
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = router;