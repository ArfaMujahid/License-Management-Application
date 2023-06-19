const LicenseManagementApp = require('./LicenseManagementApp');
const Tests = require('./Tests');


async function getAllAudits() {
  try {
    const result = await LicenseManagementApp.query(`SELECT * FROM Audit WHERE CNIC IN (SELECT CNIC FROM Form WHERE Accepted = true)`);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAuditByCNIC(cnic) {
    const result = await LicenseManagementApp.query(`SELECT * FROM Audit WHERE CNIC = '${cnic}'`);
    return result[0];
  }
  async function deleteAudit(cnic) {
    const result = await LicenseManagementApp.query(`DELETE FROM Audit WHERE CNIC = '${cnic}'`);
    return result.affectedRows > 0;
  }
  async function updateAudit(cnic, accepted) {
    const result = await LicenseManagementApp.query(`UPDATE Audit SET Accepted = ${accepted ? true : false} WHERE CNIC = '${cnic}'`);
  
    if (accepted) {
      // Add the CNIC of the user to the Tests table with status as 'pending'
      await Tests.addTest(cnic);
    }
  
    return result.affectedRows > 0;
  }
  
async function getApprovedAudits() {
    const result = await LicenseManagementApp.query(`SELECT * FROM Audit WHERE Accepted = true`);
    return result;
  }
  module.exports = { 
    updateAudit,
    deleteAudit,
    getAuditByCNIC,
    getAllAudits,
    getApprovedAudits
};
 
  
  
  
  
  