const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


module.exports=router;

// ******* Sign in email validation ********************************
router.get('/v2/sign-in-email', function (req, res) {
    // Set URl
    res.render('v2/sign-in-email', {
      currentUrl: req.originalUrl
    })
  })
  
router.post('/v2/sign-in-email', function (req, res) {
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
    res.render('v2/sign-in-email', {
      errorSigninEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/sign-in-password')
  }
})
  
  
// ******* Sign in password validation ********************************
router.get('/v2/sign-in-password', function (req, res) {
  // Set URl
  res.render('v2/sign-in-password', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/sign-in-password', function (req, res) {
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
    res.render('v2/sign-in-password', {
      errorSigninPassword: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/confirm-for')
  }
})


// ******* confirm-for javascript ********************************
router.get('/v2/confirm-for', function (req, res) {
  // Set URl
  res.render('v2/confirm-for', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/confirm-for', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['confirmFor'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you need to confirm yourself as a PSC',
      href: '#confirmFor'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/confirm-for', {
      errorConfirmFor: true,
      errorList: errors
    })
  } else {
   
    if ((req.session.data['confirmFor'] == 'myself')) {
      if (req.session.data['signin-email'] == 'email@server.com') {
        //  happy path
        res.redirect('/v2/confirm-psc')
      } else {
        res.redirect('/v2/company-number')
      }
    } else {
      //  Confirming someone else
      res.redirect('/v2/personal-code')
    }
  }
})


// ******* name javascript ********************************
router.get('/v2/company-number', function (req, res) {
  // Set URl
  res.render('v2/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v2/confirm-company')
  }
})

// ******* confirm-company javascript ********************************
router.get('/v2/confirm-company', function (req, res) {
  // Set URl
  res.render('v2/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/confirm-company', function (req, res) {
  if ((req.session.data['companyNumber'] == '12345678') 
  || (req.session.data['companyNumber'] == '11112222')
  || (req.session.data['companyNumber'] == '23232323')) {
    res.redirect('/v2/confirm-psc')
    
  } else {
    res.redirect('/v2/psc-cannot-find-details')
  }
})


// ******* confirm-psc javascript ********************************
router.get('/v2/confirm-psc', function (req, res) {
  // Set URl
  res.render('v2/confirm-psc', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/confirm-psc', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['confirmPsc'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if this is the correct PSC',
      href: '#confirmPsc'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v2/confirm-psc', {
      errorConfirmPsc: true,
      errorList: errors
    })
  } else {
    if (req.session.data['confirmPsc'] == 'yes') {
      
      //  happy path
      if ((req.session.data['companyNumber'] == '12345678')) {
          //  happy path
          res.redirect('/v2/psc-statement')

      //  confirmation statement not due yet
      } else if ((req.session.data['companyNumber'] == '11112222')) {
        res.redirect('/v2/psc-cannot-confirm-yet')

      //  name mismatch
      } else if ((req.session.data['companyNumber'] == '23232323')) {
        res.redirect('/v2/why-this-name')
      }
    
      } else {
        res.redirect('/v2/psc-did-not-confirm')
      }
  }
})


// ******* second-psc javascript ********************************
router.get('/v2/second-psc', function (req, res) {
  // Set URl
  res.render('v2/second-psc', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/second-psc', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['secondPsc'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you are confirming another PSC for this company',
      href: '#secondPsc'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/second-psc', {
      errorSecondPsc: true,
      errorList: errors
    })
  } else {
   
    if ((req.session.data['secondPsc'] == 'yes')) {
        res.redirect('/v2/personal-code')
      } else {
        res.redirect('/v2/psc-confirmed')
      }
    }
})


// ******* psc-statement javascript ********************************
router.get('/v2/psc-statement', function (req, res) {
  // Set URl
  res.render('v2/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-statement', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['verificationStatement'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#verificationStatement'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-statement', {
      errorStatement: true,
      errorList: errors
    })
  } else {
    res.redirect('/v2/second-psc')
  }
})


// ******* why-this-name javascript ********************************
router.get('/v2/why-this-name', function (req, res) {
  // Set URl
  res.render('v2/why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/why-this-name', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['whyThisName'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select why you use this name',
      href: '#whyThisName'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v2/why-this-name', {
      errorwhyThisName: true,
      errorList: errors
    })
  } else {
      res.redirect('/v2/psc-statement')
  }
})


// ******* how-name-recorded validation ********************************
router.get('/v2/how-name-recorded', function (req, res) {
  // Set URl
  res.render('v2/how-name-recorded', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/how-name-recorded', function (req, res) {
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
    res.render('v2/how-name-recorded', {
      errorFirstName: firstNameError,
      errorLastName: lastNameError,
      errorNameRecorded: nameError,
      errorList: errors
    })
  } else {
    res.redirect('/v2/confirm-psc')
  }

})


// ******* Sign in email validation ********************************
router.get('/v2/personal-code', function (req, res) {
  // Set URl
  res.render('v2/personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/personal-code', function (req, res) {
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
  res.render('v2/personal-code', {
    errorCode: true,
    errorList: errors
  })
} else {

  if ((req.session.data['secondPsc'] == 'yes')) {
    res.redirect('/v2/confirm-psc')
  } else {
    res.redirect('/v2/company-number')
  }
}

})


// ******* how-name-recorded validation ********************************
router.get('/v2/psc-confirmed', function (req, res) {
  // Set URl
  res.render('v2/psc-confirmed', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-confirmed', function (req, res) {
    res.redirect('/v2/personal-code')
})