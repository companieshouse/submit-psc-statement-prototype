//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.use('/', require('./routes/v1-routes.js'))
router.use('/', require('./routes/v2-routes.js'))
router.use('/', require('./routes/v3-routes.js'))
router.use('/', require('./routes/v4-routes.js'))
router.use('/', require('./routes/v5-routes.js'))
router.use('/', require('./routes/v6-routes.js'))
router.use('/', require('./routes/v7-routes.js'))
router.use('/', require('./routes/v8-routes.js'))
router.use('/', require('./routes/v9-routes.js'))
router.use('/', require('./routes/v10-routes.js'))

// DEEP

router.use('/', require('./routes/v1-deep-routes.js'))
router.use('/', require('./routes/v2-deep-routes.js'))
router.use('/', require('./routes/v3-deep-routes.js'))
router.use('/', require('./routes/v4-deep-routes.js'))
router.use('/', require('./routes/v5-deep-routes.js'))

// Test

router.use('/', require('./routes/test-routes.js'))