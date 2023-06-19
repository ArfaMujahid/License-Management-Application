const express = require("express");
const router = express.Router();
const Officer = require("../services/Officer");
const Form = require('../services/Form');
const User = require('../services/Users');
const Audit = require('../services/Audit');
const Tests = require('../services/Tests');

router.get("/", async function (req, res, next) {
  try {
    res.json(await Officer.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Officer `, err.message);
    next(err);
  }
});
router.post('/signup', async function(req, res, next) {
  const { username, EmployeeID, password } = req.body
  try {
    res.json(await Officer.create(username, EmployeeID, password));
  } catch (err) {
    console.error(`Error while signing up`, err.message);
    next(err);
  }
});
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await Officer.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Officer`, err.message);
    next(err);
  }
});
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await Officer.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Officer`, err.message);
    next(err);
  }
});
router.get('/AllFormData', async (req, res) => {
  try {
    const forms = await Form.getAllForms();
    res.json(forms);
  } catch (error) {
    console.log(error);
    res.status(500).json([]);
  }
});
router.post('/acceptForm', async (req, res) => {
    try {
      const { CNIC, accepted } = req.body;
      const form = await Form.getFormByCNIC(CNIC);
      if (!form) {
        return res.status(400).json({ message: 'Form not found' });
      }
      const user = await User.getUserByCNIC(CNIC);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const updatedForm = await Form.updateForm(CNIC, accepted);
      if (accepted) {
        const message = 'Form accepted';
        await User.sendEmail(user.email, message);
        return res.json({ message });
      } else {
        await Form.deleteForm(CNIC);
        const message = 'Form rejected';
        await User.sendEmail(user.email, message);
        return res.json({ message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/OfficerLogin', async function(req, res, next) {
    console.log(req.body);
    const { username, EmployeeID,password } = req.body;
    try {
      res.json(await Officer.login(username,EmployeeID, password));
    } catch (err) {
      console.error(`Error while login`, err.message);
      next(err);
    }
  }); 
  router.post('/acceptAudit', async (req, res) => {
    try {
      const { CNIC, accepted } = req.body;
      const audit = await Audit.getAuditByCNIC(CNIC);
      if (!audit) {
        return res.status(400).json({ message: 'Audit not found' });
      }
      const user = await User.getUserByCNIC(CNIC);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const updatedAudit = await Audit.updateAudit(CNIC, accepted);
      if (accepted) {
        const message = 'Audit accepted';
        await User.sendEmail(user.email, message);
        return res.json({ message });
      } else {
        await Audit.deleteAudit(CNIC);
        const message = 'Audit rejected';
        await User.sendEmail(user.email, message);
        return res.json({ message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/approvedAudits', async function(req, res, next) {
    try {
      const audits = await Audit.getApprovedAudits();
      res.json(audits);
    } catch (err) {
      console.error(`Error while getting approved audits`, err.message);
      next(err);
    }
  });
  router.get('/allTests', async function(req, res, next) {
    try {
      const tests = await Tests.getAllTests();
      res.json(tests);
    } catch (err) {
      console.error(`Error while getting all tests `, err.message);
      next(err);
    }
  });
router.get('/audits', async function(req, res, next){
  try {
    const audits = await Audit.getAllAudits();
    res.json(audits);
  }catch (err) {
    console.error(`Error while getting all audits `, err.message);
    next(err);
  }

});
router.get('/pendingTests', async function(req, res, next) {
    try {
      res.json(await Tests.getPendingTests());
    } catch (err) {
      console.error(`Error while getting pending tests`, err.message);
      next(err);
    }
  });
router.get('/tests/:date', async function(req, res, next) {
  try {
    res.json(await Tests.getTestsByDate(req.params.date));
    tests.testdate = formatDate(Tests.testdate);
  } catch (err) {
    console.error(`Error while getting tests by date`, err.message);
    next(err);
  }
});
function formatDate(date) {
  const isoDate = new Date(date).toISOString();
  return isoDate.substring(0, 10);
}
router.post('/assignTestDateToCNIC', async (req, res) => {
  const { CNIC, testDate } = req.body;
  try {
    await Tests.assignTestDateToCNIC(CNIC, testDate);
    res.status(200).send('Test Date Assigned Successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/approvedTests', async function(req, res, next) {
  try {
    res.json(await Tests.getApprovedTests());
  } catch (err) {
    console.error(`Error while getting approved tests`, err.message);
    next(err);
  }
});
router.post('/addtest', async function(req, res, next) {
try {
  const { cnic } = req.body;
  res.json(await Tests.addTest(cnic));
} catch (err) {
  console.error(`Error while adding new test`, err.message);
  next(err);
}
});
router.post('/assignemployee', async (req, res) => {
try {
  const { employeeId, testDate } = req.body;

  console.log("routes" +employeeId + testDate);
  await Tests.assignEmployeeToTest(employeeId, testDate);
  res.json({ success: true, message: 'Employee assigned to test successfully!' });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: 'Server error!' });
}
});
router.post('/updatetest', async (req, res) => {
  const { cnic, writtenTestStatus, oralTestStatus, drivingTestStatus } = req.body;
  try {
    // console.log("routes " + cnic + writtenTestStatus + oralTestStatus + drivingTestStatus);
    if (writtenTestStatus == `Passed` && oralTestStatus == `Passed` && drivingTestStatus == `Passed`) 
    {
      await Tests.updateTestStatus(cnic);
      await Form.deleteForm(cnic);
      const message = 'You have passed all the tests';
      await User.sendEmail(User.email,message );
      return res.json({ message });
    }
    else
    {
      await Tests.DeleteTest(cnic);
      const message = 'You have failed the tests';
      await User.sendEmail(User.email, message);
      return res.json({ message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message + "OFficer" });
  }
});


module.exports = router;