const express = require("express");
const router = express.Router();
const Users = require("../services/Users");
const Form = require("../services/Form")
router.get("/", async function (req, res, next) {
  try {
    res.json(await Users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});
router.post('/signup', async function(req, res, next) {
  const { username, password, cnic, email } = req.body;
  try {
    res.json(await Users.create(username, password, cnic, email));
  } catch (err) {
    console.error(`Error while signing up`, err.message);
    next(err);
  }
});
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await Users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Users`, err.message);
    next(err);
  }
});
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await Users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting User`, err.message);
    next(err);
  }
});
router.post('/login', async function(req, res, next) {
  const { username, password, cnic, email } = req.body;
  try {
    res.json(await Users.login(username, password, cnic, email));
  } catch (err) {
    console.error(`Error while login`, err.message);
    next(err);
  }
});
router.post('/FillForm', async function(req, res, next) {
  const { fullName, cnic, headName, disabilities, marriageStatus, education } = req.body;
  try {
    res.json(await Form.create({ fullName, cnic, headName, disabilities, marriageStatus, education }));
  }catch (err) {
    console.error(`Error while filling form`, err.message);
    next(err);
  }
});
module.exports = router;