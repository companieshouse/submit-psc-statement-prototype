const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


module.exports=router;

// ******* Sign in email validation ********************************
router.get('/v1/sign-in-email', function (req, res) {
    // Set URl
    res.render('v1/sign-in-email', {
      currentUrl: req.originalUrl
    })
  })
  
router.post('/v1/sign-in-email', function (req, res) {
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
    res.render('v1/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v1/sign-in-password')
  }
})
  
  
// ******* Sign in password validation ********************************
router.get('/v1/sign-in-password', function (req, res) {
  // Set URl
  res.render('v1/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/sign-in-password', function (req, res) {
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
    res.render('v1/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v1/confirm-for')
  }
})


// ******* confirm-for javascript ********************************
router.get('/v1/confirm-for', function (req, res) {
  // Set URl
  res.render('v1/confirm-for', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/confirm-for', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['confirmFor'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you need to confirm yourself as a PSC',
      href: '#confirmFor'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/confirm-for', {
      errorConfirmFor: true,
      errorList: errors
    })
  } else {
    if (req.session.data['confirmFor'] == 'yes') {
      res.redirect('/v1/company-number')
    } else {
      res.redirect('/v1/personal-code')
    }
  }
})


// ******* name javascript ********************************
router.get('/v1/company-number', function (req, res) {
  // Set URl
  res.render('v1/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v1/confirm-company')
  }
})

// ******* confirm-company javascript ********************************
router.get('/v1/confirm-company', function (req, res) {
  // Set URl
  res.render('v1/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/confirm-company', function (req, res) {
  if ((req.session.data['companyNumber'] == '12345678') 
  || (req.session.data['companyNumber'] == '11112222')
  || (req.session.data['companyNumber'] == '23232323')) {
    res.redirect('/v1/confirm-psc')
    
  } else if ((req.session.data['companyNumber'] == '44445555')) {
    res.redirect('/v1/how-name-recorded')

  } else {
    res.redirect('/v1/psc-cannot-find-details')
  }
})


// ******* confirm-psc javascript ********************************
router.get('/v1/confirm-psc', function (req, res) {
  // Set URl
  res.render('v1/confirm-psc', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/confirm-psc', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['confirmPsc'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if this is the correct PSC',
      href: '#confirmPsc'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v1/confirm-psc', {
      errorConfirmPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['confirmPsc'] == 'yes') {
      //  happy path
      if ((req.session.data['companyNumber'] == '12345678')) {
        res.redirect('/v1/psc-statement')
        
      //  confirmation statement not due yet
      } else if ((req.session.data['companyNumber'] == '11112222')) {
        res.redirect('/v1/psc-cannot-confirm-yet')

      //  name mismatch
      } else if ((req.session.data['companyNumber'] == '23232323') 
              || (req.session.data['companyNumber'] == '44445555')) {
        res.redirect('/v1/why-this-name')

      //  multiple dob matches
      } else {
        res.redirect('/v1/psc-did-not-confirm')
      }
    } else {
      res.redirect('/v1/psc-did-not-confirm')
    }
  }
})


// ******* psc-statement javascript ********************************
router.get('/v1/psc-statement', function (req, res) {
  // Set URl
  res.render('v1/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/psc-statement', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['verificationStatement'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#verificationStatement'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/psc-statement', {
      errorStatement: true,
      errorList: errors
    })
  } else {
    res.redirect('/v1/psc-confirmed')
  }
})


// ******* why-this-name javascript ********************************
router.get('/v1/why-this-name', function (req, res) {
  // Set URl
  res.render('v1/why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/why-this-name', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['whyThisName'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select why you use this name',
      href: '#whyThisName'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v1/why-this-name', {
      errorwhyThisName: true,
      errorList: errors
    })
  } else {
      res.redirect('/v1/psc-statement')
  }
})


// ******* how-name-recorded validation ********************************
router.get('/v1/how-name-recorded', function (req, res) {
  // Set URl
  res.render('v1/how-name-recorded', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/how-name-recorded', function (req, res) {
  var errors = []
  var firstNameError = false
  var lastNameError = false

  var nameError = false

  // Check if user has filled out first name
  if (req.session.data['firstName'] === '') {
    // No value so add error to array
    firstNameError = true
    nameError = true
    errors.push({
      text: 'Enter the first name',
      href: '#firstName'
    })
  }

  // Check if user has filled out last name
  if (req.session.data['lastName'] === '') {
    // No value so add error to array
    lastNameError = true
    nameError = true
    errors.push({
      text: 'Enter the last name',
      href: '#lastName'
    })
  }

  if (nameError) {
    // Re-show page with error value as true so errors will show
    res.render('v1/how-name-recorded', {
      errorFirstName: firstNameError,
      errorLastName: lastNameError,
      errorNameRecorded: nameError,
      errorList: errors
    })
  } else {
    res.redirect('/v1/confirm-psc')
  }

})


// ******* Sign in email validation ********************************
router.get('/v1/personal-code', function (req, res) {
  // Set URl
  res.render('v1/personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/personal-code', function (req, res) {
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
  res.render('v1/personal-code', {
    errorCode: true,
    errorList: errors
  })
} else {
  res.redirect('/v1/company-number')
}
})


// ******* how-name-recorded validation ********************************
router.get('/v1/psc-confirmed', function (req, res) {
  // Set URl
  res.render('v1/psc-confirmed', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/psc-confirmed', function (req, res) {
    res.redirect('/v1/personal-code')
})