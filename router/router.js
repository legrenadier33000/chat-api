const express = require("express")
const router = express.Router()

/**
 * Controllers
 */
const getUser = require('../controllers/users/getUser')
const postUser = require('../controllers/users/postUser')
const patchUser = require('../controllers/users/patchUser')

const getGroup = require('../controllers/groups/getGroup')
const postGroup = require('../controllers/groups/postGroup')

const getMessage = require('../controllers/messages/getMessage')
const postMessage = require('../controllers/messages/postMessage')

/**
 * Router
 */
router.get('/users/:id', getUser)
router.post('/users', postUser)
router.patch('/users/:id', patchUser)

router.get('/groups/:id', getGroup)
router.post('/groups', postGroup)

router.get('/messages/:id', getMessage)
router.post('/messages', postMessage)

module.exports = router