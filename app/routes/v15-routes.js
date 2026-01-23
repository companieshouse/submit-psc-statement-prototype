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



router.post('/v15/sign-in-email', function(request, response) {
    response.redirect('/v15/sign-in-password')
})

// // ******* Sign in email validation ********************************
// router.get('/v15/sign-in-email', function (req, res) {
//   // Set URl
//   res.render('/v15/sign-in-password')
// })

// router.post('/v15/sign-in-email', function (req, res) {
// // Create empty array and set error variables to false
// var errors = []

// if (req.session.data['signin-email'] === '') {
//   // No value so add error to array
//   errors.push({
//     text: 'Enter your email address',
//     href: '#signin-email'
//   })
// }

// if (req.session.data['signin-email'] === '') {
//   // Re-show page with error value as true so errors will show
//   res.render('/v15/sign-in-email', {
//     errorSigninEmail: true,
//     errorList: errors
//   })
// } else {
//   // User inputted value so move to next page
//   res.redirect('/v15/sign-in-password')
// }
// })


// ******* Sign in password validation ********************************
router.get('/v15/sign-in-password', function (req, res) {
// Set URl
res.render('/v15/sign-in-password', {
  currentUrl: req.originalUrl
})
})

router.post('/v15/sign-in-password', function (req, res) {
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
  res.render('/v15/sign-in-password', {
    errorSigninPassword: true,
    errorList: errors
  })
} else {
  // User inputted value so move to next page
  res.redirect('/v15/company-number')
}
})


// ******* company-number javascript *********************
router.get('/v15/company-number', function (req, res) {
  // Set URl
  res.render('/v15/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('/v15/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v15/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/v15/confirm-company', function (req, res) {
  // Set URl
  res.render('/v15/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/confirm-company', function (req, res) {
  if ((req.session.data['companyNumber'] == '22223333')) {
    // Super secure
    res.redirect('/v15/individual/psc-list-v3')
    // invalid company
  } else {
    res.redirect('/v15/individual/psc-list')
}
})

// ******* psc-details javascript *********************
router.get('/v15/individual/psc-details', function (req, res) {
  // Set URl
  res.render('/v15/individual/psc-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/individual/psc-details', function (req, res) {
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
  res.render('/v15/individual/psc-details', {
    errorPscPersonalCode: pscPersonalCodeError,
    pscDetailsError: pscDetailsError,
    errorList: errors
  })
  } else {
    // name mis-match
    if (req.session.data['pscPersonalCode'] === '111-2222-3333') {
      res.redirect('/v15/individual/psc-why-this-name')
    } 
    // dob code mis-match
    else if (req.session.data['pscPersonalCode'] === '444-5555-6666') {
      res.redirect('/v15/individual/psc-dob-mismatch')
    } 
    else {
      res.redirect('/v15/individual/psc-statement')
    }
  }
})


// ******* personal-code validation ********************************
router.get('/v15/individual/personal-code', function (req, res) {
  // Set URl
  res.render('/v15/individual/personal-code', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/individual/personal-code', function (req, res) {
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
  res.render('/v15/individual/personal-code', {
    errorCode: true,
    errorList: errors
  })
  } else {
    if (req.session.data['personalCode'] === '111-2222-3333') {
      res.redirect('/v15/individual/psc-why-this-name')
    } 
    else if (req.session.data['personalCode'] === '777-8888-9999') {
      res.redirect('/v15/individual/non-match')
    } else if (req.session.data['personalCode'] === 'aaa-bbbb-cccc') {
      res.redirect('/v15/too-many-attempts')
    } else {
      res.redirect('/v15/individual/psc-statement')
    }
  }
})


// ******* psc-why-this-name javascript ********************************
router.get('/v15/individual/psc-why-this-name', function (req, res) {
  // Set URl
  res.render('/v15/individual/psc-why-this-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/individual/psc-why-this-name', function (req, res) {
  res.redirect('/v15/individual/psc-statement')
})



// ******* psc-statement javascript ********************************
router.get('/v15/individual/psc-statement', function (req, res) {
  // Set URl
  res.render('/v15/individual/psc-statement', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/individual/psc-statement', function (req, res) {
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
    res.render('/v15/individual/psc-statement', {
      errorStatement: true,
      errorList: errors
    })
  } else {
      res.redirect('/v15/individual/psc-verified')
  }
})


// ******* extension reason javascript ********************************
router.get('/v15/extensions/extension-info', function (req, res) {
  // Set URl
  res.render('/v15/extensions/extension-info', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/extensions/extension-info', function (req, res) {
    res.redirect('/v15/extensions/extension-reason-final')
})


// ******* extension-reason javascript ********************************
router.get('/v15/extensions/extension-reason-final', function (req, res) {
  // Set URl
  res.render('v15/extensions/extension-reason-final', {
    currentUrl: req.originalUrl
  })
})

// router.post('/v15/extensions/extension-reason-final', function (req, res) {
//   // Create empty array
//   var errors = []

//   // Check if user has filled out a value
//   if (typeof req.session.data['extensionReason'] === 'undefined') {
//     // No value so add error to array
//     errors.push({
//       text: 'Select why you are requesting an extension',
//       href: '#extensionReason'
//     })

//     // Re-show page with error value as true so errors will show
//     res.render('v15/extensions/extension-reason-final', {
//       errorExtensionReason: true,
//       errorList: errors
//     })
//   } else {
//     if (req.session.data['pscList'] === 'Paul Smith') {
//       if (req.session.data['paul_smith'] === 'extension') {
//         res.redirect('/v15/extensions/extension-confirmation')
//       } else if (req.session.data['paul_smith'] === 'extension-two') {
//         // User inputted value so move to next page
//         res.redirect('/v15/extensions/extension-review')
//       }
//     } else if (req.session.data['pscList'] === 'Susan Robinson') {
//       if (req.session.data['susan_robinson'] === 'extension') {
//         res.redirect('/v15/extensions/extension-confirmation')
//       } else if (req.session.data['susan_robinson'] === 'extension-two') {
//         // User inputted value so move to next page
//         res.redirect('/v15/extensions/extension-review')
//       }
//     }
//   }
// })

router.post('/v15/extensions/extension-reason-final', function (req, res) {
    res.redirect('/v15/extensions/extension-confirmation-first')
})

// ******* extension-reason-second javascript ********************************
router.get('/v15/extensions/extension-info-second', function (req, res) {
  // Set URl
  res.render('/v15/extensions/extension-info-second', {
    currentUrl: req.originalUrl
  })
})

router.post('/v15/extensions/extension-info-second', function (req, res) {
    res.redirect('/v15/extensions/extension-reason-final')
})


