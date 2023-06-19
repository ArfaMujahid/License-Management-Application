const LicenseManagementApp = require('./LicenseManagementApp');
const helper = require('../helper');
const config = require('../config');

async function getAllForms() {
  try {
    const result = await LicenseManagementApp.query(`SELECT * FROM Form`);
    return result;
  }catch (err) {
    console.error(err);
    throw err;
  }
}
async function getAcceptedForms() {
  try {
    const result = await LicenseManagementApp.query(`SELECT * FROM Form WHERE Accepted = true`);
    console.log(result);
    if (result.length === 0) {
      return { success: 0, message: 'An error occurred while retrieving forms.' };
    }
    return { success: 1, forms: result };
  } catch (error) {
    console.log(error);
    return { success: 0, message: 'An error occurred while retrieving forms.' };
  }
}
async function addForm(fullName, cnic, headName, disabilities, marriageStatus, education) {
  console.log("services " + fullName + " " + cnic + " " + headName + " " + disabilities + " " + marriageStatus + " " + education);
  const [result] = await LicenseManagementApp.query(`INSERT INTO Form (FullName, CNIC, HeadName, Disabilities, MarriageStatus, Education) VALUES (?, ?, ?, ?, ?, ?)`,[fullName, cnic, headName, disabilities, marriageStatus, education]);
  return result.insertId;
}
async function getFormByCNIC(cnic) {
    const result = await LicenseManagementApp.query(`SELECT * FROM Form WHERE CNIC = '${cnic}'`);
    return result[0];
  }
async function deleteForm(cnic) {
    const result = await LicenseManagementApp.query(`DELETE FROM Form WHERE CNIC = ?`,[cnic]);
    return result.affectedRows > 0;
  }
  
  async function updateForm(cnic, accepted) {
    const result = await LicenseManagementApp.query(`UPDATE Form SET Accepted = ${accepted ? 1 : 0} WHERE CNIC = '${cnic}'`);
    return result.affectedRows > 0;
  }
  async function ViewUnacceptedForms() {
    try {
      const result = await LicenseManagementApp.query(`SELECT * FROM Form WHERE Accepted = false`);
      if (result.length === 0) {
        return { success: 0, message: 'An error occurred while retrieving forms.' };
      }
      return { success: 1, forms: result };
    } catch (error) {
      console.log(error);
      return { success: 0, message: 'An error occurred while retrieving forms.' };
    }
  }

  module.exports = { 
    getAllForms,
    getFormByCNIC,
    deleteForm,
    updateForm,
    getAcceptedForms,
    ViewUnacceptedForms,
    addForm
  };
 
  
  
  
  
  