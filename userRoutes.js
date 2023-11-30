const express = require('express')
const router = express.Router()
const {
  register,
  login,
  getUsers
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', register)
router.post('/login', login)
router.get('/getusers',protect,getUsers)



module.exports = router
