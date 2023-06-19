const express = require("express");
const router = express.Router();
const Form = require("../services/Form");

router.get('/forms', async (req, res) => {
  try {
  const forms = await Form.getAllForms();
  res.json({success: 1, forms});
  } catch (error) {
  console.log(error);
  res.json({success: 0, message: 'Error retrieving forms'});
  }
  });
  router.get('/UnacceptedForms', async (req, res) => {
    try {
      const forms = await Form.ViewUnacceptedForms();
      res.json(forms);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  router.get('/AcceptedForms', async (req, res) => {
    try {
      const forms = await Form.getAcceptedForms();
      console.log(forms);
      res.json(forms);
    } catch (error) {
      console.log(error);
      res.status(500).json([]);
    }
  });
router.post('/fillform', async (req, res) => {
    try {
    const { fullName, cnic, headName, disabilities, marriageStatus, education } = req.body;
    const formExists = await Form.getFormByCNIC(cnic);
    if (formExists) {
      return res.status(400).json({ success: false, message: 'Form already submitted.' });
    }
    await Form.addForm(fullName, cnic, headName, disabilities, marriageStatus, education);
    res.json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
});
module.exports = router;
