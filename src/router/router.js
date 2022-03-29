const express = require("express")
const router = express.Router()

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat API',
      version: '1.0.0',
    },
  },
  apis: ['./src/router/router.js'],
};

const openapiSpecification = swaggerJsdoc(swaggerOptions);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

/* Middlewares */
const authGuard = require('../middlewares/authGuard')

/* Controllers */

const register = require('../controllers/users/register')
const login = require('../controllers/users/login')
const getUser = require('../controllers/users/getUser')
const deleteUser = require('../controllers/users/deleteUser')

const findGroup = require('../controllers/groups/findGroup')
const createGroup = require('../controllers/groups/createGroup')
const deleteGroup = require('../controllers/groups/deleteGroup')
const addMember = require('../controllers/groups/addMember')
const removeMember = require('../controllers/groups/removeMember')
const sendGroupMessage = require('../controllers/groups/sendGroupMessage')
const readGroupMessages = require('../controllers/groups/readGroupMessages')

const livenessProb = require('../controllers/livenessprob/livenessprob')

/* Router */
router.post('/users/register', register)                                    // OK
router.post('/users/login', login)                                          // OK
/**
 * @openapi
 * /users/:id:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns the corresponding user.
 */
router.get('/users/:id', getUser)                                           // OK
router.delete('/users/:id', deleteUser)                                     // OK

router.post('/groups', authGuard, createGroup)                              // OK
router.delete('/groups/:id', authGuard, deleteGroup)                        // OK
router.get('/groups/:id', authGuard, findGroup)                             // OK
router.post('/groups/:groupId/add/:userId', authGuard, addMember)           // OK
router.delete('/groups/:groupId/remove/:userId', authGuard ,removeMember)   // OK
router.post('/groups/:id/messages', authGuard, sendGroupMessage)            // OK
router.get('/groups/:id/messages', authGuard, readGroupMessages)            // 

router.get('/liveness', livenessProb)                                       // OK

module.exports = router