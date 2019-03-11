var express = require('express');
var router = express.Router();

const userController = require('./controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getallusers', (req, res) => {
  userController.getAllUsers(req.query)
  .then(users => {
    res.json(users)
  })
  .catch(error => {
    res.status(400).json(error)
  })
});

router.get('/getuserbyid', (req, res) => {
  userController.getUserById(req.query.id)
  .then(user => {
    res.json(user)
  })
  .catch(error => {
    res.status(400).json(error)
  })
})

router.post('/createuser', (req, res) => {
  userController.createUser(req.body)
  .then(user => {
    res.json(user)
  })
  .catch(error => {
    res.status(400).json(error)
  })
});

router.post('/loginuser', (req, res) => {
  userController.loginUser(req.body)
  .then(user => {
    res.json(user)
  })
  .catch(error => {
    res.status(400).json(error)
  })
});

// router.get('/logoutuser', (req, res) => {
//   res.clearCookie('jwt');
//   res.redirect('/')
// })

// update a user's info
router.put('/updateuser/:id', (req, res) => {
  userController.updateUser(req.params.id, req.body)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

// delete a user's info
router.delete('/deleteuser', (req, res) => {
  userController.deleteUser(req.query.id)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    res.status(400).json(err)
  })
})

module.exports = router;
