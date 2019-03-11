const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorMessage = require('../utils/errorMessage');

module.exports = {
    // get all users
    getAllUsers: (query) => {
        return new Promise((resolve, reject) => {
            User.find(query)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    // find user by id
    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            User.find({_id: id})
            .then(result => {
                resolve(result)
            })
            .catch(() => {
                let error = errorMessage.noUserFound();
                reject(error);
            })
        })
    },

    createUser: (params) => {
        // if the user exists, throw an error saying 
        // 'User already exists, please sign in'
            // else
        // create new user
        return new Promise((resolve, reject) => {
            
            User.findOne({email: params.email})
            .then(user => {
                if(user) {
                    let error = {}
                    error.message = 'This account already exists. Please sign in.'
                    error.status = 409
                    reject(error)
                } else {
                    const newUser = new User({
                        firstName: params.firstName,
                        lastName: params.lastName,
                        email: params.email,
                        password: params.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        // hash the new user's password while salted
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) {
                                throw err;
                            } else {
                                // hash the new user's password
                                newUser.password = hash;

                                // save the new user in the database
                                newUser.save()
                                .then(savedUser => {
                                    resolve(savedUser)
                                })
                                .catch(error => {
                                    reject(error)
                                })
                            }
                        })
                    })

                }
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    loginUser: (params) => {
        // user.password: password in the database
        // params.password: password the user puts in

        // if the user is not found, say 'User not found. Please sign up'
            // else
        // redirect them to their profile

        return new Promise((resolve, reject) => {

            User.findOne({email: params.email})
                .then(user => {
                    if(!user) {
                        let error = errorMessage; // 'User not found'
                        reject(error);
                    } else {
                        bcrypt.compare(params.password, user.password)
                        .then(isMatch => {

                            if(isMatch) {

                                const payload = {
                                    id: user._id,
                                    email: user.email
                                }

                                jwt.sign(payload, process.env.SECRET_KEY,
                                        { expiresIn: 3600 }, // 3600 seconds = 1 hour
                                        (err, token) => {
                                            if(err) {
                                                reject(err)
                                            } else {
                                                let success = {};                                               
                                                success.confirmation = true;
                                                success.token = `Bearer ${token}`;
                                                success.message = 'Welcome back!';
                                                success.status = 200;
                                                resolve(success);
                                            }
                                        });
                            } else {
                                let errors = {};
								errors.message = 'The password does not match in our database. Please try again.';
								errors.statusCode = 400;
								reject(errors);
                            }
                        })
                        .catch(error => {
                            reject(error)
                        })

                    }

                })
                .catch(error => {
                    reject(error)
                })

        });

    },

    updateUser: (id, newBody) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate({_id: id}, newBody, { new: true })
            .then(result => {
                resolve(result)
            })
            .catch(() => {
                let error = errorMessage.noUserFound();
                reject(error);
            })
        })
    },

    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndDelete({_id: id})
            .then(() => {
                let success = {}
                success.message = 'User successfully deleted!'
                success.status = 200
                resolve(success)
            })
            .catch(() => {
                let error = errorMessage.noUserFound();
                reject(error); 
            })
        })
    }
}