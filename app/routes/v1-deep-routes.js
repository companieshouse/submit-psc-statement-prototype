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
router.get('/deep/v1/sign-in-email', function (req, res) {
  // Set URl
  res.render('deep/v1/sign-in-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/sign-in-email', function (req, res) {
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
  res.render('deep/v1/sign-in-email', {
    errorSigninEmail: true,
    errorList: errors
  })
} else {
  // User inputted value so move to next page
  res.redirect('/deep/v1/sign-in-password')
}
})


// ******* Sign in password validation ********************************
router.get('/deep/v1/sign-in-password', function (req, res) {
// Set URl
res.render('deep/v1/sign-in-password', {
  currentUrl: req.originalUrl
})
})

router.post('/deep/v1/sign-in-password', function (req, res) {
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
  res.render('deep/v1/sign-in-password', {
    errorSigninPassword: true,
    errorList: errors
  })
} else {
  // User inputted value so move to next page
  res.redirect('/deep/v1/company-number')
}
})


// ******* company-number javascript *********************
router.get('/deep/v1/company-number', function (req, res) {
  // Set URl
  res.render('deep/v1/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('deep/v1/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/deep/v1/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/deep/v1/confirm-company', function (req, res) {
  // Set URl
  res.render('deep/v1/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/confirm-company', function (req, res) {
  if ((req.session.data['companyNumber'] == '22223333')) {
    // Super secure
    res.redirect('/deep/v1/super-secure')
  } else {
    res.redirect('/deep/v1/psc-type')
  }
})


// ******* psc-type javascript ********************************
router.get('/deep/v1/psc-type', function (req, res) {
  // Set URl
  res.render('deep/v1/psc-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/psc-type', function (req, res) {
  var errors = []

  if (typeof req.session.data['pscType'] === 'undefined') {
    errors.push({
      text: 'Select if you are providing verification details for a PSC or an RLE',
      href: '#pscType'
    })
    
    res.render('deep/v1/psc-type', {
      errorPscType: true,
      errorList: errors
    })
  } else {
    if ((req.session.data['pscType'] == 'PSC')) {
      res.redirect('/deep/v1/individual/psc-list')
    } 
    else {
      res.redirect('/deep/v1/rle/rle-list')
    }
  }
})


// ******* rle javascript *******************************************************************

// ******* rle-list javascript ********************************
router.get('/deep/v1/rle/rle-list', function (req, res) {
  res.render('deep/v1/rle/rle-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/rle/rle-list', function (req, res) {
  var errors = []

  if (typeof req.session.data['rleList'] === 'undefined') {
    errors.push({
      text: 'Select the RLE you providing verification details for',
      href: '#rleList'
    })
    
    res.render('deep/v1/rle/rle-list', {
      errorRleList: true,
      errorList: errors
    })
  } else {
      res.redirect('/deep/v1/rle/ro-details')
    }
})

// ******* ro-details javascript *********************
router.get('/deep/v1/rle/ro-details', function (req, res) {
  // Set URl
  res.render('deep/v1/rle/ro-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/rle/ro-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];
  var firstNameError = false
  var lastNameError = false
  var dobDayError = false
  var dobMonthError = false
  var dobYearError = false
  var roPersonalCodeError = false
  var roDirectorsError = false

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
      text: 'Enter the Companies House personal code',
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
  res.render('deep/v1/rle/ro-details', {
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
      res.redirect('/deep/v1/rle/ro-why-this-name')
    } 
    // dob code mis-match
    else if (req.session.data['roPersonalCode'] === '777-8888-999') {
      errors.push({
      text: 'The details you entered don’t match what we have on record. Check the date of birth and Companies House personal code, and try again.',
      href: '#roPersonalCode'
      })
      
      res.render('deep/v1/rle/ro-details', {
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
        text: 'The director must be aged 16 or over',
        href: '#Dob-year'
        })
        
        res.render('deep/v1/rle/ro-details', {
          errorRoDobDay: true,
          errorRoDobMonth: true,
          errorRoDobYear: true,
          roDetailsError: true,
          yearError: true,
          errorList: errors
        })
    } else {
      res.redirect('/deep/v1/rle/ro-statements')
    }
  }
})


// ******* ro-why-this-name javascript ********************************
router.get('/deep/v1/rle/ro-why-this-name', function (req, res) {
  // Set URl
  res.render('deep/v1/rle/ro-why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/rle/ro-why-this-name', function (req, res) {
  res.redirect('/deep/v1/rle/ro-statements')
})


// ******* ro-statements javascript ********************************
router.get('/deep/v1/rle/ro-statements', function (req, res) {
  // Set URl
  res.render('deep/v1/rle/ro-statements', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/rle/ro-statements', function (req, res) {
  var errors = [];

  if (typeof req.session.data['rleStatementOne'] === 'undefined' || 
      typeof req.session.data['rleStatementTwo'] === 'undefined' ||
      typeof req.session.data['rleStatementThree'] === 'undefined')  {
    errors.push({
      text: 'Select all three relevant officer statements',
      href: '#rleStatementOne'
    })

    // Re-show page with error value as true so errors will show
    res.render('deep/v1/rle/ro-statements', {
      errorStatements: true,
      errorList: errors
    })
  } else {
    res.redirect('/deep/v1/rle/rle-verified')
  }
})


// **************************************************************************

// ******* psc-list javascript ********************************
router.get('/deep/v1/individual/psc-list', function (req, res) {
  res.render('deep/v1/individual/psc-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/individual/psc-list', function (req, res) {
  var errors = []

  if (typeof req.session.data['pscList'] === 'undefined') {
    errors.push({
      text: 'Select the PSC you providing verification details for',
      href: '#pscList'
    })
    
    res.render('deep/v1/individual/psc-list', {
      errorPscList: true,
      errorList: errors
    })
  } else {
      res.redirect('/deep/v1/individual/psc-details')
    }
})

// ******* psc-details javascript *********************
router.get('/deep/v1/individual/psc-details', function (req, res) {
  // Set URl
  res.render('deep/v1/individual/psc-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/individual/psc-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];
  var pscDetailsError = false

  if (req.session.data['pscPersonalCode'] === '') {
    pscPersonalCodeError = true
    pscDetailsError = true
    let pscName = (req.session.data['pscList'] );
    let errorText = 'Enter the Companies House personal code for ';
    let combinedErrorText = errorText.concat(pscName);
    errors.push({
      text:  combinedErrorText,
      href: '#pscPersonalCode'
    })
  }

  if (pscDetailsError) {
  res.render('deep/v1/individual/psc-details', {
    errorPscPersonalCode: pscPersonalCodeError,
    pscDetailsError: pscDetailsError,
    errorList: errors
  })
  } else {
    // name mis-match
    if (req.session.data['pscPersonalCode'] === '111-2222-3333') {
      res.redirect('/deep/v1/individual/psc-why-this-name')
    } 
    // dob code mis-match
    else if (req.session.data['pscPersonalCode'] === '444-5555-6666') {
      res.redirect('/deep/v1/individual/psc-dob-mismatch')
    } 
    else {
      res.redirect('/deep/v1/individual/psc-statement')
    }
  }
})


// ******* personal-code validation ********************************
router.get('/deep/v1/individual/personal-code', function (req, res) {
  // Set URl
  res.render('deep/v1/individual/personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/individual/personal-code', function (req, res) {
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
  res.render('deep/v1/individual/personal-code', {
    errorCode: true,
    errorList: errors
  })
  } else {
    if (req.session.data['personalCode'] === '111-2222-3333') {
      res.redirect('/deep/v1/individual/psc-why-this-name')
    } 
    else if (req.session.data['personalCode'] === '777-8888-9999') {
      res.redirect('/deep/v1/individual/non-match')
    } else if (req.session.data['personalCode'] === 'aaa-bbbb-cccc') {
      res.redirect('/deep/v1/too-many-attempts')
    } else {
      res.redirect('/deep/v1/individual/psc-statement')
    }
  }
})


// ******* psc-why-this-name javascript ********************************
router.get('/deep/v1/individual/psc-why-this-name', function (req, res) {
  // Set URl
  res.render('deep/v1/individual/psc-why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/individual/psc-why-this-name', function (req, res) {
  res.redirect('/deep/v1/individual/psc-statement')
})



// ******* psc-statement javascript ********************************
router.get('/deep/v1/individual/psc-statement', function (req, res) {
  // Set URl
  res.render('deep/v1/individual/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/individual/psc-statement', function (req, res) {
  // Create empty array
  var errors = []

  if (typeof req.session.data['individualStatement'] === 'undefined') {
    // No value so add error to array
    let pscName = (req.session.data['pscList'] );
    let errorText = 'Select the identity verification statement for ';
    let combinedErrorText = errorText.concat(pscName);
    errors.push({
      text: combinedErrorText,
      href: '#individualStatement'
    })

    // Re-show page with error value as true so errors will show
    res.render('deep/v1/individual/psc-statement', {
      errorStatement: true,
      errorList: errors
    })
  } else {
      res.redirect('/deep/v1/individual/psc-verified')
  }
})

// ******* extension relationship javascript ********************************
router.get('/deep/v1/extensions/extension-relationship', function (req, res) {
  // Set URl
  res.render('deep/v1/extensions/extension-relationship', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/extensions/extension-relationship', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['extRelationship'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you are the PSC that is requesting an extension',
      href: '#extRelationship'
    })

    // Re-show page with error value as true so errors will show
    res.render('deep/v1/extensions/extension-relationship', {
      errorExtRelationship: true,
      errorList: errors
    })
  } else {
    res.redirect('/deep/v1/extensions/extension-reason')
  }
})


// ******* extension reason javascript ********************************
router.get('/deep/v1/extensions/extension-reason', function (req, res) {
  // Set URl
  res.render('deep/v1/extensions/extension-reason', {
    currentUrl: req.originalUrl
  })
})

router.post('/deep/v1/extensions/extension-reason', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['extReason'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select why you want to request a extension for the PSC',
      href: '#extReason'
    })

    // Re-show page with error value as true so errors will show
    res.render('deep/v1/extensions/extension-relationship', {
      errorExtReason: true,
      errorList: errors
    })
  } else {
    res.redirect('/deep/v1/extensions/extension-confirmation')
  }
})


