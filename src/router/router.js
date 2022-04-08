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
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
  apis: ['./src/router/router.js'],
};

const openapiSpecification = swaggerJsdoc(swaggerOptions);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

/* Middlewares */
const authGuard = require('../middlewares/auth/authGuard')

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
/**
 * @openapi
 * tags: 
 *   name: Users
 *   description: The users managing API
 * @openapi
 * /users/register:
 *   post:
 *     tags: [Users]
 *     description: Register a new user
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Returns the corresponding user.
 */
router.post('/users/register', register)
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags: [Users]
 *     description: Return a JWT
 *     summary: Login a user using a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: A Json Web Token.
 */
router.post('/users/login', login)
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     description: Return details about the given user
 *     security:
 *      - bearerAuth: []
 *     summary: Find details about a user
 *     responses:
 *       200:
 *         description: Corresponding user's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to delete (24 characters).
 *         schema:
 *           type: string
 */
router.get('/users/:id', getUser)
/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     description: Delete the given user
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: User has successfully been deleted.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer
 */
router.delete('/users/:id', deleteUser)


/**
 * @openapi
 * tags: 
 *   name: Groups
 *   description: The groups managing API
 * @openapi
 * /groups:
 *   post:
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     description: Create a new group
 *     summary: Create a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The group's name
 *     responses:
 *       200:
 *         description: Returns the corresponding Group object
 */
router.post('/groups', authGuard, createGroup)
/**
 * @openapi
 * /groups/{id}:
 *   delete:
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     description: Delete a given group
 *     summary: Delete a group
 *     responses:
 *       200:
 *         description: The deletion was successful.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the group to delete (24 characters).
 *         schema:
 *           type: string
 */
router.delete('/groups/:id', authGuard, deleteGroup)
/**
 * @openapi
 * /groups/{id}:
 *   get:
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     description: Find details about a given group
 *     summary: Find details about a group
 *     responses:
 *       200:
 *         description: The corresponding details.
 *       500:
 *         description: Something went wrong (no JWT header, missing property in request, etc.)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the group to find (24 characters).
 *         schema:
 *           type: string
 */
router.get('/groups/:id', authGuard, findGroup)
/**
 * @openapi
 * /groups/{groupId}/add/{userId}:
 *   post:
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     description: Add a new user to a group
 *     summary: Add a new user to a group
 *     responses:
 *       200:
 *         description: User was added.
 *       500:
 *         description: Something went wrong (no JWT header, missing property in request, etc.)
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: String ID of the group (24 characters).
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: String ID of the user to add (24 characters).
 *         schema:
 *           type: string
 */
router.post('/groups/:groupId/add/:userId', authGuard, addMember)
/**
 * @openapi
 * /groups/{id}:
 *   delete:
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     description: Find details about a given group
 *     responses:
 *       200:
 *         description: Group was deleted.
 *       500:
 *         description: Something went wrong (no JWT header, missing property in request, etc.)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the group to find (24 characters).
 *         schema:
 *           type: string
 */
router.delete('/groups/:groupId/remove/:userId', authGuard ,removeMember)
/**
 * @openapi
 * /groups/{id}/messages:
 *   post:
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     description: Send a new message to a group
 *     summary: Send a new message to a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: TMessage content
 *     responses:
 *       200:
 *         description: Message was sent.
  *       500:
 *         description: Something went wrong (no JWT header, missing property in request, etc.)
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: String ID of the group (24 characters).
 *         schema:
 *           type: string
 */
router.post('/groups/:id/messages', authGuard, sendGroupMessage)
/**
 * @openapi
 * /groups/{id}/messages:
 *   get:
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     description: Returns all unread message from a group
 *     summary: Return all unread messages from a group
 *     responses:
 *       200:
 *         description: Messages list
  *       500:
 *         description: Something went wrong (no JWT header, missing property in request, etc.)
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: String ID of the group (24 characters).
 *         schema:
 *           type: string
 */
router.get('/groups/:id/messages', authGuard, readGroupMessages)            // 


/**
 * @openapi
 * tags: 
 *   name: Monitoring
 *   description: The monitoring API
 * @openapi
 * /liveness:
 *   get:
 *     tags: [Monitoring]
 *     description: Liveness probe
 *     summary: Liveness probe
 *     responses:
 *       200:
 *         description: App is alive
 */
router.get('/liveness', livenessProb)

module.exports = router