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

router.post('/v15/first-extension/start-v2', function(request, response) {
    response.redirect('/v15/first-extension/create-or-sign-in')
})

router.post('/v15/first-extension/create-or-sign-in', function(request, response) {
    response.redirect('/v15/first-extension/sign-in-email')
})

router.post('/v15/first-extension/sign-in-email', function(request, response) {
    response.redirect('/v15/first-extension/sign-in-password')
})

router.post('/v15/first-extension/sign-in-password', function(request, response) {
    response.redirect('/v15/first-extension/company-number')
})

router.post('/v15/first-extension/company-number', function(request, response) {
    response.redirect('/v15/first-extension/confirm-company')
})

router.post('/v15/first-extension/confirm-company', function(request, response) {
    response.redirect('/v15/first-extension/psc-list')
})

router.post('/v15/first-extension/extension-info', function(request, response) {
    response.redirect('/v15/first-extension/extension-reason-final')
})

router.post('/v15/first-extension/extension-reason-final', function(request, response) {
    response.redirect('/v15/first-extension/extension-confirmation-first')
})



// second request journey!
router.post('/v15/second-extension/start-v2', function(request, response) {
    response.redirect('/v15/second-extension/create-or-sign-in')
})

router.post('/v15/second-extension/create-or-sign-in', function(request, response) {
    response.redirect('/v15/second-extension/sign-in-email')
})

router.post('/v15/second-extension/sign-in-email', function(request, response) {
    response.redirect('/v15/second-extension/sign-in-password')
})

router.post('/v15/second-extension/sign-in-password', function(request, response) {
    response.redirect('/v15/second-extension/company-number')
})

router.post('/v15/second-extension/company-number', function(request, response) {
    response.redirect('/v15/second-extension/confirm-company')
})

router.post('/v15/second-extension/confirm-company', function(request, response) {
    response.redirect('/v15/second-extension/psc-list')
})

router.post('/v15/second-extension/extension-info-second', function(request, response) {
    response.redirect('/v15/second-extension/extension-reason-final')
})

router.post('/v15/second-extension/extension-reason-final', function(request, response) {
    response.redirect('/v15/second-extension/extension-confirmation-second')
})








// router.post('/v15/sign-in-email', function(request, response) {
//     response.redirect('/v15/sign-in-password')
// })

// router.post('/v15/sign-in-password', function(request, response) {
//     response.redirect('/v15/company-number')
// })


// router.post('/v15/company-number', function(request, response) {
//     response.redirect('/v15/confirm-company')
// })



