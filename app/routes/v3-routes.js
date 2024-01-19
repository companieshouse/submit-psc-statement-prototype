const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


module.exports=router;

// ******* company-number javascript *********************
router.get('/v3/company-number', function (req, res) {
  // Set URl
  res.render('v3/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/v3/confirm-company', function (req, res) {
  // Set URl
  res.render('v3/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/confirm-company', function (req, res) {
  res.redirect('/v3/psc-type')
})


// ******* psc-type javascript ********************************
router.get('/v3/psc-type', function (req, res) {
  // Set URl
  res.render('v3/psc-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/psc-type', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['pscType'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select which PSC you want to link',
      href: '#pscType'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v3/psc-type', {
      errorPscType: true,
      errorList: errors
    })
  } else {
    if ((req.session.data['pscType'] == 'Megacorp Ltd') 
    || (req.session.data['pscType'] == 'Omega Trading Group')) {
      res.redirect('/v3/rle/employee')
    } else {
      res.redirect('/v3/individual/personal-code')
    }
  }
})


// ******* rle javascript *******************************************************************

// ******* employee javascript ********************************
router.get('/v3/rle/employee', function (req, res) {
  // Set URl
  res.render('v3/rle/employee', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/employee', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['employee'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'You must select if you are a employee',
      href: '#employee'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/employee', {
      errorEmployee: true,
      errorList: errors
    })
  } else {
    if (req.session.data['employee'] === 'yes') {
      res.redirect('/v3/rle/ro-name')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/rle/not-employee-stop')
    }
  }
})


// ******* ro-name javascript *********************
router.get('/v3/rle/ro-name', function (req, res) {
  // Set URl
  res.render('v3/rle/ro-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/ro-name', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['roName'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the name of the relevant officer',
      href: '#roName'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/ro-name', {
      errorRoName: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/rle/ro-dob')
  }
})


// ******* ro-dob javascript *********************
router.get('/v3/rle/ro-dob', function (req, res) {
  // Set URl
  res.render('v3/rle/ro-dob', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/ro-dob', function (req, res) {
  res.redirect('/v3/rle/ro-director')
})


// ******* ro-director javascript *********************
router.get('/v3/rle/ro-director', function (req, res) {
  // Set URl
  res.render('v3/rle/ro-director', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/ro-director', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];
  
  // Check if user has filled out a value
  if (typeof req.session.data['roDirector'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'You must select if the relevant officer is a director',
      href: '#roDirector'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/ro-director', {
      errorDirector: true,
      errorList: errors
    })
  } else {
    if (req.session.data['roDirector'] === 'yes') {
      res.redirect('/v3/rle/ro-personal-code')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/rle/not-director-stop')
    }
  }
})



// ******* ro-personal-code javascript *********************
router.get('/v3/rle/ro-personal-code', function (req, res) {
  // Set URl
  res.render('v3/rle/ro-personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/ro-personal-code', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['roPersonalCode'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the personal code for the registered officer',
      href: '#roPersonalCode'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/ro-personal-code', {
      errorRoPersonalCode: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/rle/ro-statements')
  }
})




// ******* ro-statements javascript ********************************
router.get('/v3/rle/ro-statements', function (req, res) {
  // Set URl
  res.render('v3/rle/ro-statements', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/ro-statements', function (req, res) {
  res.redirect('/v3/verified')
})


// **************************************************************************


// ******* personal-code validation ********************************
router.get('/v3/individual/personal-code', function (req, res) {
  // Set URl
  res.render('v3/individual/personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/personal-code', function (req, res) {
// Create empty array and set error variables to false
var errors = []

if (req.session.data['personalCode'] === '') {
  // No value so add error to array
  errors.push({
    text: 'Enter the Companies House personal code',
    href: '#personalCode'
  })
}

if (req.session.data['personalCode'] === '') {
  // Re-show page with error value as true so errors will show
  res.render('v3/individual/personal-code', {
    errorCode: true,
    errorList: errors
  })
  } else {
      res.redirect('/v3/individual/psc-statement')
  }
})



// ******* psc-statement javascript ********************************
router.get('/v3/individual/psc-statement', function (req, res) {
  // Set URl
  res.render('v3/individual/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/psc-statement', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['individualStatement'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#individualStatement'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/individual/psc-statement', {
      errorStatement: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/verified')
  }
})


// ******* why-this-name javascript ********************************
router.get('/v3/individual/why-this-name', function (req, res) {
  // Set URl
  res.render('v3/individual/why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/why-this-name', function (req, res) {
  res.redirect('/v3/individual/psc-statement-bob')
})


// ******* this-psc-link javascript ********************************
router.get('/v3/individual/this-psc-linked', function (req, res) {
  // Set URl
  res.render('v3/individual/this-psc-linked', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/this-psc-linked', function (req, res) {

      if ((req.session.data['statementAnne']) 
      && (req.session.data['statementBob'])
      && (req.session.data['statementPaul'])) {
        res.redirect('/v3/individual/all-psc-linked')
      } else {
        res.redirect('/v3/individual/personal-code')
      }

})

