const router = require('express').Router()
const verify = require(('./verifyToken'))
const User = require('../model/User')

router.get('/', verify, (req, res) => {

    let id = req.IdFromToken._id
    User.findOne({ _id: id }, (err, foundObject) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ name: foundObject.name, lastName: foundObject.lastName })
        }
    })
})



module.exports = router