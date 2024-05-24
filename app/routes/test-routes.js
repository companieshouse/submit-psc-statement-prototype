const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


module.exports=router;

// ******* Sign in email validation ********************************
router.get('/test/sign-in-email', function (req, res) {
  // Set URl
  res.render('test/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/sign-in-email', function (req, res) {
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
  res.render('test/sign-in-email', {
    errorSigninEmail: true,
    errorList: errors
  })
} else {
  // User inputted value so move to next page
  res.redirect('/test/sign-in-password')
}
})


// ******* Sign in password validation ********************************
router.get('/test/sign-in-password', function (req, res) {
// Set URl
res.render('test/sign-in-password', {
  currentUrl: req.originalUrl
})
})

router.post('/test/sign-in-password', function (req, res) {
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
  res.render('test/sign-in-password', {
    errorSigninPassword: true,
    errorList: errors
  })
} else {
  // User inputted value so move to next page
  res.redirect('/test/company-number')
}
})


// ******* company-number javascript *********************
router.get('/test/company-number', function (req, res) {
  // Set URl
  res.render('test/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('test/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/test/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/test/confirm-company', function (req, res) {
  // Set URl
  res.render('test/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/confirm-company', function (req, res) {
  if ((req.session.data['companyNumber'] == '22223333')) {
    // Super secure
    res.redirect('/test/super-secure')
  } else {
    res.redirect('/test/psc-type')
  }
})


// ******* psc-type javascript ********************************
router.get('/test/psc-type', function (req, res) {
  // Set URl
  res.render('test/psc-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/psc-type', function (req, res) {
  var errors = []

  if (typeof req.session.data['pscType'] === 'undefined') {
    errors.push({
      text: 'Select if your providing verification details for a PSC or RLE',
      href: '#pscType'
    })
    
    res.render('test/psc-type', {
      errorPscType: true,
      errorList: errors
    })
  } else {
    if ((req.session.data['pscType'] == 'rle')) {
      if ((req.session.data['megacorp_ltd'] === 'yes')
            && (req.session.data['omega_trading'] === 'yes')){
      res.redirect('/test/rle/rle-list-complete')
    } else {
      res.redirect('/test/rle/rle-list')
    } 
    } else if ((req.session.data['paul_smith'] === 'yes')
            && (req.session.data['susan_robinson'] === 'yes')){
      res.redirect('/test/individual/psc-list-complete')
    } else {
      res.redirect('/test/individual/psc-list')
    }
  }
})


// ******* rle javascript *******************************************************************

// ******* rle-list javascript ********************************
router.get('/test/rle/rle-list', function (req, res) {
  res.render('test/rle/rle-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/rle/rle-list', function (req, res) {
  var errors = []

  if (typeof req.session.data['rleList'] === 'undefined') {
    errors.push({
      text: 'Select the RLE you providing verification details for',
      href: '#rleList'
    })
    
    res.render('test/rle/rle-list', {
      errorRleList: true,
      errorList: errors
    })
  } else {
      res.redirect('/test/rle/ro-details')
    }
})

// ******* ro-details javascript *********************
router.get('/test/rle/ro-details', function (req, res) {
  // Set URl
  res.render('test/rle/ro-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/rle/ro-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];
  var firstNameError = false
  var lastNameError = false
  var dobDayError = false
  var dobMonthError = false
  var dobYearError = false
  var roPersonalCodeError = false

  var roDetailsError = false

  if (req.session.data['firstName'] === '') {
    firstNameError = true
    roDetailsError = true
    errors.push({
      text: 'Enter the first name',
      href: '#firstName'
    })
  }

  if (req.session.data['lastName'] === '') {
    lastNameError = true
    roDetailsError = true
    errors.push({
      text: 'Enter the last name',
      href: '#lastName'
    })
  }

  if (req.session.data['Dob-day'] === '') {
    dobDayError = true
    roDetailsError = true
    errors.push({
      text: 'Enter the day of birth',
      href: '#dob'
    })
  }
  
  if (req.session.data['Dob-month'] === '') {
    dobMonthError = true
    roDetailsError = true
    errors.push({
      text: 'Enter the month of birth',
      href: '#dob'
    })
  }
  
  if (req.session.data['Dob-year'] === '') {
    dobYearError = true
    roDetailsError = true
    errors.push({
      text: 'Enter the year of birth',
      href: '#dob'
    })
  }

  if (req.session.data['roPersonalCode'] === '') {
    roPersonalCodeError = true
    roDetailsError = true
    errors.push({
      text: 'Enter the personal code',
      href: '#roPersonalCode'
    })
  }

  if (typeof req.session.data['roDirector'] === 'undefined') {
    roDirectorsError = true
    roDetailsError = true
    errors.push({
      text: 'Confirm if the relevant officer is a director of the relevant legal entity, or someone whose roles and responsibilities correspond to that of a company director.',
      href: '#roDirector'
    })
  }

  if (roDetailsError) {
  res.render('test/rle/ro-details', {
    errorFirstName: firstNameError,
    errorLastName: lastNameError,
    errorRoDobDay: dobDayError,
    errorRoDobMonth: dobMonthError,
    errorRoDobYear: dobYearError,
    errorRoPersonalCode: roPersonalCodeError,
    errorRoDirector: roDirectorsError,
    roDetailsError: roDetailsError,
    errorList: errors
  })
  } else {
    // name mis-match
    if (req.session.data['roPersonalCode'] === '111-2222-3333') {
      res.redirect('/test/rle/ro-why-this-name')
    } 
    // dob code mis-match
    else if (req.session.data['roPersonalCode'] === '777-8888-999') {
      errors.push({
      text: 'The details you entered don’t match what we have on record. Check the date of birth and Companies House personal code, and try again.',
      href: '#roPersonalCode'
      })
      
      res.render('test/rle/ro-details', {
        errorRoDobDay: true,
        errorRoDobMonth: true,
        errorRoDobYear: true,
        rleMatchError: true,
        roDetailsError: true,
        errorList: errors
      })
    } // Director too young
      else if (req.session.data['Dob-year'] === '2009') {
      errors.push({
        text: 'The director must be at least 16 years of age',
        href: '#Dob-year'
        })
        
        res.render('test/rle/ro-details', {
          errorRoDobDay: true,
          errorRoDobMonth: true,
          errorRoDobYear: true,
          roDetailsError: true,
          yearError: true,
          errorList: errors
        })
    } else {
      res.redirect('/test/rle/ro-statements')
    }
  }
})


// ******* ro-why-this-name javascript ********************************
router.get('/test/rle/ro-why-this-name', function (req, res) {
  // Set URl
  res.render('test/rle/ro-why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/rle/ro-why-this-name', function (req, res) {
  res.redirect('/test/rle/ro-director')
})


// ******* ro-statements javascript ********************************
router.get('/test/rle/ro-statements', function (req, res) {
  // Set URl
  res.render('test/rle/ro-statements', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/rle/ro-statements', function (req, res) {
  res.redirect('/test/rle/rle-verified')
})


// **************************************************************************

// ******* psc-list javascript ********************************
router.get('/test/individual/psc-list', function (req, res) {
  res.render('test/individual/psc-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/individual/psc-list', function (req, res) {
  var errors = []

  if (typeof req.session.data['pscList'] === 'undefined') {
    errors.push({
      text: 'Select the PSC you providing verification details for',
      href: '#pscList'
    })
    
    res.render('test/individual/psc-list', {
      errorPscList: true,
      errorList: errors
    })
  } else {
      res.redirect('/test/individual/psc-details')
    }
})

// ******* psc-details javascript *********************
router.get('/test/individual/psc-details', function (req, res) {
  // Set URl
  res.render('test/individual/psc-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/individual/psc-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];
  var pscDetailsError = false

  if (req.session.data['pscPersonalCode'] === '') {
    pscPersonalCodeError = true
    pscDetailsError = true
    errors.push({
      text: 'Enter the personal code for the PSC',
      href: '#pscPersonalCode'
    })
  }

  if (pscDetailsError) {
  res.render('test/individual/psc-details', {
    errorPscPersonalCode: pscPersonalCodeError,
    pscDetailsError: pscDetailsError,
    errorList: errors
  })
  } else {
    // name mis-match
    if (req.session.data['pscPersonalCode'] === '111-2222-3333') {
      res.redirect('/test/individual/psc-why-this-name')
    } 
    // dob code mis-match
    else if (req.session.data['pscPersonalCode'] === '444-5555-6666') {
      res.redirect('/test/individual/psc-dob-mismatch')
    } 
    else {
      res.redirect('/test/individual/psc-statement')
    }
  }
})


// ******* personal-code validation ********************************
router.get('/test/individual/personal-code', function (req, res) {
  // Set URl
  res.render('test/individual/personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/individual/personal-code', function (req, res) {
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
  res.render('test/individual/personal-code', {
    errorCode: true,
    errorList: errors
  })
  } else {
    if (req.session.data['personalCode'] === '111-2222-3333') {
      res.redirect('/test/individual/psc-why-this-name')
    } 
    else if (req.session.data['personalCode'] === '777-8888-9999') {
      res.redirect('/test/individual/non-match')
    } else if (req.session.data['personalCode'] === 'aaa-bbbb-cccc') {
      res.redirect('/test/too-many-attempts')
    } else {
      res.redirect('/test/individual/psc-statement')
    }
  }
})


// ******* psc-why-this-name javascript ********************************
router.get('/test/individual/psc-why-this-name', function (req, res) {
  // Set URl
  res.render('test/individual/psc-why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/individual/psc-why-this-name', function (req, res) {
  res.redirect('/test/individual/psc-statement')
})



// ******* psc-statement javascript ********************************
router.get('/test/individual/psc-statement', function (req, res) {
  // Set URl
  res.render('test/individual/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/test/individual/psc-statement', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['individualStatement'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#individualStatement'
    })

    // Re-show page with error value as true so errors will show
    res.render('test/individual/psc-statement', {
      errorStatement: true,
      errorList: errors
    })
  } else {
      res.redirect('/test/individual/psc-verified')
  }
})


