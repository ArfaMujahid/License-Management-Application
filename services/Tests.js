const LicenseManagementApp = require('./LicenseManagementApp');
// In services/Officer.js
const nodemailer = require('nodemailer');
const Users = require('./Users');
const Officer = require('./Officer');
async function getAllTests() {
    try {
      const tests = await LicenseManagementApp.query(`SELECT * FROM Tests`);
      return tests;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
async function getPendingTests() {
    try {
      const tests = await LicenseManagementApp.query(`SELECT * FROM Tests WHERE status = 'pending'`);
      return tests;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function getApprovedTests() {
    try {
      const tests = await LicenseManagementApp.query(`SELECT * FROM Tests WHERE status = 'approved'`);
      return tests;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function getTestsByDate(date) {
    try {
      const tests = await LicenseManagementApp.query(`
        SELECT *
        FROM Tests
        WHERE testdate = ?
      `, [date]);
  
      return tests;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function addTest(cnic) {
    try {
      const result = await LicenseManagementApp.query(`
        INSERT INTO Tests (cnic, status, drivingteststatus, writtenteststatus, oralteststatus)
        VALUES (?, ?, ?, ?, ?)`, [cnic, 'pending','pending','pending','pending']);
  
      return result.affectedRows === 1;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function assignTestDateToCNIC(CNIC, testDate) {
    const query = 'UPDATE Tests SET testdate = ? WHERE CNIC = ?';
    const values = [testDate, CNIC];
  
    try {
      await LicenseManagementApp.query(query, values);
    } catch (err) {
      console.error(err);
      throw new Error('Error Assigning Test Date');
    }
  }
  async function assignEmployeeToTest(employeeId, testDate) {
    const query = 'UPDATE Tests SET EmployeeID = ? WHERE testdate = ?';
    const values = [employeeId, testDate];
    console.log("services" +employeeId + testDate);
    try {
      await LicenseManagementApp.query(query, values);
    } catch (err) {
      console.error(err);
      throw new Error('Error Assigning Test Date To Officer');
    }
  }
  async function updateTestStatus(cnic) {
    try {
      const result = await LicenseManagementApp.query('UPDATE Tests SET writtenteststatus = ?, oralteststatus = ?, drivingteststatus = ?, status = ? WHERE CNIC = ?', ['Passed', 'Passed', 'Passed', 'Accepted', cnic]);
      return result.affectedRows > 0;
    }catch (err) {
      console.error(err);
      throw new Error('Error in UPdating');
    }
  }
  async function DeleteTest(cnic) {
    const result = await LicenseManagementApp.query(`DELETE FROM Tests WHERE CNIC = '${cnic}'`);
    return result.affectedRows > 0;
  }
  
  module.exports = {
   getPendingTests,
   getAllTests,
   getApprovedTests,
   getTestsByDate,
   addTest,
   assignTestDateToCNIC,
   assignEmployeeToTest,
   updateTestStatus,
   DeleteTest
  };