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


// first journey!

router.post('/assessment-prototype/first-extension/start-whitehall', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/create-or-sign-in')
})

router.post('/assessment-prototype/first-extension/create-or-sign-in', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/sign-in-email')
})

router.post('/assessment-prototype/first-extension/sign-in-email', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/sign-in-password')
})

router.post('/assessment-prototype/first-extension/sign-in-password', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/company-number')
})

router.post('/assessment-prototype/first-extension/company-number', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/confirm-company')
})

router.post('/assessment-prototype/first-extension/confirm-company', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/psc-list')
})

router.post('/assessment-prototype/first-extension/extension-info', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/extension-reason-final')
})

router.post('/assessment-prototype/first-extension/extension-reason-final', function(request, response) {
    response.redirect('/assessment-prototype/first-extension/extension-confirmation-first')
})



// second request journey!
router.post('/assessment-prototype/second-extension/start-whitehall', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/create-or-sign-in')
})

router.post('/assessment-prototype/second-extension/create-or-sign-in', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/sign-in-email')
})

router.post('/assessment-prototype/second-extension/sign-in-email', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/sign-in-password')
})

router.post('/assessment-prototype/second-extension/sign-in-password', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/company-number')
})

router.post('/assessment-prototype/second-extension/company-number', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/confirm-company')
})

router.post('/assessment-prototype/second-extension/confirm-company', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/psc-list')
})

router.post('/assessment-prototype/second-extension/extension-info-second', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/extension-reason-final')
})

router.post('/assessment-prototype/second-extension/extension-reason-final', function(request, response) {
    response.redirect('/assessment-prototype/second-extension/extension-confirmation-second')
})



// verification journey happy path

router.post('/assessment-prototype/individual/psc-details', function(request, response) {
    response.redirect('/assessment-prototype/individual/psc-statement')
})

router.post('/assessment-prototype/individual/psc-statement', function(request, response) {
    response.redirect('/assessment-prototype/individual/psc-verified')
})





// router.post('/assessment-prototype/sign-in-email', function(request, response) {
//     response.redirect('/assessment-prototype/sign-in-password')
// })

// router.post('/assessment-prototype/sign-in-password', function(request, response) {
//     response.redirect('/assessment-prototype/company-number')
// })


// router.post('/assessment-prototype/company-number', function(request, response) {
//     response.redirect('/assessment-prototype/confirm-company')
// })



