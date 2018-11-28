const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const routes = express.Router()
/**
 * Middlewares
 */
const authMiddleware = require('./app/middlewares/auth')
/**
 * Controllers
 */
const controllers = require('./app/controllers')
/* Validators */
const validators = require('./app/validators')

/**
 * Login
 */
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

/**
 * Users
 */
routes.get('/users', handle(controllers.UserController.index))
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 */
routes.get('/purchases', controllers.PurchaseController.index)
routes.get('/purchases/:id', controllers.PurchaseController.show)
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)
routes.put('/purchases/:id', controllers.PurchaseController.update)

module.exports = routes
