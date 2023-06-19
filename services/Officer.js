const LicenseManagementApp = require('./LicenseManagementApp');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await LicenseManagementApp.query(
    `SELECT *
    FROM Officer LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function create(username, EmployeeID, password){
  const existingOfficer = await LicenseManagementApp.query(
    `SELECT * FROM Officer WHERE EmployeeID = '${EmployeeID}'`
  );

  if (existingOfficer.length > 0) {
    return { success: 0, message: 'Employee already exists' };
  }

  const result = await LicenseManagementApp.query(
    `INSERT INTO Officer(username, EmployeeID, password) 
    VALUES ('${username}', '${EmployeeID}', '${password}')`
  );

  let message = 'Error in creating User';
  let success = 0;

  if (result.affectedRows) {
    message = 'User created successfully';
    success = 1;
  }

  return { success, message };
}
async function update(id, Officer){
  const result = await LicenseManagementApp.query(
    `UPDATE Officer 
    SET username='${Officer.username}', EmployeeID='${Officer.EmployeeID}', password='${Officer.password}' 
    WHERE id=${id}` 
  );

  let message = 'Error in updating Officer';

  if (result.affectedRows) {
    message = 'Officer updated successfully';
  }

  return {message};
}
async function remove(id){
  const result = await LicenseManagementApp.query(
    `DELETE FROM Officer WHERE id=${id}`
  );

  let message = 'Error in deleting Officer';

  if (result.affectedRows) {
    message = 'Officer deleted successfully';
  }

  return {message};
}
async function login(username, EmployeeID, password) {
  const query = 'SELECT * FROM Officer WHERE username = ? AND EmployeeID = ? AND password = ?';
  const values = [username, EmployeeID, password];

  const rows = await LicenseManagementApp.query(query, values);

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
  login
};

