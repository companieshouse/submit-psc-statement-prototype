const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


module.exports=router;

// ******* Sign in email validation ********************************
router.get('/v3/sign-in-email', function (req, res) {
    // Set URl
    res.render('v3/sign-in-email', {
      currentUrl: req.originalUrl
    })
  })
  
router.post('/v3/sign-in-email', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []

  if (req.session.data['signin-email'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your email address',
      href: '#signin-email'
    })
  }

  if (req.session.data['signin-email'] === '') {
    // Re-show page with error value as true so errors will show
    res.render('v3/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v3/sign-in-password')
  }
})
  
  
// ******* Sign in password validation ********************************
router.get('/v3/sign-in-password', function (req, res) {
  // Set URl
  res.render('v3/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/sign-in-password', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []

  if (req.session.data['signin-password'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your password',
      href: '#signin-password'
    })
  }

  if (req.session.data['signin-password'] === '') {
    // Re-show page with error value as true so errors will show
    res.render('v3/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v3/psc-type')
  }
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
    if (req.session.data['pscType'] == 'rle') {
      res.redirect('/v3/rle/company-number')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/individual/company-number')
    }
  }
})


// ******* rle javascript *******************************************************************

// ******* company-number javascript *********************
router.get('/v3/rle/company-number', function (req, res) {
  // Set URl
  res.render('v3/rle/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/rle/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/v3/rle/confirm-company', function (req, res) {
  // Set URl
  res.render('v3/rle/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/confirm-company', function (req, res) {
  res.redirect('/v3/rle/auth-code')
})


// ******* auth-code javascript *********************
router.get('/v3/rle/auth-code', function (req, res) {
  // Set URl
  res.render('v3/rle/auth-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/auth-code', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['authCode'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the authorisation code',
      href: '#authCode'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/auth-code', {
      errorAuthCode: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/rle/rle-list')
  }
})


// ******* rle-list javascript ********************************
router.get('/v3/rle/rle-list', function (req, res) {
  // Set URl
  res.render('v3/rle/rle-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/rle-list', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['rle'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select which RLE you are providing verification details for',
      href: '#rle'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/rle-list', {
      errorRleList: true,
      errorList: errors
    })
  } else {
    res.redirect('/v3/rle/ro-personal-code')
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
      res.redirect('/v3/rle/ro-name')
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
      text: 'Enter the name of the registered officer',
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
  res.redirect('/v3/rle/ro-relationship')
})


// ******* ro-name javascript *********************
router.get('/v3/rle/ro-relationship', function (req, res) {
  // Set URl
  res.render('v3/rle/ro-relationship', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/rle/ro-relationship', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['roRelationship'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the relationship of the registered officer to the company',
      href: '#roRelationship'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/rle/ro-relationship', {
      errorRoRelationship: true,
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
  res.redirect('/v3/rle/ro-verified')
})


// **************************************************************************



// ******* name javascript ********************************
router.get('/v3/individual/company-number', function (req, res) {
  // Set URl
  res.render('v3/individual/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/individual/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/individual/confirm-company')
  }
})

// ******* confirm-company javascript ********************************
router.get('/v3/individual/confirm-company', function (req, res) {
  // Set URl
  res.render('v3/individual/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/confirm-company', function (req, res) {
  if (req.session.data['companyNumber'] == '12345678') {
    res.redirect('/v3/individual/psc-list')
  } else if (req.session.data['companyNumber'] == '11112222'){
    res.redirect('/v3/individual/psc-cannot-confirm-yet')
  }
})


// ******* psc-list javascript ********************************
router.get('/v3/individual/psc-list', function (req, res) {
  // Set URl
  res.render('v3/individual/psc-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/psc-list', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['psc'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select which PSC you want to link',
      href: '#psc'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v3/individual/psc-list', {
      errorPscList: true,
      errorList: errors
    })
  } else {
    res.redirect('/v3/individual/personal-code')
  }
})


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
      if (!(req.session.data['statementAnne'])) {
        res.redirect('/v3/individual/psc-statement-anne')
      } else if (!(req.session.data['statementBob'])) {
        res.redirect('/v3/individual/why-this-name')
      } else if (!(req.session.data['statementPaul'])) {
        res.redirect('/v3/individual/psc-statement-paul')
      }
  }
})



// ******* psc-statement-anne javascript ********************************
router.get('/v3/individual/psc-statement-anne', function (req, res) {
  // Set URl
  res.render('v3/individual/psc-statement-anne', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/psc-statement-anne', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['statementAnne'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#statementAnne'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/individual/psc-statement-anne', {
      errorStatementAnne: true,
      errorList: errors
    })
  } else {
    res.redirect('/v3/individual/this-psc-linked')
  }
})


// ******* psc-statement-bob javascript ********************************
router.get('/v3/individual/psc-statement-bob', function (req, res) {
  // Set URl
  res.render('v3/individual/psc-statement-bob', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/psc-statement-bob', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['statementBob'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#statementBob'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/individual/psc-statement-bob', {
      errorStatementBob: true,
      errorList: errors
    })
  } else {
    if ((req.session.data['statementAnne']) 
    && (req.session.data['statementBob'])
    && (req.session.data['statementPaul'])) {
      res.redirect('/v3/individual/psc-linked')
    } else {
      res.redirect('/v3/individual/this-psc-linked')
    }
  }
})


// ******* psc-statement-paul javascript ********************************
router.get('/v3/individual/psc-statement-paul', function (req, res) {
  // Set URl
  res.render('v3/individual/psc-statement-paul', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/individual/psc-statement-paul', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['statementPaul'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#statementPaul'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/individual/psc-statement-paul', {
      errorStatementPaul: true,
      errorList: errors
    })
  } else {
    if ((req.session.data['statementAnne']) 
    && (req.session.data['statementBob'])
    && (req.session.data['statementPaul'])) {
      res.redirect('/v3/individual/psc-linked')
    } else {
      res.redirect('/v3/individual/this-psc-linked')
    }
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

