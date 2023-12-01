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
    res.redirect('/v2/company-number')
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
  if (req.session.data['companyNumber'] == '12345678') {
    res.redirect('/v2/psc-list')
  } else if (req.session.data['companyNumber'] == '11112222'){
    res.redirect('/v2/psc-cannot-confirm-yet')
  }
})


// ******* psc-list javascript ********************************
router.get('/v2/psc-list', function (req, res) {
  // Set URl
  res.render('v2/psc-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-list', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['psc'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select which PSC you want to link',
      href: '#psc'
    })
    

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-list', {
      errorPscList: true,
      errorList: errors
    })
  } else {
    res.redirect('/v2/personal-code')
  }
})


// ******* personal-code validation ********************************
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
      if (req.session.data['psc'] == 'Anne Bereton') {
        res.redirect('/v2/psc-statement-anne')
      } else if (req.session.data['psc'] == 'Bob Smith') {
        res.redirect('/v2/why-this-name')
      } else if (req.session.data['psc'] == 'Paul Robinson') {
        res.redirect('/v2/psc-statement-paul')
      }
  }
})



// ******* psc-statement-anne javascript ********************************
router.get('/v2/psc-statement-anne', function (req, res) {
  // Set URl
  res.render('v2/psc-statement-anne', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-statement-anne', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['statementAnne'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#statementAnne'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-statement-anne', {
      errorStatementAnne: true,
      errorList: errors
    })
  } else {
      res.redirect('/v2/psc-linked')
  }
})


// ******* psc-statement-bob javascript ********************************
router.get('/v2/psc-statement-bob', function (req, res) {
  // Set URl
  res.render('v2/psc-statement-bob', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-statement-bob', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['statementBob'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#statementBob'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-statement-bob', {
      errorStatementBob: true,
      errorList: errors
    })
  } else {
    res.redirect('/v2/psc-linked')
  }
})


// ******* psc-statement-paul javascript ********************************
router.get('/v2/psc-statement-paul', function (req, res) {
  // Set URl
  res.render('v2/psc-statement-paul', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-statement-paul', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['statementPaul'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Confirm if the verification statement is correct',
      href: '#statementPaul'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-statement-paul', {
      errorStatementPaul: true,
      errorList: errors
    })
  } else {
    res.redirect('/v2/psc-linked')
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
      res.redirect('/v2/psc-statement-bob')
  }
})


// ******* second-psc javascript ********************************
router.get('/v2/psc-linked', function (req, res) {
  // Set URl
  res.render('v2/psc-linked', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-linked', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['anotherPsc'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if you want to link another PSC',
      href: '#anotherPsc'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-linked', {
      errorAnotherPsc: true,
      errorList: errors
    })
  } else {

    if (req.session.data['anotherPsc'] == 'same') {
      
      if ((req.session.data['statementAnne']) 
      && (req.session.data['statementBob'])
      && (req.session.data['statementPaul'])) {
        res.redirect('/v2/all-psc-linked')
      } else {
        res.redirect('/v2/psc-list')
      }

    } else {
      res.redirect('/v2/company-number')
    }
  }
})
