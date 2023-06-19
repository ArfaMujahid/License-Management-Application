const LicenseManagementApp = require('./LicenseManagementApp');
const helper = require('../helper');
const config = require('../config');
const nodemailer = require('nodemailer');
const Tests = require('./Tests');


async function getMultiple(page = 1)
{
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await LicenseManagementApp.query(
    `SELECT username,CNIC,email,password
    FROM Users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function create(username, password, cnic, email) {
  const existingUser = await LicenseManagementApp.query(
    `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}' AND cnic = '${cnic}' AND email = '${email}'`
  );

  if (existingUser.length > 0) {
    return { success: 0, message: 'User already exists' };
  }

  const result = await LicenseManagementApp.query(
    `INSERT INTO Users(username, password, cnic, email) 
    VALUES ('${username}', '${password}', '${cnic}', '${email}')`
  );

  let message = 'Error in creating User';
  let success = 0;

  if (result.affectedRows) {
    message = 'User created successfully';
    success = 1;
  }

  return { success, message };
}
async function update(id, Users){
  const result = await LicenseManagementApp.query(
    `UPDATE Users 
    SET username='${Users.username}', CNIC='${Users.CNIC}', email = '${Users.email}', password='${Users.password}' 
    WHERE id=${id}` 
  );

  let message = 'Error in updating Users';

  if (result.affectedRows) {
    message = 'Users updated successfully';
  }

  return {message};
}
async function remove(id){
  const result = await LicenseManagementApp.query(
    `DELETE FROM Users WHERE id=${id}`
  );

  let message = 'Error in deleting Users';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}
async function getUserByCNIC(cnic) {
  const result = await LicenseManagementApp.query(`SELECT * FROM Users WHERE CNIC = '${cnic}'`);
  return result[0];
}
async function sendEmail(recipients, subject, message) {
  const transporter = nodemailer.createTransport({
    host: 'annoymus658@gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'annoymus658@gmail.com',
      pass: 'GoldClock'
    }
  });
  const mailOptions = {
    from: 'annoymus658@gmail.com',
    to: Array.isArray(recipients) ? recipients.join(', ') : recipients, // Check if recipients is an array before joining
    subject: subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    console.log(`Error sending email: ${error}`);
  }
}
async function login(username, password, cnic, email) {
  const rows = await LicenseManagementApp.query(
    `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}' AND cnic = '${cnic}' AND email = '${email}'`
  );

  let message = 'Invalid Login Credentials';
  let success = 0;

  if (rows.length > 0) {
    message = 'Login Successful';
    success = 1;
  } 
  return {
    success,
    message
  };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getUserByCNIC,
  sendEmail,
  login
};