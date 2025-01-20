const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


module.exports=router;

// Show session data and URLs in the terminal  
router.use((req, res, next) => {  
  const log = {  
    method: req.method,  
    url: req.originalUrl,  
    data: req.session.data  
  }  
  console.log(JSON.stringify(log, null, 2))  
  next()  
}) 

// ******* Sign in email validation ********************************
router.get('/v9/sign-in-email', function (req, res) {
  // Set URl
  res.render('v9/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/sign-in-email', function (req, res) {
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
  res.render('v9/sign-in-email', {
    errorSigninEmail: true,
    errorList: errors
  })
} else {
  // User inputted value so move to next page
  res.redirect('/v9/sign-in-password')
}
})


// ******* Sign in password validation ********************************
router.get('/v9/sign-in-password', function (req, res) {
// Set URl
res.render('v9/sign-in-password', {
  currentUrl: req.originalUrl
})
})

router.post('/v9/sign-in-password', function (req, res) {
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
  res.render('v9/sign-in-password', {
    errorSigninPassword: true,
    errorList: errors
  })
} else {
  // User inputted value so move to next page
  res.redirect('/v9/company-number')
}
})


// ******* company-number javascript *********************
router.get('/v9/company-number', function (req, res) {
  // Set URl
  res.render('v9/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v9/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v9/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/v9/confirm-company', function (req, res) {
  // Set URl
  res.render('v9/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/confirm-company', function (req, res) {
  // invalid company
  if (req.session.data['companyNumber'] === '00001111') {
    res.redirect('/v9/company-type-stop')
  } else if (req.session.data['companyNumber'] === '99990000') {
    // disolved company
    res.redirect('/v9/company-status-stop')
  } else if (req.session.data['companyNumber'] === '98989898') {
    // no psc company
    res.redirect('/v9/individual/empty-psc-list')
  }else {
    res.redirect('/v9/individual/psc-list')
}
})



// ******* psc-list javascript ********************************
router.get('/v9/individual/psc-list', function (req, res) {
  res.render('v9/individual/psc-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/individual/psc-list', function (req, res) {
  var errors = []

  if (typeof req.session.data['pscList'] === 'undefined') {
    errors.push({
      text: 'Select the PSC you providing verification details for',
      href: '#pscList'
    })
    
    res.render('v9/individual/psc-list', {
      errorPscList: true,
      errorList: errors
    })
  } else {
      res.redirect('/v9/individual/psc-details')
    }
})

// ******* psc-details javascript *********************
router.get('/v9/individual/psc-details', function (req, res) {
  // Set URl
  res.render('v9/individual/psc-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/individual/psc-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['pscPersonalCode'] === '') {
    errors.push({
      text: 'Enter the Companies House personal code',
      href: '#pscPersonalCode'
    })

    res.render('v9/individual/psc-details', {
      errorPscPersonalCode: true,
      errorList: errors
  })
  } else {
    // name mis-match
    if (req.session.data['pscPersonalCode'] === '111-2222-3333') {
      res.redirect('/v9/individual/psc-why-this-name')
    } 
    // dob code mis-match
    else if (req.session.data['pscPersonalCode'] === '444-5555-6666') {
      res.redirect('/v9/individual/psc-dob-mismatch')
    } 
    else {
      res.redirect('/v9/individual/psc-statement')
    }
  }
})


// ******* personal-code validation ********************************
router.get('/v9/individual/personal-code', function (req, res) {
  // Set URl
  res.render('v9/individual/personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/individual/personal-code', function (req, res) {
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
  res.render('v9/individual/personal-code', {
    errorCode: true,
    errorList: errors
  })
  } else {
    if (req.session.data['personalCode'] === '111-2222-3333') {
      res.redirect('/v9/individual/psc-why-this-name')
    } else {
      res.redirect('/v9/individual/psc-statement')
    }
  }
})


// ******* psc-why-this-name javascript ********************************
router.get('/v9/individual/psc-why-this-name', function (req, res) {
  // Set URl
  res.render('v9/individual/psc-why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/individual/psc-why-this-name', function (req, res) {
  res.redirect('/v9/individual/psc-statement')
})



// ******* psc-statement javascript ********************************
router.get('/v9/individual/psc-statement', function (req, res) {
  // Set URl
  res.render('v9/individual/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/v9/individual/psc-statement', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['individualStatement'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select the identity verification statement',
      href: '#individualStatement'
    })
  }

  if (typeof req.session.data['individualStatement'] === 'undefined') {
  // Re-show page with error value as true so errors will show
    res.render('v9/individual/psc-statement', {
      errorStatement: true,
      errorList: errors
  })
  } else {
      res.redirect('/v9/individual/psc-verified')
  }
})


