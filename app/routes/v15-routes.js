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
    response.redirect('/v15/first-extension/individual/psc-list')
})





router.post('/v15/sign-in-email', function(request, response) {
    response.redirect('/v15/sign-in-password')
})

router.post('/v15/sign-in-password', function(request, response) {
    response.redirect('/v15/company-number')
})


router.post('/v15/company-number', function(request, response) {
    response.redirect('/v15/confirm-company')
})



